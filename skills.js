import { skills } from "./script.js"
import { taskPath } from "./xp.js"


export function getSkillsData (userData){
    const skillType = /^skill_.+/gm

    // Filter user transactions to include only those matching certain criteria (taskPath and skillType)
    const skillData = userData.transactions.filter((task) => taskPath.test(task.path) && skillType.test(task.type)).map((task) => {
        
        // For each filtered task, create an object with 'skill' and 'data' properties
        return{
            skill: task.type.split('_')[1], // Extract the skill name from the 'type'
            data: task.amount // Assign the amount from the task
        }
    })
    
    createSkillChart(skillData) // Create a skill chart using the extracted and processed skill data
}

export function createSkillChart(tasks) {
    
    // Initializing a new object as an empty object {}
    const skillsChart = tasks.reduce((accumulator, task) => { // The reduce() function is used to iterate over the tasks array and accumulate(save) data based on the skill connected with each task. The accumulator parameter represents the object that accumulates the skill data as we iterate through the tasks
        if (accumulator.hasOwnProperty(task.skill)) { // Checks if the accumulator object already has a property with the skill name from the current task
            accumulator[task.skill] += task.data // If accumulator already has a property for that skill, it adds the task.data to the existing skill data in accumulator[task.skill]. This is done to aggregate the total skill data for that particular skill
        }else{
            accumulator[task.skill] = task.data // If it doesn't, it creates a new property in accumulator with the skill name as the key and initializes it with the task.data
        }
        return accumulator
    }, {})


    // After the reduce() operation, skillsChart contains aggregated skill data with skill names as keys and total data as values.
    const res = Object.keys(skillsChart).map(skill => { // Object.keys is used to extract an array of skill names from the keys of the skillsChart object. map(skill => { ... }) is used to iterate over the skill names array and create an array of objects (res) with 'x' and 'y' properties.
        return { // Creates an object 
            x: skill, // Set to the skill name
            y: skillsChart[skill] // Set to the total skill data associated with that skill name
        }
    })

    var options = {
        chart : {
            width: 550,
            type: 'donut',
            background: '#E8E9EB',
            foreColor: '#0C0404'
        },
        series: res.map((skillData) => skillData.y),
        labels: res.map((skillData) => skillData.x),
        legend: {
            show: true
        },
        title: {
            text: 'Your skills',
            align: 'center',
            margin: 15,
            style: {
                fontSize: '16px'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        theme: {
            palette: 'palette9'
        }
    }
    var chart = new ApexCharts(skills, options) // Create a new ApexCharts instance with the specified options and connect with ID ('skills')
    chart.render() // Render the chart

}