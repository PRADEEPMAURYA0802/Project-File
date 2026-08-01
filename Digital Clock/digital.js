const time = document.getElementById('time');
const timeFormat = document.getElementById('time-format');

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const isPM = hours >= 12;

    if (isPM) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    time.textContent = `${hours}:${minutes}:${seconds}`;
    timeFormat.textContent = isPM ? 'PM' : 'AM';
  }, 1000);
});