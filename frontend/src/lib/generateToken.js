import { getAuth, signInWithCustomToken } from "firebase/auth";

export const generateAuthToken = async (token) => {
  try {
    const auth = getAuth();
    // const authToken = localStorage.getItem("authToken"); // Custom token from localStorage
    if (!token) return;

    // Sign in with the custom token
    const userCredential = await signInWithCustomToken(auth, token);

    // Retrieve the ID token
    const idToken = await userCredential.user.getIdToken();
    return idToken; // Use this ID token for API requests
  } catch (error) {
    console.error("Error generating ID token:", error.message);
    throw error;
  }
};
