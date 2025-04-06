import axios from "axios";
import { CategoryEntity } from "./CategoryEntity";

export class CategoriesAPI {
  static baseUrl = "http://192.168.0.106:3000/categories";

  static async getCategories() {
    return (await axios.get<CategoryEntity[]>(this.baseUrl)).data; // det er Typescript generics

    //eller du kan ogsa write den:
    //const response = await axios.get(this.baseUrl);
    //const categories: CategoryEntity[] = response.data;
  }

  static async createCategories(category: CategoryEntity) {
    const response = await fetch(CategoriesAPI.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();
    return data;
  }
}
