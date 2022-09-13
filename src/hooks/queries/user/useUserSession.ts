import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useUserSession = (redirect?: string) => {
  const { data: session }: any = useSession();
  const router = useRouter();

  if (session === null && redirect !== "") {
    redirect && router.push(redirect);
  }

  return { session };
};
