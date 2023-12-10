import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import fetchCategoryResults from "../../utils/fetchCategoryResults";
import CategoryResultsList from "../../components/CategoryResultsList/CategoryResultsList";
import styles from "./Results.module.scss";
import { Person, Planet, Starship, Vehicle } from "../../types";
import Header from "../../components/common/Header/Header";

function Results() {
  const [people, setPeople] = useState<Person[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const { query } = useParams();
  let [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchAllResults = async (searchValue: string) => {
      if (category === "all") {
        const fetchedPeople = await fetchCategoryResults("people", searchValue);
        setPeople(fetchedPeople as Person[]);

        const fetchedPlanets = await fetchCategoryResults(
          "planets",
          searchValue
        );
        setPlanets(fetchedPlanets as Planet[]);

        const fetchedStarships = await fetchCategoryResults(
          "starships",
          searchValue
        );
        setStarships(fetchedStarships as Starship[]);

        const fetchedVehicles = await fetchCategoryResults(
          "vehicles",
          searchValue
        );
        setVehicles(fetchedVehicles as Vehicle[]);
      } else {
        const fetchedResults = await fetchCategoryResults(
          category!,
          searchValue
        );

        switch (category) {
          case "people":
            setPeople(fetchedResults as Person[]);
            break;
          case "planets":
            setPlanets(fetchedResults as Planet[]);
            break;
          case "starships":
            setStarships(fetchedResults as Starship[]);
            break;
          case "vehicles":
            setVehicles(fetchedResults as Vehicle[]);
            break;
          default:
            throw new Error("No such search category.");
        }
      }
    };

    fetchAllResults(query!).catch(console.error);
  }, [query, category]);

  const getCategoryResults = () => {
    switch (category) {
      case "people":
        return people;
      case "planets":
        return planets;
      case "starships":
        return starships;
      case "vehicles":
        return vehicles;
      default:
        throw new Error("No such search category.");
    }
  };

  return (
    <>
      <Header/>
      <div className={styles.main}>
        {category === "all" ? (
          <>
            <CategoryResultsList category="people" results={people} />
            <CategoryResultsList category="planets" results={planets} />
            <CategoryResultsList category="starships" results={starships} />
            <CategoryResultsList category="vehicles" results={vehicles} />
          </>
        ) : (
          <CategoryResultsList
            category={category!}
            results={getCategoryResults()}
          />
        )}
      </div>
    </>
  );
}

export default Results;
