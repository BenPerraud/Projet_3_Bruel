
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

createModalLogin () // Si token, création de la balise pour accéder à la modale



// Fonctions de la modale Gallerie + accès modale Upload
// ----------------------------------------------------------------------------------

const openModal = function(e) { // Fonction d'ouverture de la modale Gallerie
    e.preventDefault()
    modal.style.display = null // Suppression du display none
    modal.removeAttribute("aria-hidden") // La modale est maintenant visible pour tous (hors écran) 
    modal.setAttribute("aria-modal", "true") // On peut intéragir avec la modale
    modal.addEventListener("click", closeModal) // On ferme la modale quelque soit l'endroit où lon clique sur la modale
    closeIcon.addEventListener("click", closeModal) // Fermeture de la modale en cliquant sur la croix de fermeture
    modalWwrapper.addEventListener("click", stopPropagation) // On limite la propagation de la fonction "closeModal" aux parents de la balise div "modalWrapper" (soit le fond opaque derrière, balise aside Modal)
}

document.querySelectorAll(".js-modal").forEach( a => { // On sélectionne tous les éléments avec la classe "js-modal" et on leur applique la fonction openModal
    a.addEventListener("click", openModal)
})

const closeModal = function (e) { // Fonction de fermeture de la modale Gallerie
    e.preventDefault()
    modal.setAttribute("style", "display : none") // On remet le display none
    modal.setAttribute("aria-hidden", "true") // La modale est cachée pour tous (hors écran)
    modal.setAttribute("aria-modal", "false") // On ne peut pas intéragir avec la modale
}

const stopPropagation = function (e) { // Fonction de propagation
    e.stopPropagation()
}

const openModalUpload = function(e) { // Fonction d'ouverture de la modale d'upload
    e.preventDefault()
    modalUpload.style.display = null // Suppression du display none
    modalUpload.removeAttribute("aria-hidden") // La modale est maintenant visible pour tous (hors écran) 
    modalUpload.setAttribute("aria-modal", "true") // On peut intéragir avec la modale
    closeIconUpload.addEventListener("click", closeModalUpload)
    modalUpload.addEventListener("click", closeModalUpload)
    modalUploadWrapper.addEventListener("click", stopPropagation)
}

const closeModalUpload = function (e) { // Fonction de fermeture de la modale d'upload
    e.preventDefault()
    modalUpload.setAttribute("style", "display : none") // On remet le display none
    modalUpload.setAttribute("aria-hidden", "true") // La modale est cachée pour tous (hors écran)
    modalUpload.setAttribute("aria-modal", "false") // On ne peut pas intéragir avec la modale
}



// Eléments du DOM de la modale Gallerie
// ----------------------------------------------------------------------------------

const modal = document.querySelector(".modal") // Modale générale
modal.setAttribute("aria-hidden", "true") // Vue hors écran caché
modal.setAttribute("role", "dialog")
modal.setAttribute("aria-modal", "false") // La modale n'est pas accessible (interaction)
modal.setAttribute("aria-labelledby", "titleModal") // Titre de la modale

const modalWwrapper = document.createElement("div") // Wrapper de la modale
modal.appendChild(modalWwrapper)
modalWwrapper.setAttribute("id", "modal")
modalWwrapper.className = "modalWrapper"

const closeIcon = document.createElement("button") // Icône "Fermer la modale"
modalWwrapper.appendChild(closeIcon)
closeIcon.className = "fa-solid fa-xmark closeIcone"

const baliseModal = document.createElement("div") // Balise "Div" pour englober le reste de la modale
modalWwrapper.appendChild(baliseModal)
baliseModal.className = "baliseModal"

const titleModal = document.createElement("p") // Titre de la modale Gallerie
baliseModal.appendChild(titleModal)
titleModal.setAttribute("id", "titleModal")
titleModal.appendChild(document.createTextNode("Galerie photos"))
titleModal.className = "titleModal"


// Galerie des photos (Fonction pour afficher les photos depuis l'API) ---------------------------------------------------------------------
const galleryPhoto = document.createElement("div")
baliseModal.appendChild(galleryPhoto)
galleryPhoto.className = "galleryPhoto"

function editGallery (x) {
    for (let i in x) {
        
        const photosProject = document.createElement("div") // Div image + "éditer" + icône suppression et aggrandissement
        galleryPhoto.appendChild(photosProject)
        photosProject.className = "photosProject"

        const photos = document.createElement("img") // Image de la gallerie
        photos.src = x[i].imageUrl
        photos.setAttribute("crossorigin", "anonymous")
        photos.className = "photos"
        photosProject.appendChild(photos)
        
        // Fonction de suppression des photos selon l'ID dans l'API
        let photosId = x[i].id
        async function deleteWorks () {
            let token = window.localStorage.getItem("token")
            await fetch("http://localhost:5678/api/works/" + photosId, {
                method: "DELETE",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "authorization": "bearer " + JSON.parse(token),
                }
            })
        }

        const photosTitle = document.createElement("p") // Commentaire "éditer"
        photosProject.appendChild(photosTitle)
        photosTitle.appendChild(document.createTextNode("éditer"))
        photosTitle.className = "photosTitle"

        const iconeBaliseSize = document.createElement("div") // Div pour les icônes suppression et aggrandissement
        photosProject.appendChild(iconeBaliseSize)
        iconeBaliseSize.className = "iconeBaliseSize"

        const iconeSize = document.createElement("i") // Icône aggrandissement
        iconeBaliseSize.appendChild(iconeSize)
        iconeSize.className = "iconeDelete fa-solid fa-maximize"

        const iconeBaliseDelete = document.createElement("button") // Bouton de l'icône suppression
        photosProject.appendChild(iconeBaliseDelete)
        iconeBaliseDelete.className = "iconeBaliseDelete"
        iconeBaliseDelete.addEventListener("click", function (event) {
            event.preventDefault ()
            deleteWorks ()
        })
        
        const iconeDelete = document.createElement("i") // Icône suppression
        iconeBaliseDelete.appendChild(iconeDelete)
        iconeDelete.className = "fa-solid fa-trash-can iconeDelete"
    }
}

worksAPI () // Affichage de la galerie avec les photos de l'API par une requête fectch (worksAPI) déjà utilisée pour afficher la galerie de la page principale
    .then (r => editGallery(r))


// Boutons pour accéder à la modale d'upload des projets ---------------------------------------------------------------------
const changesButton = document.createElement("div") // Balise "div" pour recevoir les boutons Ajouter et supprimer
baliseModal.appendChild(changesButton)
changesButton.className = "changesButton"

const uploadButton = document.createElement("button") // Bouton pour "Ajouter une photo"
changesButton.appendChild(uploadButton)
uploadButton.appendChild(document.createTextNode("Ajouter une photo"))
uploadButton.className = "uploadButton"
uploadButton.addEventListener("click", openModalUpload) // Ouvre la seconde modale pour l'upload des projets

const deleteButton = document.createElement("button") // Bouton pour "Supprimer la galerie"
changesButton.appendChild(deleteButton)
deleteButton.className = "deleteButton"
deleteButton.appendChild(document.createTextNode("Supprimer la galerie"))



// Eléments du DOM de la modale Upload
// ----------------------------------------------------------------------------------

// Modale générale ---------------------------------------------------------------------
const modalUpload = document.querySelector(".modalUpload")
modal.setAttribute("aria-hidden", "true") // Vue hors écran caché
modal.setAttribute("role", "dialog")
modal.setAttribute("aria-modal", "false") // La modale n'est pas accessible (interaction)
modal.setAttribute("aria-labelledby", "titleModal") // Titre de la modale

const modalUploadWrapper = document.createElement("div") // Wrapper de la modale
modalUpload.appendChild(modalUploadWrapper)
modalUploadWrapper.className = "modalUploadWrapper"

const closeIconUpload = document.createElement("i") // Icône "Fermer la modale"
modalUploadWrapper.appendChild(closeIconUpload)
closeIconUpload.className = "fa-solid fa-xmark closeIcone"

const baliseModalUpload = document.createElement("div") // Div pour englober le reste de la modale
modalUploadWrapper.appendChild(baliseModalUpload)
baliseModalUpload.className = "baliseModal"

const titleModalUpload = document.createElement("p") // Titre de la modalUpload
baliseModalUpload.appendChild(titleModalUpload)
titleModalUpload.className = "titleModal"
titleModalUpload.appendChild(document.createTextNode("Ajout photo"))


// Balise formulaire upload de l'image ---------------------------------------------------------------------
const baliseUpload = document.createElement("div") // Div pour englober tous les éléments (image, bouton, commentaires)
baliseModalUpload.appendChild(baliseUpload)
baliseUpload.className = "baliseUpload"

const baliseUploadInput = document.createElement("div")
baliseUpload.appendChild(baliseUploadInput)
baliseUploadInput.className = "baliseUpload"

const iconePhoto = document.createElement("p") // Icone image
baliseUploadInput.appendChild(iconePhoto)
iconePhoto.className = "fa-regular fa-image iconePhoto"

const uploadPhoto = document.createElement("form") // Formulaire d'upload
baliseUploadInput.appendChild(uploadPhoto)
uploadPhoto.setAttribute("enctype", "multipart/form-data")

const labelPhoto = document.createElement("label") // Label upload
uploadPhoto.appendChild(labelPhoto)
labelPhoto.setAttribute("for", "photo")
labelPhoto.appendChild(document.createTextNode("+ Ajouter photo"))
labelPhoto.className = "labelPhoto"

const inputPhoto = document.createElement("input") // Input file upload
uploadPhoto.appendChild(inputPhoto)
inputPhoto.setAttribute("type", "file")
inputPhoto.setAttribute("accept", "image/*")
inputPhoto.setAttribute("id", "photo")
inputPhoto.setAttribute("onchange", "loadFile(event)")
inputPhoto.className = "modalUploadButton"

const modalUploadText = document.createElement("p") // Commentaires taille photo
baliseUploadInput.appendChild(modalUploadText)
modalUploadText.className = "modalUploadText"
modalUploadText.appendChild(document.createTextNode("jpg, png : 4mo max"))

const previewPhoto = document.createElement("img") // Prévisualisation de la photo uploadée
baliseUpload.appendChild(previewPhoto)
previewPhoto.setAttribute("id", "photoUploaded")
previewPhoto.setAttribute("style", "display : none")
previewPhoto.className = "photoUploaded"


let loadFile = function (event) { // Fonction pour la prévisualisation
    baliseUploadInput.setAttribute("style", "display : none") // On cache la zone d'upload
    previewPhoto.removeAttribute("style") // On affiche la balise "img" qui va recevoir la photo uploadée
    let photoUploaded = document.getElementById("photoUploaded")
    photoUploaded.src = URL.createObjectURL(event.target.files[0])
    photoUploaded.onload = function () {
        URL.revokeObjectURL(photoUploaded.src)
    } 
}


// Balise formulaire d'upload Titre + Catégorie ---------------------------------------------------------------------
const baliseModalUploadForm = document.createElement("form") // Second "form" pour title et category
baliseModalUpload.appendChild(baliseModalUploadForm)
baliseModalUploadForm.className = "baliseModalUploadForm"

const labelTitle = document.createElement("label") // Label pour title
baliseModalUploadForm.appendChild(labelTitle)
labelTitle.appendChild(document.createTextNode("Titre"))
labelTitle.setAttribute("for", "title")
labelTitle.className = "labelUpload"
const inputTitle = document.createElement("input") // Input pour title
baliseModalUploadForm.appendChild(inputTitle)
inputTitle.setAttribute("type", "text")
inputTitle.setAttribute("id", "title")
inputTitle.setAttribute("required", "required")
inputTitle.className = "inputUpload"

const labelCategory = document.createElement("label") // Label pour category
baliseModalUploadForm.appendChild(labelCategory)
labelCategory.appendChild(document.createTextNode("Catégorie"))
labelCategory.setAttribute("for", "category")
labelCategory.className = "labelUpload"
const inputCategory = document.createElement("select") // Input pour category
baliseModalUploadForm.appendChild(inputCategory)
inputCategory.setAttribute("id", "category")
inputCategory.className = "inputUpload"

function selectCategory (x) { // Liste déroulante pour les catégories
    for (let i in x) {
        const formCategory = document.createElement("option")
        formCategory.setAttribute("value", x[i].id)
        inputCategory.appendChild(formCategory)
        formCategory.appendChild(document.createTextNode(x[i].name))
    }
}

categoryAPI ()
    .then(r => selectCategory(r)) // On applique la liste déroulante avec les catégories présentes dans l'API


// Balise de validation pour envoi upload ---------------------------------------------------------------------
const baliseValidation = document.createElement("div")
baliseModalUpload.appendChild(baliseValidation)
baliseValidation.className = "baliseValidation"

const buttonValidation = document.createElement("button")
baliseValidation.appendChild(buttonValidation)
buttonValidation.appendChild(document.createTextNode("Valider"))
buttonValidation.className = "buttonValidation"
buttonValidation.addEventListener("click", function (event) {
    event.preventDefault()
    testSendForm () // On teste les données du questionnaire remplies par l'utilisateur. Si OK, on envoie la requête POST avec postWorksAPI
    }
)

function formData () { // On crée une fonction qui crée un formData pour le body de la requête fetch POST
    let formData = new FormData ()
    formData.append("image", document.getElementById("photo").files[0]) // On récupère l'image uploadée dans FileReader
    formData.append("title", document.getElementById("title").value) // On récupère le titre de l'image
    formData.append("category", document.getElementById("category").value) // On récupère la catégorie choisie
    return formData
}

async function postWorksAPI () { // On crée la fonction fetch POST pour envoi des projets à l'API
    let token = window.localStorage.getItem("token")
    await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Authorization": `bearer ${JSON.parse(token)}`,
        },
    body : formData ()
    })
}

function testSendForm () { // On crée une fonction pour valider le questionnaire avant envoi
    if (document.getElementById("photo").files[0] === undefined || document.getElementById("title").value === "" || document.getElementById("category").value === "") { // Si un des champs du questionnaire est vide, on stoppe et on l'indique à l'utilisateur
        throw alert ("Un des champs de sélection n'est pas rempli")
    } else { // Si tous les champs sont remplis, on valide la taille de l'image avant envoi
        if (document.getElementById("photo").files[0].size > 150000) {
            oversizePhoto ()
        } else { // Si le questionnaire est validé, on envoi une requête à l'API pour uploader le projet et on l'indique à l'utilisateur
            setTimeout(postWorksAPI, 2000)
            alert("Le projet a bien été ajouté à la base de données, GREAT JOB!")
            }
        }
}

function oversizePhoto () { // On crée une fonction en cas de dépassement de la taille maximale autorisée pour l'upload de photo
    baliseUploadInput.removeAttribute("style") // On réaffiche la zone d'upload photo pour que l'utilisateur puisse recommencer la manipulation d'upload photo
    previewPhoto.setAttribute("style", "display : none") // On cache la zone de prévisualisation post upload photo
    throw alert ("La taille de l'image dépasse le maximum autorisé")
}























































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





