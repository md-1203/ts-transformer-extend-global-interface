export default class SourceFile {
    private _fileName: string;
    private _isExportDeclarationClauseEmpty: boolean;
    private _isExportModifierFound: boolean;
    private _isDefaultExportFound: boolean;
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

    get isDefaultExportFound(): boolean {
        return this._isDefaultExportFound;
    }

    set isDefaultExportFound(value: boolean) {
        if (typeof value != 'undefined') {
            this._isDefaultExportFound = value;
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
