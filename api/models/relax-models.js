/* A class representing a category of books. It holds all the books belonging to this category. */
const url = require("url");

class RelaxTechnique {
    constructor(name, title, cover, smalldescription, description, text) {
        this.name = name;
        this.title = title;
        this.cover = cover;
        this.smalldescription = smalldescription;
        this.description = description;
        this.text = text;
    }
}

class RelaxTechniqueModel {
    static TECHNIQUE_ID = 1;

    constructor() {
        this.relaxTechniques = new Map();
    }

    addRelaxTechnique(relaxTechnique) {
        relaxTechnique.id = RelaxTechniqueModel.TECHNIQUE_ID++;
        this.relaxTechniques.set(relaxTechnique, relaxTechnique.id);
    }

    getRelaxTechniques() {
        return Array.from(this.relaxTechniques.keys());
    }

    getRelaxTechnique(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be an number, but is a ${typeof id}`);
        }

        let relaxTechnique = null;

        for (let i = 0; i < this.getRelaxTechniques().length; i++) {
            if (this.getRelaxTechniques()[i].id === id) {
                relaxTechnique = this.getRelaxTechniques()[i];
            }
        }

        return relaxTechnique;
    }

    deleteRelaxTechnique(id) {
        this.relaxTechniques.delete(this.getRelaxTechnique(id));
    }
}

const model = new RelaxTechniqueModel();

const PMRTechnique = new RelaxTechnique("Progressive-Muscle-Relaxation", "Progressive Muscle Relaxation by Jacbson", "img/The-2-Minute-Rule.jpg", "Easy Physical Relaxation", "Muscle Relaxation due to ", "Ua ORRRRRRRRRRGER text");
model.addRelaxTechnique(PMRTechnique);
/*const fiftytwoseventeenTechnique = new Technique("fiftytwo-seventeen", "52/17", "img/fiftytwo-seventeen.jpg", "Work for 52 min - Break for 17 min", "A group find out that the most productive way is to work for 52 minutes, then take breaks for 17 minutes.", "Soooo ein langer Text");
model.addTechnique(fiftytwoseventeenTechnique);
const ninetyMinuteTechnique = new Technique("ninety-min", "90 MINUTE FOCUS BLOCK", "img/ninety-minute.jpg", "Similar to Pomodoro Technique", "The idea is to work in 90-minute blocks rather than 25 minute periods and make breaks for 20 minutes.", "Soooo ein langer Text");
model.addTechnique(ninetyMinuteTechnique);
const PomodoroTechnique = new Technique("pomodoro", "POMODORO", "img/Pomodoro.jpg", "Work for 25 min - Short Break for 5 min", "1. Set a timer for 25 minutes<br>2. Don't let you distract<br>3. Take a 5 min break<br>4. After four breaks do a 15 min break<br>5. Repeat!", "Soooo ein langer Text");
model.addTechnique(PomodoroTechnique);*/

module.exports = model;
