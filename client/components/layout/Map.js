import { Flex, Text, AspectRatio, Center } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <Flex
    justify="center"
    gap={1}
    as="footer"
    bg="#EAA16C"
    w="100%"
    align="center"
    >
      <Flex
      justify="center"
      mx={6}
      my={8}
      wrap="wrap"
      flexDir={"row"}
      //gap="100px"
      >
        <Flex
        flex={3}
        h="auto" 
        minW="300px"
        maxW="700px"
        //bg="red" 
        justify="center" 
        flexDir="column"
        pb={10}
        pl={4}
        >
            <Text 
            fontSize="4xl"
            color="white"
            maxW="90%"
            pb={5}
            >
            Fr. C. Rodrigues Institute of Technology</Text>

            <Text 
            maxW="80%"
            color={"white"}
            pb={4}
            >
            Agnel Technical Education Complex, Sector 9-A, Vashi, Navi Mumbai, Maharashtra, India, PIN - 400703</Text>
            
            <Flex 
            cursor="pointer"
            >
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagram 
              fontSize="27px" 
              color="white"
              />
            </a>
            </Flex>
          <Text/> 
        </Flex> 

        <Center
          flex={1}
          minW="500px"
          maxW="500px"
          h="auto" 
          justify="center"
          className="mapFcrit"
          >
            <AspectRatio
            ratio ={16/9}
            w="100%"
            h="auto"
            className="mapPreFooter"
            >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.732104373434!2d72.98951561490115!3d19.07551268708821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6cae0d8c5ab%3A0xbbf4481d662ca2d8!2sFr.%20Conceicao%20Rodrigues%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1676717200806!5m2!1sen!2sin" 
              style={{border:1}}
              allowfullscreen="" 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </AspectRatio>
          </Center>
      </Flex>
    </Flex>
  );
}
