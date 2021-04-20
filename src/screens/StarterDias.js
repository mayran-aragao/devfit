import React,{useEffect} from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import NextButton from '../components/NextButton';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    margin-top:50px;
    margin-left:30px;
    margin-right:30px;
`;
const DaysArea = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
`;
const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    margin-bottom:30px;
`;
const BoldText = styled.Text`
    font-weight:bold;
`;
const NextButtonText = styled.Text`
    font-size:17px;
    color:#0072c0;
`;
const DaysText = styled.Text`
    color: ${props=>props.txcolor || '#000'}; 
`;




const Page = (props) => {

    const toggleDay = (d) => {
        let newWorkoutDays = [...props.workoutDays];

        if(!props.workoutDays.includes(d)){
            newWorkoutDays.push(d);
        }else{
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
        }

        props.setWorkoutDays(newWorkoutDays);
        props.navigation.setParams({workoutDays:newWorkoutDays});
    }
    
    useEffect( ( ) => {
        if( props.navigation.state.params = "undefined" && props.workoutDays !== null ){
           props.navigation.setParams({workoutDays:props.workoutDays})
         }
    },[]);

    let firstName = props.name.split(' ')[0];

    return(
        <Container>
            <HeaderText>Olá,<BoldText> {firstName} </BoldText>, tudo bem?</HeaderText>
            <HeaderText>Quais <BoldText>dias da semana</BoldText> você pretende treinar?</HeaderText>
            <DaysArea>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(0)?'#a5e8bc':false} onPress={()=>toggleDay(0)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(0)?'#FFF':false}>Domingo</DaysText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(1)?'#a5e8bc':false} onPress={()=>toggleDay(1)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(1)?'#FFF':false}>Segunda</DaysText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(2)?'#a5e8bc':false} onPress={()=>toggleDay(2)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(2)?'#FFF':false}>Terça</DaysText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(3)?'#a5e8bc':false} onPress={()=>toggleDay(3)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(3)?'#FFF':false}>Quarta</DaysText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(4)?'#a5e8bc':false} onPress={()=>toggleDay(4)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(4)?'#FFF':false}>Quinta</DaysText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(5)?'#a5e8bc':false} onPress={()=>toggleDay(5)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(5)?'#FFF':false}>Sexta</DaysText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.workoutDays.includes(6)?'#a5e8bc':false} onPress={()=>toggleDay(6)} width="100px" style={{marginBottom:20}}><DaysText txcolor={props.workoutDays.includes(6)?'#FFF':false}>Sabado</DaysText></DefaultButton>
            </DaysArea>
            
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.workoutDays.length ){
            alert("Você precisa treinar pelo menos 1 dia!");
            return
        }
        navigation.navigate('StarterNivel');
    }

    return{
        headerShown:true,
        title:'',
        headerRight:()=><NextButton onPress={nextAction}><NextButtonText>Proximo</NextButtonText></NextButton>,
        
    }
}

const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name,
        workoutDays:state.userReducer.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME',payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);