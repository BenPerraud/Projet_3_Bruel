
// Détails des fonctions utilisées
// ----------------------------------------------------------------------------------


// On traite les données de l'input utilisateur
const Body = class {
    constructor (email, password) { 
        this.email = email;
        this.password = password;
    }
}


// On crée une fonction qui récupère les éléments du formulaire
function getValue () {
    let emailInput = document.getElementById("email").value
    let passwordInput = document.getElementById("password").value
    let coupleInput = new Body (emailInput, passwordInput)
    return JSON.stringify(coupleInput)
}


// On crée une fonction qui envoi les éléments du formulaire à l'API
async function loginAPI () {
    const responseLogin = await fetch("http://localhost:5678/api/users/login", { 
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
        body: getValue(),
    })
    if (responseLogin.ok === true) {
        return responseLogin.json()
    }
    throw alert("Erreur dans l`identifiant ou le mot de passe"), window.location.href="http://127.0.0.1:5500/FrontEnd/connexion.html"
}
    

// On crée une fonction pour stocker le token dans le local storage
function storageToken (x) {
    window.localStorage.setItem("token", JSON.stringify(x.token))
} 


// On crée une fonction pour retourner à la page d'acceuil et stocker le token d'identification dans le local storage
function actionLogin (x) {
    storageToken(x)
    window.location.href="http://127.0.0.1:5500/FrontEnd/index.html"
}



// Création des éléments du DOM
// ----------------------------------------------------------------------------------


// On crée l'élément général du DOM qui va recevoir le formulaire
const connexion = document.querySelector(".connexion")


// On crée le titre
const titleLogIn = document.createElement("h2")
connexion.appendChild(titleLogIn)
titleLogIn.appendChild(document.createTextNode("Log in"))


// On crée la balise form et on rattache à l'élément du DOM
const form = document.createElement("form")
connexion.appendChild(form)
form.className = "formulaire"


// On crée le premier label + input pour l'input de l'email
const labelEmail = document.createElement("label") // Balise Label
form.appendChild(labelEmail) // On rattache à la balise form
labelEmail.appendChild(document.createTextNode("E-mail"))
labelEmail.setAttribute("for", "email")
labelEmail.className = "formulaire"
const inputEmail = document.createElement("input") // Balise Input
form.appendChild(inputEmail)
inputEmail.setAttribute("type", "text")
inputEmail.setAttribute("id", "email")
inputEmail.className = "champUtilisateur"


// On crée le second label + input pour l'input du password
const labelPassword = document.createElement("label") // Balise Label
form.appendChild(labelPassword) // On rattache à la balise form
labelPassword.appendChild(document.createTextNode("Mot de passe"))
labelPassword.setAttribute("for", "email")
labelPassword.className = "formulaire"
const inputPassword = document.createElement("input") // Balise Input
form.appendChild(inputPassword)
inputPassword.setAttribute("type", "password")
inputPassword.setAttribute("id", "password")
inputPassword.className = "champUtilisateur"


// On crée le bouton de submit
const buttonSubmit = document.createElement("button")
form.appendChild(buttonSubmit)
buttonSubmit.appendChild(document.createTextNode("Se connecter"))
buttonSubmit.className = "seconnecter"
buttonSubmit.addEventListener("click", function (event) {
    event.preventDefault()
    loginAPI ()
    .then(r => actionLogin(r))
})


// On crée le mot de passe oublié
const forgottenPassword = document.createElement("p")
connexion.appendChild(forgottenPassword)
forgottenPassword.appendChild(document.createTextNode("Mot de passe oublié"))
forgottenPassword.className = "mdp"



















