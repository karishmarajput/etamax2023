import {
  Center,
  Box,
  Text,
  Link,
  SimpleGrid,
  Icon,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import Head from "next/head";
import Background from "../components/misc/Background";
import { BsInstagram, BsPhone } from "react-icons/bs";
import Layout from "../components/layout";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function AboutCouncil() {
  const [councilMembers, setCouncilMembers] = useState([
    {
      name: "Paul Sheban",
      post: "General Secretary",
      phNo: "+91 9004022599",
      igId: "paulsamuel2002",
    },
    {
      name: "Mustafa Moiyyadi",
      post: "Joint Secretary",
      phNo: "+91 8087037852",
      igId: "mast_af_aaa",
    },
    {
      name: "Janhavi Kadu",
      post: "Cultural Secretary",
      phNo: "+91 9867879221",
      igId: "_kjaan_",
    },
    {
      name: "Gaurav Singh",
      post: "Sports Secretary",
      phNo: "8850458620",
      igId: "g.a.u.r.a.a.a.a.a.a.a.v",
    },
    {
      name: "Srushti lad",
      post: "Ladies Represntative",
      phNo: "9137141933",
      igId: "srushti.lad",
    },
    {
      name: "Bhavana Dornala",
      post: "Technical Secretary",
      phNo: "+91 8291335069",
      igId: "bhavanadornala002",
    },
    {
      name: "Rini Rajendran",
      post: "PR Head",
      phNo: "+91 9987427201",
      igId: "833_inir",
    },
    {
      name: "Varad Tambe",
      post: "Sponsorship Head",
      phNo: "+91 9136340545",
      igId: "varad.tambe",
    },
    {
      name: "Rohit Shelke",
      post: "Assistant Sports Secretary",
      phNo: "+91 8928853664",
      igId: "rohitshelke__",
    },
    {
      name: "Sarveshaa Swar",
      post: "Assistant Cultural Secretary",
      phNo: "+91 8237859866",
      igId: "sarveshaa.swar",
    },
    {
      name: "Juhi Ramod",
      post: "Assistant lady representative",
      phNo: "+91 8898958311",
      igId: "juhiramod",
    },
    {
      name: "Vansh Jain",
      post: "Creative Head",
      phNo: "+91 9867833431",
      igId: "casey._.2002",
    },
    {
      name: "Jaideep Singh Chopra",
      post: "Treasurer",
      phNo: "+91 7710968613",
      igId: "13_jaideep_singh",
    },
    {
      name: "Purva Dubal",
      post: "Assistant Treasurer",
      phNo: "+91 9167101760",
      igId: "purvadubal",
    },
    {
      name: "Tejas Sarode",
      post: "Security",
      phNo: "+91 7020532051",
      igId: "tejass_sarode",
    },
    {
      name: "Yash Jethwa",
      post: "Assistant technical head",
      phNo: "+91 9082941089",
      igId: "j_e_t_h_w_a_",
    },
    {
      name: "Prathamesh Hire",
      post: "Documentation head",
      phNo: "+91 7045618889",
      igId: "prat.hire",
    },
    {
      name: "Faisal Sarang",
      post: "Oc head",
      phNo: "+91 9152067325",
      igId: "faisalsa._.rang",
    },
    {
      name: "Snowson Joseph ",
      post: "Asst.  Documentation ",
      phNo: "+91 9152067325",
      igId: "Snows0n",
    },
  ]);

  return (
    <>
      <Head>
        <title>Contact the council members</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Background pageName={"Home"} />
      <Layout>
        <Flex
          justifyContent={"center"}
          w="100vw"
          h={{ base: "auto", lg: "auto" }}
          id="blossom-container"
          p={{ base: "10px", md: "25px" }}
          flexDir="column"
        >
          <Center flexDir="column" gridGap={"5"}>
            <Center py={{ base: "50px", lg: "30px" }}>
              <Heading fontSize={{ base: "20pt", lg: "auto" }} color="purple.900">
                Contact the council members
              </Heading>
            </Center>
            <SimpleGrid spacing={10} columns={{ base: "1", md: "3" }}>
              {councilMembers.map((member, index) => (
                <Box p="15px" borderRadius={"10px"} className="box1Checkout" key={index}>
                  <Center>
                    <Text
                      color={"purple.900"}
                      fontSize={{ base: "2xl", md: "3xl" }}
                    >
                      {member.name}
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      color={"purple.800"}
                      fontWeight="bold"
                      fontSize={{ base: "xl", md: "2xl" }}
                    >
                      {member.post}
                    </Text>
                  </Center>
                  <Center gridGap={3}>
                    <Icon as={BsPhone} size={"45px"} color={"purple.800"} />
                    <Text
                      color={"purple.800"}
                      fontSize={{ base: "xl", md: "2xl" }}
                    >
                      {member.phNo}
                    </Text>
                  </Center>
                  <Center gridGap={3}>
                    <Icon color={"purple.800"} as={BsInstagram} size="45px" />
                    <Link
                      href={`https://instagram.com/${member.igId}`}
                      color={"purple.800"}
                      fontSize={{ base: "xl", md: "2xl" }}
                      target="_blank"
                    >
                      {member.igId}
                    </Link>
                  </Center>
                </Box>
              ))}
            </SimpleGrid>
          </Center>
        </Flex>
      </Layout>
    </>
  );
}
