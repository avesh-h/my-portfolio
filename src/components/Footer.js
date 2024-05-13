// components/Footer.js
import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer = () => {
  const gradientBackground = 'linear-gradient(to right, rgb(175, 160, 160), rgb(200, 195, 190))';

  return (
    <div style={{ padding: '16px', background: gradientBackground, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Avesh
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
