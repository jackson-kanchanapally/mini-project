"use client";

import { Box, Button, Flex, chakra, Image, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Homepage() {
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <Flex width="100%">
      <Box w="100%" h="91.5vh" pos="absolute">
        <Img src="bghome.avif" w="100%" h="91.5vh" opacity="80%" />
      </Box>
      <Box pos="relative" w="100%">
        <Flex justifyContent="center" alignContent="center">
          <Stack mt="15%">
            <Box>
              <Img src="qq.png" w="700px" />
            </Box>
            <Box ml="38px">
              <Link href="/roadmaps">
                <Button bg="#FA643F">Start Learning</Button>
              </Link>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
}
