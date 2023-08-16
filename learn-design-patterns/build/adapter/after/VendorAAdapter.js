"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorAAdapter = void 0;
const VendorA_1 = require("../before/VendorA");
class VendorAAdapter {
    getSecretsFromAnyVendor() {
        const vendorA = new VendorA_1.VendorA();
        return vendorA.getSecretsFromMe();
    }
}
exports.VendorAAdapter = VendorAAdapter;
