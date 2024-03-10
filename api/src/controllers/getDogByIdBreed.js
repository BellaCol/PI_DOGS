const {Dog, Temperament}=require('../db')
const {temperamentsArrayConvert}=require('../utils.js')
const axios=require('axios')
require('dotenv').config();
const {API_KEY} = process.env;

async function getDogByIdBreed(req,res){

    try{
        const dogs=[]
        const idBreed=req.params.id
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        if(data){
            const dogAPI = data.filter(dog=>dog.id===Number(idBreed)); 
           
            if(dogAPI.length){ 
                dogs.push({
                
                        id:dogAPI[0].id,
                        name: dogAPI[0].name,
                        height: dogAPI[0].height.metric,
                        weight: dogAPI[0].weight.metric,
                        life_span: dogAPI[0].life_span,
                        temperament:dogAPI[0].temperament&&dogAPI[0].temperament.split(','),
                        urlImage: dogAPI[0].image.url,
                        origin:'API'
                    
                })
            }
        } 
        const dogDB = await Dog.findOne({
            where:{
                id:Number(idBreed)-1000
            },
            include:[{
                model: Temperament,
                through: {attributes:[]}
            }]
        })
        
        dogDB&&temperamentsArrayConvert(dogDB, dogs)
        
        if(dogs.length){
            res.status(200).json(dogs[0])
        }else{
            return res.status(404).json({message:"Id Breed not found"})
        }

    }catch(err){
       
        return res.status(500).send(`Error interno ${err.message}`)

    }
    
    
}

module.exports=getDogByIdBreed
