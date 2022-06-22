/* A class representing a category of techniques. It holds all the techniques belonging to this category. */
class Category {
    constructor(title, name) {
        this.name = name;
        this.title = title;
    }
}

class RelaxTechnique {
    constructor(name, title, video, text) {

        this.name = name;
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

const pmrCategory = new Category("Progressive Muscle Relaxation", "PMR", );
model.addCategory(pmrCategory);
model.addRelaxTechnique(pmrCategory, new RelaxTechnique("PMR1","<br>Progressive Muscle Relaxation<br>", "https://www.youtube.com/embed/watch?v=86HUcX8ZtAk&list=PL-yvVpWvnO7bM1-Yeueq1RxTYTzBaD73U",
    "<br><br>It’s normal to feel stressed sometimes. But if your stress builds up, or it continues for a period of time,\n" +
    "you might carry the tension in your muscles. You could have muscle tightness without even realizing it.\n" +
    "" +
    "One way to relieve muscle tension is to do progressive muscle relaxation, also known as Jacobson’s \n" +
    "relaxation technique. Progressive muscle relaxation (PMR) is a form of therapy that involves \n" +
    "tightening and relaxing your muscle groups, one at a time, in a specific pattern.\n" +
    "\n" +
    "The goal is to release tension from your muscles, while helping you recognize what that tension feels like.\n" +
    "\n" +
    "When practiced regularly, this technique may help you manage the physical effects of stress. \n" +
    "\n" +
    "PMR was created by American physician Edmund Jacobson in the 1920s. \n" +
    "It was based on the theory that physical relaxation can promote mental relaxation.\n" +
    "\n" +
    "<p><br>What are the benefits?<br>\n" +
    "\n" +
    "<br>Reduces anxiety and tension<br>\n" +
    "<br>Improves sleep<br>\n" +
    "<br>Eases neck pain<br>\n" +
    "<br>Reduces low back pain<br>\n" +
    "<br>Improves systolic blood pressure</p>\n" +
    "\n" +
    "<br>Tips for beginners<br>\n" +
    "If you’re new to relaxation techniques or PMR, consider these helpful tips:\n" +
    "\n" +
    "<br>Set aside 15 to 20 minutes for PMR. Do it in a quiet, comfortable area.\n" +
    "<br>Turn off your phone to avoid distractions.\n" +
    "<br>Avoid holding your breath, which can cause more tension. Inhale deeply when you tense your muscles and exhale fully when you relax.\n" +
    "<br>Move in a sequence that works for you. For example, you can start at your head if you want to, and move down your body.\n" +
    "<br>Wear loose, lightweight clothing.\n" +
    "<br>Practice PMR even when you’re feeling calm, especially in the beginning. This will make it easier to learn the method.<br><br>"));

const atCategory = new Category("Autogenic Training", "AT");
model.addCategory(atCategory);
model.addRelaxTechnique(atCategory, new RelaxTechnique("AT1", "<br>Autogenic Training<br>",
    "https://www.youtube.com/embed/videoseries?list=PL-yvVpWvnO7Z8H5zkeI_RDu75RjaU_Tq2",
    "<br><br>About autogenic training\n" +
    " Autogenic training is a relaxation technique developed by the German psychiatrist\n" +
    " Johannes Heinrich Schultz and first published in 1932.\n" +
    "\n" +
    " The technique involves the daily practice of sessions that last around 15 minutes,\n" +
    "     usually in the morning, at lunch time, and in the evening.\n<br>" +
    "\n" +
    "     <br>Symptom effectiveness<br>" +
    " Autogenic training has been found to be effective in reducing general symptoms of anxiety,\n" +
    "     <br> irritability and fatigue. It can also be useful to increase resistance to stress and reduce sleeping " +
    "  problems. <br> It can help you during periods of stress to feel more relaxed and be able to concentrate more effectively.\n<br>" +
    "\n" +
    "     <br>1. Heaviness, which promotes relaxation of the voluntary muscles of the limbs, reversing the tension in the limbs typical of the stress response\n" +
    "     <br>2. Warmth, which opens the blood vessels in your arms and legs, reversing the flow of blood to the center of the body typical of the stress response\n" +
    "     <br>3. Regular heartbeat, which helps to normalize the heart rate, reversing the quickened heart rate characteristic of the stress response\n" +
    "     <br>4. Regular breathing, which helps to normalize breath rate, reversing the quickened breath rate characteristic of the stress response\n" +
    "     <br>5. Relaxation and warming of the abdomen, which reverses the flow away from the digestive system typical of the stress response\n" +
    "     <br>6. Cooling of the head, which reverses the flow of blood to the brain typical of the stress response\n <br>" +
    "\n" +
    "     <br>Contraindications<br> " +
    " Autogenic training is not recommended for individuals with severe mental or emotional disorders.\n" +
    "     <br>If you have any health issues, you should consult with your doctor prior to beginning autogenic training.\n" +
    "     <br>If you feel very anxious or restless or experience any adverse side effects during or after autogenic training,\n" +
    "           please discontinue and consult a professional Autogenic Training instructor or your doctor.\n" +
    "     <br>Source: https://services.unimelb.edu.au/counsel/resources/guided-exercises/autogenic-training<br><br>"));


module.exports = model;
