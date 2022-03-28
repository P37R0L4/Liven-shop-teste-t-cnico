import { Text, Flex, HStack, VStack, Image, Divider, Wrap, WrapItem, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import ProductCard from "../../components/Cards/ProductCard";
import Layout from "../../components/Layout"
import { useState } from "react";
import { useRouter } from "next/router";

interface ProductProps {
  productData: Products;
  productsByCategory: Products[];
}

export default function Product({ productData, productsByCategory }: ProductProps) {
  const { image, title, category, price, description, rating } = productData
  const [quantity, setQuantity] = useState(1);
  const { push } = useRouter()
  const toast = useToast()

  function addOnCart() {
    const inCart = JSON.parse(window.localStorage.getItem('cart')) ?? []
    const inCartQuantity = inCart.filter(({ id }: Products) => id === productData.id)

    if (inCartQuantity.length <= 0) {
      inCart.push({ ...productData, quantity: inCartQuantity.length + quantity })
    } else {
      inCartQuantity[0].quantity = inCartQuantity[0].quantity + quantity
    }

    window.localStorage.setItem('cart', JSON.stringify(inCart))
    toast({
      position: 'bottom-left',
      title: `${productData.title} add to yout cart!`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Layout>
      <VStack flex="1" py={8} px={20} spacing={8}>
        <HStack w="full" spacing={4}>
          <Link href="/">Home</Link>
          <Divider orientation='vertical' />

          <Link href={`/search/${category}`}>{category}</Link>
          <Divider orientation='vertical' />
        </HStack>

        <HStack
          bg="white"
          shadow="base"
          rounded="md"
          py={6}
          px={10}
          alignItems="flex-start">
          <Image src={image} w="30rem" h="30rem" />

          <VStack w="full" alignItems="flex-start" p="10">
            <VStack>
              <HStack alignItems="flex-start" w="full">
                <VStack alignItems="flex-start" spacing={-2}>
                  <Text fontSize={20} fontWeight="bold" color="red.700">Rate</Text>
                  <Text>{rating?.rate}</Text>
                </VStack>
              </HStack>

              <Text fontWeight="bold" fontSize={30}>{title}</Text>
            </VStack>

            <Text fontSize={20}>{category}</Text>
            <Text fontSize={30}>${price}</Text>

            <VStack alignItems="flex-start">
              <Divider />
              <Text fontSize={20}>{description}</Text>
            </VStack>

            <VStack alignItems="flex-start" py={10}>
              <HStack>
                <Button onClick={() => { addOnCart(), push('/cart') }} leftIcon={<CgShoppingBag />} size="lg" colorScheme="purple">Buy</Button>
                <Button onClick={() => addOnCart()} leftIcon={<FaPlus />} size="lg" colorScheme="pink">Add to cart</Button>
              </HStack>

              <Text>Quantity ({rating?.count} in stock)</Text>
              <NumberInput
                w="full"
                onChange={(valueString) => setQuantity(Number(valueString))}
                defaultValue={quantity}
                min={1}
                max={rating?.count}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </VStack>
        </HStack>

        <Divider />
        <VStack w="full" alignItems="flex-start" spacing={4}>
          <Text fontSize={20}>Another Products from this category</Text>

          <Wrap mb={5}>
            {productsByCategory.map((item: Products, index: number) => (
              <WrapItem key={`item-product-card${index}`}>
                <ProductCard {...item} />
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </VStack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { idProduct } = context.query
  const productData = await (await fetch(`https://fakestoreapi.com/products/${idProduct}`)).json()
  const productsByCategory = await (await fetch(`https://fakestoreapi.com/products/category/${productData.category}`)).json()

  return {
    props: {
      productData,
      productsByCategory
    }
  }
}