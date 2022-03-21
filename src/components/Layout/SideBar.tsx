import { Tag, Flex, Text, Wrap, WrapItem, TagLabel, TagCloseButton, TagRightIcon } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlusCircle } from 'react-icons/fa'

interface SideBarProps {
  categories: (String | undefined)[]
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

export default function SideBar({ categories }: SideBarProps) {
  const [selectedFiltered, setSelectedFiltered] = useState<(String | undefined)[]>([]);

  function RemoveItemFromArray(item: String | undefined) {
    var index = selectedFiltered.indexOf(item);
    if (index !== -1) {
      setSelectedFiltered(selectedFiltered.filter(e => e !== item));
    }
  }

  return (
    <Flex p={4} w="20rem" h="100vh" top={0} position="sticky" shadow="base" direction="column">
      <Text fontWeight="bold" fontSize="30" mb={5}>Categories</Text>
      <Wrap alignItems="flex-start">

        {categories.map((item, index) =>
          <WrapItem>
            <Tag
              size="md"
              key={`categories-${index}`}
              variant='solid'
              colorScheme={selectedFiltered.indexOf(item) >= 0 ? 'purple' : 'gray'}>
              <TagLabel onClick={() => {
                setSelectedFiltered([...selectedFiltered, item])
              }}>
                {item}
              </TagLabel>

              <TagCloseButton onClick={() => {
                RemoveItemFromArray(item)
              }} />
            </Tag>
          </WrapItem>
        )}
      </Wrap>

      <Text fontWeight="bold" fontSize="30" my={5}>Filters</Text>

      <Wrap alignItems="flex-start">
        {filters.map((item, index) =>
          <WrapItem>
            <Tag
              size="md"
              key={`filter-${index}`}
              variant='solid'
              colorScheme={selectedFiltered.indexOf(item) >= 0 ? 'pink' : 'gray'}>
              <TagLabel onClick={() => {
                setSelectedFiltered([...selectedFiltered, item])
              }}>
                {item}
              </TagLabel>

              <TagCloseButton onClick={() => {
                RemoveItemFromArray(item)
              }} />
            </Tag>
          </WrapItem>
        )}
      </Wrap>
    </Flex>
  )
}