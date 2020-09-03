const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

// comentario
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {id,title, url, techs, likes} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const indexId = repositories.findIndex(repository =>
    repository.id === id);

    if(indexId === -1){
      return response.status(400).json({mensage: 'Repository does not exist.'});
    }

    const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[indexId].likes,
    }

    repositories[indexId] = repository

    return response.status(202).json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const indexId = repositories.findIndex(repository =>
    repository.id === id);

    if(indexId >= 0 ){
      repositories.splice(indexId, 1);
    }else{
      return response.status(400).json({mensage: 'Repository does not exist.'});
    }
    
    return response.status(204).send();    
  });


app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const indexId = repositories.findIndex(repository =>
    repository.id === id);

  if(indexId <0){
    return response.status(400).json({mensage: 'Repository does not exist.'});
  }

  repositories[indexId].likes += 1;

  return response.json(repositories[indexId]);
});

module.exports = app;