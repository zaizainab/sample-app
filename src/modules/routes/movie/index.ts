import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { MovieTO, GetMovieTO, UpdateMovieTO, DeleteMovieTO } from './schema';
import { MoviesFactory } from '../../../plugins/db/models/movie';


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
                return reply.code(400).send({
                    success: false,
                    message: 'Error get data movies.',
                    err,
                });
            });

        } catch (error) {
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
                return reply.code(400).send({
                    success: false,
                    message: 'Error in insert new record.',
                    err,
                });
            });

        } catch (error) {
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
                    return reply.code(400).send({
                        success: false,
                        message: 'Error in insert new record.',
                        err,
                    });
                });

            } else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request.'
                });
            }

        } catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/movie/model/insert", { schema: MovieTO }, (request, reply) => {
        try {
            const { name, genre, rating } = request.body;

            if (name && genre) {
                const userDb = MoviesFactory(server.db);

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
                        })

                        return reply.code(400).send({
                            success: false,
                            message: 'Error in insert new record',
                            data: err,
                        });
                    });
            } else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request'
                });
            }

        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/movie/model/update", { schema: UpdateMovieTO }, (request, reply) => {
        try {
            const { movieId, name, genre, rating } = request.body;

            if (movieId) {
                const userDb = MoviesFactory(server.db);

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
                    })

                    return reply.code(400).send({
                        success: false,
                        message: 'Error updating record',
                        data: err,
                    });
                });
            } else {
                return reply.code(400).send({
                    success: false,
                    message: 'Update failed! Please check the request'
                });
            }

        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/movie/model/delete", { schema: DeleteMovieTO }, (request, reply) => {
        try {
            const { movieId } = request.body;

            if (movieId) {
                const userDb = MoviesFactory(server.db);

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
                    })

                    return reply.code(400).send({
                        success: false,
                        message: 'Error deleting record',
                        data: err,
                    });
                });
            } else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request'
                });
            }

        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.get("/movie/model/getAll", { schema: GetMovieTO }, (request, reply) => {
        try {

            const userDb = MoviesFactory(server.db);

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
                    })

                    return reply.code(400).send({
                        success: false,
                        message: 'Error in Inquiry',
                        data: err,
                    });
                });


        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/movie/model/getAll", { schema: GetMovieTO }, (request, reply) => {
        try {

            const userDb = MoviesFactory(server.db);

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
                    })

                    return reply.code(400).send({
                        success: false,
                        message: 'Error in Inquiry',
                        data: err,
                    });
                });


        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    next();
});