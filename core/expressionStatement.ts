import * as ts from "typescript";
import {ObjectString, DefinePropertyString, ValueString} from "./constants";
import {isInterfaceAndPropertyExist} from "./store";

function createExpressionStatement(leftHandSideExpression: ts.PropertyAccessExpression | ts.Identifier, propertyEscapedString: string, rightHandSideExpression: ts.Expression): ts.ExpressionStatement {
    const factory = ts.factory;
    return factory.createExpressionStatement(
        factory.createCallExpression(
            factory.createPropertyAccessExpression(factory.createIdentifier(ObjectString), factory.createIdentifier(DefinePropertyString)),
            undefined,
            [
                leftHandSideExpression,
                factory.createStringLiteral(propertyEscapedString),
                factory.createObjectLiteralExpression([
                    factory.createPropertyAssignment(factory.createIdentifier(ValueString), rightHandSideExpression)
                ], true)
            ]
        ));
}

function handleExpressionStatement(expressionStatement: ts.ExpressionStatement): ts.ExpressionStatement {
    if (ts.isBinaryExpression(expressionStatement.expression)) {
        const binaryExpression = expressionStatement.expression; // ts.BinaryExpression

        if (ts.isPropertyAccessExpression(binaryExpression.left) && binaryExpression.operatorToken.kind == ts.SyntaxKind.EqualsToken) {
            const propertyAccessExpression = binaryExpression.left; // ts.PropertyAccessExpression
            const assignedValueExpression = binaryExpression.right; // ts.Expression (GenericExpression could be an Keyword, StringLiterals, ObjectLiterals, Function, etc.)

            if (ts.isPropertyAccessExpression(propertyAccessExpression.expression)) {
                const protoTypePropertyAccessExpression = propertyAccessExpression.expression; // ts.PropertyAccessExpression
                const identifier = protoTypePropertyAccessExpression.expression as ts.Identifier;
                if (isInterfaceAndPropertyExist(identifier.getText(), propertyAccessExpression.name.getText())) {
                    return createExpressionStatement(protoTypePropertyAccessExpression, propertyAccessExpression.name.escapedText.toString(), assignedValueExpression);
                }
            } else {
                const identifier = propertyAccessExpression.expression as ts.Identifier;
                if (isInterfaceAndPropertyExist(identifier.getText(), propertyAccessExpression.name.getText())) {
                    return createExpressionStatement(identifier, propertyAccessExpression.name.escapedText.toString(), assignedValueExpression);
                }
            }
        }
    }
    return expressionStatement;
}

export default handleExpressionStatement;