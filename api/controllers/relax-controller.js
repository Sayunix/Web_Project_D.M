const model = require("../models/relax-models");

class RelaxController {
    static MANDATORY = ["title", "video", "text"];

    getCategories(req, res) {
        res.send(model.getCategories());
    }

    getCategoryRelaxTechniques(req, res) {
        res.send(model.getRelaxTechniques(req.params.category));
    }

    getRelaxTechnique(req, res) {
        const relaxTechnique = model.getRelaxTechnique(parseInt(req.params.id));
        if (relaxTechnique) {
            res.send(relaxTechnique);
        } else {
            res.status(404).send(`Relaxing technique with id ${req.params.id} not found.`);
        }
    }

    checkRelaxTechniqueProperties(res, relaxTechnique, id) {
        let result = true;

        const mandatoryNames = [...RelaxController.MANDATORY];

        if (id) {
            mandatoryNames.push("id");
        }

        const containedNames = mandatoryNames.filter(c => c in relaxTechnique);
        if (containedNames.length < mandatoryNames.length) {
            const necessary = mandatoryNames.join(", ");
            const contained = containedNames.length === 0 ? "none of those" : "only " + containedNames.join(", ");
            res.status(400).send(`Technique data must include ${necessary}, but ${contained} present.`);
            result = false;
        }

        // If id given, check if it matches the one in the technique
        if (id && result) {
            if (relaxTechnique.id !== id) {
                res.status(400).send(`Technique data can only be updated if the id in the path (${id}) and the id in the body (${relaxTechnique.id}) match.`);
                result = false;
            }
        }

        return result;
    }

    createRelaxTechnique = (req, res) => {

        /* --- Task 2 ---
         * Add the book given in the request to the model.
         * Check the incoming data! The category must exist, the book data
         * include all necessary properties (you can use
         * checkBookProperties(res, req.body) to do that).
         *
         * After you created the book in the model, return it in the response
         */
        const categoryAsString = req.params.category;
        const book = req.body;
        try{
            const category = model.resolveCategory(categoryAsString);
            if(this.checkRelaxTechniqueProperties(res, book)){
                res.send(model.createRelaxTechnique(category, book));
            }

        }catch(e){
            res.status(404).send('Category ${categoryAsString} does not exist. Technique cannot be created.');
        }


    }

    updateRelaxTechnique = (req, res) => {
        /*
         * Add the technique given in the request to the model.
         * Check the incoming data! The book with the given id must exists,
         * the id given in the path must match the id in the book, the book
         * data must include all necessary properties (you can use
         * checkBookProperties(res, req.body, parseInt(req.params.id))) to
         * accomplish that.
         *
         * After you updated the book in the model, send back status 200.
         */

        const id = parseInt(req.params.id);

        if(!model.getRelaxTechnique(id)){
            res.status(404).send('No book with id ${id} exists. Update not possible.');
        } else {
            const book = req.body;
            if(this.checkRelaxTechniqueProperties(res, book, id)){
                model.updateRelaxTechnique(id, book)
                res.sendStatus(200);
            }
        }
    }


    deleteRelaxTechnique(req, res) {
        /*
         * Delete the given technqiue from the model.
         * Check the incoming id!
         *
         * After deleting the technique, send back status 204.
         */
        const id = parseInt(req.params.id);
        if(!model.getRelaxTechnique(id)){
            res.status(404).send('No technique with id ${id} exists. Delete not possible.');
        } else {
            model.deleteRelaxTechnique(id);
            res.sendStatus(204);
        }
    }
}


module.exports = new RelaxController();
