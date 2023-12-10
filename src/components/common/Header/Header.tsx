import { Link } from "react-router-dom";
import SearchField from "../../SearchField/SearchField";
import styles from "./Header.module.scss";
import starWarsLogo from "../../../assets/starWarsLogo.png";

export default () => (
  <header className={styles.header}>
    <Link to="/">
      <img
        src={starWarsLogo}
        alt="Star Wars Logo"
        className={styles.starWarsLogo}
      />
    </Link>
    <SearchField />
  </header>
);
