# Intro Component

The `Intro` component serves as the introduction section of the AI-Giene application, showcasing a personal introduction to the creator, Dominic Digiacomo, along with an image and a brief description of the application and its features.

## Features

- **Personal Photo**: Displays a circular image of the creator (Dominic Digiacomo), which is only visible on large screens (lg and up) for responsiveness.
- **Text Introduction**: Provides a text introduction about the project and the creator, including a brief biography and description of the AI-Giene project.
- **Responsive Design**: The component adapts to screen size, showing the image only on larger screens while keeping the text visible on all screen sizes.

## Dependencies

- **React**: For component rendering and dynamic content.
- **TailwindCSS**: For responsive design and utility-based styling.

## File Structure

```plaintext
src/
├── components/
│   └── Intro.tsx  # Introduction section with personal details and description of the project
├── Assets/
│   └── personalPhoto.png  # Personal photo of the creator
