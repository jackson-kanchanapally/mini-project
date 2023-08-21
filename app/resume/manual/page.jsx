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
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UserAuth } from "@/app/context/AuthContext";
import { ResumeCon } from "@/app/context/ResumeContext";
import Formi from "@/app/components/Form";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function Manpage() {
  const [loginEr, setLoginEr] = React.useState("");
  const { user } = UserAuth();
  const [loading, setLoading] = React.useState(false);
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
      console.log("Lov Error", err);
    }
  }
  const router = useRouter();
  const vaildateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstname: Yup.string().required("name is required"),
    lastname: Yup.string().required("Last name is required"),
    grad: Yup.string().required("Graduation year is required"),
    obj: Yup.string().required("Objective is required"),
    mobnum: Yup.number().required("Mobile number is required"),
    schper12: Yup.number().required("School percentage (12th) is required"),
    school12: Yup.string().required("School (12th) is required"),
    schper: Yup.number().required("School percentage is required"),
    school: Yup.string().required("School is required"),
    address: Yup.string().required("Address is required"),
    grad_per: Yup.number().required("Graduation percentage is required"),
    skills: Yup.string().required("Skills are required"),
    // skills: Yup.array().of(Yup.string().required('At least one skill is required')),
  });
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const [selectedOption, setSelectedOption] = React.useState("re1");
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
      skills: val.skills.split(",").map((skill) => skill.trim()),
      // exp: val.exp,
      role: val.role,
      schspan: val.schspan,
      Tspan: val.Tspan,
      gspan: val.gspan,
      comname: val.comname,
      comname2: val.comname2,
      comname3: val.comname3,
      rolew: val.rolew,
      rolew2: val.rolew2,
      rolew3: val.rolew3,
      workspan: val.workspan,
      workspan2: val.workspan2,
      workspan3: val.workspan3,
      jr1: val.jr1,
      jr2: val.jr2,
      jr3: val.jr3,
    };
    console.log(val.skills);
    if (currentUser) {
      await saveData(currentUser, upd);
    }

    resetForm();
    setLoading(true);
    router.push(`/${selectedOption}`);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Flex align="center" justify="center" h="100%" mt="5%">
      <Box bg="gray.100" p={6} rounded="15px" w={"680px"}>
        <Formik
          initialValues={{
            email: "",
            grad: "",
            obj: "",
            mobnum: "",
            firstname: "",
            lastname: "",
            schper12: "",
            school12: "",
            schper: "",
            school: "",
            address: "",
            grad_per: "",
            skills: "",
            // exp:"",
            role: "",
            schspan: "",
            Tspan: "",
            gspan: "",
            comname: "",
            comname2: "",
            comname3: "",
            rolew: "",
            rolew2: "",
            rolew3: "",
            workspan: "",
            workspan2: "",
            workspan3: "",
            jr1: "",
            jr2: "",
            jr3: "",
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
                <Stack w="100%">
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
                <Stack w="100%">
                  <HStack>
                    <Text>Professional</Text>
                    <Text fontSize="12px" as="b">
                      Note: (Divide each skill with &quot; , &quot; simularily
                      in Experiance)
                    </Text>
                  </HStack>
                  <HStack w="100%">
                    <Formi
                      label="Skills(eg: web,android)"
                      id="skills"
                      name="skills"
                      type="text"
                      variant="filled"
                    />
                    <HStack w="100%">
                      <Formi
                        label="Applying for Role"
                        id="role"
                        name="role"
                        type="text"
                        variant="filled"
                      />
                    </HStack>
                  </HStack>
                  <Text fontSize="14px">
                    Mention about your past experiences (Max 3). If you are an
                    Fresher igonore it{" "}
                  </Text>
                  <HStack>
                    <Formi
                      label="Company Name"
                      id="comname"
                      name="comname"
                      type="text"
                      variant="filled"
                    />
                    <Formi
                      label="Role worked as"
                      id="rolew"
                      name="rolew"
                      type="text"
                      variant="filled"
                    />
                    <Formi
                      label="Work span 2018-2020"
                      id="workspan"
                      name="workspan"
                      type="text"
                      variant="filled"
                    />
                  </HStack>
                  <Formi
                    label="Job Description"
                    id="jr1"
                    name="jr1"
                    type="text"
                    variant="filled"
                  />
                  <HStack>
                    <Formi
                      label="Company Name"
                      id="comname2"
                      name="comname2"
                      type="text"
                      variant="filled"
                    />
                    <Formi
                      label="Role worked as"
                      id="rolew2"
                      name="rolew2"
                      type="text"
                      variant="filled"
                    />
                    <Formi
                      label="Work span 2018-2020"
                      id="workspan2"
                      name="workspan2"
                      type="text"
                      variant="filled"
                    />
                  </HStack>
                  <Formi
                    label="Job Description"
                    id="jr2"
                    name="jr2"
                    type="text"
                    variant="filled"
                  />
                  <HStack>
                    <Formi
                      label="Company Name"
                      id="comname3"
                      name="comname3"
                      type="text"
                      variant="filled"
                    />
                    <Formi
                      label="Role worked as"
                      id="rolew3"
                      name="rolew3"
                      type="text"
                      variant="filled"
                    />
                    <Formi
                      label="Work span 2018-2020"
                      id="workspan3"
                      name="workspan3"
                      type="text"
                      variant="filled"
                    />
                  </HStack>
                  <Formi
                    label="Job Description"
                    id="jr3"
                    name="jr3"
                    type="text"
                    variant="filled"
                  />
                  <Box>
                    <Flex
                      ml="20px"
                      w="100%"
                      h="100%"
                      bg="gray.100"
                      
                      justifyContent="center"
                   
                    >
                      <Box>
                        <Img src="/samp1.jpg" alt="Theme 1" w="100px" />
                        <Text textAlign="center">Theme 1</Text>
                      </Box>
                      <Box ml='20px'>
                        <Img src="/samp2.jpg" w="100px" alt="Theme 2" />
                        <Text textAlign="center">Theme 2</Text>
                      </Box>
                    </Flex>
                    <Select
                      value={selectedOption}
                      onChange={handleSelectChange}
                      placeholder="Select a theme"
                    >
                      <option value="re1">Theme 1</option>
                      <option value="re2">Theme 2</option>
                    </Select>
                  </Box>
                </Stack>
                <Button
                  type="submit"
                  isLoading={loading ? true : false}
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
