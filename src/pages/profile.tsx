import { Divider, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { profileData } from "../components/UI/profileData";
import Layout from "../components/Layout";
import { UserContext } from "../contexts/userLoggedContext";
import Link from "next/link";

export default function Profile() {
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
        <HStack w="full" spacing={4}>
          <Link href="/">Home</Link>
          <Divider orientation='vertical' />
        </HStack>

        <Text fontSize={40} fontWeight="bold">Welcome {name && name.firstname}!</Text>

        <VStack alignItems="flex-start" w="full">
          <Text fontWeight="medium">Your personal data</Text>
          <Wrap alignItems="flex-start" w="full" flex="1" p={6}>
            {profileData(userLogged)}
          </Wrap>
        </VStack>
      </VStack>
    </Layout>
  )
}