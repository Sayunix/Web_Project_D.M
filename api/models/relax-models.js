/* A class representing a category of books. It holds all the books belonging to this category. */
const url = require("url");
const {text} = require("express");

class RelaxTechnique {
    constructor(title, text) {

        this.title = title;
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

const PMRTechnique = new RelaxTechnique( "Progressive Muscle Relaxation by Jacbson",  "henlo bitte halo domo arigato")
model.addRelaxTechnique(PMRTechnique);
const ATTechnique = new RelaxTechnique( "Autogenic Training",  "Heast");
model.addRelaxTechnique(ATTechnique);
const MusicRelax = new RelaxTechnique("Relaxation Music",  "Kannst bitte 1x leiwand sein?");
model.addRelaxTechnique(MusicRelax);

module.exports = model;
