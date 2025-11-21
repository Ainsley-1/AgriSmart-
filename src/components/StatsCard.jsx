import React from 'react';
import { Card } from 'react-bootstrap';

function StatsCard({ title, value, icon, subtitle, variant = 'primary' }) {
  const variantColors = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-dark',
    info: 'bg-info text-white',
    light: 'bg-light text-dark'
  };

  return (
    <Card className={`${variantColors[variant]} h-100`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title className="h4">{value}</Card.Title>
            <Card.Text className="mb-0">{title}</Card.Text>
            {subtitle && <small>{subtitle}</small>}
          </div>
          <div style={{ fontSize: '2.5rem' }}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StatsCard;