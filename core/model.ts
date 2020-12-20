export default class SourceFile {
    private _fileName: string;
    private _isExportDeclarationClauseEmpty: boolean;
    private _isExportModifierFound: boolean;
    private _isExportAssignmentFound: boolean;
    private _exportedIdentifierText: string;
    private _isGlobalInterfaceExtended: boolean;
    private _lastStatementId: string;


    get fileName(): string {
        return this._fileName;
    }

    set fileName(value: string) {
        if (typeof value != 'undefined') {
            this._fileName = value;
        }
    }

    get isExportDeclarationClauseEmpty(): boolean {
        return this._isExportDeclarationClauseEmpty;
    }

    set isExportDeclarationClauseEmpty(value: boolean) {
        if (typeof value != 'undefined') {
            this._isExportDeclarationClauseEmpty = value;
        }
    }

    get isExportModifierFound(): boolean {
        return this._isExportModifierFound;
    }

    set isExportModifierFound(value: boolean) {
        if (typeof value != 'undefined') {
            this._isExportModifierFound = value;
        }
    }

    get isExportAssignmentFound(): boolean {
        return this._isExportAssignmentFound;
    }

    set isExportAssignmentFound(value: boolean) {
        if (typeof value != 'undefined') {
            this._isExportAssignmentFound = value;
        }
    }

    get isGlobalInterfaceExtended(): boolean {
        return this._isGlobalInterfaceExtended;
    }

    set isGlobalInterfaceExtended(value: boolean) {
        if (typeof value != 'undefined') {
            this._isGlobalInterfaceExtended = value;
        }
    }

    get exportedIdentifierText(): string {
        return this._exportedIdentifierText;
    }

    set exportedIdentifierText(value: string) {
        if (typeof value != 'undefined') {
            this._exportedIdentifierText = value;
        }
    }

    get lastStatementId(): string {
        return this._lastStatementId;
    }

    set lastStatementId(value: string) {
        if (typeof value != 'undefined') {
            this._lastStatementId = value;
        }
    }
}

// isExportKeywordFound: boolean,
// isExportDeclarationEmpty: boolean,
// get isExportDeclarationEmpty(): boolean {
//     return this.isExportDeclarationEmpty;
// }
//
// set isExportDeclarationEmpty(value: boolean) {
//     if (typeof value == 'undefined') {
//         this.isExportDeclarationEmpty = value;
//     }
// }
//
// get isExportKeywordFound(): boolean {
//     return this.isExportKeywordFound;
// }
//
// set isExportKeywordFound(value: boolean) {
//     if (typeof value == 'undefined') {
//         this.isExportKeywordFound = value;
//     }
// }
