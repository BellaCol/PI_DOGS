import { ADD_ALL, FILTER, ORDER, GET_TEMPERAMENTS, GET_BREED, UPDATE} from "./actions"

const initialState={
    allCharacters:[],
    characters:[],
    temperaments:[]
}

const rootReducer= function(state=initialState, actions){
    switch (actions.type){
      
        case ADD_ALL:

            return { ...state, 
                allCharacters: actions.payload,
                characters: actions.payload
            } 
        case GET_TEMPERAMENTS:
            
            return { ...state, 
                temperaments: actions.payload,
                someTemperaments:actions.payload
            }
        case UPDATE:
            
            return { ...state, 
                characters: state.allCharacters,
            }
        
        case GET_BREED:
        
            return {...state,
                characters: actions.payload
            }
        case FILTER:
            const { origin, temperaments } = actions.payload;
            if(origin==='api'){
                if(temperaments==='allTemperaments'){
                    const copy1= state.allCharacters.filter((dog)=>dog.origin==='API')
                    
                    return{
                        ...state,
                        characters:copy1
                    }   
                }else{
                    const copy1= state.allCharacters.filter((dog)=>dog.origin==='API')
                    const copy2 = copy1.filter((dog) => (dog.temperament))
                    const copy3= copy2.filter((dog)=>dog.temperament.includes(temperaments)) 

                    return{
                        ...state,
                        characters:copy3
                    }  
                }
            }else if(origin==='db'){
                if(temperaments==='allTemperaments'){
                    const copy1= state.allCharacters.filter((dog)=>dog.origin==='DB')
                    if(!copy1.length){
                        window.alert('No existe el(los) registro(s) en la base de datos')
                        return{
                            ...state,
                            characters: state.allCharacters            
                        } 
                    }
                    return{
                        ...state,
                        characters:copy1
                    }  
                }else{
                    const copy1= state.allCharacters.filter((dog)=>dog.origin==='DB')
                    const copy2 = copy1.filter((dog) => (dog.temperament))
                    const copy3= copy2.filter((dog)=>dog.temperament.includes(temperaments)) 
                    if(!copy3.length){
                        window.alert('No existe el(los) registro(s) en la base de datos')
                        return{
                            ...state,
                            characters: state.allCharacters
                        } 
                    }
                    return{
                        ...state,
                        characters:copy3
                    } 
                }
            }else if(origin==='allOrigin'){
                if(temperaments==='allTemperaments'){
                    
                    return{
                        ...state,
                        characters:state.allCharacters
                    }   
                }else{
                    const copy1 = state.allCharacters.filter((dog) => (dog.temperament))
                    const copy2= copy1.filter((dog)=>dog.temperament.includes(temperaments)) 
                    return{
                        ...state,
                        characters:copy2
                    }  
                } 
            }
            return {...state}
        case ORDER:
            let copy1 = state.characters

            if(actions.payload[0]==='breed'&&actions.payload[1] === 'asc'){
                copy1.sort((a,b)=>{
                    return a.name.localeCompare(b.name);
                })
              
            }else if(actions.payload[0]==='breed'&&actions.payload[1] === 'desc'){
                copy1.sort((a,b)=>{
                    return b.name.localeCompare(a.name);
                })
               
            }else if(actions.payload[0]==='weight'&&actions.payload[1] === 'asc'){
                copy1.sort((a, b) => {
                    if (!a.weight) return 1; // Colocar a al final
                    if (!b.weight) return -1; // Colocar b al final
                    return parseInt(a.weight.max) - parseInt(b.weight.max);
                });

            }else if(actions.payload[0]==='weight'&&actions.payload[1] === 'desc'){
                copy1.sort((a,b)=>{
                    if (!a.weight) return -1; // Colocar a al final
                    if (!b.weight) return 1; // Colocar b al final
                    return parseInt(b.weight.max) - parseInt(a.weight.max);
                })
            }
                 
            return{
                ...state,
                characters: copy1,
            }

        default: return {...state}

    }
    
}


export default rootReducer;