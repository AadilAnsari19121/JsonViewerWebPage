const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');

// Function to handle JSON conversion
convertBtn.addEventListener('click', () => {
    const inputText = jsonInput.value.trim();
    let outputText = '';
    try {
        // Try parsing the JSON
        const parsedJSON = JSON.parse(inputText);
        const formattedJSON = JSON.stringify(parsedJSON, null, 2);
        outputText = formattedJSON;
        copyBtn.innerText = 'Copy Text';
    } catch (error) {
        // Show error message in line 1
        outputText += `Error: ${error.message}\n\n`;
        // Attempt to parse JSON manually for partial output
        try {
            const partialJSON = eval(`(${inputText})`); // Caution: eval should be used carefully
            const formattedPartialJSON = JSON.stringify(partialJSON, null, 2);
            outputText += formattedPartialJSON;
        } catch {
            outputText += 'Could not parse JSON further.';
        }
    }

    jsonOutput.textContent = outputText;
});

// Function to handle reset
resetBtn.addEventListener('click', () => {
    copyBtn.innerText = 'Copy Text';
    jsonInput.value = '';
    jsonOutput.textContent = 'Formatted JSON will appear here...';
});

// Function to copy text from right panel
copyBtn.addEventListener('click', () => {
    const textToCopy = jsonOutput.textContent;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.innerText = 'copied';
        }).catch(err => {
            alert('Failed to copy text: ', err);
        });
    }
});
