class ElementCreator {
    constructor(tag) {
        this.element = document.createElement(tag);
    }

    id(id) {
        this.element.id = id;
        return this;
    }

    class(clazz) {
        this.element.class = clazz;
        return this;
    }

    text(content) {
        this.element.innerHTML = content;
        return this;
    }

    with(name, value) {
        this.element.setAttribute(name, value)
        return this;
    }

    listener(name, listener) {
        this.element.addEventListener(name, listener)
        return this;
    }

    append(child) {
        child.appendTo(this.element);
        return this;
    }

    prependTo(parent) {
        parent.prepend(this.element);
        return this.element;
    }

    appendTo(parent) {
        parent.append(this.element);
        return this.element;
    }

    insertBefore(parent, sibling) {
        parent.insertBefore(this.element, sibling);
        return this.element;
    }
}

/* A class representing a category of books. It holds all the books belonging to this category.
 *
 * If you wonder what the three dots in the constructor are all about, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
 */
class Technique {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
}

/* The BookStore class is what renders the books in the DOM and houses the shopping cart. */
class LearningMethod {
    /* MAX_QUANTITY is the maximum quantity a user can order. You should use this constant in
     * your code to control the number of options you create in the quantity select elements.
     *
     * If you want to know more about static properties, read this article:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
     */

    add(techniques) {
        for (const technique of techniques) {
            this.addTechniqueToDOM(technique);
        }
    }

    addToDOM(technique) {

        for (const article of document.querySelectorAll("article")) {
            article.remove();
        }

        this.addTechniqueToDOM(technique);
    }

    addTechniqueToDOM(technique) {
        new ElementCreator("article")
            .id(technique.id)
            .append(new ElementCreator("div")
                .id("div-"+technique.name)
                .append(new ElementCreator("h3")
                    .id("h3-"+technique.name)
                    .text(technique.title))
                .append(new ElementCreator("span")
                    .id("span-"+technique.name)
                    .text(technique.smalldescription))
                .append(new ElementCreator("p")
                    .id("p-"+technique.name)
                    .text(technique.description)))
            .listener("click", () => {
                if (document.getElementById("text") != null){
                    document.getElementById("text").remove();
                }
                new ElementCreator("article")
                    .id("text")
                    .append(new ElementCreator("h2")
                        .id("h2-text")
                        .text(technique.title))
                    .append(new ElementCreator("p")
                        .id("p-text")
                        .text(technique.text+"<br><br>"))
                    .append(new ElementCreator("p")
                        .id("source-text")
                        .text("Source: "+technique.source))
                    .appendTo(document.getElementById("Section-text"))
                document.getElementById("h2-text").scrollIntoView({behavior: 'smooth', block: 'start'});

            })
    .insertBefore(document.querySelector("section"));


        document.getElementById(technique.id).className = "card";
        document.getElementById("div-"+technique.name).className = "card_content";
        document.getElementById("h3-"+technique.name).className = "card_title";
        document.getElementById("span-"+technique.name).className = "card_subtitle";
        document.getElementById("p-"+technique.name).className = "card_description";

        document.getElementById(technique.id).style.background = "url("+technique.cover+") center no-repeat";
        document.getElementById(technique.id).style.backgroundSize = "cover";

    }
}

document.addEventListener("DOMContentLoaded", async function (event) {

    const learning = new LearningMethod();


    fetch("api/techniques")
        .then(response => response.json())
        .then(techniques => {
            for (const technique of Array.from(techniques)) {
                learning.addTechniqueToDOM(technique);
            }
        });
});

