import {Link} from 'react-router-dom';
import './erro.css';

function Erro(){
    return(
        <div className='not-found'>
            <h1 className='codigo'>404</h1>
            <h2 className='mensagem'>Ops! Página não encontrada</h2>
            <Link to={"/"} className="link">Veja a lista de filmes</Link>
        </div>
    );
}

export default Erro;