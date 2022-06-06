# Building the library
This project was done in order to integrate the [Terra Wallet Provider library] (https://www.npmjs.com/package/@terra-money/wallet-provider) in a Bubble.io application.
This is directed at exporting a unique file to integrate the logic of the library directly in the browser.

To build the library, use: 
```
  npm install
  npm run build
```

This builds the project and creates a `main.js` file in the dist folder. This file contains everything you need to make the library work in the browser.

# Testing 
To test the export locally, use : 
 ```
  npm install --global http-server
  http-server
```
Browse to https://localhost:8080 (or any address that appears in the console). The Terra wallet should ask for connection rapidly.
If nothing happends, check the javascript console. You should see something like
```
  not connected yet
  connected
  `a terra address`
```
# Usage Example

You can find an example usage in the index.html file. The central variable is the controller. Using this variable, you can access all the fonctionnalities of the Wallet Provider Library
