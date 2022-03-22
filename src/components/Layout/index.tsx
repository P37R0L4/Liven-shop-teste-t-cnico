import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column">
      <Header />

      <HStack direction="column" alignItems="flex-start">
        <Flex>
          {children}
        </Flex>
      </HStack>
    </Flex>
  )
}