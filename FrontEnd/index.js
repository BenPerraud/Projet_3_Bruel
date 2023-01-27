
// On crée une variable "works" pour récupérer les données Works de l'API en JSON
const reponse = await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    },
    })
const works = await reponse.json()
console.log(works)


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








