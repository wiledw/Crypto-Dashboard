import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { PermIdentity } from '@mui/icons-material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1E1E2F', color: '#2DE1B9'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight : 'bold' }}>
          Newton
        </Typography>
        <Button color="inherit" sx={{ marginRight: '10px' }}>Log In</Button>
        <Button variant="outlined" sx={{ color: 'white', borderColor: '#2DE1B9', borderRadius: '20px' }}>Sign Up</Button>
        <PermIdentity style={{ color: '#2DE1B9' , marginLeft: '60px' }}/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
