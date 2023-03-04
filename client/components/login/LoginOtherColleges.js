import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Select,
  InputLeftAddon,
  InputGroup,
  useToast,
  toast,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../config";
import Success from "../alerts/Success";
import * as ga from "../../libs/ga";
import NextLink from "next/link";
import {firebase} from "@firebase/app";
import "@firebase/auth";
import axios from "axios";

const LoginOtherColleges = () => {
  const PHONE_VERIFICATION_STATUS = {
    NOT_SENT: 0,
    SENT_UNVERIFIED: 1,
    SENT_VERIFIED: 2
  }

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerification, setPhoneVerification] = useState({
    status: PHONE_VERIFICATION_STATUS.NOT_SENT,
    number: "",
    otp: ""
  })
  const [unconfirmedPhone, setUnconfirmedPhone] = useState("");
  const [values, setValues] = useState({
    email: "",
    name: "",
    college: "",
    department: "COMP",
    semester: "",
    phone_no: "",
  });
  const errorToast = useToast({
    position: "top-right",
    duration: 3000,
    status: "error",
    isClosable: true,
  });
  const successToast = useToast({
    position: "top-right",
    duration: 3000,
    // render: () => <Success message={"Successfully registered"}/>,
    isClosable: true,
  });

  const router = useRouter();

  const validateInput = () => {
    const departments = ["COMP", "IT", "EXTC", "ELEC", "MECH", "OTHERS"];
    const {
      name,
      email,
      college,
      department,
      semester: s,
      phone_no: p,
    } = values;
    let semester = parseInt(s);
    let phone_no = parseInt(p);
    if (name.trim() == "") {
      errorToast({title: "Name is required!"});
      return false;
    }
    if (college.trim() == "") {
      errorToast({title: "College is required!"});
      return false;
    }
    if (!departments.includes(department.trim())) {
      errorToast({title: "Department is required!"});
      return false;
    }
    if (Number.isNaN(semester) || semester < 1 || semester > 8) {
      errorToast({title: "Semester should be between 1 and 8!"});
      return false;
    }
    if (Number.isNaN(phoneVerification.number) || phoneVerification.number.trim().length < 10 || phoneVerification.status === PHONE_VERIFICATION_STATUS.NOT_SENT) {
      errorToast({title: "Enter a valid Phone Number or verify Phone Number"});
      return false;
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errorToast({
        title: "Enter a valid Email!",
      });
      return false;
    }
    return true;
  };

  const isRegistered = async (email, phone_no) => {
    let body;
    if (email) {
      body = {email};
    } else {
      body = {phone_no};
    }
    fetch(`${API_BASE_URL}/u/exists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          return res.exists;
        }
      })
      .catch((res) => {
        errorToast({title: "Something went wrong!"});
      });
    return false;
  };

  const handleSubmit = async (e) => {
    // validate input
    if (!validateInput()) return;

    const {
      name,
      email,
      college,
      department,
      semester: s,
    } = values;
    let semester = Number.parseInt(s);

    const p = phoneVerification.number
    // check if email is already registered
    if (await isRegistered(email, null)) {
      errorToast({title: "Email is already registered!"});
      return;
    }
    // check if phone number is already registered
    if (await isRegistered(null, "+91" + p)) {
      errorToast({title: "Phone Number is already registered!"});
      return;
    }
    // resgister user
    try {
      const res = await fetch(`${API_BASE_URL}/u/request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          name,
          email,
          college,
          department,
          semester,
          phone_no: "+91" + p,
        }),
      });
      const data = await res.json();
      if (data.success) {
        ga.event({
          action: "User Request",
          params: {
            college,
            department,
            semester,
          },
        });
        successToast({
          title: "Request sent successfully!",
          description: "You will recieve an email when approved",
        });
        router.push("/");
      } else {
        console.log(data);
        for (let x in data.errors) {
          errorToast({title: data.errors[x]});
        }
      }
    } catch (err) {
      errorToast({title: "Something went wrong!"});
    }
  };

  const handleChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE));
  } else {
    firebase.app();
  }

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: () => {},
      }
    );
  }, [])


  function login() {
    console.log()
    const appVerifier = window.recaptchaVerifier;
    if (phoneVerification.status === PHONE_VERIFICATION_STATUS.NOT_SENT) {
      firebase
        .auth()
        .signInWithPhoneNumber("+91" + phoneVerification.number, appVerifier)
        .then((_verify) => {
          setPhoneVerification((prev) => ({
            ...prev,
            status: PHONE_VERIFICATION_STATUS.SENT_UNVERIFIED
          }))
          window.verify = _verify;
        })
        .catch(console.log);
      return;
    }
    console.log("Here")
    window.verify
      .confirm(phoneVerification.otp)
      .then((stuff) => {
        console.log("In callback")
        setPhoneVerification((prev) => ({
          ...prev,
          status: PHONE_VERIFICATION_STATUS.SENT_VERIFIED
        }))
        successToast({
          title: "Phone Verified!",
          description: "Your phone number has been verified",
        });
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async (user) => {
          }).catch(() => errorToast({title: "An error occured"}));
      })
      .catch((stuff) => {
        errorToast({title: "An error occured"})
      });
  }

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={"transparent+"}
      borderRadius={"10px"}
      flexDir={"column"}
    >
      <Stack w="100%" spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
          <Heading fontSize={"2xl"} color="red.600" textAlign={"center"}>
            *Only for Non-FCRIT Students
          </Heading>
          </Stack>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          p={8}
          className="box1Checkout"
        >
          
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter your full name here"
                  borderColor= "black.400"
                  color={"black.800"}
                  _focus={{
                    outline: "none",
                    borderColor: "black.400",
                    borderWidth: "2px",
                  }}
                  _hover={{
                    borderColor: "black.300",
                    borderWidth: "2px",
                  }}
                />
              </FormControl>
            </Box>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                borderColor= "black.400"
                color={"black.800"}
                _focus={{
                  outline: "none",
                  borderColor: "black.400",
                  borderWidth: "2px",
                }}
                _hover={{
                  borderColor: "black.300",
                  borderWidth: "2px",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Semester</FormLabel>

              <Input
                type="number"
                max="8"
                min="1"
                value={values.semester}
                name="semester"
                onChange={handleChange}
                placeholder="5"
                borderColor= "black.400"
                color={"black.800"}
                _focus={{
                  outline: "none",
                  borderColor: "black.400",
                  borderWidth: "2px",
                }}
                _hover={{
                  borderColor: "black.300",
                  borderWidth: "2px",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Branch</FormLabel>
              <Select
                placeholder="Select branch"
                value={values.department}
                name="department"
                onChange={handleChange}
                borderColor= "black.400"
                  color={"black.800"}
                _focus={{
                  outline: "none",
                  borderColor: "black.400",
                  borderWidth: "2px",
                }}
                _hover={{
                  borderColor: "black.300",
                  borderWidth: "2px",
                }}
              >
                <option value={"COMP"}>Computer</option>
                <option value={"IT"}>IT</option>
                <option value={"EXTC"}>EXTC</option>
                <option value={"ELEC"}>Electrical</option>
                <option value={"MECH"}>Mechanical</option>
                <option value={"OTHERS"}>Other</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>College</FormLabel>
              <Input
                type="text"
                value={values.college}
                name="college"
                onChange={handleChange}
                placeholder="Enter your college name and location"
                borderColor= "black.400"
                color={"black.800"}
                _focus={{
                  outline: "none",
                  borderColor: "black.400",
                  borderWidth: "2px",
                }}
                _hover={{
                  borderColor: "black.300",
                  borderWidth: "2px",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+91"/>
                {/* <Input type='tel' placeholder='phone number' /> */}
                <Input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={phoneVerification.number}
                  name="phone_no"
                  onChange={(e) => setPhoneVerification((prev) => ({
                    ...prev,
                    status: PHONE_VERIFICATION_STATUS.NOT_SENT,
                    number: e.target.value
                  }))}
                  placeholder="Your phone no."
                  borderColor= "black.400"
                  color={"black.800"}
                  _focus={{
                    outline: "none",
                    borderColor: "black.400",
                    borderWidth: "2px",
                  }}
                  _hover={{
                    borderColor: "black.300",
                    borderWidth: "2px",
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired display={phoneVerification.status === PHONE_VERIFICATION_STATUS.SENT_VERIFIED || phoneVerification.status === PHONE_VERIFICATION_STATUS.NOT_SENT ? "none" : "block"}>
              <FormLabel>Verification Code</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={phoneVerification.otp}
                  name="otp"
                  onChange={(e) => setPhoneVerification((prev) => ({
                    ...prev,
                    otp: e.target.value
                  }))}
                  placeholder="Verification Code"
                  borderColor= "black.400"
                  color={"black.800"}
                  _focus={{
                    outline: "none",
                    borderColor: "black.400",
                    borderWidth: "2px",
                  }}
                  _hover={{
                    borderColor: "black.300",
                    borderWidth: "2px",
                  }}
                />
              </InputGroup>
            </FormControl>
            <div
              id="recaptcha-container"
              style={{
                display: phoneVerification.status === PHONE_VERIFICATION_STATUS.NOT_SENT ? "block" : "none"
              }}
            />
            <FormControl isRequired display={phoneVerification.status === PHONE_VERIFICATION_STATUS.SENT_VERIFIED ? "none" : "block"}>
              <Button bg="red.400" onClick={login}
                      disabled={!(phoneVerification.number.length === 10)}
                      m={2} color="white" 
                      borderColor= "black.400"
                      // color={"black.800"}
                      _hover={{
                        bg: "red.900",
                        }}>
                {phoneVerification.status === PHONE_VERIFICATION_STATUS.SENT_UNVERIFIED ? "Verify OTP" : "Verify Phone"}
              </Button>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={"red.500"}
                color={"white"}
                borderColor= "black.400"
                _hover={{
                  bg: "red.900",
                  }}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Text pb="30px" color="purple.500">
        Need help with registration ?{" "}
        <b>
          <NextLink href="/contact-council">Click here</NextLink>
        </b>
      </Text>
      <Text pb="30px" color="red.500">
        Already Registered?{" "}
        <b>
          <NextLink href="/login">Click here</NextLink>
        </b>
      </Text>
    </Flex>
  );
};

export default LoginOtherColleges;
