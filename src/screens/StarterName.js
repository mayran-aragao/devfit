import React,{useEffect} from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';


import NextButton from '../components/NextButton';



const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    
    margin-left:30px;
    margin-right:30px;
`;
const HeaderText = styled.Text`
    font-size:22px;
    color:#333;
    margin-top:50px;
    margin-bottom:50px;
`;
const NextButtonText = styled.Text`
    font-size:17px;
    color:#0072c0;
`;
const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
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

    useEffect( ( ) => {
        if( props.navigation.state.params = "undefined" && props.name !== null ){
           props.navigation.setParams({name:props.name})
         }
    },[]);

    return(
        <Container>
            <HeaderText>Qual é seu nome?</HeaderText>
            <NameInput
                value={props.name}
                onChangeText={handleChangeName}
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{
    
    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.name ){
            alert("Você precisa digitar um nome");
            return
        }
        navigation.navigate('StarterDias');
    }
    return{
        headerShown:true,
        title:'',
        headerRight:()=><NextButton onPress={nextAction}><NextButtonText>Proximo</NextButtonText></NextButton>,
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