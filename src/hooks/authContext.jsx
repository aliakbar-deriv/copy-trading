import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from './useAuth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const auth = useAuthState();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
