import * as ts from "typescript";

export const variableIdentifierText = "extendGlobalInterfaceSignature";

export function createSignatureStatement(value: ts.Expression = ts.factory.createNumericLiteral(0, ts.TokenFlags.None)): ts.Node {
    const factory = ts.factory;
    const identifier = factory.createIdentifier(variableIdentifierText);
    const variableDeclaration = factory.createVariableDeclaration(identifier, undefined , undefined, value);
    const variableDeclarationList = factory.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const);
    const exportModifier = factory.createModifier(ts.SyntaxKind.ExportKeyword);
    return factory.createVariableStatement([exportModifier], variableDeclarationList);
}