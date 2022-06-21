class RelaxElementCreator {
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
class Category {
    constructor(title, id, ...relaxTechniques) {
        this.title = title;
        this.id = id;
        this.relaxTechniques = relaxTechniques;
    }
}

/* A class representing a book in one of the categories. It contains getters for the ids
 * that represent the book in the main content and in the shopping cart.
 */
class RelaxTechnique {

    /* If you want to know more about this form of getters, read this:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get */
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = "id" + id;
    }

}

/* The shopping cart. Maintains a list of books, renders the items in the cart
 * and calculates renders the total in the cart. */


/* The BookStore class is what renders the books in the DOM and houses the shopping cart. */
class RelaxTechnique {
    /* MAX_QUANTITY is the maximum quantity a user can order. You should use this constant in
     * your code to control the number of options you create in the quantity select elements.
     *
     * If you want to know more about static properties, read this article:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
     */

    add(categories) {
        for (const category of categories) {
            this.addCategoryToDOM(category);
            for (const relaxTechnique of category.relaxTechniques) {
                this.addRelaxTechniqueToDOM(category, relaxTechnique);
            }
        }
    }

    addToDOM(category, relaxTechniques) {

        for (const section of document.querySelectorAll("section")) {
            section.remove();
        }

        this.addCategoryToDOM(category);

        for (const relaxTechnique of relaxTechniques) {
            this.addRelaxTechniqueToDOM(category, Object.assign(new RelaxTechnique(), relaxTechnique));
        }
    }


}

document.addEventListener("DOMContentLoaded", function (event) {

    const relaxTechnique = new RelaxTechnique ();

    /* --- Task 1 ---
     * (1) Use the fetch API to retrieve the book categories from the backend
     * and insert a link for each category in the DOM, e.g.,
     *
     * <li>
     *   <a href="#javascript">JavaScript</a>
     * </li>
     *
     * Make sure that the categories in the nav element appear in the same
     * order in which they are returned by the server.
     *
     * (2) Add a click listener to the link, which, when activated, loads
     * the books for the selected category from the server. When the data
     * is received, use bookStore.addToDOM(category, books) to add the
     * books to the DOM.
     *
     * (3) Then, programatically click the first link to load the books of
     * the first category.
     */

    fetch("/api/categories")
        .then(response => response.json())
        .then(categories => {
            for(const category of Array.from(categories).reverse()) {
                const list = document.querySelector("nav>ul");

                new RelaxElementCreator("li")
                    .append(new RelaxElementCreator("a")
                        .with("href", `#${category.name}`)
                        .text(category.title)
                        .listener("click",() => {
                            fetch(`/api/categories/${category.name}/relaxTechniques`)
                                .then(response => response.json())
                                .then(relaxTechniques => {
                                    relaxTechnique.addToDOM(category, relaxTechniques);
                                });
                        }))
                    .prependTo(list);
            }
            document.querySelector("nav li a").click();
        });




});

