import {Box, Stack} from "@mui/material";
import { keyframes } from '@mui/system';

const parent = keyframes`
    100% {
    transform: translateX( calc(100vw - 250px) );
  }
`;

const child = keyframes`
  100% {
    transform: translateY( calc(100vh - 250px) );
  }
`;
export default function GlobalBg() {

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            bgcolor: 'primary.main',
        }}>
            <Stack sx={{
                height: 250,
                width: 250,
                animation: `${parent} 20.6s linear infinite alternate`
            }}>
                <Stack width={250} height={250} sx={{
                    animation: `${child} 21.8s linear infinite alternate`
                }}>
                    <img src={'/images/round.svg'} width={250} height={250}/>
                </Stack>
            </Stack>
            <Box sx={{
                width: '100vw',
                mt: '-250px',
                height: '100vh',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <img src={'/images/image-left.png'} width={'30%'} style={{objectFit: 'contain', position: 'fixed', bottom: 0, left: 0}}/>
                <img src={'/images/line-right.png'} width={'30%'} style={{objectFit: 'contain', position: 'fixed', top: 0, right: 0}}/>
                <img src={'/images/star-large.svg'} width={80} height={80} style={{objectFit: 'contain', position: 'fixed', top: '10vh', right: '2vw'}}/>
                <img src={'/images/star-small.svg'} width={50} height={50} style={{objectFit: 'contain', position: 'fixed', top: '84vh', left: '50vw'}}/>
                <img src={'/images/star-small.svg'} width={50} height={50} style={{objectFit: 'contain', position: 'fixed', top: '35vh', left: '20vw'}}/>
                <img src={'/images/star-small.svg'} width={50} height={50} style={{objectFit: 'contain', position: 'fixed', top: '65vh', left: '20vw'}}/>
            </Box>
        </Box>
    )
}