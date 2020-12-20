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
var store_1 = __importDefault(require("../store"));
function handleModifier(modifier) {
    if (modifier.kind == ts.SyntaxKind.ExportKeyword) {
        var currentSourceFile = store_1.default.instance.getCurrentSourceFile();
        if (currentSourceFile && currentSourceFile.isExportDeclarationClauseEmpty && !currentSourceFile.exportedIdentifierText) {
            var parentNodeText = modifier.parent.getText();
            var regExp = new RegExp(/export\s*(default\s)*[a-z]+\s*[\w_$]+/gm);
            var matchedArray = parentNodeText.match(regExp);
            if (matchedArray) {
                var firstMatchedElement = matchedArray[0];
                var splittedArray = firstMatchedElement.split(" ");
                currentSourceFile.exportedIdentifierText = splittedArray[splittedArray.length - 1];
                currentSourceFile.isExportModifierFound = true;
            }
        }
    }
}
exports.default = handleModifier;
