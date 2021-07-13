"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const sequelize_1 = __importDefault(require("sequelize"));
const schema_1 = require("./schema");
const movie_1 = require("../../../plugins/db/models/movie");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    server.get("/movie/getAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            const query = 'select * from [dbo].[Movies]';
            // const result = await 
            server.db.query(query, {
                type: sequelize_1.default.QueryTypes.SELECT
            }).then((data) => {
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch((err) => {
                return reply.code(400).send({
                    success: false,
                    message: 'Error get data movies.',
                    err,
                });
            });
        }
        catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/getAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            // const { name, genre, rating } = request.body;
            const query = `select * from [dbo].[Movies]`;
            server.db.query(query, {
                type: sequelize_1.default.QueryTypes.SELECT
            }).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data,
                });
            }).catch(err => {
                return reply.code(400).send({
                    success: false,
                    message: 'Error in insert new record.',
                    err,
                });
            });
        }
        catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/insert", { schema: schema_1.MovieTO }, (request, reply) => {
        try {
            const { name, genre, rating } = request.body;
            if (name && genre) {
                const query = `INSERT INTO [dbo].[Movies] ([name]
                    ,[genre]
                    ,[rating]
                    ,[createdDate]
                    ,[createdBy])
                     VALUES('${name}', '${genre}', '${rating}', GETDATE(), 'dev')`;
                server.db.query(query, {
                    type: sequelize_1.default.QueryTypes.INSERT
                }).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Insert successful!',
                        data,
                    });
                }).catch(err => {
                    return reply.code(400).send({
                        success: false,
                        message: 'Error in insert new record.',
                        err,
                    });
                });
            }
            else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request.'
                });
            }
        }
        catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/insert", { schema: schema_1.MovieTO }, (request, reply) => {
        try {
            const { name, genre, rating } = request.body;
            if (name && genre) {
                const userDb = movie_1.MoviesFactory(server.db);
                userDb.create({ name, genre, rating, createdBy: 'dev' })
                    .then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Insert successful!',
                        data: { name: data.name, rating: data.rating, createdBy: data.createdBy }
                    });
                }).catch(err => {
                    server.apm.captureError({
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        error: err,
                    });
                    return reply.code(400).send({
                        success: false,
                        message: 'Error in insert new record',
                        data: err,
                    });
                });
            }
            else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request'
                });
            }
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/update", { schema: schema_1.UpdateMovieTO }, (request, reply) => {
        try {
            const { movieId, name, genre, rating } = request.body;
            if (movieId) {
                const userDb = movie_1.MoviesFactory(server.db);
                userDb.update({ name, genre, rating, lastUpdatedBy: 'devU' }, {
                    where: {
                        movieId: movieId
                    }
                }).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Update successful!',
                        data
                    });
                }).catch(err => {
                    server.apm.captureError({
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        error: err,
                    });
                    return reply.code(400).send({
                        success: false,
                        message: 'Error updating record',
                        data: err,
                    });
                });
            }
            else {
                return reply.code(400).send({
                    success: false,
                    message: 'Update failed! Please check the request'
                });
            }
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/delete", { schema: schema_1.DeleteMovieTO }, (request, reply) => {
        try {
            const { movieId } = request.body;
            if (movieId) {
                const userDb = movie_1.MoviesFactory(server.db);
                userDb.destroy({
                    where: {
                        movieId: movieId
                    }
                }).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Delete successful!',
                        data
                    });
                }).catch(err => {
                    server.apm.captureError({
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        error: err,
                    });
                    return reply.code(400).send({
                        success: false,
                        message: 'Error deleting record',
                        data: err,
                    });
                });
            }
            else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request'
                });
            }
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.get("/movie/model/getAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            const userDb = movie_1.MoviesFactory(server.db);
            userDb.findAll()
                .then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Inquiry successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Error in Inquiry',
                    data: err,
                });
            });
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/getAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            const userDb = movie_1.MoviesFactory(server.db);
            userDb.findAll()
                .then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Inquiry successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Error in Inquiry',
                    data: err,
                });
            });
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    next();
});
//# sourceMappingURL=index.js.map