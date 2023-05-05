import { Button, CircularProgress, Tooltip, IconButton, Link, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Refresh } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#fefefefe',
    },
    '& .MuiRating-iconHover': {
        color: '#ffffff',
    },
});

const JOB_CHARACTER_LIMIT = 100;

export default function EvaluationForm(props) {
    const { onClose, open, setOpen, resetClicked } = props;

    const labels = {
        0: 'Bad Answer',
        1: 'Poor Answer',
        2: 'Poor Answer',
        3: 'Average Answer',
        4: 'Average Answer',
        5: 'Good Answer',
        6: 'Good Answer',
        7: 'Good Answer',
        8: 'Excellent Answer',
        9: 'Excellent Answer',
        10: 'Excellent Answer',
    };


    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [step, setStep] = useState(1);
    const [questionStep, setQuestionStep] = useState(1);
    const [job, setJob] = useState('');
    const [question, setQuestion] = useState('What is Python');
    const [answer, setAnswer] = useState('Python is a high-level, interpreted programming language that was first released in 1991 by Guido van Rossum. It is designed to be easy to read and write, with a syntax that emphasizes code readability and simplicity. Python is widely used for a variety of purposes, including web development, data analysis, scientific computing, artificial intelligence, machine learning, and automation.');
    const [evaluateData, setEvaluateData] = useState(7);
    const [evaluationLoading, setEvaluationLoading] = useState(false);
    const [evaluationLoading1, setEvaluationLoading1] = useState(false);
    const [jobLoading, setJobLoading] = useState(false);
    const [showRating, setShowRating] = useState(true);


    const handleReset = () => {
        setOpen(true);
        setQuestion("");
        setAnswer("");
        setEvaluateData();
        setShowRating(true);
        setStep(1);
        setEvaluationLoading1(false);
    }

    useEffect(() => {
        if (resetClicked !== 0)
            handleReset();
    }, [resetClicked]);

    const handleStep1Change = () => {
        setJobLoading(true);
        let data = {
            "jobRole": job
        };
        axios.post(
            'https://f38b-49-206-123-165.ngrok-free.app/generate-question',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log("Question", response)
                setQuestion((response?.data ? response?.data.question : ""))
                setAnswer(" ")
                setOpen(true);
                setShowRating(false);
                setJobLoading(false);
                setStep(2);
            })
            .catch(error => {
                setJobLoading(false);
                console.log("error", error)
                enqueueSnackbar('Try Again', {
                    variant: 'error',
                });
            });
    }

    const handleAddQuestion = () => {
        setQuestionStep(2);
    }

    const handleAddAnswerAndEvaluate = () => {
        /**
         * Todo
         * Add api call for Evaluation
         */
        setEvaluationLoading(true);
        let data = {
            question: question,
            answer: answer
        };

        axios.post(
            'https://f38b-49-206-123-165.ngrok-free.app/evaluate-answer',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log("Evaluate", response)
                setEvaluateData((response?.data ? response?.data.rating : ""))
                setShowRating(true);
                setEvaluationLoading(false);
                setEvaluationLoading1(true);
            })
            .catch(error => {
                setEvaluationLoading(false);
                enqueueSnackbar('Try Again', {
                    variant: 'error',
                });
            });

    }
    return (
        <Stack sx={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            px: { xs: 1, sm: 4 },
            py: { xs: 2, sm: 4 }
        }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Typography sx={{ textTransform: 'uppercase' }}>
                    {step === 1 ? 'EVALUATE YOURSELF' : `TRY ONE QUESTION AT A TIME`}
                </Typography>
                {
                    !open &&
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleReset}
                        sx={{
                            color: (theme) => theme.palette.grey[300],
                            fontSize: 12
                        }}
                    >
                        Get Started
                    </Link>
                }
                {/* {
                    open &&
                    <IconButton
                        sx={{
                            color: (theme) => theme.palette.grey[300],
                        }}>
                        <Refresh color="inherit"
                            onClick={() => {
                                setOpen(false);
                                setQuestion("What is Python");
                                setAnswer("Python is a high-level, interpreted programming language that was first released in 1991 by Guido van Rossum. It is designed to be easy to read and write, with a syntax that emphasizes code readability and simplicity. Python is widely used for a variety of purposes, including web development, data analysis, scientific computing, artificial intelligence, machine learning, and automation.");
                                setEvaluateData(7);
                                setShowRating(true);
                            }} />
                    </IconButton>
                } */}
            </Box>

            {
                step === 1 && open ?
                    <Stack alignItems={'flex-end'} width={'100%'} mt={4}>
                        <TextField
                            variant={'outlined'}
                            size={'small'}
                            label={"Enter the Job that you want to apply for"}
                            fullWidth
                            value={job}
                            color={'secondary'}
                            onChange={(e) => {
                                let _value = e.target.value;
                                if (_value.length <= JOB_CHARACTER_LIMIT) {
                                    setJob(_value)
                                }
                            }}
                            focused
                        //placeholder={'Type Your Job'}
                        />

                        <Typography
                            align='right'
                            variant="caption"
                            sx={{ color: 'white', width: "100%" }}
                        >
                            {`${job?.length || 0}/${JOB_CHARACTER_LIMIT}`}
                        </Typography>
                        {
                            job.trim().length > 0 && !jobLoading &&
                            <Button
                                color={'secondary'}
                                variant={'contained'}
                                size={'small'}
                                sx={{
                                    width: 100,
                                    mt: 3
                                }}
                                onClick={handleStep1Change}
                            >
                                {jobLoading ? <CircularProgress
                                    size={24}
                                /> : 'Next'}
                            </Button>
                        }
                        {
                            jobLoading &&
                            <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} mt={4}>
                                <CircularProgress size={22} color={'secondary'} />
                                <Typography sx={{ mt: 2 }}>
                                    Please wait fetching...
                                </Typography>
                            </Stack>
                        }

                    </Stack>
                    :
                    <>
                        {
                            open &&
                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                                <Typography sx={{ textTransform: 'uppercase' }}>
                                    JOB : {job}
                                </Typography>

                                {/* <Link
                                        component="button"
                                        variant="body2"
                                        // underline="always"
                                        onClick={() => {
                                            setOpen(true);
                                            // setQuestion("");
                                            // setAnswer("");
                                            // setEvaluateData();
                                            setStep(1);
                                        }}
                                        sx={{
                                            left: 30,
                                            //top: 45,
                                            color: (theme) => theme.palette.grey[300],
                                        }}
                                    >
                                        <small>Back</small>
                                    </Link> */}
                                {
                                    open &&
                                    <Tooltip placement={'top'} title="Back to Job">
                                        <IconButton
                                            sx={{
                                                color: (theme) => theme.palette.grey[300],
                                            }}>
                                            <Refresh color="inherit"
                                                // onClick={() => {
                                                //     setOpen(false);
                                                //     setQuestion("What is Python");
                                                //     setAnswer("Python is a high-level, interpreted programming language that was first released in 1991 by Guido van Rossum. It is designed to be easy to read and write, with a syntax that emphasizes code readability and simplicity. Python is widely used for a variety of purposes, including web development, data analysis, scientific computing, artificial intelligence, machine learning, and automation.");
                                                //     setEvaluateData(7);
                                                //     setShowRating(true);
                                                // }} 
                                                onClick={handleReset}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </Box>
                        }
                        <Stack alignItems={'flex-end'} width={'100%'} mt={3} mb={2}>
                            {/* <Button
                                sx={{ color: 'white' }}
                                onClick={() => setQuestion('')}
                            >
                                Clear Text
                            </Button> */}
                            <TextField
                                variant={'outlined'}
                                size={'small'}
                                label={!open ? "Sample Question" : "Type Your Question"}
                                fullWidth
                                multiline
                                InputProps={{readOnly: !open}}
                                rows={3}
                                value={question}
                                color={'secondary'}
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                }}
                                focused
                            // placeholder={'Type Your Question'}
                            />

                            {/* <Button
                                sx={{ color: 'white' }}
                                onClick={() => setAnswer('')}
                            >
                                Clear Text
                            </Button> */}
                            <TextField
                                variant={'outlined'}
                                size={'small'}
                                label={!open ? "Answer" : "Type Your Answer"}
                                fullWidth
                                multiline
                                InputProps={{ readOnly: !open }}
                                rows={6}
                                value={answer}
                                color={'secondary'}
                                onChange={(e) => {
                                    setAnswer(e.target.value);
                                }}
                                sx={{ mt: 4 }}
                                focused
                            //placeholder={'Type Your Answer'}
                            />

                            {
                                // (((questionStep === 1 && question.trim().length > 0) || (questionStep === 2 && answer.trim().length > 0)) && !evaluationLoading) &&
                                (((question.trim().length > 0) && (answer.trim().length > 0)) && !evaluationLoading && open) &&
                                <Button
                                    color={'secondary'}
                                    variant={'contained'}
                                    size={'small'}
                                    sx={{
                                        width: 100,
                                        mt: 3
                                    }}
                                    onClick={() => {
                                        // if(questionStep === 1)
                                        //     handleAddQuestion();
                                        // else
                                        handleAddAnswerAndEvaluate();
                                    }}
                                >
                                    {evaluationLoading1 ? "Resubmit" : "Submit"}
                                </Button>
                            }
                            {
                                evaluationLoading &&
                                <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} mt={2}>
                                    <CircularProgress size={22} color={'secondary'} />
                                    <Typography sx={{ mt: 2 }}>
                                        Please wait evaluating...
                                    </Typography>
                                </Stack>
                            }

                        </Stack>
                    </>

            }


            {
                evaluateData && !isNaN(evaluateData) && evaluateData > 0 && evaluateData <= 10 && !evaluationLoading && showRating ?
                    <>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={2} width={'100%'}>
                            <Typography sx={{ fontSize: 15 }} component="legend">Evaluation Score : {evaluateData + "/" + "10"}</Typography>
                            <Typography sx={{ ml: 1, fontSize: 15 }}>{labels[evaluateData]}</Typography>
                        </Box>
                        <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
                            <StyledRating sx={{ mt: 1 }} name="read-only" size="large" value={evaluateData} max={10} readOnly />
                        </Stack>
                    </>
                    :
                    <>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={2} width={'100%'}>
                            <Typography sx={{ fontSize: 15 }} component="legend">Evaluation Score : {0 + "/" + "10"}</Typography>
                            <Typography sx={{ ml: 1, fontSize: 15 }}>{labels[evaluateData]}</Typography>
                        </Box>
                        <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
                            <StyledRating sx={{ mt: 1 }} size="large" name="read-only" value={0} max={10} readOnly />
                        </Stack>
                    </>

            }
        </Stack>
    )
}

EvaluationForm.propTypes = {
};