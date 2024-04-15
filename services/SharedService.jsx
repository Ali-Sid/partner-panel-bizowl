import { db } from "config/firebase";

const { updateDoc, getDocs, addDoc, doc } = require("firebase/firestore");

export const updateDocument = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};
export const getDocuments = async (query) => {
  await getDocs(query);
};
export const addDocument = async (docRef, data) => {
  await addDoc(docRef, data);
};
