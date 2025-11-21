import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const farmerLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/my-products', label: 'My Products', icon: '🌱' },
    { path: '/orders', label: 'Orders', icon: '📦' },
    { path: '/add-product', label: 'Add Product', icon: '➕' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  const buyerLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Browse Products', icon: '🛒' },
    { path: '/orders', label: 'My Orders', icon: '📦' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  const links = user?.role === 'farmer' ? farmerLinks : buyerLinks;

  return (
    <div className="sidebar bg-light border-end" style={{ width: '250px', minHeight: 'calc(100vh - 76px)' }}>
      <Nav className="flex-column p-3">
        {links.map(link => (
          <Nav.Link
            key={link.path}
            as={Link}
            to={link.path}
            className={`d-flex align-items-center py-2 px-3 mb-1 rounded ${
              location.pathname === link.path ? 'bg-success text-white' : 'text-dark'
            }`}
          >
            <span className="me-3" style={{ fontSize: '1.2em' }}>{link.icon}</span>
            {link.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;