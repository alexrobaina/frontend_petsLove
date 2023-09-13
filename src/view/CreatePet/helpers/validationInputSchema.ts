import * as Yup from 'yup';

export const validationCreatePet = Yup.object().shape({
  name: Yup.string().strict().required('Como se llama la mascota?'),
  sex: Yup.string().required('Es macho o hembre?'),
  description: Yup.string().required('Es importante tener mas formación de la mascota'),
  category: Yup.string().required(
    'Por favor necesitamos saber si es perro, gato o exotico',
  ),
  birthday: Yup.date().required('¿Cual es la fecha estimada de nacimiento?'),
});
