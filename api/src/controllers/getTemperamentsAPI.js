const axios=require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
async function getTemperamentsAPI(req,res){
    
    try{
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        if(!data){
           return res.status(404).json({error: 'Not Found'})
        }
       
        const temperamentSet= new Set()
        data.forEach(dog=> {
            dog.temperament&&dog.temperament.split(',').forEach((temp)=>{
            temperamentSet.add(temp.trim())
            })
        }); 

        const arrayTemperaments= Array.from(temperamentSet)
        return res.status(200).json(arrayTemperaments)

    }catch(err){
        return res.status(500).send(`Error interno ${err.message}`)
    }
}

module.exports=getTemperamentsAPI