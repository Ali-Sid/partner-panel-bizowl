// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
// import { UserContext } from "components/Auth/Signup";
import { db } from "config/firebase";
import { onSnapshot, collection, query, where, getDoc } from 'firebase/firestore';

// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function HeaderLinks({ secondary } = {}) {


  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const history = useHistory();
  const [userData, setUserData] = useState(null);
  const [currentUser,setCurrentUser]=useState(null)
  const userUid=sessionStorage.getItem("uid")
  const toast=useToast()
 
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      history.push("/login");
      toast({
        description: "Logout Successfully",
        status: "success",
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };


  const [unSubscribe,setUnSubscribe]=useState(null)

  useEffect(() => {
    getCurrentUser();
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, []);

  const getCurrentUser = async () => {
    try {
      console.log(userUid)
      const userQuery = query(collection(db, 'partners'), where('uid', '==', userUid));
      const subScribe= onSnapshot(userQuery, (snapshot) => {
        console.log(snapshot)
        const users = snapshot.docs.map((doc, index) => {
          return({
            ...doc.data(),
            id: doc.id,
          })
        });
        console.log(users)
        if(users && users.length>0){
          setCurrentUser(users[0])
          sessionStorage.setItem('userId',users[0]?.id)
        }
      });
      setUnSubscribe(()=>subScribe)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me="10px"
        borderRadius="30px"
      />
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex jusitfy="space-between" w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              cursor="pointer"
            >
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent info="aaaaaaaaaaaaaaa" aName="Alicia" />
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent info="gggggg" aName="Josh Henry" />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            name="Adela Parkson"
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            {currentUser && (
              <Text
                ps="20px"
                pt="16px"
                pb="10px"
                w="100%"
                borderBottom="1px solid"
                borderColor={borderColor}
                fontSize="sm"
                fontWeight="700"
                color={textColor}
              >
                👋&nbsp; Hey, {currentUser.name || (currentUser.email ? currentUser.email.replace(/^@.*/, "") : "") || "user"}
              </Text>
            )}
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px" >
							<Text fontSize="sm" >Profile Settings</Text>
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Text fontSize="sm">Newsletter Settings</Text>
						</MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <button onClick={handleLogout} fontSize="sm">
                Log out
              </button>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
