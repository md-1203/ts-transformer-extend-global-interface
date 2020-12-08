"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
var ts = __importStar(require("typescript"));
var transformer_1 = __importDefault(require("../../transformer"));
function compile(filePaths, target, writeFileCallback) {
    if (target === void 0) { target = ts.ScriptTarget.ES5; }
    var program = ts.createProgram(filePaths, {
        strict: true,
        noEmitOnError: true,
        esModuleInterop: true,
        suppressImplicitAnyIndexErrors: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        target: target
    });
    var transformers = {
        before: [transformer_1.default(program)],
        after: []
    };
    var _a = program.emit(undefined, writeFileCallback, undefined, false, transformers), emitSkipped = _a.emitSkipped, diagnostics = _a.diagnostics;
    if (emitSkipped) {
        throw new Error(diagnostics.map(function (diagnostic) { return diagnostic.messageText; }).join("\n"));
    }
}
exports.compile = compile;
