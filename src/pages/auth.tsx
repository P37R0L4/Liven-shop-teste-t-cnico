import { Center, FormControl, FormLabel, VStack, Input, Text, Button, HStack, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../contexts/userLoggedContext";
import { login } from "../lib/login";

export default function Auth() {
  const [loginData, setLoginData] = useState({ userLogin: '', userPassword: '' });
  const { setUserLogged, userLogged, loading, setLoading } = useContext(UserContext)
  const { id, username } = userLogged

  const { push } = useRouter();

  useEffect(() => {
    setLoading(false);
    if (username) {
      localStorage.setItem('user_id', id.toString())
      push('/');
    }
  }, [userLogged])

  return (
    <Layout>
      <Center w="full" flex="1" p={10}>
        <VStack w="30rem" h="30rem" bg="white" rounded="md" shadow="base" p={6}>
          <Text fontSize={20} mb={10}>Signin your account</Text>

          <FormControl isRequired colorScheme="purple">
            <FormLabel htmlFor='login'>Login</FormLabel>
            <Input id='login' disabled={loading} onChange={({ target }) => setLoginData({ ...loginData, userLogin: target.value })} placeholder='email' />
          </FormControl>

          <FormControl isRequired colorScheme="purple">
            <FormLabel htmlFor='login'>Password</FormLabel>
            <Input disabled={loading} id='password' type="password" onChange={({ target }) => setLoginData({ ...loginData, userPassword: target.value })} placeholder='password' />
          </FormControl>

          <HStack w="full" justifyContent="flex-end">
            <Button isLoading={loading} onClick={() => login(loginData, setUserLogged, setLoading)}>Signin</Button>
            <Button isLoading={loading}>Create Account</Button>
          </HStack>
        </VStack>
      </Center>
    </Layout>
  )
}