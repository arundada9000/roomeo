# Seed Users

**Repository:** [https://github.com/arundada9000/roomeo](https://github.com/arundada9000/roomeo)  
**Hosted at:** [https://roomeo.vercel.app](https://roomeo.vercel.app)

---

All users share password: `88888888`

## Admin

| Name | Email | Role |
|------|-------|------|
| Arun Neupane | arunneupane0000@gmail.com | ADMIN |

> Built by **Arun Neupane** ([@arundada9000](https://github.com/arundada9000))

## Landlords

| Name | Email | Role |
|------|-------|------|
| Rajesh Hamal | rajesh.hamal@roomeo.com | LANDLORD |
| Muna Thapa | muna.thapa@roomeo.com | LANDLORD |
| Bishal Sharma | bishal.sharma@roomeo.com | LANDLORD |
| Sneha Adhikari | sneha.adhikari@roomeo.com | LANDLORD |
| Dipak Shrestha | dipak.shrestha@roomeo.com | LANDLORD |
| Anita Gurung | anita.gurung@roomeo.com | LANDLORD |

## Regular Users

| Name | Email | Role |
|------|-------|------|
| Priya Karki | priya.karki@gmail.com | USER |
| Sagar Poudel | sagar.poudel@gmail.com | USER |
| Roshan Rai | roshan.rai@gmail.com | USER |
| Nisha Tamang | nisha.tamang@gmail.com | USER |
| Kabir Singh | kabir.singh@gmail.com | USER |
| Anjana Maharjan | anjana.maharjan@gmail.com | USER |
| Prakash Bhandari | prakash.bhandari@gmail.com | USER |
| Sunita Nepal | sunita.nepal@gmail.com | USER |
| Amit Chaudhary | amit.chaudhary@gmail.com | USER |
| Rita Thakuri | rita.thakuri@gmail.com | USER |
| Bibek Basnet | bibek.basnet@gmail.com | USER |
| Srijana Khadka | srijana.khadka@gmail.com | USER |
| Manoj Pandey | manoj.pandey@gmail.com | USER |
| Uma Devkota | uma.devkota@gmail.com | USER |
| Ramesh Ghimire | ramesh.ghimire@gmail.com | USER |

## Data Model (Prisma)

Each user has the following fields in the database:

```
User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  role          Role      @default(USER)  // ADMIN | LANDLORD | USER
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

Relations: `sessions`, `accounts` (auth), `properties` (landlord), `favorites`, `reviews`, `inquiries`.
