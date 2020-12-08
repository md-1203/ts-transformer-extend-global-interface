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
var ts = __importStar(require("typescript"));
var moduleDeclaration_1 = __importDefault(require("./core/moduleDeclaration"));
var expressionStatement_1 = __importDefault(require("./core/expressionStatement"));
function transformer(program) {
    return function (context) { return function (file) { return visitNodeAndChildren(file, context); }; };
}
exports.default = transformer;
function visitNodeAndChildren(node, context) {
    return ts.visitEachChild(visitNode(node), function (childNode) { return visitNodeAndChildren(childNode, context); }, context);
}
function visitNode(node) {
    if (ts.isModuleDeclaration(node))
        return moduleDeclaration_1.default(node);
    else if (ts.isExpressionStatement(node))
        return expressionStatement_1.default(node);
    else
        return node;
}
