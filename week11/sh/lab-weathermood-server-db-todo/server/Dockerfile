# Define from what image we want to build our own image from.
FROM node:latest

ENV PG_USERNAME=postgres
ENV PG_PASSWORD=0910shc
ENV PG_HOSTNAME=localhost
ENV PG_PORT=5432
ENV PG_DB_NAME=weathermood

# Create the working directory that holds the application code inside our image.
WORKDIR /app

# Install app dependencies inside our image.
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

# Bind app to the specified port to be mapped by the Docker daemon.
EXPOSE 8080

# Define the command to run app.
CMD ["node", "src/server.js"]
