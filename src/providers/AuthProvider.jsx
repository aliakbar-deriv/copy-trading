import PropTypes from 'prop-types';
import { useAuthState } from '../hooks/useAuth';
import { AuthContext } from '../contexts/auth';

export const AuthProvider = ({ children }) => {
    const auth = useAuthState();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
