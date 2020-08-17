import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import LayoutLandingPage from 'components/LayoutLandingPage'
import Footer from 'components/commons/Footer'
import shelter from './shelter.jpg'
import dev from './dev.jpg'
import vet from './vet.jpg'
import adopter from './adopter.jpg'
import FirstSection from './FirstSection'
import ImageCenter from './ImageCenter'
import CallAction from './CallAction'
import OnlyInformation from './OnlyInformation'
import ExplicationModule from './ExplicationModule'

const LandingPage = () => {
  const { t } = useTranslation('landingPage')

  return (
    <>
      <LayoutLandingPage>
        <FirstSection />
        <CallAction title={t('callAction')} textButton={t('goToSearch')} />
        <ImageCenter image={shelter} />
        <OnlyInformation
          title="¿Porque existe petsLove y cuales son nuestros ideales?"
          text="Pienso que el mundo debería ser un lugar maravilloso, un santuario donde las personas
        viven en armonia con la naturaleza y los animales como seres humanos tenemos el potencial
        para lograrlo y la tecnología es una herramienta de gran ayuda."
        />
        <ExplicationModule
          title="Fomentamos la Adopción responsable"
          text="Cuando una mascota es adoptada, el refugio podrá asignarla al adoptante y de esta manera
            poder hacer seguimiento de la misma, visualizando las nuevas fotos que el adoptante
            agregué pudiendo actualizar sin borrar poder borrar el perfil de la mascota."
          image={adopter}
        />
        <ExplicationModule
          mirror
          title="¿Te gustaría ser voluntario Y hacer transito de mascotas?"
          text="Si te no puedes tener una mascota pero puedes ayudar a cuidar una cada tanto
        temporalmente. Puedes hacerte un perfil como voluntario para que los refugios puedan
        contactarte. Vas a poder tener un registro de las mascotas que cuidaste a lo largo del
        tiempo y si te enamoraste de una y la adoptaste también podrás crear su perfil y llevar
        un control medico de tu nuevo compañero."
          image={dev}
        />
        <ExplicationModule
          title="Veterinarios"
          text="Si eres veterinario también podrás usar la plataforma con un perfil dedicado a
        veterinarias. Tendrán un panel de control dedicado a la creación de nuevos perfiles y
        con el listado de mascotas atendidas con filtrado por nombre y un historial de vacunas
        con la posibilidad de agregar anotaciones adicionales."
          image={vet}
        />
      </LayoutLandingPage>
      <Footer />
    </>
  )
}

export default observer(LandingPage)
