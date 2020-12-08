import assert from "assert";
import path from "path";
import fs from "fs";
import ts from "typescript";
import { compile } from './compile/compile';

describe("global-interface", () => {
    const fileTransformationDir = path.join(__dirname, "fileTransformation");
    fs.readdirSync(fileTransformationDir).filter((file) => path.extname(file) === ".ts").forEach(file =>
        (["ES5", "ESNext"] as const).forEach(target =>
            it(`should transform ${file} as expected when target is ${target}`, async (done) => {
                let result = "";
                const fullFileName = path.join(fileTransformationDir, file), postCompileFullFileName = fullFileName.replace(/\.ts$/, '.js');
                compile([fullFileName], ts.ScriptTarget[target], (fileName, data) => postCompileFullFileName === path.join(fileName) && (result = data));
                assert.strictEqual(result.replace(/\r\n/g, '\n'), fs.readFileSync(fullFileName.replace(/\.ts$/, `.${target}.js`), 'utf-8'));
                done();
    })))

});