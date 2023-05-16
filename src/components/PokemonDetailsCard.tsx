import Card from "./Card";
import { PokemonImage } from "./PokemonImage";
import { useAppSelector } from "../store";
import { Center, Box, Text } from "@chakra-ui/react";
import { capitalize, addZerosAtTheBeginning } from "../utils/utils";

export const PokemonDetailsCard = () => {
  const previewingPokemonDetails = useAppSelector(
    (state) => state.pokemons.previewingPokemonDetails
  );
  return (
    <Card>
      <Box>
        <PokemonImage
          imageUrl={previewingPokemonDetails.sprites.front_default}
        />
        <Center>
          <Text fontWeight={"bold"} fontSize={20}>
            {capitalize(previewingPokemonDetails.forms[0].name) +
              " #" +
              addZerosAtTheBeginning(`${previewingPokemonDetails.id}`)}
          </Text>
        </Center>
      </Box>
    </Card>
  );
};
