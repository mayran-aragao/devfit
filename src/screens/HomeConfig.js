import React,{useState} from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Container = styled.SafeAreaView`
    flex:1;
    margin: 0 30px; 
`;
const Label = styled.Text`
    font-size:15px;
    font-weight:bold;
    margin-top:20px;
    margin-bottom:10px;
`;
const Input = styled.TextInput`
    border: 1px solid #ccc;
    width:100%;
    height: 50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;
const ListArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;
const DayItem = styled.TouchableHighlight`
    width:30px;
    height:30px;
    border-radius:5px;
    background-color:#eee;
    justify-content:center;
    align-items:center;
`;
const DayItemText = styled.Text``;

const LevelItem = styled.TouchableHighlight`
    background-color:#eee;
    height:30px;
    border-radius:5px;
    justify-content:center;
    align-items:center;
    padding: 0 15px;
`;
const LevelItemText = styled.Text``;

const Page = (props) => {
    const nextAction = () => {
        if(!props.name){
            alert("Você precisa digitar um nome");
            return
        }
    }

    return(
        <Container>
            <Label>Seu nome completo:</Label>
            <Input value={props.name} onChangeText={e=>props.setName(e)} onSubmitEditing={nextAction} />   

            <Label>Dias de treinamento:</Label>
            <ListArea>
                <DayItem style={props.workoutDays.includes(1)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem style={props.workoutDays.includes(2)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem style={props.workoutDays.includes(3)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem style={props.workoutDays.includes(4)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem style={props.workoutDays.includes(5)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem style={props.workoutDays.includes(6)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem style={props.workoutDays.includes(0)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>D</DayItemText>
                </DayItem>
            </ListArea>

            <Label>Seu nível:</Label>
            <ListArea>
                <LevelItem>
                    <LevelItemText>Iniciante</LevelItemText>
                </LevelItem>
                <LevelItem>
                    <LevelItemText>Intermediário</LevelItemText>
                </LevelItem>
                <LevelItem>
                    <LevelItemText>Avançado</LevelItemText>
                </LevelItem>
            </ListArea>      
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{
    
    return {
        headerShown:true,
        title:'Configurações',
        
    }
}


const mapStateToProps = (state) => {
    return {
       name:state.userReducer.name,
       workoutDays:state.userReducer.workoutDays,
       level:state.userReducer.level

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       setName:(name)=>dispatch({type:'SET_NAME',payload:{name}}),
       setWorkoutDays:(WorkoutDays)=>dispatch({type:'SET_WORKOUTDAYS',payload:{WorkoutDays}}),
       setLevel:(level)=>dispatch({type:'SET_LEVEL',payload:{level}}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);