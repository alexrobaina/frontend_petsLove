import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import CreatePetForm from './components/CreatePetForm';
import { TValues } from './types';
import { FORM_STATE } from './contants';
import { useMutationPetCreate } from 'hooks/mutations/pet/useMutationPetCreate';
import { validationCreatePet } from './helpers/validationInputSchema';
import { useUserSession } from 'hooks/queries/user/useUserSession';
import { useRouter } from 'next/router';
import BaseLoading from 'components/common/BaseLoading';
import { useUserRole } from 'hooks/queries/user/useUserRole';
import { Role } from '@prisma/client';

const CreatePet: FC = () => {
  const { session } = useUserSession('/login');
  const [emailsOptionsAdopters, setEmailsOptionsAdopters]: any = useState([]);
  const { data: userRole } = useUserRole('ADOPTER');
  const router = useRouter();
  const { mutateCreate, isLoadingCreate, isSuccessCreated } = useMutationPetCreate();

  if (isSuccessCreated) {
    router.push('/dashboard');
  }

  useEffect(() => {
    const optiosFormatted: any = [];
    setEmailsOptionsAdopters([]);
    if (userRole) {
      userRole.forEach((user: { email: string }) => {
        optiosFormatted.push({
          value: user.email,
          label: user.email,
        });
      });
    }
    setEmailsOptionsAdopters(optiosFormatted);
  }, [userRole]);

  const formik = useFormik({
    initialValues: FORM_STATE,
    validationSchema: validationCreatePet,
    onSubmit: (values: TValues) => {
      console.log(values);
      mutateCreate(values);
    },
  });

  let { values, handleChange, setFieldValue, handleSubmit, errors }: any = formik;

  useEffect(() => {
    if (session?.user.role === Role.SHELTER) {
      values.adopterUserEmail ? (values.adopted = true) : (values.adopted = false);
    }
  }, [values.adopterUser]);

  if (isLoadingCreate) {
    return <BaseLoading center />;
  }

  return (
    <CreatePetForm
      values={values}
      errors={errors}
      isLoading={isLoadingCreate}
      // oldImages={oldImages}
      submitForm={handleSubmit}
      handleChange={handleChange}
      // usersVetEmailList={usersVet}
      setFieldValue={setFieldValue}
      // goToDashboard={goToDashboard}
      usersAdoptedEmailOptions={emailsOptionsAdopters}
      // handleDeleteImages={handleDeleteImages}
      // canBeChangeAdoptedStatus={() => canBeChangeAdoptedStatus(user?.role)}
    />
  );
};

export default CreatePet;
