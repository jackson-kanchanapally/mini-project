'use client'
import { Box, Button, Flex, Text, VStack, chakra, Image,Spinner} from "@chakra-ui/react";
import { Formik, Field,Form } from "formik";
import React,{useState} from 'react'
// import Formi from "../../components/Form";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation'
import {auth} from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import Formi from "@/app/components/Form";
// import Image from 'next/image'
export default function Login() {
  const [loginEr,setLoginEr]=useState('')
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  React.useEffect(() => {
    setLoading(false); 
  }, []);

  const onSubmit=async(val,{resetForm})=>{
      signInWithEmailAndPassword(auth,val.email,val.password)
      .then(()=>{
        router.push('/')
      }).catch((err)=>{
        if (err && err.code === 'auth/wrong-password') {
          setLoginEr('Wrong password.');
          } else{
            setLoginEr(`Error ${err}`);
            };
      })
  }
  const Img = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  const {user}=UserAuth()

  // const handleSignIn=async()=>{
  //   try{
  //     await googleSignIn()

  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  // const handleSignOut=async()=>{
  //   try{
  //     await logOut()
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }

  return (
    <Flex align="center" justify="center" h="90vh">
      {loading ? (
          <Spinner size="xl" color="gray.500" />
        ) :
     (<Box bg="gray.100" p={6} rounded="15px" w={'380px'}>
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
              {/* <Button onClick={handleSignIn}>Login with Google</Button> */}
              {loginEr===''?'':<Text m='auto' color='red' fontSize='15px'>&#9888; {loginEr}</Text>}
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>)}
  </Flex>
  )
}