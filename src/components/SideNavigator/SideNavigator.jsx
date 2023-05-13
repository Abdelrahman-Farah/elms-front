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
            <FontAwesomeIcon icon={faThLarge} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/messages'
            className={({ isActive }) => (isActive ? classes.active : null)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to='calendar'
            className={({ isActive }) => (isActive ? classes.active : null)}
          >
            <FontAwesomeIcon icon={faCalendarDays} />
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile'
            className={({ isActive }) => (isActive ? classes.active : null)}
          >
            <FontAwesomeIcon icon={faUser} />
            Profile
          </NavLink>
        </li>
        <li className={classes.logout} onClick={() => logout()}>
          <NavLink to='/'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigator;
