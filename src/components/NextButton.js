import styled from 'styled-components/native';
import React from 'react';


const Botao = styled.TouchableHighlight`
       margin-right:10px;
       
      
       
`;
const Texto = styled.Text`
    font-size:17px;
    color:#0072c0;
`;


const NextButton = (props) =>{


    const nextAction = () => {
        if(!props.name){
            alert("Você precisa digitar um nome");
        }
        props.navigation.navigate('StarterDias');
    }

    return(
        <Botao underlayColor="#fff" onPress={nextAction}>
            <Texto>
                Proximo
            </Texto>
        </Botao>
    );
}

export default NextButton;