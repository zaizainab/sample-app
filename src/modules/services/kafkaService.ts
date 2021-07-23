import { kafkaSubscribe2 } from '../../plugins/kafka/consumer';
import { MovieService } from '../services/movieService';

export class KafkaMonitor {
    server: any;

    constructor(serverInstance) {
        this.server = serverInstance;
    }

    subscribeTopicMovies = async () => {
        await kafkaSubscribe2(this.server, 'movies', (messages) => {
            this.server.log.info(messages);
            
            const movieService = new MovieService(this.server.db);
            movieService.insert(JSON.parse(messages.value.toString()));
        });

    };


}