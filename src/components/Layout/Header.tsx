import { HStack, IconButton, Text, InputLeftElement, InputGroup, Input } from "@chakra-ui/react";
import { FaShoppingCart, FaSearch } from 'react-icons/fa'

export default function Header() {
  return (
    <HStack left="15rem" shadow="base" h="4rem" w="full" flex="1" py={4} px={10} justifyContent="space-between">
      <HStack alignItems="flex-end" spacing={1}>
        <Text fontWeight="bold" fontSize={25} color="purple.700">LIVEN</Text>
        <Text>Shop</Text>
      </HStack>

      <HStack>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<FaSearch color='gray.300' />}
          />
          <Input type='tel' placeholder='Search' rounded="full" />
        </InputGroup>

        <IconButton icon={<FaShoppingCart />} rounded="full" aria-label="shopping icon" />
      </HStack>
    </HStack>
  )
}