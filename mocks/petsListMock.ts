const petsListMock = {
  totalPets: 5,
  pets: [
    {
      name: 'Manchas',
      city: 'Buenos Aires',
      descripcion:
        'Es un perro tranquilo con muchas ganas de tener un hogar, es perfecto para jugar y estar con niños es respetuoso y le encanta salir al parque a jugar con otros perros',
      state: 'adopted', // needHome
      category: 'dog', // cat, bird, exotic.
      birthday: '12/04/2012',
      update: '12/02/2020',
      gender: 'female', // male
      country: 'Argentina',
      vet: 'veterinary ID',
      textAddress: 'Mendoza, Godoy Cruz, Pringles 1500',
      userCreator: 'User Creator ID',
      userShelter: 'User Shelter ID',
      userAdopter: 'User Adopter ID',
      notes: 'string',
      image: {
        filenames: [
          'https://images.unsplash.com/photo-1518288774672-b94e808873ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1338&q=80',
          'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2360&q=80',
        ],
      },
      medicalNotes: [
        {
          date: '12/02/2020',
          title: 'Vacuna',
          note: 'Le pusimos la vacuna de la parviobirocis',
        },
      ],
    },
  ],
};

export default petsListMock;
