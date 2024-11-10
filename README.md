# Sneakers Store

## Description
Sneakers Store is a web application showcasing information about sneakers and providing interactive features for user engagement. The project includes functionalities like user login, theme switching, background color changes, displaying the current date and time, and a contact form.

## Features
- **Login and Logout**: Allows users to log in by entering a username. The logged-in state is saved using `localStorage`.
- **Theme Toggle**: Users can switch between light and dark themes, with the chosen theme saved in `localStorage`.
- **Background Color Change**: Clicking the "Change Background Color" button changes the background color randomly and saves it for persistence.
- **Contact Form**: Includes a contact form with validation.
- **FAQ Accordion**: A section with collapsible items for frequently asked questions.
- **Greeting with Audio**: Users can enter their name and receive a personalized greeting with an audio message.
- **Display of Current Date and Time**: Shows the current date and time, updated every second.

## File Structure
- `index.html`: The main HTML file containing the primary structure of the application.
- `about.html`: Additional page for information and the contact form.
- `styles.css`: The CSS file with all styling rules, including dark theme styles, accordion, form, button, and navigation styles.
- `script.js`: The JavaScript file that handles interactive features like login, logout, theme toggling, background color changes, and form validation.

## Installation
1. Download all project files and ensure they are in the same directory.
2. Ensure the following files are present:
   - `index.html`, `about.html`
   - `styles.css`
   - `script.js`
   - A greeting audio file named `greet.mp3` in the root folder (or specify the path in HTML).

## Usage
### Launching the Project:
- Open the `index.html` file in any modern browser (Google Chrome, Firefox, Edge, etc.).

### Login and Logout:
- Enter your username in the login form and click "Login". Your name will be saved in `localStorage`, and the login state will persist on page reload.
- Click "Logout" to log out.

### Theme Toggle:
- Click the "Toggle Day/Night Theme" button to switch between light and dark themes. The theme preference will be saved in `localStorage`.

### Background Color Change:
- Click "Change Background Color" to select a random background color, which will also be saved.

### Contact Form Submission:
- Fill in and submit the contact form. Errors, if any, will be displayed, and a confirmation message appears on successful submission.

### Greeting:
- Enter your name in the "Enter Your Name" field and click "Greet Me". A greeting message appears along with an audio effect.

### FAQ Accordion:
- The "Frequently Asked Questions" section contains expandable items for easy information access.

### Current Date and Time:
- The current date and time are displayed at the bottom of the page and update automatically.

## Additional Information
- **Bootstrap**: The project uses the Bootstrap library for styling and a responsive layout.
- **LocalStorage**: Stores data for the current user, selected theme, and background color to maintain state on page reload.

## Environment Requirements
- A modern browser that supports HTML5, CSS3, and JavaScript.
- Internet connection for loading Bootstrap styles and components (if using CDN).

## Author
Developed by Danial Samat.

