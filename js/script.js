const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("submit");
// const songResult = document.getElementById("songResult");
// const fileResult = document.getElementById("fileResult");
// const urlResult = document.getElementById("urlResult");
// const nameResult = document.getElementById("nameResult");
// const dateResult = document.getElementById("dateResult");
const resultArea = document.getElementById("result-area");
const finishImg = document.getElementById("finish-img");
const container = document.getElementById("video-container");

// canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let nickname;
let song;
let url;
let fancamShortUrl;
let date;
let fancamTitle;

//fake db - fancam
const videos = [
  {
    id: "1",
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "[입덕직캠] One and Only",
    thumb: "001.jpg",
    short: "https://shorturl.at/ejlox",
  },
  {
    id: "2",
    url: "https://youtu.be/wJBZ54iJHm4?si=x8CdL7a6aS5jggFN",
    title: "[입덕직캠]Hot Summer",
    thumb: "002.jpg",
    short: "https://shorturl.at/ejlox",
  },
  {
    id: "3",
    url: "https://youtu.be/UkxSNLRqJ7s?si=9_p0nL1CmmCh3r0a",
    title: "[뮤직뱅크] One and Only",
    thumb: "003.jpg",
    short: "https://shorturl.at/ejlox",
  },
  {
    id: "4",
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "[페이스캠] 뭣같아",
    thumb: "004.jpg",
    short: "https://shorturl.at/ejlox",
  },
];
//bg image
const bgFile = "idcard_qr.PNG";
console.log(bgFile);
const bgImage = new Image();
bgImage.src = bgFile;
console.log(bgImage);
bgImage.onload = function () {
  ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

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

  nickname = loginForm.nickname.value;
  if (!nickname) {
    alert("이름을 입력해주세요!");
  }
  console.log("nickname :" + nickname);
  //가장 좋아하는 사진
  const fileInput = loginForm.querySelector('input[type="file"]');

  //가장 좋아하는 곡
  song = loginForm.song.value;

  //가장 좋아하는 직캠
  url = loginForm.url.value;
  //console.log("가장 좋아하는 직캠은 " + url + "번");

  //입덕 날짜
  date = loginForm.date.value;

  //가장 좋아하는 사진 - fake img 생성
  const file = fileInput.files[0];
  if (!file) {
    alert("가장 좋아하는 사진을 선택해주세요!");
  }
  console.log(file);

  const imgUrl = URL.createObjectURL(file);
  const image = new Image();
  image.src = imgUrl;
  image.onload = function () {
    ctx.drawImage(image, 50, 110, 185, 256);
  };
  fileInput.value = "";

  //가장 좋아하는 사진 선택하면
  if (file) {
    //fileResult.innerHTML = `<div><img src=${imgUrl} style="max-width:100%"></div>`; // Display the file name or other file details
  } else {
    //선택안하면
    alert("No file selected");
    console.error("No file selected");
  }
  console.log(song);
  //가장 좋아하는 곡 결과에 넣기 위한 데이터 생성

  // songResult.innerHTML = `${song}`;
  ctx.font = "16px Neo둥근모"; // Set font size and family
  ctx.fillStyle = "white"; // Set text color
  ctx.fillText(song, 360, 235);

  // dateResult.innerHTML = `${date}`;
  ctx.fillText(date, 360, 190);
  // nameResult.innerHTML = `${nickname}`;
  ctx.fillText(nickname, 360, 145);
  // urlResult.innerHTML = `<h1>FANCAM</h1><iframe width="100%" height="315" src="https://www.youtube.com/embed/${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

  // 입덕 날짜
  // dateResult.innerHTML = `${date}`;
  // nameResult.innerHTML = `${nickname}`;

  //선택한 팬캠 정보를 찾음
  const findVideoById = (videosArray, id) => {
    return videosArray.find((video) => video.id === id);
  };

  const videoIdToFind = url;
  const foundVideo = findVideoById(videos, videoIdToFind);

  //선택한 팬캠 정보를 찾으면 결과에 넣음
  if (foundVideo) {
    fancamTitle = foundVideo.title;
    fancamShortUrl = foundVideo.short;

    // urlResult.innerHTML = `<a href="${foundVideo.url}" target="_blank"><div><img src="images/fancam/${foundVideo.thumb}" width="100%"></div><p>${foundVideo.title}</p></a>`;
    console.log("Found Video:", foundVideo.title);
  } else {
    console.log("Video not found.");
  }
  resultArea.classList.add("showing");
  window.location.href = "#result-area";
  // Reset the form fields
});

// Function to save div as JPG with complex content handling
function saveDivAsJpg(fileName) {
  const imageData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = imageData;
  link.download = `${fileName}.png`;
  link.click();
}

// Get the save button element
const saveButton = document.getElementById("saveButton");
const shareButton = document.getElementById("shareButton");

// Attach click event to the save button
saveButton.addEventListener("click", () => {
  saveDivAsJpg("result-image");
});

function shareOnTwitter() {
  const shareUrl = "https://twitter.com/intent/tweet";
  const text = `${nickname}의 가장 좋아하는 #Our2023Taesan !\n🖤 date: ${date}\n🖤 song: ${song}\n🖤 fancam: 🔗${fancamShortUrl}\n`;
  const url = "https://NEWHIPBOY.com/card.html";
  // const hashtags = "Our2023Taesan";
  const fullUrl = `${shareUrl}?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}}`;
  window.open(fullUrl, "_blank");

  //   const fullUrl = `${shareUrl}?text=${encodeURIComponent(
  //     text
  //   )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
  //   window.open(fullUrl, "_blank");
  // }
}

// Attach click event to the save button
shareButton.addEventListener("click", () => {
  shareOnTwitter();
});
