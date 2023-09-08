import "./CardPokemon.css";
export const CardPokemon = ({ id, url, name }) => {
  // const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return (
    <article key={id}>
      <header>
        <img src={url} alt={`Imagen del pokemon ${name}`} />
      </header>
      <section>
        <div>
          <p>{name}</p>
        </div>
      </section>
    </article>
  );
};
