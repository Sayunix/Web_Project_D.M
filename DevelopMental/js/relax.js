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

class Category {
    constructor(title, id, ...relaxTechniques) {
        this.title = title;
        this.id = id;
        this.relaxTechniques = relaxTechniques;
    }
}

class RelaxTechnique {

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = "id" + id;
    }

}

var tmp = 0;

class RelaxTechniqueSection {

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

    addCategoryToDOM(category) {
        let main = document.getElementById("relax-main");
        new ElementCreator("section")
            .id(category.name)
            .append(new ElementCreator("h1").text(category.title))
            .appendTo(main);
    }

    addRelaxTechniqueToDOM(category, relaxTechnique) {

        new ElementCreator("article")
            .id(relaxTechnique.id)
            .append(new ElementCreator("div")
                .id("div-video")
                .append(new ElementCreator("iframe")
                    .id("iframe-video")))
            .append(new ElementCreator("h2")
                .id("h2-technique-"+relaxTechnique.name)
                .text(relaxTechnique.title))
            .append(new ElementCreator("p")
                .id("p-technique-"+relaxTechnique.name)
                .text(relaxTechnique.text))
            .appendTo(document.querySelector(`section#${category.name}`));

        document.getElementById("div-video").className = "video-container";
        document.getElementById("iframe-video").className = "yt-video";

        let iframe = document.getElementById("iframe-video");
        iframe.setAttribute("src",relaxTechnique.video);
        iframe.setAttribute("title","Youtube Video Player");
        iframe.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;");
    }


}

function deleteIt() {
    fetch('http://localhost:5000/api/categories/PMR/relaxTechniques/1', {
        method: "DELETE",
    })
        .then(res => {
            if (res.ok) {
                console.log("DELETE request successful");
                return res
            } else {
                console.log("DELETE request unsuccessful");
            }
            return res
        })
        .catch(error => console.log(error))
    location.reload();
}

const putData = {name: 'changed name',
    title: 'changed Title',
    video: 'https://www.youtube.com/embed/videoseries?list=PL-yvVpWvnO7Z8H5zkeI_RDu75RjaU_Tq2',
    text: 'changed Text',
    id: 2
}

async function putIt() {
    const response = await fetch('http://localhost:5000/api/categories/AT/relaxTechniques/2', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
    })
        .then(response => {
        return response.json( )
    })
        .then(data =>
            console.log(data),
            location.reload()
        );


}

document.addEventListener("DOMContentLoaded", function (event) {

    const relaxTechniqueSection = new RelaxTechniqueSection ();

    fetch("/api/categories")
        .then(response => response.json())
        .then(categories => {
            for(const category of Array.from(categories).reverse()) {
                const list = document.getElementById("nav-relax");

                new ElementCreator("li")
                    .append(new ElementCreator("a")
                        .id("link-"+category.name)
                        .with("href", `#${category.name}`)
                        .text(category.title)
                        .listener("click",() => {
                            fetch(`/api/categories/${category.name}/relaxTechniques`)
                                .then(response => response.json())
                                .then(relaxTechniques => {
                                    relaxTechniqueSection.addToDOM(category, relaxTechniques);
                                });
                        }))
                    .prependTo(list);
            }

        });
})
