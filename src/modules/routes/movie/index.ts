import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { MovieTO, GetMovieTO, UpdateMovieTO, DeleteMovieTO } from './schema';
import { MoviesAttributes, MoviesFactory } from '../../../plugins/db/models/movie';
import { deleteMovie, findAll, insert, insertBulk, update } from '../../services/movie-service';
import { kafkaSubscribe2 } from '../../../plugins/kafka/consumer';


export default fp((server, opts, next) => {

    server.get("/movie/getAll", { schema: GetMovieTO }, (request, reply) => {
        try {
            const query = 'select * from [dbo].[Movies]';

            // const result = await 
            server.db.query(query, {
                type: Sequelize.QueryTypes.SELECT
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

        } catch (error) {
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

    server.post("/movie/getAll", { schema: GetMovieTO }, (request, reply) => {
        try {
            // const { name, genre, rating } = request.body;

            const query = `select * from [dbo].[Movies]`;

            server.db.query(query, {
                type: Sequelize.QueryTypes.SELECT
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

        } catch (error) {
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

    server.post("/movie/insert", { schema: MovieTO }, (request, reply) => {
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
                    type: Sequelize.QueryTypes.INSERT
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

            } else {
                const message = 'Insert failed! Please check the request';
                let errorMsg = {

                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                };
                server.apm.captureError(JSON.stringify(errorMsg));

                return reply.code(400).send({
                    success: false,
                    message
                });
            }

        } catch (error) {
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

    server.post("/movie/model/insert", { schema: MovieTO }, (request, reply) => {
        try {
            const { name, genre, rating } = request.body;

            if (name && genre) {

                insert(server, request.body)
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
            } else {
                const message = 'Insert failed! Please check the request';
                let errorMsg = {

                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                };
                server.apm.captureError(JSON.stringify(errorMsg));

                return reply.code(400).send({
                    success: false,
                    message
                });
            }

        } catch (error) {
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

    server.post("/movie/model/update", { schema: UpdateMovieTO }, (request, reply) => {
        try {
            const { movieId, name, genre, rating } = request.body;

            if (movieId) {

                update(server, request.body).then(data => {
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
            } else {
                const message = 'Update failed! Please check the request';
                let errorMsg = {

                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                };
                server.apm.captureError(JSON.stringify(errorMsg));

                return reply.code(400).send({
                    success: false,
                    message
                });
            }

        } catch (error) {
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

    server.post("/movie/model/delete", { schema: DeleteMovieTO }, (request, reply) => {
        try {
            const { movieId } = request.body;

            if (movieId) {

                deleteMovie(server, request.body).then(data => {
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
            } else {
                const message = 'Delete failed! Please check the request';
                let errorMsg = {

                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                };
                server.apm.captureError(JSON.stringify(errorMsg));

                return reply.code(400).send({
                    success: false,
                    message
                });
            }

        } catch (error) {
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

    server.get("/movie/model/getAll", { schema: GetMovieTO }, (request, reply) => {
        try {

            findAll(server)
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


        } catch (error) {

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/movie/model/getAll", { schema: GetMovieTO }, (request, reply) => {
        try {

            findAll(server)
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


        } catch (error) {
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

    server.post("/movie/kafka/insertAll", { schema: GetMovieTO }, (request, reply) => {
        try {
            const topic = "movies";
            let count = 0;
            let data = [];

            kafkaSubscribe2(server, topic, (messages) => {
                count++;
                data.push(messages);

                if (count == messages.highWaterOffset) {
                    let movies = [];                    

                    for (let i = 0; i < data.length; i++) {
                        const movieObj = JSON.parse(data[i].value);

                        const movie: MoviesAttributes = {
                            name: movieObj.name,
                            genre: movieObj.genre,
                            rating: movieObj.rating,
                            createdBy: 'dev'
                        };

                        movies.push(movie);
                    }

                    insertBulk(server, movies)
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

        } catch (error) {
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