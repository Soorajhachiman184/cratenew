// App Imports

import UsersList from '../../../modules/admin/users/List'

// Admin user routes
export const usersList = {
  path: '/admin/users',
  component: UsersList,
  auth: true
}