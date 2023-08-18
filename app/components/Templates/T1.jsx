'use client'
import { Flex, chakra, Image, Box, Text,ListItem,UnorderedList,Button } from "@chakra-ui/react";
import React, { useEffect, useState} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Raleway } from "next/font/google";
const inter = Raleway({ subsets: ["latin"], weight: "400" });
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebaseConfig";
import { EmailIcon} from '@chakra-ui/icons'
import {TriangleUpIcon} from '@chakra-ui/icons'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

export default function T1() {
  
  const pdfRef=React.useRef()
  const [userData, setUserData] = useState(null);
  const downloadPDF=()=>{
    const input=pdfRef.current
    html2canvas(input).then((canvas)=>{
      const imgData=canvas.toDataURL('image/png')
      const pdf=new jsPDF('p','mm','a4',true)
      const pdfWidth=pdf.internal.pageSize.getWidth()
      const pdfHeight=pdf.internal.pageSize.getHeight()
      const imgWidth=canvas.width
      const imgHeight=canvas.height
      const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight)
      const imgX=(pdfWidth-imgWidth*ratio)/2
      const imgY=30
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio)
      pdf.save(`${userData.firstname}${userData.lastname}.pdf`)
    })
  }
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const { user } = UserAuth();
  useEffect(() => {
    if (user) {
      async function fetchUserData(uid) {
        try {
          const userDocRef = doc(db, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log('User data not found');
          }
        } catch (err) {
          console.log(err);
        }
      }

      fetchUserData(user.uid);
    }
  }, [user]);
  return (
   <div className={inter.className} >
     {userData&&  <Flex ml="25%">
        <Box m="30px" mb="10%" boxShadow="lg" w="760px" h="1070px" >
       <Box ref={pdfRef} >
          <Img src="/re1.jpg" pos="absolute" w="50%" />

          <Box pos="relative" w='600px' h='100px' left="60px" top="80px">
            <Text as="b" fontSize="4xl">
              {userData.firstname.toUpperCase()} {userData.lastname.toUpperCase()}
            </Text>
            <Text fontSize='18px'>{userData.role.toUpperCase().split('').map(char => char === ' ' ? '\u00A0\u00A0' : char + ' ').join('')}</Text>
          </Box>
          <Box pos="relative" fontSize='13px' left="70px" top="160px" w='200px' h='180px'>
            <Text mb='10px'>
            &#9742; {userData.mobnum}
            </Text>
            <Text mb='10px'>
            <EmailIcon/> {userData.email}
            </Text>
            <Text>
            <TriangleUpIcon/> {userData.address}
            </Text>
            
          </Box>
          <Box pos="relative" left="320px" top="-40px" h='180px'>
            <Text as="b" fontSize="xl">
              P R O F I L E
            </Text>
            <Text fontSize='14px' mt='10px' w='380px'>{userData.obj}</Text>
          </Box>
          <Box pos="relative" left="320px" top="-15px"  h='600px'>
            <Text as="b" fontSize="xl">
            E X P E R I E N C E
            </Text>
            {/* <Text mt='10px'>{age.split('').join(' ').toUpperCase()}</Text> */}
          </Box>
          <Box pos="relative" left="70px" top="-615px"  h='300px' w='200px'>
            <Text as="b" fontSize="xl" >
            S K I L L S
            </Text>
            {userData.skills.map((skill,index)=>(
              <UnorderedList key={index}>
                <ListItem my='5px'>{skill}</ListItem>
              </UnorderedList>
            ))}
          </Box>
          <Box pos="relative" left="70px" top="-592px" w='200px' h='300px'>
            <Text as="b" fontSize="xl">
            E D U C A T I O N
            </Text>
            <Box mt='14px'>
              <Text fontWeight='extrabold' fontSize='12px'>G R A D A T I O N </Text>
              <Text >{userData.grad}</Text>
              {/* <Text>{userData.schper} %</Text> */}
              <Text>{userData.gspan}</Text>
            </Box>
            <Box mt='14px'>
              <Text fontWeight='extrabold' fontSize='12px'>G R A D A T I O N </Text>
              <Text >{userData.school12}</Text>
              {/* <Text>{userData.schper} %</Text> */}
              <Text>{userData.Tspan}</Text>
            </Box>
            <Box mt='14px'>
              <Text fontWeight='extrabold' fontSize='12px'>S E C O N D A R Y &nbsp;&nbsp; S C H O O L </Text>
              <Text >{userData.school}</Text>
              {/* <Text>{userData.schper} %</Text> */}
              <Text>{userData.schspan}</Text>
            </Box>
          </Box>
        </Box>
        </Box>
        <Button onClick={downloadPDF}>Download</Button>
      </Flex> }
    </div>
  );
}