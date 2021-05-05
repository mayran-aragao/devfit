import React,{useState} from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';
import ExerciseItemEdit from '../components/ExerciseItemEdit';

const Container = styled.SafeAreaView`
    flex:1;
    margin:20px;
`;
const NameInput = styled.TextInput`
    border:1px solid #ccc;
    width: 100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;
const ButtonText = styled.Text`
    color:#FFF;
`;

const ExercisesArea = styled.View`
    flex:1;
    margin-top:20px;
    padding-top:20px;
    border-top-width:1px;
    border-top-color:#CCC;
`;

const ExercisesList = styled.FlatList`
    flex:1;
    padding-top:20px;
`;

const Page = (props) => {
    let workout = (props.navigation.state.params &&
                props.navigation.state.params.workout)?
                props.navigation.state.params.workout:false;
    const [id,setId] = useState(workout?workout.id:'');
    const [name,setName] = useState(workout?workout.name:'');
    const [exercises,setExercises] = useState(workout?workout.exercises:[]);
    return(
        <Container>
            <NameInput
                value={name}
                onChangeText={e=>setName(e)}
                placeholder = "Digite o nome do treino"
            />
            <ExercisesArea>
                <DefaultButton bgcolor="#6A5ACD">
                    <ButtonText>Adicionar Exercicio</ButtonText>
                </DefaultButton>

                <ExercisesList 
                    data={exercises}
                    renderItem={(item)=>
                        <ExerciseItemEdit data={item} />
                    }
                    keyExtractor={item=>item.name}
                />
            </ExercisesArea>
        </Container>
    );
}

Page.navigationOptions = ({navigation}) =>{
    let isEdit = (navigation.state.params && navigation.state.params.workout)?true:false;

    const SaveArea = styled.TouchableHighlight`
            width:30px;
            height:30px;
            justify-content:center;
            align-items:center;
        `;
    const SaveImage = styled.Image`
            width:25px;
            height:25px;
        `;

    const SaveWorkoutButton = ()=> {
        return(
            <SaveArea>
                <SaveImage source={require('../assets/check-black.png')} />
            </SaveArea>

        );
    }

    return {
        headerShown:true,
        title:isEdit?'Editar treino':'Adicionar treino',
        headerRight:()=><SaveWorkoutButton/>,
        headerRightContainerStyle:{
            marginRight:10
        }

    }
}


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);