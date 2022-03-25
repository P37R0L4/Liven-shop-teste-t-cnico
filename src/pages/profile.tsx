import { Button, FormControl, FormLabel, HStack, Input, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { profileForm } from "../components/forms/profileForm";
import Layout from "../components/Layout";
import { UserContext } from "../contexts/userLoggedContext";

export default function Profile() {
  const [enableToEdit, setEnableToEdit] = useState(true)
  const { userLogged } = useContext(UserContext)
  const { name } = userLogged
  const { push } = useRouter()

  useEffect(() => {
    if (!name) {
      push("/auth")
    }
  }, [name])

  return (
    <Layout>
      <VStack alignItems="flex-start" p={8} w="full" flex="1" spacing={10}>
        <Text fontSize={40} fontWeight="bold">Welcome {name && name.firstname}!</Text>

        <VStack alignItems="flex-start" w="full">
          <Text fontWeight="medium">Your personal data</Text>
          <Wrap alignItems="flex-start" w="full" flex="1" p={6}>
            {profileForm(userLogged, enableToEdit)}
          </Wrap>
        </VStack>

        <HStack>
          <Button
            onClick={() => setEnableToEdit(!enableToEdit)}
            colorScheme="purple"
            size="lg">
            {enableToEdit ? 'Edit' : 'Block edit'}
          </Button>

          <Button colorScheme="pink" size="lg">Save</Button>
        </HStack>
      </VStack>
    </Layout>
  )
}