---
title: 'Paréntesis Válidos (Valid Parentheses)'
description: 'Solución de Valid Parentheses en Rust. Aprende a resolver el problema de paréntesis válidos que puede encontrarse en LeetCode con un enfoque práctico y eficiente.'
pubDate: 'Feb 02 2025'
heroImage: '/thumbnails/cat-valid-parentheses.webp'
---



El problema de Valid Parentheses (Paréntesis Válidos) es un problema clásico de programación que puedes encontrar en [LeetCode](https://leetcode.com/problems/valid-parentheses/). Aquí analizaremos el problema y veremos qué preguntas nos debemos hacer para poder resolverlo, además de una solución en Rust 🦀.

## Análisis del problema

Antes de escribir código, es importante entender cómo sabemos si un string es válido, las reglas que se aplican y por qué, además de cuáles son los casos que debemos tener en cuenta para que nuestra solución funcione correctamente en cada uno de ellos.

**Qué recibiremos en el input?**

- Recibiremos un string que contiene los caracteres `(`, `)`, `{`, `}`, `[`, `]`.
    <sub>
    Aunque el problema se llame `Valid Parentheses` y en español se traduzca como `Paréntesis Válidos`, el problema no se limita a paréntesis, sino que incluye llaves y corchetes.
    </sub>
- El string tendrá al menos un caracter y como máximo 10⁴ caracteres (10,000 caracteres).

**Cómo sabemos si un string es válido?**

Un string es válido si:

- Todos los paréntesis están cerrados.
- Los paréntesis están correctamente anidados.

Por ejemplo, los siguientes strings son válidos:

- `"()[]{}"`: Todos los paréntesis están cerrados.
- `"([]{})"`: Todos los paréntesis están cerrados y están correctamente anidados.

Por otro lado, los siguientes strings no son válidos:

- `"{"` o `"([]"`: El paréntesis no está cerrado.
- `"]"`: Hay un paréntesis de cierre sin un paréntesis de apertura.
- `"([)]"`: Los paréntesis no están correctamente anidados.


## Planteamiento de la solución

Ahora que sabemos las reglas que debemos aplicar para determinar si el string es válido y también las variaciones que puede tener, podemos plantear una solución.

**Qué nos hace saber si un paréntesis está correctamente cerrado?**

Si tenemos un paréntesis de apertura, que puede ser `(`, `{` o `[`, el paréntesis de cierre debe estar inmediatamente después, es decir, `)`, `}` o `]`. Esto en caso de que no haya anidamiento.

**Cómo sabemos si los paréntesis están correctamente anidados?**

La forma de determinar que su anidamiento es correcto sigue la misma lógica que el ejemplo anterior. Los paréntesis de apertura pueden presentarse consecutivamente, pero en cuanto aparezca un paréntesis de cierre debe ser el que le corresponde al que está inmediatamente antes.

**Cómo podemos saber si el paréntesis de cierre es el correcto?**

Aquí es donde entra el `Stack` (Pila). Es una estructura de datos que nos permitirá almacenar la información que necesitamos para determinar si el string es válido.

Los stacks siguen el principio de `Last In First Out` (LIFO), es decir, el último elemento que entra es el primero que sale. Si lo piensas, esto es lo que necesitamos para nuestro problema. Para el último paréntesis de apertura que encontremos su paréntesis de cierre debe ser el primero que encontremos.

**Qué información debemos almacenar en el stack?**

En el stack debemos almacenar los paréntesis de cierre que esperamos encontrar. Por ejemplo, si encontramos un `(`, sabemos que el paréntesis de cierre que esperamos encontrar es un `)`, entonces en el stack debemos almacenar un `)`. 

Si encontramos un `(`, en nuestro stack almacenamos `)`. Después encontramos un `[`, por lo que en nuestro stack almacenaremos `]`. Ahora en nuestro stack tenemos `)`, `]`, significa que el paréntesis de cierre que encontremos debe ser un `]` y que así cumpla con la regla de que los paréntesis están correctamente anidados.

Cada que encontramos un paréntesis de cierre y es el que esperamos encontrar, lo eliminamos del stack.

**Qué pasa si encontramos un paréntesis de cierre que no es el esperado?**

Si encontramos un paréntesis de cierre que no es el esperado, sabemos que el string no es válido porque no cumple con la regla de que los paréntesis están correctamente anidados.

**Qué pasa si terminamos de recorrer el string y nuestro stack no está vacío?**

Si terminamos de recorrer el string y nuestro stack no está vacío, sabemos que el string no es válido porque significa que hay paréntesis de apertura que no han sido cerrados.

## Solución en Rust 🦀

Ahora, con todo esto claro, podemos comenzar a escribir nuestro código. Este ejemplo es a la solución que yo llegué usando Rust, pero no es la única forma de resolver el problema. Además, con la base anterior, puedes llegar a una solución con el lenguaje que prefieras.

```rust
pub fn is_valid(s: String) -> bool {
    // Creamos un stack para almacenar los paréntesis de cierre que esperamos encontrar
    let mut stack: Vec<char> = vec![];

    // Recorremos el string
    for c in s.chars() {
        match c {
            // Si encontramos un paréntesis de apertura, almacenamos
            // el paréntesis de cierre que corresponde
            '('=> stack.push(')'),
            '['=> stack.push(']'),
            '{'=> stack.push('}'),
            _ => {
                // Si encontramos un paréntesis de cierre,
                // verificamos si es el que esperamos encontrar
                if let Some(v) = stack.last() {
                    // Si el paréntesis de cierre no es el que esperamos encontrar,
                    // retornamos false
                    if v != &c { return false }

                    // Si es el que esperamos encontrar, lo eliminamos del stack
                    // y continuamos con la siguiente iteración
                    stack.pop();
                    continue;
                }

                // Si nuestro stack ya está vacío y encontramos un paréntesis de cierre,
                // retornamos false porque no hay paréntesis de apertura para cerrar
                return false;
            }
        }
    }

    // Si nuestro stack está vacío, significa que todos los paréntesis
    // están correctamente cerrados y anidados, si no está vacío,
    // significa que hay paréntesis de apertura que no han sido cerrados
    stack.len() == 0
}
```

En las siguientes animaciones podrás ver cómo funciona la solución anterior. En ellas `I` representa el input que recibimos y `S` representa el stack que usamos para almacenar los paréntesis de cierre. 

La flecha hacia abajo representa la iteración actual, si encontramos un paréntesis de apertura agregamos su cierre al stack, si encontramos uno de cierre verificamos si es el último que entró al stack.

✅ Ejemplo de un string válido

Nuestro input es `I = "({[]})"`. En las primeras tres iteraciones encontramos paréntesis de apertura y al stack agregamos los de cierre que esperamos encontrar. En las siguientes iteraciones encontramos paréntesis de cierre y verificamos si es el último que entró al stack.

![Valid Parentheses Example 1](/blog-images/valid-parentheses-1.gif)

❌ Ejemplo de un string inválido

Nuestro input es `I = "({[})"`. En las primeras tres iteraciones encontramos paréntesis de apertura y al stack agregamos los de cierre que esperamos encontrar. En la siguiente iteración encontramos un paréntesis de cierre y verificamos si es el último que entró al stack, al no ser así retornamos `false`.

![Valid Parentheses Example 2](/blog-images/valid-parentheses-2.gif)

## Resultados de la solución

La solución anterior tiene una complejidad de tiempo de `O(n)` y una complejidad de espacio de `O(n)`, donde `n` es el número de caracteres en el input. 

![Valid Parentheses Time](/blog-images/valid-parentheses-time.png)
![Valid Parentheses Time Complexity](/blog-images/valid-parentheses-time-complexity.png)

![Valid Parentheses Space](/blog-images/valid-parentheses-space.png)
![Valid Parentheses Space Complexity](/blog-images/valid-parentheses-space-complexity.png)
