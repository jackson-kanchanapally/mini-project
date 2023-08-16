// 'use client'
// import React, { useEffect, useState } from "react";
// import { db, doc, onSnapshot } from "@/app/firebaseConfig"; // Adjust imports as needed
// import { UserAuth } from "@/app/context/AuthContext";

// export default function ResumeDisplay() {
//   const { user } = UserAuth();
//   const [resumeData, setResumeData] = useState(null);

//   useEffect(() => {
//     let unsubscribe;

//     if (user) {
//       const userDocRef = doc(db, "users", user.uid);

//       unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           const data = docSnapshot.data();
//           setResumeData(data);
//         } else {
//           console.log("No document found");
//         }
//       });
//     }

//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, [user]);

//   if (!resumeData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Resume Details</h2>
//       <p>Email: {resumeData.email}</p>
//       <p>First Name: {resumeData.firstname}</p>
//       {/* Display other resume data as needed */}
//     </div>
//   );
// }
