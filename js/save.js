// Recursive function to render elements
function renderElement(element, context) {
  // Handle different element types
  if (element.tagName === "IMG") {
    // Render image
    context.drawImage(element, element.offsetLeft, element.offsetTop);
  } else if (element.tagName === "UL" || element.tagName === "OL") {
    // Render list items
    element.querySelectorAll("li").forEach((liElement) => {
      context.fillText(
        liElement.textContent,
        liElement.offsetLeft,
        liElement.offsetTop
      );
    });
  } else {
    // Default rendering for other elements
    context.fillText(
      element.textContent,
      element.offsetLeft,
      element.offsetTop
    );
  }

  // Recursive rendering for child elements
  element.childNodes.forEach((child) => {
    if (child.nodeType === 1) {
      // Node type 1 is an element
      renderElement(child, context);
    }
  });
}

// Function to save div as JPG with complex content handling
function saveDivAsJpg(divSelector, fileName) {
  const divElement = document.querySelector(divSelector);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = divElement.offsetWidth;
  canvas.height = divElement.offsetHeight;

  // Render content onto the canvas
  renderElement(divElement, context);

  // Convert canvas to image data URL
  const dataUrl = canvas.toDataURL("image/jpeg");

  // Create a download link
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${fileName}.jpg`;
  link.click();
}

// Get the save button element
const saveButton = document.getElementById("saveButton");

// Attach click event to the save button
saveButton.addEventListener("click", () => {
  saveDivAsJpg(".result-card", "result-image");
});
