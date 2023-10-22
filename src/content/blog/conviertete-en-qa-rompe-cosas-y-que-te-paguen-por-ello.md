---
title: 'Conviérte en QA: rompe cosas y que te paguen por ello'
description: '¿Te gusta romper cosas y encontrar errores de software? ¿Siempre que estás en una aplicación piensas "¿qué pasa si hago esto?" y esperas que algo falle?'
pubDate: 'Dec 26 2021'
heroImage: '/thumbnails/cat-qa.webp'
---
**¿Te gusta romper cosas y encontrar errores de software?** ¿Siempre que estás en una aplicación piensas "¿qué pasa si hago esto?" y esperas que algo falle?

Entonces, el rol de **Quality Assurance (QA)** te gustará.

![Break it](/blog-images/yeah-break-it.jpeg)

Actualmente, tengo cerca de 9 meses trabajando como QA y 1 año estudiando sobre el rol y sus funciones. Entonces, ya tengo, por lo menos, una noción básica de cómo podrías llegar a serlo tú también o si solo quieres conocer cómo es nuestro trabajo.

Aclaremos, ¿qué es ser QA? La mayoría pensamos que este rol solo se encarga de encontrar bugs, sí lo hacemos, es parte de nuestras tareas, pero no es lo único. Como su nombre lo dice, nos aseguramos de la calidad... ¿pero qué diablos es calidad?

De acuerdo con el **ISTQB (International Software Testing Qualifications Board)**, la calidad se define como: ["El grado en que un componente o sistema satisface las necesidades declaradas e implícitas de sus diversas partes interesadas"](https://glossary.istqb.org/en/term/quality-3). En mis palabras, "que haga lo que debe de hacer".

## Lo que yo he aprendido

En estos casos siempre existe una gran cantidad de opiniones sobre el "roadmap" correcto, por eso yo te contaré mi proceso y lo que fui aprendiendo para mi trabajo.

Empecemos con los fundamentos. Hay conceptos básicos que debes conocer, como qué es White Box Testing, Black Box Testing y Gray Box Testing. También sobre los tipos de testing, como Funcional (Unit Testing, Smoke Testing, Regression Testing, etc.) y No funcional (Load Testing, Security Testing, etc.) y los 7 principios de QA.

Con eso ya tienes una base sólida para el arranque. Ahora aprende lo que sería. Investiga cómo crear un Plan de pruebas, cómo reportar bugs, además de saber diferenciar los tipos de bugs. Esto último es importante ya que a los desarrolladores deberás indicarles lo más claro posible cómo es que un bug sucede y en qué condiciones para que puedan reproducirlo y solucionarlo.

![Test chasing developer](/blog-images/tester-chasing-developer.jpeg)

Wait, wait, wait... ¿cómo que un Plan de pruebas? ¿De dónde sale o qué es? Te lo dije, encontrar bugs y romper cosas no es nuestro único trabajo, solo es la parte más divertida. El proceso de QA no empieza luego de la programación. Comienza desde la planeación de esa feature o software. O sea, tienes que estar en comunicación constante con tu PM/PO para definir qué es la calidad de ese producto y qué esperan los stakeholders.

Ten claro el objetivo por el que se está haciendo, revisa wireframes y mockups para comenzar a evaluar que todas las opciones de lo que hará esta nueva feature y que todas estas tengan un camino claro de lo que deberá hacer X, Y o Z acción. Si tienes dudas o no hay algo definido de lo que debe pasar, revísalo con tu PM/PO. De esta forma cuando llegue a desarrollo todo será claro para quien lo programe.

Con todos estos flujos claros podrás crear tu **Plan de pruebas** para cuando llegue el momento del testing, teniendo claro qué se desarrollará, cómo deberás probarlo, considerando casos de uso extraños, conocidos como "edge cases", y si algo falla, determina con tu PM/PO y devs si debe corregirse pronto o si solo se incluirá en el backlog para la siguiente iteración.

Esto que acabo de explicarte es la forma más resumida en la que pude decirte parte de lo que aprendí leyendo el libro **Agile Testing Condensed: A Brief Introduction** de Janet Gregory y Lisa Crispin.

Una vez que hayas creado tu plan de pruebas, hecho testing y que se lance a producción, ¿ya se termina tu trabajo? Pues no, tendrás que asegurarte de que efectivamente esté funcionando bien en producción. Estamos trabajando con software, el software está roto, y es mejor que hagamos "double-check".

**¿Ahora sí, ya es todo?**

**Nope x2.** Para algunas personas esto podría ser suficiente y también en algunas empresas, pero si quieres ir a un nivel avanzado de las pruebas manuales, deberás adentrarte en el mundo de la **automatización**. La automatización se puede hacer de muchas formas. En algunas empresas, puedes hacerlo usando una herramienta y, con algunos clics, puedes automatizar. Sin embargo, en otras, deberás escribir código.

La automatización se usa comúnmente con [Selenium](https://www.selenium.dev/), aunque existen otras herramientas como [Playwright](https://playwright.dev/), [Appium](https://appium.io/) para aplicaciones móviles, [Cypress](https://www.cypress.io/), y otras, según el tipo de testing que necesites. Las mencionadas son comunes para simular las acciones de un usuario y realizar pruebas end-to-end (E2E). Además, existen pruebas de carga o estrés que podrían ser realizadas con [JMeter](https://jmeter.apache.org/) o [Locust](https://locust.io/).

El lenguaje de programación que necesites variará según la empresa. Si no conoces ninguno, te recomiendo comenzar con Python, ya que es un lenguaje fácil de aprender. Solo ten en cuenta que en algunas ocasiones podría ser necesario usar Java, C#, Ruby o JavaScript. Aprende lo fundamental de la lógica de programación y de estas herramientas para que el lenguaje que conozcas no sea una limitación.

Por último, una recomendación importante es aprender a comunicarte de la mejor forma con tu equipo. Tu trabajo no debe ser un obstáculo y tampoco debe generar estrés a los programadores. A veces, tendrás que ser flexible con los detalles que encuentres, ya que el software perfecto no existe. Si un detalle no afecta la experiencia del usuario ni el negocio, piensa que podría solucionarse pronto con un hotfix en las siguientes horas o días. Tu deber es reportarlo, pero en equipo se decidirá qué hacer con ese reporte.

**Rompe el software, no a tu equipo.**
