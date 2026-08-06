let isDOBOpen = false;
let dateOfBirth = null;
let timer = null;

const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

settingCogEl.addEventListener("click", () => {
  isDOBOpen = !isDOBOpen;

  if (isDOBOpen) {
    settingContentEl.classList.remove("hide");
  } else {
    settingContentEl.classList.add("hide");
  }
});

function makeTwoDigit(num) {
  return num < 10 ? `0${num}` : num;
}

function updateAge() {
  if (!dateOfBirth) return;

  const now = new Date();
  const diff = now - dateOfBirth;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff / (1000 * 60 * 60 * 24 * 30)) % 12
  );
  const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  yearEl.innerText = makeTwoDigit(years);
  monthEl.innerText = makeTwoDigit(months);
  dayEl.innerText = makeTwoDigit(days);
  hourEl.innerText = makeTwoDigit(hours);
  minuteEl.innerText = makeTwoDigit(minutes);
  secondEl.innerText = makeTwoDigit(seconds);
}

function contentToggler() {
  if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDOBBtnTxtEl.classList.remove("hide");
  } else {
    initialTextEl.classList.remove("hide");
    afterDOBBtnTxtEl.classList.add("hide");
  }
}

dobButtonEl.addEventListener("click", () => {
  const dobValue = dobInputEl.value;

  if (!dobValue) {
    alert("Please Select Your Date Of Birth");
    return;
  }

  dateOfBirth = new Date(dobValue);

  localStorage.setItem("dob", dobValue);

  contentToggler();
  updateAge();

  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(updateAge, 1000);

  settingContentEl.classList.add("hide");
  isDOBOpen = false;
});

function loadDOB() {
  const savedDOB = localStorage.getItem("dob");

  if (savedDOB) {
    dateOfBirth = new Date(savedDOB);

    contentToggler();
    updateAge();

    timer = setInterval(updateAge, 1000);
  } else {
    contentToggler();
  }
}

loadDOB();