// WelcomeSection.tsx
import React from 'react';
import { Box, Typography, Button, Stack  } from '@mui/material';
import Image from 'next/image';
import btcIcon from '../public/icons/btc.png'; 
import ethIcon from '../public/icons/eth.png'; 
import dotIcon from '../public/icons/dot.png';

const WelcomeSection: React.FC = () => {
  return (
    <Box 
      sx={{ 
        color: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1000px',
        marginLeft: '40px '
      }}
    >
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h4" sx={{fontWeight:'bold'}} gutterBottom>
          Welcome to Newton!
        </Typography>
        <Typography variant="h5" sx={{fontWeight:'bold', color:'#686B7D'}} gutterBottom>
          Crypto for Canadians
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#2DE1B9', 
            width: '200px',
            color: 'Black', 
            fontWeight: 'bold',
            marginTop: '25px',
            marginBottom: '20px',
            borderRadius: '30px',
            padding: '10px 20px'
          }}
        >
          SIGN UP
        </Button>
    </Box>

    {/* Right side - Crypto cards */}
    <Stack direction="row" spacing={2}>
        <Box 
          sx={{ 
            backgroundColor: '#27293d', 
            padding: '10px 20px', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '150px',
            width: '120px'
          }}
        >
          <Image src={btcIcon} alt="Bitcoin" style={{ width: '34px', height: '34px', marginBottom: '25px' }} />
          <Typography variant="body1">BTC</Typography>
          <Typography 
            variant="body2" 
            sx={{ color: '#2DE1B9', fontWeight: 'bold', paddingTop: '10px' }}
          >
            ▲ 123.45%
          </Typography>
        </Box>
        <Box 
          sx={{ 
            backgroundColor: '#27293d', 
            padding: '10px 20px', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '150px',
            width: '120px'
          }}
        >
          <Image src={ethIcon} alt="Ethereum" style={{ width: '34px', height: '34px', marginBottom: '25px' }} />
          <Typography variant="body1">ETH</Typography>
          <Typography 
            variant="body2" 
            sx={{ color: '#FF3D00', fontWeight: 'bold', paddingTop: '10px' }}
          >
            ▼ 2.76%
          </Typography>
        </Box>
        <Box 
          sx={{ 
            backgroundColor: '#27293d', 
            padding: '10px 20px', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '150px',
            width: '120px'
          }}
        >
          <Image src={dotIcon} alt="Polkadot" style={{ width: '34px', height: '34px', marginBottom: '25px' }} />
          <Typography variant="body1">DOT</Typography>
          <Typography 
            variant="body2" 
            sx={{ color: '#2DE1B9', fontWeight: 'bold', paddingTop: '10px' }}
          >
            ▲ 14.43%
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default WelcomeSection;
