#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull snishanth/project1

# Run the Docker image as a container
docker run -d -p 5000:5000 snishanth/project1