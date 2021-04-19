import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import NextButton from '../components/NextButton';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    margin-top:50px;
    margin-left:30px;
    margin-right:30px;
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




const Page = (props) => {

    const nextAction = () => {
        if(!props.name){
            alert("Você precisa digitar um nome");
            return
        }

        props.navigation.navigate('StarterDias');
    }
    
    const handleChangeName = (t) => {
        props.setName(t);
        props.navigation.setParams({name:t});
    }
    let firstName = props.name.split(' ')[0];

    return(
        <Container>
            <HeaderText>Olá,<BoldText> {firstName} </BoldText>, tudo bem?</HeaderText>
            <HeaderText>Quais <BoldText>dias da semana</BoldText> você pretende treinar?</HeaderText>
            
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{


    return{
        headerShown:true,
        title:'',
        headerRight:()=><NextButton navigation={navigation}/>,
        headerRightContainerStyle:{
            marginRight:10
        }
    }
}

const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME',payload:{name}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);