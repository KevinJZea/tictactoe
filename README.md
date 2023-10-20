# TicTacToe Game with Real-Time Multiplayer and In-Game Chat

This project is a real-time multiplayer TicTacToe game created using React, Tailwind CSS, Node.js, and Socket.io. It allows two users to play the classic game of TicTacToe in real-time over the internet and includes an in-game chat for communication between players.

## Features

- Real-time gameplay with WebSocket communication using Socket.io.
- Classic TicTacToe gameplay for two players.
- In-game chat to communicate with your opponent while playing.
- Responsive design built with Tailwind CSS for a great user experience on various devices.
- Scalable and customizable for further enhancements and improvements.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.

## Getting Started

To get this project up and running, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/kevinjzea/tictactoe.git
    cd tictactoe
    ```

2. Install dependencies for both the client and server:

    ```bash
    # Install client dependencies
    cd client
    yarn install

    # Install server dependencies
    cd ..
    npm install
    ```

3. Start the client and server in separate terminal windows:

    To start the client (front-end), run:

    ```bash
    cd client
    yarn dev
    ```

    The client will be accessible at http://localhost:5173.

    To start the server (back-end), run:

    ```bash
    cd ..
    yarn start
    ```

    The server will be accessible at http://localhost:3000.

4. Open a web browser and visit http://localhost:5173 to start playing TicTacToe with a friend in real-time while using the in-game chat for communication!

## Usage
- Player 1 and Player 2 can take turns to make their moves on the TicTacToe board.
- Use the in-game chat to communicate with your opponent.
- The game automatically detects a win, loss, or draw, and a notification will be displayed accordingly.
- Enjoy real-time gameplay and chat with your friend simultaneously!


## Contributing

Contributions are welcome! Please feel free to open an issue or create a pull request with any enhancements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements

- This project was inspired by the classic game of TicTacToe.
- We used Socket.io for real-time communication.

#### Enjoy the game and happy chatting! 🎮💬

Feel free to reach out if you have any questions or feedback.