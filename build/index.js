"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.createServer()
    .then((server) => {
    server.log.info('Server started.');
}).catch(error => {
    // do something
    console.log(error);
});
//# sourceMappingURL=index.js.map