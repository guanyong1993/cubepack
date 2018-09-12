
const fs = require('fs');
const pt = require('path');

const FileManager = {
    getFileNames: function (path) {
        let result = [];
        let fns = fs.readdirSync(path);
        let folders = [];
        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i];
            let stat = fs.statSync(path + fn);
            if (stat.isDirectory()) {
                folders[folders.length] = fn + "/";
            } else if (fn[0] !== '.') {
                result[result.length] = fn;
            }
        }
        for (let i = 0; i < folders.length; i++) {
            let r = this.getFileNames(path + folders[i]);
            for (let j = 0; j < r.length; j++) {
                result[result.length] = folders[i] + r[j];
            }
        }
        return result;
    },

    getChildFolders: function (path) {
        let result = [];
        let fns = fs.readdirSync(path);
        for (let i = 0; i < fns.length; i++) {
            let stat = fs.statSync(path + fns[i]);
            if (stat.isDirectory()) {
                result[result.length] = fns[i];
            }
        }
        return result;
    },

    read(path) {
        return fs.readFileSync(path, 'utf-8');
    },

    write(path, data) {
        fs.writeFile(path, data, 'utf-8', function () { });
    },

    resolve(a, b) {
        return pt.resolve(a, b).replace(/\\/g, '/');
    }
};

module.exports = FileManager;