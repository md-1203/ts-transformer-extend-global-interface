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
function handleImportDeclaration(importDeclaration) {
    if (importDeclaration.importClause) {
        var importClause = importDeclaration.importClause;
        if (importClause.namedBindings) {
            var namedBindings = importClause.namedBindings;
            if (ts.isNamespaceImport(namedBindings) || ts.isNamedImports(namedBindings) && namedBindings.elements.length == 0) {
                if (ts.isStringLiteral(importDeclaration.moduleSpecifier)) {
                    var stringLiteral = importDeclaration.moduleSpecifier;
                    var currentSourceFile = store_1.default.instance.getCurrentSourceFile();
                    if (currentSourceFile && currentSourceFile.isGlobalInterfaceExtended) {
                        if (currentSourceFile.fileName.match(stringLiteral.text)) {
                            var factory = ts.factory;
                            var identifier = factory.createIdentifier(currentSourceFile.exportedIdentifierText);
                            var importSpecifier = factory.createImportSpecifier(undefined, identifier);
                            var namedImports = getNamedImports(namedBindings, [importSpecifier]);
                            var updatedImportClause = factory.updateImportClause(importClause, false, undefined, namedImports);
                            store_1.default.instance.resetCurrentSourceFile();
                            return factory.updateImportDeclaration(importDeclaration, undefined, undefined, updatedImportClause, stringLiteral);
                        }
                    }
                }
            }
        }
    }
    return importDeclaration;
}
exports.default = handleImportDeclaration;
function getNamedImports(namedImportBindings, elements) {
    if (ts.isNamespaceImport(namedImportBindings)) {
        return ts.factory.createNamedImports(elements);
    }
    else {
        return ts.factory.updateNamedImports(namedImportBindings, elements);
    }
}
