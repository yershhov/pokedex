import { SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../store";
import { capitalize } from "../utils/utils";
import { StatsRow } from "./StatsRow";
import { v4 as uuid } from "uuid";

export const PokemonStats = () => {
  const previewingPokemonDetails = useAppSelector(
    (state) => state.pokemons.previewingPokemonDetails
  );
  return (
    <SimpleGrid columns={6} pb={2} w="100%">
      <StatsRow
        statName="Type"
        values={previewingPokemonDetails.types.map(
          (item: any) => item.type.name
        )}
        isFirst
      />

      {[...previewingPokemonDetails.stats]
        .sort((a, b) => a.stat.name.localeCompare(b.stat.name))
        .map((stat) => {
          let statName = stat.stat.name as string;
          if (statName.includes("special")) {
            statName = "SP " + capitalize(statName.split("-")[1]);
          } else if (statName === "hp") {
            statName = statName.toUpperCase();
          } else {
            statName = capitalize(statName);
          }
          return (
            <StatsRow
              key={uuid()}
              statName={statName}
              values={[stat.base_stat.toString()]}
            />
          );
        })}

      <StatsRow
        statName={"Weight"}
        values={[previewingPokemonDetails.weight.toString()]}
      />
      <StatsRow
        statName={"Total moves"}
        values={[previewingPokemonDetails.moves.length.toString()]}
      />
    </SimpleGrid>
  );
};
