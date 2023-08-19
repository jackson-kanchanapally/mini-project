"use client";
import React from "react";
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
  Stack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { db } from "@/app/firebaseConfig";
import { doc, setDoc,updateDoc} from 'firebase/firestore'
import { UserAuth } from "@/app/context/AuthContext";
import { ResumeCon } from "@/app/context/ResumeContext";
import Formi from "@/app/components/Form";
import * as Yup from "yup";
import {useRouter} from 'next/navigation'

export default function Manpage() {
    const [loginEr, setLoginEr] = React.useState("");
    const {user}=UserAuth()
    const [loading,setLoading]=React.useState(false)
    let currentUser = null;
  
    if (user) {
      currentUser = user.uid;
    }
    async function saveData(uid, userData) {
      try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, userData);
        console.log("success doc");
      } catch (err) {
        console.log("Lov Error",err);
      }
    }
    const router=useRouter()
  const vaildateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstname: Yup.string().required('name is required'),
    lastname: Yup.string().required('Last name is required'),
    grad: Yup.string().required('Graduation year is required'),
    obj: Yup.string().required('Objective is required'),
    mobnum: Yup.number().required('Mobile number is required'),
    schper12: Yup.number().required('School percentage (12th) is required'),
    school12: Yup.string().required('School (12th) is required'),
    schper: Yup.number().required('School percentage is required'),
    school: Yup.string().required('School is required'),
    address: Yup.string().required('Address is required'),
    grad_per: Yup.number().required('Graduation percentage is required'),
    skills: Yup.string().required('Skills are required'),
    // skills: Yup.array().of(Yup.string().required('At least one skill is required')),
    
  });
  const onSubmit = async (val, { resetForm }) => {
    const upd = {
      email: val.email,
      firstname: val.firstname,
      lastname: val.lastname,
      grad: val.grad,
      obj: val.obj,
      mobnum: Number(val.mobnum),
      schper12: Number(val.schper12),
      school12: val.school12,
      schper: Number(val.schper),
      school: val.school,
      address: val.address,
      grad_per: Number(val.grad_per),
      // skills: val.skills,
      skills: val.skills.split(",").map(skill => skill.trim()),
      exp: val.exp,
      role: val.role,
      schspan:val.schspan,
      Tspan:val.Tspan,
      gspan:val.gspan
    };
    console.log(val.skills)
    if (currentUser) {
      await saveData(currentUser, upd); // Use 'await' to make sure the data is saved before resetting the form
    }

    resetForm();
    setLoading(true)
    router.push('/re1')
  };
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  
  return (
    <Flex align="center" justify="center" h="100%" mt='5%'>
      <Box bg="gray.100" p={6} rounded="15px" w={"680px"}>
       
        <Formik
          initialValues={{
            email: "",
            grad:"",
            obj: "",
            mobnum: "",
            firstname: "",
            lastname: "",
            schper12:"",
            school12:"",
            schper:"",
            school:"",
            address:"",
            grad_per:"",
            skills:"",
            exp:"",
            role:"",
            schspan:"",
            Tspan:"",
            gspan:"",
          }}
          validationSchema={vaildateSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <VStack spacing={4} align="flex-start">
               <Text>Personal</Text>
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
                      label="Objective"
                      id="obj"
                      name="obj"
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
                <HStack w="100%">
                  <Formi
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                  <Formi
                    label="Address"
                    id="address"
                    name="address"
                    type="text"
                    variant="filled"
                  />
                </HStack>
               <Stack w='100%'>
                <Text>Education</Text>
               <HStack w="100%">
                  <Formi
                    label="School"
                    id="school"
                    name="school"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="Percentage"
                    id="schper"
                    name="schper"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="(eg:2010-2014)"
                    id="schspan"
                    name="schspan"
                    type="text"
                    variant="filled"
                  />
                </HStack>
                <HStack w="100%">
                  <Formi
                    label="12th"
                    id="school12"
                    name="school12"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="Percentage"
                    id="schper12"
                    name="schper12"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="(eg:2010-2014)"
                    id="Tspan"
                    name="Tspan"
                    type="text"
                    variant="filled"
                  />
                </HStack>
                <HStack w="100%">
                  <Formi
                    label="Graduation"
                    id="grad"
                    name="grad"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="Percentage"
                    id="grad_per"
                    name="grad_per"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="(eg:2010-2014)"
                    id="gspan"
                    name="gspan"
                    type="text"
                    variant="filled"
                  />
                </HStack>
               </Stack>
                <Stack w='100%'>
              <HStack>
              <Text>Professional</Text>
                    <Text fontSize='12px' as='b'>Note: (Divide each skill with &quot; , &quot; simularily in Experiance)</Text>
              </HStack>
                <HStack w="100%">
                  <Formi
                    label="Skills(eg: web,android)"
                    id="skills"
                    name="skills"
                    type="text"
                    variant="filled"
                  />
                  <Formi
                    label="Any work experience"
                    id="exp"
                    name="exp"
                    type="text"
                    variant="filled"
                  />
                </HStack>
                <HStack w="100%">
                  <Formi
                    label="Applying for Role"
                    id="role"
                    name="role"
                    type="text"
                    variant="filled"
                  />
                  
                </HStack>
                </Stack>
                <Button
                  type="submit"
                  isLoading={loading?true:false}
                  bg="#FA643F"
                  w="full"
                  _hover={{ bg: "#FF5757" }}
                >
                  Create Resume
                </Button>
              
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
