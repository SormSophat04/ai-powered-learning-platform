import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface RoleRouteProps {
  allowedRoles: ('student' | 'teacher' | 'admin')[];
  children: React.ReactNode;
}

export default function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const token = localStorage.getItem('token');
  const role = useAppSelector((s) => s.auth.role);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    const fallback = role === 'teacher' ? '/dashboard/teacher' : role === 'admin' ? '/dashboard/admin' : '/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
