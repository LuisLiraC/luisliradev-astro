---
title: 'Por qué hacer Over Engineering'
description: 'Over Engineering es cuando nos gusta complicarnos la vida, algo como ser masoquistas, pero programando. Cuando estamos creando un proyecto y queremos sufrir por voluntad propia porque para un problema sencillo usamos una solución compleja. De hecho, este sitio es una muestra de eso.'
pubDate: 'Dec 12 2021'
heroImage: '/thumbnails/cat.jpg'
---

**_Over Engineering_** es cuando nos gusta complicarnos la vida, algo como ser masoquistas, pero programando. Cuando estamos creando un proyecto y queremos sufrir por voluntad propia porque para un problema sencillo usamos una solución compleja. De hecho, este sitio es una muestra de eso.

Este Portafolio/Blog que hice aproximadamente en 10 días, aunque aún le falten cosas, pude haberlo hecho en unas horas y solo con unos cuantos clics, comandos en una consola o simplemente pagando una suscripción a un sitio que me diera todo esto listo.

Antes de explicarte por qué decidí hacerlo de esta forma, primero quiero aclararte que hacer _over engineering_ no es una decisión que siempre debes tomar; tienes que hacerlo con un objetivo, una buena justificación y sabiendo que tienes los recursos disponibles para hacerlo.

### Pero, ¿qué necesidad, para qué tanto problema?

Recomiendo esto cuando estás creando un proyecto personal que está enfocado en mejorar o aplicar lo que has aprendido. Como te dije, hacer esto debe tener una justificación, objetivo y recursos. En mi caso, estas fueron:

- Quiero crear un proyecto más complejo a lo que ya he hecho.
- Quiero aprender a integrar diferentes herramientas.
- Tengo el tiempo para hacerlo.

### ¿Cuáles eran mis opciones?

![Screenshot](https://luisliradev.azureedge.net/blog/2021/12/13121_Screenshot_1.png)

La solución fácil pudo haber sido pagar Ghost Pro, escoger un tema y tal vez personalizarlo; con eso ya tendría todo listo para crear mi blog.

La de complejidad media pudo haber sido pagar en AWS o en Digital Ocean por algún servicio que montara todo por mí y que yo solo tuviera que configurar algunos detalles.

La solución que escogí, que aunque no sea la más compleja, es la que sentía que me representaba un reto lograble: _Usar Ghost como Headless CMS que hostearía yo mismo en un droplet de Digital Ocean, crear el frontend con Next.js, configurar Nginx y todo lo relacionado con el dominio y certificado SSL_.

### ¿Y qué pasó?

Crear todo en local siempre es sencillo; todo comienza de forma fluida. Al momento de hacer el deploy en Digital Ocean fue cuando se complicó. Contaré la versión corta:

Me quedé sin acceso al primer droplet que hice porque rápidamente en el firewall de Ubuntu desactivé las conexiones SSH, entonces tuve que empezar toda la configuración desde cero. Aprendí a usar más comandos de la terminal de Linux, configuré Nginx para tener acceso a mi proyecto de Next.js y panel de administración de Ghost por medio de mi dominio. Entendí cómo funciona la API de Ghost y más sobre el funcionamiento de Next.js. También conocí los archivos _ecosystem_ de PM2 y la forma en que funcionan las variables de entorno al momento de correr procesos con esa herramienta.

Creí que ya todo estaba resuelto, pero me di cuenta de que me faltaba una parte muy importante: el alojamiento de imágenes. Estaba fallando porque Ghost las guardaba con una ruta absoluta y esta apuntaba a localhost. Una solución que se me ocurrió fue alojarlas con Imgur y solo poner el enlace público para usarlas, pero no, aquí venimos a hacer _over engineering_.

![Image](https://luisliradev.azureedge.net/blog/2021/12/13119_ab67616d0000b273950359444321d635b59838b3.jpg)

Decidí agregar a Ghost un sistema de almacenamiento personalizado. Consulté la documentación y vi la forma de conectarlo a un Bucket de S3 en AWS y lo logré, después de pelear 2 horas con un JSON porque no me di cuenta de que estaba poniendo una coma de más en la configuración. Aunque luego decidí migrar este almacenamiento a Azure Blob Storage. ¡Y listo! Ahora todo está funcionando perfectamente, pero aún faltan muchas cosas por hacer. Quiero aprender a usar los Webhooks de Ghost, implementar SEO y herramientas como Google Analytics, descubrir la forma de hacer automáticos los deploys cada vez que subo mis cambios al repositorio de GitHub y más cosas que se me puedan ocurrir.

### Mi conclusión

Hacer _over engineering_ para este tipo de proyectos es una de las mejores cosas que puedes hacer si quieres mejorar tus habilidades y conocimientos al crear aplicaciones. No todo lo podrás aprender en tu trabajo y no siempre trabajarás con las herramientas que quieras aprender. En ocasiones tendrás que "ensuciarte las manos" y meterle complejidad a las cosas por tu cuenta. Aunque si tu objetivo es crear un MVP o el proyecto es para tu trabajo, es algo que no recomiendo que hagas; pero si lo haces ahora con tus proyectos, podrás aplicar todo lo que aprendas cuando estés en esas situaciones si llega a ser necesario.
