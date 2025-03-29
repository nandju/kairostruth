import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Pages publiques
import LoginPage from '../auth/pages/LoginPage';
import Landing from '../landing/pages/Landing';

// Pages client
import Dashboard from '../app/client/pages/Dashboard';
import Reservations from '../app/client/pages/Reservations';
import Profile from '../app/client/pages/Profile';
import Parametres from '../app/client/pages/Parametres';

// Pages conducteur
import ConducteurDashboard from '../app/conducteur/pages/Dashboard';
import Courses from '../app/conducteur/pages/Courses';
import Disponibilites from '../app/conducteur/pages/Disponibilites';
import Revenus from '../app/conducteur/pages/Revenus';
import ProfileConducteur from '../app/conducteur/pages/Profile';

// Pages admin
import AdminHome from '../app/admin/pages/Home';
import Conducteurs from '../app/admin/pages/Conducteurs';
import Vehicules from '../app/admin/pages/Vehicules';
import AdminReservations from '../app/admin/pages/Reservations';
import Commandes from '../app/admin/pages/Commandes';
import { NouveauConducteur, NouveauVehicule } from '../app/admin/pages/forms';
import ConducteurDetails from '../app/admin/pages/details/ConducteurDetails';
import VehiculeDetails from '../app/admin/pages/details/VehiculeDetails';

// Layouts
import ClientDashboardLayout from '../app/client/components/layout/DashboardLayout';
import ConducteurDashboardLayout from '../app/conducteur/components/layout/DashboardLayout';

// Guard pour les routes protégées avec vérification du rôle
const PrivateRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, getRole } = useAuth();
  const userRole = getRole();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={`/${userRole}/dashboard`} />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Routes client protégées */}
      <Route
        path="/client"
        element={
          <PrivateRoute allowedRole="client">
            <ClientDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/client/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="profile" element={<Profile />} />
        <Route path="parametres" element={<Parametres />} />
      </Route>

      {/* Routes conducteur protégées */}
      <Route
        path="/conducteur"
        element={
          <PrivateRoute allowedRole="conducteur">
            <ConducteurDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/conducteur/dashboard" replace />} />
        <Route path="dashboard" element={<ConducteurDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="disponibilites" element={<Disponibilites />} />
        <Route path="revenus" element={<Revenus />} />
        <Route path="profile" element={<ProfileConducteur />} />
        <Route path="parametres" element={<Parametres />} />
      </Route>

      {/* Routes Admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRole="admin">
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="conducteurs" element={<Conducteurs />} />
              <Route path="conducteurs/nouveau" element={<NouveauConducteur />} />
              <Route path="conducteurs/:id/details" element={<ConducteurDetails />} />
              <Route path="vehicules" element={<Vehicules />} />
              <Route path="vehicules/nouveau" element={<NouveauVehicule />} />
              <Route path="vehicules/:id/details" element={<VehiculeDetails />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="reservations/:id" element={<AdminReservations />} />
              <Route path="commandes" element={<Commandes />} />
              <Route path="rapports" element={<AdminReservations />} />
              <Route path="factures" element={<Commandes />} />
              <Route path="activites" element={<AdminHome />} />
            </Routes>
          </PrivateRoute>
        }
      />

      {/* Route par défaut - Redirection vers l'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router; 