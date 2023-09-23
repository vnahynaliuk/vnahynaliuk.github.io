import { XP } from "./script.js"

export const taskPath = /^\/johvi\/div-01\/(?!.*piscine).*$/
const typeXP = /xp/gm

export function totalXP(transactions) { // Function to calculate the total XP from a list of transactions

    const xpTransaction = transactions.filter(task => // Filter transactions to include only 'xp' type and specific path matches
        task.type === 'xp' &&
        /^\/johvi\/div-01(?!\/piscine-js)/.test(task.path)
    )
    const allXP = xpTransaction.reduce((total, task) => total + task.amount, 0) // Calculate the total XP by summing up the 'amount' field of filtered transactions

    return bytesConv(allXP) // Convert the total XP (in bytes) to a more human-readable format using 'bytesConv' function
}

function bytesConv(bytes, threshold = 1000) { // Function to convert bytes to a more human-readable format
    
    const sizes = ['Bytes', 'KB', 'MB'] // Define an array of size units for display

    const i = Math.floor(Math.log(bytes) / Math.log(threshold)) // Calculate the appropriate size unit (KB, MB) based on the 'threshold'

    const convertedValue = parseFloat((bytes / Math.pow(threshold, i)).toFixed(2)) // Calculate the converted value by dividing 'bytes' by 'threshold' raised to the power of 'i'

    return { // Return an object with the converted amount and size unit
        amount: convertedValue,
        size: sizes[i] // Retrieve the corresponding size unit from the 'sizes' array
    }
}

export function getXpData(userData) { // Function to extract and process XP data from user transactions
    // Filter user transactions to include only those matching certain criteria (taskPath and typeXP)
    const xpData = userData.transactions.filter((task) => taskPath.test(task.path) && typeXP.test(task.type)).map((task) => {
        return { // For each filtered task, create an object with name, data, and date properties
            name: task.path.split('/')[3], // Extract the name from the task's path
            data: task.amount, // Assign the amount from the task
            date: new Date(task.createdAt).toLocaleDateString('en-GB') // Format the date
        }
    })
    createXpChart(xpData) // Create an XP chart using the extracted and processed XP data
}

export function createXpChart (tasks){

    const xpArray = tasks.map((task) => { // Map the 'data' property of each task in 'tasks' to convert it to a more human-readable format
        return bytesConv(task.data)
    })
    const taskName = tasks.map((task) => task.name) // Map the 'name' property of each task in 'tasks' to extract task names

    var options = {
        chart : {
            height: 450,
            width: '100%',
            type: 'area',
            background: '#E8E9EB',
            foreColor: '#0C0404',
            zoom: {
                enabled: false
            }
        },
        series: [{
            name: 'XP Progression',
            data: xpArray.map((el) => el.amount) // Extract the 'amount' property from 'xpArray'
        }],
        title: {
            text: 'Your XP progression',
            align: 'center',
            margin: 15,
            style: {
                fontSize: '16px'
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: taskName, // Set the X-axis categories to task names
        },
        theme: {
            palette: 'palette9'
        }

    }
    var chart = new ApexCharts(XP, options) // Create a new ApexCharts instance with the specified options and connect with ID ('XP')
    chart.render() // Render the chart
}

