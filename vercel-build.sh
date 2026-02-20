#!/bin/bash
echo "Building Project..."

# 1. Clean and Create Output Directory
rm -rf public
mkdir public

# 2. Copy Static Site (Root) to 'public'
echo "Copying static site..."
cp index.html public/
cp -r css public/
cp -r js public/
cp -r assets public/

# 3. Build Admin Dashboard (React)
echo "Building Admin Dashboard..."
cd admin-dashboard/client
npm install
npm run build

# 4. Move Admin Build to 'public/admin'
echo "Moving Admin Dashboard to public/admin..."
mkdir -p ../../public/admin
cp -r dist/* ../../public/admin/

# 5. Install Backend Dependencies (for Serverless Functions)
echo "Installing Server Dependencies..."
cd ../server
npm install
npx prisma generate

echo "Build Complete!"
