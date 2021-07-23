import * as instance from '../server';
import SequelizeMock from 'sequelize-mock';

import { MovieService } from "../modules/services/movieService";


//---------------------------------------------------------//
const dataInputMovie = {
  name: '1mockMovieName',
  genre: '1mockGenre',
  rating: 0,
//   createdBy: '1mockLogin',
};


const mockLoginData = {
  username: "testusername",
  password: "testpassword"
};

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZ3Nzc3MiLCJpYXQiOjE2MjY3OTk4NTd9.R4joffVJNpMpm_hrO5JLXkNU2NBlsvHTfVfhC_x_y8k";

const dataMockResp = {
    "success": "true",
    "message": "Insert successful!",
    "data": {
      ...dataInputMovie,
    //   "createdBy": mockLoginData.username
    }
  };

jest.setTimeout(12000);

let server: any;
beforeAll(async () => {
  server = await instance.createServer();
});


describe('server test', () => {

  test("GET returns 200", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
      headers: {
        'Authorization': token
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('{"hello":"world"}');

  });

});

describe('movie: insert', () => {

  test("POST returns 200", async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/movie/model/insert',
      headers: {
        'Authorization': token
      },
      body: dataInputMovie
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload).message).toBe('Insert successful!');

  });

});


//---------------------------------------------------------//

describe('Movie class', () => {
  const dbMock = new SequelizeMock();

  const movieService = new MovieService(dbMock);

  // Spying on the actual methods of the class
  jest.spyOn(movieService, 'insert');

  it('should insert movie data', async () => {
    const insertData = await movieService.insert(dataInputMovie);
    expect(insertData).toBeTruthy();
    expect(movieService.insert).toHaveBeenCalledTimes(1);
  });
});
