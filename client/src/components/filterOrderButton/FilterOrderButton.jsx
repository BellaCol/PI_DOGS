import './filterOrderButton.css';


function FilterOrderButton({handlerFilter, handlerOrder, temperaments}){
    
    return(
    <div className='filterContainer'> 
        <div className='filter' >

            
            <select id='orderBy'>
                <option value ='breed'>Raza</option>
                <option value ='weight'>Peso</option>
            </select>
        
            <select id='orderDirection'>
                <option value ='asc'>Ascendente</option>
                <option value ='desc'>Descendente</option>
            </select>
            <button className='filter' onClick={handlerOrder}>Ordenar</button>
        </div>
    <div className='filter'>
    
        <select id="temperamentsFilter">
            <option value ='allTemperaments'>Todos</option>
            {temperaments.map((tempera) => (
                <option key={tempera} value={tempera}>{tempera}</option>
            ))}
        </select>
       
        <select id='originFilter'>
            <option value ='allOrigin'>Todos</option>
            <option value ='db'>Base de Datos</option>
            <option value ='api'>API Dogs</option>
        </select>
        <button className='filter' onClick={handlerFilter}>Filtrar</button>
    </div>
    </div>);
    
}
    
    export default FilterOrderButton
    