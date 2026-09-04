import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing Screens
import SplashScreen from "../SplashScreen/SplashScreen";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import SignupScreen from "../Auth/Signup/SignupScreen";
import LoginScreen from "../Auth/Login/LoginScreen";
import DashboardScreen from "../Dashboard/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function BeforeLogin() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_left",
          animationDuration: 500,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
