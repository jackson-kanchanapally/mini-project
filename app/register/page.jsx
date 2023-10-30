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
} from "@chakra-ui/react";
import * as Yup from 'yup';
import { Formik, Form } from "formik";
import React from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { db } from "@/app/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Formi from "../components/Form";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loginEr, setLoginEr] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (val, { resetForm }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        val.email,
        val.password
      );
      await updateProfile(user, {
        displayName: val.firstname + " " + val.lastname,
        phoneNumber: val.mobnum,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: val.firstname + val.lastname,
        firstname: val.firstname,
        lastname: val.lastname,
        occupation: val.occupation,
        contact: val.mobnum,
        address: val.address,
        email: val.email,
        comname:val.comname,
        comname2:val.comname2,
        comname3:val.comname3,
        school:val.school,
        school12:val.school12,
        grad:val.grad
      });
      setLoading(true);
      router.push("/");
    } catch (err) {
      if (err && err.code === "auth/email-already-in-use") {
        setLoginEr("Email Already Exists");
      } else {
        setLoginEr(`Error ${err}`);
      }
    }
  };
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    occupation: Yup.string().required("Occupation is Required"),
    mobnum: Yup.string()
      .matches(/^\d{10}$/, 'Mobile Number must be a valid 10-digit number')
      .required('Mobile Number is required'),
    address: Yup.string().required("Address is Required"),
    school: Yup.string(),
    school12: Yup.string(),
    grad: Yup.string(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const {user}=UserAuth()
  if(user)
  {
    router.push('/')
  }
  return (
    <Flex align="center" justify="center" h="90vh">
      <Box bg="gray.100" p={6} rounded="15px" w={"680px"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            address: "",
            occupation: "",
            mobnum: "",
            firstname: "",
            lastname: "",
            school:"",
            school12:"",
            grad:"",
            comname:"",
            comname2:"",
            comname3:"",
          }}
          validationSchema={validationSchema}
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
                  label="Address"
                  id="address"
                  name="address"
                  type="text"
                  variant="filled"
                />
                <Text>Education</Text>
                <HStack>
                <Formi
                  label="Secondary School"
                  id="school"
                  name="school"
                  type="text"
                  variant="filled"
                />
                <Formi
                  label="High School"
                  id="school12"
                  name="school12"
                  type="text"
                  variant="filled"
                />
                <Formi
                  label="Graduation"
                  id="grad"
                  name="grad"
                  type="text"
                  variant="filled"
                />
                </HStack>
                <Text>Job Info if any (Max 3)</Text>
                <HStack>
                <Formi
                  label="Company Name"
                  id="comname"
                  name="comname"
                  type="text"
                  variant="filled"
                />
                <Formi
               label="Company Name "
               id="comname2"
               name="comname2"
                  type="text"
                  variant="filled"
                />
                <Formi
                   label="Company Name"
                   id="comname3"
                   name="comname3"
                  type="text"
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
                  isLoading={loading ? true : false}
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
