---
title: 'Cómo personalizar Windows Terminal'
description: 'Si usas Windows Terminal o PowerShell y quieres darle una apariencia más fancy aquí te enseño cómo hacerlo.'
pubDate: 'Jan 04 2022'
heroImage: '/thumbnails/cat-rgb.webp'
---
Si usas Windows Terminal o PowerShell y quieres darle una apariencia más fancy aquí te enseño cómo hacerlo.

Yo solo quería mostrar la rama de git y terminé haciendo esto.

![Parkour](/blog-images/parkour.webp)

Primero debes saber que es algo que encuentras en la documentación oficial de Microsoft, [Tutorial: Set up a custom prompt for PowerShell or WSL with Oh My Posh](https://docs.microsoft.com/en-us/windows/terminal/tutorials/custom-prompt-setup), pero yo te traigo el resumen luego de unas horas peleando porque no funcionaba.

Instalación
-----------

> Si tienes problemas para ejecutar estos comandos debido a un error de permisos o acceso al directorio de `$PROFILE`, te recomiendo leer la sección "Preparación de la terminal" de mi otro blogpost [Crea alias de comandos en Windows Terminal](https://luislira.dev/blog/crea-alias-de-comando-en-windows-terminal).

Abre tu Windows Terminal o Powershell y ejecuta los siguientes comandos:  
`Install-Module posh-git -Scope CurrentUser`  
`Install-Module oh-my-posh -Scope CurrentUser`  
`Install-Module -Name Terminal-Icons -Repository PSGallery`

En caso de que te pida permisos para ejecutarlos es porque debes abrir Windows Terminal o Powershell como Administrador. Si te pide permiso para confiar en lo que estás instalando, también dile que sí, trust me :)

Luego de que todo ya terminó de instalarse, ejecuta lo siguiente `notepad $PROFILE`, esto abrirá un bloc de notas vacío (o por lo menos para mí lo fue) para guardar la configuración que se ejecutará cada que se inicie la terminal. En este archivo pondrás lo siguiente.  
`Import-Module posh-git`  
`Import-Module oh-my-posh`  
`Import-Module -Name Terminal-Icons`  
`Set-PoshPrompt -Theme <Nombre del tema>`

El `<Nombre del tema>` lo sustituirás por el tema que a ti más te guste. Yo estoy usando _Agnoster_, pero tú puedes consultar todos los que hay disponibles [aquí en la documentación oficial de Oh My Posh](https://ohmyposh.dev/docs/themes).

Luego tendrás que descargar e instalar la fuente que usarás. Para esto necesitas una desde la página [Nerd Fonts](https://www.nerdfonts.com/font-downloads), yo descargué la que se llama _Caskaydia Cove Nerd Font_, esto es necesario porque también la fuente contendrá iconos que se usarán en los temas que escojas.

Reinicias tu terminal y ya debería quedar listo.

![Terminal](/blog-images/terminal-screenshot-1.webp)

Ese sería el mundo ideal... pero para mí no fue así.

En caso de que reinicies tu terminal y en vez de iconos y letras ves algunos símbolos extraños o cuadritos es porque algo no está bien con la fuente, pero no te preocupes, no hiciste algo mal.

Para arreglar esto debes ir a modificar la configuración de Windows Terminal. Presionas la combinación de `Windows + R` e ingresas a `%LOCALAPPDATA%`. Una vez ahí, debes buscar la carpeta `Packages`, dentro de ella buscarás la carpeta `Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe`, entras y luego entras a `LocalState`. Ahí encontrarás el archivo `settings.json`, lo abres con tu editor de texto de preferencia, buscas la _key_ `profiles` y en su propiedad `defaults` especificarás la fuente de esta forma `"fontFace": "CaskaydiaCove NF"`.

![Code](/blog-images/code-screenshot-1.webp)

Guardas el archivo, reinicias tu terminal para que amarre, y listo. Ahora deberías poder verlo :)

Si luego quieres cambiar de tema, solo debes abrir la terminal y ejecutar de nuevo `notepad $PROFILE` para cambiar la configuración.

**[Déjame en Twitter cómo quedó](https://twitter.com/Luis_LiraC/status/1478536020589264899)**

Extras
------

Podrás editar los temas, crear tu propio tema o verlos a detalle yendo a la siguiente ruta de tu SO: `C:\Users\<Tu Usuario>\Documents\WindowsPowerShell\Modules\oh-my-posh\themes`. Así es como quedó luego de editar el tema _clean-detailed_.

![Terminal](/blog-images/terminal-screenshot-2.webp)

Si usas **PowerShell**, también los cambios se reflejarán cuando la ejecutes. Puede que no veas la fuente aplicada, por lo que solo tendrás que dar clic derecho en la parte superior de la ventana, ir a Propiedades > Fuente y escoger de nuevo la fuente que instalaste.

![Window](/blog-images/window-screenshot-1.webp)

Si usas **Visual Studio Code** y no se ve bien la fuente cuando usas la terminal integrada, tienes que cambiar la configuración del editor yendo a Archivo > Preferencias > Configuración, buscas "Terminal" y en la opción de _Terminal > Integrated: Font Family_ la cambias por la fuente que instalaste.

![Code](/blog-images/code-screenshot-2.webp)

Si quieres ponerle un **background** a tu terminal, es muy fácil, solo debes abrir de nuevo el archivo de configuración de Windows Terminal, el settings.json donde pusiste la fuente y agregar la configuración en el mismo lugar.

Yo estoy agregando de fondo una imagen de Mr. Robot que tengo guardada en mi carpeta de imágenes, con una opacidad del 50% y que rellene la terminal en cualquier tamaño.

![Code](/blog-images/code-screenshot-3.webp)

El resultado es este:  
![Terminal](/blog-images/terminal-screenshot-3.webp)

Si quieres **desinstalar** los cambios que hicimos porque decidiste que esta customización no es para ti, solo debes hacer lo siguiente para limpiar todo.

Primero debes abrir el archivo de configuración con `notepad $PROFILE` y borrar su contenido, o puedes ir directamente a la carpeta `C:\Users\<Tu usuario>\Documents\WindowsPowerShell` y borrar el archivo de profile que se creó.

Luego, ejecuta los siguientes comandos:  
`Uninstall-Module posh-git`  
`Uninstall-Module oh-my-posh`  
`Uninstall-Module Terminal-Icons`

Al reiniciar tu terminal, todo debería quedar como estaba antes. La fuente es tu decisión si sigues usándola como la default para la terminal y en los demás lugares que la hayas configurado, o si también quieres desinstalarla y modificar de nuevo la configuración de Windows Terminal, PowerShell y VSCode.

Ahora presume tus terminales con todas las demás personas para que sepan que en Windows también podemos tener terminales bonitas!
