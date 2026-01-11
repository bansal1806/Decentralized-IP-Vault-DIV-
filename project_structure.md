# Project Structure: DCIP Prototype (Next.js)

This project uses **Next.js 14+ (App Router)** for a seamless Fullstack experience, highly optimized for Vercel deployment.

```
/
├── app/                        # Next.js App Router (Frontend + API)
│   ├── page.tsx                # Landing Page
│   ├── layout.tsx              # Root Layout (Fonts, Global CSS)
│   ├── dashboard/              # Protected Dashboard Routes
│   │   └── page.tsx
│   ├── marketplace/            # Investment Marketplace
│   │   ├── page.tsx            # List View
│   │   └── [id]/page.tsx       # Asset Details
│   └── api/                    # Serverless API Routes (Mock Backend)
│       ├── ip/route.ts         # GET IPs
│       └── invest/route.ts     # POST Invest
├── components/                 # React UI Components
│   ├── ui/                     # ShadCN/Radix primitives (Button, Card, etc.)
│   ├── layout/                 # Navbar, Footer
│   └── features/               # Feature-specific components (InvestModal, Chart)
├── lib/                        # Utilities
│   ├── utils.ts                # CSS class merging, formatters
│   └── mock-db.ts              # In-memory mock data store
├── public/                     # Static Assets (Images, Icons)
└── styles/                     # Global Styles (Tailwind)
```

## Deployment
- **Platform**: Vercel
- **Command**: `npm run build`
- **Env Mods**: None required for Mock Mode.
