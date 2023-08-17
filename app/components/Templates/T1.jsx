import { Flex, chakra, Image, Box, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState,useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Raleway } from "next/font/google";
const inter = Raleway({ subsets: ["latin"], weight: "400" });
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebaseConfig";
import html2pdf from 'html2pdf.js';
export default function T1() {
  const [pdfLoading, setPdfLoading] = useState(false);
  const pdfRef = useRef(null);

  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const downloadPdf = () => {
    setPdfLoading(true);
    const element = pdfRef.current;

    const opt = {
      margin:       0.5,
      filename:     'resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).outputPdf().then(() => {
      setPdfLoading(false);
    });
  };

  const { user } = UserAuth();
  const [userData, setUserData] = useState(null);
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
   <div className={inter.className}>
     {userData&&  <Flex ml="25%">
        <Box m="30px" mb="10%" boxShadow="dark-lg" w="760px" h="1070px">
          <Img src="/re1.jpg" pos="absolute" w="50%" />

          <Box pos="relative" left="80px" top="80px">
            <Text as="b" fontSize="4xl">
              {userData.firstname.toUpperCase()} {userData.lastname.toUpperCase()}
            </Text>
            <Text>asdfd</Text>
          </Box>
          <Box pos="relative" left="320px" top="160px" h='180px'>
            <Text as="b" fontSize="xl">
              P R O F I L E
            </Text>
            <Text fontSize='14px' mt='10px' w='380px'>{userData.obj}</Text>
          </Box>
          <Box pos="relative" left="320px" top="185px"  h='600px'>
            <Text as="b" fontSize="xl">
            E X P E R I E N C E
            </Text>
            {/* <Text mt='10px'>{age.split('').join(' ').toUpperCase()}</Text> */}
          </Box>
          <Box pos="relative" left="80px" top="-412px"  h='300px' w='200px'>
            <Text as="b" fontSize="xl" >
            S K I L L S
            </Text>
            {/* <Text mt='10px'>{age.split('').join(' ').toUpperCase()}</Text> */}
          </Box>
          <Box pos="relative" left="80px" top="-392px" w='200px' h='300px'>
            <Text as="b" fontSize="xl">
            E D U C A T I O N
            </Text>
            {/* <Text mt='10px'>{age.split('').join(' ').toUpperCase()}</Text> */}
          </Box>
        </Box>
        <Button onClick={downloadPdf}>Download</Button>
      </Flex> }
    </div>
  );
}
