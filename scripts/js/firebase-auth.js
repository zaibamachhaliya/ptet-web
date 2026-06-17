import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPasCzGfOA9pLMovpLxnQuqtfuVhXPti8",
  authDomain: "pte-hub-e94df.firebaseapp.com",
  projectId: "pte-hub-e94df",
  storageBucket: "pte-hub-e94df.appspot.com",
  messagingSenderId: "555571204435",
  appId: "1:555571204435:web:d9b972c2cdc3caf25f91a6",
  measurementId: "G-HX2PK85GGT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* -----------------------------
   DETECT LOGIN STATE
----------------------------- */

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("User logged in:", user.email);

        localStorage.setItem("pte_user_logged_in", "true");
        localStorage.setItem("pte_user_name", user.displayName || "User");
        localStorage.setItem("pte_user_email", user.email || "");
        localStorage.setItem("pte_user_photo", user.photoURL || "");

        /* update navbar immediately if it exists */

        const authButtons = document.getElementById("auth-buttons");
        const userProfile = document.getElementById("user-profile");

        if (authButtons && userProfile) {

            authButtons.style.display = "none";
            userProfile.style.display = "flex";

            const name = document.getElementById("user-name");
            const photo = document.getElementById("user-photo");

            if (name) name.textContent = user.displayName || "User";
            if (photo) photo.src = user.photoURL || "";

        }

    } else {

        console.log("User logged out");

        localStorage.removeItem("pte_user_logged_in");
        localStorage.removeItem("pte_user_name");
        localStorage.removeItem("pte_user_email");
        localStorage.removeItem("pte_user_photo");

    }

});


/* -----------------------------
   LOGIN PROVIDERS
----------------------------- */

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


/* GOOGLE LOGIN */

const googleBtn = document.querySelector(".google-login");

if (googleBtn) {

    googleBtn.addEventListener("click", () => {

        signInWithPopup(auth, googleProvider)
            .then(() => {

                window.location.href = "/index.html";

            })
            .catch((error) => {
                console.error("Google login error:", error);
            });

    });

}


/* GITHUB LOGIN */

const githubBtn = document.querySelector(".github-login");

if (githubBtn) {

    githubBtn.addEventListener("click", () => {

        signInWithPopup(auth, githubProvider)
            .then(() => {

                window.location.href = "/index.html";

            })
            .catch((error) => {
                console.error("GitHub login error:", error);
            });

    });

}


/* EMAIL LOGIN */

const emailLoginForm = document.getElementById("email-login-form");

if (emailLoginForm) {
    emailLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "/index.html";
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("Login failed: " + error.message);
            });
    });
}

/* EMAIL REGISTER */

const emailRegisterForm = document.getElementById("email-register-form");

if (emailRegisterForm) {
    emailRegisterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirm = document.getElementById("register-confirm").value;

        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return updateProfile(userCredential.user, {
                    displayName: name
                });
            })
            .then(() => {
                window.location.href = "/index.html";
            })
            .catch((error) => {
                console.error("Register error:", error);
                alert("Registration failed: " + error.message);
            });
    });
}


/* -----------------------------
   FIREBASE LOGOUT
----------------------------- */

window.firebaseLogout = function () {

    signOut(auth)
        .then(() => {

            console.log("User signed out");

            localStorage.removeItem("pte_user_logged_in");
            localStorage.removeItem("pte_user_name");
            localStorage.removeItem("pte_user_email");
            localStorage.removeItem("pte_user_photo");

            window.location.href = "/index.html";

        })
        .catch((error) => {
            console.error("Logout error:", error);
        });

};