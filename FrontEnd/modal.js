
// Fonctions utilisées
// ----------------------------------------------------------------------------------

createModalLogin () // Si token, création de la balise pour accéder à la modale







// Création de la balise d'accessibilité à la modale
// ----------------------------------------------------------------------------------

function accessModal () {
    // Création des eléments du DOM pour accéder à la modale
    const modalAccess = document.querySelector(".modalAccess")
    modalAccess.removeAttribute("style")

    const modalAccessWrapper = document.createElement("div")
    modalAccess.appendChild(modalAccessWrapper)
    modalAccessWrapper.className = "modalAccessWrapper"

    const editionMode = document.createElement("a")
    modalAccessWrapper.appendChild(editionMode)
    editionMode.setAttribute("href", "#modal")
    editionMode.className = "editionMode modalAccessWrapperDetails js-modal"

    const iconeEdition = document.createElement("i")
    editionMode.appendChild(iconeEdition)
    iconeEdition.className = "fa-regular fa-pen-to-square"
    editionMode.appendChild(document.createTextNode("Mode édition"))

    const buttonChanges = document.createElement("button")
    modalAccessWrapper.appendChild(buttonChanges)
    buttonChanges.appendChild(document.createTextNode("Publier les changements"))
    buttonChanges.className = "buttonChanges modalAccessWrapperDetails"

}


function createModalLogin () {
    let token = window.localStorage.getItem("token")
    if (token) {
        accessModal ()
    }  
}



// Création de la modale (Fonctions + DOM)
// ----------------------------------------------------------------------------------


// Fonction d'ouverture de la modale
const openModal = function(e) {
    e.preventDefault()
    modal.style.display = null // Suppression du display none
    modal.removeAttribute("aria-hidden") // La modale est maintenant visible pour tous (hors écran) 
    modal.setAttribute("aria-modal", "true") // On peut intéragir avec la modale
}

// On sélectionne tous les éléments avec la classe "js-modal" et on leur applique la fonction openModal
document.querySelectorAll(".js-modal").forEach( a => {
    a.addEventListener("click", openModal)
})

// Fonction de fermeture de la modale
const closeModal = function (e) {
    e.preventDefault
    modal.setAttribute("style", "display : none") // On remet le display none
    modal.setAttribute("aria-hidden", "true") // La modale est cachée pour tous (hors écran)
    modal.setAttribute("aria-modal", "false") // On ne peut pas intéragir avec la modale
}











// Eléments du DOM
// ----------------------------------------------------------------------------------

// Modale générale
const modal = document.querySelector(".modal")
modal.setAttribute("aria-hidden", "true") // Vue hors écran caché
modal.setAttribute("role", "dialog")
modal.setAttribute("aria-modal", "false") // La modale n'est pas accessible (interaction)
modal.setAttribute("aria-labelledby", "titleModal") // Titre de la modale


// Wrapper de la modale
const modalWwrapper = document.createElement("div") // Elément de la modale
modal.appendChild(modalWwrapper)
modalWwrapper.setAttribute("id", "modal")
modalWwrapper.className = "modalWrapper"


// Icône "Fermer la modale"
const closeIcon = document.createElement("i")
modalWwrapper.appendChild(closeIcon)
closeIcon.className = "fa-solid fa-xmark closeIcone"
closeIcon.addEventListener("click", closeModal)


// Balise "Div" pour englober le reste de la modale
const baliseModal = document.createElement("div")
modalWwrapper.appendChild(baliseModal)
baliseModal.className = "baliseModal"


// Titre de la modale
const titleModal = document.createElement("p")
baliseModal.appendChild(titleModal)
titleModal.setAttribute("id", "titleModal")
titleModal.appendChild(document.createTextNode("Galerie photos"))
titleModal.className = "titleModal"


// Galerie des photos (Fonction pour afficher les photos depuis l'API)
const galleryPhoto = document.createElement("div")
baliseModal.appendChild(galleryPhoto)
galleryPhoto.className = "galleryPhoto"

function editGallery (x) {
    for (let i in x) {
        
        const photosProject = document.createElement("div")
        galleryPhoto.appendChild(photosProject)
        photosProject.className = "photosProject"

        const photos = document.createElement("img")
        photos.src = x[i].imageUrl
        photos.setAttribute("crossorigin", "anonymous")
        photos.className = "photos"
        photosProject.appendChild(photos)

        const photosTitle = document.createElement("p")
        photosProject.appendChild(photosTitle)
        photosTitle.appendChild(document.createTextNode("éditer"))
        photosTitle.className = "photosTitle"

        const iconeBaliseSize = document.createElement("div")
        photosProject.appendChild(iconeBaliseSize)
        iconeBaliseSize.className = "iconeBaliseSize"

        const iconeSize = document.createElement("i")
        iconeBaliseSize.appendChild(iconeSize)
        iconeSize.className = "iconeDelete fa-solid fa-maximize"

        const iconeBaliseDelete = document.createElement("button")
        photosProject.appendChild(iconeBaliseDelete)
        iconeBaliseDelete.className = "iconeBaliseDelete"
        
        const iconeDelete = document.createElement("i")
        iconeBaliseDelete.appendChild(iconeDelete)
        iconeDelete.className = "fa-solid fa-trash-can iconeDelete"
    }
}

worksAPI ()
    .then (r => editGallery(r))

async function deleteWorks () {
    await fetch("http://localhost:5678/api/works/", {
        method: "DELETE",
        accept: "*/*"
    })
}


// Balise "div" pur recevoir les boutons Ajouter et supprimer
const changesButton = document.createElement("div")
baliseModal.appendChild(changesButton)
changesButton.className = "changesButton"


// Bouton pour "Ajouter une photo"
const uploadButton = document.createElement("button")
changesButton.appendChild(uploadButton)
uploadButton.appendChild(document.createTextNode("Ajouter une photo"))
uploadButton.className = "uploadButton"


// Bouton pour "Supprimer la galerie"
const deleteButton = document.createElement("button")
changesButton.appendChild(deleteButton)
deleteButton.className = "deleteButton"
deleteButton.appendChild(document.createTextNode("Supprimer la galerie"))













































/*
function createModalGallery () {
    
    const modalGallery = document.querySelector(".modalGallery")
    modalGallery.setAttribute("id", "modalGallery")
    modalGallery.setAttribute("role", "dialog")
    modalGallery.setAttribute("aria-hidden", "true")
    modalGallery.setAttribute("aria-labelledby", "titleModalPhoto")
    modalGallery.setAttribute("aria-modal", "true")
    modalGallery.className = "modalGallery"
    modalGallery.removeAttribute("style")
    
    const modalGalleryPhoto = document.createElement("div")
    modalGallery.appendChild(modalGalleryPhoto)
    modalGalleryPhoto.className = "modalGalleryPhoto"
    modalGalleryPhoto.setAttribute("title", "Galerie photo")

    const closeModal = document.createElement("i")
    modalGalleryPhoto.appendChild(closeModal)
    closeModal.className = "fa-solid fa-xmark closeButton"
    closeModal.addEventListener("click", function () {
        modalGallery.setAttribute("style", "display : none")
        modalGallery = null
    })

    const modalGalleryPhotoWrapper = document.createElement("div")
    modalGalleryPhoto.appendChild(modalGalleryPhotoWrapper)
    modalGalleryPhotoWrapper.className = "modalGalleryPhotoWrapper"

    const titleModalPhoto = document.createElement("div")
    modalGalleryPhotoWrapper.appendChild(titleModalPhoto)
    titleModalPhoto.appendChild(document.createTextNode("Galerie photo"))
    titleModalPhoto.className = "titleModalPhoto"
    titleModalPhoto.setAttribute("id", "titleModalPhoto")

    const modalGalleryPhotoWrapperPhoto = document.createElement("div")
    modalGalleryPhotoWrapper.appendChild(modalGalleryPhotoWrapperPhoto)
    modalGalleryPhotoWrapperPhoto.className = "modalGalleryPhotoWrapperPhoto"

    function editPhotoAPI (x) {
        for (let i in x) {
            const editProject = document.createElement("div")
            const imageUrlElement = document.createElement("img")
            imageUrlElement.setAttribute("crossorigin", "anonymous")
            imageUrlElement.src = x[i].imageUrl
            imageUrlElement.className = "imgGallery"
            const editTitle = document.createElement("p")
            editTitle.className = "editTitle"
            editTitle.appendChild(document.createTextNode("éditer"))

            modalGalleryPhotoWrapperPhoto.appendChild(editProject)
            editProject.appendChild(imageUrlElement)
            editProject.appendChild(editTitle)
            
        } 
    }

    worksAPI ()
        .then(r => editPhotoAPI(r))

    const uploadPhoto = document.createElement("div")
    modalGalleryPhotoWrapper.appendChild(uploadPhoto)
    uploadPhoto.className = "uploadPhoto"

    const uploadPhotoTitle = document.createElement("button")
    uploadPhoto.appendChild(uploadPhotoTitle)
    uploadPhotoTitle.className = "uploadPhotoTitle"
    uploadPhotoTitle.appendChild(document.createTextNode("Ajouter une photo"))

    const suppGallery = document.createElement("button")
    uploadPhoto.appendChild(suppGallery)
    suppGallery.className = "suppGallery"
    suppGallery.appendChild(document.createTextNode("Supprimer la galerie"))


}

*/















// else {
        // window.location.href="http://127.0.0.1:5500/FrontEnd/connexion.html"
    // }





