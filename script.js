const timeDisplay = document.querySelector("#time");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const hint = document.querySelector("#hint");
const presetButtons = document.querySelectorAll(".preset");

let selectedSeconds = 5 * 60;
let remainingSeconds = selectedSeconds;
let endTime = null;
let intervalId = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function render() {
  const formatted = formatTime(remainingSeconds);
  timeDisplay.textContent = formatted;
  document.title = `${formatted} | Simple Timer`;
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  endTime = null;
  startButton.textContent = remainingSeconds === 0 ? "もう一度" : "スタート";
}

function tick() {
  remainingSeconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
  render();

  if (remainingSeconds === 0) {
    stopTimer();
    hint.textContent = "おつかれさまでした！";
    timeDisplay.setAttribute("aria-live", "polite");
    timeDisplay.setAttribute("aria-label", "タイマーが終了しました");
  }
}

function startTimer() {
  if (intervalId) {
    remainingSeconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    clearInterval(intervalId);
    intervalId = null;
    startButton.textContent = "再開";
    hint.textContent = "一時停止中です。";
    return;
  }

  if (remainingSeconds === 0) remainingSeconds = selectedSeconds;
  endTime = Date.now() + remainingSeconds * 1000;
  intervalId = setInterval(tick, 250);
  startButton.textContent = "一時停止";
  hint.textContent = "集中する時間です。";
  timeDisplay.setAttribute("aria-live", "off");
  tick();
}

function resetTimer() {
  stopTimer();
  remainingSeconds = selectedSeconds;
  hint.textContent = "時間を選んで、スタートを押してください。";
  timeDisplay.removeAttribute("aria-label");
  render();
}

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSeconds = Number(button.dataset.minutes) * 60;
    presetButtons.forEach((item) => item.classList.toggle("active", item === button));
    resetTimer();
  });
});

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
render();
