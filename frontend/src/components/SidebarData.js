import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    id: 1,
    title: "Home",
    cName: "sidebar-item",
    icon: <FaIcons.FaHome />,
    path: "/",
  },
  {
    id: 2,
    title: "Products",
    cName: "sidebar-item",
    icon: <FaIcons.FaCartPlus />,
    path: "/products",
  },
  {
    id: 3,
    title: "Contact Us",
    cName: "sidebar-item",
    icon: <FaIcons.FaEnvelopeOpenText />,
    path: "/contact",
  },
  {
    title: 'Gestion de Question',
    path: '/gest_question',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Gestion de Question ',
        path: '/gest_question/AjoutQuestion',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      
    ]
  },
];