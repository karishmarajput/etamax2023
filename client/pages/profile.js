import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Avatar,
  HStack,
  InputGroup,
  Stack,
  Link,
  Select,
  Button,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  useToast,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Layout from "../components/layout";
import Head from "next/head";
//import Background from "../components/misc/Background";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import * as cookie from "cookie";
import axios from "axios";
import { firebase } from "@firebase/app";
import "@firebase/auth";

import EventsList from "../components/checkout/EventsList";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "purple.400",
          color: "white",
          borderColor: "purple.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        m={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function Profile(props) {
  const [profile, setProfile] = useState(props.profile);
  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);
  const [phoneSet, setPhoneSet] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [token, setToken] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const userJSON = localStorage.getItem("eta_user");
    if (!userJSON) {
      router.replace("/login");
      return;
    }
    let user = JSON.parse(userJSON);
    setToken(user.token);
  }, []);

  function randomAvatar() {
    var randomAvatar = `https://avatars.dicebear.com/api/human/${Math.random()
      .toString(36)
      .substring(2, 5)}.svg`;
    setProfile({ ...profile, avatar: randomAvatar });
  }

  
  if (!firebase.apps.length) {
    // console.log(process.env.NEXT_PUBLIC_FIREBASE)
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE));
  } else {
    firebase.app();
  }

  const departments = ["COMP", "IT", "EXTC", "MECH", "ELEC", "OTHER"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "department",
    value: profile.department,
    readOnly: true,
  });

  const group = getRootProps();

  function login() {
    var recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: () => setOTPSent(true),
      }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(profile.phone_no, recaptchaVerifier)
      .then((_verify) => (window.verify = _verify))
      .catch(console.log);
  }

  function verifyOTP() {
    window.verify
      .confirm(OTP)
      .then((stuff) => {
        console.log(stuff);
        console.log(profile.phone_no+"phone")
        setPhoneSet(true);
        toast({
          title: "Phone verification succesful",
          position: "top-right",
          duration: 3000,
          status: "success",
        });
        setEditPhone(false);
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async (user) => {
            console.log({
              user,
              token: profile.token,
            })
            await axios({
              url: `${API_BASE_URL}/u/auth/otp-verify/`,
              method: "POST",
              headers: {
                Authorization: 'Token ' + JSON.parse(localStorage.getItem("eta_user")).token
              },
              data: {
                user,
                token: profile.token,
                phone_no: profile.phone_no,
                secret: "BRUH"
              },
            });
            }).catch(console.log);
      })
      .catch((stuff) => {
        toast({
          title: "OTP Wrong, I guess",
          position: "top-right",
          duration: 3000,
          status: "error",
        });
      });
  }

  async function updateProfile() {
    console.log("Update")
    await axios({
      url: `${API_BASE_URL}/u/avatar/update/`,
      method: "POST",
      data: {
        avatar: profile.avatar,
      },
      headers: {
        Authorization:
          "Token " + JSON.parse(localStorage.getItem("eta_user")).token,
      },
    }).catch((e)=>console.log(e));

    await axios({
      url: `${API_BASE_URL}/u/update/`,
      method: "POST",
      data: {
        token: profile.token,
        name: profile.fname + " " + profile.lname,
        phone_no: profile.phone_no,
        semester: profile.semester

      },
      headers: {
        Authorization:
          "Token " + JSON.parse(localStorage.getItem("eta_user")).token,
      },
    });
    toast({
      title: "Profile updated succesfully",
      position: "top-right",
      duration: 3000,
      status: "success",
    });
  }

  useEffect(() => {
    var fname = profile?.name?.split(" ")[0];
    var lname =
      profile?.name?.split(" ")?.length == 2 ? profile?.name?.split(" ")[1] : "";
    setProfile({ ...profile, fname, lname });
  }, []);

  return (
    <>
      <Head>
        <title>FACES-22 | Profile</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <style jsx>{`
        div {
          margin-top: 2rem;
        }
        
      `}</style>
      <Layout scrollYVar={80}>
        <Center
          //backgroundImage={"assets/checkout.svg"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          h={{ base: "auto", lg: "130vh" }}
          w={"100vw"}
          flexDir={"column"}
          // className="mobileBg"
        >
          <div className="profileEditDiv" >
          <Center bg="transparent" h={{ base: "13vh", md: "15vh" }}/>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"} color="#805D93">
              Profile
            </Heading>
            {/* <Text fontSize={"2xl"} color={"purple.500"}>
              to participate in all events ✌️
            </Text> */}
          </Stack>
          </div>
          <Center
            w={{ base: "97%", lg: "90%" }}
            h={{ base: "95%", lg: "90%" }}
            p="10px"
            flexDirection={["column", "row"]}
            gridGap={"10"}
          >
            <Center
              borderRadius={"10px"}
              w={{ base: "100%", lg: "43%" }}
              h="99%"
              p="10px"
              flexDir={"column"}
              
            >
              <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8} className="box1Checkout">
                <Stack spacing={4}>
                  <Flex align="center">
                    <Avatar
                      size={"xl"}
                      src={profile.avatar}
                      alt={"Avatar Alt"}
                      mb={4}
                      pos={"relative"}
                      onClick={randomAvatar}
                      _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: "green.300",
                        border: "2px solid white",
                        rounded: "full",
                        pos: "absolute",
                        bottom: 0,
                        right: 3,
                      }}
                    />
                    <Button
                      bg="purple.800"
                      onClick={randomAvatar}
                      m={2}
                      ml={5}
                      color="white"
                      _hover={{
                        bg: "purple.500",
                      }}
                    >
                      SHUFFLE
                    </Button>
                  </Flex>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          type="text"
                          value={profile.fname}
                          onChange={(e) =>
                            setProfile({ ...profile, fname: e.target.value })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          type="text"
                          value={profile.lname}
                          onChange={(e) =>
                            setProfile({ ...profile, lname: e.target.value })
                          }
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={profile.email}
                      readOnly
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Department</FormLabel>
                    <Flex wrap="wrap">
                        <Button 
                        bg="purple.800"
                        color="white"
                        _hover={{
                        bg: "purple.500",
                      }}>{profile.department}</Button>
                    </Flex>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Semester</FormLabel>
                    <Select
                      placeholder="Select Semester"
                      // readOnly or disabled -> which one to choose ?
                      // readOnly
                      value={profile.semester}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          semester: Number(e.target.value),
                        })
                      }
                    >
                      {[2, 4, 6, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl m={1}>
                    <FormLabel>Phone</FormLabel>
                    <InputGroup>
                      <InputLeftElement background="transparent">
                        +91
                      </InputLeftElement>
                      <Input
                        name="phone"
                        defaultValue={
                          profile.phone_no && profile.phone_no.substring(3)
                        }
                        id="phone"
                        readOnly={!editPhone}
                        maxLength={10}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone_no: "+91" + e.target.value,
                            
                          })
                        }
                      />
                      
                      <InputRightElement>
                        {editPhone || (
                          <EditIcon
                            onClick={() => setEditPhone(true)}
                            display="inline"
                            cursor="pointer"
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {editPhone && (
                      <Button bg="purple.400" onClick={login} m={2} color="white">
                        Verify OTP
                      </Button>
                    )}
                    <Flex
                      id="recaptcha-container"
                      pl={3}
                      display={OTPSent && "none"}
                    />
                  </FormControl>
                  {!phoneSet && OTPSent && (
                    <FormControl m={1}>
                      <FormLabel>OTP</FormLabel>
                      <Input
                        id="otp"
                        onChange={(e) => setOTP(e.target.value)}
                      />
                      <Button
                        onClick={verifyOTP}
                        bg={"purple.400"}
                        m={3}
                        color="white"
                      >
                        Submit OTP
                      </Button>
                    </FormControl>
                  )}
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"purple.800"}
                      color={"white"}
                      onClick={updateProfile}
                      _hover={{
                        bg: "purple.500",
                      }}
                    >
                      Save Profile
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Center>
            <Center
              borderRadius={"10px"}
              bg="white"
              w={{ base: "100%", lg: "43%" }}
              h="96%"
              p="10px"
              flexDir={"column"}
              className="box1Checkout"
            >
              <EventsList
                events={profile.participations.filter((p) => p.transaction)}
                token={token}
                setEvents={console.log}
                isProfile
              />
            </Center>
          </Center>
          <Center bg="transparent" h={{ base: "10vh", md: "10vh" }} />
        </Center>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  var token = cookie.parse(req.headers.cookie || "")["eta_token"];
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
  try {
    var profile = await axios({
      url: `${API_BASE_URL}/u/me`,
      headers: {
        Authorization: "Token " + token,
      },
    });
    return {
      props: {
        profile: profile.data.user,
      },
    };
  } catch (e) {
    console.log(e);
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
}
