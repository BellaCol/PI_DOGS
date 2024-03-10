const axios=require('axios')
const {convertToObject, temperamentsArrayConvert}=require('../utils.js')
require('dotenv').config();
const {API_KEY} = process.env;
const {Dog, Temperament}=require('../db')
async function getAllDogs(req,res){
    
    try{
        const dogs=[]
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        if(data){
            const dogsAPI = data.map(dog=> {

                return ({
                        
                        id:dog.id,
                        name: dog.name.trim(),
                        height: convertToObject(dog.height.metric),
                        weight: convertToObject(dog.weight.metric),
                        life_span: dog.life_span,
                        temperament:dog.temperament&&dog.temperament.split(',').map(item => item.trim()),
                        urlImage: dog.image.url,
                        origin: 'API'
                    })
            }); 
            dogs.push(...dogsAPI)   
        }
        const dogDB=await Dog.findAll({
            
            include:[{
                model: Temperament,
                through: {attributes:[]}
            }]
        })
        
       dogDB&&temperamentsArrayConvert(dogDB, dogs)
        
              
        if(dogs.length){
            return res.status(200).json(dogs)
        }else {
            return res.status(404).json({message:"Breeds not found"})
        }
    
    }catch(err){
       
        return res.status(500).send(`Error interno ${err.message}`)

    }

}

module.exports=getAllDogs
