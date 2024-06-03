import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential
} from "firebase/auth";


interface AuthCredentials {
  email: string;
  password: string;
}

export const doCreateUserWithEmailAndPassword = async ({ email, password }: AuthCredentials): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const doSignInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error:any) {
    throw new Error(`Failed to sign in: ${error.message}`);
  }
};

export const doSignInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error:any) {
    throw new Error(`Failed to sign in with Google: ${error.message}`);
  }
};

export const doSignOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error:any) {
    throw new Error(`Failed to sign out: ${error.message}`);
  }
};

export const doPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error:any) {
    throw new Error(`Failed to reset password: ${error.message}`);
  }
};

export const doPasswordChange = async (password: string): Promise<void> => {
  if (auth.currentUser) {
    try {
      await updatePassword(auth.currentUser, password);
    } catch (error:any) {
      throw new Error(`Failed to change password: ${error.message}`);
    }
  } else {
    throw new Error("No current user");
  }
};

export const doSendEmailVerification = async (): Promise<void> => {
  if (auth.currentUser) {
    try {
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
      });
    } catch (error:any) {
      throw new Error(`Failed to send email verification: ${error.message}`);
    }
  } else {
    throw new Error("No current user");
  }
};
