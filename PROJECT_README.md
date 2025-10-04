# BioSecure India - Digital Farm Biosecurity Management Portal

**Built for Smart India Hackathon 2025**

## 🚀 Project Overview

BioSecure India is a comprehensive web and PWA-based biosecurity management platform designed specifically for pig and poultry farms in India. It empowers farmers with AI-driven risk assessments, expert video training, gamified compliance tracking, and real-time disease outbreak monitoring.

## ✨ Key Features

### 1. **AI-Based Risk Scoring Engine**
- Interactive questionnaire covering 8 critical biosecurity categories
- Real-time scoring algorithm (0-100 scale)
- Personalized recommendations based on assessment results
- Low/Medium/High risk categorization

### 2. **Learning Hub with Video Courses**
- 6+ expert-led video modules on biosecurity practices
- Multilingual support (English, Hindi, Tamil)
- Subtitles and transcripts available
- Low-bandwidth mode for rural connectivity
- Integrated quizzes with each video

### 3. **Interactive Quiz System**
- MCQ (single/multiple choice) and True/False questions
- Instant feedback and scoring
- Pass threshold: 70%
- Certificate generation for successful completion
- Remedial video links for incorrect answers
- Progress tracking and badge unlocks

### 4. **Gamified Compliance Tracker**
- Bronze, Silver, Gold tier system
- Achievement badges (Guardian, Protector, Champion, Expert, etc.)
- Task checklist with point rewards
- Progress visualization
- Leaderboard integration (ready for backend)

### 5. **Real-Time Disease Outbreak Map**
- Interactive Leaflet-based map of India
- Live disease alerts by region
- Severity indicators (Critical/High/Medium/Low)
- Filterable by disease type and severity
- Affected farm statistics
- Detailed outbreak information cards

### 6. **Digital Farm Health Passport** (Framework Ready)
- Vaccination record management
- Inspection history tracking
- QR code verification system
- Downloadable PDF certificates
- Compliance documentation

### 7. **Farmer Dashboard**
- Biosecurity score overview with visual indicators
- Compliance level tracking
- AI-powered recommendations
- Quick action shortcuts
- Recent activity timeline
- Upcoming task reminders

### 8. **Authentication System**
- Email/Phone login and signup
- OTP-based authentication support (ready for backend)
- Role-based access (Farmer, Vet, Admin)
- Secure session management

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Query (@tanstack/react-query)
- **Maps**: Leaflet + OpenStreetMap
- **Internationalization**: react-i18next
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner toast

### UI Components
- Fully customized shadcn/ui component library
- Semantic design tokens (HSL color system)
- Responsive mobile-first design
- Accessibility-focused (WCAG AA compliant)
- Dark mode support

### Design System
- **Primary Color**: Agricultural Green (HSL 142, 70%, 35%)
- **Secondary Color**: Warm Amber (HSL 38, 90%, 55%) for alerts
- **Accent Color**: Trust Blue (HSL 210, 85%, 50%)
- **Typography**: System fonts for optimal performance
- **Animations**: Smooth transitions, badge pulse effects

## 📁 Project Structure

```
src/
├── assets/              # Images and static assets
│   └── hero-farm.jpg   # AI-generated hero image
├── components/
│   └── ui/             # shadcn/ui components (customized)
├── pages/
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # Farmer dashboard
│   ├── Learning.tsx    # Video learning hub
│   ├── Assessment.tsx  # Risk assessment questionnaire
│   ├── DiseaseMap.tsx  # Interactive outbreak map
│   ├── Compliance.tsx  # Gamified compliance tracker
│   ├── Auth.tsx        # Login/Signup
│   ├── Quiz.tsx        # Quiz interface with results
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component with routing
├── main.tsx            # App entry point
└── index.css           # Global styles + design tokens
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
```

## 🎯 Demo Flow (For Judges)

### 1. Landing Page
- View feature highlights and statistics
- Explore "How It Works" section
- Click "Get Started Free" or "Take Assessment"

### 2. Authentication
- Sign up as a new farmer
- Login with test credentials (demo mode)

### 3. Risk Assessment
- Complete 8-question biosecurity questionnaire
- Receive instant AI-powered score (0-100)
- View personalized recommendations

### 4. Dashboard
- See biosecurity score with visual gauge
- Check compliance level (Bronze/Silver/Gold)
- Review AI recommendations
- Track upcoming tasks

### 5. Learning Hub
- Browse 6 video modules
- Filter by category and difficulty
- Watch video (simulated)
- Take integrated quiz

### 6. Quiz Experience
- Answer 5 questions on disinfection practices
- Get instant feedback
- View score and answer review
- Unlock badges on passing (70%+ threshold)
- Download certificate

### 7. Compliance Tracker
- View task checklist
- Complete tasks for points
- Track badge progress (Guardian, Protector, Champion)
- Monitor level progression

### 8. Disease Outbreak Map
- View India map with outbreak markers
- Filter by severity (Critical/High/Medium/Low)
- Click markers for detailed outbreak information
- See affected farm statistics

## 📊 Sample Data

### Test Accounts (For Demo)
- **Farmer**: farmer@example.com / password
- **Admin**: admin@biosecure.in / password

### Quiz Data
- Video: "Farm-level Disinfection Practices"
- 5 questions (25 marks total)
- Pass threshold: 70%
- Topics: Bleach concentration, contact time, organic matter effects

### Disease Alerts
- 6 active outbreaks across India
- Diseases: ASF, Avian Influenza H5N1, PRRS, Newcastle Disease, FMD, Classical Swine Fever
- States: Assam, Kerala, Punjab, Tamil Nadu, Maharashtra, Jharkhand

## 🎨 Design Highlights

### Accessibility
- High contrast colors (WCAG AA compliant)
- Large touch targets (min 44x44px)
- Clear typography (16px base, scalable)
- Keyboard navigation support
- Screen reader friendly

### Mobile Responsive
- Mobile-first design approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-optimized interactions
- Collapsible navigation

### Animations
- Score reveal: Scale + rotate animation
- Badge glow: Continuous pulse effect
- Smooth transitions: 300ms cubic-bezier
- Hover states on all interactive elements

## 🔧 Configuration

### Environment Variables (Not Required for Demo)
The app runs completely client-side with mock data. For production:
- `VITE_SUPABASE_URL` - Backend API endpoint
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Auth key
- `VITE_MAPBOX_TOKEN` - Mapbox API key (optional)

### Customization
- **Colors**: Edit `src/index.css` (HSL values only)
- **Components**: Modify `src/components/ui/`
- **Content**: Update page files in `src/pages/`

## 📱 PWA Setup (Future Enhancement)

To enable offline capability:
1. Add service worker with Workbox
2. Cache app shell and critical assets
3. Implement background sync for form submissions
4. Add install prompt for home screen

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads and displays correctly
- [ ] Navigation works across all pages
- [ ] Assessment questionnaire completes and shows score
- [ ] Quiz submission shows results and answer review
- [ ] Map displays markers and allows interaction
- [ ] Compliance tasks can be checked/unchecked
- [ ] Responsive design works on mobile (320px+)
- [ ] All buttons and links are functional

## 🚧 Known Limitations (MVP Scope)

1. **Backend**: Currently using mock data (no database)
2. **Video Playback**: Simulated (links to sample images)
3. **OTP Auth**: UI ready, backend integration pending
4. **Chatbot**: Framework ready, AI integration pending
5. **Admin Panel**: Basic stats only, full CRUD pending
6. **Multilingual**: i18n setup complete, translations pending

## 🎓 Future Enhancements

### Phase 2 (Post-Hackathon)
- [ ] Supabase backend integration
- [ ] Real video hosting (HLS/MP4 streaming)
- [ ] SMS/WhatsApp notifications
- [ ] Actual AI model for risk scoring
- [ ] Real-time disease data API
- [ ] Certificate PDF generation (Puppeteer)
- [ ] Advanced admin analytics dashboard
- [ ] Social features (leaderboard, forums)

### Phase 3 (Production)
- [ ] Voice-based chatbot (Dialogflow)
- [ ] Stripe payment integration for premium features
- [ ] Mobile app (React Native)
- [ ] Veterinarian portal
- [ ] Government agency dashboard
- [ ] Multi-tenant architecture

## 👥 Team

**Team BioSecure**
- Built for Smart India Hackathon 2025
- Theme: Digital Agriculture / Animal Husbandry

## 📄 License

This project is built for educational and hackathon purposes.

## 🙏 Acknowledgments

- **Smart India Hackathon 2025** for the problem statement
- **shadcn/ui** for the component library
- **Tailwind CSS** for the styling framework
- **OpenStreetMap** for map tiles
- **Unsplash** for sample imagery

---

**Live Demo**: [Your Deployment URL]
**GitHub**: [Your Repository URL]
**Contact**: [Your Team Contact]

Built with ❤️ for Indian Farmers 🚜🐷🐔
