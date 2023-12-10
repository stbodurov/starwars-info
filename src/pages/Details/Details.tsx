import styles from "./Details.module.scss";
import Header from "../../components/common/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/fetchCategoryResults";
import { Film, StarWarsEntity } from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import fetchFilms from "../../utils/fetchFilms";

const categoryToEntityMapper: { [key: string]: string } = {
  people: "Person",
  planets: "Planet",
  starships: "Starship",
  vehicles: "Vehicle",
};

function Details() {
  const { category, id } = useParams();

  const [entity, setEntity] = useState<StarWarsEntity | undefined>(undefined);
  const [films, setFilms] = useState<Film[] | undefined>(undefined);

  useEffect(() => {
    fetch(`${API_URL}/${category}/${id}`)
      .then((res) => res.json())
      .then((data) => setEntity(data));

    fetchFilms().then((fetchedFilms) => setFilms(fetchedFilms));
  }, []);

  return (
    <>
      <Header />
      {entity && films ? (
        <main className={styles.main}>
          <h1>
            {entity.name} (#{id})
          </h1>
          <h2>{categoryToEntityMapper[category!]}</h2>
          <table>
            <thead>
              <tr>
                <th>attribute</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(entity).flatMap(([key, value]) => {
                if (key === "films") {
                  value = value
                    .map((filmUrl: string) => {
                      return films.find((film) => film.url === filmUrl)!.title;
                    })
                    .join(", ");
                }

                if (key === "created" || key === "edited") {
                  value = new Date(value).toUTCString();
                }

                if (
                  (key !== "films" && Array.isArray(value)) ||
                  value.includes("http")
                ) {
                  return [];
                }

                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      ) : (
        <div className={styles.spinnerContainer}>
          <Spinner />
          <p>Fetching entity data...</p>
        </div>
      )}
    </>
  );
}

export default Details;
