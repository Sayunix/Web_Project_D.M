const { Router } = require('express');
const { createRelaxTechnique } = require('../controllers/relax-controller');
const controller = require('../controllers/relax-controller');

const routes = Router();

routes.get('/categories', controller.getCategories);
routes.get('/categories/:category/relaxTechniques', controller.getCategoryRelaxTechniques);
routes.get('/relaxTechniques/:id', controller.getRelaxTechnique);

/* Add a route to create new technique-

 */

routes.post('/categories/:category/relaxTechniques', controller.createRelaxTechnique);

/*  Add a technique to update a technique
 */

routes.put('/categories/:category/relaxTechniques/:id', controller.updateRelaxTechnique);

/* Add a route to delete a technique

 */

routes.delete('/categories/:category/relaxTechniques/:id', controller.deleteRelaxTechnique);



module.exports = routes;
