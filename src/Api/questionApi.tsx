// api.ts
import axios from "axios";

export const startApi = async (amount: number, level: string) => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?", {
      params: {
        amount: amount,
        difficulty: level,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
