// src/components/Auth/Register.js
import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useHistory, NavLink } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { serviceOptions } from "utils/constant";
import { industryOption } from "utils/constant";
import { useFormik } from "formik";
import * as yup from 'yup';

const validateSignUpSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  phone: yup.string().required("Phone Number is Required"),
  company: yup.string().required("Company Name Required"),
  service: yup.string().required("Service is  Required"),
  industry: yup.string().required("Industry is Required"),
  // subCategoryServices: yup.array().required("Sub Category Service is Required"),
  password: yup.string().min(8, 'Password must be 8 characters long').required("Password is Required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Must match with Password').required("Confirm Password Required"),
})

const Register = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => setShow(!show);
  const handleConfirm = () => setShowConfirm(!showConfirm);
  const [currentUser, setCurrentUser] = useState({});
  const toast = useToast();
  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  const history = useHistory();

  const handleRegister = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.password
      );
      const user = userCredential.user;
      const userDocRef = collection(db, "partners");
      await addDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        firstName: values?.firstName,
        middleName: values?.middleName,
        lastName: values?.firstName,
        industry: values?.industry,
        service: values?.service,
        phone: values?.phone,
        company: values?.company
      });

      if (!user) {
        return <div>Loading...</div>;
      }
      else {
        const rolesRef = collection(db, 'roles');
        await addDoc(rolesRef, {
          uid: user.uid,
          role: 'Partner'
        })
        history.push("/partner/home");
        toast({
          description: "Registration Successfully",
          status: "success",
          position: 'top',
          duration: 1000,
          isClosable: true,
        });
      }
      sessionStorage.setItem('uid', user.uid)
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast({
          description: "Email Already Used",
          status: "error",
          position: 'top',
          duration: 1000,
          isClosable: true,
        });
      }

    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword:"",
      industry: "",
      service: "",
      subCategoryServices: [],
      address: ""
    },
    validationSchema: validateSignUpSchema,
    onSubmit: handleRegister
  })

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Create a new account
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to register!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >

          {/* Signup form */}
          <form onSubmit={formik.handleSubmit}>

            <FormControl isInvalid={!!formik.errors.firstName && formik.touched.firstName}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                First Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                name="firstName"
               
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={formik.values.firstName}
                placeholder="John"
                mb="10px"
                fontWeight="500"
                size="lg"

              />
              <FormErrorMessage style={{ marginBottom: '0.5rem', paddingLeft: '0.2rem' }}>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Middle Name
              </FormLabel>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="auth"
                name="middleName"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={formik.values.middleName}
                placeholder="Giovanni"
                mb="10px"
                fontWeight="500"
                size="lg"
              />
            </FormControl>
            <FormControl isInvalid={!!formik.errors.lastName && formik.touched.lastName}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Last Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
               
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="auth"
                fontSize="sm"
                name="lastName"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={formik.values.lastName}
                placeholder="Rossi"
                mb="10px"
                fontWeight="500"
                size="lg"
              />
              <FormErrorMessage style={{ marginBottom: '0.5rem', paddingLeft: '0.2rem' }}>{formik.errors.lastName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.company && formik.touched.company}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Company Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
               
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="auth"
                name="company"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={formik.values.company}
                placeholder="Bizowl"
                mb="10px"
                fontWeight="500"
                size="lg"
              />
              <FormErrorMessage style={{ marginBottom: '0.5rem', paddingLeft: '0.2rem' }}>{formik.errors.company}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.industry && formik.touched.industry}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Industry<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                isClearable
                value={formik.values.industry}
                variant="auth"
                mb="10px"
                ms={{ base: "0px", md: "0px" }}
                fontSize="sm"
                name="industry"
                fontWeight="500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="lg"
                borderRadius={'16px'}
                placeholder="Select Industry"
              >
                {
                  industryOption?.map((item, index) => {
                    return (
                      <option value={item.value} key={index} fontSize="sm"
                        fontWeight="500">{item.label}</option>
                    )
                  })
                }
              </Select>
              <FormErrorMessage style={{ marginBottom: '0.5rem', paddingLeft: '0.2rem' }}>{formik.errors.industry}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formik.errors.service && formik.touched.service}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Service Category<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                className='selectProductStyle'
                isClearable
                name="service"
                value={formik.values.service}
                variant="auth"
                mb="10px"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                fontWeight="500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="lg"
                borderRadius={'16px'}
                placeholder="Select Service Category"
              >
                {
                  serviceOptions?.map((item, index) => {
                    return (
                      <option value={item.value} key={index} fontSize="sm"
                        fontWeight="500">{item.label}</option>
                    )
                  })
                }
              </Select>
              <FormErrorMessage style={{marginBottom:'0.5rem',paddingLeft:'0.2rem'}}>{formik.errors.service}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.phone && formik.touched.phone}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Phone Number<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="auth"
                fontSize="sm"
                name="phone"
                ms={{ base: "0px", md: "0px" }}
                type="number"
                value={formik.values.phone}
                placeholder="+91 9100 1234 00"
                mb="10px"
                fontWeight="500"
                appearance={'none'}
                size="lg"
              />
                <FormErrorMessage style={{marginBottom:'0.5rem',paddingLeft:'0.2rem'}}>{formik.errors.phone}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="auth"
                name="email"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                value={formik.values.email}
                type="text"
                placeholder="hello@email.com"
                mb="10px"
                fontWeight="500"
                size="lg"
              />
                <FormErrorMessage style={{marginBottom:'0.5rem',paddingLeft:'0.2rem'}}>{formik.errors.phone}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="10px"
                  size="lg"
                  name="password"
                  type={show ? "text" : "password"}
                  value={formik.values.password}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage style={{marginBottom:'0.5rem',paddingLeft:'0.2rem'}}>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Confirm Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="10px"
                  name="confirmPassword"
                  size="lg"
                  type={showConfirm ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={showConfirm ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleConfirm}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage style={{marginBottom:'0.5rem',paddingLeft:'0.2rem'}}>{formik.errors.confirmPassword}</FormErrorMessage>
            </FormControl>

            <Flex justifyContent="space-between" align="center" mb="24px">
            </Flex>
            <Button
              type="submit"
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
            >
              Register
            </Button>
          </form>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already Registered?
              <NavLink to="/login">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Login
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Register;
