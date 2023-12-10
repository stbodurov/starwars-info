import { StarWarsEntity } from "../types";

export const API_URL = "https://swapi.dev/api";

const fetchCategoryResults = async (
  category: string,
  searchValue: string
): Promise<StarWarsEntity[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        `${API_URL}/${category}?search=${searchValue}`
      );
      let data = await response.json();

      resolve(data.results);
    } catch (err) {
      reject(err);
    }
  });
};

export default fetchCategoryResults;
