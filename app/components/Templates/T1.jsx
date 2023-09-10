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
import { Raleway } from "next/font/google";
const inter = Raleway({ subsets: ["latin"], weight: "400" });
import { UserAuth } from "@/app/context/AuthContext";
import { db, st } from "@/app/firebaseConfig";
import { EmailIcon } from "@chakra-ui/icons";
import { MdFileDownload } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { ref, uploadBytes } from "firebase/storage";
import { usePathname } from "next/navigation";
export default function T1({
   dd,
  sk,
  jp,
  ob,
  com1,
  com2,
  com3
 }) {
  const { user } = UserAuth();
  const pathname = usePathname();
  const [isLoading,setIsLoading]=React.useState(false)
  let currentUser = null;

  if (user) {
    currentUser = user.uid;
  }
  const pdfRef = React.useRef();
  const [userData, setUserData] = useState(null);

  const uploadPDF = async (pdfData, filename, userUID) => {
    const storageRef = ref(st, `resumes/${userUID}/${filename}T1`);
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
      const filename = `${userData.firstname}${userData.lastname}.pdf`;
      if (user) {
        await uploadPDF(pdfData, filename, user.uid);
      }
      pdf.save(filename);
    });
  };
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
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
      fetchUserData(currentUser);
    }
  }, [user]);
  return pathname == "/resume/manual" ? (
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
            <Img src="/re1.jpg" pos="absolute" w="760px" />
            <Box pos="relative" w="600px" h="100px" left="60px" top="80px">
              <HStack>
                <Text as="b" fontSize="4xl">
                  {userData?.firstname.toUpperCase()}{" "}
                </Text>
                <Text fontSize="4xl">{userData?.lastname.toUpperCase()}</Text>
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
              left="70px"
              top="160px"
              w="200px"
              h="180px"
            >
              <Text mb="10px">&#9742; {userData?.mobnum}</Text>
              <Text mb="10px">
                <EmailIcon /> {userData?.email}
              </Text>
              <Text>{userData?.address}</Text>
            </Box>
            <Box pos="relative" left="320px" top="-40px" h="180px">
              <Text as="b" fontSize="xl">
                P R O F I L E
              </Text>
              <Text fontSize="14px" mt="10px" w="380px">
                {userData?.obj}
              </Text>
            </Box>
            <Box pos="relative" left="320px" top="-15px" h="600px">
              <Text as="b" fontSize="xl">
                E X P E R I E N C E
              </Text>
              <Box mt="10px">
                <Stack>
                  <Text fontSize="15px" as="b">
                    {userData?.rolew.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-5px">
                    {userData?.comname.toUpperCase()}
                  </Text>
                  <Text mt="-5px">{userData?.workspan}</Text>
                  <Text
                    fontSize="12.5px"
                    w="400px"
                    textAlign="justify"
                    h="90px"
                    mt="-5px"
                  >
                    {userData?.jr1}
                  </Text>
                </Stack>
                <Stack mt="10px">
                  <Text fontSize="15px" as="b">
                    {userData?.rolew2.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-5px">
                    {userData?.comname2.toUpperCase()}
                  </Text>
                  <Text mt="-5px">{userData?.workspan2}</Text>
                  <Text
                    fontSize="12.5px"
                    w="400px"
                    textAlign="justify"
                    h="90px"
                    mt="-5px"
                  >
                    {userData?.jr2}
                  </Text>
                </Stack>
                <Stack mt="10px">
                  <Text fontSize="15px" as="b">
                    {userData?.rolew3.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-5px">
                    {userData?.comname3.toUpperCase()}
                  </Text>
                  <Text mt="-5px">{userData?.workspan3}</Text>
                  <Text
                    fontSize="12.5px"
                    w="400px"
                    textAlign="justify"
                    h="90px"
                    mt="-5px"
                  >
                    {userData?.jr3}
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box pos="relative" left="70px" top="-615px" h="300px" w="200px">
              <Text as="b" fontSize="xl">
                S K I L L S
              </Text>
              <Box mt="8px">
                {userData?.skills.map((skill, index) => (
                  <UnorderedList key={index}>
                    <ListItem my="1px">{skill}</ListItem>
                  </UnorderedList>
                ))}
              </Box>
            </Box>
            <Box pos="relative" left="70px" top="-592px" w="200px" h="300px">
              <Text as="b" fontSize="xl">
                E D U C A T I O N
              </Text>
              <Box mt="14px">
                <Text fontWeight="extrabold" fontSize="12px">
                  G R A D U A T I O N{" "}
                </Text>
                <Text>{userData?.grad}</Text>
                {/* <Text>{userData.schper} %</Text> */}
                <Text>{userData?.gspan}</Text>
              </Box>
              <Box mt="14px">
                <Text fontWeight="extrabold" fontSize="12px">
                  H I G H&nbsp;&nbsp;S C H O O L{" "}
                </Text>
                <Text>{userData?.school12}</Text>
                {/* <Text>{userData.schper} %</Text> */}
                <Text>{userData?.Tspan}</Text>
              </Box>
              <Box mt="14px">
                <Text fontWeight="extrabold" fontSize="12px">
                  S E C O N D A R Y &nbsp;&nbsp; S C H O O L{" "}
                </Text>
                <Text>{userData?.school}</Text>
                {/* <Text>{userData.schper} %</Text> */}
                <Text>{userData?.schspan}</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button bg="#FA643F" mt="60px" onClick={()=>{
          setIsLoading(true)
          downloadPDF
          }}
          isLoading={isLoading}
          >
          <MdFileDownload /> Download
        </Button>
      </Flex>
    </div>
  ) : (
    <div className={inter.className}>
      
      <Flex justifyContent="center" direction="column" alignItems="center">
      {dd===undefined||sk===undefined||jp===undefined||ob===undefined?
      <Text fontSize='3xl'>You dont have enough information to create the resume</Text>
      :(
        <Box>
        <Box m="30px" mb="0px" boxShadow="lg" w="760px" h="1070px">
          <Box ref={pdfRef} h="1200px" w="790px">
            <Img src="/re1.jpg" pos="absolute" w="760px" />

            <Box pos="relative" w="600px" h="100px" left="60px" top="80px">
              <HStack>
                <Text as="b" fontSize="4xl">
                  {dd?.firstname.toUpperCase()}{" "}
                </Text>
                <Text fontSize="4xl">{dd?.lastname.toUpperCase()}</Text>
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
              left="70px"
              top="160px"
              w="200px"
              h="180px"
            >
              <Text mb="10px">&#9742; {dd?.contact}</Text>
              <Text mb="10px">
                <EmailIcon /> {dd?.email}
              </Text>
              <Text>{dd?.address}</Text>
            </Box>
            <Box pos="relative" left="320px" top="-40px" h="180px">
              <Text as="b" fontSize="xl">
                P R O F I L E
              </Text>
              <Text fontSize="14px" mt="10px" w="380px">
                {ob&&ob}
              </Text>
            </Box>
            <Box pos="relative" left="320px" top="-15px" h="600px">
              <Text as="b" fontSize="xl">
                E X P E R I E N C E
              </Text>
              <Box mt="10px">
                <Stack>
                  <Text fontSize="15px" as="b">
                   
                  </Text>
                  <Text color="gray.500" mt="-5px" as='b'>
                    {dd&&dd.comname?.toUpperCase()}
                  </Text>
                  <Text mt="-5px">{!dd&&userData?.workspan}</Text>
                  <Text
                    fontSize="12.5px"
                    w="390px"
                    ml='10px'
                    textAlign="justify"
                    h="90px"
                    mt="-5px"
                  >
                     {dd.comname&&com1&&com1}
                  </Text>
                </Stack>
                <Stack mt="10px">
                  <Text fontSize="15px" as="b">
                    {!dd&&userData?.rolew2.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-5px" as='b'>
                    {dd&&dd.comname2?.toUpperCase()}
                  </Text>
                  <Text mt="-5px">{!dd&&userData?.workspan2}</Text>
                  <Text
                    fontSize="12.5px"
                    w="390px"
                    ml='10px'
                    textAlign="justify"
                    h="90px"
                    mt="-5px"
                  >
                    {dd?.comname2&&com2&&com2}
                  </Text>
                </Stack>
                <Stack mt="10px">
                  <Text fontSize="15px" as="b">
                    {!dd&&userData?.rolew3.toUpperCase()}
                  </Text>
                  <Text color="gray.500" mt="-5px" as='b'>
                    {dd&&dd.comname3?.toUpperCase()}
                  </Text>
                  <Text mt="-5px">{!dd&&userData?.workspan3}</Text>
                  <Text
                    fontSize="12.5px"
                    w="390px"
                    ml='10px'
                    textAlign="justify"
                    h="90px"
                    mt="-5px"
                  >
                    {dd?.comname3&&com3&&com3}
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box pos="relative" left="70px" top="-615px" h="300px" w="200px">
              <Text as="b" fontSize="xl">
                S K I L L S
              </Text>
              <Box mt="8px">
                {sk &&
                  sk.map((skill, index) => (
                    <UnorderedList key={index}>
                      <ListItem my="1px">{skill}</ListItem>
                    </UnorderedList>
                  ))}
              </Box>
            </Box>
            <Box pos="relative" left="70px" top="-592px" w="200px" h="300px">
              <Text as="b" fontSize="xl">
                E D U C A T I O N
              </Text>
              <Box mt="14px">
                <Text fontWeight="extrabold" fontSize="12px">
                G R A D U A T I O N{" "}
                </Text>
                <Text>{dd&&dd.grad?.toUpperCase()}</Text>
                {/* <Text>{userData.schper} %</Text> */}
                <Text>{!dd&&userData?.gspan}</Text>
              </Box>
              <Box mt="14px">
                <Text fontWeight="extrabold" fontSize="12px">
                  H I G H&nbsp;&nbsp;S C H O O L{" "}
                </Text>
                <Text>{dd.school12?.toUpperCase()}</Text>
                {/* <Text>{userData.schper} %</Text> */}
                <Text>{!dd&&userData?.Tspan}</Text>
              </Box>
              <Box mt="14px">
                <Text fontWeight="extrabold" fontSize="12px">
                  S E C O N D A R Y &nbsp;&nbsp; S C H O O L{" "}
                </Text>
                <Text>{dd.school?.toUpperCase()}</Text>
                {/* <Text>{userData.schper} %</Text> */}
                <Text>{!dd&&userData?.schspan}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
         
       <Center>
       <Button bg="#FA643F" mt="60px" onClick={()=>{
          setIsLoading(true)
          downloadPDF
          }}
          isLoading={isLoading}
          >
          <MdFileDownload /> Download
        </Button>
       </Center>
        </Box>
        )
      }
      </Flex>
    </div>
  );
}
