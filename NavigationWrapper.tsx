import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EntriesMain from "./entries/EntriesMain";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { SignupScreen } from "./users/SignUpScreen";
import { LoginScreen } from "./users/LoginScreen";
import ProfileScreen from "./users/ProfileScreen";
import { useEffect } from "react";
import { reloadJwtFromStorage } from "./users/userSlice";
import * as SecureStore from "expo-secure-store";

export type RootStackParamList = {
  CategoryList: undefined;
  NewCategory: undefined;
  // CategoryDetails: { id: number }; // Example for a route with parameters
};

export type LoginSignupStackParamList = {
  SignupScreen: undefined; // No parameters
  LoginScreen: undefined; // No parameters for this route
};

const LoginSignupStack = createBottomTabNavigator({
  screens: {
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
  },
});

const CategoryStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    CategoryList: CategoryList,
    CreateNewCategory: NewCategoryScreen,
  },
});

const HomeTabs = createBottomTabNavigator({
  screens: {
    Entries: EntriesMain,
    Categories: CategoryStack,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(HomeTabs);

const LoginSignupScreens = createStaticNavigation(LoginSignupStack);

export default function NavigationWrapper() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getValueFor() {
      const userObj = JSON.parse((await SecureStore.getItemAsync("jwt")) || "");
      console.log("userObj", userObj);
      dispatch(reloadJwtFromStorage(userObj)); // in my code, I have no token
      // Instead, do the login functionality and save the token instead of the user.
    }
    getValueFor();
  }, []);

  return (
    <>
      {token ? (
        <>
          <Navigation />
        </>
      ) : (
        <>
          <LoginSignupScreens />
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
