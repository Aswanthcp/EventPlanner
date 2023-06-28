#!/bin/bash

echo "Createing Migration"
python manage.py makemigrations app

echo "Starting Migrations.."
python manage.py migrate

echo "Start Servier "
python manage.py runserver 0.0.0.0:8000

