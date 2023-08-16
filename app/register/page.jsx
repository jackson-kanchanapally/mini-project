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
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import Formi from "../components/Form";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function Login() {
  const router = useRouter();
  const [loginEr, setLoginEr] = React.useState("");
  const onSubmit = async (val, { resetForm }) => {
    createUserWithEmailAndPassword(
      auth,
      val.email,
      val.firstname,
      val.lastname,
      val.mobnum,
      val.occupation,
      val.password
    )
      .then(() => {
        router.push("/");
        resetForm()
      })
      .catch((err) => {
        if (err && err.code === "(auth/email-already-in-use)") {
          setLoginEr("Email Already Exists");
        } else {
          setLoginEr(`Error ${err}`);
        }
      });
  };

  const vaildateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstname: Yup.string().required("Firstname is Required"),
    lastname: Yup.string().required("Lastname is Required"),
    mobnum: Yup.number().required("Mobile number is Required"),
    occupation: Yup.string().required("Occupation is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
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
            // gender:"",
            occupation: "",
            mobnum: "",
            firstname: "",
            lastname: "",
          }}
          validationSchema={vaildateSchema}
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
                  <HStack w="100%">
                    <Formi
                      label="Occupation"
                      id="occupation"
                      name="occupation"
                      type="text"
                      variant="filled"
                    />
                  </HStack>

                  <Formi
                    label="Mobile Number"
                    id="mobnum"
                    name="mobnum"
                    type="tel"
                    variant="filled"
                  />
                </HStack>
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
                <Button
                  type="submit"
                  bg="#FA643F"
                  w="full"
                  _hover={{ bg: "#FF5757" }}
                >
                  Create Account
                </Button>
                <Link href="/login">
                  <Text fontSize="13px">Have Account ? Login</Text>
                </Link>
                {loginEr === "" ? (
                  ""
                ) : (
                  <Text m="auto" color="red" fontSize="15px">
                    &#9888; {loginEr}
                  </Text>
                )}
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
