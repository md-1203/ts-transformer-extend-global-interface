import assert from "assert";
import path from "path";
import fs from "fs";
import ts from "typescript";
import {compile} from './compile/compile';

describe("extend-global-interface", () => {
    const targetFile = "index.ts";
    const fileTransformationDir = path.join(__dirname, "fileTransformation");

    (["ES5", "ESNext"] as const).forEach(target =>
        it(`should transform ${targetFile} as expected when target is ${target}`, async (done) => {
            let result = "";
            const fullFileName = path.join(fileTransformationDir, `/Typescript/${targetFile}`),
                postCompileFullFileName = fullFileName.replace(/\.ts$/, '.js');
            compile([fullFileName], ts.ScriptTarget[target], (fileName, data) => postCompileFullFileName === path.join(fileName) && (result = data));
            assert.strictEqual(result.replace(/\r\n/g, '\n'), fs.readFileSync(path.join(fileTransformationDir, `${target}/${targetFile.replace(/\.ts$/, ".js")}`), 'utf-8'));
            done();
        })
    )
});