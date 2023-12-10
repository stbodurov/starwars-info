import { Film } from "../types";

const FILM_API_URL = "https://swapi.dev/api/films/";

let filmsCache: Film[] = [];

export default async () => {
  let allFilms: Film[];
  if (!filmsCache.length) {
    allFilms = await fetch(FILM_API_URL).then(async (res) => {
      const obj = await res.json();
      filmsCache = obj.results;
      return obj.results;
    });
  } else {
    allFilms = filmsCache;
  }

  return allFilms;
};
