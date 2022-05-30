import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { ROUTES } from '../../utils/routes';
import SidebarItem from './SidebarItem';
import { NavContainer } from '../ui/sidebar/NavContainer';
import { LiMenuItem } from '../ui/sidebar/LiMenuItem';
import { UserContext } from '../../context/UserContext';
import useIcon from '../../hooks/useIcon';
import { getProfileRoute } from '../../utils/constant';

const SidebarNavigation = ({ connections }) => {
  const { user, setUser } = useContext(UserContext);
  const [auth, setSuth] = useState(false);
  const { iconElement: logout } = useIcon(faSignInAlt, false, 'lg');

  useEffect(() => {
    if (!user) return;
    setSuth(!auth);
  }, [user]);

  useEffect(() => {
    if (!user && auth) {
      setSuth(!auth);
    }
  }, [user]);

  const signOut = () => {
    try {
      setUser(null);
      Router.push('/');
    } catch (error) {}
  };

  const getRoute = (ele) => {
    let routeVal = ele.path;
    if (user && ele.name === 'Profile')
      routeVal = getProfileRoute(user.name, user.id, 'profile');
    else if (user && ele.name === 'Messages')
      routeVal = `/messages/compose/${user.name}/${user.id}`;
    return routeVal;
  };

  return (
    <NavContainer>
      <ul className='nav flex-column'>
        {ROUTES.map(
          (ele) =>
            ((ele.isWeb && auth && !ele.isPublic) ||
              (ele.isWeb && ele.isPublic)) && (
              <SidebarItem
                url={getRoute(ele)}
                text={ele.name}
                icon={<FontAwesomeIcon icon={ele.icon} />}
                connections={connections}
              />
            )
        )}
        {auth && (
          <LiMenuItem>
            <span className='sidebar-link nav-link' onClick={() => signOut()}>
              <i className='sidebar-icon'>{logout}</i>
              <span className='sidebar-text'>Log Out</span>
            </span>
          </LiMenuItem>
        )}
      </ul>
    </NavContainer>
  );
};
export default SidebarNavigation;
