import classes from './SideNavigator.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faEnvelope,
  faCalendarDays,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../utils/auth';

const SideNavigator = () => {
  return (
    <nav className={classes.list}>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? classes.active : null)}
            end
          >
            <FontAwesomeIcon icon={faThLarge} /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/messages'
            className={({ isActive }) => (isActive ? classes.active : null)}
          >
            <FontAwesomeIcon icon={faEnvelope} /> <span>Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/calendar'
            className={({ isActive }) => (isActive ? classes.active : null)}
          >
            <FontAwesomeIcon icon={faCalendarDays} /> <span>Calendar</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='profile'
            className={({ isActive }) => (isActive ? classes.active : null)}
          >
            <FontAwesomeIcon icon={faUser} /> <span>Profile</span>
          </NavLink>
        </li>
        <li className={classes.logout} onClick={() => logout()}>
          <NavLink to='/'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />{' '}
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigator;
