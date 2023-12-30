const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("submit");
const songResult = document.getElementById("songResult");
const fileResult = document.getElementById("fileResult");
const urlResult = document.getElementById("urlResult");
const nameResult = document.getElementById("nameResult");
const dateResult = document.getElementById("dateResult");
const resultArea = document.getElementById("result-area");

const container = document.getElementById("video-container");

//fake db - fancam
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

// 2. fancam 라디오 버튼 생성
videos.forEach((video, index) => {
  const radioBtn = document.createElement("input");
  radioBtn.type = "radio";
  radioBtn.id = `url${video.id}`; // Set unique ID
  radioBtn.name = "url";
  radioBtn.value = video.id; //

  // Check if it's the first radio button and set 'checked' attribute
  if (index === 0) {
    radioBtn.checked = true;
  }

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

// 폼 확인 클릭시
loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const nickname = loginForm.nickname.value;

  //가장 좋아하는 사진
  const fileInput = loginForm.querySelector('input[type="file"]');

  //가장 좋아하는 곡
  const song = loginForm.song.value;

  //가장 좋아하는 직캠
  let url = loginForm.url.value;
  //console.log("가장 좋아하는 직캠은 " + url + "번");

  //입덕 날짜
  const date = loginForm.date.value;

  //가장 좋아하는 사진 - fake img 생성
  const file = fileInput.files[0];
  if (!file) {
    alert("가장 좋아하는 사진을 선택해주세요!");
  }
  console.log(file);
  const imgUrl = URL.createObjectURL(file);
  const image = new Image();
  image.src = imgUrl;

  //가장 좋아하는 사진 선택하면
  if (file) {
    fileResult.innerHTML = `<div><img src=${imgUrl} style="max-width:100%"></div>`; // Display the file name or other file details
  } else {
    //선택안하면
    alert("No file selected");
    console.error("No file selected");
  }

  //가장 좋아하는 곡 결과에 넣기 위한 데이터 생성
  songResult.innerHTML = `${song}`;

  // urlResult.innerHTML = `<h1>FANCAM</h1><iframe width="100%" height="315" src="https://www.youtube.com/embed/${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

  // 입덕 날짜
  dateResult.innerHTML = `${date}`;
  nameResult.innerHTML = `${nickname}`;

  //선택한 팬캠 정보를 찾음
  const findVideoById = (videosArray, id) => {
    return videosArray.find((video) => video.id === id);
  };

  const videoIdToFind = url;
  const foundVideo = findVideoById(videos, videoIdToFind);

  //선택한 팬캠 정보를 찾으면 결과에 넣음
  if (foundVideo) {
    urlResult.innerHTML = `<a href="${foundVideo.url}" target="_blank"><div><img src="images/fancam/${foundVideo.thumb}" width="100%"></div><p>${foundVideo.title}</p></a>`;
    console.log("Found Video:", foundVideo.title);
  } else {
    console.log("Video not found.");
  }
  resultArea.classList.add("showing");

  window.location.href = "#result-area";
});
