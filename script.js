document.getElementById('processButton').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const csvText = event.target.result;
        const summary = processCSV(csvText);
        document.getElementById('summaryOutput').textContent = summary;
    };

    reader.onerror = () => {
        alert('Failed to read file. Please try again.');
    };

    reader.readAsText(file);
});

function processCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return 'No data found in CSV.';

    const dataLines = lines.slice(1);

    let totalIncome = 0;
    let totalExpenses = 0;

    dataLines.forEach(line => {
        const columns = line.split(',');
        const category = columns[0].trim().toLowerCase();
        const amount = parseFloat(columns[1]);

        if (!isNaN(amount)) {
            if (category.includes('income')) {
                totalIncome += amount;
            } else {
                totalExpenses += amount;
            }
        }
    });

    const net = totalIncome - totalExpenses;

    return `Total Income: $${totalIncome.toFixed(2)}\nTotal Expenses: $${totalExpenses.toFixed(2)}\nNet Savings: $${net.toFixed(2)}`;
}
