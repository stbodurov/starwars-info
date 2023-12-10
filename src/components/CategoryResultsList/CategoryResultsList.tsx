import { useEffect, useState } from "react";
import { StarWarsEntity } from "../../types";
import styles from "./CategoryResultsList.module.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import fetchFilms from "../../utils/fetchFilms";

interface CategoryResultsListProps {
  category: string;
  results: StarWarsEntity[];
}

const categoryUppercaseMapper: { [key: string]: string } = {
  people: "People",
  planets: "Planets",
  starships: "Starships",
  vehicles: "Vehicles",
};

const getResultsWithEpisodes = async (
  results: StarWarsEntity[]
): Promise<StarWarsEntity[]> => {
  const allFilms = await fetchFilms();

  return results.map((result) => {
    result.episodeIds = result.films.map((filmUrl) => {
      return allFilms.find((film) => film.url === filmUrl)!.episode_id;
    });

    return result;
  });
};

export default function CategoryResultsList({
  category,
  results,
}: CategoryResultsListProps) {
  const [resultsWithEpisodes, setResultsWithEpisodes] = useState<
    StarWarsEntity[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { query } = useParams();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    if (results.length && results[0].hasOwnProperty("films")) {
      getResultsWithEpisodes(results as StarWarsEntity[]).then(
        (resultsWithEps) => {
          setResultsWithEpisodes(resultsWithEps);
          setIsLoading(false);
        }
      );
    }
  }, [results, query, searchParams]);

  useEffect(() => {
    if (results.length && !results[0].hasOwnProperty("films")) {
      setResultsWithEpisodes(results);
      setIsLoading(false);
    }
  }, [results]);

  return (
    <article className={styles.container}>
      <h2>{categoryUppercaseMapper[category]}</h2>
      {!isLoading ? (
        resultsWithEpisodes.length ? (
          <ul className={styles.list}>
            {resultsWithEpisodes.map(({ name, url, episodeIds }) => (
              <li
                key={name}
                className={styles.listItem}
                onClick={() => navigate(url.match(/\/(\w+)\/\d+\//)![0])}
              >
                {name}{" "}
                {episodeIds?.length ? `(appears in ${episodeIds?.join()})` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.msg}>No results.</p>
        )
      ) : (
        <div className={styles.spinnerContainer}>
          <Spinner />
          <p>Gathering episode appearance data...</p>
        </div>
      )}
    </article>
  );
}
