"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovieTO = exports.UpdateMovieTO = exports.GetMovieTO = exports.MovieTO = void 0;
exports.MovieTO = {
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
exports.GetMovieTO = {
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
exports.UpdateMovieTO = {
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
exports.DeleteMovieTO = {
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
//# sourceMappingURL=schema.js.map