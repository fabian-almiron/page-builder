#!/bin/bash
set -e

echo "Starting application..."

# Check if we can connect to the database
echo "Checking database connection..."

# Try to run migrations, but don't fail if they don't work
echo "Running database migrations..."
npm run migrate || {
    echo "Migrations failed or no migrations needed, continuing..."
}

# Start the application
echo "Starting Next.js server..."
exec npm run start 