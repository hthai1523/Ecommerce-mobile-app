import { FIREBASE_AUTH } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = FIREBASE_AUTH;

export const doCreateUserWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return  await createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // result.user
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return auth.sendPasswordResetEmail(email)
// }

// export const doPasswordChange = (password) => {
//     return auth.currentUser.updatePassword(password)
// }

// export const doSendEmailVerification = () => {
//     return auth.currentUser.sendEmailVerification({
//         url: `${window.location.origin}/home`
//     })
// }
