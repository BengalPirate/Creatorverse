#!/bin/bash
echo "Starting Creatorverse development server..."
echo "Opening http://localhost:5173 in your browser..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try to open the browser (works on macOS)
open http://localhost:5173 2>/dev/null || true

# Run the dev server
npm run dev