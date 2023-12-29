const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("submit");
const songResult = document.getElementById("songResult");
const fileResult = document.getElementById("fileResult");
const urlResult = document.getElementById("urlResult");
const dateResult = document.getElementById("dateResult");

const container = document.getElementById("video-container");
const videos = [
  {
    id: "1",
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "[입덕직캠] One and Only",
    thumb: "001.jpg",
  },
  {
    id: "2",
    url: "https://youtu.be/wJBZ54iJHm4?si=x8CdL7a6aS5jggFN",
    title: "[입덕직캠]Hot Summer",
    thumb: "002.jpg",
  },
  {
    id: "3",
    url: "https://youtu.be/UkxSNLRqJ7s?si=9_p0nL1CmmCh3r0a",
    title: "[뮤직뱅크] One and Only",
    thumb: "003.jpg",
  },
  {
    id: "4",
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "[페이스캠] 뭣같아",
    thumb: "004.jpg",
  },
];

// 2. Create radio buttons dynamically
videos.forEach((video) => {
  const radioBtn = document.createElement("input");
  radioBtn.type = "radio";
  radioBtn.id = `url${video.id}`; // Set unique ID
  radioBtn.name = "url";
  radioBtn.value = video.id;

  const label = document.createElement("label");
  label.htmlFor = `url${video.id}`; // Associate label with radio button
  label.id = video.id;
  label.innerHTML = video.title;

  const img = document.createElement("img");

  img.src = `images/fancam/${video.thumb}`;
  //   console.log(img);

  // Append radio button and label to container
  container.appendChild(radioBtn);
  container.appendChild(label);
  container.appendChild(img);

  // Add a line break for better spacing
  container.appendChild(document.createElement("br"));
});

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

  //url = url.substr(url.lastIndexOf("=") + 1);
  console.log(url);

  if (file) {
    fileResult.innerHTML = `<h1>사진</h1><div><img src=${imgUrl} style="max-width:100%"></div>`; // Display the file name or other file details
  } else {
    console.error("No file selected");
  }
  songResult.innerHTML = `<h1>SONG</h1><p>${song}</p>`;

  // urlResult.innerHTML = `<h1>FANCAM</h1><iframe width="100%" height="315" src="https://www.youtube.com/embed/${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  dateResult.innerHTML = `<h1>DATE</h1><p>${date}</p>`;

  const findVideoById = (videosArray, id) => {
    return videosArray.find((video) => video.id === id);
  };

  const videoIdToFind = url;
  const foundVideo = findVideoById(videos, videoIdToFind);

  if (foundVideo) {
    urlResult.innerHTML = `<h1>직캠</h1><p><a href="${foundVideo.url}" target="_blank"><img src="images/fancam/${foundVideo.thumb}" width="100%">${foundVideo.title}</a></p>`;
    console.log("Found Video:", foundVideo.title);
  } else {
    console.log("Video not found.");
  }
});
