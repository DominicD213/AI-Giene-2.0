# SearchBar Component

The `SearchBar` component provides an input field for users to type and submit queries. The component integrates with the application’s state and performs conditional rendering based on the user's login status and loading state.

## Features

- **Dynamic Placeholder Text**: Displays a different placeholder depending on whether the user is logged in or not. If not logged in, it prompts the user to log in.
- **Search Button**: Allows users to submit their search queries. The button displays a loading state when a request is in progress and becomes disabled to prevent repeated submissions.
- **Input Management**: The input is managed using local state (`inputValue`), which is cleared after submission.

## Dependencies

- **React**: For building the component and handling events.
- **Redux**: For accessing global state, such as login status and loading state.
- **TailwindCSS**: For utility-based styling and responsive design.

## File Structure

```plaintext
src/
├── components/
│   └── SearchBar.tsx  # The search bar component for querying
├── hooks/
│   └── searchBarService.ts  # Custom hook for managing search functionality
├── store/
│   └── store.ts  # Redux store that contains global states like login and loading
