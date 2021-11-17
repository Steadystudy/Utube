const video = document.querySelector("video");
const playBtn = document.querySelector("#play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.querySelector("#mute");
const muteBtnIcon = muteBtn.querySelector("i");
const fullScreenBtn = document.querySelector("#fullScreenBtn");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const volumeRange = document.querySelector("#volume");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const timeLine = document.querySelector("#timeLine");
const videoContainer = document.querySelector("#videoContainer");
const videoControls = document.querySelector("#videoControls");

let volumeValue = 0.5;
let controlsTimeout = null;
let stopMovement = null;
let volumeIcon = volumeValue >= 0.5 ? "fas fa-volume-up" : "fas fa-volume-down";
video.volume = volumeValue;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.className = video.paused ? "fas fa-play" : "fas fa-pause";
};
const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  volumeRange.value = video.muted ? 0 : volumeValue;
  muteBtnIcon.className = video.muted
    ? "fas fa-volume-off"
    : volumeValue >= 0.5
    ? "fas fa-volume-up"
    : "fas fa-volume-down";
};
const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.className = "fas fa-volume-off";
  }
  volumeValue = value;
  value >= 0.5
    ? (muteBtnIcon.className = "fas fa-volume-up")
    : (muteBtnIcon.className = "fas fa-volume-down");
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineUpdate = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.className = "fas fa-expand-alt";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.className = "fas fa-compress-alt";
  }
};

const removeShowing = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (stopMovement) {
    clearTimeout(stopMovement);
    stopMovement = null;
  }
  videoControls.classList.add("showing");
  stopMovement = setTimeout(removeShowing, 2500);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(removeShowing, 2500);
};

const handleEndedView = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("click", handlePlayClick);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEndedView);
timeLine.addEventListener("input", handleTimeLineUpdate);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
