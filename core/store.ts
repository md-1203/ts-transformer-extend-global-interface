type InterfaceName = string;
type PropertyName = string;

class Store {
    private state: {InterfaceName?: ExtendedInterfaceProperties} = {};
    private static _instance: Store;
    private constructor() { this.state = {} };

    public static get instance(): Store {
        if (!Store._instance) {
            Store._instance = new Store();
            return Store._instance;
        }
        return Store._instance;
    }

    public addInterface(name: InterfaceName, properties: any) {
        Store._instance.state[name] = properties;
    }

    public getInterface(name: InterfaceName): ExtendedInterfaceProperties {
        return Store._instance.state[name];
    }

    public getState(): object {
        return Store._instance.state;
    }

    public removeInterface(name: InterfaceName): ExtendedInterfaceProperties | undefined {
        const removedInterface = Store._instance.state[name];
        delete Store._instance.state[name];
        return removedInterface
    }
}

class ExtendedInterfaceProperties {
    private properties: {PropertyName?: Boolean} = {};

    addProperty(name: PropertyName) {
        this.properties[name] = true;
    }

    getProperty(name: PropertyName): boolean | undefined {
        return this.properties[name];
    }

    isEmpty(): boolean {
        return Object.keys(this.properties).length == 0;
    }

    removeProperty(name: PropertyName): boolean | undefined {
        const removedProperty = this.properties[name];
        delete this.properties[name];
        return removedProperty;
    }
}

function isInterfaceAndPropertyExist(interfaceName: InterfaceName, propertyName: PropertyName): boolean {
    const _interface = Store.instance.getInterface(interfaceName)
    if(typeof _interface == 'undefined') return false
    else return typeof _interface.getProperty(propertyName) != "undefined";
}

export { Store, ExtendedInterfaceProperties, isInterfaceAndPropertyExist};

