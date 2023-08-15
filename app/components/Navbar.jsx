'use client'
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
import { UserAuth } from "../context/AuthContext";
import {useRouter} from 'next/navigation'

export default function Navbar() {
  const router=useRouter()
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const {user,logOut,googleSignIn}=UserAuth()
  const handleSignOut=async()=>{
    try{
      await logOut()
      router.push('/login')
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <Flex w="100%" h="10%" bg="gray.100" alignItems="center" p="8px" pl="20px">
      <Box pl='30px'>
        <Img src="/logo.png" width="130px" alt='CareerUp'/>
      </Box>
      <Spacer />
     {user?( <HStack spacing="30px" pr="60px" fontSize="15px">
        <Link href="#">
          <Text _hover={{color:'#FA643F'}}>
            Resume Builder
          </Text>
        </Link>
        <Link href="/skilltests">
          <Text fontWeight="medium" _hover={{color:'#FA643F'}}>Take Test</Text>
        </Link>
        <Link href="/contest">
          <Text fontWeight="medium" _hover={{color:'#FA643F'}}>Coding Contests</Text>
        </Link>
        <Link href="/college">
          <Text fontWeight="medium" _hover={{color:'#FA643F'}}>College Finder</Text>
        </Link>
        <Link href="/roadmaps">
          <Text fontWeight="medium" _hover={{color:'#FA643F'}}>Road Maps</Text>
        </Link>
        <Link href="#">
          <Text fontWeight="medium" _hover={{color:'#FA643F'}} onClick={handleSignOut}>Log Out </Text>
        </Link>
      </HStack>):
      <HStack spacing="30px" pr="60px" fontSize="15px">
      <Link href="/login">
        <Text _hover={{color:'#FA643F'}}>
          Login
        </Text>
      </Link>
      <Link href="/register">
        <Text fontWeight="medium" _hover={{color:'#FA643F'}}>Sign Up</Text>
      </Link>
    </HStack>}
    </Flex>
  );
}
