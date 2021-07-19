import fp from 'fastify-plugin';

import { PublishKafkaTO, PublishMoviesKafkaTO, SubscribeKafkaTO, TopicKafkaTO } from './schema';
import { kafkaSubscribe2 } from '../../../plugins/kafka/consumer';
import { createTopic, publish } from '../../../plugins/kafka/producer';
import { MoviesAttributes } from 'plugins/db/models/movie';


export default fp((server, opts, next) => {
    server.post("/kafka/subscribe", { schema: SubscribeKafkaTO }, (request, reply) => {
        try {
            const { topic } = request.body;

            let count = 0;
            let data = [];

            kafkaSubscribe2(server, topic, (messages) => {
                count++;
                data.push(messages);

                if (count == messages.highWaterOffset) {
                    return reply.code(200).send({
                        success: true,
                        message: 'Inquiry successful!',
                        data
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

    server.post("/kafka/create-topic", { schema: TopicKafkaTO }, (request, reply) => {
        try {
            const { topics } = request.body;

            createTopic(server.kafkaClient, topics).then((response) => {
                return reply.code(200).send({
                    success: true,
                    message: 'Create topic successful!',
                    data: response
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

    server.post("/kafka/publish", { schema: PublishKafkaTO }, (request, reply) => {
        try {
            const { topic, messages } = request.body;

            publish(server, topic, messages).then((response) => {
                return reply.code(200).send({
                    success: true,
                    message: 'Publish message successful!',
                    data: response 
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

    server.post("/movie/kafka/publish", { schema: PublishMoviesKafkaTO }, (request, reply) => {
        try {
            const { name, genre, rating } = request.body;

            const messages: MoviesAttributes = {
                name: name,
                genre: genre,
                rating: rating,
                createdBy: 'dev',
            };

            publish(server, 'movies', JSON.stringify(messages)).then((response) => {
                return reply.code(200).send({
                    success: true,
                    message: 'Publish message successful!',
                    data: response 
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

    next();
});