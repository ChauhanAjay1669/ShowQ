#!/bin/bash
echo "=== ShowQ GitHub Upload Script ==="
echo ""

# Add all files
echo "Step 1: Adding files to Git..."
git add .

# Commit changes
echo "Step 2: Committing changes..."
git commit -m "Initial commit: ShowQ cinema booking application with modern UI"

# Add remote (or update if exists)
echo "Step 3: Setting up remote repository..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/ChauhanAjay1669/ShowQ.git

# Rename branch to main
echo "Step 4: Renaming branch to main..."
git branch -M main

# Push to GitHub
echo "Step 5: Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "=== Upload Complete! ==="
echo "Your code is now on GitHub: https://github.com/ChauhanAjay1669/ShowQ"
