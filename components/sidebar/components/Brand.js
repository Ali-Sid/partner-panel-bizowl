import React, { useState } from "react";
import logo from "assets/img/layout/logo-of-BIZOWL--Business-Services.png"
import ProfileIcon from "../../../assets/img/sidebar/pajamas_profile.svg";
// Chakra imports
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

function SidebarBrand() {

  const [ partnerName, setPartnerName ] = useState("Omraj");
  //   Chakra color mode
  // let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <a href="https://www.bizzowl.com">
      <img src={logo} alt="Bizowl-logo" height="26px" width="175px" style={{margin: "32px 0"}} />
      </a>
      <img src={ProfileIcon} style={{width:"4rem"}} />
      <h1 style={{marginTop:"1rem", fontWeight:"bold",fontSize:"1.5rem"}}>Hello, {partnerName} !</h1>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
