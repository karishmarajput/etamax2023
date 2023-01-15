import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Background({ pageName }) {
  // Current idea is to include parallax effect in the background and have it move with the scroll
  // Minified version of the events will be displayed later

  return (
    <>
      <Box bg="#fff2f6" h="300vh" w="100vw" position="fixed" zIndex="-5" />
      {pageName == "Home" && (
        <Box
          as="img"
          src={"https://raw.githubusercontent.com/dark-shad/etamax_imagaes/3b3f990ef802863785afe155daf84ab24333594e/Untitled%20design%20(2).svg"}
          alt={"Background test"}
          position="fixed"
          zIndex="-2"
          objectFit="cover"
          backgroundPosition="center"
          backgroundSize="cover"
          h="100vh"
          w="100%"
          id="background-image"
          className="mobileBg"
        />
      )}
      {pageName == "Events" && (
        <Box
          as="img"
          src={"https://github.com/dark-shad/etamax_imagaes/blob/main/Udaan.png?raw=true"}
          alt={"Background test"}
          position="fixed"
          zIndex="-2"
          objectFit="cover"
          backgroundPosition="center"
          backgroundSize="cover"
          h="100vh"
          w="100%"
          id="background-image"
          className="mobileBg"
        />
      )}
      {pageName == "Login" && (
        <Box
          as="img"
          src={"https://github.com/dark-shad/etamax_imagaes/blob/main/Udaan.png?raw=true"}
          alt={"Background test"}
          position="fixed"
          zIndex="-2"
          objectFit="cover"
          backgroundPosition="center"
          backgroundSize="cover"
          h="100vh"
          w="100%"
          id="background-image"
          className="mobileBg"
        />
      )}
    </>
  );
}
