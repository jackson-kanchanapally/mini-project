import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import {db} from '../firebaseConfig'
import { collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,} from 'firebase/firestore'

export default function SkillPerform({ cou }) {
  const data = {
    qu: {
      categories: [
        {
          name: "Frontend Development",
          questions: [
            {
              question: "What is the purpose of a 'media query' in CSS?",
              options: [
                "To define keyframes for animations",
                "To create responsive layouts based on screen size",
                "To optimize images for web use",
                "To format text content",
              ],
              answer: "To create responsive layouts based on screen size",
            },
            {
              question: "What is the CSS 'box-shadow' property used for?",
              options: [
                "Creating gradient backgrounds",
                "Applying rounded corners to elements",
                "Styling text content",
                "Adding shadows to elements",
              ],
              answer: "Adding shadows to elements",
            },
            {
              question:
                "What does the 'transform' property in CSS allow you to do?",
              options: [
                "Adjust the opacity of an element",
                "Translate, rotate, scale, and skew elements",
                "Change the font family of text",
                "Position elements absolutely",
              ],
              answer: "Translate, rotate, scale, and skew elements",
            },
            {
              question:
                "In JavaScript, what is a 'closure' and how is it useful?",
              options: [
                "A function that returns a boolean value",
                "An event that occurs when the page loads",
                "A way to limit the scope of variables",
                "A function that retains access to its outer function's scope",
              ],
              answer:
                "A function that retains access to its outer function's scope",
            },
            {
              question: "What is the purpose of 'debouncing' in JavaScript?",
              options: [
                "Optimizing database queries",
                "Managing asynchronous requests",
                "Preventing excessive function calls in a short period",
                "Creating custom error messages",
              ],
              answer: "Preventing excessive function calls in a short period",
            },
            {
              question:
                "What is the 'virtual DOM' and how does it improve performance in React?",
              options: [
                "A concept for organizing CSS files",
                "A lightweight version of the actual DOM",
                "A technique for server-side rendering",
                "A design pattern for managing state in components",
              ],
              answer: "A lightweight version of the actual DOM",
            },
            {
              question: "What is a 'Promise' in JavaScript and how is it used?",
              options: [
                "A way to define variables",
                "A function for declaring event listeners",
                "An object representing a value that might be available in the future",
                "A technique for creating loops",
              ],
              answer:
                "An object representing a value that might be available in the future",
            },
            {
              question:
                "In CSS Grid, what does the 'grid-template-areas' property allow you to do?",
              options: [
                "Create responsive typography",
                "Define the alignment of grid items",
                "Specify the order of grid items",
                "Create custom layouts by naming and placing grid areas",
              ],
              answer: "Create custom layouts by naming and placing grid areas",
            },
            {
              question: "What is the purpose of 'memoization' in JavaScript?",
              options: [
                "A technique for optimizing CSS animations",
                "A design pattern for structuring components",
                "A way to cache and reuse the results of expensive function calls",
                "A technique for handling asynchronous requests",
              ],
              answer:
                "A way to cache and reuse the results of expensive function calls",
            },
            {
              question:
                "What is the role of 'redux-saga' in React applications?",
              options: [
                "A library for managing internationalization",
                "A tool for automating deployment",
                "A state management library for React",
                "A middleware for managing side effects like asynchronous actions",
              ],
              answer:
                "A middleware for managing side effects like asynchronous actions",
            },
          ],
        },
        {
          name: "Backend Development",
          questions: [
            {
              question:
                "What is the primary purpose of a backend in web development?",
              options: [
                "Managing frontend layout and design",
                "Handling user interactions and UI components",
                "Storing and processing data, logic, and security",
                "Optimizing network latency for better performance",
              ],
              answer: "Storing and processing data, logic, and security",
            },
            {
              question:
                "In backend development, what does 'Node.js' primarily enable you to do?",
              options: [
                "Create interactive user interfaces",
                "Manage frontend layout and design",
                "Build server-side applications using JavaScript",
                "Optimize CSS stylesheets for performance",
              ],
              answer: "Build server-side applications using JavaScript",
            },
            {
              question:
                "What is the role of 'Databases' in backend development?",
              options: [
                "Handling frontend logic",
                "Creating responsive UI designs",
                "Storing and retrieving data",
                "Managing user authentication",
              ],
              answer: "Storing and retrieving data",
            },
            {
              question:
                "What is the purpose of 'API Design and RESTful Architecture'?",
              options: [
                "Creating dynamic user interfaces",
                "Managing backend server performance",
                "Defining standards for communication between systems",
                "Optimizing database queries",
              ],
              answer: "Defining standards for communication between systems",
            },
            {
              question:
                "Why is 'Authentication and Authorization' important in backend development?",
              options: [
                "To secure frontend assets",
                "To improve user experience",
                "To optimize server performance",
                "To control access to resources and data",
              ],
              answer: "To control access to resources and data",
            },
            {
              question:
                "What is the purpose of 'Server Deployment and Hosting'?",
              options: [
                "Optimizing frontend code",
                "Managing database queries",
                "Ensuring server uptime and availability",
                "Enhancing user interface interactions",
              ],
              answer: "Ensuring server uptime and availability",
            },
            {
              question: "In backend development, what is a 'Webhook' used for?",
              options: [
                "Optimizing frontend performance",
                "Scheduling automated tasks",
                "Handling real-time communication between clients and servers",
                "Receiving and responding to HTTP notifications",
              ],
              answer: "Receiving and responding to HTTP notifications",
            },
            {
              question:
                "What is the purpose of 'Load Balancing' in backend server architecture?",
              options: [
                "Storing client-side data",
                "Optimizing frontend rendering",
                "Distributing incoming traffic across multiple servers",
                "Managing CSS styles",
              ],
              answer: "Distributing incoming traffic across multiple servers",
            },
            {
              question: "What is 'Middleware' in backend development?",
              options: [
                "Software for managing frontend libraries",
                "A type of database engine",
                "A layer of code that sits between the frontend and backend",
                "A technique for optimizing CSS styles",
              ],
              answer:
                "A layer of code that sits between the frontend and backend",
            },
            {
              question:
                "What is the purpose of 'Caching' in backend development?",
              options: [
                "Managing server hosting",
                "Improving user interface design",
                "Storing frontend assets",
                "Reducing database load and improving performance",
              ],
              answer: "Reducing database load and improving performance",
            },
          ],
        },
        {
          name: "Full Stack Development",
          questions: [
            {
              question:
                "What is the role of a 'Full Stack Developer' in web development?",
              options: [
                "Focusing solely on frontend user interface design",
                "Managing only server-side logic and databases",
                "Working on both frontend and backend aspects of applications",
                "Optimizing network performance",
              ],
              answer:
                "Working on both frontend and backend aspects of applications",
            },
            {
              question:
                "What does 'Combining Frontend and Backend Skills' involve?",
              options: [
                "Learning multiple programming languages simultaneously",
                "Blending UI design with server configuration",
                "Applying both client-side and server-side development knowledge",
                "Using JavaScript for backend programming",
              ],
              answer:
                "Applying both client-side and server-side development knowledge",
            },
            {
              question:
                "In 'Building Full Stack Applications', what is the significance of 'MVC' architecture?",
              options: [
                "Managing visual content",
                "Organizing frontend assets",
                "Separating application logic into Model, View, and Controller components",
                "Optimizing CSS styles",
              ],
              answer:
                "Separating application logic into Model, View, and Controller components",
            },
            {
              question:
                "When 'Working with Different Databases', what is an advantage of using a NoSQL database over a traditional SQL database?",
              options: [
                "Higher data integrity",
                "More complex query capabilities",
                "Simplified data modeling and flexible schema",
                "Better performance for complex joins",
              ],
              answer: "Simplified data modeling and flexible schema",
            },
            {
              question:
                "What is the primary purpose of 'Version Control and Collaboration' tools in full stack development?",
              options: [
                "Optimizing frontend rendering",
                "Managing database queries",
                "Tracking changes to code and collaborating with team members",
                "Enhancing user interface interactions",
              ],
              answer:
                "Tracking changes to code and collaborating with team members",
            },
            {
              question:
                "In 'Understanding Client-Server Interaction', what role does an 'API' play?",
              options: [
                "Optimizing frontend performance",
                "Managing backend server hosting",
                "Defining communication protocols between clients and servers",
                "Creating user interfaces",
              ],
              answer:
                "Defining communication protocols between clients and servers",
            },
            {
              question:
                "When 'Building Full Stack Applications', what is the purpose of 'dependency injection'?",
              options: [
                "Optimizing frontend code",
                "Managing frontend state",
                "Injecting external libraries into the backend",
                "Passing dependencies to components for better modularity",
              ],
              answer:
                "Passing dependencies to components for better modularity",
            },
            {
              question:
                "In 'Working with Different Databases', what is a 'migration'?",
              options: [
                "A technique for moving data between frontend and backend",
                "A way to update database software",
                "A script that automates the creation and modification of database schema",
                "A process for optimizing CSS styles",
              ],
              answer:
                "A script that automates the creation and modification of database schema",
            },
            {
              question:
                "What is the purpose of 'WebSockets' in 'Understanding Client-Server Interaction'?",
              options: [
                "Optimizing network latency",
                "Enabling asynchronous server operations",
                "Enhancing frontend design",
                "Implementing secure authentication",
              ],
              answer: "Enabling asynchronous server operations",
            },
            {
              question:
                "When 'Building Full Stack Applications', what is the significance of 'Containerization'?",
              options: [
                "Creating visually appealing user interfaces",
                "Improving frontend performance",
                "Isolating applications in lightweight, portable environments",
                "Optimizing database queries",
              ],
              answer:
                "Isolating applications in lightweight, portable environments",
            },
          ],
        },
        {
          name: "Android Development",
          questions: [
            {
              question:
                "In Android development, what is the purpose of 'Activities'?",
              options: [
                "Managing background services",
                "Creating UI layouts",
                "Storing data locally",
                "Representing a single screen with a user interface",
              ],
              answer: "Representing a single screen with a user interface",
            },
            {
              question:
                "What programming languages are commonly used for Android app development?",
              options: [
                "JavaScript and TypeScript",
                "Python and Ruby",
                "Java and Kotlin",
                "C# and .NET",
              ],
              answer: "Java and Kotlin",
            },
            {
              question: "What is the 'SDK' in Android development?",
              options: [
                "Software Development Kit",
                "System Design Knowledge",
                "Security Development Kit",
                "Software Deployment Kit",
              ],
              answer: "Software Development Kit",
            },
            {
              question: "What are 'Fragments' used for in Android development?",
              options: [
                "Handling background tasks",
                "Creating app icons",
                "Organizing UI components within an Activity",
                "Storing user preferences",
              ],
              answer: "Organizing UI components within an Activity",
            },
            {
              question:
                "In Android, what is the primary purpose of 'Services'?",
              options: [
                "Rendering user interfaces",
                "Managing user authentication",
                "Performing long-running operations in the background",
                "Optimizing network communication",
              ],
              answer: "Performing long-running operations in the background",
            },
            {
              question: "What is 'REST' in 'Networking and APIs'?",
              options: [
                "A programming language",
                "A design pattern for UI elements",
                "A protocol for network communication",
                "An Android development library",
              ],
              answer: "A protocol for network communication",
            },
            {
              question: "What does 'UI Design' involve in Android development?",
              options: [
                "Managing database operations",
                "Creating app icons",
                "Designing user interfaces and layouts",
                "Optimizing server performance",
              ],
              answer: "Designing user interfaces and layouts",
            },
            {
              question:
                "What is the 'Google Play Store' used for in Android development?",
              options: [
                "Testing app performance",
                "Managing user preferences",
                "Developing Android apps",
                "Distributing and publishing Android apps",
              ],
              answer: "Distributing and publishing Android apps",
            },
            {
              question: "In Android app deployment, what is an 'APK' file?",
              options: [
                "A file containing app data",
                "A configuration file for app settings",
                "An executable app package file",
                "A log file for app debugging",
              ],
              answer: "An executable app package file",
            },
            {
              question: "What is 'MVVM' architecture in Android development?",
              options: [
                "A design pattern for UI layouts",
                "A programming language",
                "A user interface framework",
                "A software architectural pattern",
              ],
              answer: "A software architectural pattern",
            },
          ],
        },
        {
          name: "Blockchain Development",
          questions: [
            {
              question:
                "What is the underlying technology behind blockchain that ensures data immutability?",
              options: [
                "Cryptocurrency mining",
                "Decentralized server architecture",
                "Consensus algorithms",
                "Artificial intelligence",
              ],
              answer: "Consensus algorithms",
            },
            {
              question: "In blockchain, what is a 'Smart Contract'?",
              options: [
                "A legally binding document",
                "A self-executing contract with predefined rules and actions",
                "A contract between blockchain nodes",
                "A digital signature for data integrity",
              ],
              answer:
                "A self-executing contract with predefined rules and actions",
            },
            {
              question:
                "What programming language is commonly used for writing 'Smart Contracts' on the Ethereum blockchain?",
              options: ["JavaScript", "Python", "Solidity", "Ruby"],
              answer: "Solidity",
            },
            {
              question:
                "What are 'Decentralized Applications (DApps)' in blockchain development?",
              options: [
                "Apps that require internet connection to function",
                "Apps that are stored on centralized servers",
                "Apps that run on a single device",
                "Apps that run on a blockchain network with no central control",
              ],
              answer:
                "Apps that run on a blockchain network with no central control",
            },
            {
              question: "Why is 'Blockchain Security' important?",
              options: [
                "To prevent cryptocurrency mining",
                "To ensure scalability of the network",
                "To protect against unauthorized access and tampering",
                "To increase the speed of transactions",
              ],
              answer: "To protect against unauthorized access and tampering",
            },
            {
              question: "What does 'Blockchain Integration' involve?",
              options: [
                "Combining blockchain with traditional centralized databases",
                "Creating new blockchain networks",
                "Developing blockchain wallets",
                "Optimizing frontend performance",
              ],
              answer:
                "Combining blockchain with traditional centralized databases",
            },
            {
              question: "What is the 'Consensus Mechanism' in blockchain?",
              options: [
                "A way to track transaction history",
                "The process of converting data to blocks",
                "A protocol for connecting to blockchain networks",
                "A method for achieving agreement on the state of the blockchain",
              ],
              answer:
                "A method for achieving agreement on the state of the blockchain",
            },
            {
              question: "What is a 'Public Key' in blockchain cryptography?",
              options: [
                "A secret key used for encryption",
                "A unique identifier for a blockchain node",
                "A mathematical function for hashing data",
                "An address for receiving cryptocurrency transactions",
              ],
              answer: "An address for receiving cryptocurrency transactions",
            },
            {
              question: "What is the purpose of the 'Gas' concept in Ethereum?",
              options: [
                "To fuel cryptocurrency mining",
                "To manage network congestion",
                "To control the blockchain's speed",
                "To regulate the price of cryptocurrencies",
              ],
              answer: "To manage network congestion",
            },
            {
              question:
                "How does a 'Private Blockchain' differ from a 'Public Blockchain'?",
              options: [
                "Private blockchains are open to anyone, while public blockchains are limited to specific users",
                "Public blockchains are faster and more secure than private blockchains",
                "Private blockchains are controlled by a central authority, while public blockchains are decentralized",
                "Public blockchains are used for internal organization purposes, while private blockchains are accessible by anyone",
              ],
              answer:
                "Private blockchains are controlled by a central authority, while public blockchains are decentralized",
            },
          ],
        },
        {
          name: "DevOps",
          questions: [
            {
              question: "What is the primary goal of 'DevOps'?",
              options: [
                "Optimizing frontend code",
                "Enhancing user interface design",
                "Improving collaboration between development and operations teams",
                "Automating server maintenance tasks",
              ],
              answer:
                "Improving collaboration between development and operations teams",
            },
            {
              question: "What does 'CI/CD' stand for in DevOps?",
              options: [
                "Client Interaction and Code Deployment",
                "Continuous Improvement and Continuous Development",
                "Continuous Integration and Continuous Deployment",
                "Code Inspection and Continuous Deployment",
              ],
              answer: "Continuous Integration and Continuous Deployment",
            },
            {
              question:
                "What is the purpose of 'Containerization' in DevOps using tools like Docker?",
              options: [
                "Managing user authentication",
                "Ensuring frontend performance",
                "Isolating and packaging applications with their dependencies",
                "Creating dynamic UI components",
              ],
              answer:
                "Isolating and packaging applications with their dependencies",
            },
            {
              question: "What is 'Infrastructure as Code (IaC)' in DevOps?",
              options: [
                "Storing user interface assets as code",
                "Storing and managing server configurations as code",
                "Automating frontend development workflows",
                "Developing code using infrastructure elements",
              ],
              answer: "Storing and managing server configurations as code",
            },
            {
              question: "Why is 'Monitoring and Logging' essential in DevOps?",
              options: [
                "To create interactive user interfaces",
                "To monitor server performance and detect issues",
                "To optimize frontend rendering",
                "To manage version control",
              ],
              answer: "To monitor server performance and detect issues",
            },
            {
              question: "What role do 'Cloud Services' play in DevOps?",
              options: [
                "Improving database performance",
                "Enhancing frontend design",
                "Providing scalable infrastructure and services",
                "Optimizing network connections",
              ],
              answer: "Providing scalable infrastructure and services",
            },
            {
              question:
                "What is the primary advantage of using 'Infrastructure as Code' (IaC) tools?",
              options: [
                "Reducing developer collaboration",
                "Enabling manual server configuration",
                "Eliminating the need for version control",
                "Consistent and repeatable server provisioning",
              ],
              answer: "Consistent and repeatable server provisioning",
            },
            {
              question: "What does 'Blue-Green Deployment' refer to in DevOps?",
              options: [
                "Deploying applications on blue and green servers",
                "Creating visually appealing UI designs",
                "Switching between two cloud service providers",
                "Deploying new application versions alongside the existing version",
              ],
              answer:
                "Deploying new application versions alongside the existing version",
            },
            {
              question:
                "In DevOps, what is the main benefit of 'Continuous Monitoring'?",
              options: [
                "Optimizing frontend performance",
                "Ensuring consistent code deployment",
                "Enhancing user interface design",
                "Detecting and resolving issues in real-time",
              ],
              answer: "Detecting and resolving issues in real-time",
            },
            {
              question:
                "What is the concept of 'Infrastructure as Code' (IaC) commonly associated with?",
              options: [
                "Creating dynamic UI components",
                "Managing server configurations using version control",
                "Storing user interface assets as code",
                "Improving user authentication",
              ],
              answer: "Managing server configurations using version control",
            },
          ],
        },
        {
          name: "Data Structures",
          questions: [
            {
              question:
                "In data structures, what is the primary purpose of 'Arrays'?",
              options: [
                "Storing hierarchical data",
                "Storing key-value pairs",
                "Storing ordered collections of items",
                "Storing network connections",
              ],
              answer: "Storing ordered collections of items",
            },
            {
              question:
                "Which data structure follows the 'Last In, First Out' (LIFO) principle?",
              options: ["Queue", "Stack", "Linked List", "Array"],
              answer: "Stack",
            },
            {
              question:
                "What do 'Trees' and 'Graphs' represent in data structures?",
              options: [
                "Hierarchical structures",
                "Linear structures",
                "Unordered collections",
                "Network connections",
              ],
              answer: "Hierarchical structures",
            },
            {
              question:
                "What is the primary purpose of 'Hashing and Hash Tables'?",
              options: [
                "Storing complex data structures",
                "Storing ordered collections",
                "Storing unordered collections",
                "Storing network connections",
              ],
              answer: "Storing unordered collections",
            },
            {
              question:
                "Which algorithm rearranges elements in a particular order, often in ascending or descending?",
              options: [
                "Sorting Algorithm",
                "Searching Algorithm",
                "Hashing Algorithm",
                "Merging Algorithm",
              ],
              answer: "Sorting Algorithm",
            },
            {
              question:
                "What is the purpose of 'Complexity Analysis' in data structures and algorithms?",
              options: [
                "Measuring the complexity of UI design",
                "Analyzing the performance of software",
                "Estimating project timelines",
                "Defining the complexity of database queries",
              ],
              answer: "Analyzing the performance of software",
            },
            {
              question: "In data structures, what is a 'Linked List'?",
              options: [
                "A linear data structure with a fixed size",
                "A collection of key-value pairs",
                "A hierarchical structure",
                "A linear data structure consisting of nodes connected by pointers",
              ],
              answer:
                "A linear data structure consisting of nodes connected by pointers",
            },
            {
              question: "What is the purpose of a 'Queue' data structure?",
              options: [
                "Storing key-value pairs",
                "Storing elements in a random order",
                "Implementing 'Last In, First Out' (LIFO) behavior",
                "Implementing 'First In, First Out' (FIFO) behavior",
              ],
              answer: "Implementing 'First In, First Out' (FIFO) behavior",
            },
            {
              question: "What is a common use case for 'Hash Tables'?",
              options: [
                "Storing sorted data",
                "Implementing stacks and queues",
                "Searching for specific elements in large datasets",
                "Storing elements in a random order",
              ],
              answer: "Searching for specific elements in large datasets",
            },
            {
              question: "In data structures, what is the purpose of 'Graphs'?",
              options: [
                "Representing hierarchical relationships",
                "Storing ordered collections",
                "Representing networks of interconnected nodes",
                "Storing key-value pairs",
              ],
              answer: "Representing networks of interconnected nodes",
            },
          ],
        },
        {
          name: "Artificial Intelligence (AI)",
          questions: [
            {
              question:
                "What is the primary focus of 'Artificial Intelligence (AI)'?",
              options: [
                "Creating user interfaces",
                "Enhancing backend performance",
                "Simulating human intelligence in machines",
                "Optimizing network connections",
              ],
              answer: "Simulating human intelligence in machines",
            },
            {
              question:
                "What is the primary concept behind 'Machine Learning'?",
              options: [
                "Automating backend processes",
                "Simulating human behavior",
                "Enabling machines to learn from data",
                "Optimizing frontend code",
              ],
              answer: "Enabling machines to learn from data",
            },
            {
              question:
                "What is the purpose of 'Deep Learning and Neural Networks'?",
              options: [
                "Creating interactive user interfaces",
                "Building advanced backend systems",
                "Analyzing network performance",
                "Recognizing patterns and features in data",
              ],
              answer: "Recognizing patterns and features in data",
            },
            {
              question:
                "Which AI subfield focuses on enabling machines to understand, interpret, and generate human language?",
              options: [
                "Robotics",
                "Natural Language Processing (NLP)",
                "Image Recognition",
                "Machine Vision",
              ],
              answer: "Natural Language Processing (NLP)",
            },
            {
              question:
                "What is the role of 'AI Ethics and Bias' in artificial intelligence development?",
              options: [
                "Enhancing machine learning models",
                "Managing backend servers",
                "Addressing ethical concerns and biases in AI systems",
                "Improving frontend performance",
              ],
              answer: "Addressing ethical concerns and biases in AI systems",
            },
            {
              question:
                "What is the process of making AI models available for use by other applications?",
              options: [
                "AI Code Generation",
                "AI Model Distribution",
                "AI Model Deployment",
                "AI Model Export",
              ],
              answer: "AI Model Deployment",
            },
            {
              question:
                "Which AI technique is used for training models to improve their performance over time without explicit programming?",
              options: [
                "Supervised Learning",
                "Unsupervised Learning",
                "Reinforcement Learning",
                "Semi-Supervised Learning",
              ],
              answer: "Reinforcement Learning",
            },
            {
              question:
                "What does 'Neural Network Activation Function' determine in deep learning?",
              options: [
                "The number of layers in a neural network",
                "The type of data used for training",
                "The speed of training",
                "The output of a neuron based on input",
              ],
              answer: "The output of a neuron based on input",
            },
            {
              question:
                "What is the goal of 'Transfer Learning' in machine learning?",
              options: [
                "Training a model with a large dataset",
                "Sharing machine learning models among different teams",
                "Adapting knowledge from one task to improve learning on another task",
                "Creating ensemble models",
              ],
              answer:
                "Adapting knowledge from one task to improve learning on another task",
            },
            {
              question: "In AI, what is the purpose of the 'Turing Test'?",
              options: [
                "Evaluating the computational power of a machine",
                "Assessing the efficiency of algorithms",
                "Determining if a machine can exhibit human-like intelligence",
                "Measuring the accuracy of machine learning models",
              ],
              answer:
                "Determining if a machine can exhibit human-like intelligence",
            },
          ],
        },
        {
          name: "Cloud Computing",
          questions: [
            {
              question:
                "What is the main advantage of using 'Cloud Service Providers' like AWS, Azure, and GCP?",
              options: [
                "Optimizing frontend performance",
                "Eliminating the need for backend development",
                "Providing scalable infrastructure and services",
                "Enhancing user interface design",
              ],
              answer: "Providing scalable infrastructure and services",
            },
            {
              question:
                "In cloud computing, what does 'Virtualization' refer to?",
              options: [
                "Creating virtual user interfaces",
                "Simulating human behavior",
                "Creating virtual machines on physical hardware",
                "Optimizing network connections",
              ],
              answer: "Creating virtual machines on physical hardware",
            },
            {
              question:
                "What is the primary purpose of 'Containers' in cloud computing?",
              options: [
                "Managing frontend user interfaces",
                "Isolating and packaging applications with their dependencies",
                "Automating server maintenance tasks",
                "Optimizing database queries",
              ],
              answer:
                "Isolating and packaging applications with their dependencies",
            },
            {
              question:
                "What is 'Serverless Computing' in the context of cloud services?",
              options: [
                "Hosting applications on physical servers",
                "Running applications without backend code",
                "Using servers with unlimited resources",
                "Automating frontend development tasks",
              ],
              answer: "Running applications without backend code",
            },
            {
              question:
                "What is the role of 'Cloud Storage' in cloud computing?",
              options: [
                "Optimizing frontend rendering",
                "Storing frontend assets like images and stylesheets",
                "Storing and managing data in the cloud",
                "Creating user interfaces using cloud resources",
              ],
              answer: "Storing and managing data in the cloud",
            },
            {
              question:
                "What does 'Security and Compliance' involve in cloud computing?",
              options: [
                "Enhancing user interface design",
                "Ensuring consistent code deployment",
                "Managing frontend servers",
                "Implementing measures to protect data and meet regulatory requirements",
              ],
              answer:
                "Implementing measures to protect data and meet regulatory requirements",
            },
            {
              question:
                "What is the purpose of 'Auto Scaling' in cloud computing?",
              options: [
                "Adjusting frontend performance based on user behavior",
                "Automating frontend code deployment",
                "Scaling server resources up or down based on demand",
                "Managing cloud storage quotas",
              ],
              answer: "Scaling server resources up or down based on demand",
            },
            {
              question:
                "What is the main benefit of using 'Serverless Computing'?",
              options: [
                "Reducing the need for version control",
                "Eliminating the need for frontend development",
                "Reducing server maintenance tasks",
                "Paying only for the actual resources used",
              ],
              answer: "Paying only for the actual resources used",
            },
            {
              question:
                "What is the concept of 'Infrastructure as Code' (IaC) in cloud computing?",
              options: [
                "Storing and managing server configurations as code",
                "Creating dynamic UI components",
                "Storing user interface assets as code",
                "Managing frontend serverless functions",
              ],
              answer: "Storing and managing server configurations as code",
            },
            {
              question:
                "What does 'Network Virtualization' involve in cloud computing?",
              options: [
                "Creating virtual user interfaces",
                "Simulating human behavior",
                "Creating virtual networks with software",
                "Optimizing database queries",
              ],
              answer: "Creating virtual networks with software",
            },
          ],
        },
      ],
    },
  };
  //const {user}=UserAuth()
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [result, setResult] = useState(0);
  const handleValueChange = (questionIndex, selectedValue) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = selectedValue;
      return updatedAnswers;
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault()
    const correctAnswers = data.qu.categories
      .find((category) => category.name === cou)
      .questions.map((ques) => ques.answer);

    const score = selectedAnswers.reduce(
      (acc, selectedAnswer, index) =>
        acc + (selectedAnswer === correctAnswers[index] ? 1 : 0),
      0
    );

    setResult((score / correctAnswers.length) * 100);
    await addDoc(collection(db,'result'),{
      //user:user.email,
      result:result
    })

  };
  return (
    <Flex justify="center" align="center" w='100%'>
      <Stack direction="column" w="800px">
        {data.qu.categories.map(
          (category) =>
            category.name === cou && (
              <Stack
                key={category.name}
                direction="column"
                m="auto"
                bg="gray.300"
                p="20px"
                borderRadius="10px"
              >
                <Text fontWeight="bold">{category.name}</Text>
                {category.questions.map((ques, index) => (
                  <Stack key={index} bg="white" p="20px" borderRadius="10px">
                    <Text as="b">
                      {index + 1}. {ques.question}
                    </Text>
                    <RadioGroup
                      value={selectedAnswers[index]}
                      onChange={(selectedValue) =>
                        handleValueChange(index, selectedValue)
                      }
                    >
                      <Stack>
                        {ques.options.map((q, optionIndex) => (
                          <Radio
                            key={optionIndex}
                            value={q}
                            colorScheme="teal" // Use a valid colorScheme
                          >
                            {optionIndex + 1}. {q}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Stack>
                ))}
              </Stack>
            )
        )}
        <Button
            bg="#FA643F"
            _hover={{ bg: "#FF5757" }}variant
          mt="20px"
          mb="30px"
          onClick={handleSubmit}
        >
          Submit
        </Button>
       
      </Stack>
    </Flex>
  );
}