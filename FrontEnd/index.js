/* Application du code
---------------------------------------------------------------------------*/

worksAPI () // On affiche les éléments de la requête worksAPI avec la fonction createDOM
    .then (r => createDom(r))

createButton () // On affiche les boutons de filtres



/* Detail des fonctions utilisées
---------------------------------------------------------------------------*/

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



//On crée une fonction qui récupère les éléments de l'API et les parse en JSON
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



// On crée les fonctions pour filtrer par type de catégorie de works
function worksFilteredObjects (x) {
    return x.category.name === "Objets"
}
function worksFilteredApartments (x) {
    return x.category.name === "Appartements" 
}
function worksFilteredHotel (x) {
    return x.category.name === "Hotels & restaurants" 
}



// On crée une fonction pour supprimer l'affichage de la galerie en cours
function cleanGallery () {
    document.querySelector(".galleryJS").innerHTML = ""
}



//On crée une fonction pour créer les boutons et les addEventListener
function createButton () {
    const categorieButton = ["Objets", "Appartements", "Hotels", "All"]
    for (let i of categorieButton) {
        const filter = ".filter"
        const button = document.querySelector(filter.concat(i))
        button.addEventListener("click", function () {
            if (i === "All") {
                cleanGallery ()
                worksAPI ()
                    .then (r => createDom(r))
            } else if (i === "Objets") {
                cleanGallery ()
                worksAPI ()
                    .then (r => r.filter(worksFilteredObjects))
                    .then (r => createDom(r))
            } else if (i === "Appartements") {
                cleanGallery ()
                worksAPI ()
                    .then (r => r.filter(worksFilteredApartments))
                    .then (r => createDom(r))
            } else if (i === "Hotels") {
                cleanGallery ()
                worksAPI ()
                    .then (r => r.filter(worksFilteredHotel))
                    .then (r => createDom(r))
            }
        })
    }
}






/* Autres tentatives de code
---------------------------------------------------------------------------*/

/*
//On crée une constante pour récupérer les catégories du works de l'API depuis le fetch worksAPI
function categoriesUpload (x) {
    const categories = []
    for (let i in x) {
        categories.push(x[i].category.name)
    }
    categories.push("All") //On rajoute la catégorie "All"
    return [... new Set(categories)]
} */


/*
//On crée le bouton Trier par Tous
const buttonAll = document.querySelector(".filterAll")
buttonAll.addEventListener("click", function () {
    document.querySelector(".galleryJS").innerHTML = "" //On vide la galleryJS
    worksAPI ()
        .then(r => createDom(r))
})



//On crée une fonction pour filtrer les éléments de x selon la demande "Objets"
function worksFilteredObjects (x) {
    return x.category.name === "Objets"
}


//On crée le bouton Trier par Objets
const buttonObjects = document.querySelector(".filterObjets")
buttonObjects.addEventListener("click", function () {
    document.querySelector(".galleryJS").innerHTML = "" //On vide la galleryJS
    worksAPI ()
        .then(r => r.filter(worksFilteredObjects))
        .then(r => createDom(r))
})


//On crée une fonction pour filtrer les éléments de x selon la demande "Appartements"
function worksFilteredApartments (x) {
    return x.category.name === "Appartements" 
}

//On crée le bouton Trier par Appartements
const buttonApartments = document.querySelector(".filterAppartements")
buttonApartments.addEventListener("click", function () {
    document.querySelector(".galleryJS").innerHTML = "" //On vide la galleryJS
    worksAPI ()
        .then(r => r.filter(worksFilteredApartments))
        .then(r => createDom(r))
})


//On crée une fonction pour filtrer les éléments de x selon la demande "Hôtels & Restaurants"
function worksFilteredHotel (x) {
    return x.category.name === "Hotels & restaurants" 
}

//On crée le bouton Trier par Appartements
const buttonHotel = document.querySelector(".filterHotels")
buttonHotel.addEventListener("click", function () {
    document.querySelector(".galleryJS").innerHTML = "" //On vide la galleryJS
    worksAPI ()
        .then(r => r.filter(worksFilteredHotel))
        .then(r => createDom(r))
})
*/




