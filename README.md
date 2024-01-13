# News Project

Welcome to the documentation for the News Project! This Vue.js application fetches and displays articles using the New York Times API. It leverages the Axios library to handle API requests and is built with Vue 3's Composition API to showcase and experiment with this new feature.

## Live Demo

Explore the live demo of the News Project: [Live Demo](https://melodious-kataifi-64644e.netlify.app/)

## Features

- **Fetching Articles:**
  - Utilizes Axios to fetch articles from the New York Times API.

- **Filtering:**
  - Filter articles alphabetically by name, both in ascending (A-Z) and descending (Z-A) order, and date (Newest first, Oldest first).
  - Implements section filtering for categories such as technology, art, etc.

- **Card Display:**
  - Displays articles as cards with images, text content, and clickable section tags for further filtering.

- **Date Formatting:**
  - Utilizes the `dayjs` library for date formatting in Ukrainian style.

- **Article Redirection:**
  - Redirects users to the full article on the New York Times website on click.

## Technologies Used

- Vue 3 Composition API
- Axios for API requests
- Dayjs for date formatting
- SCSS for styling

## Getting Started

### Installation

To get started with the News Project, follow these steps:

1. **Clone the repository:**
2. **Navigate to the project directory:** cd news-project
3. **Install dependencies:**  npm install

These commands will clone the project repository, move into the project directory, and install all the necessary dependencies. Once the installation is complete, you're ready to use and explore the News Project.

### Usage

- Run the development server:
  npm run serve
  
- Access the app at [http://localhost:8080](http://localhost:8080).
- Explore the app to discover and filter news articles.


### Prerequisites
- Node.js and npm must be installed on your machine.

 ## Project Structure

- `src/` - Contains the source code and assets.
- `assets/` - Static assets like images.
- `components/` - Vue components for different parts of the app.
- `utils/` 

## Contributing

Contributions are welcome! If you find any issues or have improvements, feel free to create a pull request.

## License

This project is licensed under the MIT License.
