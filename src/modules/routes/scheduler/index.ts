import fp from 'fastify-plugin';
import moment from 'moment';
import { SimpleIntervalJob, AsyncTask, Task } from 'toad-scheduler';
import { publish } from '../../../plugins/kafka/producer';

let counter = 0;

export default fp(async (server, options) => {
    
    // const taskDummy1 = new AsyncTask('jobDummyId1', () => new Promise((resolve, reject) => {
    //     console.log(`----------------Start Job ${moment().format('YYYYMMDD.HH:mm:ss')}----------------`);
    //     try {
    //         console.log(`JobRunning${counter}`);
    //         counter++;
    //         resolve();
    //     } catch (error) {
    //         console.error(`JobRunning${counter} - error`);
    //         reject(error);
    //     } finally {
    //         console.log(`----------------End of Job ${moment().format('YYYYMMDD.HH:mm:ss')}----------------`);
    //     }
    // }), err => {
    //     console.log(`JobRunning${counter} - error`, err);
    // });
    // const job1 = new SimpleIntervalJob({ seconds: 10, runImmediately: true }, taskDummy1, 'jobDummyId1')
    // server.scheduler.addSimpleIntervalJob(job1);

    const publishMessage = new AsyncTask('publishMessageMovie', () => new Promise((resolve, reject) => {
        console.log(`----------------Start Job ${moment().format('YYYYMMDD.HH:mm:ss')}----------------`);
        try {
            counter++;

            const messages = {
                name: `movieName${counter}`,
                genre: `genre${counter}`,
                rating: 6,
                createdBy: 'mockDev',
            };

            publish(server, 'movies', JSON.stringify(messages)).then((response) => {
                return resolve();
            });

        } catch (error) {
            console.error(`JobRunning${counter} - error`);
            reject(error);
        } finally {
            console.log(`----------------End of Job ${moment().format('YYYYMMDD.HH:mm:ss')}----------------`);
        }
    }), err => {
        console.log(`JobRunning${counter} - error`, err);
    });
    const jobPublish = new SimpleIntervalJob({ seconds: 10, runImmediately: true }, publishMessage, 'publishMessageMovie')
    server.scheduler.addSimpleIntervalJob(jobPublish);
});