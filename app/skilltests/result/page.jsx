'use client'
import React,{useEffect,useState} from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { Text } from '@chakra-ui/react';
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebaseConfig"
export default function ResultPage() {
  const [userData, setUserData] = useState(null);
  const { user } = UserAuth();
  useEffect(() => {
    if (user) {
      async function fetchUserData(uid) {
        try {
          const userDocRef = doc(db, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log('User data not found');
          }
        } catch (err) {
          console.log(err);
        }
      }

      fetchUserData(user.uid);
    }
  }, [user]);
  return (
   <Text>{userData?.result}</Text>
  )
}
