

/* Application du code
---------------------------------------------------------------------------*/
categoryAPI () //On affiche les filtres
    .then(r => createButton(r))

worksAPI () // On affiche les éléments de la requête worksAPI avec la fonction createDOM
    .then (r => createDom(r))





/* Detail des fonctions utilisées
---------------------------------------------------------------------------*/

// On crée une fonction qui récupère les éléments de l'API et on les parse en JSON
async function worksAPI () {
    const responseWorks = await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
        "Accept": "*",
        "Content-Type": "*/*",
        "access-control-allow-origin": "*",
        },
    })
    return responseWorks.json()
}


// On crée une fonction qui crée un DOM pour recevoir des projets constitués de photos et titre
function createDom (x) {
    for (let i in x) {

        // On crée l'élément du DOM qui va recevoir les cartes
        const sectionCards = document.querySelector(".galleryJS")

        // On crée une balise dédiée à un projet
        const projectElement = document.createElement("project")

        //On crée les balises qui vont recevoir les images et les titres
        const imageUrlElement = document.createElement("img")
        imageUrlElement.setAttribute("crossorigin", "anonymous")
        imageUrlElement.src = x[i].imageUrl
        const titleElement = document.createElement("p")
        titleElement.innerText = x[i].title

        //On rattache la balise "project" à la section "galleryJS = sectionCards"
        sectionCards.appendChild(projectElement)

        //On rattache les balises qui constituent les "projects" à la balise parent "project"
        projectElement.appendChild(imageUrlElement)
        projectElement.appendChild(titleElement)
    }
}


// On crée une fonction qui récupère les éléments (id + name) de "categories" dans l'API
async function categoryAPI () {
    const responseCategory = await fetch("http://localhost:5678/api/categories", {
        method: "GET",
        headers: {
            "Accept": "*",
            "Content-Type": "*/*",
            "access-control-allow-origin": "*",
            },
    })
    return responseCategory.json()
   
}

categoryAPI ()
    .then(r => console.log(r))

/*const all = {
        id: 0,
        name: "Tous"
    }
    const result = new Set (response)
    return result.add(all)*/












// On crée une fonction qui supprime la galerie en cours
function cleanGallery () {
    document.querySelector(".galleryJS").innerHTML = ""
}



// On crée une fonction pour créer les boutons sur le HTML depuis les catégories de l'API
function createButton (x) {
    for (let i in x) {
        let button = document.createElement("button") // On crée un élément Bouton
        button.appendChild(document.createTextNode(x[i].name)) // On incorpore le texte de chaque bouton avec le name de la requête categoriesAPI
        button.className = "filterbuttonDetails" // On rattache le bouton à sa classe CSS
        button.setAttribute ("type", "button")
        button.id = x[i].id
        filterButton.appendChild(button) // On rattache le bouton à l'élément parent filterButton (id)
        button.addEventListener("click", function () {
            cleanGallery ()
            filter(x[i].name)
        })
    }
}




// On crée une fonction filtre par catégorie
async function filter (y) {
    const projets = await worksAPI ()
    const result = projets.filter(projet => projet.category.name === y)
    return createDom(result)
    }


/*
function domCategory (category) {
    let btn = document.createElement("button")
    btn.appendChild(document.createTextNode(category.name))
    btn.className = "filterbuttonDetails"
    btn.setAttribute ("type", "button")
    btn.id = category.id
    btn.addEventListener("click", function () {
        filter(parseInt(category.id))

    })
    filterButton.appendChild(btn)
}

const filterButton = document.getElementById("filterButton")


document.getElementById("all").addEventListener("click", function () {
    filter(0)
}) */
