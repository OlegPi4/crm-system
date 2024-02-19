export interface IMenuItem {
   name:string
   url:string
   icon:string
   role: [string?, string?, string?] | null
}

export const MENU_DATA: IMenuItem[] = [
  {
      icon: "octicon:home-24",
      name: 'Home',
      url: '/',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "octicon:lock-24",
      name: 'Products',
      url: '/products',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "octicon:verified-24",
      name: 'Payments',
      url: '/payments',
      role: [ 'admin','user']
   },
   {
      icon: "octicon:file-directory-symlink-24",
      name: 'Orders',
      url: '/orders',
      role: ['admin', 'user']
   },
   {
      icon: "octicon:people-24",
      name: 'Customers',
      url: '/customers',
      role: ['admin', 'user', 'demo']
   },
   {
      icon: "octicon:sponsor-tiers-24",
      name: 'Feedback',
      url: '/feedback',
      role: ['admin', 'user']
   },
   {
      icon: "octicon:tools-24",
      name: 'Settings',
      url: '/settings',
      role: ['admin']
   },
   {
      icon: "octicon:info-24",
      name: 'Help center',
      url: '/help',
      role: ['admin', 'user', 'demo']
   },
]