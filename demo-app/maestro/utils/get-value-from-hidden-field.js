// Access a hidden element by ID
const hiddenElement = document.getElementById('cardFlowE2eStates.panIsValid');

// Read text content or value
if (hiddenElement) {
    console.log('Text:', hiddenElement.textContent);
    // For input fields:
    // console.log('Value:', hiddenElement.value);

    output.result = hiddenElement.textContent;
}
else {
    output.result = "javascript element not found";
}
