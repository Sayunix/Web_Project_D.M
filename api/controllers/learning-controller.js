const model = require("../models/learning-model");

class LearningController {
    static MANDATORY = ["name", "title", "cover", "description"];

    getTechniques(req, res) {
        res.send(model.getTechniques());
    }

    getTechnique(req, res) {
        const technique = model.getTechnique(req.params.id);
        if (technique) {
            res.send(technique);
        } else {
            res.status(404).send(`Technique with id ${req.params.id} not found.`);
        }
    }


    checkTechniqueProperties(res, technique, id) {
        let result = true;

        const mandatoryNames = [...LearningController.MANDATORY];

        if (id) {
            mandatoryNames.push("id");
        }

        const containedNames = mandatoryNames.filter(c => c in technique);
        if (containedNames.length < mandatoryNames.length) {
            const necessary = mandatoryNames.join(", ");
            const contained = containedNames.length === 0 ? "none of those" : "only " + containedNames.join(", ");
            res.status(400).send(`Technique data must include ${necessary}, but ${contained} present.`);
            result = false;
        }

        if (id && result) {
            if (technique.id !== id) {
                res.status(400).send(`Technique data can only be updated if the id in the path (${id}) and the id in the body (${technique.id}) match.`);
                result = false;
            }
        }

        return result;
    }

    createTechnique = (req, res) => {
        /* --- Task 2 ---
         * Add the book given in the request to the model.
         * Check the incoming data! The category must exist, the book data
         * include all necessary properties (you can use
         * checkBookProperties(res, req.body) to do that).
         *
         * After you created the book in the model, return it in the response
         */
        if (this.checkTechniqueProperties(res,req.body)){
            res.send(model.createTechnique(req.body));
        }
    }

    updateTechnique = (req, res) => {
        /* --- Task 3 ---
         * Add the book given in the request to the model.
         * Check the incoming data! The book with the given id must exists,
         * the id given in the path must match the id in the book, the book
         * data must include all necessary properties (you can use
         * checkBookProperties(res, req.body, parseInt(req.params.id))) to
         * accomplish that.
         *
         * After you updated the book in the model, send back status 200.
         */
        if (model.getTechnique(parseInt(req.params.id))){
            if (this.checkTechniqueProperties(res, req.body, parseInt(req.params.id))){
                res.status(200).send(model.updateTechnique(parseInt(req.params.id),req.body));
            }
        }else{
            res.status(404).send("Update Error: There is no Technique with the id " + parseInt(req.params.id) + "!");
        }
    }

    deleteTechnique(req, res) {
        /* --- Task 4 ---
         * Delete the given book from the model.
         * Check the incoming id!
         *
         * After deleting the book, send back status 204.
         */
        if (model.getTechnique(parseInt(req.params.id))){
            res.status(204).send(model.deleteTechnique(parseInt(req.params.id)));
        }else{
            res.status(404).send("Delete Error: There is no Technique with the id " + parseInt(req.params.id) + "!");
        }
    }
}

module.exports = new LearningController();
