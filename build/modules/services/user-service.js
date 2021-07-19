"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
const movie_1 = require("../../plugins/db/models/movie");
const insert = (server, body) => new Promise((resolve, reject) => {
    const moviesDb = movie_1.MoviesFactory(server.db);
    const { name, genre, rating } = body;
    moviesDb.create({ name, genre, rating, createdBy: 'dev' })
        .then(data => {
        resolve({ name: data.name, rating: data.rating, createdBy: data.createdBy });
    }).catch(err => {
        reject(err);
    });
});
exports.insert = insert;
//# sourceMappingURL=user-service.js.map