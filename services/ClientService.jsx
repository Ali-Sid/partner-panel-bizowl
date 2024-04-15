const db = require("config/firebase");
const { getDocs, query, collection, where } = require("firebase/firestore");

export const getClientDetails = async (clientUid) => {
  try {
    const collectionRef = collection(db, "users");
    const queryForGetClient = query(
      collection(db, "users"),
      where("uid", "==", clientUid)
    );
    const client = await getDocs(queryForGetClient);
    console.log(client);
    if (!client.empty) {
      const clientData = client.docs[0]?.data();
      const clientId = client.docs[0]?.id;
      return { clientId, ...clientData };
    } else {
      return null; // Return null if client not found
    }
  } catch (error) {
    console.log(error.message);
  }
};
