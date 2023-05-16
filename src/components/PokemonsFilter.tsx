import { Input, Button, HStack, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getPokemonsForType, getTypes } from "../api/service";
import {
  fetchPokemons,
  pokemonsFilterByNames,
  pokemonsSetPreviewingPokemon,
} from "../redux/pokemons.slice";

export const PokemonsFilter = () => {
  const dispatch = useAppDispatch();
  const lastFetchQuery = useAppSelector(
    (state) => state.pokemons.lastFetchQuery
  );

  const [types, setTypes] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function submit() {
    const value = inputValue.toLowerCase().trim();
    if (inputValue && inputValue.length > 0) {
      types.forEach(async (item) => {
        if (item.name.includes(value)) {
          const res = await getPokemonsForType(item.url);
          const namesToCheck = res.pokemon.map(
            (pokemon: any) => pokemon.pokemon.name
          );
          dispatch(pokemonsFilterByNames(namesToCheck));
        }
      });
    }
  }

  useEffect(() => {
    async function fetchTypes() {
      const types = await getTypes();
      setTypes(types.results);
    }
    fetchTypes();
  }, []);

  return (
    <Flex
      gap={2}
      flexDirection={{ base: "column", sm: "row" }}
      alignItems={"end"}
    >
      <Input
        pr="4.5rem"
        placeholder="Filter by type..."
        value={inputValue}
        onChange={handleChange}
      />
      <HStack w="100%">
        <Button
          w="100%"
          isDisabled={inputValue.length === 0}
          onClick={() => {
            submit();
            setIsFiltered(true);
            dispatch(pokemonsSetPreviewingPokemon(null));
          }}
          colorScheme="blue"
        >
          Filter
        </Button>
        <Button
          w="100%"
          isDisabled={!isFiltered}
          onClick={() => {
            setInputValue("");
            setIsFiltered(false);
            if (lastFetchQuery) dispatch(fetchPokemons(lastFetchQuery));
            dispatch(pokemonsSetPreviewingPokemon(null));
          }}
        >
          Reset
        </Button>
      </HStack>
    </Flex>
  );
};
