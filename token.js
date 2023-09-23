import { signIn } from "./api.js"
export let token = {
    getToken: localStorage.getItem('token')
}
function entry() {
    if (token.getToken === null || token.getToken === undefined) {// Check if the 'token' variable is null or undefined
        // Get references to HTML elements with IDs 'login', 'user', and 'password'
        const login = document.getElementById('login')
        const user = document.getElementById('user')
        const password = document.getElementById('password')
        login.addEventListener('submit', async (event) => { // Add an event listener for the 'submit' event on the 'login' form
            event.preventDefault() // Prevent the default form submission behavior
            const credentials = btoa(`${user.value}:${password.value}`) // Encode the 'user' and 'password' values as a Base64-encoded string
            const response = await fetch(signIn, { // Send a POST request to the 'signIn' URL with the encoded credentials
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${credentials}`
                }
            })
            let token = await response.json() // Parse the response as JSON and assign it to the 'token' variable
            if (token.error) {   // Check if the response contains an error
                let err = document.getElementById('err') // Get a reference to an HTML element with an ID 'error' and make it visible
                err.style.display = 'block'
            } else {
                localStorage.setItem('token', token) //saves token in local storage 
                location.replace('/profile.html')
            }
        })
    }
}
entry()
