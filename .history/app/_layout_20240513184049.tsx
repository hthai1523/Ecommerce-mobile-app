import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthProvider } from "@/contexts/authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    inter: require("../assets/fonts/Inter-Regular.ttf"),
    "inter-sb": require("../assets/fonts/Inter-SemiBold.ttf"),
    "inter-b": require("../assets/fonts/Inter-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
   <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)/login"
              options={{
                presentation: "modal",
                headerTitleStyle: {
                  fontFamily: "inter-sb",
                },
                title: "Log in or sign up",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="x" size={24} color="black" />
                  </TouchableOpacity>
                ),
              }}
            />
  
            <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
            <Stack.Screen
              name="(modals)/checkout"
              options={{
                presentation: "card",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="chevron-left" size={24} color={Colors.primary.icon}/>
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text className="text-base font-semibold">Checkout</Text>
                ),
              }}
            />
            <Stack.Screen
              name="(modals)/location-search"
              options={{
                presentation: "fullScreenModal",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="chevron-left" size={24} color={Colors.primary.icon}/>
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text className="text-base font-semibold">Search Location</Text>
                ),
              }}
            />
            <Stack.Screen name="(modals)/search" />
            <Stack.Screen
              name="(modals)/Cart"
              options={{
                headerTitle: "Shopping Cart",
                headerLeft: () => (
                  <TouchableOpacity className="p-2" onPress={() => router.back()}>
                    <Feather
                      name="chevron-left"
                      size={20}
                      color={Colors.primary.icon}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack>
        </AuthProvider>
      </BottomSheetModalProvider>
   </GestureHandlerRootView>
  );
}
