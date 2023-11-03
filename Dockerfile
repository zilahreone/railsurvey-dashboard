# pull the Node.js Docker image
# FROM node:alpine
FROM node:18-alpine As build

# create the directory inside the container
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

# copy the package.json files from local machine to the workdir in container
# COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

RUN npm run build
# our app is running on port 5000 within the container, so need to expose it
# EXPOSE 5000

FROM nginx:stable-alpine
# COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/dist  /usr/share/nginx/html

# the command that starts our app
# CMD ["node", "index.js"]