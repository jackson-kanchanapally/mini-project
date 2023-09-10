"use client";
import { UserAuth } from "@/app/context/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  chakra,
  Image,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";

export default function Homepage() {
  const [loading, setLoading] = React.useState(false);
  const { user } = UserAuth();
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));
  const router = useRouter();
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  if (!user) {
    router.push("/login");
  }
  return (
    <Flex width="100%">
      {loading ? (
        <Flex w="100%" h="90vh" justifyContent="center" alignItems="center">
          <Spinner thickness="4px" speed=".65s" color="#FA643F" size="xl" />
        </Flex>
      ) : (
        <>
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
        </>
      )}
    </Flex>
  );
}
