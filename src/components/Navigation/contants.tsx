import { BsClipboardData } from "react-icons/bs";
import { MdPets, MdSearch } from "react-icons/md";

export const navigationRoutes = [
  {
    href: "/dashboard",
    icon: <BsClipboardData size={25} />,
    text: "Panel de control",
  },
  {
    href: "/",
    icon: <MdSearch size={25} />,
    text: "Buscar Mascotas",
  },
  {
    href: "/createPet",
    icon: <MdPets size={24} />,
    text: "Crear Mascota",
  },
];
