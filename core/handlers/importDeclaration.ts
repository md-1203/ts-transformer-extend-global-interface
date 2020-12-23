import * as ts from "typescript";
import Store from "../store";

export default function handleImportDeclaration(importDeclaration: ts.ImportDeclaration): ts.ImportDeclaration {
    if (importDeclaration.importClause) {
        const importClause = importDeclaration.importClause;
        if (importClause.namedBindings) {
            const namedBindings = importClause.namedBindings;
            if ( ts.isNamespaceImport(namedBindings) || ts.isNamedImports(namedBindings) && namedBindings.elements.length == 0){
                if (ts.isStringLiteral(importDeclaration.moduleSpecifier)) {
                    const stringLiteral = importDeclaration.moduleSpecifier;
                    const currentSourceFile = Store.instance.getCurrentSourceFile();
                    if (currentSourceFile && currentSourceFile.isGlobalInterfaceExtended) {
                        if (currentSourceFile.fileName.match(stringLiteral.text)) {
                            const factory = ts.factory;
                            const identifier = factory.createIdentifier(currentSourceFile.exportedIdentifierText);
                            const importSpecifier = factory.createImportSpecifier(undefined, identifier);

                            const namedImports = getNamedImports(namedBindings, [importSpecifier]);
                            const updatedImportClause = factory.updateImportClause(importClause, false, undefined, namedImports);

                            Store.instance.resetCurrentSourceFile();
                            return factory.updateImportDeclaration(importDeclaration, undefined, undefined, updatedImportClause, stringLiteral);
                        }
                    }
                }
            }
        }
    }
    return importDeclaration;
}

function getNamedImports(namedImportBindings: ts.NamedImportBindings, elements: ts.ImportSpecifier[]): ts.NamedImports {
    if (ts.isNamespaceImport(namedImportBindings)) {
        return ts.factory.createNamedImports(elements);
    } else {
        return ts.factory.updateNamedImports(namedImportBindings, elements);
    }
}