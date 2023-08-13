"use client";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  chakra,
  Image,
  HStack,
  Select,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import React from "react";
import Formi from "../components/Form";
import Link from "next/link";
export default function Login() {
  const onSubmit = async (val, { resetForm }) => {
    alert(val.gender);
  };
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <Flex align="center" justify="center" h="90vh">
      <Box bg="gray.100" p={6} rounded="15px" w={"680px"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            gender:"",
            occupation:"",
            mobnum:"",
            firstname:"",
            lastname:"",

          }}
          // validationSchema={vaildateSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <VStack spacing={4} align="flex-start">
                <Img src="logo.png" width="130px" />
                <HStack w="100%">
                  <Formi
                    label="First Name"
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    variant="filled"
                  />
                  <Formi
                    label="Last Name"
                    id="lastname"
                    name="lastname"
                    type="text"
                    variant="filled"
                  />
                </HStack>
                <HStack w="100%">
              
              
                  <Select placeholder="Gender" borderColor='gray.600' color='gray.600' id='gender' name='gender'>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    
                  </Select>
                
                  <Select placeholder="Occupation" borderColor='gray.600' color='gray.600' name='occupation'>
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    
                    <option value="other">Other</option>
                    
                  </Select>
                 
                </HStack>
                <HStack w="100%">
                  <Formi
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />

                  <Formi
                    label="Mobile Number"
                    id="mobnum"
                    name="mobnum"
                    type="tel"
                    variant="filled"
                  />
                 
                </HStack>
                <Formi
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                  />
                <Button type="submit"  bg="#FA643F" w="full" _hover={{ bg: "#FF5757" }}>
               Create Account
              </Button>
                <Link href="/login">
                  <Text fontSize="13px">Have Account ? Login</Text>
                </Link>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
