const initialState = {
    name:'',
    level:'', // beginner ,intermediate, advanced
    workoutDays:[], // 0-6
    myWorkouts:[],
    lastWorkout:'', //ID
    dailyProgress:['2021-04-16','2021-04-15']
};

export default (state = initialState, action) => {

    switch(action.type){
        case 'SET_NAME':
            return {...state, name:action.payload.name};
        break;
        case 'SET_WORKOUTDAYS':
            return{...state, workoutDays:action.payload.workoutDays}
            break;
    }

    return state;
}