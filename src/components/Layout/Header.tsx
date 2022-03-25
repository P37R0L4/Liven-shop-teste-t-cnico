import { HStack, IconButton, Text, InputGroup, Input, InputRightElement, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa'
import { UserContext } from "../../contexts/userLoggedContext";

export default function Header() {
  const [searchTxt, setSearchTxt] = useState('');
  const { userLogged } = useContext(UserContext);
  const { name } = userLogged
  const { push } = useRouter();

  function pushToRoute(event) {
    if (event === 'Enter' || event == 'click') {
      push(`/search/${searchTxt}`)
      return
    }
  }

  return (
    <HStack bg="purple.700" color="white" left="15rem" shadow="base" h="4rem" w="full" flex="1" py={4} px={10} justifyContent="space-between">
      <Link href="/">
        <HStack alignItems="flex-end" spacing={1}>
          <Text fontWeight="bold" fontSize={25} color="white">LIVEN</Text>
          <Text>WebStore</Text>
        </HStack>
      </Link>

      <HStack>
        <InputGroup colorScheme="purple">
          <InputRightElement
            onClick={() => pushToRoute('click')}
            children={<FaSearch />}
          />

          <Input
            onKeyDown={(event) => pushToRoute(event.key)}
            onChange={(event) => setSearchTxt(event.target.value)}
            type='text'
            placeholder='Search'
            rounded="full" />
        </InputGroup>

        <IconButton icon={<FaShoppingCart />} colorScheme="pink" rounded="full" aria-label="shopping icon" />
        <Tooltip
          hasArrow
          placement="bottom-start"
          bg="pink.600"
          color="white"
          rounded="md"
          shouldWrapChildren
          label={name ? `Welcome ${name.firstname}!` : 'Signin'}>
          <Link href={name ? "/profile" : "/auth"}>
            <IconButton icon={<FaUser />} colorScheme="purple" rounded="full" aria-label="user icon" />
          </Link>
        </Tooltip>
      </HStack>
    </HStack>
  )
}