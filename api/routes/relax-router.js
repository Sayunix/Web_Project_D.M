const { Router } = require('express');
const controller = require('../controllers/relax-controller');

const routes = Router();

routes.get('/RelaxTechniques', controller.getRelaxTechniques);

routes.delete('/RelaxTechniques/:id', controller.deleteRelaxTechnique);

module.exports = routes;

/* --- Task 2 --- Add a route to create new books
endpoint: /categories/:category/books
*/

routes.post('/RelaxTechniques', controller.addRelaxTechnique());

/* --- Task 3 --- Add a route to update a book
   endpoint: /books/:id


 */

routes.put('/books/:id', controller.updateBook);
