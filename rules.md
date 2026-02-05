# 📘 rules.md — Product Structure & Codebase Standards

This document defines the **industry‑level project architecture, coding standards, and structural rules** for building scalable React (Vite + TypeScript) applications.

It ensures:

* Clean folder structure
* Reusable global components
* Data‑driven UI via TS interfaces
* Maintainable file sizes
* SaaS / enterprise production readiness

---

# 1️⃣ Core Architecture Philosophy

## Principles

1. **Component Reusability First**
2. **Data separated from UI**
3. **Global vs Local isolation**
4. **Scalable folder hierarchy**
5. **Readable + maintainable code**
6. **Enterprise production standards**

---

# 2️⃣ Project Root Structure

```
src/
│
├── assets/                # Images, icons, fonts
├── components/            # Global reusable components
├── pages/                 # Page-level folders
├── layouts/               # App layouts
├── routes/                # Routing config
├── services/              # API services
├── store/                 # State management
├── hooks/                 # Custom hooks
├── utils/                 # Helper functions
├── types/                 # Global TS types
├── styles/                # Global styles
└── main.tsx
```

---

# 3️⃣ Page-Level Product Structure

Each page follows **modular product structure**.

Example: `Home`

```
pages/
 └── home/
      ├── components/
      │     ├── Hero.tsx
      │     ├── Features.tsx
      │     ├── Testimonials.tsx
      │     └── CTA.tsx
      │
      ├── data/
      │     └── home.data.ts
      │
      ├── types/
      │     └── home.types.ts
      │
      ├── hooks/
      │     └── useHome.ts
      │
      └── home.tsx
```

---

# 4️⃣ Component Reusability Rules

## Global Components

If a component is used **more than once**, move it to:

```
src/components/
```

### Examples

* Button
* Input
* Modal
* Card
* Table
* Loader
* Avatar
* Badge

Structure:

```
components/
 └── ui/
      ├── Button.tsx
      ├── Input.tsx
      ├── Modal.tsx
      └── Table.tsx
```

---

## Local Components

If used only inside one page:

```
pages/home/components/
```

Rule:

* No cross‑page imports
* Page‑scoped logic only

---

# 5️⃣ File Line Limit Rule

## Max Lines per File: **400**

If exceeded → Break down.

### Breakdown Strategy

Instead of:

```
Hero.tsx (900 lines) ❌
```

Do:

```
Hero/
 ├── Hero.tsx
 ├── HeroContent.tsx
 ├── HeroStats.tsx
 ├── HeroImage.tsx
 └── hero.utils.ts
```

Benefits:

* Readability
* Maintainability
* Team collaboration
* Easier debugging

---

# 6️⃣ Data Management Rules

## All Page Data Comes From TS Files

No hardcoding inside JSX.

❌ Wrong:

```tsx
<h1>Welcome to Our Platform</h1>
```

✅ Correct:

```tsx
<h1>{homeData.hero.title}</h1>
```

---

# 7️⃣ Data Folder Structure

```
pages/home/data/home.data.ts
```

Example:

```ts
import { HomeData } from "../types/home.types";

export const homeData: HomeData = {
  hero: {
    title: "Hire Top Talent Faster",
    subtitle: "AI powered recruitment platform",
    ctaText: "Get Started"
  }
};
```

---

# 8️⃣ Interface / Types Structure

All data must follow **TypeScript interfaces**.

```
pages/home/types/home.types.ts
```

Example:

```ts
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface HomeData {
  hero: HeroSection;
}
```

---

# 9️⃣ Page Entry File Rule

Each page has one main file:

```
home.tsx
```

Purpose:

* Import components
* Import data
* Compose sections

Example:

```tsx
import Hero from "./components/Hero";
import Features from "./components/Features";
import { homeData } from "./data/home.data";

const Home = () => {
  return (
    <>
      <Hero data={homeData.hero} />
      <Features />
    </>
  );
};

export default Home;
```

---

# 🔟 Component Data Injection Rule

Data must come via **props**.

❌ No direct imports inside deep UI.

✅ Correct:

```tsx
const Hero = ({ data }: { data: HeroSection }) => {
  return <h1>{data.title}</h1>;
};
```

---

# 1️⃣1️⃣ Styling Rules

* Tailwind CSS default
* No inline styles
* No hardcoded colors
* Use theme tokens

Example:

```
text-primary
bg-secondary
rounded-2xl
```

---

# 1️⃣2️⃣ Naming Conventions

## Files

* PascalCase → Components
* camelCase → Utils
* kebab-case → Folders

Examples:

```
UserCard.tsx
formatDate.ts
job-listing/
```

---

# 1️⃣3️⃣ Import Order Rule

Order:

1. React
2. Libraries
3. Global components
4. Local components
5. Hooks
6. Types
7. Styles

---

# 1️⃣4️⃣ Global Types Structure

```
src/types/
 ├── api.types.ts
 ├── user.types.ts
 └── common.types.ts
```

---

# 1️⃣5️⃣ Service Layer Rules

API logic isolated.

```
services/
 └── job.service.ts
```

No API calls inside components.

---

# 1️⃣6️⃣ State Management Rule

If global:

```
store/
```

Tools allowed:

* Redux Toolkit
* Zustand
* Context API

---

# 1️⃣7️⃣ Layout Structure

```
layouts/
 ├── MainLayout.tsx
 ├── DashboardLayout.tsx
 └── AuthLayout.tsx
```

Handles:

* Navbar
* Sidebar
* Footer

---

# 1️⃣8️⃣ Routing Structure

```
routes/
 └── AppRoutes.tsx
```

Centralized routing only.

---

# 1️⃣9️⃣ Code Quality Rules

* ESLint enforced
* Prettier formatting
* No console.logs in production
* Strict TS mode

---

# 2️⃣0️⃣ Performance Rules

* Lazy load pages
* Memo where needed
* Image optimization
* Skeleton loaders

---

# 2️⃣1️⃣ Security Rules

* Sanitize inputs
* Env variables for secrets
* Role-based routing

---

# 2️⃣2️⃣ Scalability Rules

* Feature-based structure
* Plug‑and‑play modules
* No tight coupling

---

# ✅ Final Enforcement Checklist

Before PR merge:

* [ ] File < 400 lines
* [ ] Data in TS files
* [ ] Interfaces defined
* [ ] Reusable moved global
* [ ] No hardcoded text
* [ ] Clean imports
* [ ] Typed props

---

# 🏁 Conclusion

This structure ensures:

* Enterprise scalability
* Clean developer experience
* Faster feature expansion
* Maintainable SaaS architecture
* use the color plalate and theme color and fonts from index.css as global no direct hashinh make proper color plalate like primary, secondary, etc  and using it every where propley no multiple fonts 
---

**End of rules.md**
