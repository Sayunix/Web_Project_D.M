/* A class representing a category of books. It holds all the books belonging to this category. */
const url = require("url");

class Technique {
    constructor(name, title, cover, smalldescription, description) {
        this.name = name;
        this.title = title;
        this.cover = cover;
        this.smalldescription = smalldescription;
        this.description = description;
    }
}

class TechniqueModel {
    static TECHNIQUE_ID = 1;

    constructor() {
        this.techniques = new Map();
    }

    addTechnique(technique) {
        if (!this.techniques.get(technique)) {
            technique.id = TechniqueModel.TECHNIQUE_ID++;
            this.techniques.set(technique, new Map())
        }
    }

    getTechniques() {
        return Array.from(this.techniques.keys());
    }

    createTechnique(technique) {
        /* --- Task 2 ---
         * Add the received book to the given category in the model and return it. */
        this.addTechnique(technique);
        return technique;
    }

    updateTechnique(id, technique) {
        /* --- Task 3 --- Update the book with the given id in the model */
        Object.assign(this.getTechnique(id), technique);
        return this.getTechniques(id);

    }

    deleteTechnique(id) {
        /* --- Task 4 --- Delete the book with the given id from the model */
        this.techniques.get(this.getTechnique(id)).delete(id);
    }
}

const model = new TechniqueModel();

const blablaTechnique = new Technique("blabla", "BLALBA","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!");
model.addTechnique(blablaTechnique);
const blablTechnique = new Technique("blabl", "BLALB","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!");
model.addTechnique(blablTechnique);
const blabTechnique = new Technique("blab", "BLAL","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!");
model.addTechnique(blabTechnique);
const blaTechnique = new Technique("bla", "BLA","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!");
model.addTechnique(blaTechnique);
const PomodoroTechnique = new Technique("pomodoro", "POMODORO","img/test.jpg","1-2 sätze" ,"Pomodoror is dies und das und so!");
model.addTechnique(PomodoroTechnique);

module.exports = model;
