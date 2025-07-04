import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
  {
    url: 'https://chennai.vit.ac.in/wp-content/uploads/2021/09/What-is-Electronics-Engineering-Difference-Between-Electrical-and-Electronics-Engineering.jpg',
    title: 'Electronics',
    width: '25%',
  },
  {
    url: 'https://jdelite.decoratingden.com/wp-content/uploads/sites/368/2023/11/jdeliteinteriors-does-interior-design-include-furniture-04-scaled.jpg',
    title: 'Furniture',
    width: '25%',
  },
  {
    url: 'https://www.hemswell-antiques.com/images/uploads/blog_images/c48297806d52d413ff70520b143a92492dd3c02b_bEu7.jpeg',
    title: 'Clothing',
    width: '25%',
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/5984f3d103596ea150c48006/1512166175752-1LSM80BFZA1E1RAM4671/gold.jpg',
    title: 'Jewellery',
    width: '25%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWY4FLVBY4YxFKNHXytgZ0nfT3TW6xlEII4Q&s',
    title: 'Tools',
    width: '25%',
  },
  {
    url: 'https://media.istockphoto.com/id/1212230930/photo/car-engine-parts.jpg?s=612x612&w=0&k=20&c=YCG4lzjxDYTFQQ-gOniW-r-Xl-th73hBOrcnvdiU274=',
    title: 'Spare Parts',
    width: '25%',
  },
  {
    url: 'https://www.teachearlyyears.com/images/uploads/article/Early_Years_toys.png',
    title: 'Toys',
    width: '25%',
  },
  {
    url: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3NlYXNvbmluZ3MuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=',
    title: 'Seasonal Items',
    width: '25%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function CatagoriesArea() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              fontSize={'2.5rem'}
              sx={(theme) => ({
                fontWeight: '900',
                position: 'relative',
                p: 4,
                pt: 2,
                pb: `calc(${theme.spacing(1)} + 6px)`,
              })}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}

