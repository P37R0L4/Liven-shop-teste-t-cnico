import { Avatar, Button, Divider, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast, VStack, Wrap } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaPlus } from 'react-icons/fa'
import { IoMdRemove } from 'react-icons/io'
import { UserContext } from "../contexts/userLoggedContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [showFinishOrder, setShowFinishOrder] = useState(false)
    const { userLogged } = useContext(UserContext)
    const { address } = userLogged
    const toast = useToast()
     const router = useRouter();

    function finishOrder() {
        window.localStorage.setItem('cart', '[]')
        setShowFinishOrder(true);
        setCartItems(
            Object.values(
                JSON.parse(window.localStorage.getItem('cart'))
            )
        )
    }

    function changeOnCart(productId, valueToSome, productName?) {
        const inCart = JSON.parse(window.localStorage.getItem('cart')) ?? []

        if (valueToSome !== -2) {
            const inCartQuantity = inCart.filter(({ id }: Products) => id === productId)

            inCartQuantity[0].quantity = inCartQuantity[0].quantity + valueToSome
            window.localStorage.setItem('cart', JSON.stringify(inCart))
        } else {
            window.localStorage.setItem('cart', JSON.stringify(inCart.filter(({ id }: Products) => id !== productId)))
            toast({
                position: 'bottom-left',
                title: `${productName} removed to yout cart!`,
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }

        setCartItems(
            Object.values(
                JSON.parse(window.localStorage.getItem('cart'))
            )
        )
    }

    useEffect(() => {
        window.localStorage.getItem('cart') && setCartItems(
            Object.values(
                JSON.parse(window.localStorage.getItem('cart'))
            )
        )
    }, [])

    return (
        <Layout>
            <VStack w="full" alignItems="flex-start" p={10}>
                <HStack spacing={4}>
                    <Link href="/">Home</Link>
                    <Divider orientation='vertical' />
                </HStack>

                <Text fontSize={40} mb={10} fontWeight="bold">Your cart</Text>
                <Table variant='simple'>
                    {cartItems.length <= 0 && <TableCaption> Nothing here</TableCaption>}
                    <Thead>
                        <Tr>
                            <Th>Photo</Th>
                            <Th>Item</Th>
                            <Th>price</Th>
                            <Th>quantity</Th>
                            <Th>Remove</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {
                            cartItems.map(({ image, title, price, quantity, id }: Products, index) =>
                                <Tr key={`cart-product-order-${index}`}>
                                    <Td><Avatar src={image} size="md" /></Td>
                                    <Td>{title}</Td>
                                    <Td>${price}</Td>
                                    <Td>
                                        <HStack>
                                            <IconButton
                                                colorScheme="pink"
                                                rounded="full"
                                                icon={<IoMdRemove />}
                                                size="sm"
                                                onClick={() => changeOnCart(id, -1)}
                                                aria-label="Icon less item" />
                                            <Text>{quantity}</Text>
                                            <IconButton
                                                colorScheme="purple"
                                                rounded="full"
                                                size="sm"
                                                onClick={() => changeOnCart(id, 1)}
                                                aria-label="Icon PLus item"
                                                icon={<FaPlus />} />
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Button
                                            colorScheme="pink"
                                            size="sm"
                                            onClick={() => changeOnCart(id, -2, title)}>X</Button>
                                    </Td>
                                </Tr>
                            )
                        }

                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Th>Photo</Th>
                            <Th>Item</Th>
                            <Th>price</Th>
                            <Th>quantity</Th>
                            <Th>Remove</Th>
                        </Tr>
                    </Tfoot>
                </Table>

                <VStack w="full" alignItems="flex-start">
                    <Text fontSize={40} fontStyle="bold">close order</Text>

                    <VStack spacing={2} alignItems="flex-start">
                        <Text color="purple.700" fontSize={20}>delivery address</Text>
                        <Wrap spacing={10} alignItems="flex-start">
                            {
                                address && Object.entries(address).map((item, index) =>
                                    item[0] !== 'geolocation' &&
                                    <VStack spacing={0} alignItems="flex-start" key={`data-user-close-order-locale-${index}`}>
                                        <Text fontWeight="medium" fontSize={20}>{item[0]}</Text>
                                        <Text>{item[1]}</Text>
                                    </VStack>
                                )
                            }
                        </Wrap>

                        <Button
                            disabled={cartItems.length <= 0}
                            onClick={() => finishOrder()}
                            size="lg"
                            colorScheme="purple">
                            Finish
                        </Button>
                    </VStack>
                </VStack>
            </VStack>

            <Modal isOpen={showFinishOrder} onClose={() => { setShowFinishOrder(false); router.push('/') }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>The order has sendded!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Soon you will receive your order!</Text>
                    </ModalBody>

                    <ModalFooter />
                </ModalContent>
            </Modal>
        </Layout>
    )
}