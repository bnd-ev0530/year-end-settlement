const container = document.getElementById("video-container");
const videos = [
  {
    id: 1,
    url: "https://youtu.be/x_Iwj5zMu6I?si=G-HcYAPaf4O0x7tn",
    title: "[입덕직캠] One and Only",
    thumb: "001.jpg",
  },
  {
    id: 2,
    url: "https://youtu.be/wJBZ54iJHm4?si=x8CdL7a6aS5jggFN",
    title: "[입덕직캠]Hot Summer",
    thumb: "002.jpg",
  },
  {
    id: 3,
    url: "https://youtu.be/UkxSNLRqJ7s?si=9_p0nL1CmmCh3r0a",
    title: "[뮤직뱅크] One and Only",
    thumb: "003.jpg",
  },
  {
    id: 4,
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
  radioBtn.value = video.title;

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
