import { INTEGER } from "sequelize/types";

export const MovieTO = {
    description: 'Data Movie',
    tags: ['Movie'],
    summary: 'Movie',
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            genre: { type: 'string' },
            rating: { type: 'number' },
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    name: { type: 'string' },
                    genre: { type: 'string' },
                    rating: { type: 'number' },
                    createdBy: { type: 'string' },
                }
            }
        }
    }
};

export const GetMovieTO = {
    description: 'Data Movie',
    tags: ['Movie'],
    summary: 'Movie',
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    name: { type: 'string' },
                    genre: { type: 'string' },
                    rating: { type: 'number' },
                    createdBy: { type: 'string' },
                }
            }
        }
    }
};

export const UpdateMovieTO = {
    description: 'Data Movie',
    tags: ['Movie'],
    summary: 'Movie',
    body: {
        type: 'object',
        properties: {
            movieId: { type: 'number' },
            name: { type: 'string' },
            genre: { type: 'string' },
            rating: { type: 'number' },
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    movieId: { type: 'number' },
                    name: { type: 'string' },
                    genre: { type: 'string' },
                    rating: { type: 'number' },
                    lastUpdatedBy: { type: 'string' },
                }
            }
        }
    }
};

export const DeleteMovieTO = {
    description: 'Data Movie',
    tags: ['Movie'],
    summary: 'Movie',
    body: {
        type: 'object',
        properties: {
            movieId: { type: 'number' },
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    movieId: { type: 'number' },
                    name: { type: 'string' },
                    genre: { type: 'string' },
                    rating: { type: 'number' },
                    lastUpdatedBy: { type: 'string' },
                }
            }
        }
    }
};

export const MovieRedisTO = {
    description: 'Redis',
    tags: ['Redis'],
    summary: 'add movie data to redis',
    // body: {
    //     type: 'object',
    //     properties: {
    //         key: { type: 'string' },
    //         value: { type: 'string' },
    //     }
    // },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: { 
                    data: {
                        movieId: { type: 'string' },
                        name: { type: 'string' },
                        genre: { type: 'string' },
                        rating: { type: 'number' },
                        createdDate: { type: 'date'},
                        createdBy: { type: 'string' },
                        LastUpdatedDate: { type: 'date' },
                        LastUpdatedBy: { type: 'string' },
                    },
                 },
            }
        }
    }
}