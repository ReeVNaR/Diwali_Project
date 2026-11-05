# 🪔 Festive Ad Studio

**Festive Ad Studio** is a self-service Diwali marketing design SaaS platform designed for small businesses, shop owners, creators, and brands to craft high-converting festive advertisements in minutes without graphic design experience.

Inspired by **Apple's Liquid Glass UI**, the interface combines translucent glass surfaces, layered glassmorphism, subtle background blur, soft borders with low opacity, floating navigation elements, and warm golden festive accents.

---

## 🌟 Key Features

- **100+ Professional Diwali Templates**: Handcrafted across 10 business categories with distinct visual compositions, typography, and color schemes.
- **Canva-Inspired Interactive Studio**: Full object manipulation, selection, resizing, rotation, z-index layering, duplicate, lock/unlock, and undo/redo using Fabric.js.
- **Multi-Platform Formats**:
  - Instagram Square (`1080 × 1080`, 1:1)
  - Instagram Portrait (`1080 × 1350`, 4:5)
  - Instagram Story (`1080 × 1920`, 9:16)
  - WhatsApp Square (`1080 × 1080`, 1:1)
  - WhatsApp Portrait (`1080 × 1350`, 4:5)
- **Brand & Asset Uploads**: Seamlessly upload shop logos and product photos with automatic Sharp optimization.
- **Live Social Mockup Previews**: Preview creatives in real-time inside simulated Instagram post feeds, smartphone story frames, and WhatsApp chats.
- **High-Resolution Exports**: Download crystal clear PNG (lossless) and JPEG (custom quality) with 1x (Standard) or 2x (Ultra HD 2K for print) scaling.
- **JSON Storage Abstraction**: Concurrency-safe atomic writes for templates and projects with zero database setup required.

---

## 📁 Project Structure

```
Diwali_Project/
├── package.json                   # Root package orchestration (concurrently)
├── .gitignore                     # Git ignore rules
├── .env.example                   # Root environment configuration
├── README.md                      # Comprehensive documentation
│
├── client/                        # Frontend Application (React + Vite + Tailwind)
│   ├── index.html                 # Entry HTML with Google Fonts
│   ├── vite.config.js             # Vite configuration with /api & /uploads proxy
│   ├── tailwind.config.js         # Apple Liquid Glass design tokens & colors
│   ├── postcss.config.js          # PostCSS configuration
│   ├── package.json               # Client dependencies
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx         # Floating liquid glass navigation bar
│       │   ├── Sidebar.jsx        # Left toolbox (Templates, Text, Uploads, Elements, Backgrounds, Layers)
│       │   ├── GlassCard.jsx      # Reusable liquid glass container with specular highlight
│       │   ├── TemplateCard.jsx   # Aspect-ratio template card with live visual preview
│       │   ├── SearchBar.jsx      # Search input with keyboard clear
│       │   ├── CategoryFilter.jsx # Category & format filter pills
│       │   ├── UploadZone.jsx     # Drag-and-drop file upload zone
│       │   ├── ColorPicker.jsx    # Curated Diwali palettes + custom HEX
│       │   ├── FontSelector.jsx   # Curated Google typography selector
│       │   ├── CanvasEditor.jsx   # Fabric.js interactive canvas wrapper
│       │   ├── TextEditor.jsx     # Right-sidebar text inspector
│       │   ├── ImageEditor.jsx    # Right-sidebar image & shape inspector
│       │   ├── ExportPanel.jsx    # High-res export modal with confetti celebration
│       │   ├── PreviewModal.jsx   # Social mockup preview (Instagram / WhatsApp)
│       │   └── LoadingScreen.jsx  # Glowing Diya loader
│       ├── pages/
│       │   ├── LandingPage.jsx    # Hero, how it works, categories, CTA & footer
│       │   ├── Dashboard.jsx      # User workspace dashboard
│       │   ├── TemplateGallery.jsx# 100+ templates browser with search & filters
│       │   ├── EditorPage.jsx     # The full Canva-grade creative studio
│       │   ├── MyDesigns.jsx      # Saved projects management
│       │   └── NotFound.jsx       # 404 page
│       ├── store/
│       │   ├── editorStore.js     # Zustand store for canvas state & history
│       │   └── templateStore.js   # Zustand store for templates & filters
│       ├── services/
│       │   ├── api.js             # Centralized fetch client
│       │   ├── templateService.js # Template API calls
│       │   ├── uploadService.js   # Logo & product upload calls
│       │   ├── exportService.js   # Export API calls
│       │   └── projectService.js  # Project CRUD API calls
│       ├── hooks/
│       │   ├── useTemplates.js    # Template fetching hook
│       │   └── useEditor.js       # Fabric events & keyboard shortcuts hook
│       └── utils/
│           ├── canvasUtils.js     # Fabric.js helpers & Diwali SVG generators
│           └── imageUtils.js      # Image format and download helpers
│
└── server/                        # Backend API Server (Node.js + Express + Sharp)
    ├── package.json               # Server dependencies
    ├── .env.example               # Server environment variables template
    ├── src/
    │   ├── config/
    │   │   └── config.js          # App configuration & directory paths
    │   ├── controllers/
    │   │   ├── templateController.js
    │   │   ├── uploadController.js
    │   │   ├── exportController.js
    │   │   └── projectController.js
    │   ├── routes/
    │   │   ├── templateRoutes.js
    │   │   ├── uploadRoutes.js
    │   │   ├── exportRoutes.js
    │   │   └── projectRoutes.js
    │   ├── middleware/
    │   │   ├── errorHandler.js
    │   │   └── uploadMiddleware.js
    │   ├── services/
    │   │   ├── storageService.js  # Atomic JSON storage abstraction
    │   │   ├── templateService.js # Template queries & filters
    │   │   ├── imageService.js    # Sharp image processing & optimization
    │   │   └── exportService.js   # Sharp high-res canvas exports
    │   ├── data/
    │   │   ├── templates.json     # 102 distinct template definitions
    │   │   ├── seedTemplates.js   # Template generator seed script
    │   │   └── projects.json      # Saved project instances
    │   ├── app.js                 # Express app configuration
    │   └── server.js              # Server entry point
    └── uploads/
        ├── logos/                 # Uploaded brand logos
        ├── products/              # Uploaded product photos
        └── exports/               # Exported high-resolution creatives
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, React Router DOM v7, Lucide Icons, Framer Motion, Zustand, Fabric.js 5.3, Canvas Confetti |
| **Backend** | Node.js, Express.js, Multer, Sharp, Helmet, CORS, Express Rate Limit, UUID |
| **Storage** | Local filesystem with atomic JSON read/write abstraction |

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/ReeVNaR/Diwali_Project.git
cd Diwali_Project
```

### 2. Install dependencies
Install root, server, and client dependencies in one command:
```bash
npm run install:all
```
*(Or install manually: `npm install`, then `cd server && npm install`, then `cd client && npm install`)*

### 3. Configure environment variables
Create `.env` inside `server/`:
```bash
cp server/.env.example server/.env
```
Default `.env` values:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 💻 Running the Application

### Start both Backend & Frontend concurrently:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

### Or start individually:
```bash
# In terminal 1 (Backend API)
npm run dev:server

# In terminal 2 (Frontend Client)
npm run dev:client
```

---

## ⌨️ Studio Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Z` | Undo last action |
| `Ctrl + Shift + Z` / `Ctrl + Y` | Redo |
| `Ctrl + D` | Duplicate selected element |
| `Delete` / `Backspace` | Delete selected element |
| `Ctrl + S` | Save project |
| `Ctrl + E` | Open high-resolution export panel |

---

## 📡 REST API Documentation

### Templates
- `GET /api/templates`: Fetch all templates (supports query parameters: `category`, `format`, `search`, `sort`)
- `GET /api/templates/categories`: List all business categories
- `GET /api/templates/:id`: Fetch template by unique ID
- `GET /api/templates/category/:category`: Fetch templates in a specific category

### Uploads
- `POST /api/upload/logo`: Upload business logo (`multipart/form-data`, key: `logo`)
- `POST /api/upload/product`: Upload product photo (`multipart/form-data`, key: `product`)
- `DELETE /api/upload/:filename?type=logo|product`: Delete an uploaded asset

### Projects
- `GET /api/projects`: List all saved projects
- `POST /api/projects`: Create and save a new project
- `GET /api/projects/:id`: Get project by ID
- `PUT /api/projects/:id`: Update existing project
- `DELETE /api/projects/:id`: Delete a saved project

### Export
- `POST /api/export/png`: Generate high-res PNG from canvas
- `POST /api/export/jpeg`: Generate optimized JPEG with customizable quality

---

## ✅ Feature Completion Checklist

- [x] **Phase 1: Foundations**: React + Vite, Tailwind CSS with Liquid Glass design tokens, Express backend, Sharp, Multer, Helmet, Rate Limiter.
- [x] **Phase 2: Templates & Catalog**: 100+ distinct Diwali template configurations seeded across 10 business categories, format filters, search.
- [x] **Phase 3: Interactive Studio**: Fabric.js canvas, text formatting (fonts, sizes, colors, alignments, letter spacing), image uploads, Diwali shapes (Diyas, Mandalas, Sparklers, Lanterns), layer ordering, undo/redo.
- [x] **Phase 4: Backend Integration**: Upload APIs with Sharp optimization, atomic JSON storage abstraction, save/load project APIs, PNG/JPEG export endpoints.
- [x] **Phase 5: UX & Polish**: Apple Liquid Glass UI styling, responsive layouts, device mockups preview (Instagram Post, Instagram Story, WhatsApp), keyboard shortcuts, confetti celebration.

---

## 📌 Known Limitations

1. **Storage Tier**: Uses a concurrency-safe atomic JSON file repository suitable for local development, demos, and single-instance environments. For high-concurrency production deployments, swap `JsonStorageRepository` with MongoDB or PostgreSQL using the built-in storage service abstraction.
2. **Asset Storage**: Uploaded images are stored in `server/uploads/`. In a multi-region cloud deployment, replace local paths with S3/GCS bucket storage.
3. **Fonts**: Google Web Fonts (Outfit, Playfair Display, Cinzel, Poppins, Montserrat, Rozha One, Great Vibes) require an active internet connection to render custom web typefaces.
