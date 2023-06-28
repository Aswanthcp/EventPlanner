# Use an official Python runtime as the base image
FROM python:3.9.16-alpine

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

# Copy the requirements file
COPY ../requirements.txt .

# Install dependencies
RUN pip3 install -r requirements.txt

# Copy the Django project files into the contain
ADD . /app




# EXPOSE 8000:8000

# CMD [ "gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application" ]
