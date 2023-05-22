import UpperNavigator from '../components/UpperNavigator/UpperNavigator';
import SideNavigator from '../components/SideNavigator/SideNavigator';
import { Outlet } from 'react-router-dom';
import classes from './RootLayout.module.css';

const RootLayout = () => {
  return (
    <div className={classes.container}>
      <div>
        <UpperNavigator style={{height:'10%'}} />
      </div>
      <div className={classes.middle}>
        <div style={{width: '15%'}}>
          <SideNavigator />
        </div>
        <div style={{width:'85%', height:'100%'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
