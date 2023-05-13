import UpperNavigator from '../components/UpperNavigator/UpperNavigator';
import SideNavigator from '../components/SideNavigator/SideNavigator';
import { Outlet } from 'react-router-dom';
import classes from './RootLayout.module.css';

const RootLayout = () => {
  return (
    <div className={classes.container}>
      <div>
        <UpperNavigator />
      </div>
      <div className={classes.middle}>
        <div style={{width: 'fit-content'}}>
          <SideNavigator />
        </div>
        <div style={{width:'100%'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
