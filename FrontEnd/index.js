// On crée une fonction qui dans un tableau donné crée un DOM pour recevoir des projets constitués de photos et titre
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


//On crée une fonction worksAPI qui récupère les éléments de l'API
async function worksApi () {
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


//On affiche les éléments récupérés par l'API
worksApi()    
    .then(r => createDom(r))


//On crée une fonction pour récupérer les catégories
function categoriesRecuperation (x) {
    const categoriesArray = []
    for (let i in x) {
        categoriesArray.push(x[i].category.name)
    }
    return [... new Set(categoriesArray)]
}




//On crée une fonction pour filtrer les éléments de works selon la demande
function worksFiltered (x) {
    return x.category.name === "Objets" 
}

//On crée le bouton Trier par Objets
const buttonObjects = document.querySelector(".filterObjects")
buttonObjects.addEventListener("click", function () {
    document.querySelector(".galleryJS").innerHTML = "" //On vide la galleryJS
    worksApi ()
        .then(r => r.filter(worksFiltered))
        .then(r => createDom(r))
})






















/* On crée une variable "works" pour récupérer les données Works de l'API en JSON sous forme de tableau
const responseWorks = fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
        "Accept": "*",
        "Content-Type": "**",
        "access-control-allow-origin": "*",
        },
})

const works = responseWorks
    .then (response => response.json())
    .then(data => createDom(data))

console.log(works)
*/

// On crée un élément du DOM "galleryJS" qui va recevoir tous les projets
/*
function createDom (works) {
    for (let i in works) {

        // On crée l'élément du DOM qui va recevoir les cartes
        const sectionCards = document.querySelector(".galleryJS")

        // On crée une balise dédiée à un projet
        const projectElement = document.createElement("project")

        //On crée les balises qui vont recevoir les images et les titres
        const imageUrlElement = document.createElement("img")
        imageUrlElement.setAttribute("crossorigin", "anonymous")
        imageUrlElement.src = works[i].imageUrl
        const titleElement = document.createElement("p")
        titleElement.innerText = works[i].title

        //On rattache la balise "project" à la section "galleryJS = sectionCards"
        sectionCards.appendChild(projectElement)

        //On rattache les balises qui constituent les "projects" à la balise parent "project"
        projectElement.appendChild(imageUrlElement)
        projectElement.appendChild(titleElement)
    }
}

createDom(works)

/*
// On crée une variable "worksFiltered" qui renvoie "works" filtrée selon la demande x
function worksFiltered (x) {
    const worksFiltered=[]
    for (let i in works) {
        if (works[i].category.name === x) {
            worksFiltered.push(works[i])
        }
    }
    return worksFiltered  
}

console.log(worksFiltered(categories[0].name))
*/







