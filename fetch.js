import { profile } from "./api.js"
import {token} from "./token.js"
import { userInfo } from "./script.js"
import { createAuditCharts } from "./audits.js"
import { getXpData } from "./xp.js"
import { redirectToLoginPage } from "./logout.js"
import { getSkillsData } from "./skills.js"

async function fetchData() {
  // Define a GraphQL query to fetch user data
  const query = `
      query {
          user {
              id
              login
              attrs
              totalUp
              totalDown
              transactions(order_by: { createdAt: asc }) {
                  id
                  type
                  amount
                  path
                  createdAt
              }
          }
      }
  `
  try {  // Send a POST request to the 'profile' endpoint with the GraphQL query and authorization header
      const response = await fetch( profile, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token.getToken}`// Include the user's token in the header
        },
        body: JSON.stringify({ query }) // Convert the query to a JSON string and include it in the request body
      });
    
      const result = await response.json()// Parse the response as JSON

      return result.data // Return the 'data' field from the GraphQL response
    } catch (error) {
      return null // If an error occurs during the request, return null
    }
}

export async function initData () {
  if (!token.getToken) { // Check if the 'token' variable is null or undefined
      redirectToLoginPage() // Redirect the user to the login page
      return // Exit the function
  }
  try {
      const data = await fetchData(token.getToken) // Call the 'fetchData' function with the user's token and await the result
      handleUserData(data) // Call the 'handleUserData' function and pass the fetched data to it
  } catch (error) {
    console.error(error) // If an error occurs during the try block, log the error to the console
  }
}

function handleUserData(data) {

  if (data && data.user && data.user.length > 0) { // Check if 'data' is not null or undefined and if it contains a 'user' array with at least one element
    const userData = data.user[0]  // Get the first user data object from the 'user' array
    userInfo(userData)
    createAuditCharts(userData)
    getXpData (userData)
    getSkillsData(userData)
  } else {
    console.error('No user data found')
  }
}

initData()