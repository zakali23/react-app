import Header from '../components/header/HeaderPages';

export default function Panier (history) {

    return(
        <div>
            <Header {...history}/>
            <h1>Mon Panier</h1>
        </div>
    )
}