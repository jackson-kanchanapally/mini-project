'use client'
import { Box, Button, Flex, Text, VStack, chakra,Image} from "@chakra-ui/react";
import { Formik, Field,Form } from "formik";
import React from 'react'
import Formi from "../components/Form";
import Link from "next/link";
export default function Login() {
  const onSubmit=async(val,{resetForm})=>{
    console.log(val.email+"  "+val.password)
    
  }
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });

  return (
    <Flex align="center" justify="center" h="90vh">
    <Box bg="gray.100" p={6} rounded="15px" w={'380px'}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
      
        //  validationSchema={vaildateSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form >
            <VStack spacing={4} align="flex-start">
            <Img src="logo.png" width="130px" />
              <Formi
                label="Email Address"
                id="email"
                name="email"
                type="email"
                variant="filled"
              />
              <Formi
                label="Password"
                id="password"
                name="password"
                type="password"
                variant="filled"
              />

              <Button type="submit"  bg="#FA643F" w="full" _hover={{ bg: "#FF5757" }}>
                Login
              </Button>
              <Link href='/register'><Text fontSize='13px' >Create Account ? SignUp</Text></Link>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  </Flex>
  )
}
