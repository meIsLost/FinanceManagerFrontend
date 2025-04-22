import React, { useEffect, useState } from "react";
import { CategoryEntity } from "./CategoryEntity";
import { CategoriesAPI } from "./CategoriesAPI";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../NavigationWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCategories } from "./categorySlice";

const API_URL = "http://localhost:3000/categories";
const CategoryList: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "CategoryList"
  >;
  const navigation = useNavigation<NavigationProp>();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  console.log(categories);

  // const [categories, setCategories] = useState<CategoryEntity[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // const fetchCategories = async () => {
  //   try {
  //     const respone = await CategoriesAPI.getCategories();
  //     setCategories(respone);
  //   } catch (error) {
  //     console.error("Oops could not fetch error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const renderItem = ({ item }: { item: CategoryEntity }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#000[0ff" />
      ) : categories.length > 0 ? ( */}
      <View>
        <Button
          onPress={() => navigation.navigate("CreateNewCategory")}
          title="Create new Category"
          color="#841584"
        />
        {categories && categories.length > 0 && (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id?.toString() ?? ""}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
      {/* ) : (
        <Text style={styles.emptyMessage}>No categories found</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});

export default CategoryList;
