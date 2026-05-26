import prisma from "../src/lib/prisma";

const moreImages = [
  "/uploads/sunil paudyal.jpg",
  "/uploads/sanish.jpg",
  "/uploads/gojo geto inverted.jpg"
];

async function run() {
  console.log("Adding multiple images to 3 units...");
  const existingUnits = await prisma.unit.findMany({ take: 3 });
  
  for (const unit of existingUnits) {
    for (const url of moreImages) {
      // Avoid duplicate exact urls if they exist
      const exists = await prisma.media.findFirst({ where: { unitId: unit.id, url } });
      if (!exists) {
        await prisma.media.create({
          data: {
            unitId: unit.id,
            url,
            type: "IMAGE"
          }
        });
      }
    }
  }
  
  console.log("Done adding multiple images!");
}

run().catch(e => console.error(e)).finally(() => prisma.$disconnect());
