import MarketWebSocket from './components/MarketWebSocket';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import WelcomeSection from './components/Welcome';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar /> 
      <Box sx={{ padding: '16px' }}>
        <WelcomeSection />
      </Box>
      <MarketWebSocket />
    </div>
  );
};

export default Home;