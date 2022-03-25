import { Text, Flex, HStack, VStack, Image, Divider, Wrap, WrapItem, Button } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import ProductCard from "../../components/Cards/ProductCard";
import Layout from "../../components/Layout"

interface ProductProps {
  productData: Products;
  productsByCategory: Products[];
}

export default function Product({ productData, productsByCategory }: ProductProps) {
  const { image, title, category, price, description, rating } = productData
  return (
    <Layout>
      <VStack py={8} px={20} spacing={8}>
        <HStack w="full" spacing={4}>
          <Link href="/">Home</Link>
          <Divider orientation='vertical' />

          <Link href={`/search/${category}`}>{category}</Link>
          <Divider orientation='vertical' />
        </HStack>

        <Flex bg="white" shadow="base" rounded="md" w="full" flex="1" py={6} px={10}>
          <HStack w="full" h="full" alignItems="flex-start">
            <Image src={image} w="30rem" h="30rem" />

            <VStack w="full" alignItems="flex-start" p="10">
              <VStack>
                <HStack alignItems="flex-start" w="full">
                  <VStack alignItems="flex-start" spacing={-2}>
                    <Text fontSize={20} fontWeight="bold" color="red.700">Rate</Text>
                    <Text>{rating?.rate}</Text>
                  </VStack>

                  <VStack alignItems="flex-start" spacing={-2}>
                    <Text fontSize={20} fontWeight="bold" color="red.700">Count</Text>
                    <Text>{rating?.count}</Text>
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

              <HStack py={10}>
                <Button leftIcon={<CgShoppingBag />} size="lg" colorScheme="purple">Buy</Button>
                <Button leftIcon={<FaPlus />} size="lg" colorScheme="pink">Add to cart</Button>
              </HStack>
            </VStack>
          </HStack>
        </Flex>

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