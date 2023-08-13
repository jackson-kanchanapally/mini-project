"use client";
import React from "react";
import Roadmap from "../components/Roadmap";
import { Button, Flex, Box, Stack } from "@chakra-ui/react";
import SkillPerform from "../components/SkillPerform";
import { CouContext } from "../roadmaps/page";
export default function RoadmapPage() {
  const [course, setCourse] = React.useState();
const val=React.useContext(CouContext)
  return (
    <Flex color="black" alignItems="stretch">
      <Stack h="91vh" bg="white" width="260px" overflowY="auto" flexShrink="0">
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Frontend Development")}
        >
          Frontend Development
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Backend Development")}
        >
          Backend Development
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Full Stack Development")}
        >
          Fullstack Development
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="25px"
          color="gray.700"
          onClick={() => setCourse("Android Development")}
        >
          Android Development
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Blockchain Development")}
        >
          Blockchain Development
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("DevOps")}
        >
          DevOps
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Data Structures")}
        >
          Data Structures
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Artificial Intelligence (AI)")}
        >
          Artificial Intelligence (AI)
        </Box>
        <Box
          _hover={{ color: "#FA643F" }}
          p="20px"
          color="gray.700"
          onClick={() => setCourse("Cloud Computing")}
        >
          Cloud Computing
        </Box>
      </Stack>

      <Flex
        justifyContent="center"
        alignItems="center"
        m="auto"
        flex="1"
        overflowY="auto"
      >
      
          {/* {value=>course && <SkillPerform cou={value} />} */}
          {console.log(val)}
      
      </Flex>
    </Flex>
  );
}
