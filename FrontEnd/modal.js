
// Fonctions utilisées
// ----------------------------------------------------------------------------------

createModalLogin () // Si token, création de la balise pour accéder à la modale







// Création de la balise d'accessibilité à la modale
// ----------------------------------------------------------------------------------

function accessModal () {
    // Création des eléments du DOM pour accéder à la modale
    const modal = document.querySelector(".modal")
    modal.removeAttribute("style")

    const modalWrapper = document.createElement("div")
    modal.appendChild(modalWrapper)
    modalWrapper.className = "modalWrapper"

    const editionMode = document.createElement("a")
    modalWrapper.appendChild(editionMode)
    editionMode.setAttribute("href", "#modalGallery")
    editionMode.className = "editionMode modalWrapperDetails"

    const iconeEdition = document.createElement("i")
    editionMode.appendChild(iconeEdition)
    iconeEdition.className = "fa-regular fa-pen-to-square"
    editionMode.appendChild(document.createTextNode("Mode édition"))

    const buttonChanges = document.createElement("button")
    modalWrapper.appendChild(buttonChanges)
    buttonChanges.appendChild(document.createTextNode("Publier les changements"))
    buttonChanges.className = "buttonChanges modalWrapperDetails"

    editionMode.addEventListener("click", function () {
        createModalGallery()
    })
}


function createModalLogin () {
    let token = window.localStorage.getItem("token")
    if (token) {
        accessModal ()
    }  
}



// Création de la modale
// ----------------------------------------------------------------------------------

function createModalGallery () {
    
    const modalGallery = document.querySelector(".modalGallery")
    modalGallery.setAttribute("id", "modalGallery")
    modalGallery.className = "modalGallery"
    modalGallery.removeAttribute("style")
    
    const modalGalleryPhoto = document.createElement("div")
    modalGallery.appendChild(modalGalleryPhoto)
    modalGalleryPhoto.className = "modalGalleryPhoto"
    modalGalleryPhoto.setAttribute("title", "Galerie photo")

    const closeModal = document.createElement("i")
    modalGalleryPhoto.appendChild(closeModal)
    closeModal.className = "fa-solid fa-xmark closeButton"

    const modalGalleryPhotoWrapper = document.createElement("div")
    modalGalleryPhoto.appendChild(modalGalleryPhotoWrapper)
    modalGalleryPhotoWrapper.className = "modalGalleryPhotoWrapper"

    const titleModalPhoto = document.createElement("div")
    modalGalleryPhotoWrapper.appendChild(titleModalPhoto)
    titleModalPhoto.appendChild(document.createTextNode("Galerie photo"))
    titleModalPhoto.className = "titleModalPhoto"

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

















// else {
        // window.location.href="http://127.0.0.1:5500/FrontEnd/connexion.html"
    // }





