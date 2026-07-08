import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleRoute from '../components/RoleRoute';

const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Courses = lazy(() => import('../pages/Courses'));
const AIChat = lazy(() => import('../pages/AIChat'));
const Quiz = lazy(() => import('../pages/Quiz'));
const Assignments = lazy(() => import('../pages/Assignments'));
const Analytics = lazy(() => import('../pages/Analytics'));
const LearningPath = lazy(() => import('../pages/LearningPath'));
const Teacher = lazy(() => import('../pages/Teacher'));
const Admin = lazy(() => import('../pages/Admin'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login defaultTab="login" />} />
        <Route path="/register" element={<Login defaultTab="register" />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="learning-path" element={<LearningPath />} />
          <Route path="teacher" element={<RoleRoute allowedRoles={['teacher', 'admin']}><Teacher /></RoleRoute>} />
          <Route path="admin" element={<RoleRoute allowedRoles={['admin']}><Admin /></RoleRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
