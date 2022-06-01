import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../service/api'
import { toast } from 'react-toastify'
import './filme.css';

function Filme(){

    const{ id } = useParams();
    const navigate = useNavigate();
    const[filme, setFilme] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilme();

    }, [navigate, id])

    function salvaFilme(){
        const minhaLista = localStorage.getItem("@cineAgora");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("FILME JÁ ESTÁ NA SUA LISTA");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@cineAgora", JSON.stringify(filmesSalvos));
        toast.success("FILME SALVO COM SUCESSO");
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
            
    }

    if(loading){
        return(
          <div className="filme-info">
            <h1>Carregando detalhes...</h1>
          </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h2>Sinopse</h2>
            <span>{filme.overview}</span>
            <h3>Avaliação: {filme.vote_average}/10</h3>

            <div className="area-botao">
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target="blank" rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    );
}

export default Filme;