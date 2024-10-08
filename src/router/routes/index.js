import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Shilpha Admin'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: "/home",
    component: lazy(() => import('../../views/home/Home'))
  },
  {
    path: "/plan",
    component: lazy(() => import('../../views/plan/plan'))
  },
  {
    path: "/online",
    component: lazy(() => import('../../views/online/Online'))
  },
  {
    path: "/shop",
    component: lazy(() => import('../../views/shop/Shop'))
  },
  {
    path: "/footwearstock",
    component: lazy(() => import('../../views/stock/Stock'))
  },
  {
    path: "/materials",
    component: lazy(() => import('../../views/materials/Materials'))
  },
  {
    path: "/revenue",
    component: lazy(() => import('../../views/revenue/Revenue'))
  },
  {
    path: "/login",
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
