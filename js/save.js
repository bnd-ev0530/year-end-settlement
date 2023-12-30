// Function to save div as JPG with complex content handling
function saveDivAsJpg(divSelector, fileName) {
  const imageData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = imageData;
  link.download = "canvas_image.png";
  link.click();
}

// Get the save button element
const saveButton = document.getElementById("saveButton");

// Attach click event to the save button
saveButton.addEventListener("click", () => {
  saveDivAsJpg(".result-card", "result-image");
});
