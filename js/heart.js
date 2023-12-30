document.addEventListener("DOMContentLoaded", function () {
  const canvas2 = document.getElementById("heartCanvas");
  if (canvas2) {
    const ctx2 = canvas2.getContext("2d");
    ctx2.beginPath();
    ctx2.moveTo(100, 80);
    ctx2.bezierCurveTo(100, 50, 50, 50, 50, 80);
    ctx2.bezierCurveTo(50, 100, 100, 125, 100, 150);
    ctx2.bezierCurveTo(100, 125, 150, 100, 150, 80);
    ctx2.bezierCurveTo(150, 50, 100, 50, 100, 80);
    ctx2.fillStyle = "red";
    ctx2.fill();
    ctx2.closePath();

    const heart = new Image();
    heart.src = "../images/00.jpg";

    heart.onload = function () {
      const pattern = ctx2.createPattern(heart, "repeat");
      ctx2.fillStyle = pattern;
      ctx2.fill();
    };
  }
});
