import axios from 'axios'
export const ADD_ALL = 'ADD_ALL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_BREED = 'GET_BREED'
export const FILTER= 'FILTER'
export const ORDER = 'ORDER'
export const UPDATE='UPDATE'

export const addAll =() => {
   return async(dispatch)=>{
      try{
         const {data} = await axios('/dogs')
         return dispatch({
            type:ADD_ALL,
            payload:data
         })
      }catch(error){
         console.log(error.message);
      }
   }
   
}  
export const getTemperaments =() => {
  
   return async(dispatch)=>{
      try {
         const response = await axios.get('/temperaments');
         response.data.sort((a,b)=>a.localeCompare(b))
         return dispatch({
            type:GET_TEMPERAMENTS,
            payload:response.data
         })
       } catch (error) {
         console.error('Error getting temperaments:', error.message);
       }
      
   } 
   
}
export const upDate =() => {
   return (dispatch)=>{
      return dispatch({
         type: UPDATE,
      })
        
   }
}

export const getBreed =(name) => {
   return async(dispatch)=>{
       try{
         const {data} = await axios(`/dogs/search?nameBreed=${name}`)
         return dispatch({
            type:GET_BREED,
            payload:{data,name}
         })
      }catch(error){
         console.log(error.message);
         error.response.status===404&&window.alert('No está registrada esa raza')
      }
   }
}
export function filterCards(origin, temperaments){
   return (dispatch)=>{
      return dispatch({
         type: FILTER,
         payload: {origin, temperaments} 
      })
        
   }
}
export function orderCards(order){
   
   return (dispatch)=>{
      return dispatch({
         type: ORDER,
         payload: order
      })
   }

}


