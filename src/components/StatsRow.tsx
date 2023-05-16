import { GridItem, Center, Grid, Text } from "@chakra-ui/react";
import { capitalize } from "../utils/utils";
import { v4 as uuid } from "uuid";

type StatsRowProps = {
  statName: string;
  values: string[];
  isFirst?: boolean;
};

export const StatsRow = (props: StatsRowProps) => {
  return (
    <>
      <GridItem colSpan={4}>
        <Center
          py={1.5}
          border={"1px"}
          borderTop={!props.isFirst ? "none" : "1px"}
          h={"100%"}
        >
          {props.statName}
        </Center>
      </GridItem>
      <GridItem colSpan={2} h="100%">
        <Grid
          py={1.5}
          placeItems={"center"}
          border={"1px"}
          borderTop={!props.isFirst ? "none" : "1px"}
          borderLeft={"none"}
        >
          {props.values.map((item: any) => (
            <Text
              key={uuid()}
              lineHeight={props.values.length === 1 ? "" : "1.2"}
            >
              {capitalize(item)}
            </Text>
          ))}
        </Grid>
      </GridItem>
    </>
  );
};
