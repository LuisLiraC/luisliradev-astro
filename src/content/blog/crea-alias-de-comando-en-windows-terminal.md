---
title: 'Crea alias de comando en Windows Terminal'
description: 'Si usas la terminal y te gusta tener alias para tus comandos, pero si usas Windows Terminal o PowerShell habrás notado que cada vez que reinicias la terminal, los alias que creaste desaparecen. Yo te enseñaré cómo hacerlos permanentes.'
pubDate: 'Jan 07 2022'
heroImage: '/thumbnails/cat-code.webp'
---

Si usas la terminal y te gusta tener alias para tus comandos, pero si usas Windows Terminal o PowerShell habrás notado que cada vez que reinicias la terminal, los alias que creaste desaparecen. **Yo te enseñaré cómo hacerlos permanentes.**

Preparación de la terminal
--------------------------

Abre tu Windows Terminal o PowerShell, ejecuta el siguiente comando `echo $PROFILE` y te dará una ruta muy similar a esta `C:\Users\\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`, este es el archivo profile, donde se guarda la configuración que cargará siempre nuestra terminal al iniciarse.

Intenta acceder con el siguiente comando `notepad $PROFILE`. Si todo está bien, se abrirá el bloc de notas con el archivo `Microsoft.PowerShell_profile.ps1`, pero si te dice que no se puede acceder a la ruta, es porque la carpeta `WindowsPowerShell` no existe dentro de tu carpeta `Documents`. Si tienes este error, crea la carpeta y vuelve a ejecutar `notepad $PROFILE`. Ahora te dirá que el archivo no existe y que si quieres crearlo, dile que sí.

En este bloc de notas, ingresa el siguiente contenido:

```powershell
  function HelloWorld { echo "Hello World" }
  New-Alias hello HelloWorld
``` 

Ahora guarda los cambios, reinicia tu terminal, escribe `hello`, y verás la frase "Hello World" como salida.

![Terminal](/blog-images/terminal-screenshot-4.webp)

En caso de que al abrir la terminal tengas este error:

![Terminal](/blog-images/terminal-screenshot-5.webp)

Es porque tu perfil de la terminal no tiene permisos para ejecutar scripts dentro de PowerShell, pero esto es muy fácil de arreglar.

Abre tu PowerShell como Administrador y revisa las políticas de ejecución con `Get-ExecutionPolicy`. Lo más probable es que te devuelva `Restricted`. Para arreglar esto, ejecuta lo siguiente para quitar la restricción:

```powershell
  Set-ExecutionPolicy RemoteSigned
```
    

Te pedirá que confirmes la acción, le dices que sí, y estará listo para que reinicies tu terminal e intentes de nuevo ejecutar `hello`.

![Terminal](/blog-images/terminal-screenshot-6.webp)

Ahora tienes tu primer alias y siempre se cargará cada vez que inicies tu terminal.

Mejores alias
-------------

Ya que está todo listo, ahora vamos a crear algunos alias útiles. Empezaremos viendo cómo nos moveremos entre directorios. En mi caso, tengo una carpeta llamada `develop` en `D:\develop`, no quiero usar `cd D:\develop` cada vez que quiero moverme allí, así que crearé un comando `dev` que me llevará a esa ubicación:

```powershell
  function GoDevelop { Set-Location D:\develop }
  New-Alias dev GoDevelop
```

De esta forma, puedes crear comandos para moverte entre directorios y ahorrar tiempo escribiendo rutas largas.

Ahora veamos alias que reciben parámetros. Tengo un alias para el comando de commit de git. Lo que haremos es resumir el comando y hacer que reciba el mensaje de nuestro commit como parámetro:

```powershell
  function GitCommit([string]$message) { git commit -m "$message" }
  New-Alias gcmt GitCommit
```

Como puedes ver, estas funciones también pueden recibir parámetros tipados. Mi alias para hacer commit es `gcmt`, y lo que pase después de mi alias se considerará el parámetro `$message` de la función.

Un ejemplo de uso sería `gcmt "Commit de prueba"`, poniendo el mensaje entre comillas para que se reconozca como un solo parámetro.

También puedes crear alias que reciben más de un parámetro. Solo tienes que seguir la misma fórmula que ya viste. Por ejemplo:

```powershell
  function GitPush([string]$remote, [string]$branch) { git push $remote $branch }
  New-Alias gpsh GitPush
``` 

Un ejemplo de uso sería `gpsh origin hotfix`.

Recomendaciones
---------------

En algunos casos, al iniciar la terminal, puede que te diga que un alias ya existe en un mensaje de error. Esto se debe a que Windows por defecto ya tiene una lista de alias. Si quieres verificar cuáles ya están ocupados, usa el comando `Get-Alias`.

![Terminal](/blog-images/terminal-screenshot-7.webp)

Ahora ya sabes cómo crear alias para tus comandos y seguir usando Windows Terminal y PowerShell sin necesidad de escribir comandos largos todo el tiempo.

Cuéntame en [mi Twitter](https://twitter.com/Luis_LiraC) qué te pareció este pequeño tutorial, y si tienes ganas de profundizar en este tema, te recomiendo que leas la [documentación oficial de Microsoft](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/?view=powershell-7.2).

Para finalizar, te dejo la lista de los alias que tengo en mi terminal. Tal vez puedas usarlos también:

```powershell
  function Home { Set-Location $HOME }
  New-Alias home Home

  function GoDevelop { Set-Location D:\develop }
  New-Alias dev GoDevelop

  function GoDesktop { Set-Location $HOME\Desktop }
  New-Alias dk GoDesktop

  function GitStatus { git status }
  New-Alias gs GitStatus

  function GitAdd([string]$file) { git add "$file" }
  New-Alias ga GitAdd

  function GitCommit([string]$message) { git commit -m "$message" }
  New-Alias gcmt GitCommit

  function GitSwitchCreate([string]$branch) { git switch -c $branch }
  New-Alias gswc GitSwitchCreate

  function GitSwitch([string]$branch) { git switch $branch }
  New-Alias gsw GitSwitch

  function NewFile([string]$filePath) { 
      $path = pwd
      if ($match.Matches.groups[1].value -ne "") {
        $path = $match.Matches.groups[1].value
      }
      $fileName = $match.Matches.groups[3].value
      New-Item -Path "$path" -Name "$fileName" -ItemType "file"
  }
  New-Alias touch NewFile
```    

¡Ahora puedes mejorar tu flujo de trabajo en la terminal con estos alias!
