

function convertToObject(string){
    const stringWithDot= string.replace(/,/g, '.');
    const regex = /(\d+(?:[.,]\d+)?)(?=\s|$)/g;
    const numberObject = stringWithDot.match(regex)
    //busca en el string todos los match numericos de 1 o mas digitos seteados por la expresión regular
    if(numberObject&&numberObject.length===2){
        const min=parseFloat(numberObject[0])
        const max=parseFloat(numberObject[1]) 
        return{min,max}
    }else if(numberObject&&numberObject.length===1){

        const min=parseFloat(numberObject[0])
        const max=parseFloat(numberObject[0]) 
        return{min,max}
    }

    return null

}

function temperamentsArrayConvert(dogDB, dogs){

    if(!Array.isArray(dogDB)) {//si dogDB es un solo dog, se trata como objeto
    
        const temperament= dogDB.Temperaments.map(obj=>obj.temperament)
        
        dogs.push({
            id:Number(dogDB.id)+1000,
            name: dogDB.name,
            height: dogDB.height,
            weight: dogDB.weight,
            life_span: dogDB.life_span,
            temperament:temperament,
            urlImage: dogDB.url,
            origin: 'DB'
        }) 
 
    }else {//si dogDB son varios dog, se tratan como array de objetos

        
        const dogDBWTemp = dogDB.map(object=>{
            const temperamentsDB=object.Temperaments.map(obj=>obj.temperament)
            return {
                id: Number(object.id)+1000,
                name: object.name.trim(),
                height: convertToObject(object.height),
                weight: convertToObject(object.weight),
                life_span: object.life_span,
                temperament: temperamentsDB,
                url: object.url,
                origin:'DB'
            }
        })        
        dogDBWTemp&&dogs.push(...dogDBWTemp)    
    }
}



module.exports={
    convertToObject,
    temperamentsArrayConvert
}

