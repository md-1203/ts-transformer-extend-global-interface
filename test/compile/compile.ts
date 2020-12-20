import * as ts from "typescript";
import transformer from "../../transformer";

export function compile(filePaths: string[], target = ts.ScriptTarget.ES5, writeFileCallback?: ts.WriteFileCallback) {
    const program = ts.createProgram(filePaths, {
        noEmitOnError: true,
        esModuleInterop: true,
        noImplicitReturns: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        target
    });

    const transformers: ts.CustomTransformers = {
        before: [transformer(program)],
        after: []
    }

    const {emitSkipped, diagnostics} = program.emit(undefined, writeFileCallback, undefined, false, transformers);

    if (emitSkipped) {
        throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join("\n"));
    }
}