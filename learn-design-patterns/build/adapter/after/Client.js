"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VendorAAdapter_1 = require("./VendorAAdapter");
class Client {
    constructor() {
        //this.myProvider = new VendorB()
        this.myProvider = new VendorAAdapter_1.VendorAAdapter();
    }
    getSecrets() {
        return this.myProvider.getSecretsFromAnyVendor();
    }
}
const myApp = new Client();
console.log(myApp.getSecrets());
