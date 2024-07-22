# Pasarela de Pagos
## Configuración de la pasarela de Pagos
1. [De momento esto se puede prescindir] Configuraciones para desarrollo: ngrok sirve para levantar servidores https en base a nuestro local-
-Antes de probar la pasarela de pagos en local, crear una cuenta en ngrok y comandar en consola: .\ngrok authtoken [token]; una vez habilitadas las credenciales, ejecutar ngrok en nuestro proyecto: .\ngrok.exe http [ruta de nuestro host (por ejemplo: http://localhost:3001)] el Forwarding que nos brinda lo podemos usar en una variable de entorno para recibir los webhooks en nuestro proyecto.
2. Abrir (o crear) una cuenta de prueba en mercado pago. Credenciales de prueba: 
**Usuario: TESTUSER938717775**
**Constraseña: inbTu9dtDn**
También se recomienda crear una integración propia desde **https://www.mercadopago.com.ar/developers/es** para generar el token, pero en su defecto utilizar: **APP_USR-7425380655616699-071912-826535ba43cbd960699673faaa3ec4ba-1909705750**, almacenarla como variable MP_TOKEN en el .env
3. Preferencias de pago. Son parámetros que definen nuestro pago en la base de datos de Mercado Pago, en caso de querer modificar la preferencia actual, está configurada en payments/mercadopago.config.js
4. Una vez hechas las configuraciones, el endpoint /api/v1/donation/donate recibe dos valores: un amount que es el monto a donar, y un external_reference que es el id de la donación. El endpoint nos devuelve un **init_point** que es la ruta que enviamos al frontend para que redirija a nuestros usuarios hacia el checkout.
5. Pagar y al completarse la operación, de la ruta respuesta se extraen los valores: status y external_reference.

👨🏽‍💻 Falta editar algunos detalles, está en proceso

