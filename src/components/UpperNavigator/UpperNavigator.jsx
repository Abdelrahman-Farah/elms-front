import classes from './UpperNavigator.module.css';
import logo from '../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';

const UpperNavigator = () => {
  return (
    <nav className={classes.upperNavigator}>
      <div className={classes.left}>
        <div className={classes.logo}>
          <img src={logo} alt='logo' className={classes.logoImage} />
          <h1 className={classes.siteName}>ELMS</h1>
        </div>
        <div className={classes.searchBar}>
          <div className={classes.searchContainer}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={classes.searchIcon}
            />
            <input
              type='text'
              placeholder='Find your course...'
              className={classes.searchInput}
            />
          </div>
          <button className={classes.searchButton}>Search</button>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.notifications}>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className={classes.user}>
          <div className={classes.userName}>
            <h1>John Doe</h1>
          </div>
          <div className={classes.userImage}>
            <img src='https://picsum.photos/200' alt='user' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UpperNavigator;
