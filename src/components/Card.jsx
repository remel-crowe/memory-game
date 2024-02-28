import "./Card.css";

function Card({ pokemon, onclick }) {
  return (
    <div className="pokeCard" onClick={onclick}>
      <div className="card_info">
        <img
          src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon.name}.png`}
          className="pokeImg"
        />
        <p>{pokemon.name}</p>
      </div>
    </div>
  );
}

export default Card;
