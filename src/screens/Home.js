import React,{useState} from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDaysStatus from '../components/HomeDaysStatus';

const Legend = styled.View`
    width:90%;
    align-items:flex-start;
    margin-top:30px;
    margin-left:10px;
`;
const LegendText = styled.Text`
    color:#555;
`;
const LegendItem = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:5px;
`;
const LegendBox = styled.View`
    width:15px;
    height:15px;
    border-radius:8px;
    background-color:#ccc;
    margin-right:5px;
`;

const Container = styled.SafeAreaView`
    align-items:center;
`;


const Page = (props) => {
    let today = new Date();

    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedDay , setSelectedDay] = useState(today.getDate());

    return(
        <Container>
           <HomeMonthScroll
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
           />
           <HomeDaysScroll 
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}

                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}
           />
           <HomeDaysStatus />

            <LegendText>Mês: {selectedMonth+1}</LegendText>
            <LegendText>Dia: {selectedDay}</LegendText>

            <Legend>
                <LegendText>Legenda:</LegendText>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#B5EEFF'}}></LegendBox>
                    <LegendText>Hoje</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#b5ffb8'}}></LegendBox>
                    <LegendText>Treino feito</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#ffb5b5'}}></LegendBox>
                    <LegendText>Treino perdido</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#A9A9A9'}}></LegendBox>
                    <LegendText>Dia futuro</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#000',opacity:0.2}}></LegendBox>
                    <LegendText>Dia de descanso</LegendText>
                </LegendItem>
            </Legend>

        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{
    const ConfigButtonArea = styled.TouchableHighlight`
        width:30px;
        height:30px;
        justify-content:center;
        align-items:center;
    `;
    const ConfigButtonImage = styled.Image`
        width:25px;
        height:25px;
    `;
    
    const ConfigButton = () => {
        const btnAction = () => {
            navigation.navigate('HomeConfig');
        }
        return(
            <ConfigButtonArea onPress={btnAction}>
                <ConfigButtonImage source={require('../assets/config.png')}/>
            </ConfigButtonArea>
        );
    }
    return{
        headerShown:true,
        title:'Seu progresso diario',
        headerRight:() => <ConfigButton/>,
        headerRightContainerStyle:{
            marginRight:10
       }
    }
}


const mapStateToProps = (state) => {
    return {
        dailyProgress:state.userReducer.dailyProgress,
        workoutDays:state.userReducer.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);