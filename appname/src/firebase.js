import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7up677ZI2u3z7qVwaI4bfHg86qIEmnTg",
  authDomain: "tutorial6-9e3d1.firebaseapp.com",
  projectId: "tutorial6-9e3d1",
  storageBucket: "tutorial6-9e3d1.firebasestorage.app",
  messagingSenderId: "748340777225",
  appId: "1:748340777225:web:27be53c0a85efa9b5003d8",
  measurementId: "G-5LN1E7S55L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return { success: true };
  } catch (err) {
    console.error(err);
    let errorMessage = "An error occurred during sign in.";
    if (err.code === "auth/popup-closed-by-user") {
      errorMessage = "Sign in was cancelled.";
    } else if (err.code === "auth/popup-blocked") {
      errorMessage = "Pop-up was blocked. Please allow pop-ups for this site.";
    } else if (err.code === "auth/network-request-failed") {
      errorMessage = "Network error. Please check your connection.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    return { success: false, error: errorMessage };
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (err) {
    console.error(err);
    let errorMessage = "An error occurred during login.";
    if (err.code === "auth/user-not-found") {
      errorMessage = "No account found with this email address.";
    } else if (err.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again.";
    } else if (err.code === "auth/invalid-email") {
      errorMessage = "Invalid email address.";
    } else if (err.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled.";
    } else if (err.code === "auth/too-many-requests") {
      errorMessage = "Too many failed attempts. Please try again later.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    return { success: false, error: errorMessage };
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    let errorMessage = "An error occurred during registration.";
    if (err.code === "auth/email-already-in-use") {
      errorMessage = "This email is already registered.";
    } else if (err.code === "auth/invalid-email") {
      errorMessage = "Invalid email address.";
    } else if (err.code === "auth/weak-password") {
      errorMessage = "Password is too weak. Please use a stronger password.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    return { success: false, error: errorMessage };
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset link sent!" };
  } catch (err) {
    console.error(err);
    let errorMessage = "An error occurred while sending reset email.";
    if (err.code === "auth/user-not-found") {
      errorMessage = "No account found with this email address.";
    } else if (err.code === "auth/invalid-email") {
      errorMessage = "Invalid email address.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    return { success: false, error: errorMessage };
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
