import { Flex, Text, VStack, HStack, Image } from "@chakra-ui/react";

export default function ProductCard({ image, title, price, category, id = 0, rating }: Products) {
  return (
    <Flex alignItems="flex-start" minH="25rem" w={id <= 2 ? "30.2rem" : "20rem"} direction="column">
      <HStack w="full" spacing={5}>
        <Image objectFit="cover" bgPosition="top" src={image} w="full" h="10rem" />
      </HStack>

      <VStack alignItems="flex-start" p={4} spacing={0}>
        <HStack mb={2}>
          <HStack alignItems="flex-start" spacing={2}>
            <Text fontSize={15} fontWeight="bold" color="red.700">Rate</Text>
            <Text>{rating?.rate}</Text>
          </HStack>

          <HStack alignItems="flex-start" spacing={2}>
            <Text fontSize={15} fontWeight="bold" color="red.700">Count</Text>
            <Text>{rating?.count}</Text>
          </HStack>
        </HStack>

        <Text w="20rem" isTruncated noOfLines={2} whiteSpace="break-spaces">{title}</Text>
        <Text opacity={0.5}>{category}</Text>

        <HStack w="full" spacing={5} alignItems="flex-start">
          <VStack spacing={0} alignItems="flex-start">
            <Text fontSize={30} fontWeight="bold" color="purple.700">PRICE</Text>
            <Text>${price}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  )
}