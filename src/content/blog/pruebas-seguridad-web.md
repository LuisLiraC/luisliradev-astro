---
title: 'Pruebas de seguridad en aplicaciones web' 
description: '¿Alguna vez has tenido curiosidad sobre las pruebas de seguridad, pero no sabes por dónde empezar? En este artículo te traigo una guía para que puedas empezar a hacer pruebas de seguridad en tus aplicaciones web, basándonos en algunas de las vulnerabilidades más comunes mostradas en el Top 10 de OWASP.'
pubDate: 'Oct 23 2023'
heroImage: '/thumbnails/cat-security.webp'
---
¿Alguna vez has tenido curiosidad sobre las pruebas de seguridad, pero no sabes por dónde empezar? En este artículo te traigo una guía para que puedas empezar a hacer pruebas de seguridad en tus aplicaciones web, basándonos en algunas de las vulnerabilidades más comunes mostradas en el [Top 10 de OWASP](https://owasp.org/www-project-top-ten/), una organización sin fines de lucro que se dedica a mejorar la seguridad de las aplicaciones web.

La página usada para estas pruebas es [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), una aplicación web vulnerable que nos permite practicar y aprender sobre seguridad en aplicaciones web.

## Autenticación y autorización

[A01:2021-Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/) se refiere a cuando un usuario puede acceder a recursos que no debería poder acceder. Como permitir que un usuario no autenticado pueda acceder a una página que solo debería ser accesible por usuarios autenticados o cualquier usuario pueda acceder a la información de otro usuario.

En este ejemplo veremos como con el usuario `bender@juice-sh.op` podemos acceder a la información del usuario admin. Esto es provocado porque nuestro sistema no está validando correctamente que la información solicitada pertenece al usuario que está haciendo la petición. 

Para hacer esto primero tendríamos que tener sesión iniciada con el usuario.
![Broken Access Control](/blog-images/authorization-screenshot-1.webp)

Al ir al carrito y viendo la pestaña de Network en las herramientas de desarrollador, podemos ver que la petición que se hace para obtener la información del carrito y los headers que se envían en la petición. Aquí podemos ver que nuestro JWT se envía en el header `Authorization`.
![Broken Access Control](/blog-images/authorization-screenshot-2.webp)

Si vamos directamente a la URL que estamos viendo no funciona debido a que falta el header de `Authorization`.
![Broken Access Control](/blog-images/authorization-screenshot-3.webp)

Pero si usamos un cliente como Postman y enviamos el header `Authorization` con el JWT que obtuvimos en la petición anterior, podemos ver que nos responde con la misma información y ahí podemos ver que ese carrito pertenece al `UserId` número 3.
![Broken Access Control](/blog-images/authorization-screenshot-4.webp)

Ahora, cambiamos el ID del carrito que se está consultando por el número y hacemos de nuevo la petición nos responderá con la información del carrito del `UserId` número 1 que es el admin.
![Broken Access Control](/blog-images/authorization-screenshot-5.webp)

---

[A07:2021-Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/) se refiere a cuando nuestro sistema de autenticación no es seguro. Ya sea por permitir contraseñas débiles, por no tener un sistema de bloqueo de cuentas por intentos fallidos, por no tener un sistema de recuperación de contraseñas seguro, etc.

Por ejemplo, aquí podemos iniciar sesión usando las credenciales de email `admin@juice-sh.op` y password `admin123`, reflejando que no tenemos un control adecuado para validar la fortaleza de las contraseñas.

![Contraseña débil](/blog-images/auth-screenshot-1.webp)

![Contraseña débil](/blog-images/auth-screenshot-2.webp)

---

## Inyección de código malicioso

[A03:2021-Injection](https://owasp.org/Top10/A03_2021-Injection/) se refiere a cuando nuestro sistema no sanitiza la información que recibe y permite que se inyecte código malicioso en nuestra aplicación. Por ejemplo, en un sistema de búsqueda no limpiamos o validamos los términos de búsqueda, podríamos permitir que se inyecte código malicioso o si nuestras consultas a la base de datos no son parametrizadas alguien puede ejecutar consultas SQL para obtener información sensible.

Para la inyección de código malicioso vamos a ver dos de los ataques más comunes: SQL Injection y XSS (Cross Site Scripting).

### SQL Injection
Cuando hacemos consultas a la base de datos y no están parametrizadas o no usamos un URM (Object Relational Mapping) podemos permitir que se inyecte código malicioso. Por ejemplo, si tenemos un formulario de login y no parametrizamos la consulta alguien puede autenticarse sin necesidad de tener las credenciales correctas.

En este ejemplo lo que hacemos es escribir `' OR 1=1; --` en el campo de email y nos autenticamos como el usuario `admin`, no necesitamos saber su contraseña y por eso en el input de password podemos agregar cualquier cosa.

![SQL Injection](/blog-images/sql-injection-screenshot-1.webp)

![SQL Injection](/blog-images/sql-injection-screenshot-2.webp)

**¿Cómo funciona?**

La consulta en la base de datos está escrita de la siguiente manera:
```typescript
`SELECT * FROM Users WHERE email = '${req.body.email || ''}' AND password = '${security.hash(req.body.password || '')}' AND deletedAt IS NULL`
```

Sustituir los datos que nos llegan en la petición, en la query que se hará a la base de datos y quedará de la siguiente forma
```sql
SELECT * FROM Users WHERE email = 'user' AND password = 'hashed-password' AND deletedAt IS NULL
```

Esta misma implementación es la que permite que se pueda hacer SQL Injection, Al no hacer una query parametrizada, si nosotros enviamos `' OR 1=1; --` se inyecta en la query que va hacia la base de datos y la consulta queda así:
```javascript
`SELECT * FROM Users WHERE email = '' OR 1=1; -- ${req.body.email || ''}' AND password = '${security.hash(req.body.password || '')}' AND deletedAt IS NULL`
```

Y lo que recibirá la base de datos será esto:
```sql
SELECT * FROM Users WHERE email = '' OR 1=1; -- ' AND password = 'hashed-password' AND deletedAt IS NULL;
``` 

De esta forma la query siempre retornará un usuario y no importa que contraseña se envíe, y luego de eso me enviará el token de autenticación del primer usuario que haya encontrado.

### XSS (Cross Site Scripting)

Cuando no sanitizamos la información que recibimos y la mostramos en nuestra aplicación podemos permitir la ejecución de scripts no autorizados en nuestro sitio. Por ejemplo, si tenemos un sistema de comentarios o podemos compartir enlaces con términos de búsqueda en nuestro sitio, y no sanitizamos la información que ingresan los usuarios, los atacantes podrían inyectar scripts para que se ejecuten cuando alguien entre a nuestro sitio.

Aquí podemos ver que cuando nosotros ingresamos un término de búsqueda, después dle cliente renderiza todo tal cual nosotros lo escribimos.
![XSS](/blog-images/xss-screenshot-1.webp)

Ahora ingresamos `<img/src/onerror=prompt(8)>` esto lo que hará es intentar cargar la imagen de la propiedad `src`, lo cual fallará y al fallar ejecutará la instrucción que nosotros le colocamos en el fallback `onerror` que es `prompt(8)`, que lo que hace es mostrar un mensaje en el navegador con el número 8.
![XSS](/blog-images/xss-screenshot-2.webp)

Podemos ver que se ejecuta el script correctamente y también podemos encontrar el mismo script en el código fuente de la página.
![XSS](/blog-images/xss-screenshot-3.webp)

---

## Exposición de datos sensibles o problemas de cifrado

[A02:2021-Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) principalmente hace referencia a errores en la implementación de cifrado y descifrado de información. Por ejemplo, si usamos un algoritmo de cifrado débil o si no ciframos la información que se envía a través de la red. Aquí también podemos encontrar lo que anteriormente se llama Sensitive Data Exposure.

### Sensitive Data Exposure

Cuando exponemos información sensible de alguna forma, aunque no se vea directamente en nuestro sitio. Por ejemplo, si tomamos el JWT que nos regresa el servidor y lo decodificamos con alguna herramienta como [jwt.io](https://jwt.io/), podríamos encontrar información sensible como contraseñas o la posibilidad e encontrar tokens de acceso a otras partes de nuestro sistema.

![Sensitive Data Exposure](/blog-images/data-exposure-screenshot-1.webp)

También, combinado con el problema de Autenticación y Autorización, podríamos dejar acceso libre a una ruta de nuestro servidor donde algún atacante podría encontrar información útil para atacar nuestro sistema.

![Sensitive Data Exposure](/blog-images/data-exposure-screenshot-2.webp)

---
#### Con esto ya puedes comenzar a hacer pruebas de seguridad en tus aplicaciones web

Estas son solo algunas de las vulnerabilidades que podemos encontrar en nuestras aplicaciones web, pero son las más comunes y las que más se explotan. Si quieres aprender más sobre seguridad en aplicaciones web te recomiendo que visites la página de [OWASP](https://owasp.org/) y que leas el [Top 10 de OWASP](https://owasp.org/www-project-top-ten/).

Además, para ejecutar estas pruebas no es necesario que seas un experto o una experta en ciberseguridad o en desarrollo web, solo necesitas tener curiosidad y ganas de aprender 🚀.
