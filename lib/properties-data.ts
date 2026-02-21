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
    title: "Skyline Residences",
    location: "Bole, Addis Ababa",
    price: 12500000,
    pricePerSqm: 75000,
    bedrooms: 3,
    bathrooms: 2,
    area: 167,
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
      "Luxurious high-rise apartment in the heart of Bole. Featuring floor-to-ceiling windows with panoramic city views, modern open-plan living, premium finishes throughout, and access to world-class amenities including a rooftop terrace, fitness center, and 24/7 security.",
  },
  {
    id: "green-valley-condos-cmc",
    title: "Green Valley Condos",
    location: "CMC, Addis Ababa",
    price: 8900000,
    pricePerSqm: 63500,
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    parking: 1,
    type: "Condominium",
    yearBuilt: 2023,
    floor: 6,
    images: [
      "/images/property-2.jpg",
      "/images/property-3.jpg",
      "/images/property-1.jpg",
      "/images/property-5.jpg",
    ],
    description:
      "A serene retreat in the growing CMC area. This contemporary condo offers smart home technology, energy-efficient design, a private balcony overlooking green spaces, and a welcoming community atmosphere with shared gardens and recreation facilities.",
  },
  {
    id: "parkview-townhouse-old-airport",
    title: "Parkview Townhouse",
    location: "Old Airport, Addis Ababa",
    price: 18500000,
    pricePerSqm: 82000,
    bedrooms: 4,
    bathrooms: 3,
    area: 226,
    parking: 2,
    type: "Townhouse",
    yearBuilt: 2024,
    images: [
      "/images/property-3.jpg",
      "/images/property-4.jpg",
      "/images/property-6.jpg",
      "/images/property-1.jpg",
    ],
    description:
      "Spacious family townhouse in the prestigious Old Airport area. Features an open-concept main floor, gourmet kitchen with granite countertops, private garden with patio, attached two-car garage, and proximity to international schools and embassies.",
  },
  {
    id: "metro-heights-kazanchis",
    title: "Metro Heights Apartment",
    location: "Kazanchis, Addis Ababa",
    price: 6500000,
    pricePerSqm: 59000,
    bedrooms: 2,
    bathrooms: 1,
    area: 110,
    parking: 1,
    type: "Apartment",
    yearBuilt: 2022,
    floor: 8,
    images: [
      "/images/property-4.jpg",
      "/images/property-5.jpg",
      "/images/property-2.jpg",
      "/images/property-6.jpg",
    ],
    description:
      "Ideal urban living in the bustling Kazanchis district. This stylish apartment features modern fixtures, a fully equipped kitchen, and easy access to light rail, restaurants, and business centers. Perfect for young professionals in Addis Ababa.",
  },
  {
    id: "horizon-duplex-summit",
    title: "Horizon Duplex",
    location: "Summit, Addis Ababa",
    price: 22000000,
    pricePerSqm: 91000,
    bedrooms: 4,
    bathrooms: 3,
    area: 242,
    parking: 3,
    type: "Duplex",
    yearBuilt: 2025,
    floor: 1,
    images: [
      "/images/property-5.jpg",
      "/images/property-6.jpg",
      "/images/property-1.jpg",
      "/images/property-3.jpg",
    ],
    description:
      "Premium duplex in the upscale Summit area with breathtaking views of Entoto Mountains. This two-story residence boasts expansive living areas, a chef-quality kitchen, master suite with walk-in closet, private terrace, and dedicated home office.",
  },
  {
    id: "emerald-courts-ayat",
    title: "Emerald Courts Villa",
    location: "Ayat, Addis Ababa",
    price: 15000000,
    pricePerSqm: 72000,
    bedrooms: 3,
    bathrooms: 2,
    area: 208,
    parking: 2,
    type: "Villa",
    yearBuilt: 2023,
    images: [
      "/images/property-6.jpg",
      "/images/property-1.jpg",
      "/images/property-4.jpg",
      "/images/property-2.jpg",
    ],
    description:
      "Elegant villa in a gated compound in the Ayat neighborhood with 24-hour security. Enjoy beautifully landscaped gardens, spacious interiors with premium marble flooring, a modern entertainment area, and a peaceful family lifestyle with all urban conveniences nearby.",
  },
];
