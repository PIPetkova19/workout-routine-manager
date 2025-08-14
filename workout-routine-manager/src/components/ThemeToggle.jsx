import { useState } from 'react';
import { Box, IconButton, useTheme as useMuiTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: 60,
        height: 30,
        borderRadius: 15,
        backgroundColor: mode === 'light' ? '#e0e0e0' : '#333333',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `2px solid ${mode === 'light' ? '#1976d2' : '#666666'}`,
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
      onClick={handleToggle}
    >
      {/* Sliding circle */}
      <Box
        sx={{
          position: 'absolute',
          top: 2,
          left: mode === 'light' ? 2 : 32,
          width: 22,
          height: 22,
          borderRadius: '50%',
          backgroundColor: mode === 'light' ? '#1976d2' : '#ffffff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 4px rgba(233, 16, 16, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {mode === 'light' ? (
          <LightMode 
            sx={{ 
              fontSize: 14, 
              color: '#ffffff',
              animation: isAnimating ? 'rotate 0.3s ease' : 'none',
            }} 
          />
        ) : (
          <DarkMode 
            sx={{ 
              fontSize: 14, 
              color: '#333333',
              animation: isAnimating ? 'rotate 0.3s ease' : 'none',
            }} 
          />
        )}
      </Box>
      
      {/* Background icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 8,
          transform: 'translateY(-50%)',
          opacity: mode === 'light' ? 0.3 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <LightMode sx={{ fontSize: 12, color: '#666666' }} />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: 8,
          transform: 'translateY(-50%)',
          opacity: mode === 'dark' ? 0.3 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <DarkMode sx={{ fontSize: 12, color: '#ffffff' }} />
      </Box>
    </Box>
  );
};

export default ThemeToggle; 