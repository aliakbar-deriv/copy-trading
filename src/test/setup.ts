import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import React from 'react'

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers as any)

// Mock @deriv-com/quill-ui components
vi.mock('@deriv-com/quill-ui', () => {
  const React = require('react')
  const Skeleton = {
    Square: ({ width, height }: { width: string, height: string }) => 
      React.createElement('div', { style: { width, height } }, null)
  }
  return {
    Spinner: () => null,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    SnackbarProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    Skeleton
  }
})

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
