import {useState, useEffect} from 'react';
import api from '../../service/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home(){

    const[filmes, setFilmes] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "26304889f3fbb9bc33224a0ac4a9abf3",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmes(response.data.results);
            setLoading(false)
        }

        loadFilmes();

    } , [])

    if(loading){
        return(
            <div className='loading'>
                <h1>Carregando as imagens...</h1>
            </div>
        );
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}

            </div>
        </div>
    );
}

export default Home;