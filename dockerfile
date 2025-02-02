FROM node:20.18.0 
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . /app
EXPOSE 5000
CMD ["node","app.js"]