# Moon Gems - Premium Gemstone Trading Platform

**Version:** 1.5  
**Status:** PRODUCTION READY  
**Last Updated:** 2026-01-31

---

## 🌙 Project Overview

**Moon Gems** is a luxury gemstone trading website targeting GCC and international markets. The platform showcases premium gemstones from Rathnapura, Sri Lanka, and facilitates B2B trade inquiries through multiple contact channels.

### Key Features
- ✅ **Luxury Dark Theme Design** - Professional dark aesthetic with golden accents
- ✅ **3D Floating Gemstone Animations** - Eye-catching hero section with animated gems
- ✅ **Dual WhatsApp Integration** - India & Sri Lanka offices with QR codes
- ✅ **Dynamic Gallery System** - Table-based gemstone gallery with filtering
- ✅ **Contact Form Modal** - Professional inquiry system
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **RESTful Table API** - Backend data management for gallery

---

## 📁 Project Structure

```
moon-gems/
├── index.html              # Main landing page
├── css/
│   └── style.css          # Complete stylesheet (dark theme)
├── js/
│   ├── main.js            # Core functionality (WhatsApp, modals)
│   └── gallery.js         # Gallery management (RESTful API)
├── images/
│   └── logo-original.png  # Original logo file
└── README.md              # This file
```

---

## 🚀 Live Features

### 1. **Hero Section**
- **Origin Badge:** "Rathnapura · Sri Lanka · Global Trade"
- **6 Floating 3D Gemstones** with animated glows:
  - Yellow Citrine (left-top)
  - Green Emerald (left-middle)
  - Light Blue Crystal (left-top-small)
  - Ruby Red (right-top)
  - Pink Gem (right-bottom)
  - Yellow Sapphire (right-center)
- **Call-to-Actions:**
  - WhatsApp Enquiry (opens modal)
  - Request Availability (opens contact form)

### 2. **WhatsApp Modal System**
- **India Office:** +91 9632420706 🇮🇳
- **Sri Lanka Office:** +94 711 789 886 🇱🇰
- Features:
  - QR codes for both numbers
  - Direct "Click to Chat" buttons with pre-filled messages
  - Country flags and professional layout
  - Mobile-optimized deep links: `wa.me/[number]`

### 3. **Contact Form Modal**
- **Email Integration:** trade@moongemsglobal.com
- **Form Fields:**
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Gemstone Interest (dropdown: Sapphires, Rubies, Emeralds, Mixed, Other)
  - Message (required)
- **Submission:** mailto link opens default email client
- **Success/Error Messages** with auto-close (3 seconds)

### 4. **Dynamic Gallery**
- **RESTful Table API** for data management
- **Table Name:** `gallery`
- **Schema Fields:**
  - `id` (text) - Unique identifier
  - `image_url` (text) - Gemstone image URL
  - `title` (text) - Gemstone name
  - `category` (text) - sapphires | rubies | emeralds | mixed
  - `description` (rich_text) - Detailed description
  - `price_range` (text) - Price indication
  - `created_at` (datetime) - Auto-generated timestamp

- **Features:**
  - Category filtering (All, Sapphires, Rubies, Emeralds, Mixed)
  - 3-column responsive grid
  - Lazy loading for images
  - Lightbox view with full details
  - Pagination (9 items per page)
  - "Request Availability" button in lightbox

### 5. **Gallery Management Process**
**Weekly Update Workflow:**
1. Upload new gemstone images to **Imgur** or **Cloudinary** (free CDN)
2. Use RESTful Table API to add new records:
   ```javascript
   POST /tables/gallery
   {
     "image_url": "https://imgur.com/...",
     "title": "Ceylon Blue Sapphire",
     "category": "sapphires",
     "description": "5.2ct natural Ceylon blue sapphire...",
     "price_range": "$15,000 - $20,000"
   }
   ```
3. Gallery auto-refreshes with new items
4. Images display in descending order (newest first)

### 6. **Navigation Sections**
- What We Trade
- Gallery (dynamic)
- How We Work
- Compliance
- Contact

### 7. **Branding**
- **Logo:** AI-generated golden crescent moon + turquoise gem (70×70px)
- **Logo URL:** `https://www.genspark.ai/api/files/s/Uf8vdt4T?cache_control=3600`
- **Logo Text:** "Moon Gems" (32px, weight 600, golden #C8A86A)
- **Color Palette:**
  - Primary: #C8A86A (Golden)
  - Background: #0B0F14 (Deep Navy)
  - Text: #F2EBDD (Cream White)
  - Accents: rgba(200, 168, 106, 0.3)

---

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom dark theme, animations, flexbox/grid
- **Vanilla JavaScript** - No frameworks (lightweight)
- **Google Fonts:**
  - Playfair Display (serif, headings)
  - Inter (sans-serif, body)

### Data Management
- **RESTful Table API** (built-in)
  - Base URL: `tables/[table_name]`
  - Methods: GET, POST, PUT, PATCH, DELETE
  - Pagination: `?page=1&limit=9`
  - Sorting: `?sort=-created_at`
  - Filtering: `?search=[category]`

### External Services
- **QR Code API:** `https://api.qrserver.com/v1/create-qr-code/`
- **WhatsApp Deep Links:** `https://wa.me/[number]?text=[message]`
- **Email Integration:** mailto links (no backend required)

---

## 📋 API Endpoints

### Gallery Table API

#### 1. List Gallery Items (Paginated)
```
GET /tables/gallery?page=1&limit=9&sort=-created_at
Response: {
  data: [...],
  total: 25,
  page: 1,
  limit: 9,
  table: "gallery",
  schema: {...}
}
```

#### 2. Get Single Item
```
GET /tables/gallery/{id}
Response: { id, image_url, title, category, ... }
```

#### 3. Create New Item
```
POST /tables/gallery
Body: {
  "image_url": "https://...",
  "title": "...",
  "category": "sapphires",
  "description": "...",
  "price_range": "..."
}
Response: Created record with system fields
```

#### 4. Update Item
```
PUT /tables/gallery/{id}
Body: { ...full record }
```

#### 5. Delete Item
```
DELETE /tables/gallery/{id}
Response: 204 No Content (soft delete)
```

---

## 🎨 Design System

### Typography
```css
/* Headings */
font-family: 'Playfair Display', serif;
font-weight: 400, 500, 600, 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 300, 400, 500, 600;
```

### Color Variables
```css
--primary-gold: #C8A86A;
--dark-navy: #0B0F14;
--secondary-dark: #1B2430;
--text-cream: #F2EBDD;
--border-gold: rgba(200, 168, 106, 0.3);
```

### Animations
- **Float:** Gemstone floating effect (10s infinite)
- **Fade In:** Modal appearance (0.3s)
- **Slide Up:** Content entrance (0.4s)
- **Spin:** Loading spinner (1s infinite)

---

## 📞 Contact Information

### India Office
- **WhatsApp:** +91 9632420706 🇮🇳
- **Deep Link:** `https://wa.me/919632420706?text=Hello%20Moon%20Gems...`

### Sri Lanka Office (HQ)
- **WhatsApp:** +94 711 789 886 🇱🇰
- **Deep Link:** `https://wa.me/94711789886?text=Hello%20Moon%20Gems...`

### Email
- **Trade Inquiries:** trade@moongemsglobal.com

### Registered Address
```
Moon Gems Pvt Ltd
No. 9, Abeyraja Mawatha
Godigamuwa, Rathnapura
Sri Lanka
```

---

## 🔄 Gallery Update Instructions

### Option 1: Using Imgur (Free)
1. Go to https://imgur.com
2. Upload gemstone image (drag & drop)
3. Right-click image → "Copy image address"
4. Use URL in API POST request

### Option 2: Using Cloudinary (Free Tier)
1. Sign up at https://cloudinary.com
2. Upload via Dashboard
3. Copy image URL
4. Use in API POST request

### Add New Gemstone via JavaScript Console
```javascript
fetch('tables/gallery', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    image_url: 'https://imgur.com/XYZ.jpg',
    title: 'Ceylon Blue Sapphire 5.2ct',
    category: 'sapphires',
    description: 'Natural unheated Ceylon blue sapphire...',
    price_range: '$15,000 - $20,000'
  })
})
.then(res => res.json())
.then(data => console.log('Added:', data));
```

---

## 🚀 Deployment

### Recommended Platforms
1. **Vercel** (Recommended)
   - Push to GitHub
   - Import repository in Vercel
   - Deploy automatically

2. **Netlify**
   - Drag & drop project folder
   - Instant deployment

3. **GitHub Pages**
   - Push to `main` branch
   - Enable Pages in repository settings

4. **AWS S3 + CloudFront**
   - Professional CDN solution
   - Best for high traffic

### Pre-Deployment Checklist
- [ ] Update email addresses in contact form
- [ ] Verify WhatsApp numbers
- [ ] Test all modals and forms
- [ ] Add gallery content (minimum 9 items)
- [ ] Test on mobile devices
- [ ] Verify image CDN URLs are accessible
- [ ] Add SSL certificate (auto with Vercel/Netlify)

---

## ✅ Completed Features

### Phase 1: Core Website ✓
- [x] Logo integration (AI-generated, transparent)
- [x] Hero section with floating gemstones
- [x] Trust pillars section
- [x] What We Trade section
- [x] How We Work section
- [x] Compliance section
- [x] Contact section
- [x] Footer
- [x] Responsive design

### Phase 2: Interactive Features ✓
- [x] WhatsApp modal (dual offices, QR codes)
- [x] Contact form modal (email integration)
- [x] Smooth scrolling navigation
- [x] Deep linking for WhatsApp
- [x] Modal close on outside click & ESC key

### Phase 3: Gallery System ✓
- [x] Table schema creation (`gallery`)
- [x] RESTful API integration
- [x] Sample data (3 gemstones)
- [x] Dynamic grid layout
- [x] Category filtering
- [x] Lightbox functionality
- [x] Pagination system
- [x] Lazy loading
- [x] Mobile optimization

---

## 🔮 Future Enhancements (Optional)

### Phase 4: Advanced Features
- [ ] Multi-language support (Arabic, Hindi, Chinese)
- [ ] Live chat integration (Tawk.to or Intercom)
- [ ] 360° gemstone viewer
- [ ] Advanced search (price range, carat weight, origin)
- [ ] User accounts for registered dealers
- [ ] Wishlist/favorites system
- [ ] Email newsletter signup
- [ ] Blog/News section
- [ ] Testimonials carousel
- [ ] Video gallery

### Phase 5: SEO & Analytics
- [ ] Google Analytics integration
- [ ] Meta tags optimization
- [ ] Structured data (Schema.org)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Performance optimization (lazy load, compression)
- [ ] A/B testing for CTAs

### Phase 6: Security & Compliance
- [ ] HTTPS enforcement
- [ ] GDPR compliance (cookie consent)
- [ ] Rate limiting for API
- [ ] Input sanitization
- [ ] CAPTCHA for forms

---

## 🐛 Known Issues / Notes

1. **Gallery Images:** Currently using sample data. Replace with professional gemstone photography.
2. **Email Form:** Uses mailto (opens default email client). For production, consider:
   - **Formspree** (free tier: 50 submissions/month)
   - **EmailJS** (free tier: 200 emails/month)
   - **Netlify Forms** (if deployed on Netlify)

3. **Logo:** AI-generated placeholder. Request professional logo from designer if needed.

4. **Content:** Sample descriptions provided. Update with actual product details.

---

## 📖 Documentation References

### RESTful Table API Docs
- Base URL: `/tables/[table_name]`
- Full documentation available in project guidelines

### WhatsApp API
- Official docs: https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat

### QR Code API
- Documentation: https://goqr.me/api/

---

## 🤝 Support

For technical issues or questions:
- Review this README first
- Check browser console for errors (F12)
- Verify API endpoints are working (`tables/gallery`)
- Test on different browsers (Chrome, Firefox, Safari)

---

## 📄 License

Copyright © 2026 Moon Gems Pvt Ltd. All rights reserved.

---

## 🎯 Current Status Summary

**✅ PRODUCTION READY**

All core features implemented and functional:
- Logo: FIXED (AI-generated, transparent, 70px)
- WhatsApp Modal: COMPLETE (dual offices, QR codes, deep links)
- Contact Form: COMPLETE (email integration, validation)
- Gallery: COMPLETE (RESTful API, filtering, lightbox, pagination)
- Design: COMPLETE (dark theme, responsive, animations)

**Next Action:** Deploy to Vercel/Netlify and add real gemstone images!

---

**Built with ❤️ for premium gemstone trading**
