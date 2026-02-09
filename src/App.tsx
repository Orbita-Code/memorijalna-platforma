import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Critical pages - loaded immediately
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Memorials from './pages/Memorials'
import NotFound from './pages/NotFound'

// Lazy loaded pages - loaded on demand
const Profile = lazy(() => import('./pages/Profile'))
const Memorial = lazy(() => import('./pages/Memorial'))
const CreateMemorial = lazy(() => import('./pages/CreateMemorial'))
const EditMemorial = lazy(() => import('./pages/EditMemorial'))
const Obituaries = lazy(() => import('./pages/Obituaries'))
const Obituary = lazy(() => import('./pages/Obituary'))
const CreateObituary = lazy(() => import('./pages/CreateObituary'))
const Condolences = lazy(() => import('./pages/Condolences'))
const Condolence = lazy(() => import('./pages/Condolence'))
const CreateCondolence = lazy(() => import('./pages/CreateCondolence'))
const DeceasedPersonCondolences = lazy(() => import('./pages/DeceasedPersonCondolences'))
const LivingProfile = lazy(() => import('./pages/LivingProfile'))
const CreateLivingProfile = lazy(() => import('./pages/CreateLivingProfile'))
const ActivateProfile = lazy(() => import('./pages/ActivateProfile'))

// Partner pages - lazy loaded
const FuneralHomes = lazy(() => import('./pages/FuneralHomes'))
const FuneralHome = lazy(() => import('./pages/FuneralHome'))
const Cemeteries = lazy(() => import('./pages/Cemeteries'))
const Cemetery = lazy(() => import('./pages/Cemetery'))
const StoneMasons = lazy(() => import('./pages/StoneMasons'))
const QRPartners = lazy(() => import('./pages/QRPartners'))
const QRPartner = lazy(() => import('./pages/QRPartner'))
const BecomePartner = lazy(() => import('./pages/BecomePartner'))
const TvojaPrica = lazy(() => import('./pages/TvojaPrica'))
const DataSecurity = lazy(() => import('./pages/DataSecurity'))
const DonationSetup = lazy(() => import('./pages/DonationSetup'))
const Charities = lazy(() => import('./pages/Charities'))

// Gamification pages - lazy loaded
const Stats = lazy(() => import('./pages/Stats'))

// Static pages - lazy loaded
const About = lazy(() => import('./pages/About'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))

// Support pages - lazy loaded
const HowToWriteObituary = lazy(() => import('./pages/support/HowToWriteObituary'))
const HowToWriteTribute = lazy(() => import('./pages/support/HowToWriteTribute'))
const HowToCope = lazy(() => import('./pages/support/HowToCope'))
const HowToPreserveMemories = lazy(() => import('./pages/support/HowToPreserveMemories'))

// Legal pages - lazy loaded
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const AdvertisingTerms = lazy(() => import('./pages/AdvertisingTerms'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky border-t-transparent mx-auto mb-4"></div>
        <p className="text-text-muted text-sm">Učitavanje...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="prijava" element={<Login />} />
        <Route path="registracija" element={<Register />} />
        <Route path="zaboravljena-lozinka" element={<ForgotPassword />} />
        <Route path="memorijali" element={<Memorials />} />

        {/* Lazy loaded routes wrapped in Suspense */}
        <Route path="memorijal/:id" element={
          <Suspense fallback={<PageLoader />}>
            <Memorial />
          </Suspense>
        } />
        <Route path="umrlice" element={
          <Suspense fallback={<PageLoader />}>
            <Obituaries />
          </Suspense>
        } />
        <Route path="umrlica/:id" element={
          <Suspense fallback={<PageLoader />}>
            <Obituary />
          </Suspense>
        } />
        <Route path="citulje" element={
          <Suspense fallback={<PageLoader />}>
            <Condolences />
          </Suspense>
        } />
        <Route path="citulje/:id" element={
          <Suspense fallback={<PageLoader />}>
            <DeceasedPersonCondolences />
          </Suspense>
        } />
        <Route path="citulja/:id" element={
          <Suspense fallback={<PageLoader />}>
            <Condolence />
          </Suspense>
        } />
        <Route path="citulja/nova" element={
          <Suspense fallback={<PageLoader />}>
            <CreateCondolence />
          </Suspense>
        } />

        {/* Partner pages */}
        <Route path="pogrebna-preduzeca" element={
          <Suspense fallback={<PageLoader />}>
            <FuneralHomes />
          </Suspense>
        } />
        <Route path="pogrebna-preduzeca/:slug" element={
          <Suspense fallback={<PageLoader />}>
            <FuneralHome />
          </Suspense>
        } />
        <Route path="groblja" element={
          <Suspense fallback={<PageLoader />}>
            <Cemeteries />
          </Suspense>
        } />
        <Route path="groblja/:slug" element={
          <Suspense fallback={<PageLoader />}>
            <Cemetery />
          </Suspense>
        } />
        <Route path="kamenorezacke-radnje" element={
          <Suspense fallback={<PageLoader />}>
            <StoneMasons />
          </Suspense>
        } />
        <Route path="qr-partneri" element={
          <Suspense fallback={<PageLoader />}>
            <QRPartners />
          </Suspense>
        } />
        <Route path="qr-partneri/:slug" element={
          <Suspense fallback={<PageLoader />}>
            <QRPartner />
          </Suspense>
        } />
        <Route path="postani-partner" element={
          <Suspense fallback={<PageLoader />}>
            <BecomePartner />
          </Suspense>
        } />
        <Route path="tvoja-prica" element={
          <Suspense fallback={<PageLoader />}>
            <TvojaPrica />
          </Suspense>
        } />
        <Route path="bezbednost" element={
          <Suspense fallback={<PageLoader />}>
            <DataSecurity />
          </Suspense>
        } />
        <Route path="dobrotvorne-organizacije" element={
          <Suspense fallback={<PageLoader />}>
            <Charities />
          </Suspense>
        } />

        {/* Gamification */}
        <Route path="estadistiques" element={
          <Suspense fallback={<PageLoader />}>
            <Stats />
          </Suspense>
        } />

        {/* Static pages */}
        <Route path="o-nama" element={
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        } />
        <Route path="kako-funkcionise" element={
          <Suspense fallback={<PageLoader />}>
            <HowItWorks />
          </Suspense>
        } />
        <Route path="faq" element={
          <Suspense fallback={<PageLoader />}>
            <FAQ />
          </Suspense>
        } />
        <Route path="kontakt" element={
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        } />

        {/* Support pages */}
        <Route path="kako-napisati-citulju" element={
          <Suspense fallback={<PageLoader />}>
            <HowToWriteObituary />
          </Suspense>
        } />
        <Route path="kako-ostaviti-posvetu" element={
          <Suspense fallback={<PageLoader />}>
            <HowToWriteTribute />
          </Suspense>
        } />
        <Route path="kako-se-nositi-sa-gubitkom" element={
          <Suspense fallback={<PageLoader />}>
            <HowToCope />
          </Suspense>
        } />
        <Route path="kako-sacuvati-uspomene" element={
          <Suspense fallback={<PageLoader />}>
            <HowToPreserveMemories />
          </Suspense>
        } />

        {/* Legal pages */}
        <Route path="uslovi-koriscenja" element={
          <Suspense fallback={<PageLoader />}>
            <TermsOfService />
          </Suspense>
        } />
        <Route path="privatnost" element={
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicy />
          </Suspense>
        } />
        <Route path="uslovi" element={
          <Suspense fallback={<PageLoader />}>
            <AdvertisingTerms />
          </Suspense>
        } />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profil" element={
            <Suspense fallback={<PageLoader />}>
              <Profile />
            </Suspense>
          } />
          <Route path="kreiraj-memorijal" element={
            <Suspense fallback={<PageLoader />}>
              <CreateMemorial />
            </Suspense>
          } />
          <Route path="memorijal/:id/izmeni" element={
            <Suspense fallback={<PageLoader />}>
              <EditMemorial />
            </Suspense>
          } />
          <Route path="memorijal/:id/donacije" element={
            <Suspense fallback={<PageLoader />}>
              <DonationSetup />
            </Suspense>
          } />
          <Route path="umrlica/nova" element={
            <Suspense fallback={<PageLoader />}>
              <CreateObituary />
            </Suspense>
          } />
          <Route path="moj-profil" element={
            <Suspense fallback={<PageLoader />}>
              <LivingProfile />
            </Suspense>
          } />
          <Route path="moj-profil/kreiraj" element={
            <Suspense fallback={<PageLoader />}>
              <CreateLivingProfile />
            </Suspense>
          } />
          <Route path="aktiviraj/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ActivateProfile />
            </Suspense>
          } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
