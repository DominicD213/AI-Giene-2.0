# History Component

The `History` component allows users to view and search through their past queries and responses. It fetches the queries and displays them in a visually appealing layout, with a smooth scroll to the most recent queries. The user can also search through the query history to find specific results.

## Features

- Displays a search bar for querying past search history.
- Lists past queries and their responses in a visually structured format.
- Fetches and stores search history from the backend using the `useFetchQueriesHistory` hook.
- Smooth scrolling behavior when new queries are fetched.
- Supports searching through queries based on the input value.
- Automatically clears the search input when submitting the form.

## Dependencies

- **React**: For component rendering.
- **Redux**: For state management, including storing search history and query data.
- **TailwindCSS**: For utility-based styling and responsive design.

## File Structure

```plaintext
src/
├── components/
│   └── History.tsx  # Displays the query history and search bar
├── hooks/
│   └── historyService.ts  # Custom hook to fetch query history
└── Assets/
    └── whiteSearchIcon.png  # Search icon used in the search bar
