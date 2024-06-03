import {
    View,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Image,
} from "react-native";
import React, {useState} from "react";
import {Stack, router} from "expo-router";
import Button from "@/components/Button";
import {Feather} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/config/firebase";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
            try {
                setErrorMessage('')
                setIsSigningIn(true)
                await signInWithEmailAndPassword(auth, email, password)
                router.navigate('(tabs)/profile')
            } catch (e) {
                console.log(e)
                setIsSigningIn(false)
                setErrorMessage('Email or password is incorrect')
            }

    };

    const handleGoogleSignIn = async (e: any) => {
        e.preventDefault();
        if (!isSigningIn) {

        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff', height: '100%', width: '100%'}}>
           <Image source={require('@/assets/images/background.png')} />
        </SafeAreaView>
    );
};

export default Login;
