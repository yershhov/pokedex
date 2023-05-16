import { Center, Text, Grid, GridItem, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../store";
import { capitalize, addZerosAtTheBeginning } from "../utils/utils";
import { PokemonImage } from "./PokemonImage";
import Card from "./Card";
import { PokemonStats } from "./PokemonStats";

export const PokemonDetails = () => {
  const [previewingPokemonDetails, previewingPokemonIndex] = [
    useAppSelector((state) => state.pokemons.previewingPokemonDetails),
    useAppSelector((state) => state.pokemons.previewingPokemonIndex),
  ];

  return (
    <>
      {previewingPokemonDetails && (
        <Grid placeItems={{ base: "center", lg: "start" }}>
          <Grid
            placeItems={{ base: "center", md: "start" }}
            templateRows={{ base: "", lg: "15.8rem" }}
            w="100%"
            maxW="25rem"
          >
            <GridItem rowStart={2} w={{ base: "100%", lg: "16rem" }}>
              <Card>
                <VStack w={"100%"}>
                  <Center border={"1px"} h="10rem" w="100%">
                    <PokemonImage
                      imageUrl={previewingPokemonDetails.sprites.front_default}
                    />
                  </Center>
                  <Center pt={2}>
                    <Text fontWeight={"bold"} fontSize={20}>
                      {capitalize(previewingPokemonDetails.forms[0].name) +
                        " #" +
                        addZerosAtTheBeginning(`${previewingPokemonIndex}`)}
                    </Text>
                  </Center>
                  <PokemonStats />
                </VStack>
              </Card>
            </GridItem>
          </Grid>
        </Grid>
      )}
    </>
  );
};
