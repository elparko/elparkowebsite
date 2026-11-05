import "@/styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import TopArrow from "@/components/TopArrow";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <TopArrow />
      <ThemeToggle />
    </>
  );
}
