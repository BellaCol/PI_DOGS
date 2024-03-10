
const validation = function (form){

    const errors = {};
  
  
    if (!form.name) {
      errors.name = 'El nombre de la raza es requerido';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      errors.name = 'El nombre de la raza solo puede contener letras y espacios';
    }
    
    if (!form.life_span) {
      errors.life_span = 'La vida promedio es requerida';
    }

    if (!form.heightMax ) {
      errors.heightMax = 'La altura máxima es requerida';
    }
    if (!form.heightMin ) {
      errors.heightMin = 'La altura mínima es requerida';
    }
    if (parseFloat(form.heightMax) < parseFloat(form.heightMin) ) {
      errors.heightMax = 'La altura máxima debe ser mayor que la altura mínima';
    }
    
    if (!form.weightMax ) {
      errors.weightMax = 'El peso máximo es requerido';
    }
    if (!form.weightMin ) {
      errors.weightMin = 'El peso mínimo es requerido';
    }
    if (parseFloat(form.weightMax) < parseFloat(form.weightMin) ) {
      errors.weightMax = 'El peso máximo debe ser mayor que el peso mínimo';
    }

    if (!form.temperament.length ) {
      errors.temperament = 'Seleccione al menos un temperamento y varios con tecla ctrl';
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(form.url)) {
      errors.urlImage = 'Ingrese una URL válida para la imagen';
    }
  
    return errors;
  };

  export default validation