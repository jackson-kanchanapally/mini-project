"use client";
import {
  Flex,
  chakra,
  Image,
  Box,
  Text,
  ListItem,
  UnorderedList,
  Button,
  Stack,
  HStack,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Lato } from "next/font/google";
const inter = Lato({ subsets: ["latin"], weight: "400" });
import { UserAuth } from "@/app/context/AuthContext";
import { db, st } from "@/app/firebaseConfig";
import { EmailIcon } from "@chakra-ui/icons";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { MdFileDownload,MdFileUpload } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { ref, uploadBytes } from "firebase/storage";
import { usePathname } from "next/navigation";
export default function T2(
  {
    dd,
    sk,
    jp,
    ob,
    com1,
    com2,
    com3
  }
) {
  const pdfRef = React.useRef();
    const [isLoading,setIsLoading]=React.useState(false)
  const [userData, setUserData] = useState(null);
  const [isLoading2,setIsLoading2]=React.useState(false)
  const [pdU,setPdu]=React.useState('')
  const [fn,setfn]=React.useState('')
  const pathname = usePathname();
  const uploadPDF = async (pdfData, filename, userUID) => {
    const storageRef = ref(st, `resumes/${userUID}/${filename}T2`);
    try {
      await uploadBytes(storageRef, pdfData);
      console.log("uploaded resune");
    } catch (err) {
      console.log("resume error ", err);
    }
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      const pdfData = pdf.output("blob");
      setPdu(pdfData)
      const filename = `${userData.firstname}${userData.lastname}.pdf`;
      setfn(filename)
      pdf.save(filename);
      setIsLoading(false)
    });
  };
  const UpP = async () => {
    try {
      if (user) {
        await uploadPDF(pdU, fn, user.uid);
        setIsLoading2(false) 
      } else {
        console.log('User is not defined'); 
      }
    } catch (error) {
      console.error('Error uploading PDF:', error); 
    }
  };
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const { user } = UserAuth();
  useEffect(() => {
    if (user) {
      async function fetchUserData(uid) {
        try {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("User data not found");
          }
        } catch (err) {
          console.log(err);
        }
      }

      fetchUserData(user.uid);
    }
  }, [user]);
  return pathname==='/re2'?(
    <div className={inter.className}>
      <Flex justifyContent="center" direction="column" alignItems="center">
        {pathname == "/resume/manual" ? (
          <Box ml="-1390px" mt="10px" fontSize="27px">
            <Link href="resume/manual">
              <BsFillArrowLeftCircleFill />
            </Link>
          </Box>
        ) : null}
        <Box m="30px" mb="0px" boxShadow="lg" w="760px" h="1070px">
          <Box ref={pdfRef} h="1200px" w="790px">
            <Img src="/re2.jpg" pos="absolute" w="760px" />

            <Box pos="relative" w="600px" h="100px" left="300px" top="40px">
              <HStack>
                <Text as="b" fontSize="4xl">
                  {userData?.firstname?.charAt(0).toUpperCase() +
                    userData?.firstname?.slice(1)}
                </Text>
                <Text fontSize="4xl">
                  {userData?.lastname?.charAt(0).toUpperCase() +
                    userData?.lastname?.slice(1)}
                </Text>
              </HStack>

              <Text fontSize="18px">
                {userData?.role
                  .toUpperCase()
                  .split("")
                  .map((char) => (char === " " ? "\u00A0\u00A0" : char + " "))
                  .join("")}
              </Text>
            </Box>
            <Box
              pos="relative"
              fontSize="13px"
              left="46px"
              top="177px"
              w="200px"
              h="180px"
              color="white"
            >
              <Text mb="30px">{userData?.mobnum}</Text>
              <Text mb="31px">{userData?.email}</Text>
              <Text>{userData?.address}</Text>
            </Box>
            <Box pos="relative" left="300px" top="-165px" h="180px">
              <Text fontSize="12px" mt="10px" w="380px" textAlign="justify">
                {userData?.obj}
              </Text>
            </Box>
            <Box pos="relative" left="320px" top="-205px" h="600px">
              <Box mt="20px">
                <Stack>
                  <Text fontSize="17px" as="b">
                    {userData?.rolew.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-7px">
                    {userData?.comname.toUpperCase()}
                  </Text>
                  <Text mt="-7px">{userData?.workspan}</Text>
                  <Text
                    fontSize="13px"
                    mt="-2px"
                    textAlign="justify"
                    w="400px"
                    h="100px"
                  >
                    {userData?.jr1}
                  </Text>
                </Stack>
                <Stack mt="15px">
                  <Text fontSize="17px" as="b">
                    {userData?.rolew2.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-7px">
                    {userData?.comname2.toUpperCase()}
                  </Text>
                  <Text mt="-7px">{userData?.workspan2}</Text>
                  <Text
                    fontSize="13px"
                    mt="-2px"
                    textAlign="justify"
                    w="400px"
                    h="100px"
                  >
                    {userData?.jr2}
                  </Text>
                </Stack>
                <Stack mt="20px">
                  <Text fontSize="17px" as="b">
                    {userData?.rolew3.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-7px">
                    {userData?.comname3.toUpperCase()}
                  </Text>
                  <Text mt="-7px">{userData?.workspan3}</Text>
                  <Text
                    fontSize="13px"
                    mt="-2px"
                    textAlign="justify"
                    w="400px"
                    h="100px"
                  >
                    {userData?.jr3}
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box pos="relative" left="46px" top="-340px" h="300px" w="200px">
              <Box mt="30px" color="gray.100" fontSize="15px">
                {userData?.skills.map((skill, index) => (
                  <UnorderedList key={index}>
                    <ListItem my="1px">
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </ListItem>
                  </UnorderedList>
                ))}
              </Box>
            </Box>
            <Box
              pos="relative"
              left="50px"
              top="-942px"
              w="200px"
              h="300px"
              color="gray.100"
            >
              <Box mt="14px">
                <Text fontSize="13px">{userData?.gspan}</Text>
                <Text fontSize="18px">
                  {userData?.grad.charAt(0).toUpperCase() +
                    userData?.grad.slice(1)}
                </Text>
              </Box>
              <Box mt="14px">
                <Text fontSize="13px">{userData?.Tspan}</Text>

                <Text fontSize="18px">
                  {userData?.school12.charAt(0).toUpperCase() +
                    userData?.school12.slice(1)}
                </Text>
                {/* <Text>{userData.schper} %</Text> */}
              </Box>
              <Box mt="14px">
                <Text fontSize="13px">{userData?.schspan}</Text>
                <Text fontSize="18px">
                  {userData?.school.charAt(0).toUpperCase() +
                    userData?.school.slice(1)}
                </Text>
                {/* <Text>{userData.schper} %</Text> */}
              </Box>
            </Box>
          </Box>
        </Box>
        <Center>
        <Button mr='10px' bg="#FA643F" mt="60px" onClick={()=>{
          setIsLoading2(true)
          UpP()
          }}
          isLoading={isLoading2}
          >
          <MdFileUpload /> Upload to Database
        </Button>

       <Button bg="#FA643F" mt="60px" onClick={()=>{
          setIsLoading(true)
          downloadPDF()
          }}
          isLoading={isLoading}
          >
          <MdFileDownload /> Download
        </Button>
       </Center>
      </Flex>
    </div>
  ):(
    <div className={inter.className}>
      <Flex justifyContent="center" direction="column" alignItems="center">
      {dd===undefined||sk===undefined||jp===undefined||ob===undefined?
      <Text fontSize='3xl'>You dont have enough information to create the resume</Text>
      :(
        <Box>
        <Box m="30px" mb="0px" boxShadow="lg" w="760px" h="1070px">
          <Box ref={pdfRef} h="1200px" w="790px">
            <Img src="/re2.jpg" pos="absolute" w="760px" />

            <Box pos="relative" w="600px" h="100px" left="300px" top="40px">
              <HStack>
                <Text as="b" fontSize="4xl">
                  {dd?.firstname.charAt(0).toUpperCase() +
                    dd?.firstname?.slice(1)}
                </Text>
                <Text fontSize="4xl">
                  {dd?.lastname?.charAt(0).toUpperCase() +
                    dd?.lastname?.slice(1)}
                </Text>
              </HStack>

              <Text fontSize="18px">
                {jp&&jp
                  .toUpperCase()
                  .split("")
                  .map((char) => (char === " " ? "\u00A0\u00A0" : char + " "))
                  .join("")}
              </Text>
            </Box>
            <Box
              pos="relative"
              fontSize="13px"
              left="46px"
              top="177px"
              w="200px"
              h="180px"
              color="white"
            >
              <Text mb="30px">{dd?.contact}</Text>
              <Text mb="31px">{dd?.email}</Text>
              <Text>{dd?.address}</Text>
            </Box>
            <Box pos="relative" left="300px" top="-165px" h="180px">
              <Text fontSize="12px" mt="10px" w="380px" textAlign="justify">
                {ob&&ob}
              </Text>
            </Box>
            <Box pos="relative" left="320px" top="-205px" h="650px">
              <Box mt="20px">
                <Stack>
                  <Text fontSize="17px" as="b">
                    {/* {userData?.rolew.toUpperCase()} */}
                  </Text>
                  <Text color="gray.500" mt="-7px">
                  {dd&&dd.comname?.toUpperCase()}
                  </Text>
                  <Text mt="-7px">{userData?.workspan}</Text>
                  <Text
                    fontSize="13px"
                    mt="-2px"
                    textAlign="justify"
                    w="400px"
                    h="100px"
                  >
                    {dd.comname&&com1&&com1}
                  </Text>
                </Stack>
                <Stack mt="65px">
                  <Text fontSize="17px" as="b">
                    {/* {userData?.rolew2.toUpperCase()} */}
                  </Text>
                  <Text color="gray.500" mt="-7px">
                  {dd&&dd.comname2?.toUpperCase()}
                  </Text>
                  <Text mt="-7px">{userData?.workspan2}</Text>
                  <Text
                    fontSize="13px"
                    mt="-2px"
                    textAlign="justify"
                    w="400px"
                    h="100px"
                  >
                     {dd?.comname2&&com2&&com2}
                     
                  </Text>
                </Stack>
                <Stack mt="65px">
                  <Text fontSize="17px" as="b">
                    {/* {userData?.rolew3.toUpperCase()} */}
                  </Text>
                  <Text color="gray.500" mt="-7px">
                  {dd&&dd.comname3?.toUpperCase()}
                  </Text>
                  <Text mt="-7px">{userData?.workspan3}</Text>
                  <Text
                    fontSize="13px"
                    mt="-2px"
                    textAlign="justify"
                    w="400px"
                    h="100px"
                  >
                   {dd?.comname3&&com3&&com3}
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box pos="relative" left="46px" top="-400px" h="300px" w="200px">
              <Box mt="30px" color="gray.100" fontSize="15px">
                {sk &&
                  sk.map((skill, index) => (
                  <UnorderedList key={index}>
                    <ListItem my="1px">
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </ListItem>
                  </UnorderedList>
                ))}
              </Box>
            </Box>
            <Box
              pos="relative"
              left="50px"
              top="-982px"
              w="200px"
              h="300px"
              color="gray.100"
            >
              <Box mt="14px">
                <Text fontSize="13px"></Text>
                <Text fontSize="18px">
                  {dd.grad?.charAt(0).toUpperCase() +
                    dd.grad?.slice(1)}
                </Text>
              </Box>
              <Box mt="14px">
                {/* <Text fontSize="13px">{userData?.Tspan}</Text> */}

                <Text fontSize="18px">
                  {dd.school12?.charAt(0).toUpperCase() +
                    dd.school12?.slice(1)}
                </Text>
                {/* <Text>{userData.schper} %</Text> */}
              </Box>
              <Box mt="14px">
                {/* <Text fontSize="13px">{userData?.schspan}</Text> */}
                <Text fontSize="18px">
                  {dd.school?.charAt(0).toUpperCase() +
                    dd.school?.slice(1)}
                </Text>
                {/* <Text>{userData.schper} %</Text> */}
              </Box>
            </Box>
          </Box>
        </Box>

        <Center>
        <Button mr='10px' bg="#FA643F" mt="60px" onClick={()=>{
          setIsLoading2(true)
          UpP()
          }}
          isLoading={isLoading2}
          >
          <MdFileUpload /> Upload to Database
        </Button>

       <Button bg="#FA643F" mt="60px" onClick={()=>{
          setIsLoading(true)
          downloadPDF()
          }}
          isLoading={isLoading}
          >
          <MdFileDownload /> Download
        </Button>
       </Center>
        </Box>
      )}
      </Flex>
    </div>
  );
}
