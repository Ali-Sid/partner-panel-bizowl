const { db } = require("config/firebase");
const { getDocs, query, collection, where } = require("firebase/firestore");

export const getCurrentPartner = async () => {
    try {
        const partnerUid = sessionStorage.getItem('uid')
        const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
        const querySnapshot = await getDocs(queryForGetPartner);
        if (!querySnapshot.empty) {
            const partnerData = querySnapshot.docs[0]?.data();
            const partnerId=querySnapshot.docs[0]?.id
            return{partnerId,...partnerData}
            // setPartnerId(documentId)
            // setProfilePicture(partnerData?.profile)
        } 
    }
    catch (error) {
        console.log(error.message)
    }
}