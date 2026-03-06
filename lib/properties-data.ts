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
}

export const properties: Property[] = [
  {
    id: "skyline-residences-bole",
    title: "Sarbet-Blue Point Three Bedroom",
    location: "Bulgaria, Addis Ababa",
    price: 7992500,
    pricePerSqm: 75000,
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    parking: 2,
    type: "Apartment",
    yearBuilt: 2024,
    floor: 12,
    images: [
      "/images/property-1.jpg",
      "/images/property-2.jpg",
      "/images/property-3.jpg",
      "/images/property-4.jpg",
    ],
    description:
      "This three-bedroom apartment for sale in Ethiopia offers a spacious and thoughtfully designed living environment, perfect for families or individuals seeking comfort and style. With a total unit area of 783.16 sq.ft, the layout features three well-proportioned bedrooms complemented by an inviting open-concept living and dining area that blends modern design with functionality. The adaptable floor plan allows for flexible use of space, including the option to create a home office or add extra storage. Residents also enjoy 107.03 sq.ft of common area (including terrace), a 12.00 sq.ft parking space, and access to a generous 709.60 sq.ft roof terrace, providing the perfect outdoor setting for relaxation or entertaining.",
  },];
