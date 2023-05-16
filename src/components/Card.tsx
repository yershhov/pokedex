import { Box } from "@chakra-ui/react";
import React from "react";

const Card = (props: { children: React.ReactNode }) => {
  return (
    <Box p={2} border="1px">
      {props.children}
    </Box>
  );
};

export default Card;
