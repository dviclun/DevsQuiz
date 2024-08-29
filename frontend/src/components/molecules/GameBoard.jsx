import { useTheme } from '@emotion/react';
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GameEnded } from '../atoms/GameEnded';

export const GameBoard = ({questions, playingCounter, timeFinished}) => {
    const theme = useTheme();

    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [clickedAnswer, setClickedAnswer] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);

    useEffect(()=> {
        if(questions.length > 0) {
            setShuffledQuestions(shuffleArray([...questions]));
        }
    },[])

    useEffect(()=> {
        if(shuffledQuestions.length > 0){
            setSelectedQuestion(shuffledQuestions[currentIndex]);
        }
    },[shuffledQuestions, currentIndex])

    useEffect(()=> {
        if(selectedQuestion){
            setShuffledAnswers(shuffleArray([...selectedQuestion.answers]));
        }
    }, [selectedQuestion])

    const handleClickAnswer = (answer) => {
        setClickedAnswer(answer)
        if(selectedQuestion.correct === answer){
            setCorrectQuestions((prevQuestions)=>[...prevQuestions, selectedQuestion])
            setTimeout(()=> {
                setCurrentIndex(currentIndex + 1);
                setClickedAnswer('');
            }, [500])
        } else {
            setIncorrectQuestions((prevQuestions)=>[...prevQuestions, {...selectedQuestion, yourAnswer: answer}])
            setTimeout(()=> {
                setCurrentIndex(currentIndex + 1);
                setClickedAnswer('');
            }, [500])
        }
    }

    const handleAddClass = (answer) => {
        if((clickedAnswer === answer) && (answer === selectedQuestion.correct)){
            return 'answerContainer correctAnswer';
        } else if((clickedAnswer === answer) && (answer !== selectedQuestion.correct)){
            return 'answerContainer incorrectAnswer';
        } else {
            return 'answerContainer answerContainerHover';
        }
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

  return (
    
        <Grid container minWidth={'100%'}>
            {
                (selectedQuestion && (currentIndex < questions.length) && !timeFinished) 
                ? <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5' sx={{color: theme.palette.mainBlue, textAlign: 'center'}}>{playingCounter}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid item display={'flex'} alignItems={'center'} justifyContent={'center'} className='answerContainer questionContainer'>
                        <Typography variant='h6' sx={{color: 'white', textAlign:'center', fontWeight: 'bold'}}>{selectedQuestion.question}</Typography>
                    </Grid>
                </Grid>
                {
                    shuffledAnswers.map((answer, index) => (
                        <Grid item xs={6} key={index}>
                            <Grid item onClick={(clickedAnswer === '')?()=>handleClickAnswer(answer):()=>{}} display={'flex'} alignItems={'center'} justifyContent={'center'} className={`${handleAddClass(answer)}`}>
                                <Typography sx={{color: 'white', textAlign:'center'}}>{answer}</Typography>
                            </Grid>
                        </Grid>
                    ))
                }
                </Grid>
                : (timeFinished)
                    ? <GameEnded correctQuestions={correctQuestions} incorrectQuestions={incorrectQuestions} text={'¡El tiempo ha finalizado!'}/>
                    : <GameEnded correctQuestions={correctQuestions} incorrectQuestions={incorrectQuestions} text={'¡Enhorabuena! Has respondido todas las preguntas disponibles de esta categoría'}/>
                    
            }
    </Grid>
    
  )
}
