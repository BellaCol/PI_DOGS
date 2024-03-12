import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {addAll} from '../../redux/actions.js'
import './form.css';
import validation from './errors.js'


const Form = ({temperaments}) => {
  const dispatch= useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    life_span: '',
    heightMax: '',
    heightMin: '',
    weightMax: '',
    weightMin: '',
    temperament: [],
    url: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validation(formData));
  }, [formData.name, formData.life_span, formData.heightMax, formData.heightMin, formData.weightMax, formData.weightMin, formData.url, formData.temperament]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTemperamentsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData({
      ...formData,
      temperament: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.temperament.length===0){return;} 
    try {
      await axios.post('/dogs', formData);
      console.log('Form data sent successfully!');
      window.alert('Se agregó la raza de perro a la base de datos exitosamente!')
      setFormData({
        name: '',
        life_span: '',
        heightMax: '',
        heightMin: '',
        weightMax: '',
        weightMin: '',
        temperament: [],
        url: '',
      });
      
    } catch (error) {
      console.error('Error sending form data:', error);
      error.response.status===409&&window.alert('La Raza ya está registrada')
    }
    dispatch(addAll())
  };

  return (
    <div className="form-container">
      <form  onSubmit={handleSubmit}>
          
          <label htmlFor="name">Nombre de la raza:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error-message">{errors.name}</span>}
      
          <label htmlFor="life_span">Años de vida:</label>
          <input type="text" id="life_span" name="life_span" value={formData.life_span} onChange={handleChange} />
          {errors.life_span && <span className="error-message">{errors.life_span}</span>}

          <label htmlFor="heightMin">Altura mínima (cm):</label>
          <input type="text" id="heightMin" name="heightMin" value={formData.heightMin} onChange={handleChange} />
          {errors.heightMin && <span className="error-message">{errors.heightMin}</span>}

          <label htmlFor="heightMax">Altura máxima (cm):</label>
          <input type="text" id="heightMax" name="heightMax" value={formData.heightMax} onChange={handleChange} />
          {errors.heightMax && <span className="error-message">{errors.heightMax}</span>}
          
          <label htmlFor="weightMin">Peso mínimo (kg):</label>
          <input type="text" id="weightMin" name="weightMin" value={formData.weightMin} onChange={handleChange} />
          {errors.weightMin && <span className="error-message">{errors.weightMin}</span>}
          
          <label htmlFor="weightMax">Peso máximo (kg):</label>
          <input type="text" id="weightMax" name="weightMax" value={formData.weightMax} onChange={handleChange} />
          {errors.weightMax && <span className="error-message">{errors.weightMax}</span>}

          <label htmlFor="temperaments">Temperamentos:</label>
            <select id="temperaments" name="temperaments" multiple value={formData.temperament} onChange={handleTemperamentsChange}>
                {temperaments.map((tempera) => (
                    <option key={tempera} value={tempera}>{tempera}</option>
                ))}
            </select>
          {errors.temperament && <span className="error-message">{errors.temperament}</span>}

          <label htmlFor="url">URL de la imagen:</label>
          <input type="text" id="url" name="url" value={formData.url} onChange={handleChange} />
          {errors.urlImage && <span className="error-message">{errors.urlImage}</span>}
          <button className='buttonForm' type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
