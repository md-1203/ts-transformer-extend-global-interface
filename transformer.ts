import * as ts from "typescript";
import handleModuleDeclaration from "./core/moduleDeclaration";
import handleExpressionStatement from "./core/expressionStatement";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile>  {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, context);
}

function visitNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node | undefined;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node | undefined {
    return ts.visitEachChild(visitNode(node), childNode => visitNodeAndChildren(childNode, context), context);
}

function visitNode(node: ts.SourceFile): ts.SourceFile;
function visitNode(node: ts.Node): ts.Node | undefined;
function visitNode(node: ts.Node): ts.Node | undefined {
    if (ts.isModuleDeclaration(node))
        return handleModuleDeclaration(node);
    else if (ts.isExpressionStatement(node))
        return handleExpressionStatement(node);
    else
        return node;
}