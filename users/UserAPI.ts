import { UserDto } from "./UserDto";

export class UserAPI {
  static baseUrl = "http://192.168.1.44:3000/auth/";

  static async login(userDto: UserDto) {
    const response = await fetch(this.baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDto),
    });
    const data = await response.json();
    return data;
  }

  static async signup(userDto: UserDto) {
    const response = await fetch(this.baseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDto),
    });
    const data = await response.json();
    return data;
  }
}
