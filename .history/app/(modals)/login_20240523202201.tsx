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
import {Link, Stack, router} from "expo-router";
import Button from "@/components/Button";
import {Feather, FontAwesome6} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/config/firebase";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";


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
       
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{height: 224, width: 90}} source={require('@/assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={{height: 160, width: 65}} source={require('@/assets/images/light.png')} />
            </View>

            <View className="h-full w-full justify-around pt-40 pb-10">
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">Login</Animated.Text>
                </View>

                <View className="flex items-center mx-4 space-y-4">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder="Email" placeholderTextColor={'gray'} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder="Password" placeholderTextColor={'gray'} secureTextEntry />
                    </Animated.View >
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                        <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Text>Or Continue With</Text>
                    <View className="w-full flex flex-row items-center gap-2 mr-4">
                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-1/2">
                            <TouchableOpacity className="w-full bg-red-400 p-3 rounded-2xl">
                                <Text className="text-xl font-bold text-white text-center">
                                    <FontAwesome6 name='google' size={24} />
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-1/2">
                            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl">
                                <Text className="text-xl font-bold text-white text-center">
                                <FontAwesome6 name='facebook' size={24} />

                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center">
                        <Text>Don't have an accout? </Text>
                        <Link href={'(modals)/register'} asChild>
                            <TouchableOpacity >
                                <Text className="text-sky-400">Sign Up</Text>
                            </TouchableOpacity>
                        </Link>
                    </Animated.View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
