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
    const nameAction = () => {
        if(!props.name){
            alert('Você precisa digitar um nome!')
        }
    }
    const nextAction = (d) => {
        let newWorkoutDays = [...props.workoutDays];
        if(newWorkoutDays.includes(d)) {
            
            if(newWorkoutDays.length == 1) {
                alert('Você precisa treinar pelo menos 1 dia.');
                return;
            }
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
            
        }else {
            newWorkoutDays.push(d);
        }
        props.setWorkoutDays(newWorkoutDays);
        console.log({newWorkoutDays});
    }

    return(
        <Container>
            <Label>Seu nome completo:</Label>
            <Input value={props.name} onChangeText={e=>props.setName(e)} onSubmitEditing={nameAction} />   

            <Label>Dias de treinamento:</Label>
            <ListArea>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(1)}  style={props.workoutDays.includes(1)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(2)} style={props.workoutDays.includes(2)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(3)} style={props.workoutDays.includes(3)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(4)} style={props.workoutDays.includes(4)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(5)} style={props.workoutDays.includes(5)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(6)} style={props.workoutDays.includes(6)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem underlayColor="transparent" onPress={()=>nextAction(0)} style={props.workoutDays.includes(0)?{backgroundColor:'#6A5ACD'}:{}}>
                    <DayItemText>D</DayItemText>
                </DayItem>
            </ListArea>

            <Label>Seu nível:</Label>
            <ListArea>
                <LevelItem onPress={()=>props.setLevel('beginner')} underlayColor="transparent" style={props.level=='beginner'?{backgroundColor:'#6A5ACD'}:{}}>
                    <LevelItemText>Iniciante</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('intermediate')} underlayColor="transparent" style={props.level=='intermediate'?{backgroundColor:'#6A5ACD'}:{}}>
                    <LevelItemText>Intermediário</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('advanced')} underlayColor="transparent" style={props.level=='advanced'?{backgroundColor:'#6A5ACD'}:{}}>
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
       setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS',payload:{workoutDays}}),
       setLevel:(level)=>dispatch({type:'SET_LEVEL',payload:{level}}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);