import { audit } from "./script.js";

// function auditRatio(userData){
//     return Math.round((userData.totalUp / userData.totalDown) * 10) / 10
// }

export function createAuditCharts(userData) {
    // Extract 'totalUp' and 'totalDown' values from 'userData'
    const done = userData.totalUp
    const recieved = userData.totalDown
    
    const options = { // Define chart options
        chart: {
            height: 450,
            width: 400,
            type: 'bar',
            background: '#E8E9EB',
            foreColor: '#0C0404'
        },
        series: [{
            name: 'Audit',
            data: [done, recieved],
        }],
        xaxis: {
            categories: ['Done', 'Recieved']
        },
        title:{
            text: "Your audit ratio",
            align: 'center',
            margin: 15,
            style: {
                fontSize: '16px'
            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        theme: {
            palette: 'palette9'
        }

    }

    var chart = new ApexCharts(audit, options) // Create a new ApexCharts instance with the specified options and connect with ID ('audit')
    chart.render() // Render the chart
    // auditRatio(userData)
}

