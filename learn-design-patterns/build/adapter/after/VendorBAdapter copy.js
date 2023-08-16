"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorBAdapter = void 0;
const VendorB_1 = require("./VendorB");
class VendorBAdapter {
    getSecretsFromAnyVendor() {
        const vendorB = new VendorB_1.VendorB();
        return vendorB.getSecretsFromVendorB();
    }
}
exports.VendorBAdapter = VendorBAdapter;
