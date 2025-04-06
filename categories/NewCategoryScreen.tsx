import { useState } from "react";
import { CategoriesAPI } from "./CategoriesAPI";
import { CategoryEntity } from "./CategoryEntity";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const NewCategoryScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const onCreateCategory = async () => {
    const newCategory = new CategoryEntity(title);
    try {
      const createdCategory = await CategoriesAPI.createCategories(newCategory);
      console.log("category created", createdCategory);
    } catch (error) {
      console.error("error creating category", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create a New Category</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter category title"
      />
      <Button
        onPress={onCreateCategory}
        title="Create Category"
        color="#841584"
        accessibilityLabel="Create a new category"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    width: "80%",
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NewCategoryScreen;
