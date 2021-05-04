import React, { useState,useEffect} from 'react';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const BalloonArea = styled.View`
    width: 90%;
    padding:20px;
    background-color: #ededed;
    border-radius:10px;
    
`;
const BalloonTriangle = styled.View`
    width:0;
    height:0;
    border-left-color:transparent;
    border-left-width:15px;
    border-bottom-width:15px;
    border-bottom-color:#ededed;
    border-right-width:15px;
    border-right-color:transparent;
`;

const BalloonBigText = styled.Text`
    font-size: 15px;
    align-self:center;
    font-weight:bold;
`;
const ButtonText = styled.Text`

    color: #fff;
    font-weight:bold;
`
const BalloonText = styled.Text`
    font-size: 13px;
    align-self:center;
    margin-top:10px;
`

export default (props) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let thisDate = new Date(today.getFullYear(),props.selectedMonth, props.selectedDay);

    let thisYear = thisDate.getFullYear();
    let thisMonth = thisDate.getMonth() + 1;
    let thisDay = thisDate.getDate();
    thisMonth = (thisMonth<10)?'0'+thisMonth:thisMonth;
    thisDay = (thisDay<10)?'0'+thisDay:thisDay;
    let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

    let dayOff = false;
    let isToday = false;
    let isFuture = false;
    let isDone = false;

    if (!props.workoutDays.includes(thisDate.getDay())){
        dayOff =  true;
    }else if(thisDate.getTime()>today.getTime()){
        isFuture = true;
    }else {
        if(props.dailyProgress.includes(dFormated)){
            isDone = true;
        }else {
            isDone = false;
        }
    }

    if(thisDate.getTime() == today.getTime()){
        isToday = true;
    }

    const setDone = () => {
        props.addProgress(dFormated);
    }
    const setUnDone = () => {
        props.delProgress(dFormated);
    }
    const [timeLeft, setTimeLeft] = useState('');
    useEffect(()=>{
        const timerFunction = () => {
            let now = Date.now();
            let endToday = new Date();
            endToday.setHours(23);
            endToday.setMinutes(59);
            endToday.setSeconds(59);
            endToday= endToday.getTime();
            let diff = endToday - now;

            let h = Math.floor( diff / (1000 * 60 * 60));
            let m = Math.floor(( diff / (1000 * 60)) - (h*60));
            let s = Math.floor( ( diff / 1000) - (m*60)-( (h*60)*60)  );

            h = h<10?'0'+h:h;
            m = m<10?'0'+m:m;
            s = s<10?'0'+s:s;

            setTimeLeft(`${h}h ${m}m ${s}s`);
        }
        let timer = setInterval(timerFunction, 1000);
        timerFunction();

        return ()=>clearInterval(timer);
    },[])

    return(
        <>
            <BalloonTriangle></BalloonTriangle>
            <BalloonArea>
                {dayOff &&
                    <>
                    <BalloonBigText>Dia de Descanso!</BalloonBigText>
                    </>
                }
                {isFuture &&
                    <BalloonBigText>Data no futuro</BalloonBigText>
                }
                {!dayOff && !isFuture && isDone &&
                    <>
                    <BalloonBigText>Treino realizado</BalloonBigText>
                    <DefaultButton onPress={setUnDone} underlayColor="#191970" bgcolor= "#6A5ACD" style={{marginTop:20}}>
                        <ButtonText>DESMARCAR</ButtonText>
                    </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && !isToday &&
                    <>
                    <BalloonBigText>Você faltou ao treino</BalloonBigText>
                    <DefaultButton onPress={setDone} underlayColor="#191970" bgcolor= "#6A5ACD" style={{marginTop:20}}>
                        <ButtonText >MARCAR FEITO</ButtonText>
                    </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && isToday &&
                    <>
                    <BalloonBigText>Hoje é dia de treinar 💪🏽🏃🏽‍♂️</BalloonBigText>
                    <BalloonText>Você tem {timeLeft} para treinar</BalloonText>
                    <DefaultButton onPress={props.goToWorkout} underlayColor="#191970" bgcolor= "#6A5ACD" style={{marginTop:20}}>
                        <ButtonText>INICIAR TREINO</ButtonText>
                    </DefaultButton>
                    </>
                }
            </BalloonArea>
        </>
    );
}

