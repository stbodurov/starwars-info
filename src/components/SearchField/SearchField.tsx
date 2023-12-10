import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./SearchField.module.scss";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchField() {
  let { query: initialQuery } = useParams();
  const [query, setQuery] = useState(initialQuery ?? "");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query === "") return;

    navigate(`/search/${query}?category=${selectedCategory}`);
  };

  const onCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <search>
      <form onSubmit={handleSearch} className={styles.formContainer}>
        <div className={styles.searchFieldContainer}>
          <input
            className={styles.searchField}
            placeholder="Search..."
            type="search"
            autoComplete="off"
            value={query}
            name="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>
            <div className={styles.searchIcon}>&#9906;</div>
          </button>
        </div>

        <div className={styles.categorySelectors}>
          {["all", "people", "planets", "starships", "vehicles"].map(
            (category) => (
              <div className={styles.radioContainer} key={category}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="category"
                  id={category}
                  value={category}
                  checked={selectedCategory === category}
                  onChange={onCategoryChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            )
          )}
        </div>
      </form>
    </search>
  );
}
