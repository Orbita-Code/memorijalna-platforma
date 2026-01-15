import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Ucitavanje...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/prijava" replace />
  }

  return <Outlet />
}
