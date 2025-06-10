function calculatetotal() {
    let principal=parseFloat(document.getElementById("initialmoney").value)
    let rate=parseFloat(document.getElementById("annualrate").value)/100
    let yrs=parseFloat(document.getElementById("numyears").value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(yrs)) {
    document.getElementById("totalatend").innerText = "";
    return;
    }

    let totalatend=0
    totalatend=principal*Math.pow(1+rate, yrs)
    document.getElementById("totalatend").innerText = 
    "Your Future Holdings: $" + totalatend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}
function updateRateValue(val) {
    document.getElementById("rateCounter").innerText = val;}
function updateYearsValue(val) {
    document.getElementById("yearsCounter").innerText = val;}
