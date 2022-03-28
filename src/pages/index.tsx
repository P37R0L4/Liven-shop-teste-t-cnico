
import { Wrap, VStack, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SideBar from '../components/Layout/SideBar'
import { Pagination, slicePagination } from '../components/UI/Pagination'
import "@chakra-ui/react"

export default function Home({ products, categories }: any) {
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<(String | undefined)[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Products[]>([]);

  const pageStart = (Number(page) - 1) * Number(10);
  const pageEnd = pageStart + Number(10);

  useEffect(() => {
    const selectedProducts = products?.filter((item: Products) => selectedFilter.includes(item.category))
    setProductsFiltered(selectedProducts?.length > 0 ? selectedProducts : products)
  }, [selectedFilter])

  function removeItemFromArray(item: (String | undefined)) {
    var index = selectedFilter.indexOf(item);
    if (index !== -1) {
      setSelectedFilter(selectedFilter.filter(e => e !== item));
    }
  }

  function addItemFromArray(item: string) {
    if (selectedFilter.indexOf(item) === -1) {
      setSelectedFilter([...selectedFilter, item])
    }
  }

  return (
    <Layout>
      <SideBar addItemFromArray={addItemFromArray} removeItemFromArray={removeItemFromArray} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} categories={categories} />
      <VStack alignItems="flex-start" w="full" p={6}>
        <Text fontSize={20}>10 from {products?.length} products found...</Text>
        <Wrap>
          {slicePagination(productsFiltered, pageStart, pageEnd)}
        </Wrap>

        <Pagination
          totalCountOfRegisters={Number(productsFiltered?.length)}
          currentPage={page}
          onPageChange={setPage}
        />
      </VStack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await (await fetch('https://fakestoreapi.com/products')).json()
  const categories = await (await fetch('https://fakestoreapi.com/products/categories')).json()

  return {
    props: {
      products,
      categories
    }
  }
}