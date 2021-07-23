
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
// import internal from "stream";

export interface MoviesAttributes {
    movieId?: string;
    name: string;
    genre: string;
    rating: number;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
}

export interface MoviesModel extends Model<MoviesAttributes>, MoviesAttributes { }
export class Movies extends Model<MoviesModel, MoviesAttributes> { }

export type MoviesStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MoviesModel;
};

const movies = {
    movieId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: { type: DataTypes.STRING, allowNull: false},
    genre: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: true },
    createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    LastUpdatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
    LastUpdatedBy: { type: DataTypes.STRING, allowNull: true },
};


export const MoviesFactory = (sequelize: Sequelize): MoviesStatic => {
    const attributes = movies;
    return <MoviesStatic>sequelize.define("Movies", attributes, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
};