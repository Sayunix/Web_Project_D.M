/* A class representing a category of techniques. It holds all the techniques belonging to this category. */
class Category {
    constructor(title, name) {
        this.name = name;
        this.title = title;
    }
}

class RelaxTechnique {
    constructor(title, video, text) {

        this.title = title;
        this.video= video;
        this.text = text;
    }
}

class RelaxTechniqueModel {
    static CATEGORY_ID = 1;
    static RELAX_TECHNIQUE_ID = 1;

    constructor() {
        this.relaxTechniques = new Map();
    }

    addCategory(category) {
        if (!this.relaxTechniques.get(category)) {
            category.id = RelaxTechniqueModel.CATEGORY_ID++;
            this.relaxTechniques.set(category, new Map())
        }
    }
    getCategories() {
        return Array.from(this.relaxTechniques.keys());
    }

    addRelaxTechnique(category, relaxTechnique) {
        if (!this.relaxTechniques.get(category)) {
            throw new Error(`Unknown relaxing technique category ${category.name}`)
        }
        relaxTechnique.id = RelaxTechniqueModel.RELAX_TECHNIQUE_ID++;
        this.getRelaxTechniquesAsMap(category).set(relaxTechnique.id, relaxTechnique);
    }

    getRelaxTechniques(category) {
        return Array.from(this.getRelaxTechniquesAsMap(category).values());
    }

    resolveCategory(category) {
        if (typeof category === "string") {
            for (const [_category, relaxTechniques] of this.relaxTechniques.entries()) {
                if (_category.name === category) {
                    return _category;
                }
            }
            throw new Error(`Unknown relax technique category ${category}`)
        }

        return category;
    }

    getRelaxTechniquesAsMap(category) {
        return this.relaxTechniques.get(this.resolveCategory(category));
    }

    getCategory(id) {
        for (const [ category, relaxTechniquesAsMap] of this.relaxTechniques.entries()) {
            const relaxTechniques = Array.from(relaxTechniquesAsMap.values());
            if (relaxTechniques.find(relaxTechnique => relaxTechnique.id === id)) {
                return category;
            }
        }

        return null;
    }

    getRelaxTechnique(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be an number, but is a ${typeof id}`);
        }

        let relaxTechnique = null;

        const category = this.getCategory(id);
        if (category) {
            relaxTechnique = this.relaxTechniques.get(category).get(id);
        }

        return relaxTechnique;
    }

    createRelaxTechnique(category, relaxTechnique) {

         //Add the received relax technique to the given category in the model and return it. */

        this.addRelaxTechnique(category,relaxTechnique);
        return relaxTechnique;

    }

    updateRelaxTechnique(id, relaxTechnique) {
        //Update the technique with the given id in the model */

        const target = this.getRelaxTechnique(id);
        if(!target){
            throw new Error(`Relaxing technique with ${id} does not exist and cannot be updated`)
        }
        Object.assign(target, relaxTechnique);
        return target;

    }


    deleteRelaxTechnique(id) {
        //- Delete the technique with the given id from the model

        let removed = false;
        const category = this.getCategory(id);
        if(category){
            removed = this.relaxTechniques.get(category).delete(id);
        }
        return removed;

    }

}

const model = new RelaxTechniqueModel();

const pmrCategory = new Category("Progressive Muscle Relaxation by Jacbson", "PMR", );
model.addCategory(pmrCategory);
model.addRelaxTechnique(pmrCategory, new RelaxTechnique("Progressive Muscle Relaxation by Jacbson", "VIDEO", "text"));

const atCategory = new Category("Autogenic Training", "AT");
model.addCategory(atCategory);
model.addRelaxTechnique(atCategory, new RelaxTechnique("Autogenic Training", "ADD VIDEO", "Texti"));

const relaxMusic = new Category( "Relaxing Music", "RM",);
model.addCategory(relaxMusic);
model.addRelaxTechnique(relaxMusic, new RelaxTechnique("Relaxing music", "ADD Music VIDEO", "Texti vong musik" ));

module.exports = model;
