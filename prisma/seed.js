const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create a Landlord User
  const landlord = await prisma.user.upsert({
    where: { email: "landlord@roomeo.com" },
    update: {},
    create: {
      name: "Roomeo Landlord",
      email: "landlord@roomeo.com",
      emailVerified: true,
      role: "LANDLORD",
    },
  });

  console.log(`Created landlord: ${landlord.id}`);

  // 2. Create Properties
  const propertiesData = [
    {
      title: "Sunrise Apartments",
      description: "A bright and airy apartment complex with city views in Thamel.",
      address: "Thamel Marg",
      city: "Kathmandu",
      state: "Bagmati",
      lat: 27.7150,
      lng: 85.3120,
    },
    {
      title: "Heritage Residency",
      description: "Amazing heritage views in the heart of the city.",
      address: "Basantapur",
      city: "Kathmandu",
      state: "Bagmati",
      lat: 27.7045,
      lng: 85.3076,
    },
    {
      title: "Balaju Heights",
      description: "Peaceful environment near the ring road.",
      address: "Balaju Ring Road",
      city: "Kathmandu",
      state: "Bagmati",
      lat: 27.7310,
      lng: 85.3010,
    },
    {
      title: "Lazimpat Towers",
      description: "Upscale residential towers.",
      address: "Lazimpat Road",
      city: "Kathmandu",
      state: "Bagmati",
      lat: 27.7210,
      lng: 85.3230,
    },
    {
      title: "Naxal Residency",
      description: "Safe and central location in Naxal.",
      address: "Naxal Bhagwatisthan",
      city: "Kathmandu",
      state: "Bagmati",
      lat: 27.7183,
      lng: 85.3292,
    },
  ];

  const properties = [];
  for (const p of propertiesData) {
    const createdProp = await prisma.property.create({
      data: {
        ...p,
        landlordId: landlord.id,
      },
    });
    properties.push(createdProp);
    console.log(`Created property: ${createdProp.title}`);
  }

  // 3. Create Units for Properties
  const unitsData = [
    {
      propertyId: properties[0].id,
      title: "Cozy Furnished Room in Thamel",
      description: "A bright and airy room with city views",
      type: "SINGLE_ROOM",
      price: 8500,
      isAvailable: true,
      status: "APPROVED",
      furnished: true,
      attachedBath: true,
      wifi: true,
      parking: false,
      petFriendly: false,
      balcony: true,
      kitchenAccess: true,
      bachelorFriendly: true,
      familyFriendly: false,
      boysOnly: false,
      girlsOnly: false,
      waterIncluded: true,
    },
    {
      propertyId: properties[1].id,
      title: "Spacious Flat near Durbar Square",
      description: "2BHK flat with amazing heritage views",
      type: "FLAT",
      price: 22000,
      isAvailable: true,
      status: "APPROVED",
      furnished: true,
      attachedBath: true,
      wifi: true,
      parking: true,
      petFriendly: true,
      balcony: true,
      kitchenAccess: true,
      bachelorFriendly: true,
      familyFriendly: true,
      waterIncluded: true,
      powerIncluded: true,
    },
    {
      propertyId: properties[2].id,
      title: "Budget Room in Balaju",
      description: "Clean room for working professionals",
      type: "SINGLE_ROOM",
      price: 5000,
      isAvailable: true,
      status: "APPROVED",
      furnished: false,
      attachedBath: false,
      wifi: true,
      kitchenAccess: true,
      bachelorFriendly: true,
      boysOnly: true,
      waterIncluded: true,
    },
    {
      propertyId: properties[3].id,
      title: "Modern Studio in Lazimpat",
      description: "Fully furnished studio with fast internet",
      type: "STUDIO",
      price: 18000,
      isAvailable: false,
      status: "APPROVED",
      furnished: true,
      attachedBath: true,
      wifi: true,
      parking: true,
      kitchenAccess: true,
      bachelorFriendly: true,
      familyFriendly: true,
      waterIncluded: true,
      powerIncluded: true,
    },
    {
      propertyId: properties[4].id,
      title: "Girls PG in Naxal",
      description: "Safe and clean PG for working women",
      type: "PG",
      price: 6500,
      isAvailable: true,
      status: "APPROVED",
      furnished: true,
      wifi: true,
      kitchenAccess: true,
      bachelorFriendly: false,
      girlsOnly: true,
      waterIncluded: true,
      powerIncluded: true,
    },
  ];

  for (const u of unitsData) {
    await prisma.unit.create({
      data: u,
    });
    console.log(`Created unit: ${u.title}`);
  }

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
