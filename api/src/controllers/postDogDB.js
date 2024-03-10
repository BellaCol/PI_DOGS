const {Dog, Temperament}=require('../db')
const axios=require('axios')
require('dotenv').config();
const {API_KEY} = process.env;

async function postDogDB(req, res){
    try{
        const{name,heightMax, heightMin,weightMax, weightMin,url, life_span, temperament}=req.body
        
        if(!name || ! heightMax || !heightMin || ! weightMax || !weightMin||! url ||! life_span ||! temperament ){
           return res.status(400).send('Missing data')
        }else{
            const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
        
            if(data.length){
            
                return res.status(409).json({message:'Alredy Exist'})
            }
            const [dog, created]= await Dog.findOrCreate({
                where:{name},
                defaults:{
                    name,
                    
                    weight:`${weightMin} - ${weightMax}`,
                    height:`${heightMin} - ${heightMax}`,
                    url, 
                    life_span,
                    
                }      
            })

            const temperaments = temperament.map(async (temp) => {
                const [temperament] = await Temperament.findOrCreate({
                  where: { temperament: temp }
                });
                return temperament;
            });

            const temFoundOrCreated= await Promise.all(temperaments)
            await dog.addTemperament(temFoundOrCreated);
          
            
            if(created){
                const dogs = await Dog.findAll({
                  include:[{
                    model: Temperament,
                    through: {attributes:[]}
                  }]
                })
                return res.status(201).json(dogs)
            }else{
                return res.status(409).json({message:'Alredy Exist'})
            }
        }
    }catch(e){
        
        return res.status(500).json({error: e.message})
    }

}

module.exports=postDogDB