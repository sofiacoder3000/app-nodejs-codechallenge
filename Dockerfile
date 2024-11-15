# Usar la imagen oficial de Node.js 20
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "run", "start:prod"]
