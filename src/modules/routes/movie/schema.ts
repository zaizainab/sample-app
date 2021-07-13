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