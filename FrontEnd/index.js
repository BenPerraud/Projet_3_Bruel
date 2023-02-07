

/* Application du code
---------------------------------------------------------------------------*/
const filterButton = document.getElementById("filterButton") 
getCategory ()

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



function getCategory () {
    fetch("http://localhost:5678/api/categories")
    .then(r => r.json())
    .then(data => {
        //Creer DOM catagorie
        data.map((category) => domCategory(category))
    })
}



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

async function filter (idCategory) {
    const projets = await worksAPI ()
    document.querySelector(".galleryJS").innerHTML = "" //On vide la galleryJS
    if (idCategory === 0) {
        createDom(projets)
    } else {
        const result = projets.filter(projet => projet.category.id === idCategory)
        createDom (result)
    }
}

document.getElementById("all").addEventListener("click", function () {
    filter(0)
})