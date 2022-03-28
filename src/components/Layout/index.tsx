import { Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <HStack pt="4rem" direction="column" alignItems="flex-start">
        {children}
      </HStack>
    </>
  )
}