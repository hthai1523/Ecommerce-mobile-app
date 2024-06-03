import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {auth} from '@/config/firebase'
import {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doSignOut,
    doPasswordReset,
    doPasswordChange,
    doSendEmailVerification
} from '@/config/auth';

interface AuthContextProps {
    currentUser: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changePassword: (password: string) => Promise<void>;
    sendEmailVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signUp = async (email: string, password: string) => {
        await doCreateUserWithEmailAndPassword({ email, password });
    };

    const signIn = async (email: string, password: string) => {
        await doSignInWithEmailAndPassword(email, password);
    };

    const signInWithGoogle = async () => {
        await doSignInWithGoogle();
    };

    const signOut = async () => {
        await doSignOut();
    };

    const resetPassword = async (email: string) => {
        await doPasswordReset(email);
    };

    const changePassword = async (password: string) => {
        await doPasswordChange(password);
    };

    const sendEmailVerification = async () => {
        await doSendEmailVerification();
    };

    const value = {
        currentUser,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        changePassword,
        sendEmailVerification,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
    </AuthContext.Provider>
);
};
