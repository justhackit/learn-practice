import { IVendor } from "./IVendor";
import { VendorAAdapter } from "./VendorAAdapter";
import { VendorB } from "./VendorB";


class Client {
    myProvider: IVendor;
    public constructor() {
        //this.myProvider = new VendorB()
        this.myProvider = new VendorAAdapter()
    }

    getSecrets() {
        return this.myProvider.getSecretsFromAnyVendor()
    }
}

const myApp = new Client();
console.log(myApp.getSecrets())