import { VendorA } from "./VendorA";

class Client {
    myProvider: VendorA;
    public constructor() {
        this.myProvider = new VendorA();
    }

    getSecrets() {
        return this.myProvider.getSecretsFromMe();
    }
}

const myApp = new Client();
console.log(myApp.getSecrets())