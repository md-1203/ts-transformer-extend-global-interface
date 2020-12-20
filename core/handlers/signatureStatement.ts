import * as ts from "typescript";

export const variableIdentifierText = "extendGlobalInterfaceSignature";

export function createSignatureStatement(): ts.Node {
    const factory = ts.factory;
    const identifier = factory.createIdentifier(variableIdentifierText);
    const numericLiteral = factory.createNumericLiteral(0, ts.TokenFlags.None)
    const variableDeclaration = factory.createVariableDeclaration(identifier, undefined , undefined, numericLiteral);
    const variableDeclarationList = factory.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const);
    const exportModifier = factory.createModifier(ts.SyntaxKind.ExportKeyword);
    return factory.createVariableStatement([exportModifier], variableDeclarationList);
}