import React,{useState} from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Workout from '../components/Workout';
import { HeaderBackButton } from 'react-navigation-stack';
import { StackActions, NavigationActions} from 'react-navigation';

const Container = styled.SafeAreaView`
    flex:1;
    margin:20px;
     
`;
const WorkoutList = styled.FlatList`
    flex:1;
`;
const Title = styled.Text`
    margin-bottom: 10px;
`;


const Page = (props) => {   

    let lastWorkout = false;

    const goWorkout = (workout) => {
        props.navigation.navigate('WorkoutCheckList', {workout});
    } 

    if(props.lastWorkout){
        lastWorkout = props.myWorkouts.find(i=>i.id == props.lastWorkout);
    }

    return(
        <Container>
            {lastWorkout && 
                <>
                <Title>Seu ultimo treino foi:</Title>
                <Workout data={lastWorkout} />
                </>
            }
            

            <Title>Escolha um treino:</Title>
            <WorkoutList
                data= {props.myWorkouts}
                renderItem={({item})=>
                <Workout
                    data={item}
                    goAction={()=>goWorkout(item)}     
                />
                }
            />
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{
    
    const handleBackAction = () => {
        navigation.dispatch(StackActions.reset({
            index:0,
            actions: [
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }))
    }

    return {
        headerShown:true,
        title:'Escolha seu treino',
        headerLeft:()=> <HeaderBackButton onPress={handleBackAction}/>
    }
}


const mapStateToProps = (state) => {
    return {
       lastWorkout:state.userReducer.lastWorkout,
       myWorkouts:state.userReducer.myWorkouts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);