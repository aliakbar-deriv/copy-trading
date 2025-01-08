import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import { AuthContext } from '../../hooks/authContext.jsx'

const mockAuthContext = {
    defaultAccount: null,
    isLoading: false
}

const renderWithRouter = (ui, providerProps = mockAuthContext) => {
    return render(
        <AuthContext.Provider value={providerProps}>
            <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
    )
}

describe('ProtectedRoute', () => {
    it('redirects to login when not authorized', () => {
        const { container } = renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        )
        
        // Should not render children when unauthorized
        expect(container).not.toHaveTextContent('Protected Content')
    })

    it('shows loading state', () => {
        renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>,
            { ...mockAuthContext, isLoading: true }
        )
        
        // Should show loading state
        expect(screen.getByTestId('loading-container')).toHaveClass('min-h-screen bg-gray-50')
    })

    it('renders children when authorized', () => {
        const { container } = renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>,
            { 
                ...mockAuthContext,
                defaultAccount: { token: 'test-token' }
            }
        )
        
        // Should render children when authorized
        expect(container).toHaveTextContent('Protected Content')
    })
})
