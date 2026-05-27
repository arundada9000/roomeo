import prisma from "../src/lib/prisma";
import { hashPassword } from "@better-auth/utils/password";
import { faker } from "@faker-js/faker";

const ROOM_IMAGES = Array.from({ length: 6 }, (_, i) => {
  const ext = i === 1 || i >= 4 ? "webp" : "jpg";
  const num = i + 1;
  return `/rooms/room${num}.${ext}`;
});

const PEOPLE_IMAGES = [
  "/people/1323773.png", "/people/8.jpg", "/people/akatsuki me.jpg",
  "/people/carey-mulligan-in-green-top-395088iof0njw73y.jpg",
  "/people/carey-mulligan-shaggy-hair-l4fmq0ix0nzvmej3.jpg",
  "/people/carey-mulligan-showing-dimple-i27yhoj81ecak0op.jpg",
  "/people/chrollo_1.png", "/people/edit1.jpg", "/people/edited me.jpg",
  "/people/gojo geto.jpg", "/people/IMG_20230901_141700.jpg",
  "/people/jack-harlow-on-stage-iqoeg5dzziumeqrn.jpg",
  "/people/me bb.jpg", "/people/me in chashma.jpg",
  "/people/Screenshot 2024-08-10 182145.png",
  "/people/Screenshot 2024-08-15 214114.png",
  "/people/serious-young-carey-mulligan-zqvw17jlulykma4z.jpg",
  "/people/suit2.png", "/people/ussss.jpg",
  "/people/wallpaperflare.com_wallpaper.jpg",
  "/people/wp2065411--rick-and-morty-wallpapers.png",
];

const CITIES = [
  { city: "Kathmandu", state: "Bagmati", lat: 27.7172, lng: 85.3240 },
  { city: "Pokhara", state: "Gandaki", lat: 28.2096, lng: 83.9856 },
  { city: "Lalitpur", state: "Bagmati", lat: 27.6764, lng: 85.3240 },
  { city: "Bhaktapur", state: "Bagmati", lat: 27.6710, lng: 85.4050 },
  { city: "Bharatpur", state: "Bagmati", lat: 27.6833, lng: 84.4333 },
  { city: "Biratnagar", state: "Koshi", lat: 26.4525, lng: 87.2718 },
];

const SUBJECTS = [
  "Partnership Inquiry", "Listing Issue", "General Feedback",
  "Bug Report", "Feature Request", "Account Help",
];

const INQUIRY_MESSAGES = [
  "Is this unit still available for immediate move-in?",
  "Can I schedule a visit this weekend?",
  "Are utilities included in the rent?",
  "Is parking available for residents?",
  "What is the security deposit amount?",
  "Are pets allowed in this unit?",
];

const reviewTexts = [
  "Great place to live! The landlord is very responsive.",
  "Clean and well-maintained property. Highly recommended.",
  "Amazing location with easy access to everything.",
  "Good value for money. The room was exactly as described.",
  "Excellent facilities and great neighborhood.",
  "Peaceful environment perfect for studying or working.",
  "Modern amenities make living here very comfortable.",
  "Reasonable rent for the quality of accommodation.",
  "Very satisfied with my stay. Will renew my lease.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

const allPropertyTitles = [
  "Sunrise Apartments", "Heritage Residency", "Balaju Heights",
  "Lazimpat Towers", "Naxal Residency", "Phewa Lake View",
  "Lakeside Retreat", "Buddha Garden Homes", "Durbar Square Loft",
  "Ring Road Comfort", "Bouddha Peace Villa", "Patan Durbar Residency",
  "Swayambhu Heights", "Thamel Boutique", "Chitwan Green Homes",
  "Koshi Riverside", "Gangetic Garden", "Himalayan View PG",
  "Garden City Flats", "Everest Base Lodge",
];

const propertyDescriptions = [
  "Modern living space with stunning city skyline views. High-speed WiFi, 24/7 security, ample parking.",
  "Heritage-style property with traditional Newari architecture. Peaceful neighborhood with modern amenities.",
  "Serene residential complex surrounded by greenery. Perfect escape from the city bustle.",
  "Premium residential tower with gym, garden, and round-the-clock security.",
  "Conveniently located near schools, hospitals, and shopping centers.",
  "Stunning lake-view property with panoramic mountain vistas. Perfect for tranquility seekers.",
  "Charming retreat near the lakeside. Popular among digital nomads.",
  "Family-friendly complex with community garden and children's play area.",
  "Artistic loft-style apartments in a restored heritage building with modern interiors.",
  "Budget-friendly units along the ring road with excellent city connectivity.",
  "Peaceful residential enclave near Bouddhanath Stupa. Ideal for quiet living.",
  "Premium residences in historic Patan, walking distance to Durbar Square.",
  "Hilltop property with 360° Kathmandu Valley views. Cool breeze, serene environment.",
  "Boutique living spaces in Thamel's tourism hub. Near cafes, restaurants, nightlife.",
  "Eco-friendly homes in Bharatpur. Solar-powered with organic garden spaces.",
  "Riverside properties in Biratnagar with beautiful Koshi River views.",
  "Lush garden property with fruit trees and flowering plants. Nature lover's paradise.",
  "Affordable PG accommodations with Himalayan views. Ideal for students and professionals.",
  "Modern apartment complex with landscaped gardens, clubhouse, and swimming pool.",
  "Premium serviced apartments near the Everest trekking route.",
];

const unitTemplates = [
  { title: "Cozy Single Room", desc: "Compact single room with essential amenities. Perfect for students.", type: "SINGLE_ROOM" as const, minPrice: 4500, maxPrice: 10000 },
  { title: "Spacious Double Room", desc: "Large double room with ample storage and natural lighting.", type: "DOUBLE_ROOM" as const, minPrice: 8000, maxPrice: 18000 },
  { title: "Shared Room (Twin)", desc: "Affordable shared accommodation with twin beds.", type: "SHARED_ROOM" as const, minPrice: 3000, maxPrice: 7000 },
  { title: "2BHK Family Flat", desc: "Complete 2-bedroom flat with living room, kitchen, bathroom.", type: "FLAT" as const, minPrice: 15000, maxPrice: 35000 },
  { title: "Compact Studio", desc: "Open-plan studio with kitchenette and attached bath.", type: "STUDIO" as const, minPrice: 10000, maxPrice: 25000 },
  { title: "PG Accommodation", desc: "Fully managed PG with meals, WiFi, laundry included.", type: "PG" as const, minPrice: 5000, maxPrice: 12000 },
  { title: "Premium Single Room", desc: "Premium single room with AC, attached bathroom, city views.", type: "SINGLE_ROOM" as const, minPrice: 12000, maxPrice: 22000 },
  { title: "3BHK Luxury Flat", desc: "Spacious 3-bedroom flat with modern kitchen and balcony.", type: "FLAT" as const, minPrice: 25000, maxPrice: 50000 },
];

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clean existing data
  await prisma.inquiry.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.media.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.newsletterSubscription.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verification.deleteMany();
  console.log("  Cleaned existing data\n");

  const passwordHash = await hashPassword("88888888");

  // ─── USERS ──────────────────────────────────────
  const adminUser = await prisma.user.create({
    data: {
      name: "Arun Neupane",
      email: "arunneupane0000@gmail.com",
      emailVerified: true,
      role: "ADMIN",
      image: "/people/suit2.png",
    },
  });
  await prisma.account.create({
    data: {
      userId: adminUser.id,
      accountId: adminUser.id,
      providerId: "credential",
      password: passwordHash,
    },
  });

  const landlordNames = [
    "Rajesh Hamal", "Muna Thapa", "Bishal Sharma",
    "Sneha Adhikari", "Dipak Shrestha", "Anita Gurung",
  ];
  const userNames = [
    "Priya Karki", "Sagar Poudel", "Roshan Rai", "Nisha Tamang",
    "Kabir Singh", "Anjana Maharjan", "Prakash Bhandari",
    "Sunita Nepal", "Amit Chaudhary", "Rita Thakuri",
    "Bibek Basnet", "Srijana Khadka", "Manoj Pandey",
    "Uma Devkota", "Ramesh Ghimire",
  ];

  const landlords = [];
  for (const name of landlordNames) {
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@roomeo.com`;
    const u = await prisma.user.create({
      data: { name, email, emailVerified: true, role: "LANDLORD", image: pick(PEOPLE_IMAGES) },
    });
    await prisma.account.create({
      data: { userId: u.id, accountId: u.id, providerId: "credential", password: passwordHash },
    });
    landlords.push(u);
  }

  const users = [];
  for (const name of userNames) {
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`;
    const u = await prisma.user.create({
      data: { name, email, emailVerified: Math.random() > 0.3, role: "USER", image: pick(PEOPLE_IMAGES) },
    });
    users.push(u);
  }
  console.log(`  + Landlords: ${landlords.length}, Users: ${users.length}`);

  // ─── PROPERTIES & UNITS ─────────────────────────
  let totalUnits = 0, totalProperties = 0;
  for (let i = 0; i < allPropertyTitles.length; i++) {
    const loc = pick(CITIES);
    const property = await prisma.property.create({
      data: {
        landlordId: pick(landlords).id,
        title: allPropertyTitles[i],
        description: propertyDescriptions[i],
        address: `${Math.floor(Math.random() * 500) + 1} ${pick(["Marg", "Road", "Tole", "Chowk", "Nagar", "Path"])}`,
        city: loc.city, state: loc.state,
        zipCode: (Math.floor(Math.random() * 90000) + 10000).toString(),
        lat: loc.lat + (Math.random() - 0.5) * 0.03,
        lng: loc.lng + (Math.random() - 0.5) * 0.03,
        contactPhone: `+977-98${Math.floor(Math.random() * 100000000).toString().padStart(8, "0")}`,
        contactEmail: `property${i}@roomeo.com`,
      },
    });
    totalProperties++;

    const selectedTemplates = pickN(unitTemplates, Math.floor(Math.random() * 3) + 1);
    for (const tmpl of selectedTemplates) {
      const price = Math.round((tmpl.minPrice + Math.random() * (tmpl.maxPrice - tmpl.minPrice)) / 500) * 500;
      const unit = await prisma.unit.create({
        data: {
          propertyId: property.id,
          title: tmpl.title, description: tmpl.desc,
          type: tmpl.type, price, currency: "NPR",
          isAvailable: Math.random() > 0.2,
          status: Math.random() > 0.15 ? "APPROVED" : pick(["PENDING", "REJECTED"] as const),
          furnished: Math.random() > 0.4, attachedBath: Math.random() > 0.3,
          wifi: Math.random() > 0.2, waterIncluded: Math.random() > 0.3,
          powerIncluded: Math.random() > 0.4, parking: Math.random() > 0.5,
          petFriendly: Math.random() > 0.7, balcony: Math.random() > 0.5,
          kitchenAccess: Math.random() > 0.3, bachelorFriendly: Math.random() > 0.2,
          familyFriendly: Math.random() > 0.4, boysOnly: Math.random() > 0.85,
          girlsOnly: Math.random() > 0.85, smokingAllowed: Math.random() > 0.8,
          availableFrom: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000),
        },
      });
      totalUnits++;

      for (const url of pickN(ROOM_IMAGES, Math.min(3, ROOM_IMAGES.length))) {
        await prisma.media.create({ data: { unitId: unit.id, url, type: "IMAGE" } });
      }
    }
  }
  console.log(`  + ${totalProperties} properties, ${totalUnits} units`);

  // ─── REVIEWS ────────────────────────────────────
  const allProperties = await prisma.property.findMany();
  let reviewCount = 0;
  for (const prop of pickN(allProperties, 12)) {
    const reviewers = pickN(users, Math.min(Math.floor(Math.random() * 3) + 1, users.length));
    for (const reviewer of reviewers) {
      await prisma.review.create({
        data: { userId: reviewer.id, propertyId: prop.id, rating: Math.floor(Math.random() * 3) + 3, comment: pick(reviewTexts) },
      });
      reviewCount++;
    }
  }
  console.log(`  + ${reviewCount} reviews`);

  // ─── FAVORITES, INQUIRIES ───────────────────────
  const allUnits = await prisma.unit.findMany({ take: 30 });
  let favCount = 0, inqCount = 0;
  for (const unit of pickN(allUnits, 15)) {
    const fan = pick(users);
    const exists = await prisma.favorite.findUnique({
      where: { userId_unitId: { userId: fan.id, unitId: unit.id } },
    });
    if (!exists) {
      await prisma.favorite.create({ data: { userId: fan.id, unitId: unit.id } });
      favCount++;
    }
  }
  for (const unit of pickN(allUnits, 10)) {
    await prisma.inquiry.create({
      data: { userId: pick(users).id, unitId: unit.id, message: pick(INQUIRY_MESSAGES), status: pick(["OPEN", "CLOSED", "REPLIED"]) },
    });
    inqCount++;
  }
  console.log(`  + ${favCount} favorites, ${inqCount} inquiries`);

  // ─── CONTACT SUBMISSIONS ────────────────────────
  const contacts = [
    { name: "Binod Shah", msg: "I am interested in listing my property on Roomeo. Can you share partnership details?" },
    { name: "Sita Poudel", msg: "I found a bug in the search feature. The price filter doesn't work correctly." },
    { name: "Hari Basnet", msg: "Great platform! Would love to see more properties in Pokhara area." },
    { name: "Gita Sharma", msg: "I am having trouble creating my landlord account. Can someone help me?" },
    { name: "Mohan Thapa", msg: "Please add a feature to compare multiple properties side by side." },
  ];
  for (let i = 0; i < contacts.length; i++) {
    await prisma.contactSubmission.create({
      data: {
        name: contacts[i].name,
        email: `${contacts[i].name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
        subject: pick(SUBJECTS),
        message: contacts[i].msg,
        isRead: i <= 1,
        createdAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log(`  + ${contacts.length} contact submissions`);

  // ─── NEWSLETTER ─────────────────────────────────
  const subscriberEmails = [
    "sandesh.adhikari@gmail.com", "anita.sharma@hotmail.com",
    "prakash.neupane@yahoo.com", "shristi.kc@gmail.com",
    "ravi.thapa@outlook.com", "nisha.rai@proton.me",
    "binaya.gurung@gmail.com", "sunita.lama@icloud.com",
    "ajay.bhandari@gmail.com", "kritika.poudel@email.com",
    "umesh.shrestha@gmail.com", "deepa.khadka@outlook.com",
  ];
  for (let i = 0; i < subscriberEmails.length; i++) {
    await prisma.newsletterSubscription.create({
      data: { email: subscriberEmails[i], subscribed: i < 10 },
    });
  }
  console.log(`  + ${subscriberEmails.length} newsletter subs`);

  console.log(`\n✅ Seed complete: ${1 + landlords.length + users.length} users, ${totalProperties} properties, ${totalUnits} units, ${reviewCount} reviews`);
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
