const fm = require('../utils/FileManager.js');
const Compiler = require('./Compiler.js');
const babel = require('babel-core');

class JsCompiler extends Compiler {
    constructor(path, properties) {
        super(path, properties);

        this.modules = new Map();
        this.index = 0;
    }

    handle(filepath) {
        let path = fm.resolve(filepath, '../') + '/';
        let content = fm.read(filepath);

        let imp = new RegExp('import (.+?) from "([^"]*)"', 'g');
        let values = content.match(imp);
        let dependents = [];
        if (values !== null) {
            for (let value of values) {
                let reg = new RegExp('import (.+?) from "([^"]*)"');
                let data = value.match(reg);
                let p = fm.resolve(path, data[2]) + '.js';
                dependents.push({name: data[1], path: p, source: value});

                if(!this.modules.has(p)) this.handle(p);
            }
        }


        let exp = new RegExp('export class ([^ ]*)', 'g');
        let expValues = content.match(exp);
        let exports = [];
        if (expValues !== null) {
            for (let value of expValues) {
                let reg = new RegExp('export class ([^ ]*)');
                let data = value.match(reg);
                content = content.replace(value, 'class ' + data[1]);
                exports.push(data[1]);
            }

            this.modules.set(filepath, {content: content + '\nreturn { '+ exports.join(',') + ' };', dependents, index: this.index});
        } else {
            let def = new RegExp('export default ', 'g');
            content = content.replace(def, 'cubepack_exports = ');

            this.modules.set(filepath, {content: 'let cubepack_exports = {};\n' + content + '\nreturn cubepack_exports;', dependents, index: this.index});
        }

        console.log(filepath, this.index);

        this.index++;
    }

    render() {
        const dist = this.path + 'dist/' + this.properties.name;

        let boot = this.path + 'index.js';
        this.handle(boot);


        let result = [], bootContent = '';
        this.modules.forEach((value, key) => {
            let content = value.content;
            for (let dep of value.dependents) {
                content = content.replace(dep.source, 'let ' + dep.name + ' = cubepack_require(' + this.modules.get(dep.path).index + ')');
            }
            if (key === boot) {
                let namespace = this.properties.namespace;
                let scope = typeof namespace === 'string' ? 'window.' + namespace : 'module.exports';
                bootContent = scope + '=(function(){\n' + content+ '\n})();';
            } else {
                result.push('function () {\n' + content+ '\n}');
            }
        });

        let code = '(function(){let cubepack_require=function(index){return cubepack_modules[index]();};let cubepack_modules=[' + result.join(', ') + '];' + bootContent + '})();';
        let presets = this.properties.compatible === false ? [] : ['env'];
        if (this.properties.minify !== false) {
            presets.push(["minify", {
                "evaluate": false
            }]);
        }
        let ret = babel.transform(code, {presets});
        fm.write(dist + '.js', ret.code);
    }
}

module.exports = JsCompiler;