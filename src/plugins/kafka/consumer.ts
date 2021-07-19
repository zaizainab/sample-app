import { KafkaClient, Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions, KafkaClientOptions } from 'kafka-node';

import { kafkaConfig } from './config'
/**
 * Kafka Consumer
 */

export const kafkaSubscribe2 = (server: any, topic: string, send: (message: Message) => void) => {
    const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
    const options: ConsumerOptions = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

    const client = new KafkaClient(kafkaConfig(server));
    const consumer = new Consumer(client, topics, options);

    consumer.on('error', (err) => {
        console.log('error', err);
    });

    client.refreshMetadata([topic], (err: Error): void => {
        const offset = new Offset(client);
        if (err) {
            throw err;
        }

        consumer.on('message', (message) => {
            send(message);
        });

        /*
         * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
         */
        consumer.on('offsetOutOfRange', (topicRequest: OffsetFetchRequest): void => {
            offset.fetch([topicRequest], function (error, offsets): void {
                if (error) {
                    return console.error(error);
                }
                const min = Math.min.apply(null, offsets[topicRequest.topic][topicRequest.partition]);
                consumer.setOffset(topicRequest.topic, topicRequest.partition, min);
            });
        });
    });
};

