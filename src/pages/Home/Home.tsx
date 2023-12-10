import styles from "./Home.module.scss";
import starWarsLogo from "../../assets/starWarsLogo.png";
import SearchField from "../../components/SearchField/SearchField";

function Home() {
  return (
    <>
      <header className={styles.header}>
        <img
          src={starWarsLogo}
          alt="Star Wars Logo"
          className={styles.starWarsLogo}
        />
      </header>
      <main className={styles.main}>
        <SearchField />
      </main>
    </>
  );
}

export default Home;
