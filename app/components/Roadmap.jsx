"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Roadmap() {
  const data = {
    roadmap: {
      categories: [
        {
          name: "Frontend Development",
          courses: [
            "HTML and CSS Fundamentals",
            "JavaScript Basics",
            "Responsive Web Design",
            "CSS Preprocessors (e.g., Sass, Less)",
            "Frontend Frameworks (e.g., React, Vue, Angular)",
            "Web Performance Optimization",
            "Version Control (e.g., Git)",
          ],
        },
        {
          name: "Backend Development",
          courses: [
            "Introduction to Backend Technologies",
            "Server-side Programming (e.g., Node.js, Python, Ruby)",
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

  return (
    <Flex>
      <Box>
        {data.roadmap.categories.map((roadmap) => (
          <Box key={roadmap.name}>
            <Text>Name= {roadmap.name}</Text>

            {roadmap.courses.map((course, index) => (
              <Box m='20px' key={index}>{course}</Box>
            ))}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
