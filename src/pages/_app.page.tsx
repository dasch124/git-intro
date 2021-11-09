import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/index.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <main className="page-layout prose max-w-none">
      <article>
        <Component {...pageProps} />
      </article>
    </main>
  );
}
