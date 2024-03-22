# Utiliza la imagen oficial de Node.js como base
FROM node:18.16.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el cual se ejecuta tu aplicación
EXPOSE 8000

# Define el comando para iniciar tu aplicación
CMD ["npm", "start"]
