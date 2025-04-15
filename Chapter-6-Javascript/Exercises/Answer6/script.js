// Function to calculate the total cost of petrol
function calculateTotalCost() {
    // Get the value of cost per liter and liters purchased from the input fields
    const costPerLiter = parseFloat(document.getElementById('costPerLiter').value);
    const litersPurchased = parseFloat(document.getElementById('litersPurchased').value);

    // Calculate the total cost
    const totalCost = (costPerLiter * litersPurchased).toFixed(2);

    // Display the total cost in the paragraph element
    document.getElementById('totalCost').innerText = `Total Cost: AED${totalCost}`;
}

// Add event listener to the button to trigger the calculation on click
document.getElementById('calculateButton').addEventListener('click', calculateTotalCost);