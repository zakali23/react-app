import HeaderDesign from "../components/header/HeaderDesign";

export default function Favorites (history) {

    return(
        <div>
          <HeaderDesign {...history} />
            <h1>Mes favories</h1>
        </div>
    )
}