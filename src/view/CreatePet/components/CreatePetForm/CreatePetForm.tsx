import { FC, useState, useCallback, useEffect, ChangeEvent } from 'react';
import BaseInput from '../../../../components/common/BaseInput';
import BaseButton from '../../../../components/common/BaseButton';
import BaseTitle from '../../../../components/common/BaseTitle';
import GoogleAutocomplete from '../../../../components/common/GoogleAutocomplete';
import MedicalNotesItem from '../MedicalNotesItems';
import { ICreatePetFormProps } from '../../types';
import InputUploadImage from 'components/common/InputUploadImage';
import BaseTextarea from 'components/common/BaseTextarea';
import ReactModal from 'components/common/ReactModal';
import BaseText from 'components/common/BaseText';
import BaseSelectInput from 'components/common/BaseSelectInput';
import BaseRadioButton from 'components/common/BaseRadioButton';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';
import LayoutForm from 'components/common/LayoutForm';

import styles from './CreatePetForm.module.scss';

const CreatePetForm: FC<ICreatePetFormProps> = ({
  values,
  errors,
  // oldImages,
  submitForm,
  handleChange,
  setFieldValue,
  // handleDeleteImages,
  usersAdoptedEmailOptions,
}) => {
  const { data: session }: any = useSession();
  const [modalIsOpen, setModal] = useState(false);
  const [canAddMedicalNote, setCanAddMedicalNote] = useState(true);

  const validateMedicalNote = useCallback(() => {
    return values.detailMedicalNote === '' || values.titleMedicalNote === '';
  }, [values]);

  const closeModalMedicalNote = () => {
    setModal(false);
  };

  const addMedicalNote = (): void => {
    closeModalMedicalNote();
    const medicalNotesCopy = Array.from(values.medicalNotes);
    medicalNotesCopy.push({
      description: values.detailMedicalNote,
      title: values.titleMedicalNote,
      date: new Date(),
    });
    setFieldValue('medicalNotes', medicalNotesCopy);
  };

  const handleChangeMedicalDetail = (e: ChangeEvent<HTMLInputElement>): void => {
    setCanAddMedicalNote(validateMedicalNote());
    setFieldValue('detailMedicalNote', e.target.value);
  };

  const handleChangeMedicalTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setCanAddMedicalNote(validateMedicalNote());
    setFieldValue('titleMedicalNote', e.target.value);
  };

  const handleChangeAddress = (location: any) => {
    setFieldValue('location.lat', location.lat);
    setFieldValue('location.lng', location.lng);
  };

  const handleDelete = useCallback(
    (indexNote: number): void => {
      const medicalNotesCopy = Array.from(values.medicalNotes);
      if (medicalNotesCopy) {
        medicalNotesCopy.splice(indexNote, 1);
        setFieldValue('medicalNotes', medicalNotesCopy);
      }
    },
    [values?.medicalNotes],
  );

  const handleChangeTextAddress = useCallback((address: any) => {
    setFieldValue('textAddress', address);
  }, []);

  const handleChangeAddressComponents = useCallback((addressComponent: any) => {
    if (addressComponent?.address_components) {
      addressComponent.address_components.forEach((components: any) => {
        components.types.forEach((type: string) => {
          if (type === 'country') {
            setFieldValue('country', components.long_name);
          }
          if (type === 'administrative_area_level_1') {
            setFieldValue('city', components.long_name);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    setCanAddMedicalNote(validateMedicalNote());
  }, [setCanAddMedicalNote, validateMedicalNote, values]);

  return (
    <div className={styles.container}>
      <LayoutForm submitForm={submitForm}>
        <BaseTitle marginTop={40} marginBottom={60} title="Crear mascota" />
        <InputUploadImage
          marginBottom={20}
          inputName="images"
          // oldImages={oldImages}
          setFieldValue={setFieldValue}
          // handleDeleteImages={handleDeleteImages}
          bucketUrl={process.env.REACT_APP_AWS_IMAGE_PETS_URL_BASE || ''}
        />
        {session?.user.role === Role.SHELTER && (
          <BaseRadioButton
            inputName="adopted"
            value={values.adopted}
            setFieldValue={setFieldValue}
            text="La mascota fue adoptada?"
          />
        )}
        <BaseInput
          type="text"
          marginTop={10}
          label="Nombre"
          inputName="name"
          value={values.name}
          errorMessage={errors.name}
          handleChange={handleChange}
          placeholder="Nombre de la mascota"
        />
        <BaseInput
          type="date"
          marginTop={10}
          inputName="birthday"
          value={values.birthday}
          label="Fecha de nacimiento"
          handleChange={handleChange}
          errorMessage={errors.birthday}
          placeholder="Fecha estimada de nacimiento"
        />
        <BaseSelectInput
          label="Sexo"
          marginTop={10}
          inputName="sex"
          value={values.sex}
          setFieldValue={setFieldValue}
          placeholder="Type of sex"
          options={[
            { label: 'Macho', value: 'male' },
            { label: 'Hembra', value: 'female' },
          ]}
          errorMessage={errors.sex}
        />
        <BaseSelectInput
          marginTop={10}
          label="Categoria"
          inputName="category"
          value={values.category}
          setFieldValue={setFieldValue}
          placeholder="Type of sex"
          options={[
            { label: 'Perro', value: 'dog' },
            { label: 'Gato', value: 'cat' },
            { label: 'Exotico', value: 'exotic' },
          ]}
          errorMessage={errors.category}
        />
        <GoogleAutocomplete
          // @ts-ignore
          name="google"
          label="Ubicación de la mascota"
          value={values.textAddress}
          error={errors?.textAddress}
          handleChangeAddress={handleChangeAddress}
          handleChangeTextAddress={handleChangeTextAddress}
          placeholder="Agrega la ubicación actual de la mascota"
          handleChangeAddressComponents={handleChangeAddressComponents}
        />
        {values.textAddress && <BaseText size={14} text={values.textAddress} />}
        {usersAdoptedEmailOptions !== [] && session?.user.role === Role.SHELTER && (
          <BaseSelectInput
            isClearable
            marginTop={10}
            inputName="adopterUserEmail"
            label="Email del adoptante"
            setFieldValue={setFieldValue}
            value={values.adopterUserEmail}
            options={usersAdoptedEmailOptions}
            errorMessage={errors.adopterUserEmail}
            placeholder="Selecciona al usuario adoptante."
          />
        )}
        <BaseTextarea
          marginTop={10}
          label="Descripcion"
          inputName="description"
          handleChange={handleChange}
          value={values.description}
          errorMessage={errors.description}
          placeholder="Descripcion y datos importantes"
        />
        <BaseTitle marginTop={20} title="Notas medicas" />
        <BaseButton marginTop={15} text="Crear Nota" onClick={() => setModal(true)} />
        {values.medicalNotes.map(
          (note: { title: string; description: string }, index: number) => (
            <MedicalNotesItem
              key={note.title}
              title={note.title}
              description={note.description}
              handleDelete={() => handleDelete(index)}
              testId={`medical-notes-item-${note.title}`}
            />
          ),
        )}
        <ReactModal
          isOpen={modalIsOpen}
          closeModal={closeModalMedicalNote}
          title="Notas medicas"
        >
          <>
            <BaseInput
              type="text"
              marginTop={10}
              label="Titulo"
              inputName="titleMedicalNote"
              value={values.titleMedicalNote}
              handleChange={handleChangeMedicalTitle}
              errorMessage={errors.titleMedicalNote}
              placeholder="Agrege un titulo descriptivo"
            />
            <BaseTextarea
              marginTop={10}
              inputName="detailMedicalNote"
              value={values.detailMedicalNote}
              handleChange={handleChangeMedicalDetail}
              errorMessage={errors.detailMedicalNote}
              label="Descripcion"
              placeholder="Descripción del tratamiento"
            />
            <div className={styles.containerButtonMedicalModal}>
              <BaseButton
                medium
                marginTop={15}
                text="Crear"
                onClick={addMedicalNote}
                disabled={canAddMedicalNote}
              />
            </div>
          </>
        </ReactModal>
        <div className={styles.containerActions}>
          <BaseButton keyPress="Enter" marginTop={50} text="Crear" type="submit" />
        </div>
      </LayoutForm>
    </div>
  );
};

export default CreatePetForm;
