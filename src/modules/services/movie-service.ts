import { MoviesFactory } from '../../plugins/db/models/movie';

export const findAll = (server) => new Promise((resolve, reject) => {
    const moviesDb = MoviesFactory(server.db);

    moviesDb.findAll()
        .then(data => {
                resolve({ data: data });
        }).catch(err => {
            reject(err);
        });
});

export const getLastMovie = (server) => new Promise((resolve, reject) => {
    const moviesDb = MoviesFactory(server.db);

    moviesDb.findOne({ order: [ 
            ['movieId', 'DESC'], 
        ]})
        .then(data => {
                resolve({ data: data });
        }).catch(err => {
            reject(err);
        });
});

export const insert = (server, body) => new Promise((resolve, reject) => {
    const moviesDb = MoviesFactory(server.db);
    const { name, genre, rating } = body;

    moviesDb.create({ name, genre, rating, createdBy: 'dev' })
        .then(data => {
                resolve({ name: data.name, rating: data.rating, createdBy: data.createdBy });
        }).catch(err => {
            reject(err);
        });
});

export const update = (server, body) => new Promise((resolve, reject) => {
    const moviesDb = MoviesFactory(server.db);
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

export const deleteMovie = (server, body) => new Promise((resolve, reject) => {
    const moviesDb = MoviesFactory(server.db);
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

export const insertBulk = (server, data) => new Promise((resolve, reject) => {
    const moviesDb = MoviesFactory(server.db);
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