import { IVendor } from "./IVendor";

export class VendorB implements IVendor {
    public constructor() { }

    getSecretsFromAnyVendor(): string {
        return "Secrets by Vendor B"
    }

}