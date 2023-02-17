import React from "react";
import { ReactDOM } from "react";
import {
    Box,
    Center,
    Heading,
    Button,
    Flex,
    Collapse,
    SlideFade,
    Stack,
    useColorModeValue,
    useToast,
    createIcon,
  } from "@chakra-ui/react";
  import {CloseIcon,HamburgerIcon} from '@chakra-ui/icons';
  import LinkButtons from "./LinkButtons";
  import { useState, useEffect, useRef } from "react";
  import { API_BASE_URL } from "../../config";
  import router from "next/router";

  function MenuItems({ children, to, color, nextLink, isDisabled }) {
    return (
      <LinkButtons
        isDisabled={isDisabled}
        color={color}
        to={to}
        nextLink={nextLink}
      >
        {children}
      </LinkButtons>
    );
  }
  const ShoppingCartIcon = createIcon({
    displayName: "shopping cart",
    viewBox: "0 0 576 512",
    // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
    path: (
      <path
        fill="currentColor"
        d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
      />
    ),
  });


export default function ToggleSidebar(){
    const [isOpen, setIsopen] = useState(false);
    const [color, setColor] = useState("purple.900");
    const [loggedIn, setLoggedIn] = useState(false);
    const step2 = useColorModeValue("300", "200");
    const toast = useToast();
    const successToast = useToast({
      position: "top-right",
      duration: 3000,
      status: "success",
      isClosable: true,
    });
  
    useEffect(() => {

  
      const user = localStorage.getItem("eta_user");
      if (user) {
        setLoggedIn(true);
      }
    }, []);
  
    async function handleLogout() {
      let user = JSON.parse(localStorage.getItem("eta_user"));
      if (user) {
        const res = await fetch(`${API_BASE_URL}/u/auth/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${user.token}`,
          },
          redirect: "follow",
          referrer: "no-referrer",
        }).catch((err) => {
          console.error(err);
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        });
        if (res.status == 200) {
          function delete_cookie(name) {
            document.cookie =
              name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          }
          delete_cookie("eta_token");
          localStorage.removeItem("eta_user");
          setLoggedIn(false);
          successToast({
            title: "Success",
            description: "Logged out successfully",
          });
          router.push("/");
        }
      }
    }
  
    const ToggleSidebar = () => {
        console.log('click');
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    return (
        <>
            <div className=" sideMenu">
                
                    <nav className="navbar navbar-expand-lg shadow-md">
                        <div className="container-fluid p-2">
                        <div className="">
                                <div className=" btnNav" onClick={ToggleSidebar} >
                                   <HamburgerIcon boxSize={6}/>
                                </div>
                            </div>
                            <a className="navbar-brand textNav ">Etamax 2023</a>
                            <a className="navbar-brand textNav " href="/events">Events</a>
                        </div>
                    </nav>
                    <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
            
                        <div className="sd-header">
                            <h4 className="mb-0">Etamax 2023</h4>
                            <button onClick={ToggleSidebar}> <CloseIcon /></button>
                        </div>
                        <div className="sd-body">
                            <ul>
                            <Stack
              justify={["center", "center", "center", "center"]}
              direction={["column", "column", "column", "column"]}
              pt={[4, 4, 0, 0]}
            >
              <MenuItems
                isDisabled={false}
                color={color}
                to="/"
                nextLink={true}
              >
                Home
              </MenuItems>
              <MenuItems
                isDisabled={false}
                color={color}
                to="/events"
                nextLink={true}
              >
                Events
              </MenuItems>
              {!loggedIn && (
                <MenuItems
                  isDisabled={false}
                  color={color}
                  to="/login"
                  nextLink={false}
                >
                  Login
                </MenuItems>
              )}
              {loggedIn && (
                <MenuItems
                  isDisabled={false}
                  color={color}
                  to="/profile"
                  nextLink={false}
                >
                  Profile
                </MenuItems>
              )}
              {loggedIn && (
                <MenuItems
                  isDisabled={false}
                  color={color}
                  to="/checkout"
                  nextLink={false}
                >
                  <Flex gridGap={"1"}>
                    <Box>Checkout</Box>
                    <ShoppingCartIcon />
                  </Flex>
                </MenuItems>
              )}
              {loggedIn && (
                <Button
                  bg="transparent"
                  color={color}
                  fontWeight="medium"
                  size={"lg"}
                  _focus={{
                    outline: "none",
                  }}
                  transition="all 0.3s"
                  backgroundPosition="center"
                  _hover={{
                    bgColor: `purple.100`,
                    bgGradient: `radial(circle, transparent 1%, purple.${step2} 1%)`,
                    bgPos: "center",
                    backgroundSize: "15000%",
                    color: "purple.300",
                    outline: "none",
                  }}
                  _active={{
                    bgColor: `purple.200`,
                    backgroundSize: "100%",
                    transition: "background 0s",
                    color: "purple.500",
                    outline: "none",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Stack>
                            </ul>
                        </div>
                    </div>
                    <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
           </div>
           
        </>
    )
}
