import { Tag, Flex, Text, Wrap, VStack, WrapItem, HStack, IconButton, TagLabel, TagCloseButton, Divider } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface SideBarProps {
  categories: (String | undefined)[]
  setSelectedFilter: Dispatch<SetStateAction<(String | undefined)[]>>;
  selectedFilter: (String | undefined)[];
  removeItemFromArray: (item: String | undefined) => void;
  addItemFromArray: (item: String | undefined) => void;
}

const filters = [
  'rate 0 - 1',
  'rate 2 - 3',
  'rate 4 - 5',
  'Lass than $100',
  '$100 - $300',
  '$301 - $500',
  'more than $501'
]

export default function SideBar({ categories, addItemFromArray, setSelectedFilter, selectedFilter, removeItemFromArray }: SideBarProps) {
  return (
    <Flex bg="white" p={4} w="20rem" h="full" top={0} position="sticky" shadow="base" direction="column">
      <Text fontWeight="bold" fontSize="30" mb={5}>Categories</Text>
      <VStack alignItems="flex-start">

        {categories.map((item, index) =>
          <>
            <HStack w="full" justifyContent="space-between" p={1}>
              <Text
                size="md"
                key={`categories-${index}`}
                variant='solid'>
                {item}
              </Text>

              <IconButton
                rounded="full"
                size="sm"
                colorScheme={selectedFilter.indexOf(item) >= 0 ? 'purple' : 'gray'}
                aria-label={`${item}-filter-button`}
                icon={selectedFilter.indexOf(item) >= 0 ? <FaTrash /> : <FaPlus />}
                onClick={
                  () => {
                    selectedFilter.indexOf(item) >= 0
                      ? removeItemFromArray(item)
                      : addItemFromArray(item)
                  }} />
            </HStack>
            <Divider />
          </>
        )}
      </VStack>

      <Text fontWeight="bold" fontSize="30" my={5}>Filters</Text>

      <Wrap alignItems="flex-start">
        {filters.map((item, index) =>
          <>
            <HStack w="full" justifyContent="space-between" p={1}>
              <Text
                size="md"
                key={`categories-${index}`}
                variant='solid'>
                {item}
              </Text>

              <IconButton
                rounded="full"
                size="sm"
                aria-label={`${item}-filter-button`}
                icon={selectedFilter.indexOf(item) >= 0 ? <FaTrash /> : <FaPlus />}
                colorScheme={selectedFilter.indexOf(item) >= 0 ? 'pink' : 'gray'}
                onClick={
                  () => {
                    selectedFilter.indexOf(item) >= 0
                      ? removeItemFromArray(item)
                      : addItemFromArray(item)
                  }} />
            </HStack>
            <Divider />
          </>
        )}
      </Wrap>
    </Flex>
  )
}