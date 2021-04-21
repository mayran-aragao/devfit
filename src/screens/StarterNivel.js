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
const LevelArea = styled.View`
    width:100%;
   
`;
const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    margin-bottom:30px;
`;
const NextButtonText = styled.Text`
    font-size:17px;
    color:#0072c0;
`;
const LevelText = styled.Text`
    color: ${props=>props.txcolor || '#000'}; 
`;
const BoldText = styled.Text`
    font-weight:bold;
`;



const Page = (props) => {

    let funnyPhrase = '...';
    switch(props.workoutDays.length){
        case 1:
            funnyPhrase = 'Só 1 dia não vai adiantar muito, mas...';
            break;
        case 2:
            funnyPhrase = '2 dias é pouco, mas quem sou eu para julgar?';
            break;
        case 3:
            funnyPhrase = '3 dias dá para começar';
            break;
        case 4:
            funnyPhrase = 'Ta começando a melhorar';
            break;
        case 5:
            funnyPhrase = 'Ai sim, 5 dias é bom demais, vamobora';
            break;
        case 6:
            funnyPhrase = '6 dias? Uau, ta dedicado mesmo';
            break;
        case 7:
            funnyPhrase = 'É serio mesmo? Você é um monstro, BIRRRRLLL';
            break;
    }

    const setMyLevel = (l)=>{
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }

    useEffect( ( ) => {
        if( props.navigation.state.params = "undefined" && props.level !== null ){
           props.navigation.setParams({level:props.level})
         }
    },[]);

    return(
        <Container>
            <HeaderText>{funnyPhrase}</HeaderText>
            <HeaderText><BoldText>Qual seu nível hoje?</BoldText></HeaderText>
            <LevelArea>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.level=='beginner'?'#a5e8bc':false} onPress={()=>setMyLevel('beginner')} style={{marginBottom:20}}><LevelText txcolor={props.level=='beginner'?'#FFF':false}>Iniciante / Um Frango</LevelText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.level=='intermediate'?'#a5e8bc':false} onPress={()=>setMyLevel('intermediate')}  style={{marginBottom:20}}><LevelText txcolor={props.level=='intermediate'?'#FFF':false}>Intermediario / Me viro bem</LevelText></DefaultButton>
                <DefaultButton  underlayColor="#BBB" bgcolor={props.level=='advanced'?'#a5e8bc':false} onPress={()=>setMyLevel('advanced')}  style={{marginBottom:20}}><LevelText txcolor={props.level=='advanced'?'#FFF':false}>Avançado / Rato de Academia</LevelText></DefaultButton>
            </LevelArea>
            
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.level ){
            alert("Você precisa selecionar uma opção!");
            return
        }
        navigation.navigate('StarterRecommendations');
    }

    return{
        headerShown:true,
        title:'',
        headerRight:()=><NextButton onPress={nextAction}><NextButtonText>Proximo</NextButtonText></NextButton>,
        
    }
}

const mapStateToProps = (state) => {
    return {
        level:state.userReducer.level,
        workoutDays:state.userReducer.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);