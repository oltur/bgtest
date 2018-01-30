# Border Guru test task. Based on TypeScript Node Starter

[![Dependency Status](https://david-dm.org/Microsoft/TypeScript-Node-Starter.svg)](https://david-dm.org/Microsoft/TypeScript-Node-Starter) [![Build Status](https://travis-ci.org/Microsoft/TypeScript-Node-Starter.svg?branch=master)](https://travis-ci.org/Microsoft/TypeScript-Node-Starter) 

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
-Unzip the source code

- Install dependencies
```
cd <project_name>
npm install
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm run build
npm start
```
Navigate to `http://localhost:3000`

### Running the build
All the different build steps are orchestrated via [npm scripts]
Below is a list of all the scripts this template has available:


| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                      |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `tslint`, `copy-static-assets`)       |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch`                   | Runs all watch tasks (TypeScript, Sass, Node). Use this if you're not touching static assets.     |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed                |
| `build-sass`              | Compiles all `.scss` files to `.css` files                                                        |
| `watch-sass`              | Same as `build-sass` but continuously watches `.scss` files and re-compiles when needed             |
| `tslint`                  | Runs TSLint on project files                                                                      |
| `copy-static-assets`      | Calls script that copies JS libs, fonts, and images to dist directory                             |

# Using the client tool

Client side allows you to import the test data to specified MongoDB (default to local) and perform the requested manipulation on the data.

Server-side API is defined in app.ts file as follows:
app.post("/api/importorders", orderController.postImportOrders);
app.get("/api/order/:id", orderController.getOrder);
app.get("/api/order", orderController.getOrderSearch);
app.post("/api/order", orderController.postOrder);
app.delete("/api/order/:id", orderController.deleteOrder);
app.patch("/api/order", orderController.putOrder);
app.get("/api/ordersCountPerItem", orderController.getCountPerItem);