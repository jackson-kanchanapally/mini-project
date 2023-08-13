'use client'
import { Box, Button, Flex, VStack,} from "@chakra-ui/react";
import { Formik, Field,Form } from "formik";
import React from 'react'
import Formi from "./Form";
export default function Login() {
  return (
    <Flex bg="gray.800" align="center" justify="center" h="100vh">
    <Box bg="gray.200" p={6} rounded="md" w={80}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
      
        validationSchema={vaildateSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form >
            <VStack spacing={4} align="flex-start">
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

              <Button type="submit"  bg="#FA643F" w="full">
                Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  </Flex>
  )
}
