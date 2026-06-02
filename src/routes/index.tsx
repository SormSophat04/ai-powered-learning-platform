import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import AIChat from '../pages/AIChat';
import Quiz from '../pages/Quiz';
import Assignments from '../pages/Assignments';
import Analytics from '../pages/Analytics';
import LearningPath from '../pages/LearningPath';
import Teacher from '../pages/Teacher';
import Admin from '../pages/Admin';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login defaultTab="login" />} />
      <Route path="/register" element={<Login defaultTab="register" />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="chat" element={<AIChat />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="learning-path" element={<LearningPath />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
