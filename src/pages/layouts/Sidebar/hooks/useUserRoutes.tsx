import Profile from '@mui/icons-material/ManageAccounts';
import CollectionsIcon from '@mui/icons-material/Collections';
import SecurityIcon from '@mui/icons-material/Security';

export const useUserRoutes = () => {
    return [
       {
         title: 'Профиль', 
         path: '/',
         icon: <Profile />
       },
       {
         title: 'Аккаунты', 
         path: '/accounts',
         icon: <SecurityIcon />
       },
       {
         title: 'Галерея', 
         path: '/gallery',
         icon: <CollectionsIcon />
       },
    ]
}