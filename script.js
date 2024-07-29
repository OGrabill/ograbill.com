function currentWrapper() {
  return document.querySelector(".gameWrapper.show").id;
}
function close() {
  window.parent.connectionsGame.close();
}

function showWrapper(wrapper) {
  let wrappers = document.querySelectorAll(".gameWrapper");
  wrappers.forEach((elm) => {
    elm.classList.remove("show");
  });
  document.querySelector("#" + wrapper).classList.add("show");
}

function signupPage(id) {
  let wrappers = document.querySelectorAll("#signup .centeredArea > span");
  wrappers.forEach((elm) => {
    elm.style.display = "none";
  });
  document.querySelector("#signup #" + id).style.display = "block";
}

window.signupActions = {};
window.signupActions.backAction = "";
window.signupActions.back = function () {
  eval(this.backAction);
};
window.signupActions.backButton = function (event) {
  let elm = document.querySelector("#signup .fa-left");
  if (!event) elm.style.display = "none";
  else {
    elm.style.display = "block";
    this.backAction = event;
  }
};
window.signupActions.welcome = async function () {
  // check if signed up
  let email = "test";
  let signedUp = false;
  let spreadsheetID = "1dpKTNsAZXmbEpQBkLZynzJaHJoW5X948MRLwBSiJ9KA";
  let data = await fetch(
    "https://docs.google.com/spreadsheets/d/" +
      spreadsheetID +
      "/export?format=tsv&gid=0"
  );
  let list = await data.text();
  if (list.includes(email)) {
    signedUp = true;
  }
  console.log(list, signedUp)
  // show appropriate screen
  if (signedUp) {
    signupPage("complete");
  } else {
    signupPage("welcome");
  }
  this.backButton();
  // show wrapper
  showWrapper("signup");
};
window.signupActions.start = function () {
  signupPage("confirm");
  this.backButton("signupPage('welcome');window.signupActions.backButton()");
  // fill name
  // check phone number
};
window.signupActions.confirm = function() {
  // check pronouns
  // check phone number added
  // if all good, next screen
  signupPage("terms");
  this.backButton("window.signupActions.start()");
}
window.signupActions.submit = async function() {
  // verify venmo username is not blank
  // confirm info again with popup
  // hide back button & show loading page
  signupPage('submitting')
  this.backButton();
  // submit with google form
  await fetch("https://api.blockstatus.app/api/friends");
  // show completion screen
  signupPage('complete')
}

window.onload = function () {
  window.signupActions.welcome();
};

