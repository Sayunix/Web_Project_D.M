const { Router } = require('express');
const controller = require('../controllers/learning-controller');

const routes = Router();

routes.get('/techniques', controller.getTechniques);

module.exports = routes;
