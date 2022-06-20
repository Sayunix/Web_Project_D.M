const { Router } = require('express');
const controller = require('../controllers/learning-controller');

const routes = Router();

routes.get('/techniques', controller.getTechniques);

routes.delete('/techniques/:id', controller.deleteTechnique);

module.exports = routes;
