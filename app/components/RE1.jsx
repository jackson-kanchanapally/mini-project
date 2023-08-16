"use client";
import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  chakra,
  Image,
  HStack,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ResumeCon } from "@/app/context/ResumeContext";
export default function RE1() {
    const Img = chakra(Image, {
        shouldForwardProp: (prop) =>
          ["width", "height", "src", "alt"].includes(prop),
      });
      const { manRes, ManResSet} = ResumeCon();
      console.log(manRes)
  return (
    <Box>
       <Box w="100%" h="91.5vh" pos="absolute">
        {/* <Img src="re1.jpg" w="100" h="91.5vh" opacity="80%" /> */}
        <Text>{manRes.email}</Text>
      </Box>
    </Box>
  )
}
