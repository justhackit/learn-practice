import { VendorA } from "../before/VendorA";
import { IVendor } from "./IVendor";

export class VendorAAdapter implements IVendor {

    getSecretsFromAnyVendor(): string {
        const vendorA = new VendorA()
        return vendorA.getSecretsFromMe()
    }

}