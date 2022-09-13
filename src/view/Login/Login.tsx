import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BaseButton from "components/common/BaseButton";
import BaseText from "components/common/BaseText";
import BaseTitle from "components/common/BaseTitle";
import { Role } from "@prisma/client";
import { useMutationUserUpdateUser } from "hooks/mutations/user/useMutationUserUpdateUser";
import BaseLoading from "components/common/BaseLoading";

import styles from "./Login.module.scss";
import { useUser } from "hooks/queries/user/useUser";

const Login = () => {
  const { mutateUpdateUser, isLoadingUpdateUser, isSuccessUpdateUser } =
    useMutationUserUpdateUser();
  const { data: session }: any = useSession();
  const { data: user, isLoading } = useUser();
  const route = useRouter();

  if (user?.role || session?.user?.role || isSuccessUpdateUser) {
    route.push("/dashboard");
  }

  const submitRole = (role: Role) => {
    mutateUpdateUser({ role });
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.containerImage}>
        <img src="https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" />
      </div>
      {user && !user?.role && (
        <div className={styles.actionSetRole}>
          {isLoadingUpdateUser && isLoading ? (
            <BaseLoading center />
          ) : (
            <>
              <BaseTitle title="Elije un rol" />
              <BaseText text="Para poder continuar dinos que rol cumples en la comunidad de mascotas" />
              <BaseButton
                text="Quiero Adoptar"
                onClick={() => submitRole("ADOPTER")}
              />
              <BaseButton
                text="Soy un refugio"
                onClick={() => submitRole("SHELTER")}
              />
            </>
          )}
        </div>
      )}
      {!session && (
        <div className={styles.socialMediaLogin}>
          Not signed in <br />
          <BaseButton
            marginTop={20}
            text="Ingresa con github"
            onClick={() => signIn("github")}
          />
          <BaseButton
            marginTop={20}
            text="Ingresa con google"
            onClick={() => signIn("google")}
          />
        </div>
      )}
    </div>
  );
};
export default Login;
