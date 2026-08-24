# 🛍️ NovaMart — Online Store

A modern, fully responsive, multilingual e-commerce storefront built with **Next.js 16 App Router**, featuring authentication, cart & checkout, wishlist, order history, dark mode, toast notifications, and a clean reusable component library.

---

## ✨ Features

- 🌍 **Localization** with English (`en`) and Arabic (`ar`) + RTL support
- 📱 Fully responsive design for desktop, tablet, and mobile
- ✅ **Authentication** — login, register and forgot-password flows (client-side demo)
- 🛒 **Shopping Cart** with quantity controls, live totals and localStorage persistence
- 💳 **Checkout & Payment** — shipping form plus Cash on Delivery / Card / PayPal options
- ❤️ **Wishlist** — save products from any card or the product details page
- 🔎 **Product Search** — global search page across all 10 categories
- 🏷️ **Product Filters** — brand filter, price range, sorting (featured / price asc / desc)
- ⭐ **Reviews & Ratings** — star ratings on every card and full review section on details
- 📄 **Product Details Page** — gallery, quantity selector, buy now, related products
- 👤 **User Profile** — edit your name/email, quick stats and shortcuts
- 📦 **Order History** — every placed order is stored locally with status badges
- 🌙 **Dark Mode** — toggle button in the navbar, persisted across visits, no flash on load
- 🔔 **Notifications** — global toast system for cart, wishlist, auth and order events
- 🎨 Modern UI with reusable components (shadcn-style primitives)
- 🖼️ Optimized images using `next/image`
- 🔄 Global state management with Redux Toolkit
- 🎭 Smooth animations powered by Framer Motion

---

## 📂 Project Structure

```text
app/
├── global-not-found.tsx
└── [locale]/
    ├── layout.tsx              # Locale layout (RTL/LTR, theme init, providers)
    ├── globals.css             # Design tokens incl. dark theme variables
    ├── (auth)/                 # Auth pages (no navbar/footer chrome)
    │   ├── layout.tsx
    │   ├── login/
    │   ├── register/
    │   └── forget-password/
    └── (shop)/                 # Storefront pages (navbar + footer chrome)
        ├── layout.tsx
        ├── page.tsx            # Home
        ├── products/[category]/        # Category listing
        ├── products/[category]/[id]/   # Product details
        ├── search/             # Global product search
        ├── wishlist/
        ├── cart/
        ├── checkout/
        ├── orders/
        ├── profile/
        ├── contact/
        ├── support/            # Support hub
        ├── faq/
        ├── shipping-returns/
        ├── terms/
        ├── privacy/
        └── Nexcent/            # Landing-page clone demo

components/
├── pages/                      # Page-specific bodies (Auth, Cart, Checkout, …)
├── shared/                     # Navbar, Footer, ProductCard, Toaster,
│                               # ThemeToggle, LanguageSwitcher, StarRating…
├── provider/                   # Redux store provider w/ persistence
└── ui/                         # shadcn/ui-style primitives

redux/
├── app/store.ts
└── features/
    ├── api/                    # RTK Query (products API)
    ├── auth/                   # authSlice
    ├── cart/                   # cartSlice
    ├── wishlist/               # wishlistSlice
    ├── orders/                 # ordersSlice
    └── ui/                     # uiSlice (toasts)

messages/
├── en.json
└── ar.json

i18n/                           # next-intl routing / navigation / request config
hooks/                          # useChangeLanguage etc.
lib/                            # Zod schemas
utils/                          # Product normalization, ratings, storage helpers
constant/                       # Categories catalog
proxy.ts                        # next-intl locale middleware (Next.js 16 proxy convention)
```

---

## 🚀 Pages

| Route | Description |
|--------|-------------|
| `/en` | Home page |
| `/en/products/[category]` | Category listing (mobiles, laptops, watches, books, footwear…) |
| `/en/products/[category]/[id]` | Product details with reviews |
| `/en/search?q=` | Global product search |
| `/en/wishlist` | Saved products |
| `/en/cart` | Shopping cart |
| `/en/checkout` | Checkout & payment |
| `/en/orders` | Order history |
| `/en/profile` | User profile |
| `/en/login` | Log in |
| `/en/register` | Create account |
| `/en/forget-password` | Reset password |
| `/en/contact` | Contact form |
| `/en/support` | Support hub (FAQ, policies) |

> Replace `en` with `ar` to access the Arabic version.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | App Router (proxy convention, async params) |
| **React 19** | UI Library |
| **TypeScript** | Type Safety |
| **next-intl** | Localization & localized routing |
| **Redux Toolkit** | Global State Management |
| **RTK Query** | Data Fetching |
| **Framer Motion** | Animations |
| **Tailwind CSS v4** | Styling with CSS-variable design tokens |
| **shadcn/ui + Base UI** | Accessible UI primitives |
| **react-hook-form + Zod** | Forms & validation |
| **React Icons / Lucide** | Icons |
| **Swiper / Slick** | Sliders |

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Add your RapidAPI credentials to `.env.local`:

```text
NEXT_PUBLIC_RAPIDAPI_KEY=<your-key>
NEXT_PUBLIC_RAPIDAPI_HOST=ecommerce-api3.p.rapidapi.com
```

Run the development server:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000/en
```

or

```text
http://localhost:3000/ar
```

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 🌐 Localization

Supported languages:

- 🇺🇸 English
- 🇪🇬 Arabic (RTL)

Use the language button in the navbar to switch instantly. Translation files:

```text
messages/
├── en.json
└── ar.json
```

## 🌙 Dark Mode

Use the sun/moon button in the navbar to switch themes. The choice is stored in `localStorage`, re-applied before first paint by an inline script, and defaults to the system preference for new visitors.

## 💾 Persistence

Cart, wishlist, session user and order history are saved to `localStorage` and restored on load, so nothing is lost between visits. Authentication and payments are client-side demos — no real backend or charge is involved.

---

## 📸 Screens

| | |
|--------|--------|
| ![Screenshot 1](./public/READMEiMMAGE/Screenshot%202026-08-24%20151316.png) | ![Screenshot 2](./public/READMEiMMAGE/Screenshot%202026-08-24%20151332.png) |
| ![Screenshot 3](./public/READMEiMMAGE/Screenshot%202026-08-24%20151341.png) | ![Screenshot 4](./public/READMEiMMAGE/Screenshot%202026-08-24%20151356.png) |
| ![Screenshot 5](./public/READMEiMMAGE/Screenshot%202026-08-24%20151408.png) | ![Screenshot 6](./public/READMEiMMAGE/Screenshot%202026-08-24%20151434.png) |
| ![Screenshot 7](./public/READMEiMMAGE/Screenshot%202026-08-24%20151450.png) | ![Screenshot 8](./public/READMEiMMAGE/Screenshot%202026-08-24%20151519.png) |

---

## 📋 Future Improvements

- 🗄️ Real backend & database (current auth/orders are client-side mocks)
- 🍪 HTTP-only cookie sessions / NextAuth integration
- 💳 Real payment gateway (e.g., Stripe)
- ⭐ Customer-submitted reviews persisted server-side
- 🏷️ Server-side faceted filtering & pagination
- 🔔 Push notifications
- ➕ More locales

---

## 👨‍💻 Author

**Abdelghfar Salah**

Frontend Developer specializing in **React.js**, **Next.js**, and modern web applications.

---

## 🌐 Live Demo

Experience the application online:

🔗 **Live Website:** [NovaMart on Vercel](https://online-store-ncp73uc0o-abdelghfarsalahs-projects.vercel.app/en/login)
#   N o v a M a r t  
 