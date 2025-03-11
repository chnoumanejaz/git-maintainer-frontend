# Git Maintainer Frontend

This project is the frontend for the Git Maintainer platform. It provides a beautiful, user-friendly interface built with Next.js, ShadCN UI, and integrates seamless validations using Zod. The frontend interacts with the backend (Git Maintainer Backend) to help users with coding tasks and GitHub repository management.

## Features

- **User Authentication**: Users can sign up, log in, and securely manage their accounts.
- **GitHub Integration**: Users can connect their GitHub account by providing their GitHub username and authentication token.
- **AI-Powered Coding Assistance**: Users can enter coding-related questions, and the frontend will interact with the backend AI agent to perform various GitHub-related tasks.
- **GitHub Repository Management**: Users can specify a repository name and receive assistance with managing the repository, including:
  - Creating new private repositories if they don't exist.
  - Solving coding questions and creating files.
  - Pushing code changes to repositories with descriptive commit messages.
- **Input Validation**: The frontend uses **Zod** for schema-based form validation, ensuring user inputs are properly validated before submission.
- **Beautiful UI**: The UI is built using **ShadCN**, providing a clean, responsive, and modern design for a better user experience.

## Technology Stack

- **Next.js**: The frontend is built using Next.js for fast server-side rendering, React, and easy routing.
- **ShadCN UI**: For building a beautiful, fully responsive UI with pre-designed components, making the interface aesthetically pleasing and easy to use.
- **Zod**: Used for input validation on forms, ensuring the correctness of user data through schema-based validation.
- **Tailwind CSS**: For custom styling, enabling a highly flexible and responsive layout.
- **Axios**: For making API requests to the backend.
- **React**: The UI is built with React components for a smooth and dynamic user experience.

## Installation

To get started with this project, clone the repository and set up the environment:

1. Clone the repository:
    ```bash
    git clone https://github.com/chnoumanejaz/git-maintainer-frontend.git
    ```

2. Navigate into the project directory:
    ```bash
    cd git-maintainer-frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Sign Up & Log In**: Use the login or signup pages to create an account and log in. The authentication process will securely store your credentials.
2. **Connect to GitHub**: Once logged in, provide your GitHub username and personal access token to connect your GitHub account.
3. **Submit Coding Prompts**: Enter a coding-related prompt, specify the number of commits you want, and provide a repository name. The frontend will send the request to the backend, which will handle repository creation (if necessary), solve the coding problem, and push the changes to the GitHub repository.

## Contributing

We welcome contributions! Feel free to fork the repository and create a pull request for any bug fixes, feature requests, or improvements. Please ensure your code follows the existing style and includes tests where applicable.

## License

This project is open-source and available under the MIT License.

---

**Note**: This frontend repository depends on the [Git Maintainer Backend](https://github.com/chnoumanejaz/git-maintainer-backend). Please ensure that the backend is up and running before using this frontend.

