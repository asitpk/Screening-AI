import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Grid,
    InputAdornment,
    Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GlobalBg from "../src/components/GlobalBg";
import MyAppBar from "../src/components/MyAppBar";
import PropTypes from "prop-types";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from "axios";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EvaluationForm from "../src/page-component/homepage/EvaluationForm";
import { useSnackbar } from 'notistack';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const steps = [
    'Create job board for vacant position',
    'Receive / add candidate resumes',
    'Trigger HrGPT led resume screening',
    'Conduct HrGPT led initial interviews',
    'Review shortlists on HrGPT dashboard',
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'white',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'white',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: 'white',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: 'white',
    }),
    [theme.breakpoints.down('sm')]: {
        width: 30,
        height: 30,
    }

}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            <Typography sx={{ color: 'primary.main', mt: 0.3 }} align={'center'}>
                {String(props.icon)}
            </Typography>
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const isValidEmail = (email) => {

    return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
};

export default function Home() {
    const [open, setOpen] = useState(false);
    const [timer, setTimer] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [resetClicked, setResetClicked] = useState(0);
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailLoading1, setEmailLoading1] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const [sentEmail2, setSentEmail2] = useState(false);

    const handleStepChange = (step) => {
        setTimeout(() => {
            setActiveStep(step);
        }, 2000);
    };
    const refScroll = useRef(null);

    const validateEmail = () => {
        if (email === undefined || !email || email.length === 0 || email.trim() == '') {
            // setEamilError('Please enter your Email');
            enqueueSnackbar('Please enter your email', {
                variant: 'warning',
            });
            return false;
        }
        else {
            if (isValidEmail(email.trim())) {
                // setEamilError('');
                return true;

            } else {
                enqueueSnackbar('Please enter a valid email', {
                    variant: 'warning',
                });
                return false;
            }
        }
    };

    const validateEmail2 = () => {
        if (email2 === undefined || !email2 || email2.length === 0 || email2.trim() == '') {
            // setEamilError('Please enter your Email');
            enqueueSnackbar('Please enter your Email', {
                variant: 'warning',
            });
            return false;
        }
        else {
            if (isValidEmail(email2.trim())) {
                // setEamilError('');
                return true;

            } else {
                enqueueSnackbar('Please enter a valid email', {
                    variant: 'warning',
                });
                return false;
            }
        }
    };

    const handleGetAccess = () => {
        if (
            validateEmail()
        ) {
            setEmailLoading(true);
            let data = {
                "email": email.trim()
            };
            axios.post(
                'https://188d-49-206-121-157.ngrok-free.app/email',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    setEmailLoading(false);
                    enqueueSnackbar('Successful, Thank you for your time.', {
                        variant: "success",
                    });
                    setSentEmail(true);
                })
                .catch(error => {
                    console.log("erroe", error)
                    setEmailLoading(false);
                    enqueueSnackbar(
                        error.response.status === 406 ? "Please enter a valid email" : "Try Again!",
                        { variant: "error" }
                    );
                });
        }
    };

    const handleGetAccess2 = () => {
        if (
            validateEmail2()
        ) {
            setEmailLoading1(true);
            let data = {
                "email": email2.trim()
            };
            axios.post(
                'https://188d-49-206-121-157.ngrok-free.app/email',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    setEmailLoading1(false);
                    enqueueSnackbar('Successful, Thank you for your time.', {
                        variant: "success",
                    });
                    setSentEmail2(true);
                })
                .catch(error => {
                    setEmailLoading1(false);
                    enqueueSnackbar(
                        error.response.status === 406 ? "Please enter a valid email" : "Try Again!",
                        { variant: "error" }
                    );
                });
        }
    };

    const handleClickStarted = () => {
        setResetClicked((resetClicked) => {
            return resetClicked + 1;
        })
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onScrollDiv = () => {
        if (refScroll && refScroll.current /* + other conditions */) {
            refScroll.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

   // console.log('Timer-->', timer);
    useEffect(() => {
        setTimeout(() => {
            setTimer(timer + 1);
        }, 4000);
    }, [timer]);

    return (
        <Stack width={'100vw'}>
            <GlobalBg />
            <Stack width={'100vw'} height={'100vh'} mt={'-100vh'}>
                <MyAppBar onScroll={onScrollDiv} />
                <Stack color={'white'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'80%'}>
                    <Typography variant={'h3'} mt={5} align={'center'} sx={{ lineHeight: 1.4, zIndex: 100, fontSize: { xs: 29, sm: 45 } }}>
                        {"Goodbye Guesswork."}
                        <br />
                        {'Evaluate Confidently.'}
                    </Typography>
                    <Typography mt={4} align={'center'} sx={{ lineHeight: 1.3, zIndex: 100, }}>
                        {'HrGPT\'s Generative AI technology enables effortless, intelligent and unbiased '}  <br />
                        {'evaluation of candidate for specific roles in just a matter of minutes.'}
                    </Typography>
                    {sentEmail &&
                        <Typography mt={4} align={'center'} sx={{ lineHeight: 1.3, zIndex: 100, color: "#EA7A2F" }}>
                            {/* We have sent email to <span>{email}.</span>  <br />
                            We will notify you for future announcements. */}
                            Thank you for your interest in HrGPT. <br />
                            We will notify you for future announcements.
                        </Typography>
                    }
                    <Box display={'flex'} alignItems={'center'} mt={5} mb={3} justifyContent={'center'}>
                        <TextField
                            sx={{ borderRadius: 20, bgcolor: '#1f284f', width: { xs: '90%', sm: 550 } }}
                            placeholder={'Enter your email'}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            size={'small'}
                                            onClick={handleGetAccess}
                                            color={'warning'}
                                            variant={'outlined'}
                                            sx={{
                                                borderRadius: 20,
                                                height: 40,
                                                px: 4,
                                                ml: 3,
                                                // bgcolor:"#ff9249",
                                                '&:hover': {
                                                    backgroundColor: '#EA7A2F',
                                                    color: 'white',
                                                },

                                            }}>
                                            {emailLoading ? <CircularProgress
                                                size={22}
                                            /> : ' Get Access'}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Button
                        color={'warning'}
                        variant={'outlined'}
                        onClick={onScrollDiv}
                        sx={{
                            borderRadius: 20,
                            height: 40,
                            border: "1.5px solid #EA7A2F",
                            px: 4,
                            mb: 2,
                            '&:hover': {
                                backgroundColor: '#EA7A2F',
                                color: 'white',
                            },
                        }}
                    >
                        Try Now
                    </Button>
                    <img onClick={onScrollDiv} src={'/images/scroll-now.gif'} width={60} height={'auto'} />
                </Stack>
            </Stack>
            <Stack width={'100vw'} minHeight={'100vh'} bgcolor={'primary.main'} ref={refScroll}>
                <Grid container sx={{ zIndex: 100, width: '100%' }} alignItems={'center'} minHeight={'100vh'}>
                    <Grid item xs={12} sm={6}>
                        <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} p={5} zIndex={9999}>
                            <Box width={{ xs: '98vw', sm: '100%' }} mt={{ xs: 5, sm: 0 }}>
                                <AutoPlaySwipeableViews
                                    axis={'x'}
                                    index={activeStep}
                                    onChangeIndex={handleStepChange}
                                >
                                    <Typography variant={'h3'} sx={{ color: 'white', lineHeight: 1.4, fontSize: { xs: 24, sm: 39 } }} align={'center'}>
                                        {'Your Success depends'}<br />
                                        {'on the right talent.'}
                                    </Typography>
                                    <Typography variant={'h3'} sx={{ color: 'white', lineHeight: 1.4, fontSize: { xs: 24, sm: 39 } }} align={'center'}>
                                        {'Don\'t settle for'}<br />
                                        {'mediocre candidates.'}
                                    </Typography>
                                    <Typography variant={'h3'} sx={{ color: 'white', lineHeight: 1.4, fontSize: { xs: 24, sm: 39 } }} align={'center'}>
                                        {'Your reputation is on'}<br />
                                        {'the line. Choose wisely.'}
                                    </Typography>
                                </AutoPlaySwipeableViews>
                            </Box>
                            <Typography mt={3} align={'center'} sx={{ lineHeight: 1.3 }}>
                                {
                                    'Using HrGPT’s Generative AI, you can instantly and intelligently evaluate the candidate responses, even if you are not a subject matter expert. Imagine the leverage if your recruiters could use Generative AI at every step of the recruitment. Introducing HrGPT.'
                                }
                            </Typography>
                            <Box display={'flex'} alignItems={'center'} mt={5}>
                                <Button onClick={handleClickStarted} color={'warning'} variant={'outlined'}
                                    sx={{
                                        borderRadius: 20,
                                        height: 40,
                                        border: "1.5px solid #EA7A2F",
                                        px: 4,
                                        '&:hover': {
                                            backgroundColor: '#EA7A2F',
                                            color: 'white',
                                        },
                                    }}
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    Try Now
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack justifyContent={'center'} alignItems={'center'} p={{ xs: 2, sm: 6, md: 10 }} zIndex={9999}>
                            <Paper variant={'outlined'} sx={{ width: '100%', minHeight: { xs: 400, sm: 500 }, bgcolor: '#1f284f', zIndex: 999 }}>
                                <EvaluationForm open={open} setOpen={setOpen} resetClicked={resetClicked} />
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            <Stack
                width={'100vw'}
                minHeight={'100vh'}
                bgcolor={'primary.main'}
                justifyContent={'center'}
                color={'white'}
                alignItems={'center'}
                zIndex={100}
                p={{ xs: 2, sm: 2, md: 0 }}
            >
                <Typography variant={'h3'} mt={5} align={'center'} sx={{ lineHeight: 1.4, fontSize: { xs: 20, sm: 39 } }}>
                    {"Level up your recruitment using HrGpt API"}
                    <br />
                    {'It\'s much more than screening'}
                </Typography>
                <Typography mt={4} align={'center'} sx={{ lineHeight: 1.5 }}>
                    {'Screen Faster. Interview Intelligently. Recruit Smarter.'}
                </Typography>
                <Box sx={{ width: '80%', display: { xs: 'none', sm: 'block' } }} my={6}>
                    <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label} active>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>
                                    <Typography sx={{ color: 'white', mt: 3 }}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ width: '70%', display: { xs: 'block', sm: 'none' } }} my={1}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>
                                    <Typography sx={{ color: 'white', fontSize: 13 }}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {sentEmail2 &&
                    <Box display={'flex'} alignItems={'center'} mt={2}>

                        <Typography mt={4} align={'center'} sx={{ lineHeight: 1.3, zIndex: 100, color: "#EA7A2F" }}>
                            Thank you for your interest in HrGPT. <br />
                            We will notify you for future announcements.
                        </Typography>
                    </Box>
                }
                <Box display={'flex'} alignItems={'center'} mt={5}>
                    <TextField
                        sx={{
                            borderRadius: 20,
                            bgcolor: '#1f284f',
                            mb: { xs: 4, sm: 0 },
                            width: { xs: '100%', sm: 550 },
                        }}
                        placeholder={'Enter your email'}
                        value={email2}
                        onChange={(e) => {
                            setEmail2(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        size={'small'}
                                        onClick={handleGetAccess2}
                                        color={'warning'}
                                        variant={'outlined'}
                                        sx={{
                                            borderRadius: 20,
                                            height: 40,
                                            px: 4,
                                            ml: 3,
                                            //bgcolor:"#ff9249",
                                            '&:hover': {
                                                backgroundColor: '#EA7A2F',
                                                color: 'white',
                                            },
                                        }}>
                                        {emailLoading1 ? <CircularProgress
                                            size={22}
                                        /> : ' Get Access'}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Stack>
        </Stack>
    )
}