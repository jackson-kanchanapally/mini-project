"use client";
import {
  Flex,
  Box,
  Input,
  Table,
  Text,
  Select,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
const clgData = [
  {
    name: "IIT Madras",
    location: "Chennai",
    courses: [
      "Aerospace engineering",
      "Biological engineering",
      "Chemical engineering",
      "Civil engineering",
      "Computer science and engineering",
      "Electrical engineering",
      "Engineering physics",
      "Mechanical engineering",
      "Metallurgical and materials engineering",
      "Naval architecture and ocean engineering",
    ],
    gateCutoff: 180,
    fee: 840000,
    rating: 4.7,
  },
  {
    name: "IIT Delhi",
    location: "Delhi",
    courses: [
      "Biotechnology and Biochemical",
      "Chemical engineering",
      "Civil engineering",
      "Computer science engineering",
      "Electrical engineering",
      "Energy engineering",
      "Engineering and computational mechanics",
      "Engineering physics",
      "Materials engineering",
      "Mathematics and computing",
      "Mechanical engineering",
      "Production and industrial engineering",
      "Textile technology",
    ],
    gateCutoff: 200,
    fee: 1020600,
    rating: 4.6,
  },
  {
    name: "IIT Bombay",
    location: "Mumbai",
    courses: [
      "Aerospace engineering",
      "Chemical engineering",
      "Civil engineering",
      "Computer science and engineering",
      "Electrical engineering",
      "Energy engineering",
      "Engineering physics",
      "Environmental science engineering",
      "Mechanical engineering",
      "Metallurgical engineering and material science",
    ],
    gateCutoff: 750,
    fee: 800000,
    rating: 4.7,
  },
  {
    name: "IIIT Kanpur",
    location: "Uttar Pradesh",
    courses: [
      "Aerospace engineering",
      "Mechanical engineering",
      "Bio engineering",
      "Chemical engineering",
      "Civil engineering",
      "Computer science engineering",
      "Earth science",
      "Electrical engineering",
      "Physics",
      "Statistics and data science",
      "Materials science and engineering",
      "Mathematics and scientific computing",
    ],
    gateCutoff: 1550,
    fee: 920000,
    rating: 4.6,
  },
  {
    name: "IIT Kharagpur",
    location: "West Bengal",
    courses: [
      "Mechanical engineering",
      "Civil engineering",
      "Electrical engineering",
      "Computer science and engineering",
      "Electronics and electrical communication engineering",
      "Chemical engineering",
    ],
    gateCutoff: 550,
    fee: 850000,
    rating: 4.5,
  },
  {
    name: "IIT Roorkee",
    location: "Uttarakhand",
    courses: [
      "Chemical engineering",
      "Mechanical engineering",
      "Civil engineering",
      "Metallurgical engineering",
      "Computer science and engineering",
      "Production and industrial engineering",
      "Electrical engineering",
      "Data science and artificial engineering",
      "Engineering physics",
    ],
    gateCutoff: 185,
    fee: 800000,
    rating: 4.4,
  },
  {
    name: "IIT Guwahati",
    location: "Assam",
    courses: [
      "Mechanical engineering",
      "Civil engineering",
      "Computer science and engineering",
      "Electronics and communication engineering",
      "Chemical engineering",
      "Bioscience and bioengineering",
      "Mathematics and computing",
      "Engineering physics",
      "Energy engineering",
      "Data science and artificial engineering",
    ],
    gateCutoff: 655,
    fee: 800000,
    rating: 4.5,
  },
  {
    name: "NIT Trichy",
    location: "Tamil Nadu",
    courses: [
      "Chemical engineering",
      "Civil engineering",
      "Computer science and engineering",
      "Electrical and electronics engineering",
      "Instrumentation and control engineering",
      "Mechanical engineering",
      "Metallurgy and materials engineering",
      "Production engineering",
    ],
    gateCutoff: 547,
    fee: 500000,
    rating: 4.4,
  },
  {
    name: "IIT Hyderabad",
    location: "Hyderabad",
    courses: [
      "Industrial Chemistry",
      "Design and Technology",
      "Engineering Science",
      "Materials Science and Metallurgical Engineering",
      "Computational Engineering",
      "Biotechnology and Bioinformatics",
      "Mathematics and Computing Engineering",
      "Engineering Physics",
      "Biomedical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Chemical Engineering",
      "Computer Science and Engineering",
      "Mechanical and Aerospace Engineering",
      "Artificial Intelligence",
    ],
    gateCutoff: 741,
    fee: 800000,
    rating: 4.5,
  },
  {
    name: "NIT Karnataka",
    location: "Mangaluru",
    courses: [
      "Chemical Engineering",
      "Civil Engineering",
      "Computational and Data Science",
      "Computer Science Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
      "Metallurgical and Materials Engineering",
      "Mining Engineering",
    ],
    gateCutoff: 420,
    fee: 500000,
    rating: 4.3,
  },
  {
    name: "Jadavpur University",
    location: "West Bengal",
    courses: [
      "Chemical engineering",
      "Civil engineering",
      "Electrical engineering",
      "Electronics and communication engineering",
      "Computer science engineering",
      "Information technology",
      "Construction engineering",
      "Instrumentation and electronics engineering",
      "Mechanical engineering",
      "Power engineering",
      "Printing Engineering",
      "Production engineering",
    ],
    gateCutoff: 685,
    fee: 121000,
    rating: 4.3,
  },
  {
    name: "VIT Vellore",
    location: "Tamil Nadu",
    courses: [
      "Computer Science and Engineering (Bioinformatics)",
      "Biotechnology",
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Mechanical Engineering (Automotive Engineering)",
      "Mechanical Engineering (Manufacturing Engineering)",
      "Electronics and Communication Engineering (Biomedical Engineering)",
      "Electrical & Computer Science Engineering",
      "CSE Artificial Intelligence & Machine Learning",
      "Electronics Engineering (VLSI Design & Technology)",
    ],
    gateCutoff: 600,
    fee: 780000,
    rating: 4.2,
  },
  {
    name: "IIT BHU (Varanasi)",
    location: "Varanasi",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical Engineering",
      "Ceramic Engineering",
      "Chemical Engineering",
      "Electronics Engineering",
      "Mechanical Engineering",
      "Mining Engineering",
      "Pharmaceutics Engineering & Technology",
      "Metallurgical Engineering",
      "Materials Science and Engineering",
    ],
    gateCutoff: 544,
    fee: 1063000,
    rating: 4.3,
  },
  {
    name: "ISM Dhanbad",
    location: "Dhanbad",
    courses: [
      "Computer Science and Engineering",
      "Electronics and Communication Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Engineering Physics",
    ],
    gateCutoff: 637,
    fee: 465000,
    rating: 4.2,
  },
  {
    name: "NIT Rourkela",
    location: "Odisha",
    courses: [
      "Biomedical Engineering",
      "Computer Science and Engineering",
      "Chemical Engineering",
      "Ceramic Engineering",
      "Biotechnology",
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
      "Metallurgical and Materials Engineering",
      "Mining Engineering",
      "Electronics and Instrumentation Engineering",
    ],
    gateCutoff: 421,
    fee: 500000,
    rating: 4.3,
  },
  {
    name: "IIT Indore",
    location: "Madhya Pradesh",
    courses: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Metallurgical Engineering and Materials Science",
      "Computer Science and Engineering",
      "Civil Engineering",
    ],
    gateCutoff: 636,
    fee: 800000,
    rating: 4.2,
  },
  {
    name: "Anna University IIT Bhubaneswar",
    location: "Bhubaneswar",
    courses: [
      "Computer Science and Engineering",
      "Electronics and Communication Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Metallurgical and Materials Engineering",
    ],
    gateCutoff: 375,
    fee: 800000,
    rating: 4.2,
  },
  {
    name: "ICT (Institute of Chemical Technology)",
    location: "Maharashtra",
    courses: [
      "Diploma in Polymer Engineering",
      "Diploma in Chemical Engineering",
    ],
    gateCutoff: 170,
    fee: 600000,
    rating: 4.0,
  },
  {
    name: "Amrita Vishwa Vidyapeeth",
    location: "Coimbatore",
    courses: [
      "Automation and Robotics Engineering",
      "Electronics and Communication Engineering",
      "Computer Science and Engineering (Artificial Intelligence)",
      "Electrical and Electronics Engineering",
      "Mechanical Engineering",
      "Computer Science and Engineering",
      "Electronics and Computer Engineering",
    ],
    gateCutoff: 170,
    fee: 1300000,
    rating: 4.0,
  },
  {
    name: "IIT Mandi",
    location: "Himachal Pradesh",
    courses: [
      "Computer Science and Engineering",
      "Data Science and Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Engineering Physics",
      "Civil Engineering",
    ],
    gateCutoff: 400,
    fee: 800000,
    rating: 4.3,
  },
  {
    name: "NIT Warangal",
    location: "Warangal",
    courses: [
      "CSE",
      "ECE",
      "EEE",
      "BioTech",
      "Chemical",
      "MME",
      "Civil",
      "Mechanical",
    ],
    gateCutoff: 682,
    fee: 500000,
    rating: 4.3,
  },
  {
    name: "BIT Mesra",
    location: "Ranchi",
    courses: [
      "Bio-Medical Instrumentation",
      "Biotechnology",
      "Chemical Engineering",
      "Chemistry",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical and Electronics Engineering",
      "Electronics and Communication Engineering",
      "Environmental Science & Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Nano Science and Engineering",
      "Polymer Engineering",
      "Production Engineering",
      "Remote Sensing",
      "Space Engineering and Rocketry",
    ],
    gateCutoff: 700,
    fee: 700000,
    rating: 4.1,
  },
  {
    name: "IIT Ropar",
    location: "Punjab",
    courses: [
      "Computer Science and Engineering",
      "Mathematics and Computing",
      "Electrical Engineering",
      "Chemical Engineering",
      "Mechanical Engineering",
      "Engineering Physics",
      "Civil Engineering",
      "Metallurgical and Materials Engineering",
    ],
    gateCutoff: 595,
    fee: 892000,
    rating: 4.4,
  },
  {
    name: "IIT Gandhinagar",
    location: "Gujarat",
    courses: [
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical Engineering",
      "Material Engineering",
      "Mechanical Engineering",
    ],
    gateCutoff: 492,
    fee: 800000,
    rating: 4.4,
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    location: "Tamil Nadu",
    courses: [
      "Computer Science and Engineering",
      "Biotechnology (Bioinformatics)",
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Mechanical Engineering (Automotive Engineering)",
      "Mechanical Engineering (Manufacturing Engineering)",
      "Electronics and Communication Engineering (Biomedical Engineering)",
      "Electrical & Computer Science Engineering",
      "CSE Artificial Intelligence & Machine Learning",
      "Electronics Engineering (VLSI Design & Technology)",
    ],
    gateCutoff: 620,
    fee: 783000,
    rating: 4.2,
  },
  {
    name: "Thapar Institute of Engineering and Technology - Patiala",
    location: "Punjab",
    courses: [
      "BE in Biomedical Engineering",
      "BTech in Biotechnology",
      "BE in Electrical and Computer Engineering",
      "BE in Chemical Engineering",
      "BE in Computer Science & Engineering",
      "BE in Electronics & Communication Engineering",
      "BE in Civil Engineering",
      "BE in Computer Science and Business Systems",
      "BE in Electronics and Computer Engineering",
      "BE in Computer Engineering",
      "BE in Electrical Engineering",
      "BE in Electronics (Instrumentation & Control) Engineering",
      "BE in Mechanical Engineering",
      "BE in Mechatronics Engineering",
      "BE in Mechanical Engineering (Production)",
    ],
    gateCutoff: 472,
    fee: 1458000,
    rating: 4.1,
  },
  {
    name: "Birla Institute of Technology & Science - Rajasthan",
    location: "Rajasthan",
    courses: [
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Science Engineering",
      "Mechanical Engineering",
      "Manufacturing Engineering",
      "Electrical & Electronics Engineering",
      "Electronics & Instrumentation Engineering",
      "Electronics and Communication Engineering",
    ],
    gateCutoff: 290,
    fee: 1994000,
    rating: 4.4,
  },
  {
    name: "Amrita School of Engineering - Coimbatore",
    location: "Coimbatore",
    courses: [
      "Computer Science and Engineering",
      "Automation and Robotics Engineering",
      "Aerospace Engineering",
      "Computer Science and Engineering (Artificial Intelligence)",
      "Mechanical Engineering",
      "Chemical Engineering",
    ],
    gateCutoff: 411,
    fee: 1800000,
    rating: 4.1,
  },
  {
    name: "Amity University - Noida",
    location: "Noida",
    courses: [
      "B.Tech. in Computer Science and Engineering",
      "B.Tech. in Biotechnology",
      "B.Tech. in Food Technology",
      "B.Tech. in Aerospace Engineering",
      "B.Tech. in Bioinformatics",
      "B.Tech. in Mechanical Engineering",
      "Bachelor of Technology",
      "B.Tech. in Artificial Intelligence",
      "B.Tech. in Defence Technology",
      "B.Tech. in Civil Engineering",
      "B.Tech. in Avionics",
      "B.Tech. in Nanotechnology",
      "B.Tech. in Electrical and Electronics Engineering",
      "B.Tech. in Electronics and Communication Engineering",
      "B.Tech. in Automobile Engineering",
    ],
    gateCutoff: 511,
    fee: 1300000,
    rating: 4.0,
  },
  {
    name: "Siksha O Anusandhan University - Bhubaneswar",
    location: "Bhubaneswar",
    courses: [
      "B.Tech. in Computer Science and Engineering",
      "B.Tech. in Computer Science and Information Technology",
      "B.Tech. in Electronics and Communication Engineering",
      "B.Tech. in Mechanical Engineering",
      "B.Tech. in Civil Engineering",
      "B.Tech. in Electrical Engineering",
      "B.Tech. in Electrical and Electronics Engineering",
      "B.Tech in Computer Science and Engineering (Internet Of Things)",
    ],
    gateCutoff: 721,
    fee: 600000,
    rating: 4.2,
  },
  {
    name: "SASTRA Thanjavur",
    location: "Tamil Nadu",
    courses: [
      "Aerospace Engineering",
      "Electronics & Communication Engineering",
      "Computer Science & Engineering (with Spl in Artificial Intelligence & Data Science)",
      "Bioengineering",
      "Electronics & Communication Engineering (with Spl in Cyber-Physical Systems)",
      "Computer Science & Engineering (with Spl in Cyber Security & Blockchain Technology)",
      "Bioinformatics",
      "Electronics & Instrumentation Engineering",
      "Computer Science & Engineering (with Spl in IoT & Automation)",
      "Chemical Engineering",
      "Information Technology",
      "Electrical & Electronics Engineering",
      "Civil Engineering",
      "Mechanical Engineering",
      "Computer Science & Business System",
      "Robotics & Artificial Intelligence",
    ],
    gateCutoff: 500,
    fee: 600000,
    rating: 4.2,
  },
  {
    name: "SRM Institute of Technology - Chennai",
    location: "Tamil Nadu",
    courses: [
      "B.Tech. in Computer Science Engineering",
      "B.Tech. in Biotechnology",
      "B.Tech. in Electronics and Communications Engineering",
      "B.Tech. in Information Technology",
      "B.Tech. in Computer Science and Engineering",
      "B.Tech. in Biotechnology Engineering",
      "B.Tech. in Electronics and Communication Engineering",
      "B.Tech. in Biomedical Engineering",
      "B.Tech. in Mechanical Engineering",
    ],
    gateCutoff: 361,
    fee: 1600000,
    rating: 4.1,
  },
  {
    name: "Manipal Institute of Technology",
    location: "Karnataka",
    courses: [
      "B.Tech. in Computer Science and Engineering",
      "B.Tech. in Data Science and Engineering",
      "B.Tech. in Information Technology",
      "B.Tech. in Electronics and Communication Engineering",
      "B.Tech. in Computer and Communication Engineering",
      "B.Tech. in Mechanical Engineering",
      "B.Tech. in Mechatronics Engineering",
      "B.Tech. in Biotechnology",
    ],
    gateCutoff: 406,
    fee: 1236000,
    rating: 4.0,
  },
  {
    name: "PSG College of Technology - Coimbatore",
    location: "Coimbatore",
    courses: [
      "Biotechnology",
      "Computer Science and Engineering",
      "Robotics and Automation Engineering",
      "Biomedical Engineering",
      "Fashion Technology",
      "Mechanical Engineering",
      "Textile Technology",
      "Electronics and Communication Engineering",
      "Civil Engineering",
      "Automobile Engineering",
      "Metallurgical Engineering",
      "Production Engineering",
    ],
    gateCutoff: 191,
    fee: 200000,
    rating: 4.4,
  },
  {
    name: "KL University - Guntur",
    location: "Guntur",
    courses: [
      "B.Tech. in Computer Science and Information Technology",
      "B.Tech. in Internet of Things",
      "B.Tech. in Artificial Intelligence and Data Science",
      "B.Tech. in Biotechnology",
      "B.Tech. in Electronics and Communication Engineering",
      "B.Tech. in Electronics and Computer Science Engineering",
      "B.Tech. in Mechanical Engineering",
      "B.Tech. in Civil Engineering",
      "B.Tech. in Electrical and Electronics Engineering",
    ],
    gateCutoff: 466,
    fee: 1000000,
    rating: 4.1,
  },
  {
    name: "M. S. Ramaiah Institute of Technology - Bangalore",
    location: "Bangalore",
    courses: [
      "Computer Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
      "Biotechnology Engineering",
      "Artificial Intelligence and Data Science",
    ],
    gateCutoff: 296,
    fee: 450000,
    rating: 4.2,
  },
  {
    name: "Kalasalingam Academy of Research and Higher Education",
    location: "Tamil Nadu",
    courses: [
      "Computer Science and Engineering",
      "Biotechnology",
      "Information Technology",
      "Food Technology",
      "Electronics and Communication Engineering",
      "Biomedical Engineering",
      "Aeronautical Engineering",
      "Agricultural Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical and Electronics Engineering",
      "Chemical Engineering",
      "Automobile Engineering",
    ],
    gateCutoff: 169,
    fee: 500000,
    rating: 4.0,
  },
];
export default function Datapage() {
  const [gateRank, setGateRank] = useState();
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const filterdData = clgData.filter(
      (item) => item.gateCutoff >= gateRank && item.location === location
    );
    setData(filterdData);
  }, [gateRank, location]);
  return (
    <Flex direction="column" alignItems="center">
      <Flex bg="gray.100" m="30px" w="1000px" p="30px" borderRadius="10px">
        <Input
          borderColor="black"
          color="black"
          type="number"
          placeholder="Enter Gate Rank"
          value={gateRank}
          mr="15px"
          onChange={(e) => setGateRank(e.target.value)}
        />

        <Select
          borderColor="black"
          placeholder="Select Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        >
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="Assam">Assam</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Mangaluru">Mangaluru</option>
          <option value="Varanasi">Varanasi</option>
          <option value="Dhanbad">Dhanbad</option>
          <option value="Odisha">Odisha</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Bhubaneswar">Bhubaneswar</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Warangal">Warangal</option>
          <option value="Ranchi">Ranchi</option>
          <option value="Punjab">Punjab</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Noida">Noida</option>
          <option value="Guntur">Guntur</option>
          <option value="Bangalore">Bangalore</option>
        </Select>
      </Flex>

      <TableContainer>
        <Table variant="simple" w="1000px">
          <Thead>
            <Tr>
              <Th>College Name</Th>
              <Th>Location</Th>
              <Th>Cut off</Th>
              <Th>Fee</Th>
              <Th>Rating</Th>
             
            </Tr>
          </Thead>
          {data &&
            data.map((i) => (
              <Tbody key={i.name}>
                <Tr>
                  <Td>{i.name}</Td>
                  <Td>{i.location}</Td>
                  <Td>{i.gateCutoff}</Td>
                  <Td><span style={{fontFamily:'serif',fontSize:'17px'}}>&#8377; </span>{i.fee}</Td>
                  <Td>{i.rating}</Td>
                 
                </Tr>
              </Tbody>
            ))}
        </Table>
      </TableContainer>
    </Flex>
  );
}
