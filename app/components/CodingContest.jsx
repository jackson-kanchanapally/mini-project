"use client";
import React from "react";
import NextLink from "next/link";
import {
  Box,
  Spinner,
  Flex,
  Link,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import axios from "axios";
const d=[
  {
    "url": "https://www.codechef.com/START114",
    "name": "START114",
    "site": "code chef",
    "start_time": "Dec 27 2023, 06:40 pm",
    "duration": "2 hrs"
  },
  {
    "url": "https://www.codechef.com/START113",
    "name": "START113",
    "site": "code chef",
    "start_time": "Dec 23 2023, 07:00 am",
    "duration": "2 hrs 30 min"
  },
  {
    "url": "https://www.hackerearth.com/challenges/new/competitive/december-circuits-23/",
    "name": "December Circuits '23",
    "site": "hacker earth",
    "start_time": "Dec 15 2023, 09:30 pm",
    "duration": "7 days"
  },
  {
    "url": "https://leetcode.com/contest/biweekly-contest-120/",
    "name": "Biweekly Contest 120",
    "site": "Leet Code",
    "start_time": "Dec 23 2023, 08:00 pm",
    "duration": "2 days"
  },
  {
    "url": "https://leetcode.com/contest/biweekly-contest-377/",
    "name": "Biweekly Contest 377",
    "site": "Leet Code",
    "start_time": "Dec 23 2023, 08:00 pm",
    "duration": "2 days"
  }
]

const CodingContest = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://kontests.net/api/v1/all");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setData(d);
        setLoading(false);
      }
    };
    fetchData();
  }, [data]);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const indianOptions = { ...options, timeZone: "Asia/Kolkata" };
  const convertDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hours ${minutes} minutes`;
  };
  return (
    <Flex justify="center" >
      {loading ? (
        <Spinner
          thickness="4px"
          speed=".65s"
          color="#FA643F"
          size="xl"
          mt="300px"
        />
      ):
      <Box w="85vw" mb='60px'>
        {data.map((contest) => (
          <Flex
            key={contest?.url}
            bg="gray.100"
            mt="12px"
            h="250px"
            mx="10px"
            borderRadius="10px"
          >
            <Box w="100%">
              <Box p="20px" pl="40px">
                <Text fontSize="28px" fontWeight="extrabold">
                  {contest?.name.slice(0,73)}
                </Text>
              </Box>

              <Box pl="100px">
                <Link as={NextLink} href={contest?.url} isExternal fontWeight='bold'>
                  {contest?.site} <ExternalLinkIcon mx="2px" />
                </Link>
                <HStack fontWeight="medium">
                  {" "}
                  <Text fontWeight='bold'>Starts On :{" "}</Text>
                  <Text>
                  {new Date(contest?.start_time).toLocaleString(
                    "en-IN",
                    indianOptions
                  )}
                  </Text>
                </HStack>
                {/* <HStack fontWeight="medium">
                  {" "}
                 <Text fontWeight='bold'> Ends On :{" "}</Text>
                 <Text> {new Date(contest?.end_time).toLocaleString(
                    "en-IN",
                    indianOptions)}</Text>
                  
                </HStack> */}
                <HStack>
                  <Text fontWeight='bold'>
                  Duration : 
                  </Text>
                  <Text>
                   {/* {convertDuration(parseFloat(contest.duration))} */}
                   {contest.duration}
                  </Text>
                </HStack>
              </Box>
              <Flex pl="100px" py="10px" width='15%'>
                <Link
                  as={NextLink}
                  href={contest?.url}
                  style={{ textDecoration: "none" }}
                  isExternal
                >
                  <Button bg="#FA643F" _hover={{ bg: "#FF5757" }} w="100%">
                    {contest?.site}
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Box>}
    </Flex>
  );
};
export default CodingContest;
