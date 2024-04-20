#!/bin/bash

# Check the operating system
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # If Linux, execute the Linux script
    echo "Detected Linux OS."
    ./install_modules_linux.sh
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # If Windows, execute the Windows script
    echo "Detected Windows OS."
    ./install_modules_windows.bat
else
    # If not Linux or Windows, print an error
    echo "Unsupported operating system."
fi
