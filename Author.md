<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=280&color=0:0f0c29,50:302b63,100:24243e&text=Arun%20Neupane&fontSize=52&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Full-Stack%20Developer%20%7C%20CTO%20%40%20Sajilo%20Digital%20%7C%20BSc.CSIT&descAlignY=58&descSize=18" />

</div>

<div align="center">

[![Profile Views](https://komarev.com/ghpvc/?username=arundada9000&label=Profile%20Views&color=6d28d9&style=flat-square)](https://github.com/arundada9000)
[![Portfolio](https://img.shields.io/badge/Portfolio-arunneupane.netlify.app-6d28d9?style=flat-square&logo=netlify&logoColor=white)](https://arunneupane.netlify.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arundada9000-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/arundada9000)
[![Email](https://img.shields.io/badge/Email-arunneupane0000@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:arunneupane0000@gmail.com)

</div>

---

## `> whoami`

I'm a full-stack developer from Nepal who builds production systems - not just side projects.

<div align="center">

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExajhtZDZ6MHdudHc1MHljdGEwcW92a3U5djd0aHdwazViZHR5aDIzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c2lbMLWfL1mQ8/giphy.gif" width="200" alt="Goku powering up">
</div>

In the past year I've shipped a **biometric-auth platform for a national NGO**, a **case management system for Nepal Police** deployed on a private Ubuntu server, and a **cinematic company website** for a real software agency. I'm currently CTO at [Sajilo Digital](https://sajilodigital.com.np) and Vice Secretary at [Code for Change Rupandehi](https://codeforchangenepal.com).

I work with React, Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB. My roots are in C and C++ : I genuinely enjoy low-level logic, DSA, and understanding _why_ things work, not just _how_ to use them. I care about system architecture, clean APIs, and UX that doesn't get in the way.

Outside code: I think in systems, learn from builders, and watch a lot of anime. Attack on Titan taught me that the most dangerous thing is a person with a plan. Dragon Ball taught me there's always another level. I try to live by both.

```
🎓  BSc. CSIT — Bhairahawa Multiple Campus (2021 – Present)
🏢  CTO — Sajilo Digital Pvt. Ltd. (Oct 2025 – Apr 2026)
🤝  Vice Secretary — Code for Change Rupandehi (2025 – Present)
📍  Butwal, Lumbini, Nepal
🏆  Girls in ICT Coding Competition — Winner
🏆  CodeOlympiad 2080 — Winner
⚔️  Currently watching: Re-reading JoJo's Bizarre Adventure
```

---

## `> ls ./production-systems`

### 🔵 [Code for Change Nepal](https://codeforchangenepal.com) · [GitHub](https://github.com/arundada9000/Code-for-Change)

> Full-stack platform for Nepal's national IT student community

- **Auth**: WebAuthn passkeys (biometric) + OTP reset + account lockout + rate limiting
- **RBAC**: 7 roles, 50+ granular permissions, per-user permission overrides
- **Features**: Certificate issuance with QR verification, eSewa payment gateway, PWA push notifications (targeted by role/province), resume builder with PDF export, careers portal, admin dashboard with Recharts analytics
- **Infra**: React 19 · Vite 7 · TypeScript · Express 5 · MongoDB · Tailwind CSS v4 · Cloudinary · Vercel

---

### 🔵 Nagrik Sahayata Pradali · [GitHub](https://github.com/arundada9000/police-branch-reporting-system)

> Internal case management system - Area Police Office, Butwal _(private deployment)_

- **Modules**: Branch (officer workspace, multi-step case forms, image uploads, SMS trace), DSP/SuperAdmin (Recharts dashboards, no-activity alerts), Admin (user provisioning, branch management)
- **Security**: JWT via `jose` in HTTP-only cookies, role-based routing at App Router layer
- **Infra**: Next.js · TypeScript · PostgreSQL · Prisma 7 · Docker, deployed on private on-premise Ubuntu server

---

### 🔵 [Sajilo Digital Website](https://sajilodigital.com.np) · [GitHub](https://github.com/arundada9000/sajilodigital)

> Cinematic company platform - Next.js 16 with terminal navigation & live project telemetry

- GSAP scroll-linked cinematic sequences + Framer Motion declarative animations
- Persistent GlobalTerminal with custom commands, goto navigation, and Web Speech API voice control
- Client-side search engine using registry pattern - sub-second results
- React Server Components for minimal hydration and fast TTFB
- **Infra**: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Framer Motion

---

## `> ls ./tools-and-templates`

| Project                 | Description                                                           | Stack                        | Live                                                                       |
| ----------------------- | --------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------- |
| **SajiloStore**         | Config-driven e-commerce template - full cart, WhatsApp + QR checkout | Next.js · Framer Motion      | [Store](https://statictemplate.sajilodigital.com.np)                       |
| **Nepal Bamboo Salt**   | Product landing page for Nepal Bamboo Salt Pvt. Ltd.                  | Next.js · Tailwind v4        | [bamboosalt.sajilodigital.com.np](https://bamboosalt.sajilodigital.com.np) |
| **Sajilo Quiz App**     | Competition quiz platform - 11 sounds, 6 themes, offline-first, PWA   | React · Vite · Framer Motion | [sajiloquiz.vercel.app](https://sajiloquiz.vercel.app)                     |
| **Chroma Color Picker** | Professional color extraction & CSS/Tailwind snippet generator        | React · TypeScript · Vite    | [easycolorpicker.vercel.app](https://easycolorpicker.vercel.app)           |
| **SajiloQR**            | Privacy-first QR generator + live camera scanner                      | HTML · jsQR · QRCode.js      | [easyqrcreate.netlify.app](https://easyqrcreate.netlify.app)               |

---

## `> ls ./learning-in-public`

These started as experiments and YouTube content. They show the thinking, not just the shipping.

| Project                 | Description                                                                            | Live                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **EasySorting**         | 9 sorting algorithms visualized - pseudocode + 5-language implementations              | [easysorting.netlify.app](https://easysorting.netlify.app)           |
| **Stack Visualization** | Stack data structure operations animated step-by-step                                  | [easystack.netlify.app](https://easystack.netlify.app)               |
| **All Unit Converter**  | Real-time converter across 10+ categories                                              | [allunitconverter.netlify.app](https://allunitconverter.netlify.app) |
| **Code Olympiad 2081**  | Competition platform for BMC IT Club - registration, countdown, live participant count | [codeolympiad2081.netlify.app](https://codeolympiad2081.netlify.app) |
| **Coin Toss Simulator** | Multi-coin toss with 3D animations and probability stats                               | [easyflipping.netlify.app](https://easyflipping.netlify.app)         |

---

## `> cat skills.json`

```json
{
  "languages": ["C", "C++", "JavaScript ES2024", "TypeScript", "HTML5", "CSS3"],
  "frontend": [
    "React 19",
    "Next.js 16",
    "Vite",
    "Tailwind CSS v4",
    "Framer Motion",
    "GSAP"
  ],
  "backend": [
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Prisma ORM",
    "REST APIs",
    "JWT",
    "WebAuthn"
  ],
  "tools": [
    "Git",
    "GitHub",
    "Docker",
    "Vercel",
    "Netlify",
    "Cloudinary",
    "Linux (Ubuntu)",
    "PWA",
    "SEO",
    "Zod"
  ],
  "strengths": [
    "DSA",
    "System architecture",
    "Logical thinking",
    "Problem decomposition"
  ],
  "currently": [
    "Backend engineering",
    "Open source",
    "Building with people who move fast"
  ]
}
```

---

## `> cat dsa_log.md`

I started with C and C++, and I'm glad I did. Before frameworks, there were pointers, memory, and logic. DSA isn't just interview prep for me; it's how I think about problems. The EasySorting visualizer and Stack tool were built because I wanted to _see_ the algorithms, not just implement them.

Favourite problems: anything involving recursion trees, graph traversal, or dynamic programming that initially looks impossible and then suddenly clicks.

> _"A small axe can cut down a big tree - if you keep chopping."_  
> That's not an anime quote. But it should be.

---

## `> cat ./anime/watchlist.md`

I'm not ashamed. Some of the best writing I've encountered is in anime - the strategic thinking in AoT, the sheer willpower arc in Dragon Ball, the absurd creativity of JoJo, the moral weight of Seven Deadly Sins. Good stories make you think differently. That bleeds into how I approach problems.

```
✅  Attack on Titan          — Eren understood the assignment (eventually)
✅  Dragon Ball / DBZ / DBS  — The original "there's always a higher level"
✅  JoJo's Bizarre Adventure — Proof that creativity beats raw power, every arc
✅  Seven Deadly Sins        — Favourite underrated power system in anime
🔄  Currently exploring more — open to recs
```

If you want to work with someone who thinks creatively, moves fast, and doesn't need to be told twice - let's build something.

---

## `> cat stats.sh`

<div align="center">

![My GitHub Stats](https://github-readme-stats.vercel.app/api?username=arundada9000&show_icons=true&theme=tokyonight&count_private=true&include_all_commits=true&hide_border=true&bg_color=0d1117)

![My Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=arundada9000&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117)

![GitHub Streak](https://streak-stats.demolab.com?user=arundada9000&theme=tokyonight&hide_border=true&background=0d1117)

</div>

---

## `> ./connect.sh`

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-arunneupane.netlify.app-6d28d9?style=for-the-badge&logo=netlify&logoColor=white)](https://arunneupane.netlify.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/arundada9000)
[![YouTube](https://img.shields.io/badge/YouTube-arundada9000-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@arundada9000)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/9779811420975)
[![Instagram](https://img.shields.io/badge/Instagram-arundada9000-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/arundada9000)
[![Facebook](https://img.shields.io/badge/Facebook-arundada9000-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/arundada9000)

</div>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=0:0f0c29,50:302b63,100:24243e&section=footer&text=Building%20things%20that%20ship.&fontSize=28&fontColor=ffffff&animation=fadeIn&fontAlignY=65" />

</div>

<div align="center">
<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI1b2FwaThlYjYzNWIwcG81eDNibnloMTlkbXN3eWlkMHVkanR2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eJ1U3jkPwvnGTcTiRz/giphy.gif" width="200" alt="Goku flying on Nimbus">

 <img src="https://capsule-render.vercel.app/api?type=waving&height=260&color=0:0e75b6,100:1a1b27&text=/arundada9000&fontSize=44&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=ANY%20PLATFORM&descAlignY=55" />
</div>
