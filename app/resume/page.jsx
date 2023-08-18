'use client'
import React from 'react'

import {Flex, Card,Stack,Text,Heading,Spinner,Image, CardBody, CardFooter,chakra, Box, Button } from '@chakra-ui/react'

import Link from 'next/link'
export default function Rpage() {
    const Img = chakra(Image, {
        shouldForwardProp: (prop) =>
          ["width", "height", "src", "alt"].includes(prop),
      });

  return (
   <Flex justifyContent='center' mt='2%'>
   
  <Box >
    <Card maxW='sm' borderRaduis='15px' bg='gray.100'>
  <CardBody>
    <Img
      src={'man.png'}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      width='full'
      height='full'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Manual Resume</Heading>
      <Text>
        The choice is user&apos;s to create the resume. User should enter the required information to create the resume.
      </Text>
      <Link href='/resume/manual'><Button bg="#FA643F" w='full'>Manual</Button></Link>
    </Stack>
  </CardBody>
  </Card>
  </Box>
  <Box>
    <Card maxW='sm' ml='30px' bg='gray.100'>
  <CardBody>
    <Img
      src='auto.png'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      width='full'
      height='full'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Automatic Resume</Heading>
      <Text>
        The user must take a test and maintain above 75% in that test to generate a resume automatically.
      </Text>
      <Link href='/resume/auto' prefetch={true}><Button bg="#FA643F" w='full'>Automatic</Button></Link>
    </Stack>
  </CardBody>
  </Card>
  </Box>
  

   </Flex>
  )
}
