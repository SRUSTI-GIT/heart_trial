// Simulate prosthetic performance parameters (blood flow, pressure, oxygenation, blood rate, clot risk, stroke risk)  
function simulateProsthetic() {
    return {
        bloodFlow: parseFloat((Math.random() * (6.5 - 4.5) + 4.5).toFixed(2)),  // L/min
        bloodPressure: parseFloat((Math.random() * (120 - 80) + 80).toFixed(2)),  // mmHg
        oxygenation: parseFloat((Math.random() * (100 - 90) + 90).toFixed(2)),  // Percentage
        bloodRate: parseFloat((Math.random() * (1.5 - 1.0) + 1.0).toFixed(2)),  // Rate in L/min
        clotRisk: parseFloat((Math.random() * (50 - 10) + 10).toFixed(2)),  // % risk of blood clots
        strokeRisk: parseFloat((Math.random() * (30 - 5) + 5).toFixed(2))  // % risk of heart stroke
    };
}

// Function to show the alert popup when conditions are met
function checkAlertConditions(clotRisk, strokeRisk) {
    if (clotRisk > 30 || strokeRisk > 30) {
        showAlert("Warning: Blood Clot Risk or Stroke Risk are above 30%!");
    } else {
        hideAlert();  // Hide alert if conditions are not met
    }
}

// Function to show alert popup
function showAlert(message) {
    const alertPopup = document.getElementById('alertPopup');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertPopup.style.display = 'block';  // Show the alert box
}

// Function to hide alert popup
function hideAlert() {
    const alertPopup = document.getElementById('alertPopup');
    alertPopup.style.display = 'none';  // Hide the alert box
}

// Function to close the alert box
function closeAlert() {
    hideAlert();
}

// Real-time monitoring simulation
let monitoringInterval;
let timestamps = [];
let bloodFlows = [];
let bloodPressures = [];
let oxygenLevels = [];
let bloodRates = [];
let clotRisks = [];
let strokeRisks = [];

function startRealTimeMonitoring() {
    const duration = 30;  // 30 seconds monitoring
    const startTime = Date.now();
    
    monitoringInterval = setInterval(() => {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const data = simulateProsthetic();

        // Update metrics on the page
        document.getElementById('bloodFlowValue').textContent = `${data.bloodFlow} L/min`;
        document.getElementById('bloodPressureValue').textContent = `${data.bloodPressure} mmHg`;
        document.getElementById('oxygenationValue').textContent = `${data.oxygenation}%`;
        document.getElementById('bloodRateValue').textContent = `${data.bloodRate} beats/min`;
        document.getElementById('clotRiskValue').textContent = `${data.clotRisk}%`;
        document.getElementById('strokeRiskValue').textContent = `${data.strokeRisk}%`;

        // Store data for graphing
        timestamps.push(elapsedTime);
        bloodFlows.push(data.bloodFlow);
        bloodPressures.push(data.bloodPressure);
        oxygenLevels.push(data.oxygenation);
        bloodRates.push(data.bloodRate);
        clotRisks.push(data.clotRisk);
        strokeRisks.push(data.strokeRisk);

        // Check if critical alert condition is met
        checkAlertConditions(data.clotRisk, data.strokeRisk);

        // Update charts
        updateCharts();

        if (elapsedTime >= duration) {
            clearInterval(monitoringInterval);  // Stop monitoring after the set duration
        }
    }, 1000);  // Update every second

    // Disable the start button and enable the stop button
    document.getElementById('startMonitoringBtn').disabled = true;
    document.getElementById('stopMonitoringBtn').disabled = false;
}

// Stop the monitoring process
function stopRealTimeMonitoring() {
    clearInterval(monitoringInterval);  // Clear the interval to stop the monitoring

    // Disable the stop button and enable the start button
    document.getElementById('startMonitoringBtn').disabled = false;
    document.getElementById('stopMonitoringBtn').disabled = true;
}

// Update the charts with the latest data
function updateCharts() {
    bloodFlowChart.data.labels = timestamps;
    bloodFlowChart.data.datasets[0].data = bloodFlows;
    bloodFlowChart.update();

    bloodPressureChart.data.labels = timestamps;
    bloodPressureChart.data.datasets[0].data = bloodPressures;
    bloodPressureChart.update();

    oxygenationChart.data.labels = timestamps;
    oxygenationChart.data.datasets[0].data = oxygenLevels;
    oxygenationChart.update();

    bloodRateChart.data.labels = timestamps;
    bloodRateChart.data.datasets[0].data = bloodRates;
    bloodRateChart.update();

    clotRiskChart.data.labels = timestamps;
    clotRiskChart.data.datasets[0].data = clotRisks;
    clotRiskChart.update();

    strokeRiskChart.data.labels = timestamps;
    strokeRiskChart.data.datasets[0].data = strokeRisks;
    strokeRiskChart.update();
}

// Initialize charts
const bloodFlowChart = new Chart(document.getElementById('bloodFlowChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Blood Flow (L/min)',
            data: [],
            borderColor: 'blue',
            fill: false,
            tension: 0.1
        }]
    }
});

// Same for other charts...
const bloodPressureChart = new Chart(document.getElementById('bloodPressureChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Blood Pressure (mmHg)',
            data: [],
            borderColor: 'red',
            fill: false,
            tension: 0.1
        }]
    }
});

const oxygenationChart = new Chart(document.getElementById('oxygenationChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Oxygenation (%)',
            data: [],
            borderColor: 'green',
            fill: false,
            tension: 0.1
        }]
    }
});

// New Charts for Blood Rate, Clot Risk, and Stroke Risk
const bloodRateChart = new Chart(document.getElementById('bloodRateChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Blood Rate (L/min)',
            data: [],
            borderColor: 'purple',
            fill: false,
            tension: 0.1
        }]
    }
});

const clotRiskChart = new Chart(document.getElementById('clotRiskChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Clot Risk (%)',
            data: [],
            borderColor: 'orange',
            fill: false,
            tension: 0.1
        }]
    }
});

const strokeRiskChart = new Chart(document.getElementById('strokeRiskChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stroke Risk (%)',
            data: [],
            borderColor: 'brown',
            fill: false,
            tension: 0.1
        }]
    }
});

// Start monitoring when the button is clicked
document.getElementById('startMonitoringBtn').addEventListener('click', () => {
    startRealTimeMonitoring();
});

// Stop monitoring when the button is clicked
document.getElementById('stopMonitoringBtn').addEventListener('click', () => {
    stopRealTimeMonitoring();
});
