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
        technique.id = TechniqueModel.TECHNIQUE_ID++;
        this.techniques.set(technique, technique.id);
    }

    getTechniques() {
        return Array.from(this.techniques.keys());
    }

    getTechnique(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be an number, but is a ${typeof id}`);
        }

        let technique = null;

        for (var i = 0; i < this.getTechniques().length; i++) {
            if (this.getTechniques()[i].id === id){
                technique = this.getTechniques()[i];
            }
        }

        return technique;
    }

    deleteTechnique(id) {
        this.techniques.delete(this.getTechnique(id));
    }
}

const model = new TechniqueModel();

const twominuteruleTechnique = new Technique("two-minute", "THE 2 MINUTE RULE","img/The-2-Minute-Rule.jpg","Work with full focus just for 2 minutes" ,"You start to work just for 2 minutes. After the 2 minutes you decide what to fo next. This Rule is a mental trick that forces you into action.","Soooo ein langer Text");
model.addTechnique(twominuteruleTechnique);
const fiftytwoseventeenTechnique = new Technique("fiftytwo-seventeen", "52/17","img/fiftytwo-seventeen.jpg","Work for 52 min - Break for 17 min" ,"A group find out that the most productive way is to work for 52 minutes, then take breaks for 17 minutes.","Soooo ein langer Text");
model.addTechnique(fiftytwoseventeenTechnique);
const ninetyMinuteTechnique = new Technique("ninety-min", "90 MINUTE FOCUS BLOCK","img/ninety-minute.jpg","Similar to Pomodoro Technique" ,"The idea is to work in 90-minute blocks rather than 25 minute periods and make breaks for 20 minutes.","Soooo ein langer Text");
model.addTechnique(ninetyMinuteTechnique);
const PomodoroTechnique = new Technique("pomodoro", "POMODORO","img/Pomodoro.jpg","Work for 25 min - Short Break for 5 min" ,"1. Set a timer for 25 minutes<br>2. Don't let you distract<br>3. Take a 5 min break<br>4. After four breaks do a 15 min break<br>5. Repeat!","Soooo ein langer Text");
model.addTechnique(PomodoroTechnique);

module.exports = model;
