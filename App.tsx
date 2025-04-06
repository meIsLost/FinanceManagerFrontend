import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EntriesMain from "./entries/EntriesMain";

export type RootStackParamList = {
  CategoryList: undefined;
  NewCategory: undefined;
};

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
  },
});

const Navigation = createStaticNavigation(HomeTabs);

export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
