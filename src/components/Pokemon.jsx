import { useState } from "react";
import { useEffect } from "react";
import { PokemonCards } from "./PokemonCard";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";
  const APIM = "https://pokeapi.co/api/v2/pokemon?limit=500";
  const APIF = "https://pokeapi.co/api/v2/pokemon?limit=1302";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokeminData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();

        return data;
      });

      const detailedResponses = await Promise.all(detailedPokeminData);

      // console.log(detailedResponses);

      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const fetchPokemons = async () => {
    try {
      const res = await fetch(APIM);
      const data = await res.json();

      const detailedPokeminData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();

        return data;
      });

      const detailedResponses = await Promise.all(detailedPokeminData);

      // console.log(detailedResponses);

      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const fetchAllPokemons = async () => {
    try {
      const res = await fetch(APIF);
      const data = await res.json();

      const detailedPokeminData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();

        return data;
      });

      const detailedResponses = await Promise.all(detailedPokeminData);

      // console.log(detailedResponses);

      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
    fetchPokemons();
    fetchAllPokemons();
  }, []);

  // search functionality

  const searchData = pokemon.filter((Pokemon) =>
    Pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <span className="loader"></span>
      // <div>
      //   <h1>Loading....</h1>
      // </div>
    );
  }

  if (error) {
    <div>
      <h1>{error.message}</h1>
    </div>;
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
