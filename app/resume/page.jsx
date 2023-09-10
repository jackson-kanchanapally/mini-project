"use client";
import React from "react";

import {
  Flex,
  Card,
  Stack,
  Text,
  Heading,
  Spinner,
  Image,
  CardBody,
  chakra,
  Box,
  Button,
} from "@chakra-ui/react";
import Router from "next/router";
import { useRouter } from "next/navigation";
export default function Rpage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading2, setIsLoading2] = React.useState(false);
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });

  return (
    <Flex justifyContent="center" mt="2%">
      {loading ? (
        <Flex w="100%" h="90vh" justifyContent="center" alignItems="center">
          <Spinner thickness="4px" speed=".65s" color="#FA643F" size="xl" />
        </Flex>
      ) : (
        <>
          <Box>
            <Card maxW="sm" borderRaduis="15px" bg="gray.100">
              <CardBody>
                <Img
                  src={"man.png"}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  width="full"
                  height="full"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Manual Resume</Heading>
                  <Text>
                    The choice is user&apos;s to create the resume. User should
                    enter the required information to create the resume.
                  </Text>

                  <Button
                    bg="#FA643F"
                    w="full"
                    onClick={() => {
                      setIsLoading(!isLoading);
                      router.push("/resume/manual");
                    }}
                    isLoading={isLoading}
                  >
                    Manual
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Box>
            <Card maxW="sm" ml="30px" bg="gray.100">
              <CardBody>
                <Img
                  src="auto.png"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  width="full"
                  height="full"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Automatic Resume</Heading>
                  <Text>
                    The user must take a test and maintain above 70% in that
                    test to generate a resume automatically.
                  </Text>

                  <Button
                    bg="#FA643F"
                    w="full"
                    onClick={() => {
                      setIsLoading2(true);
                      router.push("/resume/auto");
                    }}
                    isLoading={isLoading2}
                  >
                    Automatic
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </>
      )}
    </Flex>
  );
}
