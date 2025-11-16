
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column"
    }}
    >

        <div>TODO : home page</div>
        <Link href={"/listOverview"}>Open list overview</Link>
    </div>
  );
}
