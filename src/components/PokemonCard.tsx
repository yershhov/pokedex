import {
  Center,
  SimpleGrid,
  Box,
  Text,
  Skeleton,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, RefObject } from "react";
import { getPokemon } from "../api/service";
import { pokemonsSetPreviewingPokemon } from "../redux/pokemons.slice";
import { store } from "../store";
import { capitalize } from "../utils/utils";
import { PokemonImage } from "./PokemonImage";
import { typeColors } from "../utils/typeColors";
import Card from "./Card";
import { v4 as uuid } from "uuid";

type PokemonCardProps = {
  pokemon: any;
  loadButtonRef: RefObject<HTMLDivElement>;
};

export const PokemonCard = (props: PokemonCardProps) => {
  const [pokemonDetails, setPokemonDetils] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonDetails() {
      const details = await getPokemon(props.pokemon.url);
      setPokemonDetils(details);
    }
    fetchPokemonDetails().finally(() => setLoading(false));
  }, []);

  return (
    <Box
      cursor="pointer"
      onClick={() => {
        store.dispatch(pokemonsSetPreviewingPokemon(pokemonDetails));
        props.loadButtonRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      <Card>
        <Flex flexDirection={"column"}>
          <Center border={"1px"} w="100%" h="6.1rem">
            {loading && <Spinner />}
            {!loading && (
              <PokemonImage imageUrl={pokemonDetails.sprites.front_default} />
            )}
          </Center>

          <Center pt={2} fontSize={14} fontWeight="700">
            {props.pokemon.name.charAt(0).toUpperCase() +
              props.pokemon.name.slice(1)}
          </Center>

          {loading && <Skeleton h="1.58rem" />}
          {!loading && (
            <SimpleGrid columns={2} w="100%" gap={1} pb={4}>
              {pokemonDetails.types.map((item: any) => {
                const type = item.type.name;
                return (
                  <Center
                    // @ts-ignore
                    bg={typeColors[type]}
                    bgGradient={`linear-gradient(gray.200, ${
                      // @ts-ignore
                      typeColors[type]
                    })`}
                    borderRadius="4px"
                    border="2px"
                    // @ts-ignore
                    borderColor={typeColors[type]}
                    fontWeight="700"
                    py={0.5}
                    key={uuid()}
                  >
                    <Text display={"inline"} fontSize={11}>
                      {capitalize(type) + " "}
                    </Text>
                  </Center>
                );
              })}
            </SimpleGrid>
          )}
        </Flex>
      </Card>
    </Box>
  );
};
