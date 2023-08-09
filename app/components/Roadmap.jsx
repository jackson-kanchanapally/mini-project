"use client";
import {
  Box,
  Flex,
  Progress,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineDone } from "react-icons/md";
export default function Roadmap({ cou }) {
  const data = {
    roadmap: {
      categories: [
        {
          name: "Frontend Development",
          courses: [
            "HTML and CSS Fundamentals",
            "JavaScript Basics",
            "Responsive Web Design",
            "CSS Preprocessors ( Sass)",
            "Frontend Frameworks (React)",
            "Web Performance Optimization",
            "Version Control (Git)",
          ],
        },
        {
          name: "Backend Development",
          courses: [
            "Introduction to Backend Technologies",
            "Server-side Programming ( Node.js)",
            "Databases and SQL",
            "API Design and RESTful Architecture",
            "Authentication and Authorization",
            "Server Deployment and Hosting",
          ],
        },
        {
          name: "Full Stack Development",
          courses: [
            "Combining Frontend and Backend Skills",
            "Building Full Stack Applications",
            "Working with Different Databases",
            "Version Control and Collaboration",
            "Understanding Client-Server Interaction",
          ],
        },
        {
          name: "Android Development",
          courses: [
            "Java/Kotlin Programming",
            "Android Studio and SDK",
            "User Interface Design",
            "App Components (Activities, Fragments, Services)",
            "Networking and APIs",
            "App Deployment to Google Play Store",
          ],
        },
        {
          name: "Blockchain Development",
          courses: [
            "Introduction to Blockchain Technology",
            "Smart Contracts and Solidity",
            "Decentralized Applications (DApps)",
            "Blockchain Security",
            "Blockchain Integration",
          ],
        },
        {
          name: "DevOps",
          courses: [
            "Introduction to DevOps Principles",
            "Continuous Integration and Continuous Deployment (CI/CD)",
            "Containerization (e.g., Docker)",
            "Infrastructure as Code (IaC)",
            "Monitoring and Logging",
            "Cloud Services and Deployment",
          ],
        },
        {
          name: "Data Structures",
          courses: [
            "Arrays and Linked Lists",
            "Stacks and Queues",
            "Trees and Graphs",
            "Hashing and Hash Tables",
            "Sorting and Searching Algorithms",
            "Complexity Analysis",
          ],
        },
        {
          name: "Artificial Intelligence (AI)",
          courses: [
            "Introduction to AI Concepts",
            "Machine Learning Basics",
            "Deep Learning and Neural Networks",
            "Natural Language Processing (NLP)",
            "AI Ethics and Bias",
            "AI Model Deployment",
          ],
        },
        {
          name: "Cloud Computing",
          courses: [
            "Cloud Service Providers (e.g., AWS, Azure, GCP)",
            "Virtualization and Containers",
            "Cloud Storage and Networking",
            "Serverless Computing",
            "Managing Cloud Resources",
            "Security and Compliance in the Cloud",
          ],
        },
      ],
    },
    
  };
  const [complete, setComplete] = React.useState([]);
  const [courseLen, setCourseLen] = React.useState(0);
  
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    // Update the course length whenever the category changes
    const category = data.roadmap.categories.find((c) => c.name === cou);
    if (category) {
      setCourseLen(category.courses.length);
    }
    setComplete([])
    setActiveIndex(0)
  }, [cou]);
  const handleCheckboxChange = (index, course) => {
    if (index === activeIndex) {
      if (!complete.includes(course)) {
        setComplete((prevComplete) => [...prevComplete, course]);
      } else {
        setComplete((prevComplete) => prevComplete.filter((c) => c !== course));
      }
      setActiveIndex(index + 1);
    }
  };
  const isAllCheckboxesFilled = complete.length === courseLen;
  return (
    <Flex>
      <Box bg="gray.100" borderRadius="10px" mt="30px">
        {data.roadmap.categories.map((roadmap) => (
          <Box key={roadmap.name}>
            <TableContainer>
              {roadmap.name === cou
                ? roadmap.courses.map((course, index) => (
                    <Table key={index} variant="none">
                      <Tbody>
                        <Td>{course}</Td>
                        <Td textAlign="right">
                          <Checkbox
                            value={course}
                            isChecked={complete.includes(course)}
                            
                            fontSize='1px'
                            onChange={() => handleCheckboxChange(index, course)}
                            isDisabled={index !== activeIndex}
                          >
                            <MdOutlineDone size="30px" />
                          </Checkbox>{" "}
                        </Td>
                      </Tbody>
                    </Table>
                  ))
                : ""}
            </TableContainer>
          </Box>
        ))}
        <Button
         isDisabled={!isAllCheckboxesFilled}
          my="10px"
          bg="#FA643F"
          w="full"
          _hover={{ bg: "#FF5757" }}
        >
          Take Test
        </Button>
        <Progress
            value={(complete.length / courseLen) * 100}
          borderRadius="10px"
          colorScheme="red"
        />
      </Box>
    </Flex>
  );
}
