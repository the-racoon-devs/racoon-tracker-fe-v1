/**
 *
 * Authorize
 *
 */
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

export function Authorize(props: Props) {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return <div></div>;
}
