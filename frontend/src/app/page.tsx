import Image from "next/image";

export default function Home() {
  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column"
    }}
    >

        <div>TODO : home page</div>
        <a href={"/list/0"}>open debug list as owner</a>
        <a href={"/list/1"}>open debug list as member</a>

    </div>
  );
}
