import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import Background from "../components/misc/Background";
import "@fontsource/birthstone-bounce";
import Sponsors from "../components/misc/Sponsors";
import FeaturedEvents from "../components/misc/FeaturedEvents";
import { API_BASE_URL } from "../config";

export default function Home(props) {
  const [over, setOver] = useState(false);
  // deadline to be on 10th March 2022 IST
  let deadline = new Date("2022-03-10T18:30:00.000Z").getTime();
  let now = new Date().getTime();
  const [daysLeft, setDaysLeft] = useState(
    Math.floor((deadline - now) / (1000 * 60 * 60 * 24))
  );

  function tick() {
    now = new Date().getTime();
    let t = deadline - now;
    setDaysLeft(Math.floor(t / (1000 * 60 * 60 * 24)));
    if (t <= 0) {
      setOver(true);
    }
  }

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    // window.addEventListener("mousedown", function(e) {
    //   var amt = randNum(1, 3);
    //   for (var i = 0; i < amt; i++) {
    //     var top = randNum(e.clientY - 30, e.clientY + 30);
    //     var left = randNum(e.clientX - 30, e.clientX + 10);
    //     var flower = new Flower({
    //       top: top,
    //       left: left,
    //     });
    //   }
    // });

    // return () => {
    //   window.removeEventListener("mousedown", () => {
    //     console.log("removed");
    //   });
    // };
  },
   []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;

      let ele = document.getElementById("background-image");
      if (ele) ele.style.transform = `translateY(${dist * 0.1}px)`;
    });
  }, []);

  return (
    <>
      <Head>
        <title>ETAMAX-23</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="title" content="ETAMAX-22" />
        <meta
          name="description"
          content="Annual technical and cultural festival organised at F.C.R.I.T"
        />
      </Head>
      
      <Layout scrollYVar={450}>
        <Flex h="120vh" maxW="100vw" flexDirection="column" className="homeBackground"> 
        </Flex>
        
        <FeaturedEvents events={props.events}  />
        {/* <Sponsors /> */}
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${API_BASE_URL}/e/featured/`).then((response) =>
      response.json()
    );
    return {
      props: {
        events: res.events,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("Error", error);
    return {
      props: {},
    };
  }
}
