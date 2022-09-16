import React, { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import BaseInput from 'components/common/BaseInput';
import BaseButton from 'components/common/BaseButton';
import BaseText from 'components/common/BaseText';
import BaseTitle from 'components/common/BaseTitle';
import { useUser } from 'hooks/queries/user/useUser';
import GoogleAutocomplete from 'components/common/GoogleAutocomplete';
import BaseTextarea from 'components/common/BaseTextarea';
import BaseInputPhone from 'components/common/BaseInputPhone';
import LayoutForm from 'components/common/LayoutForm';

import styles from './Settings.module.scss';
import BaseLoading from 'components/common/BaseLoading';
import { useMutationUserUpdateUser } from 'hooks/mutations/user/useMutationUserUpdateUser';

let FORM_STATE = {
  name: '',
  cover: '',
  email: '',
  github: '',
  phone: '',
  twitter: '',
  location: {
    city: '',
    lat: 0,
    lng: 0,
    textAddress: '',
  },
  facebook: '',
  instagram: '',
  description: '',
  socialNetworks: [],
};

const Settings: NextPage = () => {
  const { data: user, isLoading } = useUser();
  const { mutateUpdateUser, isLoadingUpdateUser } = useMutationUserUpdateUser();
  const handleChangeAddress = (location: any) => {
    setFieldValue('lat', location.lat);
    setFieldValue('lng', location.lng);
  };

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

  const formik = useFormik({
    initialValues: FORM_STATE,
    onSubmit: async (values: any) => {
      const data = {
        name: values.name,
        description: values.description,
        location: {
          city: values.city,
          country: values.country,
          lat: values.lat,
          lng: values.lng,
          textAddress: values.textAddress,
        },
        phone: values.phone,
        socialNetworks: {
          facebook: values.facebook,
          instagram: values.instagram,
          twitter: values.twitter,
          github: values.github,
        },
      };

      mutateUpdateUser(data);
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit, errors }: any = formik;

  const setUserValues = useCallback(() => {
    console.log(user);

    setFieldValue('name', user?.name || '');
    setFieldValue('location.country', user?.location.country);
    setFieldValue('location.city', user?.location.city);
    setFieldValue('location.textAddress', user?.location.textAddress);
    setFieldValue('location.lat', user?.location.lat);
    setFieldValue('location.lng', user?.location.lng);
    setFieldValue('description', user?.description || '');
    setFieldValue('phone', user?.phone || '');
    setFieldValue('facebook', user.socialNetworks?.facebook || '');
    setFieldValue('instagram', user.socialNetworks?.instagram || '');
    setFieldValue('github', user.socialNetworks?.github || '');
    setFieldValue('twitter', user.socialNetworks?.twitter || '');
  }, [user]);

  useEffect(() => {
    user && setUserValues();
  }, [user]);

  if (isLoading || isLoadingUpdateUser) {
    return <BaseLoading center />;
  }

  return (
    <LayoutForm submitForm={handleSubmit}>
      <BaseTitle size={30} title="Editar perfil" />
      <BaseInput
        label="Nombre"
        marginTop={40}
        inputName="name"
        value={values.name}
        handleChange={handleChange}
        placeholder="Introduce el tu nombre o el nombre del refugio"
      />
      <BaseInput
        disabled
        marginTop={20}
        label="Email"
        inputName="email"
        value={user.email}
        handleChange={handleChange}
        placeholder="Enter your email"
      />
      <GoogleAutocomplete
        // @ts-ignore
        name="google"
        error={errors.location?.textAddress}
        value={values.location.textAddress}
        label="Ubicación del refugio"
        handleChangeAddress={handleChangeAddress}
        placeholder="Agrega la ubicación del refufio"
        handleChangeTextAddress={handleChangeTextAddress}
        handleChangeAddressComponents={handleChangeAddressComponents}
      />
      {values.location?.textAddress && (
        <BaseText
          marginTop={10}
          size={14}
          text={`Ubicación actual: ${values.location.textAddress}`}
        />
      )}
      <BaseTextarea
        marginTop={10}
        label="Descripcion"
        inputName="description"
        value={values.description}
        handleChange={handleChange}
        errorMessage={errors.description}
        placeholder="Descripcion y datos importantes"
      />
      <BaseInputPhone
        marginTop={10}
        inputName="phone"
        defaultCountry="ar"
        countryList={['ar']}
        value={values.phone}
        label="Agrega tu whatsapp"
        setFieldValue={setFieldValue}
        errorMessage={errors.phone}
      />
      <BaseText medium marginTop={10} thin text="Redes sociales" />
      <BaseInput
        marginTop={20}
        label="Facebook"
        inputName="facebook"
        value={values.facebook}
        handleChange={handleChange}
        placeholder="Ingrese el link de su perfil de facebook"
      />
      <BaseInput
        marginTop={20}
        label="Instagram"
        inputName="instagram"
        value={values.instagram}
        handleChange={handleChange}
        placeholder="Ingrese el link de su perfil de instagram"
      />
      <BaseInput
        marginTop={20}
        label="Twitter"
        inputName="twitter"
        value={values.twitter}
        handleChange={handleChange}
        placeholder="Ingrese el link de su perfil de Twitter"
      />
      <BaseInput
        marginTop={20}
        label="Github"
        inputName="github"
        value={values.github}
        handleChange={handleChange}
        placeholder="Ingrese el link de su perfil de github"
      />
      <div className={styles.actions}>
        <BaseButton marginTop={20} type="submit" text="Guardar" />
      </div>
    </LayoutForm>
  );
};

export default Settings;
