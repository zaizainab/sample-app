"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesFactory = exports.Movies = void 0;
const sequelize_1 = require("sequelize");
class Movies extends sequelize_1.Model {
}
exports.Movies = Movies;
const movies = {
    movieId: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    genre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    rating: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    createdDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW, allowNull: false },
    createdBy: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    LastUpdatedDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW, allowNull: true },
    LastUpdatedBy: { type: sequelize_1.DataTypes.STRING, allowNull: true },
};
const MoviesFactory = (sequalize) => {
    const attributes = movies;
    return sequalize.define("Movies", attributes, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,
        // If don't want createdAt
        createdAt: false,
        // If don't want updatedAt
        updatedAt: false,
    });
};
exports.MoviesFactory = MoviesFactory;
//# sourceMappingURL=movie.js.map