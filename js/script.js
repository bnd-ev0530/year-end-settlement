const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("submit");
const resultArea = document.getElementById("result-area");
const container = document.getElementById("video-container");
const photoContainer = document.getElementById("photo-container");

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

let photo;
let photoCard;

//fake db - photo
const photos = [
  {
    id: "photo1",
    photo: "001.jpg",
    title: "A",
    bgcard: "001.png",
  },
  {
    id: "photo2",
    photo: "002.jpg",
    title: "B",
    bgcard: "002.png",
  },
  {
    id: "photo3",
    photo: "003.jpg",
    title: "C",
    bgcard: "003.png",
  },
  {
    id: "photo4",
    photo: "004.jpg",
    title: "D",
    bgcard: "004.png",
  },
  {
    id: "photo5",
    photo: "005.jpg",
    title: "E",
    bgcard: "005.png",
  },
  {
    id: "photo6",
    photo: "006.jpg",
    title: "F",
    bgcard: "006.png",
  },
];

//fake db - fancam
const videos = [
  {
    id: "1",
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "One and Only [0601 엠카운트다운]",
    thumb: "001.JPG",
    short: "https://zrr.kr/BG8J",
    qrcode: "001.png",
  },
  {
    id: "2",
    url: "https://youtu.be/IJHqvfauu2M?si=euaPYgLNydewpWie",
    title: "돌아버리겠다 [0530 데뷔쇼]",
    thumb: "002.JPG",
    short: "https://zrr.kr/POan",
    qrcode: "002.png",
  },
  {
    id: "3",
    url: "https://youtu.be/wH82Vk7GjYk?si=nyfHHaT36m82sULr",
    title: "Serenade [0627 인기가요]",
    thumb: "003.JPG",
    short: "https://zrr.kr/ddhD",
    qrcode: "003.png",
  },
  {
    id: "4",
    url: "https://youtu.be/wJBZ54iJHm4?si=IETGDsj4eVj9dwqZ",
    title: "Hot Summer [0713 엠카운트다운]",
    thumb: "004.JPG",
    short: "https://zrr.kr/QC5a",
    qrcode: "004.png",
  },
  {
    id: "5",
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "예쁘다 [0630 뮤직뱅크]",
    thumb: "005.JPG",
    short: "https://zrr.kr/iRnA",
    qrcode: "005.png",
  },
  {
    id: "6",
    url: "https://youtu.be/IJHqvfauu2M?si=euaPYgLNydewpWie",
    title: "뭣 같아 [0919 인기가요]",
    thumb: "006.JPG",
    short: "https://zrr.kr/7ztE",
    qrcode: "006.png",
  },
  {
    id: "7",
    url: "https://youtu.be/wH82Vk7GjYk?si=nyfHHaT36m82sULr",
    title: "Crying [0908 뮤직뱅크]",
    thumb: "007.JPG",
    short: "https://zrr.kr/yCg1",
    qrcode: "007.png",
  },
  {
    id: "8",
    url: "https://youtu.be/wJBZ54iJHm4?si=IETGDsj4eVj9dwqZ",
    title: "ABCDLOVE [0904 컴백쇼]",
    thumb: "008.JPG",
    short: "https://zrr.kr/Gft4",
    qrcode: "008.png",
  },
];

ctx.font = "14px Arial"; // Set font size and family
ctx.fillStyle = "white"; // Set text color

// fancam 라디오 버튼 생성
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
  const div = document.createElement("div");
  label.htmlFor = `url${video.id}`; // Associate label with radio button
  label.id = video.id;
  label.innerHTML = video.title;

  const img = document.createElement("img");
  img.id = video.id;

  img.src = `images/fancam/${video.thumb}`;
  //   console.log(img);

  // Append radio button and label to container
  label.appendChild(img);
  div.appendChild(radioBtn);
  div.appendChild(label);

  // Add a line break for better spacing
  container.appendChild(div);
});

// photo 라디오 버튼 생성
photos.forEach((photo, index) => {
  const radioBtn = document.createElement("input");
  radioBtn.type = "radio";
  radioBtn.id = `${photo.id}`; // Set unique ID
  radioBtn.name = "photo";
  radioBtn.value = photo.id; //

  // Check if it's the first radio button and set 'checked' attribute
  if (index === 0) {
    radioBtn.checked = true;
  }

  const label = document.createElement("label");
  const div = document.createElement("div");
  label.htmlFor = `${photo.id}`; // Associate label with radio button
  label.id = photo.id;
  label.innerHTML = photo.title;

  const img = document.createElement("img");

  img.src = `images/photo/${photo.photo}`;
  img.id = photo.id;

  // Append radio button and label to container
  label.appendChild(img);
  div.appendChild(radioBtn);
  div.appendChild(label);

  photoContainer.appendChild(div);
});

//포토카드 찾기
function findphotoCard() {
  //선택한 사진 정보를 찾음
  function findPhotoById(id) {
    return photos.find((photo) => photo.id === id);
  }
  const photoId = loginForm.photo.value;
  // Example usage:
  const desiredId = photoId; // This value can be dynamically set based on user input, API response, etc.
  const selectedPhoto = findPhotoById(desiredId);
  //console.log(selectedPhoto);

  //선택한 사진 포토카드 정보를 찾으면 결과에 넣음
  if (selectedPhoto) {
    photoCard = selectedPhoto.bgcard;
    //console.log("photoCard : " + photoCard);
    //finishImg.src = photoCard;
    const bgImage = document.createElement("img");
    bgImage.src = `images/bgcard/${photoCard}`;

    //console.log(bgImage);
    bgImage.onload = function () {
      ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      console.log("배경 카드 : " + bgImage.src + " 그리기완료");
      findNickname();
      findSong();
      findDate();
      findFancam();
    };
    console.log("Found Photo:", selectedPhoto.title);
  } else {
    console.log("Photo not found.");
  }
}

//닉네임 찾고 그리기
function findNickname() {
  nickname = loginForm.nickname.value;
  if (!nickname) {
    nickname = "이름없음";
  }

  //console.log("nickname :" + nickname);

  ctx.fillText(nickname, 365, 140);
  console.log("이름 : " + nickname + " 그리기완료");
}

//가장 좋아하는 노래 찾고 그리기
function findSong() {
  song = loginForm.song.value;
  ctx.fillText(song, 365, 228);
  console.log("좋아하는 노래 : " + song + " 그리기완료");
}
//가장 좋아하는 직캠 찾고 qr 그리기
function findFancam() {
  url = loginForm.url.value;

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
    console.log("Found Video:", foundVideo.title);
  } else {
    console.log("Video not found.");
  }

  //qr 그리기
  const qrImage = new Image();
  qrImage.src = `images/qrcode/${foundVideo.qrcode}`;
  qrImage.onload = function () {
    ctx.drawImage(qrImage, 480, 280, 100, 100);
  };
  console.log("가장 좋아하는 직캠 qr : " + qrImage.src + " 그리기완료");
}

//입덕 날짜 찾고 그리기
function findDate() {
  date = loginForm.date.value;
  ctx.fillText(date, 365, 185);
  console.log("입덕날짜 : " + date + " 그리기완료");
}

// 폼 확인 클릭시
loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  //포토카드 찾고 만들기
  findphotoCard();

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
  )}&url=${encodeURIComponent(url)}`;
  window.open(fullUrl, "_blank");
}

// Attach click event to the save button
shareButton.addEventListener("click", () => {
  shareOnTwitter();
});
