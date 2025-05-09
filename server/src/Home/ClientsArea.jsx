import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const images = ['https://www.zarla.com/images/nike-logo-2400x2400-20220504.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/apple-logo-2400x2400-20220512.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/zarla-chanel-combination-logo-2400x2400-20240701.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/facebook-logo-2400x2400-20220518.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/wwf-logo-2400x2400-20220518.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/google-logo-2400x2400-20223105.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/ibm-logo-2400x2400-20220519-1.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/bmw-logo-2400x2400-20220519.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/mercedes-benz-logo-2400x2400-20220513-2.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/walmart-logo-2400x2400-20220513.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/visa-logo-2400x2400-20220513-1.png?crop=1:1,smart&width=150&dpr=2',
'https://www.zarla.com/images/ebay-logo-2400x2400-20223105.png?crop=1:1,smart&width=150&dpr=2'
];

export default function ClientsArea() {


  return (
    <Box className='container' sx={{ flexGrow: 1, p:{xs:5 , md:7 , lg:12} }}>
      <Grid display="flex" justifyContent="center" alignItems="center"
        container
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        {images.map((image, index) => (
          <Grid key={index}>
            <img
              src={image}
              style={{ width: '8rem', height: 'auto' }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
