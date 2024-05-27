# Interactive Campground Management Platform

## Overview

This repository contains the code and configuration files for the Interactive Campground Management Platform, a feature-rich web application designed for managing campgrounds. The platform supports various user interactions such as registration, image uploads, and reviews, and includes secure authentication and real-time geographic visualizations using Mapbox.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Docker**
- **Kubernetes**
- **Jenkins**

## Features

- **User Registration and Authentication**: Secure user registration and login functionality.
- **Image Uploads**: Users can upload images of campgrounds using Cloudinary.
- **Reviews**: Users can leave reviews for campgrounds.
- **Geographic Visualizations**: Real-time map integration using Mapbox to display campground locations.
- **CI/CD Pipeline**: Implemented using Jenkins, incorporating SonarQube for code quality checks and Trivy for Docker image security scans.
- **Kubernetes Management**: Configuration and secrets management using Kubernetes for enhanced security.
- **Optimized Scaling and Load Balancing**: Ensured efficient resource management and consistent performance using Kubernetes.

## Prerequisites

- Kubernetes Cluster
- kubectl (Kubernetes command-line tool)
- Docker
- Cloudinary Account
- Mapbox Account
- MongoDB Database

## Configuration

### Secret Configuration (`secret.yaml`)

This file contains sensitive data stored as Kubernetes secrets. Replace the encoded values with your own base64-encoded credentials.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dhruv-camp-secrets
type: Opaque
data:
  CLOUDINARY_CLOUD_NAME: <Your Base64 Encoded Cloudinary Cloud Name>
  CLOUDINARY_KEY: <Your Base64 Encoded Cloudinary API Key>
  CLOUDINARY_SECRET: <Your Base64 Encoded Cloudinary API Secret>
  MAPBOX_TOKEN: <Your Base64 Encoded Mapbox Token>
  DB_URL: <Your Base64 Encoded MongoDB URL>
  SECRET: <Your Base64 Encoded Secret Key>
```

### Deployment Configuration (`deployment.yaml`)

This file defines the deployment of the application, including the container image, environment variables, and probes for liveness and readiness.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dhruv-camp-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: dhruv-camp
  template:
    metadata:
      labels:
        app: dhruv-camp
    spec:
      containers:
        - name: dhruv-camp-container
          image: dhruv999ddrr/campa:latest
          ports:
            - containerPort: 3000
          env:
            - name: CLOUDINARY_CLOUD_NAME
              valueFrom:
                secretKeyRef:
                  name: dhruv-camp-secrets
                  key: CLOUDINARY_CLOUD_NAME
            - name: CLOUDINARY_KEY
              valueFrom:
                secretKeyRef:
                  name: dhruv-camp-secrets
                  key: CLOUDINARY_KEY
            - name: CLOUDINARY_SECRET
              valueFrom:
                secretKeyRef:
                  name: dhruv-camp-secrets
                  key: CLOUDINARY_SECRET
            - name: MAPBOX_TOKEN
              valueFrom:
                secretKeyRef:
                  name: dhruv-camp-secrets
                  key: MAPBOX_TOKEN
            - name: DB_URL
              valueFrom:
                secretKeyRef:
                  name: dhruv-camp-secrets
                  key: DB_URL
            - name: SECRET
              valueFrom:
                secretKeyRef:
                  name: dhruv-camp-secrets
                  key: SECRET
          livenessProbe:
            httpGet:
              path: /
              port: 3000
            initialDelaySeconds: 30
          readinessProbe:
            httpGet:
              path: /
              port: 3000
            initialDelaySeconds: 30
```

### Service Configuration (`service.yaml`)

This file configures the service to expose the application.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: dhruv-camp-service
spec:
  selector:
    app: dhruv-camp
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: LoadBalancer
```

## Deployment

To deploy the application, follow these steps:

1. Apply the secret configuration:

   ```sh
   kubectl apply -f secret.yaml
   ```

2. Apply the deployment configuration:

   ```sh
   kubectl apply -f deployment.yaml
   ```

3. Apply the service configuration:

   ```sh
   kubectl apply -f service.yaml
   ```

## Environment Variables

The following environment variables are required for the application to run correctly. These should be stored as Kubernetes secrets:

- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_KEY`: Your Cloudinary API key.
- `CLOUDINARY_SECRET`: Your Cloudinary API secret.
- `MAPBOX_TOKEN`: Your Mapbox token.
- `DB_URL`: Your MongoDB connection URL.
- `SECRET`: A secret key for your application.
