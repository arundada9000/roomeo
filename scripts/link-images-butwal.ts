import prisma from "../src/lib/prisma";

const images = [
  "/uploads/1235198.jpg",
  "/uploads/1323773.png",
  "/uploads/8.jpg",
  "/uploads/gojo geto at beach.jpg",
  "/uploads/gojo geto inverted.jpg",
  "/uploads/gojo geto looking.jpeg",
  "/uploads/gojo geto.jpg",
  "/uploads/height.jpg",
  "/uploads/lurking at night.jpeg",
  "/uploads/nothing.jpg",
  "/uploads/san-juan-mountains.jpg",
  "/uploads/sanish.jpg",
  "/uploads/sunil paudyal.jpg",
  "/uploads/wallpaperflare.com_wallpaper.jpg",
  "/uploads/wp2065411--rick-and-morty-wallpapers.png",
  "/uploads/wp2450670-rick-sanchez-wallpapers.png"
];

// Butwal coordinates
const BUTWAL_LAT = 27.7006;
const BUTWAL_LNG = 83.4323;

async function run() {
  console.log("Linking images to existing units...");
  const existingUnits = await prisma.unit.findMany();
  let imgIdx = 0;
  for (const unit of existingUnits) {
    // Check if media exists
    const mediaCount = await prisma.media.count({ where: { unitId: unit.id } });
    if (mediaCount === 0) {
      await prisma.media.create({
        data: {
          unitId: unit.id,
          url: images[imgIdx % images.length],
          type: "IMAGE"
        }
      });
      imgIdx++;
    }
  }
  
  console.log("Creating Butwal rooms...");
  // get a landlord
  const landlord = await prisma.user.findFirst({ where: { role: "LANDLORD" } }) 
    || await prisma.user.findFirst({ where: { role: "ADMIN" } }) 
    || await prisma.user.findFirst();

  if (!landlord) {
     console.log("No users found to assign as landlord.");
     return;
  }

  for (let i = 0; i < 5; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    await prisma.property.create({
      data: {
        landlordId: landlord.id,
        title: `Beautiful Property in Butwal ${i+1}`,
        address: `Street ${i+1}, Butwal`,
        city: "Butwal",
        state: "Lumbini",
        lat: BUTWAL_LAT + latOffset,
        lng: BUTWAL_LNG + lngOffset,
        units: {
          create: {
            title: `Butwal Room ${i+1}`,
            type: "SINGLE_ROOM",
            price: 5000 + (Math.random() * 5000),
            currency: "NPR",
            status: "APPROVED",
            media: {
              create: {
                url: images[(imgIdx + i) % images.length],
                type: "IMAGE"
              }
            }
          }
        }
      }
    });
  }
  console.log("Done seeding Butwal properties!");
}

run().catch(e => console.error(e)).finally(() => prisma.$disconnect());
