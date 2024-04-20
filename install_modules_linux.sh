#!/bin/bash

# Get the absolute path of the script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate to the frontend directory
cd "$SCRIPT_DIR/frontend" || exit

# Install node modules for frontend
echo "Installing frontend node modules..."
npm install -f

# Navigate back to the root directory
cd "$SCRIPT_DIR" || exit

# Navigate to the backend directory
cd "$SCRIPT_DIR/backend" || exit

# Install node modules for backend
echo "Installing backend node modules..."
npm install -f

# Navigate back to the root directory
cd "$SCRIPT_DIR" || exit

echo "Node modules installation completed for both frontend and backend."
