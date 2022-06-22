const model = require("../models/relax-models");

class RelaxController {
    static MANDATORY = ["name", "title", "video", "text"];

    getCategories(req, res) {
        res.send(model.getCategories());
    }

    getCategoryRelaxTechniques(req, res) {
        res.send(model.getRelaxTechniques(req.params.category));
    }

    //req(Request) = Client to Sever, res(Response)= Response from Server to client
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

        const categoryAsString = req.params.category;
        const relaxTechnique = req.body;
        try{
            const category = model.resolveCategory(categoryAsString);
            if(this.checkRelaxTechniqueProperties(res, relaxTechnique)){
                res.send(model.createRelaxTechnique(category, relaxTechnique));
            }

        }catch(e){
            res.status(404).send(`Category ${categoryAsString} does not exist. Technique cannot be created.`);
        }


    }

    updateRelaxTechnique = (req, res) => {

        const id = parseInt(req.params.id);

        if(!model.getRelaxTechnique(id)){//if no technique with an id
            res.status(404).send(`No technique with id ${id} exists. Update not possible.`);
        } else {
            const relaxTechnique = req.body;
            if(this.checkRelaxTechniqueProperties(res, relaxTechnique, id)){
                model.updateRelaxTechnique(id, relaxTechnique)
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
            res.status(404).send(`No technique with id ${id} exists. Delete not possible.`);
        } else {
            model.deleteRelaxTechnique(id);
            res.sendStatus(204);
        }
    }
}


module.exports = new RelaxController();
