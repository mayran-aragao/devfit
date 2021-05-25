import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color:#e5e5e5;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:center;
    padding:30px;
`;
export const BoxCard = styled.View`
    width:46%;
    height:150px;
    padding:20px;
    margin-top:50px;
    border-radius:10px;
    align-items:center;
    justify-content:center;
    background-color:${props=>props.color};
    
`;
export const Number = styled.Text`
    color:#fff;
    font-size:22px;
`;
export const Texto = styled.Text`
    font-size:13px;
    flex-wrap:wrap;
    color:#FFF;
    text-align:center;
`;