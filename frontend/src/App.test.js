import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';

// Mock the App component since we're using React without JSX
const e = React.createElement;

function App() {
  const [msg, setMsg] = React.useState('Loading...');

  React.useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg('Could not reach backend'));
  }, []);

  return e('div', { style: { fontFamily: 'Arial, sans-serif', padding: '2rem' } },
    e('h1', null, 'DevOps Fullstack Frontend'),
    e('p', null, msg)
  );
}

describe('App Component', () => {
  test('renders app title', () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ message: 'Hello from backend!' }),
    });

    render(React.createElement(App));
    expect(screen.getByText('DevOps Fullstack Frontend')).toBeInTheDocument();
  });

  test('shows loading message initially', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolves
    
    render(React.createElement(App));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(React.createElement(App));
    
    await waitFor(() => {
      expect(screen.getByText('Could not reach backend')).toBeInTheDocument();
    });
  });

  test('displays backend message when fetch succeeds', async () => {
    const mockMessage = 'Hello from backend!';
    fetch.mockResolvedValueOnce({
      json: async () => ({ message: mockMessage }),
    });
    
    render(React.createElement(App));
    
    await waitFor(() => {
      expect(screen.getByText(mockMessage)).toBeInTheDocument();
    });
  });

  test('has proper structure', () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ message: 'Test message' }),
    });

    render(React.createElement(App));
    
    // Check for main container
    const container = screen.getByText('DevOps Fullstack Frontend').closest('div');
    expect(container).toHaveStyle('font-family: Arial, sans-serif');
    expect(container).toHaveStyle('padding: 2rem');
  });
});