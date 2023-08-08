"use client";
import React from "react";
import NextLink from "next/link";
import { Box, Spinner, Flex, Heading, Link } from "@chakra-ui/react";
import axios from "axios";
const CodingContest = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://kontests.net/api/v1/all");
        setData(res.data);
        setLoading(false);
      } catch (e) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Flex justify="center">
      {loading && (
        <Spinner thickness="4px" speed=".65s" color="#FA643F" size="xl" mt='300px'/>
      )}
      <Box>
        {data.map((contest) => (
          <Flex
            key={contest?.url}
            bg="gray.100"
            mt="12px"
            h="230px"
            mx="10px"
            borderRadius="10px"
          >
            <Link
              as={NextLink}
              href={contest?.url}
              style={{ textDecoration: "none" }}
              isExternal
            >
              <Box p="20px">
                <Heading>{contest?.name}</Heading>
              </Box>

              <Box>{contest?.url}</Box>
            </Link>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};
export default CodingContest;
