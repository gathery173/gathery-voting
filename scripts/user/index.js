const firebaseConfig = {
  apiKey: "AIzaSyBooRw8q86fnSegmIk9PC9ynkbp6ODyQoE",
  authDomain: "opijk-f14cd.firebaseapp.com",
  databaseURL: "https://opijk-f14cd-default-rtdb.firebaseio.com",
  projectId: "opijk-f14cd",
  storageBucket: "opijk-f14cd.appspot.com",
  messagingSenderId: "970116476040",
  appId: "1:970116476040:web:c9c81ac9b47b988028433d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the databas
// Get a reference to the Firebase Realtime Database

const database = firebase.database();

// Get a reference to the root of your data structure
const dataRef = database.ref("/");

// Function to handle login
// Function to handle login
function login() {
  const urlParams = new URLSearchParams(window.location.search);
  const loginParam = urlParams.get("log");
  const pwdParam = urlParams.get("pwd");

  if (!loginParam || !pwdParam) {
    // Show error message if login or password parameter is missing

    return;
  }

  const usersRef = database.ref("users");

  usersRef
    .child(loginParam)
    .once("value")
    .then((userSnapshot) => {
      const userData = userSnapshot.val();

      if (!userData) {
        // Show error message if user does not exist
        showError("Такого користувача неіснує");
        return;
      }

      if (userData.pwd !== pwdParam) {
        // Show error message if password is incorrect
        showError("Невірний пароль");
        return;
      }

      if (userData.log) {
        // Show error message if user has already logged in
        window.location.href = "404/login.html";
        return;
      }
      window.location.href = "intro.html";
      // Successful login, set log value to true
      userSnapshot.ref.update({ log: true });

      // Check condition and redirect accordingly
      const resultRef = firebase.database().ref("settings/result");
      resultRef.once("value", (resultSnapshot) => {
        const resultValue = resultSnapshot.val();
        if (resultValue === true) {
          window.location.href = "404.html";
        } else {
          // Redirect to voting.html
          window.location.href = "intro.html";
        }
      });
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      window.location.href = "404.html";
    });
}

function showError(message) {
  alert(message);
}

// Call login function when the page loads
window.onload = function () {
  login();
};
