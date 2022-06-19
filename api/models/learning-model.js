/* A class representing a category of books. It holds all the books belonging to this category. */
const url = require("url");

class Technique {
    constructor(name, title, cover, smalldescription, description, text) {
        this.name = name;
        this.title = title;
        this.cover = cover;
        this.smalldescription = smalldescription;
        this.description = description;
        this.text = text;
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
}

const model = new TechniqueModel();

const blablaTechnique = new Technique("blabla", "BLALBA","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!", "Soooo ein langer Text");
model.addTechnique(blablaTechnique);
const blablTechnique = new Technique("blabl", "BLALB","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!","Soooo ein langer Text");
model.addTechnique(blablTechnique);
const blabTechnique = new Technique("blab", "BLAL","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!","Soooo ein langer Text");
model.addTechnique(blabTechnique);
const blaTechnique = new Technique("bla", "BLA","img/test.jpg","1-2 sätze" ,"BLABLA is dies und das und so!","Soooo ein langer Text");
model.addTechnique(blaTechnique);
const PomodoroTechnique = new Technique("pomodoro", "POMODORO","img/test.jpg","1-2 sätze" ,"Pomodoror is dies und das und so!","Soooo ein langer Text");
model.addTechnique(PomodoroTechnique);

module.exports = model;
