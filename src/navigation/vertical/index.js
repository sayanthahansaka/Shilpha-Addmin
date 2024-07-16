import { Mail, Home, Box, BarChart2 } from 'react-feather'

export default [
  // {
  //   id: 'home',
  //   title: 'Home',
  //   icon: <Home size={20} />,
  //   navLink: '/home'
  // },
  {
    id: 'online',
    title: 'Online',
    icon: <Box size={20} />,
    navLink: '/online'
  },
  {
    id: 'shop',
    title: 'Shop',
    icon: <Home size={20} />,
    navLink: '/shop'
  },
  {
    id: 'revenue',
    title: 'Revenue',
    icon: <BarChart2 size={20} />,
    navLink: '/revenue'
  }
]
