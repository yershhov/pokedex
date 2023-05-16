import { Button, Grid, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  fetchPokemons,
  pokemonsSetLastPerformedQuery,
  pokemonsSetPreviewingPokemon,
} from "../redux/pokemons.slice";
import { useAppSelector, useAppDispatch } from "../store";
import { PokemonCard } from "./PokemonCard";
import { v4 as uuid } from "uuid";
import { PokemonsFilter } from "./PokemonsFilter";

export const PokemonsList = () => {
  const dispatch = useAppDispatch();
  const [pokemons, pokemonsState] = [
    useAppSelector((state) => state.pokemons.pokemons),
    useAppSelector((state) => state.pokemons.pokemonsState),
  ];

  useEffect(() => {
    const query = `https://pokeapi.co/api/v2/pokemon/?limit=12`;
    dispatch(fetchPokemons(query));
    dispatch(pokemonsSetLastPerformedQuery(query));
  }, []);

  return (
    <GridItem>
      <Grid placeItems={{ base: "center", lg: "end" }}>
        <SimpleGrid
          columns={{ base: 1, sm: 3 }}
          gap={4}
          maxW={"25rem"}
          w="100%"
        >
          <GridItem colSpan={{ base: 1, sm: 3 }}>
            <PokemonsFilter />
          </GridItem>
          {pokemonsState === "pending" &&
            [...Array(12)].map(() => (
              <Skeleton key={uuid()} height={"11rem"} />
            ))}
          {pokemonsState === "fulfilled" &&
            (pokemons?.results as any[]).map((pokemon, index) => (
              <PokemonCard
                key={uuid()}
                pokemon={pokemon}
                pokemonIndex={index + 1}
              />
            ))}

          <GridItem colSpan={{ base: 1, sm: 3 }}>
            <Button
              w="100%"
              colorScheme="blue"
              onClick={() => {
                const query = pokemons.next!;
                dispatch(fetchPokemons(query));
                dispatch(pokemonsSetLastPerformedQuery(query));
                dispatch(pokemonsSetPreviewingPokemon(null));
              }}
            >
              Load More
            </Button>
          </GridItem>
        </SimpleGrid>
      </Grid>
    </GridItem>
  );
};
