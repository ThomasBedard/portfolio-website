# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy backend files
COPY ./portfolioapi /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "fastapi_mongodb_crud:app", "--host", "0.0.0.0", "--port", "8000"]
