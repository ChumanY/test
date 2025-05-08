# Welcome to your Expo app 👋

## Instrucciones para Configurar el Proyecto

### 1. Clonar el Repositorio
Clona este repositorio en tu máquina local:

### 2. Instalar Dependencias
Instala las dependencias necesarias ejecutando:
```bash
npm install --legacy-peer-deps
```

### 3. Configurar Docker
Carga las imágenes de Docker necesarias y levanta los contenedores:
```bash
docker load -i mongo-test.tar
docker load -i test-api.tar
docker-compose up -d
```

### 4. Iniciar el Proyecto
Ejecuta el siguiente comando para iniciar el proyecto:
```bash
npm run start
```

### 5. Acceso a la Aplicación
Una vez iniciado, accede a la aplicación desde tu navegador o dispositivo móvil según las instrucciones específicas del proyecto.

## 2. Generar el APK (Android)

### Pasos para Generar el APK
1. Instala `eas-cli` si no lo tienes:
   ```bash
   npm install -g eas-cli
   ```

2. Configura Expo para producción en el archivo `app.json`:
   ```json
   {
     "expo": {
       "android": {
         "package": "com.test.app"
       }
     }
   }
   ```

3. Ejecuta el siguiente comando para construir el APK:
   ```bash
   eas build --platform android
   ```

4. Una vez completado, Expo te proporcionará un enlace para descargar el APK.

---

## 3. Generar el IPA (iOS)

### Pasos para Generar el IPA
1. Configura Expo para iOS en el archivo `app.json`:
   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.test.app"
       }
     }
   }
   ```

2. Ejecuta el siguiente comando para construir el IPA:
   ```bash
   eas build --platform ios
   ```

3. Necesitarás una cuenta de desarrollador de Apple para completar este paso.

4. Una vez completado, Expo te proporcionará un enlace para descargar el IPA.

---

## 4. Despliegue Web

### Pasos para Construir y Desplegar la Aplicación Web
1. Configura Expo para web en el archivo `app.json`:
   ```json
   {
     "expo": {
       "web": {
         "favicon": "./assets/images/favicon.png"
       }
     }
   }
   ```

2. Ejecuta el siguiente comando para construir la aplicación web:
   ```bash
   expo build:web
   ```

3. Una vez completado, los archivos estarán en la carpeta `web-build/`.

4. Sube los archivos de la carpeta `web-build/` a un servicio como:
   - [Vercel](https://vercel.com/)
   - [Netlify](https://www.netlify.com/)
   - Cualquier servidor web de tu elección.
  
## Validación de Imágenes
### Login Screen
![image](https://github.com/user-attachments/assets/3145009a-c954-478d-a386-06d27eabdb2a)
### Dashboard Screen
![image](https://github.com/user-attachments/assets/3cfe812e-a2c8-4b41-baeb-c76fb3aa5cab)
### Api Response 
![image](https://github.com/user-attachments/assets/9212759a-3019-4284-a0da-f16ebf8f1beb)
### Loading Screen
![image](https://github.com/user-attachments/assets/e2063dcd-866f-40e4-89a0-409bbf2ae0ea)





