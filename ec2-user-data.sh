#!/bin/bash

# Update all packages
sudo apt update
sudo apt upgrade -y

# Install Git, curl, GCC and other build dependencies
sudo apt install -y git build-essential

# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Confirm versions
node -v
npm -v

# Install PM2 globally
sudo npm install -g pm2

# Install PostgreSQL 14
sudo apt install -y postgresql postgresql-contrib
sudo apt clean metadata
sudo apt install -y postgresql-server postgresql-contrib

# Initialize PostgreSQL database
sudo /usr/bin/postgresql-setup initdb

# Enable and start PostgreSQL service
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create PostgreSQL user and database
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE newscove OWNER postgres;"

# OPTIONAL: Clone your Node.js project from GitHub
cd /home/ubuntu
git clone https://github.com/arunajain/newscove.git newscove
cd newscove

# Set environment variables 
# echo "NEWS_API_KEY=your_key" >> .env

# Install project dependencies
npm install

# Start your app with PM2
pm2 start app.js --name newscove

# Set PM2 to auto-start on reboot
pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 save