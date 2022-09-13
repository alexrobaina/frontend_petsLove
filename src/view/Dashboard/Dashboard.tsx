import { useDashboard } from "hooks/queries/user/useDashboard";
import { useUserSession } from "hooks/queries/user/useUserSession";
import BaseLoading from "components/common/BaseLoading";
import Card from "components/common/Card";
import BaseTitle from "components/common/BaseTitle";
import { useState } from "react";
import BaseInput from "components/common/BaseInput";
import PetsList from "components/PetsList";
import Pagination from "components/common/Pagination";
import { useUserPetsFilters } from "hooks/queries/pet/useUserPetsFilters";
import { Role } from "@prisma/client";
import Filters from "components/Search/Filters";
import BaseText from "components/common/BaseText";
import BaseButton from "components/common/BaseButton";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { session } = useUserSession("/login");
  const isUserAdopter = session?.user.role === Role.ADOPTER ? true : false;
  const [filters, setFilters]: any = useState({
    sex: "",
    city: "",
    page: 1,
    country: "",
    category: "",
    adopted: isUserAdopter,
    name: "",
  });
  const { data: dashboarDate, isLoading: isLoadingDashboard } = useDashboard();
  const { data: pets, isLoading: isLoadingPet } = useUserPetsFilters(filters);

  const handleChangeName = (e: any) => {
    setFilters({ ...filters, name: e.target.value.toLowerCase() });
  };

  const handleChangePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleSelectSex = (sex: string) => {
    setFilters({ ...filters, sex });
  };

  const handleSelectCategory = (category: string) => {
    setFilters({ ...filters, category });
  };

  const handleSelectAdopted = (adopted: boolean) => {
    setFilters({ ...filters, adopted });
  };

  const handleCleanFilters = () => {
    setFilters({
      sex: "",
      city: "",
      page: 1,
      country: "",
      category: "",
      adopted: isUserAdopter,
      name: "",
    });
  };

  if (isLoadingDashboard) {
    return <BaseLoading center />;
  }

  return (
    <div className={styles.container}>
      <BaseTitle title="Panel de control" />
      {dashboarDate && (
        <div className={styles.containerCardInformation}>
          <Card width={150}>
            <div className={styles.countInfo}>
              <BaseText bold text={dashboarDate.dogs} />
              <BaseText medium text="Perros" />
            </div>
          </Card>
          <Card width={150}>
            <div className={styles.countInfo}>
              <BaseText bold text={dashboarDate.cats} />
              <BaseText medium text="Gatos" />
            </div>
          </Card>
          <Card width={150}>
            <div className={styles.countInfo}>
              <BaseText bold text={dashboarDate.exotics} />
              <BaseText medium text="Exoticos" />
            </div>
          </Card>
          {session?.user.role === Role.SHELTER && (
            <>
              <Card width={150}>
                <div className={styles.countInfo}>
                  <BaseText bold text={dashboarDate.adoption} />
                  <BaseText medium text="En adopcion" />
                </div>
              </Card>
              <Card width={150}>
                <div className={styles.countInfo}>
                  <BaseText bold text={dashboarDate.adopted} />
                  <BaseText medium text="Adoptados" />
                </div>
              </Card>{" "}
            </>
          )}
        </div>
      )}
      <BaseText marginTop={60} size={20} bold text="Filtros" />
      <Filters
        sex={filters.sex}
        category={filters.category}
        handleSelectSex={handleSelectSex}
        handleSelectCategory={handleSelectCategory}
      />
      <BaseInput
        label="Name"
        inputName="name"
        marginBottom={10}
        value={filters.name}
        handleChange={handleChangeName}
        placeholder="Filtrar por nombre"
      />
      <div className={styles.filters}>
        <BaseButton
          isSelected={filters.adopted}
          onClick={() => handleSelectAdopted(!filters.adopted)}
          text="Adopados"
        />
        <BaseButton
          onClick={() => handleCleanFilters()}
          text="Limpiar filtros"
        />
      </div>
      <div>
        <PetsList pets={pets?.pets} isLoading={isLoadingPet} />
        <Pagination
          limitOfItems={10}
          page={filters.page}
          totalItems={pets?.total || 0}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};
export default Dashboard;
