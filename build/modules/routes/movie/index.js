"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const sequelize_1 = __importDefault(require("sequelize"));
const schema_1 = require("./schema");
const movie_service_1 = require("../../services/movie-service");
const consumer_1 = require("../../../plugins/kafka/consumer");
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
                const { message, stack } = err;
                let errorMsg = {
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                    stack
                };
                server.apm.captureError(JSON.stringify(errorMsg));
                return reply.code(400).send({
                    success: false,
                    message: 'Error get data movies.',
                    err,
                });
            });
        }
        catch (error) {
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
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
                const { message, stack } = err;
                let errorMsg = {
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                    stack
                };
                server.apm.captureError(JSON.stringify(errorMsg));
                return reply.code(400).send({
                    success: false,
                    message: 'Error in insert new record.',
                    err,
                });
            });
        }
        catch (error) {
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
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
                    const { message, stack } = err;
                    let errorMsg = {
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        message,
                        stack
                    };
                    server.apm.captureError(JSON.stringify(errorMsg));
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
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/insert", { schema: schema_1.MovieTO }, (request, reply) => {
        try {
            const { name, genre, rating } = request.body;
            if (name && genre) {
                movie_service_1.insert(server, request.body)
                    .then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Insert successful!',
                        data
                    });
                }).catch(err => {
                    const { message, stack } = err;
                    let errorMsg = {
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        message,
                        stack
                    };
                    server.apm.captureError(JSON.stringify(errorMsg));
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
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/update", { schema: schema_1.UpdateMovieTO }, (request, reply) => {
        try {
            const { movieId, name, genre, rating } = request.body;
            if (movieId) {
                movie_service_1.update(server, request.body).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Update successful!',
                        data
                    });
                }).catch(err => {
                    const { message, stack } = err;
                    let errorMsg = {
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        message,
                        stack
                    };
                    server.apm.captureError(JSON.stringify(errorMsg));
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
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/delete", { schema: schema_1.DeleteMovieTO }, (request, reply) => {
        try {
            const { movieId } = request.body;
            if (movieId) {
                movie_service_1.deleteMovie(server, request.body).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Delete successful!',
                        data
                    });
                }).catch(err => {
                    const { message, stack } = err;
                    let errorMsg = {
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        message,
                        stack
                    };
                    server.apm.captureError(JSON.stringify(errorMsg));
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
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.get("/movie/model/getAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            movie_service_1.findAll(server)
                .then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Inquiry successful!',
                    data
                });
            }).catch(err => {
                const { message, stack } = err;
                let errorMsg = {
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                    stack
                };
                server.apm.captureError(JSON.stringify(errorMsg));
                return reply.code(400).send({
                    success: false,
                    message: 'Error in Inquiry',
                    data: err,
                });
            });
        }
        catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/model/getAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            movie_service_1.findAll(server)
                .then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Inquiry successful!',
                    data
                });
            }).catch(err => {
                const { message, stack } = err;
                let errorMsg = {
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                    stack
                };
                server.apm.captureError(JSON.stringify(errorMsg));
                return reply.code(400).send({
                    success: false,
                    message: 'Error in Inquiry',
                    data: err,
                });
            });
        }
        catch (error) {
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/movie/kafka/insertAll", { schema: schema_1.GetMovieTO }, (request, reply) => {
        try {
            const topic = "movies";
            let count = 0;
            let data = [];
            consumer_1.kafkaSubscribe2(server, topic, (messages) => {
                count++;
                data.push(messages);
                if (count == messages.highWaterOffset) {
                    let movies = [];
                    for (let i = 0; i < data.length; i++) {
                        let movieObj = JSON.parse(data[i].value);
                        movies.push(movieObj);
                    }
                    movie_service_1.insertBulk(server, movies)
                        .then(data => {
                        return reply.code(200).send({
                            success: true,
                            message: 'Insert All data successful!',
                            data
                        });
                    }).catch(err => {
                        const { message, stack } = err;
                        let errorMsg = {
                            method: request.routerMethod,
                            path: request.routerPath,
                            param: request.body,
                            message,
                            stack
                        };
                        server.apm.captureError(JSON.stringify(errorMsg));
                        return reply.code(400).send({
                            success: false,
                            message: 'Error in insert new records',
                            data: err,
                        });
                    });
                }
            });
        }
        catch (error) {
            const { message, stack } = error;
            let errorMsg = {
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));
            request.log.error(error);
            return reply.send(400);
        }
    });
    next();
});
//# sourceMappingURL=index.js.map