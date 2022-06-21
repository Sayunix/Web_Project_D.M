const model = require("../models/relax-models");

class RelaxController {
    static MANDATORY = ["name", "title", "text"];

    getRelaxTechniques(req, res) {
        res.send(model.getRelaxTechniques());
    }

    deleteRelaxTechnique(req, res) {
        if (model.getRelaxTechnique(parseInt(req.params.id))){
            res.status(200).send(model.deleteRelaxTechnique(parseInt(req.params.id)));
        }else{
            res.status(404).send("Delete Error: There is no Technique with the id " + parseInt(req.params.title) + "!");
        }
    }
}

module.exports = new RelaxController();
