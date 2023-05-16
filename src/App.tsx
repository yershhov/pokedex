import { Center, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { PokemonsList } from "./components/PokemonsList";
import { PokemonDetails } from "./components/PokemonDetails";

function App() {
  return (
    <Flex
      flexDirection={"column"}
      w="100%"
      px={{ base: 10, sm: 4, md: 20 }}
      py={10}
      gap={4}
    >
      <Center>
        <Center border="1px" w={"25rem"}>
          <Heading fontWeight={500} fontSize={36}>
            Pokedex
          </Heading>
        </Center>
      </Center>
      <SimpleGrid
        w="100%"
        columns={{ base: 1, lg: 2 }}
        gap={{ base: 4, lg: 10 }}
      >
        <PokemonsList />
        <PokemonDetails />
      </SimpleGrid>
    </Flex>
  );
}

export default App;
