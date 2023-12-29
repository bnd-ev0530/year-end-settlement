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
  let url = loginForm.url.value;
  const date = loginForm.date.value;

  const file = fileInput.files[0];
  const imgUrl = URL.createObjectURL(file);
  const image = new Image();
  image.src = imgUrl;

  url = url.substr(url.lastIndexOf("=") + 1);
  console.log(url);

  if (file) {
    fileResult.innerHTML = `<h1>사진</h1><div><img src=${imgUrl} style="max-width:100%"></div>`; // Display the file name or other file details
  } else {
    console.error("No file selected");
  }
  songResult.innerHTML = `<h1>노래</h1><p>${song}</p>`;
  urlResult.innerHTML = `<h1>직캠</h1><iframe width="100%" height="315" src="https://www.youtube.com/embed/${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  dateResult.innerHTML = `<h1>날짜</h1><p>${date}</p>`;
});
