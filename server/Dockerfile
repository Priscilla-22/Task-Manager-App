# Use the official Python image from Docker Hub
FROM python:3.10-slim

# Install system dependencies first
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libbrlapi-dev \
    bpfcc-tools \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Create and activate a virtual environment
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install dependencies within the virtual environment
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI project files to the container
COPY . .

# Expose the desired port (for example, 5000)
EXPOSE 5000

# Set the command to run FastAPI app using uvicorn (change the port to 5000)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
