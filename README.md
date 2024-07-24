# Blogging Website - VicharSpace

Welcome to **VicharSpace**, a unique blogging platform where stories and thoughts come alive. Our platform provides a space for writers and readers to share and explore a wide array of content, ranging from personal experiences to creative writing, all presented in a seamless and engaging manner.

## Features

- **User Authentication**: Secure login and registration for writers and readers.
- **Post Creation and Management**: Easy-to-use interface for creating, editing, and managing blog posts.
- **Commenting System**: Engage with the community through comments and discussions.
- **Responsive Design**: Accessible on all devices, ensuring a great reading experience on mobile, tablet, and desktop.
- **Search and Filter**: Quickly find posts by title, author, or tags.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Hono
- **Database**: Postgres SQL with Prisma and Prisma Accelerate
- **Deployment**: Cloudflare Workers

## Getting Started

Follow these steps to run the project on your local environment:

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.22.x)
- MongoDB

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/jha-niraj/Vichar-Space.git
    cd Vichar-Space
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root of the project and add the following variables:

    ```plaintext
    
    DATABASE_URL=your_postgres_connection_string_with_prisma_accelerate_enabled
    DIRECT_DATABASE_URL=your_original_postgres_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. **Start the backend server**:

    ```bash
    npm run dev
    # or
    yarn server
    ```

2. **Start the frontend development server**:

    Open a new terminal and run:

    ```bash
    npm run dev
    # or
    yarn start
    ```

### Accessing the Application

Open your browser and navigate to `http://localhost:3000` to see the application running.

## Contributing

We welcome contributions to improve KathaSagar. To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Thank you for visiting KathaSagar. We hope you enjoy the journey of stories and thoughts!

