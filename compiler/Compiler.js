const pt = require('path');

class Compiler {
    constructor(path, properties) {
        this.path = path;
        this.properties = properties;
    }

    filter(text) {
        for (let key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
                let value = this.properties[key];

                let reg = new RegExp('@{CubePack.' + key + '}', 'g');
                text = text.replace(reg, value);
            }
        }

        return text;
    }
}

module.exports = Compiler;