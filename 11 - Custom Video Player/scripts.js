const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const fullscreen = player.querySelector(".fullscreen");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");
let mousedown = false;

const togglePlay = () => {
  if (
    document.fullscreenElement &&
    document.fullscreenElement.nodeName == "VIDEO"
  )
    return;
  const method = video.paused ? "play" : "pause";
  video[method]();
};

const updateButton = (e) => {
  const icon = e.target.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
};

const skip = (e) => {
  video.currentTime += parseFloat(e.target.dataset.skip);
};

const handleRangeUpdates = (e) => {
  video[e.target.name] = e.target.value;
};

const handleProgress = (e) => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const enterFullscreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE11 */
    video.msRequestFullscreen();
  }
};

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
fullscreen.addEventListener("click", enterFullscreen);
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdates));
skipButtons.forEach((btn) => btn.addEventListener("click", skip));
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
