import { Avatar, Flex, Icon, Text } from '@chakra-ui/react'
import { SearchBar } from 'components/navbar/searchBar/SearchBar'
import { db } from 'config/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaRegBell } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const Header = (props) => {
    const [partnerProfile, setPartnerProfile] = useState({})
    const [unSubscribe, setUnSubscribe] = useState(null)

    useEffect(() => {
        getPartnerProfile();
        return () => {
            if (unSubscribe) {
                unSubscribe();
            }
        };
    }, []);

    const getPartnerProfile = async () => {
        try {
            const partnerUid = sessionStorage.getItem('uid')
            const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
            const subScribe = onSnapshot(queryForGetPartner, (snapshot) => {
                const partnerData = snapshot.docs[0]?.data();
                setPartnerProfile(partnerData)
            });
            setUnSubscribe(() => subScribe)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
        >
            <Text fontWeight="bold">{props.brandText}</Text>
            <SearchBar background={"#F3F9FE"}
            />
            <Flex
                alignItems="center"
            >
                <Icon mr="1rem" as={MdOutlineEmail} />
                <Icon mr="1.5rem" as={FaRegBell} />
                <Avatar mr="1rem" src={partnerProfile?.profile} />
                <Flex flexDirection="column">
                    <Text mr="1rem" fontWeight="bold">{partnerProfile?.firstName ?? ""} {partnerProfile?.middleName ?? ""} {partnerProfile?.lastName ?? ""}</Text>
                    <Text fontSize="sm">CRB</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header
