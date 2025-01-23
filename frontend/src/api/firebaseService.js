import {
  getAuth,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export const firebaseGoogleLogin = async (email) => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: email,
      prompt: "select_account",
    });

    const res = await signInWithPopup(auth, provider);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(err);
  }
};

export const firebaseGuestLogin = async () => {
  try {
    const authentication = getAuth();
    const res = await signInAnonymously(authentication);

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseSignOut = async () => {
  try {
    const authentication = getAuth();
    const res = await signOut(authentication);

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
