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
exports.handleSourceFileLastStatement = exports.isSourceFileLastStatement = exports.handleSourceFile = void 0;
var ts = __importStar(require("typescript"));
var store_1 = __importDefault(require("../store"));
var model_1 = __importDefault(require("../model"));
var modifier_1 = __importDefault(require("./modifier"));
var exportDeclaration_1 = __importDefault(require("./exportDeclaration"));
var exportAssignment_1 = __importDefault(require("./exportAssignment"));
var signatureStatement_1 = require("./signatureStatement");
function handleSourceFile(sourceFile) {
    if (store_1.default.instance.getCurrentSourceFile() == undefined) {
        var newSourceFile = new model_1.default();
        newSourceFile.fileName = sourceFile.fileName;
        newSourceFile.lastStatementId = getLastStatementId(sourceFile);
        store_1.default.instance.setCurrentSourceFile(newSourceFile);
    }
}
exports.handleSourceFile = handleSourceFile;
function getLastStatementId(file) {
    var lastStatement = file.statements[file.statements.length - 1];
    return "" + lastStatement.pos + lastStatement.getFullWidth() + lastStatement.end;
}
function isSourceFileLastStatement(node) {
    var currentSourceFile = store_1.default.instance.getCurrentSourceFile();
    if (currentSourceFile && node.pos != -1) {
        return currentSourceFile.lastStatementId == "" + node.pos + node.getFullWidth() + node.end;
    }
    return false;
}
exports.isSourceFileLastStatement = isSourceFileLastStatement;
function handleSourceFileLastStatement(lastStatement) {
    checkLastStatement(lastStatement);
    var currentSourceFile = store_1.default.instance.getCurrentSourceFile();
    if (currentSourceFile) {
        if ((!currentSourceFile.isGlobalInterfaceExtended) || (currentSourceFile.isGlobalInterfaceExtended && currentSourceFile.isExportAssignmentFound)) {
            store_1.default.instance.resetCurrentSourceFile();
        }
        else if (currentSourceFile.isGlobalInterfaceExtended && (currentSourceFile.isExportDeclarationClauseEmpty == undefined || currentSourceFile.isExportDeclarationClauseEmpty) && !currentSourceFile.isExportModifierFound && !currentSourceFile.isExportAssignmentFound) {
            var signatureStatement = signatureStatement_1.createSignatureStatement();
            currentSourceFile.exportedIdentifierText = signatureStatement_1.variableIdentifierText;
            currentSourceFile.lastStatementId = '';
            return [lastStatement, signatureStatement];
        }
    }
    return lastStatement;
}
exports.handleSourceFileLastStatement = handleSourceFileLastStatement;
function checkLastStatement(lastStatement) {
    if (ts.isExportDeclaration(lastStatement)) {
        exportDeclaration_1.default(lastStatement);
    }
    else if (ts.isExportAssignment(lastStatement)) {
        exportAssignment_1.default(lastStatement);
    }
    else if (lastStatement.modifiers && lastStatement.modifiers.length) {
        modifier_1.default(lastStatement.modifiers[0]);
    }
}
