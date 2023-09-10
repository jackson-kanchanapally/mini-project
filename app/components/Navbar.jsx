"use client";
import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  chakra,
  Spinner,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { ImSwitch } from "react-icons/im";
import React from "react";
import { db, st } from "@/app/firebaseConfig";
import { UserAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { listAll, getDownloadURL, ref } from "firebase/storage";
export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const [userData, setUserData] = useState(null);
  const [games, setGames] = React.useState([]);
  const [fildata, setFil] = React.useState([]);
  const [rd, setRd] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { user, logOut } = UserAuth();
  const pathname = usePathname();
  let currentUser = null;
  if (user) {
    currentUser = user.uid;
  }
  const pdfRef = ref(st, `resumes/${currentUser}`);
  useEffect(() => {
    listAll(pdfRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setRd((prev) => [...prev, url]);
        });
      });
    });
  }, [currentUser]);
  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    setLoading(false);
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
    if (user) {
      const gamesCollection = collection(db, "users", user.uid, "tests");

      const getGames = async () => {
        try {
          const querySnapshot = await getDocs(gamesCollection);
          const gamesData = [];
          querySnapshot.forEach((doc) => {
            gamesData.push(doc.data());
          });
          setGames(gamesData);
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      };
      getGames();
    }
  }, [currentUser]);
  React.useEffect(() => {
    const filteredCourses = games
      .filter((item) => item.test?.result >= 70)
      .map((item) => item.test?.course);

    setFil(filteredCourses);
  }, [games]);

  const navBarCont = user ? (
    <HStack spacing="30px" pr="60px" fontSize="15px" pos="static">
      <Link href="/resume" prefetch={true}>
        <Text
          _hover={{ color: "#FA643F" }}
          color={pathname == "/resume" ? "#FA643F" : ""}
        >
          Resume Builder
        </Text>
      </Link>
      <Link href="/skilltests">
        <Text
          fontWeight="medium"
          color={pathname == "/skilltests" ? "#FA643F" : ""}
          _hover={{ color: "#FA643F" }}
        >
          Take Test
        </Text>
      </Link>
      <Link href="/contest">
        <Text
          fontWeight="medium"
          color={pathname == "/contest" ? "#FA643F" : ""}
          _hover={{ color: "#FA643F" }}
        >
          Coding Contests
        </Text>
      </Link>
      <Link href="/college">
        <Text
          fontWeight="medium"
          color={pathname == "/college" ? "#FA643F" : ""}
          _hover={{ color: "#FA643F" }}
        >
          College Finder
        </Text>
      </Link>
      <Link href="/roadmaps">
        <Text
          fontWeight="medium"
          color={pathname == "/roadmaps" ? "#FA643F" : ""}
          _hover={{ color: "#FA643F" }}
        >
          Road Maps
        </Text>
      </Link>
      <Avatar ref={btnRef} onClick={onOpen} size="sm"></Avatar>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.100" boxShadow="sm">
          <DrawerCloseButton />
          <DrawerHeader fontSize="25px">Your Profile</DrawerHeader>

          <DrawerBody>
            <Box mt="10px">
              <Text as="b" fontSize="22px">
                Personal Info
              </Text>
              <Box ml="10px">
                <Box>
                  <Text fontSize="17px">
                    {user?.displayName?.charAt(0).toUpperCase() +
                      user?.displayName?.slice(1)}
                  </Text>
                </Box>
                <Text>
                  {userData?.occupation?.charAt(0).toUpperCase() +
                    userData?.occupation?.slice(1)}
                </Text>
                <Text>
                  Contact Info:{" "}
                  {userData?.contact ? userData?.contact : "Not provided"}
                </Text>
              </Box>
              <Box mt="20px">
                <Text as="b" fontSize="22px">
                  Skills
                </Text>
                <Box ml="10px">
                  {fildata ? (
                    fildata.map((skill, index) => (
                      <UnorderedList key={index}>
                        <ListItem my="1px">{skill}</ListItem>
                      </UnorderedList>
                    ))
                  ) : (
                    <Text>No Skills acquired</Text>
                  )}
                </Box>
              </Box>
              <Box mt="10px">
                <Text as="b" fontSize="22px">
                  Created Resumes
                </Text>
                <>
                  {rd?.map((im, index) => (
                    <Box key={index} mt="5px" ml="10px">
                      <Link href={im} target="_blank">{`${
                        userData?.name.charAt(0).toUpperCase() +
                        userData?.name.slice(1)
                      }'s Resume ${index + 1}`}</Link>
                    </Box>
                  ))}
                </>
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              fontWeight="medium"
              onClick={handleSignOut}
              w="full"
              bg="#FA643F"
              color="gray.700"
            >
              <ImSwitch size="13px" /> &nbsp; Log Out{" "}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  ) : (
    <HStack spacing="30px" pr="60px" fontSize="15px">
      <Link href="/login">
        <Text _hover={{ color: "#FA643F" }}>Login</Text>
      </Link>
      <Link href="/register">
        <Text fontWeight="medium" _hover={{ color: "#FA643F" }}>
          Sign Up
        </Text>
      </Link>
    </HStack>
  );
  return (
    <Flex w="100%" h="10%" bg="gray.100" alignItems="center" p="8px" pl="20px">
      <Box pl="30px">
        <Img src="/logo.png" width="130px" alt="CareerUp" />
      </Box>
      <Spacer />
      {loading ? <Spinner speed="0.65s" mr="400px" size="sm" /> : navBarCont}
    </Flex>
  );
}
