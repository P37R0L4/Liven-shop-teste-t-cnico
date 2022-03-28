import { Divider, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { GetServerSideProps } from "next"
import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout"
import { Pagination, slicePagination } from "../../components/UI/Pagination";

interface SearchProps {
  value: string;
  products: Products[];
}

export default function Search({ value, products }: SearchProps) {
  const [page, setPage] = useState(1);
  const pageStart = (Number(page) - 1) * Number(8);
  const pageEnd = pageStart + Number(8);

  return (
    <Layout>
      <VStack py={8} px={[5, 20]} spacing={8}>
        <HStack w="full" spacing={4}>
          <Link href="/">Home</Link>
          <Divider orientation='vertical' />

          <Link href={`/search/${value}`}>{value}</Link>
          <Divider orientation='vertical' />
        </HStack>

        <VStack alignItems="flex-start" spacing={8}>
          <Text fontSize={30}>All products in "{value}"...</Text>
          <Wrap>
            {products.length > 0 ? slicePagination(products, pageStart, pageEnd) : <Text>No items found...</Text>}
          </Wrap>

          <Pagination
            totalCountOfRegisters={Number(products.length)}
            currentPage={page}
            onPageChange={setPage}
          />
        </VStack>
      </VStack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { value } = context.query

  const productsByCategory = await (await fetch(`https://fakestoreapi.com/products/category/${value}`)).json()
  let products = productsByCategory

  if (productsByCategory.length <= 0) {
    const productsByName = await (await fetch(`https://fakestoreapi.com/products`))
      .json()

    products = productsByName.filter(({ title }: Products) => title.toLowerCase().indexOf((value as string).toLowerCase()) !== -1)
  }

  return {
    props: {
      value,
      products
    }
  }
}