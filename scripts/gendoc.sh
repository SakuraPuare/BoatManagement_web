#!/bin/bash

# Check if we're in the project root directory
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Create doc directory if it doesn't exist
mkdir -p doc

# Get API docs from backend
if wget http://localhost:8080/v3/api-docs/default -O docs/api.json; then
    echo "Successfully downloaded API documentation"
else
    echo "Error: Failed to download API documentation. Make sure the backend server is running."
    exit 1
fi


# Generate API documentation
if npx @openapitools/openapi-generator-cli generate -i docs/api.json -g html2 -o doc/api-docs; then
    echo "Successfully generated API documentation"
else
    echo "Error: Failed to generate API documentation"
    exit 1
fi

# generate api source code
if npx @openapitools/openapi-generator-cli generate -i doc/api.json -g typescript-axios -o src/api; then
    echo "Successfully generated API source code"
else
    echo "Error: Failed to generate API source code"
    exit 1
fi
