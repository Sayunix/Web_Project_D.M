const model = require("../models/learning-model");

class LearningController {
    static MANDATORY = ["name", "title", "cover", "smalldescription", "description", "text"];

    getTechniques(req, res) {
        res.send(model.getTechniques());
    }
}

module.exports = new LearningController();
