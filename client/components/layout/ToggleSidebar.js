import React from "react";
import {AiOutlineHome,AiOutlineShoppingCart} from "react-icons/ai";
import {CgProfile,CgLogOut,CgLogIn} from "react-icons/cg";
import {BsCalendar2Event} from 'react-icons/bs';
import {BiLogIn} from 'react-icons/bi'

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


export default function ToggleSidebar(){
    const [isOpen, setIsopen] = useState(false);
    const [color, setColor] = useState("purple");
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
    function useOutsideAlerter(ref) {
      useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            if(isOpen) setIsopen(false);
            
          }
        }
        document.addEventListener("scroll", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("scroll", handleClickOutside);
        };
      }, [ref]);
    }
    function OutsideAlerter(props) {
      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);
    
      return <div ref={wrapperRef}>{props.children}</div>;
    }
    const ToggleSidebar = () => {
        // console.log('click');
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <>
         <OutsideAlerter>
            <div className=" sideMenu">
                
                    <nav className="navbar navbarPadding p-0 navbar-expand-lg shadow-md">
                        <div className="container-fluid">
                        <div className="">
                                <div className=" btnNav" onClick={ToggleSidebar} >
                                   <HamburgerIcon boxSize={6}/>
                                </div>
                            </div>
                           
                            <a className="navbar-brand textNav EtamaxNavbar">ETAMAX 2023</a>
                            <a className="navbar-brand textNav "  href="/events"><img src="/event-ticket.png" className="navbarImg" /></a>
                        </div>
                    </nav>
                   
                    <div className={`activeSlideBar sidebar ${isOpen == true ? 'active' : ''}`}>
            
                        <div className="sd-header">
                            <h4 className="mb-0 logoHeading">Etamax 2023</h4>
                            <button className="buttonClose" onClick={ToggleSidebar}> <CloseIcon /></button>
                        </div>
                        <div className="sd-body">
                            <ul>
                            
                            <Stack
            >
              <MenuItems
                isDisabled={false}
                color={color}
                to="/"
                nextLink={true}
                align="left"
              >
                 <Flex justify="flex-start"gridGap={"4"}>
                <AiOutlineHome/>
                Home
                </Flex>
              </MenuItems>
              <MenuItems
                isDisabled={false}
                color={color}
                to="/events"
                nextLink={true}
              >
                 <Flex gridGap={"4"}>
                <BsCalendar2Event/>
                Events
                </Flex>
              </MenuItems>


              {!loggedIn && (
                  <MenuItems
                    isDisabled={false}
                    color={color}
                    to="/register"
                    nextLink={false}
                  > 
                  <Flex gridGap={"4"}>
                    <BiLogIn/>
                    Register
                    </Flex>
                  </MenuItems> 
              )}        
              {!loggedIn && (
                <MenuItems
                  isDisabled={false}
                  color={color}
                  to="/login"
                  nextLink={false}
                > 
                <Flex gridGap={"4"}>
                  <BiLogIn/>
                  Login
                  </Flex>
                </MenuItems>
                )}
                 
                
                
              
              {loggedIn && (
                <MenuItems
                  isDisabled={false}
                  color={color}
                  to="/profile"
                  nextLink={false}
                > <Flex gridGap={"4"}>
                  <CgProfile/>
                  Profile
</Flex>
                </MenuItems>
              )}
              {loggedIn && (
                <MenuItems
                  isDisabled={false}
                  color={color}
                  to="/checkout"
                  nextLink={false}
                >
                  <Flex gridGap={"4"}>
                  <AiOutlineShoppingCart />
                    <Box>Checkout</Box>
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
                    // bgColor: `purple.100`,
                    // bgGradient: `radial(circle, transparent 1%, purple.${step2} 1%)`,
                    // bgPos: "center",
                    // backgroundSize: "15000%",
                    // color: "purple.300",
                    // outline: "none",
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
                   <Flex gridGap={"4"}>
                   <CgLogOut/>
                  Logout
                   </Flex>
                  
                </Button>
              )}
            </Stack>
                            </ul>
                        </div>
                    </div>
                   
                    <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
           </div>
           </OutsideAlerter>
        </>
    )
}