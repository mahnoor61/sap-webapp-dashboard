// ** Icon imports
import CategoryIcon from '@mui/icons-material/Category'
import StyleIcon from '@mui/icons-material/Style'
import GroupsIcon from '@mui/icons-material/Groups'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import ArticleIcon from '@mui/icons-material/Article'
import MailIcon from '@mui/icons-material/Mail'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import RateReviewIcon from '@mui/icons-material/RateReview'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import FactoryIcon from '@mui/icons-material/Factory'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import PeopleIcon from '@mui/icons-material/People'
import WorkIcon from '@mui/icons-material/Work'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useSelector } from 'react-redux'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import EngineeringIcon from '@mui/icons-material/Engineering'

const navigation = () => {
  const auth = useSelector(state => state.auth)
  const userData = auth.user

  if (userData.role == 'admin') {
    return [
      {
        sectionTitle: 'Accounts'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Dashboard'
      },

      {
        title: 'User Management',
        icon: PeopleIcon,
        path: '/user-management'
      },
      {
        title: 'Job Assigning',
        icon: WorkHistoryIcon,
        path: '/job-assigning'
      },
      {
        title: 'Operator',
        icon: EngineeringIcon,
        path: '/operator'
      },
      {
        title: 'Quality Control',
        icon: EngineeringIcon,
        path: '/quality-control'
      }
    ]
  } else if (userData.role == 'operator') {
    return [
      {
        sectionTitle: 'Accounts'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Website'
      },
      {
        title: 'Operator',
        icon: EngineeringIcon,
        path: '/operator'
      }
    ]
  }
  
  
  
  else {
    return [
      {
        sectionTitle: 'Accounts'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Dashboard'
      },
      {
        title: 'Job Assigning',
        icon: WorkHistoryIcon,
        path: '/job-assigning'
      }
    ]
  }
}

export default navigation
