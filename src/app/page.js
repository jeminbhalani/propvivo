"use server";
import Budget from "./components/Budget";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Budget />
    </main>
  );
}
