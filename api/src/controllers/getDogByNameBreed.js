const {Dog, Temperament}=require('../db')
const {temperamentsArrayConvert, convertToObject}=require('../utils.js')
const axios=require('axios')
const {Op}=require('sequelize')
require('dotenv').config();
const {API_KEY} = process.env;

async function getDogByNameBreed(req,res){
    try{ 
        const dogs=[]
        const {nameBreed}=req.query
        if(!nameBreed)return res.status(400).json({error: "Missing 'nameBreed' query parameter"})
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${nameBreed}&api_key=${API_KEY}`)
        if(data){
            const dogsAPI = data.map(dog=> {
                return {
                        id:dog.id,
                        name: dog.name,
                        height: convertToObject(dog.height.metric),
                        weight: convertToObject(dog.weight.metric),
                        life_span: dog.life_span,
                        temperament:dog.temperament&&dog.temperament.split(','),
                        urlImage: dog.image.url,
                        origin:'API'
                    };
            });    
            dogs.push(...dogsAPI)
        }
        const dogDB = await Dog.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${nameBreed}%`
                }
            },
            include:[{
                    model: Temperament,
                    through:{attributes:[]},
            }],
            
        })
        dogDB&&temperamentsArrayConvert(dogDB, dogs)
      
        if(dogs.length){
            return res.status(200).json(dogs)
        }else {
            return res.status(404).json({message:"Breed not found"})
        }
    
    }catch(e){
        return res.status(500).json({error: e.message})
    }
}

module.exports=getDogByNameBreed
