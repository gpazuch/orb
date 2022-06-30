import { environment } from "src/environments/environment";
import {NavMenuItem} from "../components/nav-menu/nav-item.component";

const items: NavMenuItem[] = [
  {
    title: 'Home',
    icon: 'view_quilt',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Agents',
    icon: 'cell_tower',
    link: '/pages/fleet/agents',
  },
  {
    title: 'Agent Groups',
    icon: 'storage',
    link: '/pages/fleet/groups',
  },
  {
    title: 'Policy Management',
    icon: 'query_stats',
    link: '/pages/dataset/policies',
  },
  {
    title: 'Sink Management',
    icon: 'settings',
    link: '/pages/sinks',
  },
];

const dev_items: NavMenuItem[] = [
  {
    title: 'Dev Showroom',
    icon: 'book',
    link: '/pages/dev',
  },
];

export const NAV_MENU_ITEMS: NavMenuItem[] = [
  ...items,
  ...environment.production ? [] : dev_items,
]
