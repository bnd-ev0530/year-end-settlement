const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("submit");
const songResult = document.getElementById("songResult");
const fileResult = document.getElementById("fileResult");
const urlResult = document.getElementById("urlResult");
const dateResult = document.getElementById("dateResult");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  const fileInput = loginForm.querySelector('input[type="file"]');
  const song = loginForm.song.value;
  const url = loginForm.url.value;
  const date = loginForm.date.value;

  const file = fileInput.files[0];
  const imgUrl = URL.createObjectURL(file);
  const image = new Image();
  image.src = imgUrl;
  console.log(image);

  if (file) {
    fileResult.innerHTML = `사진 : <img src='${imgUrl}' style="max-width:100%">`; // Display the file name or other file details
  } else {
    console.error("No file selected");
  }
  songResult.innerText = "노래 : " + song;
  urlResult.innerHTML = `직캠 : <iframe width="100%" height="315" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  dateResult.innerText = "날짜 : " + date;
});
