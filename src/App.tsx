import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Memorials from './pages/Memorials'
import Memorial from './pages/Memorial'
import CreateMemorial from './pages/CreateMemorial'
import EditMemorial from './pages/EditMemorial'
import Obituaries from './pages/Obituaries'
import Obituary from './pages/Obituary'
import CreateObituary from './pages/CreateObituary'
import LivingProfile from './pages/LivingProfile'
import CreateLivingProfile from './pages/CreateLivingProfile'
import ActivateProfile from './pages/ActivateProfile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="prijava" element={<Login />} />
        <Route path="registracija" element={<Register />} />
        <Route path="memorijali" element={<Memorials />} />
        <Route path="memorijal/:id" element={<Memorial />} />
        <Route path="umrlice" element={<Obituaries />} />
        <Route path="umrlica/:id" element={<Obituary />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profil" element={<Profile />} />
          <Route path="kreiraj-memorijal" element={<CreateMemorial />} />
          <Route path="memorijal/:id/izmeni" element={<EditMemorial />} />
          <Route path="umrlica/nova" element={<CreateObituary />} />
          <Route path="moj-profil" element={<LivingProfile />} />
          <Route path="moj-profil/kreiraj" element={<CreateLivingProfile />} />
          <Route path="aktiviraj/:id" element={<ActivateProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
