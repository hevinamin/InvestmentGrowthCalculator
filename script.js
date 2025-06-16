function calculatetotal() {
    let principal = parseFloat(document.getElementById("initialmoney").value);
    let rate = parseFloat(document.getElementById("annualrate").value) / 100;
    let yrs = parseFloat(document.getElementById("numyears").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(yrs)) {
        document.getElementById("totalatend").innerText = "";
        return;
    }

    let recurring = 0;
    const includeRecurring = document.getElementById("recurringToggle")?.checked;
    if (includeRecurring) {
        recurring = parseFloat(document.getElementById("recurringAmount").value);
        if (isNaN(recurring)) recurring = 0;
    }

    let totalatend = 0;
    totalatend = principal * Math.pow(1 + rate, yrs);
    if (includeRecurring) {
        totalatend += recurring * ((Math.pow(1 + rate, yrs) - 1) / rate);
    }
    document.getElementById("totalatend").innerText =
        "Your Future Holdings: $" + totalatend.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    let yearlyData = [];
    for (let i = 1; i <= yrs; i++) {
        let yearlyAmount = principal * Math.pow(1 + rate, i);
        if (includeRecurring) {
            yearlyAmount += recurring * ((Math.pow(1 + rate, i) - 1) / rate);
        }
        yearlyData.push(parseFloat(yearlyAmount.toFixed(2)));
    }

    if (typeof updateChart === "function") {
        updateChart(yearlyData);
    }
}

function updateYearsValue(val) {
    document.getElementById("yearsCounter").innerText = val;
}


let chart;

function updateChart(data) {
    const labels = data.map((_, i) => `Year ${i + 1}`),
        principal = parseFloat(document.getElementById("initialmoney").value),
        recurring = document.getElementById("recurringToggle").checked
            ? parseFloat(document.getElementById("recurringAmount").value) || 0
            : 0,
        principalData = data.map((_, i) => principal + recurring * (i + 1)),
        growthData = data.map((total, i) => total - principalData[i]),
        ctx = document.getElementById('investmentChart').getContext('2d');

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = principalData;
        chart.data.datasets[1].data = growthData;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    { label: 'Principal', data: principalData, backgroundColor: '#22543D' },
                    { label: 'Growth', data: growthData, backgroundColor: '#68D391' }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                }
            }
        });
    }
}