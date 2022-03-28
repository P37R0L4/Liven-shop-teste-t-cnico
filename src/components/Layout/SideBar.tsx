import { Flex, Text, VStack, HStack, IconButton, Divider } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface SideBarProps {
  categories: (String | undefined)[]
  setSelectedFilter: Dispatch<SetStateAction<(String | undefined)[]>>;
  selectedFilter: (String | undefined)[];
  removeItemFromArray: (item: String | undefined) => void;
  addItemFromArray: (item: String | undefined) => void;
}

export default function SideBar({ categories, addItemFromArray, setSelectedFilter, selectedFilter, removeItemFromArray }: SideBarProps) {
  return (
    <Flex bg="white" p={6} m={3} w="30rem" h="full" top={20} position="sticky" shadow="base" direction="column">
      <Text fontWeight="bold" fontSize="30" mb={5}>Categories</Text>

      <VStack alignItems="flex-start">
        {categories?.map((item, index) =>
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
    </Flex>
  )
}