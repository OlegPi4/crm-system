export interface IMenuItem {
   name:string
   url:string
   icon:string 
}

export const MENU_DATA: IMenuItem[] = [
  {
      icon: "octicon:home-24",
      name: 'Home',
      url: '/'
   },
   {
      icon: "octicon:lock-24",
      name: 'Products',
      url: '/products'
   },
   {
      icon: "octicon:verified-24",
      name: 'Payments',
      url: '/payments'
   },
   {
      icon: "octicon:file-directory-symlink-24",
      name: 'Orders',
      url: '/orders'
   },
   {
      icon: "octicon:people-24",
      name: 'Customers',
      url: '/customers'
   },
   {
      icon: "octicon:sponsor-tiers-24",
      name: 'Feedback',
      url: '/feedback'
   },
   {
      icon: "octicon:tools-24",
      name: 'Settings',
      url: '/settings'
   },
   {
      icon: "octicon:info-24",
      name: 'Help center',
      url: '/help'
   },
]