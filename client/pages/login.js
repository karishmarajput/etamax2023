import {
  Box,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Center,
} from "@chakra-ui/react";
import LoginFormNew from "../components/login/LoginFormNew";
//import Background from "../components/misc/Background";
import Head from "next/head";
import * as cookie from "cookie";
import ToggleSidebar from "../components/layout/ToggleSidebar";
import Marquee from "../components/layout/Marquee";
import Footer from "../components/layout/Footer";
//if (typeof window !== "undefined") {
//  import("../components/utils/blossom");
//}

export default function Login(props) {
  return (
    <>
      <Head>
        <title>ETAMAX-23 | Login</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Marquee/>
      <ToggleSidebar/>
      <Box
        id="blossom-container"
        w="100vw"
        alignItems="center"
        borderRadius="lg"
        className="bgLogin"
      >
        <Center>
          <Tabs
            w={["90%", "80%", "60%", "60%"]}
            mt={10}
            isFitted
            variant="solid-rounded"
          >
            <TabList>
              {/* <Tab
                _selected={{ color: "white", bg: "purple.800" }}
                fontSize={"xl"}
                color="purple.800"
                _focus={{ outline: "none!important" }}
                
              >
                Login
              </Tab> */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginFormNew />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
      <Footer/>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = cookie.parse(req.headers.cookie || "")["eta_token"];
  if (token) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  return { props: {} };
}
