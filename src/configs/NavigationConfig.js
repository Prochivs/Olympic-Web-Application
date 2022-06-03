import {
  DashboardOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  FileSearchOutlined,
  DesktopOutlined,
  DotChartOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const superAdminNavTree = [
  {
    key: 'super',
    path: `${APP_PREFIX_PATH}/`,
    title: 'SuperAdmin',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'dashboard',
        path: `${APP_PREFIX_PATH}/`,
        title: 'Dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'add-admins',
        path: `${APP_PREFIX_PATH}/add-admins`,
        title: 'Add Admins',
        icon: UsergroupAddOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
]

const adminAdminNavTree = [
  {
    key: 'admindash',
    path: `${APP_PREFIX_PATH}/home`,
    title: 'Admin',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'admin',
        path: `${APP_PREFIX_PATH}/home`,
        title: 'Dashboard',
        icon: DotChartOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'Event',
        path: `${APP_PREFIX_PATH}/subscriberList`,
        title: 'Subscribers',
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [],
      },
  
      {
        key: 'jobs',
        path: `${APP_PREFIX_PATH}/jobs`,
        title: 'Sporting Codes',
        icon: FileSearchOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'logstandings',
        path: `${APP_PREFIX_PATH}/logs`,
        title: 'Log Standings',
        icon: FileOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
]

const subscriberNavTree = [
  {
    key: 'subscriber',
    path: `${APP_PREFIX_PATH}/subscribers`,
    title: 'Subscriber',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'subscriber',
        path: `${APP_PREFIX_PATH}/subscribers`,
        title: 'Dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'watch',
        path: `${APP_PREFIX_PATH}/stream-event`,
        title: 'Stream Olympic Event',
        icon: DesktopOutlined,
        breadcrumb: false,
        submenu: [],
      },
      
    ],
  },
]
const navigationConfig = [
  ...superAdminNavTree,
  ...adminAdminNavTree,
  ...subscriberNavTree,
]

export default navigationConfig

export const superConfig = [...superAdminNavTree]

export const adminConfig = [...adminAdminNavTree]

export const subscriberConfig = [...subscriberNavTree]
