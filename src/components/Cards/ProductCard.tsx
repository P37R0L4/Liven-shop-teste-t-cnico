import { Flex, Text, VStack, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function ProductCard({ image, title, price, category, id = 0, rating }: Products) {
  return (
    <Link href={`/product/${id}`}>
      <Flex
        rounded="md"
        bg="white"
        alignItems="center"
        w={["26rem", "27rem"]}
        h="12rem"
        direction="row"
        shadow="base"
        p={4}>
        <Image objectFit="contain" src={image} w={["5rem", "10rem"]} h="10rem" />

        <HStack w="full" p={10} ml={2}>
          <VStack alignItems="flex-start">
            <HStack spacing={4}>
              <VStack alignItems="flex-start" spacing={-2}>
                <Text fontSize={20} fontWeight="bold" color="red.700">Price</Text>
                <Text>${price}</Text>
              </VStack>

              <VStack alignItems="flex-start" spacing={-2}>
                <Text fontSize={20} fontWeight="bold" color="red.700">Rate</Text>
                <Text>{rating?.rate}</Text>
              </VStack>

              <VStack alignItems="flex-start" spacing={-2}>
                <Text fontSize={20} fontWeight="bold" color="red.700">Count</Text>
                <Text>{rating?.count}</Text>
              </VStack>
            </HStack>

            <Text w="15rem" isTruncated noOfLines={2} whiteSpace="break-spaces">{title}</Text>
            <Text opacity={0.5}>{category}</Text>
          </VStack>
        </HStack>
      </Flex>
    </Link>
  )
}