"use client"; 
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { coins } from '../assets/coins';
import coinImages from '../public/icons/';

interface MarketData {
  symbol: string;
  bid: number;
  ask: number;
  spot: number;
  change: number;
}

const MarketWebSocket: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // For Search Bar and USD Toggle dummy
  const [searchTerm, setSearchTerm] = useState('');
  const [showUSD, setShowUSD] = useState(false);
  
  useEffect(() => {
    // Load initial data from localStorage if available
    const storedData = localStorage.getItem('marketData');
    if (storedData) {
      setMarketData(JSON.parse(storedData));
    }

    const connectWebSocket = () => {
      const socket = new WebSocket('ws://localhost:8765/markets/ws');

      socket.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        const subscriptionMessage = JSON.stringify({ event: 'subscribe', channel: 'rates' });
        socket.send(subscriptionMessage);
      };

      socket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        // console.log(receivedData);

        if (receivedData.channel === "rates" && receivedData.event === "data") {
          const data = receivedData.data;
          setMarketData(prevData => {
            const existingItemIndex = prevData.findIndex(item => item.symbol === data.symbol);
            let updatedData;
            if (existingItemIndex > -1) {
              updatedData = [...prevData];
              updatedData[existingItemIndex] = { ...updatedData[existingItemIndex], ...data };
            } else {
              updatedData = [...prevData, data];
            }

            // Save updated data to localStorage
            localStorage.setItem('marketData', JSON.stringify(updatedData));

            return updatedData;
          });

          console.log('Market Data:', data);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event.reason);
        setIsConnected(false);
        // Attempt to reconnect after a delay
        setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
      };

      // Cleanup on component unmount
      return () => {
        socket.close();
      };
    };

    connectWebSocket(); // Initial connection
  }, []);

  return (
    <Box sx={{ p: 2,
      padding: '20px', 
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1800px',
      marginLeft: '40px '}}>
        
        {/* Search Bar and USD Toggle */}
        <Box sx={{ display: 'flexbox', justifyContent: 'row', marginBottom: '20px' }}>
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search coin"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#8789BF' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: '#2A2C4E',
            input: { color: '#8789BF' },
            width: '1000px',
            borderRadius: '20px',
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: 'transparent',  // Removes the border color
              },
              "&:hover fieldset": {
                borderColor: 'transparent',  // Removes the border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: 'transparent',  // Removes the border when focused
              },
            },
          }}
        />
         <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
          <InfoOutlinedIcon sx={{ color: '#7072B2', marginRight: '5px' }} />
          <Typography color="white" sx={{ marginRight: '10px' }}>
            Display USD pricing
          </Typography>
          <Switch
            checked={showUSD}
            onChange={() => setShowUSD(!showUSD)}
            color="primary"
          />
        </Box>
      </Box>

      {isConnected ? (
        marketData.length > 0 ? (
          <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#474A5C', borderBottom: '1px solid #5D6072' }}>
                    Coin
                    <IconButton size="small">
                      <FilterListIcon sx={{ color: '#474A5C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#474A5C', borderBottom: '1px solid #5D6072'  }}>
                    24h Change
                    <IconButton size="small">
                      <FilterListIcon sx={{ color: '#474A5C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#474A5C', borderBottom: '1px solid #5D6072'  }}>
                    Live Price
                    <IconButton size="small">
                      <FilterListIcon sx={{ color: '#474A5C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#474A5C', borderBottom: '1px solid #5D6072'  }}>
                    Sell Price
                    <IconButton size="small">
                      <FilterListIcon sx={{ color: '#474A5C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#474A5C', borderBottom: '1px solid #5D6072'  }}>
                    Buy Price
                    <IconButton size="small">
                      <FilterListIcon sx={{ color: '#474A5C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#474A5C', borderBottom: '1px solid #5D6072'  }}>
                    Watch
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {marketData.map((data, index) => {
                const fullName = data.symbol.split('_')[0].toLowerCase(); // Get base symbol
                const quoteSymbol = data.symbol.split('_')[1].toUpperCase(); // Get quote symbol
                const baseSymbol = coins[fullName as keyof typeof coins]; // Use type assertion to index into coins

                return (
                  <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#333' }, color: 'white' }}>
                    <TableCell sx={{ display: 'flex', alignItems: 'center', color: 'white', borderBottom: '1px solid #5D6072' }}>
                      <Image
                        src={coinImages[fullName as keyof typeof coinImages]}
                        alt={`${baseSymbol} logo`}
                        width={24}
                        height={24}
                        style={{ marginRight: 15 }}
                      />
                      <Box>
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                          {baseSymbol.toUpperCase()}
                        </Typography>
                        <Typography sx={{ color: '#8789BF', fontSize: '12px' }}>
                          {fullName.charAt(0).toUpperCase() + fullName.slice(1).toUpperCase()}/ {quoteSymbol} {/* Display base/quote symbol */}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: data.change > 0 ? '#2DE1B9' : 'red', borderBottom: '1px solid #5D6072' }}>
                      {data.change > 0 ? `+${data.change.toFixed(2)}%` : `${data.change.toFixed(2)}%`}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #5D6072' }}>
                      ${data.bid.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #5D6072' }}>
                      ${data.ask.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #5D6072' }}>
                      ${data.spot.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #5D6072' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'white' }}>⭐</button> {/* Add your watch functionality here */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography color="white">No market data available.</Typography>
        )
      ) : (
        <Typography color="white">Disconnected. Attempting to reconnect...</Typography>
      )}
    </Box>
  );
};

export default MarketWebSocket;
