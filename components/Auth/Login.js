// Login.js
import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { useHistory, NavLink } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { collection, getDocs, query, where } from "firebase/firestore";



const Login = () => {
  
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({})
  const toast=useToast()
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if(user && user.uid){
        const rolesRef = collection(db, 'roles');
        const userRole = await getDocs(query(rolesRef, where('uid', '==', user.uid)));
        sessionStorage.setItem('uid',user.uid)
        if (!userRole.empty) {
          const role = userRole.docs[0].data().role;
          if (role == 'Partner') {
            toast({
              description: "Sign In Successfully as Partner",
              status: "success",
              position: 'top',
              duration: 1000,
              isClosable: true,
            });
            history.push("/partner/home");
          }
          else{
            toast({
              description: "You are not a partner",
              status: "success",
              position: 'top',
              duration: 1000,
              isClosable: true,
            });
          }
        }
        else{
          toast({
            description: "You are not a partner",
            status: "error",
            position: 'top',
            duration: 1000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        description: "Wrong Email or Password",
        status: "error",
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        //w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button> */}
          {/* <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex> */}
          <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              onChange={(e) => setEmail(e.target.value)}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              value={email}
              placeholder='hello@email.com'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                onChange={(e) => setPassword(e.target.value)}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                value={password}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/login'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              type="submit"
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Sign In
            </Button>
          </FormControl>
          </form>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/signup'>
              {/* <a href="https://bizowl-auth.web.app"> */}
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
                {/* </a> */}
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;

