const model = require("../models/learning-model");

class LearningController {
    static MANDATORY = ["name", "title", "cover", "smalldescription", "description", "text","source"];

    getTechniques(req, res) {
        res.send(model.getTechniques());
    }

    deleteTechnique(req, res) {
        if (model.getTechnique(parseInt(req.params.id))){
            res.status(200).send(model.deleteTechnique(parseInt(req.params.id)));
        }else{
            res.status(404).send("Delete Error: There is no Technique with the id " + parseInt(req.params.id) + "!");
        }
    }
}

module.exports = new LearningController();
