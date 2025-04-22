import { Provider } from "react-redux";
import NavigationWrapper from "./NavigationWrapper";
import { store } from "./store/store";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
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
