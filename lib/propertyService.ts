import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerSqm: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  type: string;
  yearBuilt: number;
  floor?: number;
  images: string[];
  description: string;
  active: boolean;
}

export interface CreatePropertyData {
  title: string;
  location: string;
  price: number;
  pricePerSqm: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  type: string;
  yearBuilt: number;
  floor?: number;
  images: string[];
  description: string;
}

const propertiesCollection = collection(db, "properties");

export async function getProperties(): Promise<Property[]> {
  try {
    const q = query(propertiesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export async function createProperty(propertyData: CreatePropertyData): Promise<string> {
  try {
    console.log("Creating property with data:", propertyData);
    
    const docRef = await addDoc(propertiesCollection, {
      ...propertyData,
      active: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log("Property created successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
}

export async function updateProperty(id: string, propertyData: Partial<CreatePropertyData>): Promise<void> {
  try {
    const propertyRef = doc(db, "properties", id);
    await updateDoc(propertyRef, {
      ...propertyData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
}

export async function deleteProperty(id: string): Promise<void> {
  try {
    const propertyRef = doc(db, "properties", id);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
}

export async function togglePropertyActive(id: string, active: boolean): Promise<void> {
  try {
    const propertyRef = doc(db, "properties", id);
    await updateDoc(propertyRef, {
      active,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error toggling property active status:", error);
    throw error;
  }
}
