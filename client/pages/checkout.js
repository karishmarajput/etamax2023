import EventsList from "../components/checkout/EventsList";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as cookie from "cookie";
import Background from "../components/misc/Background";

export default function Checkout() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const userJSON = localStorage.getItem("eta_user");
    if (!userJSON) {
      router.replace("/login");
      return;
    }
    let user = JSON.parse(userJSON);
    setUser(user);
    if (user.token) {
      let es = user.user.participations;
      es = es.filter((e) => !e.transaction);
      setEvents(es);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Layout>
      <Background />
        {user && (
          
          <Center
            //backgroundImage={"assets/checkout.svg"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            objectFit={"cover"}
            // backgroundPosition={"center"}
            // backgroundSize={"cover"}
            minH={"100vh"}
            h={{ base: "auto", lg: "auto" }}
            w={"100vw"}
            flexDir={"column"}
            // className="mobileBg"
          >
            <Center bg="transparent" h={{ base: "13vh", md: "0vh" }} />
            <Center
              mt="100px"
              w={{ base: "97%", lg: "90%" }}
              h={{ base: "95%", lg: "90%" }}
              p="10px"
              flexDirection={["row", "row"]}
              gridGap={"10"}
            >
              <Center
                borderRadius={"10px"}
                bg="#fccfd7"
                w={{ base: "100%", lg: "43%" }}
                h="100%"
                p="10px"
                flexDir={"column"}
                className="box1Checkout"
              >
                {/* House the selected events */}
                <EventsList
                  events={events}
                  token={user.token}
                  setEvents={setEvents}
                />
              </Center>
              <Center
                borderRadius={"10px"}
                bg="#fccfd7"
                w={{ base: "100%", lg: "43%" }}
                h="100%"
                p="10px"
                flexDir={"column"}
                className="box1Checkout"
              >
                {/* Display total price and donations */}
                <CheckoutForm
                  participations={events}
                  user={user}
                  setEvents={setEvents}
                />
              </Center>
            </Center>
            <Center bg="transparent" h={{ base: "10vh", md: "0vh" }} />
          </Center>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = cookie.parse(req.headers.cookie || "")["eta_token"];
  if (!token) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return { props: {} };
  } else {
    return { props: {} };
  }
}
