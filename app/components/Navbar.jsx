import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  chakra,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <Flex w="100vw" h="10%" bg="gray.100" alignItems="center" p="8px" pl="20px">
      <Box pl='30px'>
        <Img src="logo.png" width="130px" />
      </Box>
      <Spacer />
      <HStack spacing="30px" pr="60px" fontSize="14px">
        <Link href="#">
          <Text color="#FA643F" fontWeight="bold">
            Resume Builder
          </Text>
        </Link>
        <Link href="#">
          <Text fontWeight="bold">Take Test</Text>
        </Link>
        <Link href="/contest">
          <Text fontWeight="bold">Coding Contests</Text>
        </Link>
        <Link href="#">
          <Text fontWeight="bold">College Finder</Text>
        </Link>
        <Link href="#">
          <Text fontWeight="bold">Road Maps</Text>
        </Link>
      </HStack>
    </Flex>
  );
}
