import { Center, FormControl, FormLabel, VStack, Input, Text, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../components/Layout";

export default function Auth() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  async function login() {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(await response.json())
  }

  return (
    <Layout>
      <Center w="full" flex="1" p={10}>
        <VStack w="30rem" h="30rem" bg="white" rounded="md" shadow="base" p={6}>
          <Text fontSize={20} mb={10}>Signin your account</Text>

          <FormControl isRequired>
            <FormLabel htmlFor='login'>Login</FormLabel>
            <Input id='login' onChange={({ target }) => setLoginData({ ...loginData, username: target.value })} placeholder='login' />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor='login'>Password</FormLabel>
            <Input id='password' onChange={({ target }) => setLoginData({ ...loginData, password: target.value })} placeholder='password' />
          </FormControl>

          <HStack w="full" justifyContent="flex-end">
            <Button onClick={() => login()}>Signin</Button>
            <Button>Create Account</Button>
          </HStack>
        </VStack>
      </Center>
    </Layout>
  )
}