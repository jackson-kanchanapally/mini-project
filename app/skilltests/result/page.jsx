"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Flex, Text, Box, Spinner, Button, Divider } from "@chakra-ui/react";
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebaseConfig";
import { ResumeCon } from "@/app/context/ResumeContext";
import Link from "next/link";
export default function ResultPage() {
  const [userData, setUserData] = useState("Frontend Development");
  const { user } = UserAuth();
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);

      getDoc(userDocRef)
        .then((userSnap) => {
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData(data);
            console.log(data);

            const courseName = data.selcourse;

            const courseDocRef = doc(userDocRef, "tests", courseName);

            getDoc(courseDocRef)
              .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                  const resultData = docSnapshot.data();
                  setTestResult(resultData);
                } else {
                  console.log(`No data found for course: ${courseName}`);
                }
              })
              .catch((error) => {
                console.error("Error getting document:", error);
              });
          } else {
            console.log(`No user data found`);
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [user]);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        mt="100px"
        justifyContent="center"
        h="400px"
        w="400px"
        bg="gray.100"
        borderRadius="15px"
      >
      {
        testResult? ( <Flex direction="column" m="auto" mt="70px">
        <Box w="390px">
          <Text align={"center"} as="b" fontSize="3xl" mx="20px">
            {testResult?.course}
          </Text>
        </Box>

        <Box mx="auto" mb='-15px' h="130px" mt="30px">
          <Text align="center">You scored</Text>
          <Text
            align="center"
            as="b"
            color={testResult?.result < 70 ? "red" : "green"}
            fontSize="7xl"
          >
            {testResult?.result}
          </Text>
        </Box>
        {testResult?.result < 70 ? (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text mb='5px' align="center">Your Score is low </Text>
            <Link href='/roadmaps'>
            <Button mt="10px" bg="#FA643F" w="100%"> 
            Start Learning
            </Button>
            </Link>
             
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="center" direction='column'>
             <Text align="center" mb='5px'>Congrats &#127881;&#127881;</Text>
           <Link href='/resume/auto'>
           <Button bg="#FA643F" w="100%">
              Create a Resume
            </Button>
           </Link>
          </Flex>
        )}
      </Flex>):(
        
        <Flex alignItems='center' direction='column' justifyContent='center'>
          <Spinner 
          speed='0.65s'
          size='lg'
          thickness='4px'
          color='#FA643F'
          />
          <Text mt='10px'>Wait a moment</Text>
          </Flex>
      )
      }
      </Flex>
    </Flex>
  );
}
