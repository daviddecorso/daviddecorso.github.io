const color_bg1 = "#4d5eb3";

const color_bg2 = "#E98196";

const color_stroke = "#E2E482";

const color_shape = "#9fe5fc";

const gridWeight = 0.15;

let mobileView = false;

var canvas = document.getElementById("grid");
var gridCtx = canvas.getContext("2d");

var topCanvas = document.getElementById("top-canvas");
var topCtx = topCanvas.getContext("2d");

var ucfText = document.getElementById("abt-school");
var ucfImg = document.getElementById("ucf-img");

var projectsText = document.getElementById("abt-projects");

var contactText = document.getElementById("abt-contact");

var nameText = document.getElementById("name");

let img = new Image();
img.src = "/ucf_knight.jpg";

let rightArrow = new Image();
rightArrow.src = "/arrow_right_angle.svg";

let loopArrow = new Image();
loopArrow.src = "/arrow_double_loop.svg";

let nameWriting = new Image();
nameWriting.src = "/mynameis.png";

let githubPic = new Image();
githubPic.src = "/github_snip_img.png";

let notifPic = new Image();
notifPic.src = "/notif_dot.png";

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var canvasWidth = windowWidth;
var canvasHeight = windowHeight;

window.onresize = function (e) {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  canvasWidth = windowWidth;
  canvasHeight = windowHeight;

  setCanvasSize();

  fillBg();
  drawShapes(
    canvasHeight + gridChangeY,
    canvasWidth + gridChangeX,
    deltaX,
    deltaY
  );
  drawNameWriting();

  if (canvasHeight <= 1190) {
    mobileView = true;
  } else {
    mobileView = false;
  }
};

var gridChangeX = 0;
var gridChangeY = 0;

function setCanvasSize() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

function fillBg() {
  gridCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  gridCtx.fillStyle = color_bg2;
  gridCtx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawShapes(startHeight, startWidth, deltaX, deltaY) {
  // Drawing triangles
  const lineDiffHeight = 51;
  const lineDiffWidth = 91;
  const sidelen = 30;
  const height = 26;
  const startPointX = 60;

  for (var j = 2050; j > -2000; j -= lineDiffWidth) {
    gridCtx.beginPath();

    for (
      var i = startHeight - lineDiffHeight + 300;
      i > -500;
      i -= lineDiffHeight
    ) {
      gridCtx.moveTo(startPointX + j + deltaX, i - deltaY);
      gridCtx.lineTo(
        startPointX + j + sidelen / 2 - deltaX,
        i - height - deltaY
      );
      gridCtx.lineTo(startPointX + j + sidelen + deltaX, i + deltaY);
      gridCtx.lineTo(startPointX + j + deltaX, i - deltaY);

      gridCtx.strokeStyle = color_stroke;
      gridCtx.lineWidth = gridWeight;
      gridCtx.stroke();
    }
  }

  if (ucfMouseOver) {
    gridCtx.drawImage(
      img,
      ucfText.getBoundingClientRect().right - 10,
      ucfText.getBoundingClientRect().top - 425
    );
    gridCtx.drawImage(
      rightArrow,
      ucfText.getBoundingClientRect().right + 20,
      ucfText.getBoundingClientRect().top - 120,
      150,
      150
    );
  }

  if (projectMouseOver) {
    gridCtx.drawImage(
      loopArrow,
      projectsText.getBoundingClientRect().left - 80,
      projectsText.getBoundingClientRect().bottom - 22,
      150,
      150
    );
    gridCtx.drawImage(
      githubPic,
      projectsText.getBoundingClientRect().left + 70,
      projectsText.getBoundingClientRect().bottom + 15,
      326,
      200
    );
  }

  if (contactMouseOver) {
    gridCtx.drawImage(
      notifPic,
      contactText.getBoundingClientRect().right - 2,
      contactText.getBoundingClientRect().top - 5,
      18,
      18
    );
  }
}

function drawNameWriting() {
  gridCtx.drawImage(
    nameWriting,
    nameText.getBoundingClientRect().left - 140,
    nameText.getBoundingClientRect().top - 140,
    300,
    300
  );
}

function mouseMoveListener() {
  if (!mobileView) {
    document.addEventListener("mousemove", setMousePos, false);
  }
}

function setImgPos(leftPos, topPos) {
  ucfImg.style.left = leftPos;
  ucfImg.style.top = topPos;
}

let ucfMouseOver = false;
let projectMouseOver = false;
let contactMouseOver = false;

function setMousePos(e) {
  deltaX = e.movementX;
  deltaY = e.movementY;
  mousePosX = e.clientX;
  mousePosY = e.clientY;
  var leftPos = e.clientX + "px";
  var topPos = e.clientY + "px";
  setImgPos(leftPos, topPos);

  gridScroll(e);
}

ucfText.onmouseover = function () {
  ucfMouseOver = true;
  ucfText.style.fontStyle = "italic";
};

ucfText.onmouseout = function () {
  ucfMouseOver = false;
  ucfText.style.fontStyle = "normal";
};

projectsText.onmouseover = function () {
  projectsText.style.fontStyle = "italic";
  projectMouseOver = true;
};

projectsText.onmouseout = function () {
  projectsText.style.fontStyle = "normal";
  projectMouseOver = false;
};

contactText.onmouseover = function () {
  contactText.style.fontStyle = "italic";
  contactMouseOver = true;
};

contactText.onmouseout = function () {
  contactText.style.fontStyle = "normal";
  contactMouseOver = false;
};

var scrolling = false;

function gridScroll(e) {
  if (!scrolling) {
    mousePosX = e.clientX;
    mousePosY = e.clientY;

    if (
      mousePosX > 0 &&
      mousePosX <= windowWidth &&
      mousePosY > 0 &&
      mousePosY <= windowHeight
    ) {
      gridChangeX += deltaX / 4;
      gridChangeY += deltaY / 4;

      fillBg();
      drawShapes(
        canvasHeight + gridChangeY,
        canvasWidth + gridChangeX,
        deltaX,
        deltaY
      );
      drawNameWriting();
      requestAnimationFrame(gridScroll);
    }
  }
}

setCanvasSize();

fillBg();

githubPic.onload = function () {
  drawShapes(canvasHeight, canvasWidth, 0, 0);
  if (canvasWidth <= 1190) {
    mobileView = true;
  } else {
    mouseMoveListener();
  }
};

nameWriting.onload = function () {
  gridCtx.drawImage(
    nameWriting,
    nameText.getBoundingClientRect().left - 140,
    nameText.getBoundingClientRect().top - 140,
    300,
    300
  );
};
