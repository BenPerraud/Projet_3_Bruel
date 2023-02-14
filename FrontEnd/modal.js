
// Création de la modal
// ----------------------------------------------------------------------------------


// Création des eléments du DOM
function createModal ()
const modal = document.querySelector(".modal")

const modalWrapper = document.createElement("div")
modal.appendChild(modalWrapper)
modalWrapper.className = "modalWrapper"

const editionMode = document.createElement("div")
modalWrapper.appendChild(editionMode)
editionMode.className = "editionMode modalWrapperDetails"

const iconeEdition = document.createElement("i")
editionMode.appendChild(iconeEdition)
iconeEdition.className = "fa-regular fa-pen-to-square"
editionMode.appendChild(document.createTextNode("Mode édition"))

const buttonChanges = document.createElement("button")
modalWrapper.appendChild(buttonChanges)
buttonChanges.appendChild(document.createTextNode("Publier les changements"))
buttonChanges.className = "buttonChanges modalWrapperDetails"

