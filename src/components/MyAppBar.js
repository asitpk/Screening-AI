import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import { useRouter } from 'next/router';

function DrawerAppBar(props) {
    const { children, onScroll } = props;
    const router = useRouter()
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Stack
                        onClick={() => {
                            router.reload();
                        }}
                        direction={'row'}
                         alignItems={'center'} 
                         flexGrow={1}
                         >
                        <img src={'/images/logo-new-dark1.png'} width={"auto"} height={40} />
                    </Stack>
                    <Box>
                        <Button
                            color={'warning'}
                            variant={'outlined'}
                            onClick={onScroll}
                            sx={{
                                borderRadius: 20,
                                height: 35,
                                border: "1.5px solid #EA7A2F",
                                px: { xs: 1, sm: 4 },
                                ml: 3,
                                '&:hover': {
                                    backgroundColor: '#EA7A2F',
                                    color: 'white',
                                },
                            }}
                        >
                            Try Now
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;