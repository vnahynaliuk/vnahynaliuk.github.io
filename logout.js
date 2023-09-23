import {token} from "./token.js"


const logout = document.getElementById('logout_btn') 

logout.addEventListener("click", removeToken) // Add a click event listener to the 'logout' button, which calls the 'removeToken' function when clicked

export function removeToken (){

    token.getToken = undefined // Set the 'getToken' property of the 'token' object to undefined

    localStorage.removeItem('token') // Remove the 'token' item from the local storage
    redirectToLoginPage()
}

export function redirectToLoginPage() {
    location.replace('/index.html') 
}