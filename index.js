const FileManager = require('./utils/FileManager.js');
const JsCompiler = require('./compiler/JsCompiler.js');

module.exports = {
    startup(path) {
        let info = FileManager.read(path + 'package.json');
        let project = JSON.parse(info);

        let properties = project.cubepack ? project.cubepack : {};
        properties.name = project.name;
        properties.version = project.version;

        // 生成输出目录
        FileManager.mkdir(path + 'dist/');

        let compiler = new JsCompiler(path, properties);
        compiler.render();
    }
};
