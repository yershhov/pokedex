import axios from "axios";

export async function getPokemons(query: string) {
  const pokemons = await axios.get(query);
  return pokemons.data;
}

export async function getPokemon(query: string) {
  const pokemons = await axios.get(query);
  return pokemons.data;
}

export async function getTypes() {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/type");
  return pokemons.data;
}
export async function getPokemonsForType(query: string) {
  const pokemons = await axios.get(query);
  return pokemons.data;
}
