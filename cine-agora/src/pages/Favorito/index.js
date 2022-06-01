import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import './favorito.css';

function Favoritos(){

    const[filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@cineAgora");

        setFilmes(JSON.parse(minhaLista) || [])

    } , [])

function excluiFilme(id){

    let filtraFilmes = filmes.filter((item) => {
        return(item.id !== id )
    })

    setFilmes(filtraFilmes);
    localStorage.setItem("@cineAgora", JSON.stringify(filtraFilmes));
    toast.success("FILME REMOVIDO COM SUCESSO");
}

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui filmes salvos :(</span>}
            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluiFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;