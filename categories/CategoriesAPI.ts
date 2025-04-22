import axios from "axios";
import { CategoryEntity } from "./CategoryEntity";
import { useSelector } from "react-redux";

export class CategoriesAPI {
  static baseUrl = "http://192.168.1.44:3000/categories";

  static async getCategories() {
    return (await axios.get<CategoryEntity[]>(this.baseUrl)).data; // det er Typescript generics

    //eller du kan ogsa write den:
    //const response = await axios.get(this.baseUrl);
    //const categories: CategoryEntity[] = response.data;
  }
  static async createCategories(category: CategoryEntity, token: string) {
    console.log("tik tik ", token);
    const response = await fetch(CategoriesAPI.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    const data = await response.json();
    return data;
  }
}
