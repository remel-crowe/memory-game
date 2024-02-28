import { useEffect, useState } from "react";
import { shuffleArray } from "./utilities/utils";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [highScore, setHighscore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [playing, setPlaying] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=130"
        );
        const pokedata = await response.json();
        const shuffledPokemon = shuffleArray(pokedata.results);
        const namesToInclude = [
          "pikachu",
          "charmander",
          "squirtle",
          "bulbasaur",
          "magikarp",
          "ekans",
          "jigglypuff",
          "meowth",
          "grimer",
          "slowpoke",
          "gastly",
          "psyduck",
        ];
        const selectedPokemon = shuffledPokemon.filter((pokemon) =>
          namesToInclude.includes(pokemon.name)
        );
        setPokemon(selectedPokemon);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const restartGame = () => {
    setCount(0);
    setSelected(new Set());
    shuffleArray(pokemon);
  };

  const handleClick = (pokemonName) => {
    if (selected.has(pokemonName)) {
      setCount(0);
      setSelected(new Set());
      if (count > highScore) {
        setHighscore(count);
      }
    } else {
      setSelected(new Set(selected.add(pokemonName)));
      setCount(count + 1);
      shuffleArray(pokemon);
    }
  };

  return (
    <>
      <div className="main_container">
        <h1 className="title">PokéPick</h1>

        <div className="score_container">
          <h2>Score: {count}</h2>
          <h2>High Score: {highScore}</h2>
        </div>

        <div className="card_container">
          {pokemon.map((poke) => {
            return (
              <Card
                key={poke.name}
                pokemon={poke}
                onclick={() => {
                  if (playing) {
                    handleClick(poke.name);
                  }
                }}
              />
            );
          })}
        </div>
        <div className="button_container">
          <button
            onClick={() => {
              setPlaying(false);
              setModal(true);
            }}
          >
            How To Play
          </button>
          <button
            onClick={() => {
              if (playing) {
                restartGame();
              }
            }}
          >
            Reset Game
          </button>
        </div>
        <footer>
          <p>
            By{" "}
            <a href="https:/github.com/remel-crowe" className="link">
              remcrw
            </a>
          </p>
          <p>
            Powered By:
            <a href="https://pokeapi.co/" className="link" target="_blank">
              PokeAPI
            </a>
            +{" "}
            <a href="https://pokemondb.net/" className="link" target="_blank">
              Pokemondb
            </a>
          </p>
        </footer>

        <div className={`modal${!modal ? " hidden" : ""}`}>
          <h1>How to play!</h1>
          <p>
            Click on a pokemon to start the game. The pokemon will then shuffle.
          </p>
          <p>
            The aim of the game is to click every pokemon once without repeating
            any.
          </p>
          <p>Good Luck!</p>
          <button
            onClick={() => {
              setPlaying(true);
              setModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
