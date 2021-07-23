import { MoviesFactory } from '../../plugins/db/models/movie';

export class MovieService {

    db: any;
    movieModel;

    constructor(db) {
        this.db = db;
        this.movieModel = MoviesFactory(this.db);
    }

    findAll = () => new Promise((resolve, reject) => {
        // const moviesDb = MoviesFactory(server.db);

        this.movieModel.findAll()
            .then(data => {
                    resolve({ data: data });
            }).catch(err => {
                reject(err);
            });
    });

    getLastMovie = () => new Promise((resolve, reject) => {
        // const moviesDb = MoviesFactory(server.db);

        this.movieModel.findOne({ order: [ 
                ['movieId', 'DESC'], 
            ]})
            .then(data => {
                    resolve({ data: data });
            }).catch(err => {
                reject(err);
            });
    });

    insert = (param) => new Promise((resolve, reject) => {
        // const moviesDb = MoviesFactory(server.db);
        const { name, genre, rating } = param;

        this.movieModel.create({ name, genre, rating, createdBy: 'dev' })
            .then(data => {
                    resolve({ name: data.name, genre: data.genre, rating: data.rating /*, createdBy: data.createdBy*/ });
            }).catch(err => {
                reject(err);
            });
    });

    update = (param) => new Promise((resolve, reject) => {
        // const moviesDb = MoviesFactory(server.db);
        const { movieId, name, genre, rating } = param;

        this.movieModel.update({ name, genre, rating, lastUpdatedBy: 'devU' }, {
            where: {
                movieId: movieId
            }
        }).then(data => {
                    resolve({ data: data });
            }).catch(err => {
                reject(err);
            });
    });

    deleteMovie = (param) => new Promise((resolve, reject) => {
        // const moviesDb = MoviesFactory(server.db);
        const { movieId } = param;

        this.movieModel.destroy({
            where: {
                movieId: movieId
            }
        }).then(data => {
                    resolve({ movieId: movieId });
            }).catch(err => {
                reject(err);
            });
    });

    insertBulk = (param) => new Promise((resolve, reject) => {
        // const moviesDb = MoviesFactory(server.db);
        let movies = [];

        if (param) {
            movies = param;

            this.movieModel.bulkCreate(movies, { validate: true })
                .then(data => {
                        resolve({ data: movies });
                }).catch(err => {
                    reject(err);
                });
        }
    });
}