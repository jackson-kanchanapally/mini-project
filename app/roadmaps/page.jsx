'use client'
import React from 'react'
import Roadmap from '../components/Roadmap'
import { Button, Flex ,Box,Progress } from '@chakra-ui/react'

export default function RoadmapPage() {
  const [course,setCourse]=React.useState()
  console.log(course)
  return (
  <Flex color='black'  alignItems='center'>
  <Flex direction='column' h='91vh' bg='white'>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Frontend Development')}>Frontend Development</Box> 
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Backend Development')}>Backend Development</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Full Stack Development')}>Fullstack Development</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Android Development')}>Android Development</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Blockchain Development')}>Blockchain Development</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('DevOps')}>DevOps</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Data Structures')}>Data Structures</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Artificial Intelligence (AI)')}>Artificial Intelligence (AI)</Box>
    <Box _hover={{color:'#FA643F'}} p='25px' color='gray.700' onClick={()=>setCourse('Cloud Computing')}>Cloud Computing</Box>
  </Flex >
  <Flex justifyContent='center' alignItems='center' m='auto'>
  {course&&<Roadmap cou={course}/>}
  </Flex>
   
  </Flex>
  )
}
