###Introduction to Adapter Pattern
Let us suppose there are existing interfaces/apis/libraries that your client uses. Now you may need to use similar functionality by other library or just migrate to a new one, you can use Adapter pattern.

###Example:
Let us suppose you have an application that is using VendorA's (class `before/VendorA.ts`) library to get some secrets which provides an API called `getSecretsFromMe()`. You call that API from `before/Client.ts`.

<p>Now you have to onboard another vendor called `after/VendorB.ts` who provides another kind of secrets. And later you might need to add/replace with yet another vendor. So, how do you make minimal changes to `Client.ts` so that it is easy to add/replace with new vendor ?</p>

You can create an Adapter class over `VendorA`. Here's how to do it:

1. First create an interface `IVendor.ts` to provide a common method.
2. Create `after/VendorAAdapter.ts` Adapter class over VendorA
3. For any new implementations, create `IVendor` implementation.

In this example, the `VendorAAdapter.ts` wraps VendorA's `getSecretsFromMe()` method over `getSecretsFromAnyVendor()` common method. This way, when you want to add/switch, all you need to change is line # 10 of `after/Client.ts` in your app/client.

To Run the example:

```
npm start concurently "tsc -w" "nodemon build/adapter/after/Client.js"
```
