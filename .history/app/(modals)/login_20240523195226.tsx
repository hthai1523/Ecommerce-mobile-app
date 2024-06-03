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
import { StatusBar } from "expo-status-bar";


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
           <StatusBar style="light" />
           <Image className="h-full w-full absolute" source={require('@/assets/images/background.png')} />
       
            <View className="flex-row justify-around w-full absolute top-[-40]">
                <Image style={{height: 224, width: 90}} source={require('@/assets/images/light.png')} />
                <Image style={{height: 160, width: 65}} source={require('@/assets/images/light.png')} />
            </View>

            <View className="h-full w-full justify-around pt-20 pb-10">
                <View className="flex items-center">
                    <Text className="text-white font-bold tracking-wider text-5xl">Login</Text>
                </View>

                <View className="flex items-center mx-4 space-y-4">
                    <View className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder="Email" placeholderTextColor={'gray'} />
                    </View>
                    <View className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder="Password" placeholderTextColor={'gray'} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
