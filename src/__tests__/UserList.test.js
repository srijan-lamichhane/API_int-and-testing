import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from '../components/UserList';
import { jest } from '@jest/globals';

// Mock the global fetch
global.fetch = jest.fn();

describe('UserList Component', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders a list of users when fetch is successful', async () => {
    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Leanne Graham' }, { id: 2, name: 'Ervin Howell' }],
    });

    // Render the component
    render(<UserList />);

    // Wait for the users to be rendered
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });
  });

  test('displays an error message when the fetch fails', async () => {
    // Mock a failed fetch
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    // Render the component
    render(<UserList />);

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });

  test('displays an error message when the response is not ok', async () => {
    // Mock a non-ok response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    // Render the component
    render(<UserList />);

    // Wait for the error message to be rendered
    await waitFor(() => {
      // using (regex) for more flexible match
      expect(screen.getByText(/Error: Network response was not ok/i)).toBeInTheDocument();
    });
  });

  test('renders an empty list when no users are fetched', async () => {
    // Mock an empty user list
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    // Render the component
    render(<UserList />);

    // Verify that no users are rendered
    await waitFor(() => {
      expect(screen.queryByRole('listitem')).toBeNull();
    });
  });
});
