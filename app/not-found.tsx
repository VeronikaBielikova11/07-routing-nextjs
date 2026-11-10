import type { Metadata } from "next";
import css from "./NotFound.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
