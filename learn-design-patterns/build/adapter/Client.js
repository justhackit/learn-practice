"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VendorA_1 = require("./VendorA");
class Client {
    constructor() {
        this.myProvider = new VendorA_1.VendorA();
    }
}
