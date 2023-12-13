const startBtnRef = document.querySelector("button[data-start]");
const stopBtnRef = document.querySelector("button[data-stop]");
const bodyRef = document.querySelector("body");

const bacgroundSwitcher = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        }
        bodyRef.style.backgroundColor = getRandomHexColor();
        this.isActive = true;
        startBtnRef.disabled = true;
        stopBtnRef.disabled = false;

        this.intervalId = setInterval(() => {
            bodyRef.style.backgroundColor = getRandomHexColor();
        }, 1000);
    },
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        stopBtnRef.disabled = true;
        startBtnRef.disabled = false;
    }
}
startBtnRef.addEventListener('click', () => {
    bacgroundSwitcher.start();
});
stopBtnRef.addEventListener('click', () => {
    bacgroundSwitcher.stop();
});



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
