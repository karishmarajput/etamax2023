import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import EventCard from "../components/cards/EventCards";
//import Background from "../components/misc/Background";
import Layout from "../components/layout";
import { API_BASE_URL } from "../config";
import { useRouter } from "next/router";
import Disclaimer from "../components/layout/Disclaimer";

//if (typeof window !== "undefined") {
//  import("../components/utils/blossom");
//}

export default function Events(props) {
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;
      /*document.getElementById(
        "blossom-container"
      ).style.transform = `-translateY(${dist * 1}px)`;
      document.getElementById(
        "background-image"
      ).style.transform = `translateY(${dist * 0.03}px)`;*/
    });
  }, []);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    const ele = document.getElementById(id);
    if (!ele) return;

    const y = ele.getBoundingClientRect().top + window.pageYOffset - 200;

    window.scrollTo({ top: y, behavior: "smooth" });
    // ele.scrollIntoView({ behavior: "smooth" });
    // window.scrollBy(0, -100);
  }, [router.query]);

  // create a simple array of numbers
  const [events, setEvents] = useState(
    props.events.sort((event1, event2) => {
      if (event1.day > event2.day) return 1;
      if (event1.day < event2.day) return -1;
      if (event1.start > event2.start) return 1;
      if (event1.start < event2.start) return -1;
    })
  );
  const [daySelect, setDaySelect] = useState("");
  const [catSelect, setCatSelect] = useState("");

  function filterDay() {
    if (daySelect === "") {
      if (!catSelect) {
        setEvents(
          props.events.sort((event1, event2) => {
            if (event1.day > event2.day) return 1;
            if (event1.day < event2.day) return -1;
            if (event1.start > event2.start) return 1;
            if (event1.start < event2.start) return -1;
          })
        );
      } else {
        setEvents(
          props.events
            .filter((event) => event.category === catSelect)
            .sort((event1, event2) => {
              if (event1.day > event2.day) return 1;
              if (event1.day < event2.day) return -1;
              if (event1.start > event2.start) return 1;
              if (event1.start < event2.start) return -1;
            })
        );
      }
    } else {
      if (catSelect) {
        setEvents(
          props.events
            .filter(
              (event) =>
                event.day === parseInt(daySelect, 10) &&
                event.category === catSelect
            )
            .sort((event1, event2) => {
              if (event1.day > event2.day) return 1;
              if (event1.day < event2.day) return -1;
              if (event1.start > event2.start) return 1;
              if (event1.start < event2.start) return -1;
            })
        );
      } else {
        setEvents(
          props.events
            .filter((event) => event.day === parseInt(daySelect, 10))
            .sort((event1, event2) => {
              if (event1.day > event2.day) return 1;
              if (event1.day < event2.day) return -1;
              if (event1.start > event2.start) return 1;
              if (event1.start < event2.start) return -1;
            })
        );
      }
    }
  }

  function filterCategory() {
    if (catSelect === "") {
      if (!daySelect) {
        setEvents(
          props.events.sort((event1, event2) => {
            if (event1.day > event2.day) return 1;
            if (event1.day < event2.day) return -1;
            if (event1.start > event2.start) return 1;
            if (event1.start < event2.start) return -1;
          })
        );
      } else {
        setEvents(
          props.events
            .filter((event) => event.day === parseInt(daySelect, 10))
            .sort((event1, event2) => {
              if (event1.day > event2.day) return 1;
              if (event1.day < event2.day) return -1;
              if (event1.start > event2.start) return 1;
              if (event1.start < event2.start) return -1;
            })
        );
      }
    } else {
      if (daySelect) {
        setEvents(
          props.events
            .filter(
              (event) =>
                event.day === parseInt(daySelect, 10) &&
                event.category === catSelect
            )
            .sort((event1, event2) => {
              if (event1.day > event2.day) return 1;
              if (event1.day < event2.day) return -1;
              if (event1.start > event2.start) return 1;
              if (event1.start < event2.start) return -1;
            })
        );
      } else {
        setEvents(
          props.events
            .filter((event) => event.category === catSelect)
            .sort((event1, event2) => {
              if (event1.day > event2.day) return 1;
              if (event1.day < event2.day) return -1;
              if (event1.start > event2.start) return 1;
              if (event1.start < event2.start) return -1;
            })
        );
      }
    }
  }

  useEffect(() => {
    filterDay();
  }, [daySelect]);

  useEffect(() => {
    filterCategory();
  }, [catSelect]);

  return (
    <>
      <Head>
        <title>FACES-22 | Events</title>
        <meta name="FACES-22" content="Events" />
        <meta
          name="description"
          content="Here is the list of events for this year"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      
      <Layout scrollYVar={450}>
        <Flex
          id="blossom-container"
          flexDir="column"
          h="auto"
          w="100vw"
          maxW="100vw"
          className="box1Checkout"
        >
          <Flex
            maxW="100vw"
            flexDirection="column"
            h={{ base: "110vh", md: "100vh" }}
          >
            <Center
              h={{ base: "110vh", md: "100vh" }}
              w="100%"
              flexDir={"column"}
            
            >
              <Box w="80%">
                <Heading color="pink.300" fontSize="6xl">
                  FACES-22{" "}
                  <Text fontSize="8xl" fontFamily="Birthstone Bounce">
                    Udaan
                  </Text>
                </Heading>
              </Box>
              <Box mt={4} w="83%" p="20px">
                <Text
                  fontSize={{ base: "xl", md: "3xl" }}
                  fontWeight={"normal"}
                  color="black.800"
                  
                >

                </Text>
              </Box>
            </Center>
          </Flex>

          <Disclaimer />


          <Center w="100%" gridGap={"3"}>
            
            <Center w={{ base: "95%", lg: "50%" }} gridGap={3}>
              <Select
                value={catSelect}
                onChange={(e) => setCatSelect(e.target.value)}
                placeholder="Select Category"
                borderColor= "black.800"
                _focus={{
                  color: "black.800",
                  borderColor: "black.800",
                }}
                _hover={{
                  color: "black.800",
                  borderColor: "black.800",
                }}
                
              >
                <option value="T">Technical</option>
                <option value="C">Cultural</option>
                <option value="S">E-Sports</option>
              </Select>
              <Select
                value={daySelect}
                onChange={(e) => setDaySelect(e.target.value)}
                placeholder="Select Day"
                borderColor= "black.800"
                _focus={{
                  color: "black.800",
                  borderColor: "black.800",
                }}
                _hover={{
                  color: "black.800",
                  borderColor: "black.800",
                }}
              >
                <option value="1">Day 1</option>
                <option value="2">Day 2</option>
                <option value="3">Day 3</option>
              </Select>
              <Button
                _focus={{
                  color: "black.800",
                  borderColor: "black.800",
                }}
               
                borderColor= "black.800"
                _hover={{
                  color: "white",
                  borderColor: "black.800",
                  backgroundColor: "purple.800"
                }}
                variant="outline"
                fontWeight={"normal"}
                onClick={() => {
                  setCatSelect("");
                  setDaySelect("");
                  setEvents(
                    props.events.sort((event1, event2) => {
                      if (event1.day > event2.day) return 1;
                      if (event1.day < event2.day) return -1;
                      if (event1.start > event2.start) return 1;
                      if (event1.start < event2.start) return -1;
                    })
                  );
                }}
              >
                Reset
              </Button>
            </Center>
          </Center>
          <Center py="30px" w="100%" minH="60vh" flexDir={"column"} gridGap="4">
            {events.map((event, idx) => (
              <Center w="100vw" key={idx}>
                <EventCard event={event} />
              </Center>
            ))}
          </Center>
        </Flex>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${API_BASE_URL}/e`).then((response) =>
      response.json()
    );
    return {
      props: {
        events: res.events,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
