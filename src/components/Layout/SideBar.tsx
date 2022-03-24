import { Tag, Flex, Text, Wrap, WrapItem, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

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
    <Flex bg="white" p={4} w="20rem" h="100vh" top={0} position="sticky" shadow="base" direction="column">
      <Text fontWeight="bold" fontSize="30" mb={5}>Categories</Text>
      <Wrap alignItems="flex-start">

        {categories.map((item, index) =>
          <WrapItem key={`category-list-${index}`}>
            <Tag
              size="md"
              key={`categories-${index}`}
              variant='solid'
              colorScheme={selectedFilter.indexOf(item) >= 0 ? 'purple' : 'gray'}>
              <TagLabel onClick={() => addItemFromArray(item)}>
                {item}
              </TagLabel>

              <TagCloseButton onClick={() => {
                removeItemFromArray(item)
              }} />
            </Tag>
          </WrapItem>
        )}
      </Wrap>

      <Text fontWeight="bold" fontSize="30" my={5}>Filters</Text>

      <Wrap alignItems="flex-start">
        {filters.map((item, index) =>
          <WrapItem key={`category-list-${index}`}>
            <Tag
              size="md"
              key={`filter-${index}`}
              variant='solid'
              colorScheme={selectedFilter.indexOf(item) >= 0 ? 'pink' : 'gray'}>
              <TagLabel onClick={() => {
                setSelectedFilter([...selectedFilter, item])
              }}>
                {item}
              </TagLabel>

              <TagCloseButton onClick={() => {
                removeItemFromArray(item)
              }} />
            </Tag>
          </WrapItem>
        )}
      </Wrap>
    </Flex>
  )
}