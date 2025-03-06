import React from 'react';
import type { IUser, UserRole } from '@src/app/types';
import { useAppSelector } from '@src/store';
type WithAuthPropsType = {
  isAuthRequired?: true;
  roles?: UserRole[];
};

type NoAuthPropsType = {
  isAuthRequired: false;
};

export type AuthPropsType = WithAuthPropsType | NoAuthPropsType;
export type RouteDataType = {
  path: string;
  auth?: AuthPropsType;
};

type PropsType = AuthPropsType & {
  fallbackNode?: React.ReactNode;
};

export const validateUserAuth = (user: IUser | null, auth: AuthPropsType) => {
  // The order of IF conditions is important here
  if (!user) {
    return !auth.isAuthRequired;
  }

  if (user && !auth.isAuthRequired) {
    return false;
  }
  // TODO add some roles

  // if ((auth as WithAuthPropsType).roles?.length) {
  //   return (auth as WithAuthPropsType).roles.some((role) => user.role === role);
  // }

  return true;
};

export const useIsAvailable = (props: AuthPropsType = {}) => {
  const user = useAppSelector(({ main }) => main.user);
  const requiredPermissionsRef = React.useRef([] as UserRole[]);
  const isAuthRequiredRef = React.useRef(false);

  if (props.isAuthRequired !== false) {
    isAuthRequiredRef.current = true;
    requiredPermissionsRef.current = props.roles || [];
  }

  const isAvailable = React.useMemo<boolean>(() => {
    return validateUserAuth(user, {
      isAuthRequired: isAuthRequiredRef.current,
      roles: requiredPermissionsRef.current,
    });
  }, [user]);

  return isAvailable;
};

const Protector: React.FC<React.PropsWithChildren & PropsType> = (props) => {
  const isAvailable = useIsAvailable(props);

  if (!isAvailable) {
    return (props.fallbackNode as React.ReactElement) || null;
  }

  return props.children as React.ReactElement;
};

export default Protector;
