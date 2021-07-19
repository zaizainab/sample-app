"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBulk = exports.deleteMovie = exports.update = exports.insert = exports.findAll = void 0;
const movie_1 = require("../../plugins/db/models/movie");
const findAll = (server) => new Promise((resolve, reject) => {
    const moviesDb = movie_1.MoviesFactory(server.db);
    moviesDb.findAll()
        .then(data => {
        resolve({ data: data });
    }).catch(err => {
        reject(err);
    });
});
exports.findAll = findAll;
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
const update = (server, body) => new Promise((resolve, reject) => {
    const moviesDb = movie_1.MoviesFactory(server.db);
    const { movieId, name, genre, rating } = body;
    moviesDb.update({ name, genre, rating, lastUpdatedBy: 'devU' }, {
        where: {
            movieId: movieId
        }
    }).then(data => {
        resolve({ data: data });
    }).catch(err => {
        reject(err);
    });
});
exports.update = update;
const deleteMovie = (server, body) => new Promise((resolve, reject) => {
    const moviesDb = movie_1.MoviesFactory(server.db);
    const { movieId } = body;
    moviesDb.destroy({
        where: {
            movieId: movieId
        }
    }).then(data => {
        resolve({ movieId: movieId });
    }).catch(err => {
        reject(err);
    });
});
exports.deleteMovie = deleteMovie;
const insertBulk = (server, data) => new Promise((resolve, reject) => {
    const moviesDb = movie_1.MoviesFactory(server.db);
    let movies = [];
    if (data) {
        movies = data;
        moviesDb.bulkCreate(movies, { validate: true })
            .then(data => {
            resolve({ data: movies });
        }).catch(err => {
            reject(err);
        });
    }
});
exports.insertBulk = insertBulk;
//# sourceMappingURL=movie-service.js.map