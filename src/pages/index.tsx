
import { Wrap, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SideBar from '../components/Layout/SideBar'
import { Pagination, slicePagination } from '../components/UI/Pagination'

export default function Home({ products, categories }: any) {
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<(String | undefined)[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Products[]>([]);

  const pageStart = (Number(page) - 1) * Number(10);
  const pageEnd = pageStart + Number(10);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    const selectedProducts = products.filter((item: Products) => selectedFilter.includes(item.category))
    setProductsFiltered(selectedProducts.length > 0 ? selectedProducts : products)
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
    <div>
      <Head>
        <title>Liven Webstore</title>
        <meta name="description" content="Liven Webstore" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SideBar addItemFromArray={addItemFromArray} removeItemFromArray={removeItemFromArray} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} categories={categories} />
        <VStack w="calc(100vw - 20rem)" p={6}>
          <Wrap mb={5}>
            {slicePagination(productsFiltered, pageStart, pageEnd)}
          </Wrap>

          <Pagination
            totalCountOfRegisters={Number(productsFiltered.length)}
            currentPage={page}
            onPageChange={setPage}
          />
        </VStack>
      </Layout>
    </div>
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