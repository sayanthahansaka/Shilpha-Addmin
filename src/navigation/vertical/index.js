import { Mail, Home, Box, BarChart2, ShoppingCart, ShoppingBag, Archive, Airplay } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'plan',
    title: 'Plan',
    icon: <Airplay size={20} />,
    navLink: '/plan'
  },
  {
    id: 'online',
    title: 'Online',
    icon: <ShoppingBag size={20} />,
    navLink: '/online'
  },
  {
    id: 'shop',
    title: 'Shop',
    icon: <Home size={20} />,
    navLink: '/shop'
  },
  {
    id: 'materials stock',
    title: 'Materials Stock',
    icon: <Archive size={20} />,
    navLink: '/materials'
  },
  {
    id: 'Footwear stock',
    title: 'Footwear Stock',
    icon: <Box size={20} />,
    navLink: '/footwearstock'
  },
  {
    id: 'revenue',
    title: 'Revenue',
    icon: <BarChart2 size={20} />,
    navLink: '/revenue'
  }
]
