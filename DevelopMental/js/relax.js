class RelaxElementCreator {
    constructor(tag) {
        this.element = document.createRelaxElement(tag);
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
class RelaxTechnique {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
}

/* The BookStore class is what renders the books in the DOM and houses the shopping cart. */
class RelaxMethod {
    /* MAX_QUANTITY is the maximum quantity a user can order. You should use this constant in
     * your code to control the number of options you create in the quantity select elements.
     *
     * If you want to know more about static properties, read this article:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
     */

    add(relaxTechniques) {
        for (const relaxTechnique of relaxTechniques) {
            this.addTechniqueToDOM(relaxTechnique);
        }
    }

    addToDOM(relaxTechnique) {

        for (const article of document.querySelectorAll("article")) {
            article.remove();
        }

        this.addTechniqueToDOM(relaxTechnique);
    }

    addTechniqueToDOM(relaxTechnique) {
        new ElementCreator("article")
            .id(relaxTechnique.id)
            .append(new RelaxElementCreator("div")
                .id("div-"+relaxTechnique.name)
                .append(new ElementCreator("h3")
                    .id("h3-"+relaxTechnique.name)
                    .text(relaxTechnique.title))
                .append(new ElementCreator("span")
                    .id("span-"+relaxTechnique.name)
                    .text(relaxTechnique.smalldescription))
                .append(new ElementCreator("p")
                    .id("p-"+relaxTechnique.name)
                    .text(relaxTechnique.description)))
            .listener("click", () => {
                if (document.getElementById("text") != null){
                    document.getElementById("text").remove();
                }
                new RelaxElementCreator("article")
                    .id("text")
                    .append(new RelaxElementCreator("h2")
                        .id("h2-text")
                        .text(relaxTechnique.title))
                    .append(new RelaxElementCreator("p")
                        .id("p-text")
                        .text(relaxTechnique.text+"<br><br>"))
                    .append(new RelaxElementCreator("p")
                        .id("source-text")
                        .text("Source: "+relaxTechnique.source))
                    .appendTo(document.getElementById("Section-text"))
                document.getElementById("h2-text").scrollIntoView({behavior: 'smooth', block: 'start'});

            })
            .insertBefore(document.querySelector("section"));


        document.getElementById(relaxTechnique.id).className = "card";
        document.getElementById("div-"+relaxTechnique.name).className = "card_content";
        document.getElementById("h3-"+relaxTechnique.name).className = "card_title";
        document.getElementById("span-"+relaxTechnique.name).className = "card_subtitle";
        document.getElementById("p-"+relaxTechnique.name).className = "card_description";

        document.getElementById(relaxTechnique.id).style.background = "url("+relaxTechnique.cover+") center no-repeat";
        document.getElementById(relaxTechnique.id).style.backgroundSize = "cover";


    }
}

document.addEventListener("DOMContentLoaded", async function (event) {

    const relax = new relaxMethod();


    fetch("api/relaxTechniques")
        .then(response => response.json())
        .then(relaxTechniques => {
            for (const technique of Array.from(relaxTechniques)) {
                relax.addTechniqueToDOM(relaxTechnique);
            }
        });
});

