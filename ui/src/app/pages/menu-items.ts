import { environment } from '../../environments/environment';
import { MenuItem } from '../shared/interfaces/menu-item.interface';

const MENU: MenuItem[] = [
  {
    title: 'Home',
    icon: 'space_dashboard',
    link: 'home',
    home: true,
  },
  {
    title: 'Fleet Management',
    icon: 'view_in_ar',
    children: [
      {
        title: 'Agents',
        link: 'fleet/agents',
      },
      {
        title: 'Agent Groups',
        link: 'fleet/groups',
      },
    ],
  },
  {
    title: 'Sink Management',
    icon: 'backup',
    link: 'sinks',
  },
  {
    title: 'Dataset Explorer',
    icon: 'layers',
    children: [
      {
        title: 'Policy Management',
        link: 'datasets/policies',
      },
      {
        title: 'Datasets',
        link: 'datasets/list',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'settings',
  },
];

const DEV_ITEMS: MenuItem[] = [
  {
    title: 'Dev',
    icon: 'grid_3x3',
    link: '/pages/dev',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  ...MENU,
  ...environment.production ? [] : DEV_ITEMS,
];
