import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from './Search.module.css'

export default function Search(){

 
 
      const [pokemon, setPokemon] = useState();
      const [id, setId] = useState("");
      const navigate = useNavigate()
    
      const handleInput = (event) => {
        setId(event.target.value);
      };
    
      const handleSearch = async () => {
        if (id) {
          try {
            const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
          } catch (error) {
            console.error(error);
              }
        } else {
          setPokemon(); //Esto me vacia el estado  por si acaso el input esta  vacio
        }
      };
    
      const handleClick = () => {
        navigate('/detail');
      }

      return (
        <div>
            <h1>Buscá tu pokemon</h1>
          <p>Ingresa un valor entre 1 y 60</p>
          <input type="search" placeholder="Numero entre 1 y 60" value={id} onChange={handleInput} />
          <button onClick={handleSearch}>Buscar</button>
    
          {pokemon && (
            <div>
              <p onClick={handleClick} className={style.PokeDetail}> {pokemon.name}</p>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Vida: {pokemon.stats[0].base_stat}</p>
              <p>Tipo: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
            </div>
          )}
        </div>
      );
    }
