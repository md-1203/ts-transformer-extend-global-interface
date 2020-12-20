import SourceFile from "./model";

export default class Store {
    private currentSourceFile?: SourceFile;
    private static _instance: Store;
    private constructor() {};

    public static get instance(): Store {
        if (!Store._instance) {
            Store._instance = new Store();
            return Store._instance;
        }
        return Store._instance;
    }

    setCurrentSourceFile(sourceFile: SourceFile) {
        Store._instance.currentSourceFile = sourceFile;
    }

    getCurrentSourceFile(): SourceFile | undefined {
        return Store._instance.currentSourceFile;
    }

    resetCurrentSourceFile() {
        Store._instance.currentSourceFile = undefined;
    }
}

