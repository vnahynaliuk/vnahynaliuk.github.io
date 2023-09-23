const userName = document.getElementById('user_name')
const gitea = document.getElementById('gitea')
const city = document.getElementById('city')
const country = document.getElementById('country')
export const audit = document.getElementById('audit')
export const XP = document.getElementById('xp_progression')
export const skills = document.getElementById('skills')


export function userInfo(userData){
    userName.innerText = `Full name: ${userData.attrs.firstName} ${userData.attrs.lastName}`
    gitea.innerText = `Login: ${userData.login}`
    country.innerText = `Country: ${userData.attrs.country}`
    city.innerText = `City: ${userData.attrs.addressCity}`
}



