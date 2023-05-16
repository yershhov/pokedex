import { Image } from "@chakra-ui/react";

export const PokemonImage = (props: { imageUrl: string }) => {
  return (
    <Image src={props.imageUrl} maxW="100%" maxH="100%" objectFit={"fill"} />
  );
};
