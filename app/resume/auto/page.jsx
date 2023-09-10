"use client";
import React from "react";
import { db } from "@/app/firebaseConfig";
import { UserAuth } from "@/app/context/AuthContext";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
  Spinner,
  Flex,
  Text,
  Image,
  HStack,
  Button,
  Box,
  Select,
} from "@chakra-ui/react";
import T1 from "@/app/components/Templates/T1";
import T2 from "@/app/components/Templates/T2";
import { useRouter } from "next/navigation";
export default function Apage() {
  const router = useRouter();
  const { user } = UserAuth();
  const [userData, setUserData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [games, setGames] = React.useState([]);
  const [fildata, setFil] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [themeS, setThemeS] = React.useState("t1");
  const [r, setR] = React.useState();
  const [selectedPosition, setSelectedPosition] = React.useState("");
  const [pos,setPos]=React.useState(selectedPosition)

  React.useEffect(() => {
    if (user) {
      const uid = user.uid;

      const userDocRef = doc(db, "users", uid);
      const getUserData = async () => {
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setLoading(true);
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();

      const gamesCollection = collection(db, "users", uid, "tests");

      const getGames = async () => {
        try {
          const querySnapshot = await getDocs(gamesCollection);
          const gamesData = [];
          querySnapshot.forEach((doc) => {
            gamesData.push(doc.data());
          });
          setGames(gamesData);
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      };
      getGames();
    }
  }, [user]);
  React.useEffect(() => {
    const filteredCourses = games
    .filter((item) => item.test.result >= 10)
    .map((item) => item.test.course);
    
    setFil(filteredCourses);
  }, [games]);
  const responsibilitiesData = {
    "Frontend Developer": {
      Company1: [
        "Developed responsive web apps.",
        "Collaborated on user-friendly interfaces.",
        "Implemented dynamic features with React.js.",
        "Conducted code reviews and optimizations.",
        "Stayed updated on frontend tech.",
      ],
      Company2: [
        "Led frontend development for modern web apps.",
        "Worked with product managers on project requirements.",
        "Optimized website performance.",
        "Mentored junior developers.",
        "Resolved cross-browser compatibility issues.",
      ],
      Company3: [
        "Designed mobile-first web interfaces.",
        "Collaborated on interactive web experiences.",
        "Utilized Angular and Vue.js for web apps.",
        "Conducted A/B testing for user engagement.",
        "Integrated emerging frontend technologies.",
      ],
    },
    "Backend Developer": {
      Company1: [
        "Designed and developed server-side apps and APIs.",
        "Managed databases and ensured security.",
        "Worked with DevOps for deployments.",
        "Collaborated with frontend teams.",
        "Optimized server performance.",
      ],
      Company2: [
        "Led backend development and architecture.",
        "Designed authentication and user management features.",
        "Ensured data consistency and integrity.",
        "Conducted security audits and best practices.",
        "Managed CI/CD pipelines.",
      ],
      Company3: [
        "Developed server applications using Node.js, Python, and Java.",
        "Built RESTful APIs and integrated third-party services.",
        "Optimized database operations for performance.",
        "Deployed applications to AWS and Azure.",
        "Collaborated for end-to-end solutions.",
      ],
    },
    "Fullstack Developer": {
      Company1: [
        "Contributed to both frontend and backend development.",
        "Worked with cross-functional teams on project requirements.",
        "Designed responsive web interfaces.",
        "Implemented server-side logic and APIs.",
        "Conducted code reviews and optimizations.",
      ],
      Company2: [
        "Owned end-to-end development from UI to server logic.",
        "Translated business requirements into solutions.",
        "Ensured seamless frontend-backend integration.",
        "Maintained RESTful APIs for scalability.",
        "Collaborated with DevOps for CI/CD.",
      ],
      Company3: [
        "Designed, developed, and maintained full-stack apps.",
        "Created and optimized responsive designs.",
        "Built and maintained RESTful APIs.",
        "Collaborated with designers for user experiences.",
        "Utilized agile methodologies for quality software.",
      ],
    },
    "Blockchain Developer": {
      Company1: [
        "Developed smart contracts on Ethereum and Binance Smart Chain.",
        "Implemented blockchain consensus algorithms.",
        "Ensured security and privacy of blockchain transactions.",
        "Integrated blockchain functionality into web apps.",
        "Conducted code audits and contributed to open-source projects.",
      ],
      Company2: [
        "Designed and developed decentralized applications (DApps).",
        "Built and deployed smart contracts and managed nodes.",
        "Worked on token creation, ICOs, and DeFi projects.",
        "Collaborated with security experts for app security.",
        "Implemented consensus algorithms.",
      ],
      Company3: [
        "Developed blockchain solutions for supply chain and finance.",
        "Created and deployed smart contracts with Solidity.",
        "Integrated blockchain into existing platforms.",
        "Collaborated on cross-functional teams for solutions.",
        "Stayed updated on blockchain trends.",
      ],
    },
    "Android Developer": {
      Company1: [
        "Designed and developed native Android apps.",
        "Collaborated with UX/UI designers for appealing interfaces.",
        "Implemented features like user authentication and notifications.",
        "Conducted code reviews and optimized app performance.",
        "Stayed updated on Android best practices.",
      ],
      Company2: [
        "Led Android app development, integrating third-party APIs.",
        "Optimized app performance for various devices.",
        "Conducted usability testing and gathered feedback.",
        "Mentored junior Android developers.",
        "Stayed updated on Android tech.",
      ],
      Company3: [
        "Developed feature-rich Android apps with a focus on UX.",
        "Collaborated with backend developers for API integration.",
        "Implemented Material Design for UI/UX consistency.",
        "Conducted app testing and troubleshooting.",
        "Stayed updated on Android technologies.",
      ],
    },
    "Cloud Computing Engineer": {
      Company1: [
        "Designed and maintained cloud infrastructure on AWS and Azure.",
        "Managed virtual servers and containers for scalability.",
        "Optimized cloud resources for cost reduction.",
        "Implemented security measures and access control.",
        "Collaborated with DevOps for CI/CD.",
      ],
      Company2: [
        "Led cloud infrastructure planning for reliability and scalability.",
        "Implemented infrastructure as code with Terraform and CloudFormation.",
        "Managed cloud services including VMs and databases.",
        "Conducted security assessments and best practices.",
        "Collaborated on cloud operations.",
      ],
      Company3: [
        "Built cloud environments on Google Cloud and other providers.",
        "Implemented scalable and cost-effective solutions.",
        "Ensured data integrity with backup and redundancy.",
        "Collaborated with developers for cloud deployment.",
        "Stayed updated on cloud industry trends.",
      ],
    },
    "DevOps Engineer": {
      Company1: [
        "Automated deployment processes and CI/CD pipelines.",
        "Collaborated with teams to streamline software delivery.",
        "Monitored system health and performance in cloud environments.",
        "Implemented containerization with Docker and Kubernetes.",
        "Conducted code reviews for reliability.",
      ],
      Company2: [
        "Led DevOps initiatives with IaC and automation tools.",
        "Managed and optimized CI/CD pipelines.",
        "Implemented monitoring and alerting systems.",
        "Ensured high availability with redundancy.",
        "Mentored team members in DevOps practices.",
      ],
      Company3: [
        "Automated deployment and configuration management for CD.",
        "Collaborated with teams to improve release processes and testing automation.",
        "Implemented infrastructure monitoring and logging.",
        "Ensured secure and compliant cloud environments.",
        "Stayed updated on DevOps tools and practices.",
      ],
    },
    "AI Engineer": {
      Company1: [
        "Developed ML models and algorithms for data analysis.",
        "Implemented NLP techniques for text analysis.",
        "Collaborated with data scientists on large datasets.",
        "Optimized ML pipelines for scalability.",
        "Conducted A/B tests for model improvements.",
      ],
      Company2: [
        "Led AI and ML projects, focusing on recommendation systems.",
        "Built and deployed AI models for high availability.",
        "Utilized TensorFlow and PyTorch for development.",
        "Collaborated on AI integration into products.",
        "Stayed updated on AI research and tech.",
      ],
      Company3: [
        "Designed AI solutions for computer vision applications.",
        "Developed custom AI algorithms for efficiency.",
        "Collaborated on data pipelines for AI training.",
        "Conducted performance tuning for AI models.",
        "Contributed to AI research and development.",
      ],
    },
  };
  const objdata = {
    "Frontend Development":
    "Aspiring Frontend Developer with a passion for creating responsive and user-friendly web applications. Dedicated to delivering visually appealing and highly functional interfaces to enhance user experiences.",
    "Backend Development":
    "Motivated Backend Developer with a strong background in server-side programming and database management. Committed to optimizing server performance and ensuring seamless data flow for web applications.",
    "Fullstack Development":
    "Enthusiastic Fullstack Developer with expertise in both frontend and backend technologies. Striving to bridge the gap between design and functionality to build comprehensive web solutions.",
    "Blockchain Development":
    "Blockchain Developer with a focus on developing secure and decentralized applications. Aiming to revolutionize industries through innovative blockchain solutions that ensure transparency and trust.",
    "Android Developement":
    "Android Developer with a knack for creating intuitive and feature-rich mobile applications. Committed to crafting Android apps that provide exceptional user experiences on a variety of devices.",
    "Cloud Computing Engineer":
    "Cloud Computing Engineer skilled in designing and managing scalable cloud infrastructures. Dedicated to optimizing resource utilization and ensuring high availability and security in cloud environments.",
    "DevOps Engineer":
    "DevOps Engineer experienced in automating and streamlining development, deployment, and operations processes. Committed to enhancing collaboration between development and IT teams for faster and more reliable software delivery.",
    "AI Engineer":
    "AI Engineer passionate about harnessing the power of artificial intelligence to solve complex problems. Committed to developing intelligent systems that drive innovation and efficiency.",
  };
  const positionMapping = {
    "Frontend Development": "Frontend Developer",
    "Backend Development": "Backend Developer",
    "Fullstack Development": "Fullstack Developer",
    "Blockchain Development": "Blockchain Developer",
    "Android Development": "Android Developer",
    "Cloud Computing": "Cloud Computing Engineer",
    DevOps: "DevOps Engineer",
    "Artificial Intelligence (AI)": "AI Engineer",
  };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const mappedValue =
                  positionMapping[selectedValue] || selectedValue;
                  setPos(mappedValue);
    setSelectedPosition(selectedValue)
  };
  return (
    <Flex justifyContent="center" direction="column" alignItems="center">
      {!loading ? (
        <Flex mt="20%" justifyContent="center" alignItems="center">
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.300"
            color="#FF5757"
          />
        </Flex>
      ) : (
        <>
          {fildata.length == 0 ? (
            <Text fontSize="2xl" as="b" my="20px">
              YOU NEED TO TAKE A TEST{" "}
            </Text>
          ) : (
            <Text fontSize="2xl" as="b" my="20px">
              SELECT A THEME
            </Text>
          )}

          <Box display={fildata.length == 0 ? "none" : "block"}>
            <HStack>
              <Image
                src="/samp1.jpg"
                w="180px"
                alt="your-image-description"
                borderRadius="5px"
                _hover={{ border: "2px solid #FF5757" }}
                border={themeS == "t1" ? "2px solid #FF5757" : ""}
                onClick={() => setThemeS("t1")}
              />
              <Image
                src="/samp2.jpg"
                w="180px"
                borderRadius="5px"
                border={themeS == "t2" ? "2px solid #FF5757" : ""}
                alt="your-image-description"
                _hover={{ border: "2px solid #FF5757" }}
                onClick={() => setThemeS("t2")}
              />
            </HStack>
            <Select
              bg="white"
              mt="10px"
              value={selectedPosition}
              onChange={handleSelectChange}
            >
              {fildata.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </Select>
          </Box>
          <Box mt="30px">
            {fildata.length == 0 ? (
              <Button
                bg="#FF5757"
                onClick={() => {
                  setIsLoading(true);
                  router.push("/skilltests");
                }}
                isLoading={isLoading}
              >
                Take a Test
              </Button>
            ) : (
              <Button
                bg="#FF5757"
                onClick={() => {
                  setR(themeS);
                }}
                isDisabled={selectedPosition == "null" ? true : false}
              >
                Create Resume
              </Button>
            )}
          </Box>

          {r === "t1" ? (
            <T1
              sk={fildata}
              dd={userData}
              jp={pos}
              ob={objdata[selectedPosition]}
              com1={responsibilitiesData[pos]["Company1"]}
              com2={responsibilitiesData[pos]["Company2"]}
              com3={responsibilitiesData[pos]["Company3"]}
            />
          ) : r === "t2" ? (
            <T2
              sk={fildata}
              dd={userData}
              jp={pos}
              ob={objdata[selectedPosition]}
              com1={responsibilitiesData[pos]["Company1"]}
              com2={responsibilitiesData[pos]["Company2"]}
              com3={responsibilitiesData[pos]["Company3"]}
            />
          ) : null}
        </>
      )}
    </Flex>
  );
}
