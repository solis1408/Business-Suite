# Requerimientos Funcionales — Ejecución del Flujo de Trabajo de Tickets por Bloques

| Campo   | Valor                                                  |
|---------|--------------------------------------------------------|
| Versión | 1.8                                                    |
| Fecha   | 2026-09-08                                             |
| Estado  | Definición                                             |
| Módulo  | Innovación & Negocios — Cómputo / Tickets Escalonados  |
| Autor   | Análisis de Negocio                                    |

---

## 1. Propósito del documento

Cuando se asigna equipo de cómputo a un colaborador, el sistema no genera un solo ticket: genera un **flujo de trabajo escalonado**, es decir, una cadena de actividades que se van abriendo unas a otras conforme se atienden, y donde cada actividad que lo requiere produce su propio subticket dirigido al área responsable. Hoy ese encadenamiento funciona **etapa contra etapa**: cada actividad declara de cuál otra depende, y en cuanto esa única actividad se cierra, la siguiente arranca.

Ese comportamiento tiene un límite que el negocio ya está encontrando: **no existe forma de exigir que un grupo completo de actividades termine antes de que empiece el grupo siguiente**. Si tres actividades deben trabajarse en paralelo y la cuarta solo tiene sentido cuando las tres estén listas, hoy la cuarta se abre en cuanto termina aquella de la que se colgó, sin importar que las otras dos sigan pendientes. El resultado es trabajo que arranca sin sus insumos, retrabajo, y actividades que se dan por buenas sobre información incompleta.

Este documento describe los ocho requerimientos funcionales necesarios para que el flujo de trabajo pueda operar **por bloques**: tandas de actividades que se abren juntas y donde el siguiente bloque no arranca hasta que **todas** las actividades del bloque en curso hayan concluido.

Dentro de un flujo por bloques hay un bloque que no se comporta como los demás: el **bloque principal**, que es el del propio ticket principal. Ese bloque no hace fila: se abre **junto con el primer bloque de actividades**, en el mismo momento en que nace el ticket, porque el ticket principal existe desde el arranque y no tiene sentido que espere a nadie. Y no se cierra cuando le toca su turno, sino **al final**: la etapa principal no puede darse por atendida mientras quede un solo bloque de actividades sin concluir. El bloque principal es, entonces, el paraguas del ticket: el primero que se abre y el último que se cierra.

La ejecución por bloques **no se impone a todos los flujos**. Cada flujo de trabajo decide, desde su propio detalle, con qué mecanismo quiere avanzar: puede conservar el **modo escalonado** con el que opera hoy —etapa contra etapa, mediante el antecesor— o adoptar el **modo por bloques**. Esa elección es lo que permite adoptar el cambio flujo por flujo, sin obligar a reorganizar de golpe procesos que hoy funcionan bien, y es el objeto de RF-01.

- **RF-01 — Selección del modo de ejecución en el detalle del flujo de trabajo**, que agrega en el propio flujo la opción de configurar con qué mecanismo avanza —escalonado por antecesor o por bloques—, determina qué datos y validaciones aplican en cada caso, y deja ese modo sellado en cada ticket al generarlo. Es el requerimiento que envuelve a los siete siguientes: todos ellos describen el comportamiento de un flujo configurado **en modo por bloques**.
- **RF-02 — Definición de bloques en la configuración del flujo de trabajo**, que incorpora el bloque como la unidad que agrupa las etapas y que gobierna el avance, en sustitución de la dependencia etapa contra etapa.
- **RF-03 — Integridad del armado del flujo por bloques**, que impide guardar configuraciones mal armadas que dejarían tickets detenidos en producción.
- **RF-04 — Registro y visualización del bloque en el ticket y en sus subtickets**, que lleva el bloque al ticket, lo deja registrado en cada subticket que se genera y hace visible en qué tanda va el trabajo y por qué una etapa todavía no está disponible.
- **RF-05 — Apertura del bloque principal y activación por barrera del siguiente bloque**, que es el corazón del cambio: el bloque principal y el bloque 1 se abren juntos al generar el ticket, cada bloque siguiente se abre en una sola operación cuando —y solo cuando— el bloque en curso quedó completamente cerrado, y el bloque principal no puede cerrarse hasta que todos los demás concluyan.
- **RF-06 — Continuidad del flujo ante bloques vacíos o descartados**, que garantiza que un bloque que no aplica al caso no detenga el ticket para siempre.
- **RF-07 — Condicionamiento de una etapa al resultado de una etapa previa**, que preserva —ahora de forma explícita— la capacidad actual de descartar actividades según cómo se haya resuelto una decisión anterior.
- **RF-08 — Migración de los flujos configurados y de los tickets en curso**, que convierte lo ya configurado al nuevo esquema y permite liberar el cambio sin detener el trabajo en proceso.

El objetivo es que cualquier persona del negocio entienda, sin consultar otro documento, qué es un bloque, cuándo se abre el siguiente, qué pasa cuando una tanda completa no aplica, cómo se configura todo esto, cómo se elige el modo de ejecución de cada flujo y qué ocurre con los tickets que ya estaban abiertos el día de la liberación.

### El modelo en seis reglas

Si alguien solo va a leer una parte de este documento, que sea esta. Todo lo demás son los detalles de estas seis reglas.

1. **Cada etapa pertenece a un bloque numerado, y el bloque es lo único que determina cuándo se abre.** Ya no hay cadena de antecesores.
2. **Al generar el ticket se abren juntos el bloque principal y el bloque 1**, con los subtickets de las etapas de ambos que lo requieran.
3. **Un bloque queda cerrado cuando todas sus etapas están en Atendido o Cancelado**; ambos estatus cuentan por igual.
4. **El bloque siguiente se abre completo —con todos sus subtickets— solo cuando el bloque en curso cerró.** Nunca hay dos bloques de actividades abiertos a la vez.
5. **Un bloque que no aplica al caso se salta solo**, en cadena y sin intervención humana, hasta encontrar uno con actividades o agotarlos.
6. **El bloque principal se cierra al final**: no admite registrar su atención realizada mientras quede un bloque pendiente, y su cierre es el que concluye el flujo.

### Qué cambia respecto de hoy

| Hoy — escalonado por antecesor | Con bloques |
|---|---|
| Cada etapa declara **de cuál etapa** depende | Cada etapa declara **a qué tanda** pertenece |
| Al cerrar una etapa se abren las que colgaban de ella | Al cerrar el bloque completo se abre el siguiente completo |
| La etapa principal arranca sola; el resto espera a que cierre | El bloque principal y el bloque 1 arrancan juntos |
| La etapa principal se atiende al inicio | El bloque principal se atiende al final y ese cierre concluye el flujo |
| La condición se evalúa contra el antecesor, de forma implícita | La condición declara **etapa condicionante + resultado esperado** |
| Una actividad puede arrancar aunque sus insumos sigan abiertos | Ninguna actividad arranca antes de que su tanda anterior esté completa |

## 2. Alcance del documento

**Incluye:**
- La **opción de configurar el modo de ejecución en el detalle de cada flujo de trabajo**: escalonado por antecesor —el comportamiento vigente— o por bloques, con las reglas que gobiernan el cambio de un modo al otro y el sellado del modo en cada ticket al generarlo.
- La incorporación del **bloque** como atributo de cada etapa en la configuración del flujo de trabajo, y su uso como mecanismo que gobierna el avance del flujo en los flujos configurados en modo por bloques.
- Las **validaciones de armado** que impiden guardar un flujo por bloques con bloques incompletos, mal numerados o con la etapa principal fuera de lugar.
- El traslado del bloque al ticket en el momento de generarlo, el **sello del bloque en cada subticket que se genera**, y la **presentación agrupada** del flujo de trabajo por bloque, con indicador del bloque en curso.
- La restricción de la **pestaña de flujo de trabajo al ticket principal** en los tickets que operan por bloques: los subtickets dejan de presentarla y conservan su bloque como dato propio.
- La **regla de barrera**: apertura del siguiente bloque únicamente cuando todas las etapas del bloque en curso quedaron en un estatus terminal, y apertura simultánea de todas las etapas de ese siguiente bloque con sus respectivos subtickets.
- El **bloque principal** como bloque paraguas del ticket: se abre junto con el primer bloque de actividades al generar el ticket, permanece abierto durante todo el flujo y **no puede cerrarse hasta que todos los bloques de actividades hayan concluido**.
- El **avance automático** sobre bloques que quedaron sin etapas aplicables al caso concreto o cuyas etapas se descartaron en su totalidad.
- El **condicionamiento explícito** de una etapa al resultado registrado en una etapa previa específica, en sustitución del parámetro de activación actual, que dependía del antecesor único.
- La **conversión de un flujo ya configurado** al esquema de bloques cuando el administrador decide cambiarlo de modo, con reporte de resultado para su validación, y el tratamiento de los **tickets abiertos** al momento de la liberación.
- El registro en **bitácora** de la apertura de cada bloque, de la activación de cada etapa y del descarte de cada etapa con su motivo.

**No incluye:**
- El contenido funcional de cada etapa —alta de correo electrónico, directorio activo, VPN, perfil de seguridad, configuración de red, check list—, que continúa operando exactamente como hoy.
- El mecanismo de creación del ticket principal a partir de la asignación de cómputo, la elección del flujo por subrama del activo y el descarte de etapas no solicitadas, que se conservan sin cambio.
- La resolución del responsable de cada etapa por unidad de negocio, que se mantiene con su comportamiento actual.
- El flujo escalonado de **baja de personal vía nómina**, que opera con un mecanismo distinto —genera todos sus subtickets de una sola vez, sin dependencias entre ellos— y que no se configura desde el catálogo de flujos de trabajo.
- El proceso de cierre del ticket principal y de los subtickets, que conserva sus reglas actuales; este documento únicamente cambia **cuándo** quedan disponibles para cerrarse.
- Nuevos estatus para las etapas ni para los tickets: el requerimiento reutiliza los estatus vigentes.
- La reingeniería de las pantallas de captura de cada tipo de etapa.
- El **retiro del modo escalonado**: el modo por antecesor se conserva como una opción válida y soportada del catálogo de flujos, no como un mecanismo en vías de eliminación. La decisión de retirarlo, si algún día se toma, es materia de otro requerimiento.
- La conversión **masiva y automática** de todos los flujos configurados al modo por bloques: la conversión ocurre flujo por flujo, cuando el administrador lo decide.
- Ninguna **facultad para brincar, omitir o forzar manualmente** un bloque o una etapa que quedó atorada, ni para hacer avanzar un ticket detenido desde la interfaz. La barrera no admite excepciones: si un ticket queda detenido, la verificación del invariante lo detecta (RF-06) y su corrección la ejecuta el área de desarrollo. Esto es deliberado: una opción de salto convertiría la barrera en una sugerencia y devolvería el problema que el requerimiento viene a resolver.

## 3. Actores y roles

| Actor / Rol | Descripción |
|-------------|-------------|
| Administrador del flujo de trabajo | Persona de Innovación & Negocios que da de alta y mantiene los flujos de trabajo y sus etapas: define los bloques, el orden, los responsables y las condiciones de cada actividad. |
| Responsable de etapa | Colaborador del departamento al que está dirigida una etapa del flujo; es quien captura la información de la actividad y registra la atención realizada. |
| Coordinador / Jefe de Cómputo | Da seguimiento al avance del flujo de un ticket, revisa los bloques pendientes y detecta desviaciones. |
| Colaborador solicitante | Persona a la que se le asigna el equipo de cómputo y cuyo expediente se completa a lo largo del flujo. No interviene en la ejecución. |
| Sistema (motor de flujo) | Mecanismo automático que abre el bloque principal y el primer bloque al generar el ticket, evalúa el cierre de cada bloque, abre el siguiente, genera los subtickets, descarta las etapas que no aplican e impide el cierre del bloque principal mientras queden bloques pendientes. |
| Equipo de Desarrollo | Área responsable de implementar el cambio, ejecutar la conversión de los flujos existentes y operar el modo de compatibilidad. |

## 4. Glosario

| Término / Sigla | Definición |
|-----------------|------------|
| Flujo de trabajo | Plantilla configurable que describe todas las actividades que deben ejecutarse para atender una asignación de equipo de cómputo, quién las atiende y en qué momento se abren. Se configura una sola vez y se reutiliza en cada ticket. |
| **Modo de ejecución del flujo** | Dato del detalle del flujo de trabajo que indica con qué mecanismo avanzan sus etapas. Admite dos valores: **Escalonado por antecesor** y **Por bloques**. Es el dato que decide qué reglas de este documento aplican al flujo y a los tickets que genere. Concepto introducido en RF-01. |
| Modo escalonado por antecesor | Modo de ejecución vigente hasta hoy: cada etapa declara de cuál otra depende y arranca en cuanto esa única etapa concluye. No usa bloques ni barreras. |
| Modo por bloques | Modo de ejecución que introduce este documento: las etapas se agrupan en bloques y el siguiente bloque no arranca hasta que todas las etapas del bloque en curso concluyeron. |
| Modo de ejecución del ticket | Copia del modo de ejecución del flujo tomada al generar el ticket. Es el que gobierna la ejecución de ese ticket hasta su cierre, con independencia de que la plantilla cambie de modo después. |
| Etapa del flujo | Cada una de las actividades que componen un flujo de trabajo (por ejemplo: alta de correo electrónico, alta en directorio activo, configuración de red, check list de entrega). Es la unidad que se atiende y que puede generar un subticket. |
| **Bloque** | Conjunto de etapas de un mismo flujo que se abren juntas y se trabajan en paralelo. Es la unidad que gobierna el avance: **hasta que todas las etapas de un bloque concluyen, no se abre el bloque siguiente**. Los bloques de actividades se identifican con un número entero consecutivo empezando en 1. |
| **Bloque principal** | Bloque del propio ticket principal, formado por la etapa marcada como principal. No lleva número y no participa en la fila de barreras: se abre **junto con el bloque 1** al generar el ticket y es el **último en cerrarse**, porque no puede darse por atendido mientras quede algún bloque de actividades sin concluir. Concepto introducido en RF-05. |
| Bloque de actividades | Cualquiera de los bloques numerados —bloque 1, bloque 2, bloque 3…— que agrupan las actividades del flujo y que sí avanzan uno tras otro atravesando barreras. |
| Barrera | Punto de sincronización al final de cada bloque de actividades. El flujo se detiene ahí hasta que la última etapa pendiente del bloque queda concluida, y solo entonces continúa. El bloque principal no impone barrera a la apertura del bloque 1. Es el concepto que da nombre a la regla de activación de RF-05. |
| Etapa en curso / bloque en curso | Etapa o bloque cuyas actividades están abiertas y disponibles para atenderse en este momento. Solo puede haber un bloque de actividades en curso a la vez, y conviven con él las etapas del bloque principal, que permanecen abiertas durante todo el flujo. |
| Estatus de la etapa | Situación de una etapa dentro del ticket. **Espera**: todavía no le toca, no es editable ni generó subticket. **Activo**: está en curso y disponible para atenderse. **Atendido**: se registró su atención y concluyó. **Cancelado**: se descartó porque no aplica al caso. |
| Estatus terminal | Estatus del que una etapa ya no sale: **Atendido** o **Cancelado**. Una etapa en estatus terminal se considera concluida para efectos de cerrar el bloque. |
| Atención realizada | Resultado con el que el responsable cierra una etapa. Admite dos valores: **SI**, cuando la actividad se ejecutó, y **NA**, cuando la actividad no aplicaba al caso. Es el dato que dispara el avance del flujo y el que se evalúa en las etapas condicionadas. |
| Etapa principal | Etapa marcada como principal en la configuración del flujo. Es la actividad del propio ticket principal y constituye por sí sola el bloque principal. Hay una y solo una por flujo. |
| Etapa mandatoria | Etapa que siempre forma parte del flujo de un ticket, sin importar qué cuentas o accesos se hayan solicitado. |
| Etapa condicional | Etapa que solo forma parte del flujo de un ticket cuando la cuenta o acceso al que está asociada fue efectivamente solicitado. Si no se solicitó, la etapa nunca se genera en ese ticket. |
| Etapa condicionante | Etapa previa cuyo resultado (SI o NA) determina si otra etapa se activa o se descarta. Concepto introducido en RF-07. |
| Descartar una etapa | Dejar una etapa en estatus Cancelado porque no aplica al caso, sin que nadie la atienda. Una etapa descartada cuenta como concluida y no impide cerrar el bloque ni el ticket. |
| Ticket principal | Ticket que se genera al asignar el equipo de cómputo y que contiene el flujo de trabajo completo. Es el que concentra todas las etapas. |
| Subticket | Ticket que el sistema genera automáticamente a partir de una etapa marcada para registrar ticket, dirigido al responsable de esa etapa. Depende del ticket principal y queda registrado con el bloque de la etapa que lo originó. En los tickets que operan por bloques no presenta el flujo de trabajo completo: ese se consulta en el ticket principal. |
| Grupo escalonado | Nombre con el que el negocio se refiere al bloque cuando se habla del dato que queda registrado en el ticket y en sus subtickets. Es el mismo concepto que **bloque**: la tanda de etapas a la que perteneció la actividad que originó el ticket. |
| Antecesor | Mecanismo de encadenamiento del modo escalonado: referencia de una etapa a **una sola** etapa previa, cuya conclusión la activa. En los flujos configurados en modo por bloques, el bloque lo sustituye y el antecesor queda como dato histórico. |
| Ticket escalonado | Forma de operar en la que un ticket principal va generando subtickets conforme avanza el flujo, en lugar de generarlos todos al inicio. |
| Modo de compatibilidad | Operación en la que el sistema atiende con las reglas del modo escalonado los tickets que no tienen bloque asignado, ya sea porque se generaron antes de la liberación o porque su flujo está configurado en modo escalonado por antecesor. |

## 5. Entidad a la que aplica

Este requerimiento aplica sobre tres entidades que hoy ya existen y que se relacionan como catálogo, plantilla e instancia.

La primera es el **flujo de trabajo en su detalle**, es decir, el encabezado del flujo que el administrador consulta y edita en el catálogo. Sobre ella se agrega el **modo de ejecución** (RF-01), que es el dato que decide si ese flujo avanza etapa contra etapa o por bloques. No tiene ciclo de estatus relevante para este documento; sí tiene, en cambio, un estado de validación cuando el flujo se convierte de un modo al otro.

La segunda es la **etapa del flujo de trabajo en su definición**, es decir, el renglón que el administrador captura al configurar un flujo. Sobre ella se agrega el bloque y se ajustan sus validaciones. No tiene ciclo de estatus relevante para este documento más allá de estar activa o cancelada dentro del catálogo.

La tercera, y la que concentra el cambio de comportamiento, es la **etapa del flujo de trabajo dentro de un ticket**: la copia que se genera en el momento de crear el ticket principal y que es la que realmente se atiende. Su **estatus inicial es Espera** —salvo la etapa principal y las etapas del bloque 1, que se activan de inmediato y en la misma operación— y sus **estatus terminales son Atendido**, cuando el responsable registró la atención realizada, **o Cancelado**, cuando el sistema la descartó por no aplicar al caso. La etapa principal tiene además una restricción propia: permanece activa durante todo el flujo y **no admite registrar su atención realizada mientras quede algún bloque de actividades sin concluir**. El proceso descrito por este documento concluye cuando **ninguna etapa del ticket permanece en Espera ni en Activo** —lo que exige que la etapa principal se haya atendido al final—, momento en el que el ticket principal queda disponible para cerrarse.

Es importante entender que la etapa del ticket es una **copia congelada** de la configuración: se lleva el modo de ejecución del flujo, el bloque, el orden, el responsable, la condición y el expediente del colaborador tal como estaban al momento del alta. Un cambio posterior en la plantilla no altera los tickets ya generados, lo cual es deliberado: cada ticket termina de ejecutarse con las reglas con las que nació.

A esa copia congelada se suma un tercer punto de registro: el **subticket**. Cada subticket que el flujo genera se registra con el número de bloque —el grupo escalonado— de la etapa que lo originó, de modo que el dato viaja de la plantilla a la etapa del ticket y de ahí al subticket, y queda disponible para consulta y filtrado sin necesidad de abrir el ticket principal.

### Visión general del flujo

Los diagramas de esta sección describen el comportamiento de un ticket **generado a partir de un flujo configurado en modo por bloques**. Un ticket cuyo flujo está en modo escalonado por antecesor conserva íntegramente el comportamiento actual y no atraviesa barreras.

El primer diagrama muestra el ciclo de vida de una etapa dentro del ticket. Nótese que **Cancelado no es un fracaso**: es la salida normal de una etapa que no aplicaba al caso, y cuenta igual que Atendido para dar por cerrado el bloque.

```mermaid
stateDiagram-v2
    [*] --> Espera: la etapa se genera al crear el ticket
    [*] --> Activo: la etapa es la principal o pertenece al bloque 1
    Espera --> Activo: se cierra por completo el bloque anterior
    Espera --> Cancelado: su bloque se abre pero la condición no se cumple
    Activo --> Atendido: el responsable registra la Atención Realizada (SI o NA)
    Atendido --> [*]
    Cancelado --> [*]
    note right of Activo
        La etapa principal permanece aquí durante todo el flujo:
        no admite registrar su Atención Realizada hasta que
        todos los bloques de actividades hayan concluido
    end note
```

El segundo diagrama muestra la decisión que ejecuta el sistema cada vez que un responsable cierra una etapa. La pregunta central —y la que cambia respecto de hoy— es la primera: ya no se pregunta *"¿quién dependía de esta etapa?"*, se pregunta *"¿ya terminó todo el bloque?"*.

```mermaid
flowchart TD
    A[El responsable registra la Atención Realizada y guarda la etapa] --> A2{¿Es la etapa principal?}
    A2 -- Sí --> A3{¿Queda algún bloque de actividades sin concluir?}
    A3 -- Sí --> A4[No se permite: la etapa principal se cierra al final]
    A3 -- No --> A5[La etapa principal queda en Atendido: el flujo concluyó y el ticket queda disponible para cerrarse]
    A2 -- No --> B[La etapa queda en Atendido]
    B --> C{¿Queda alguna etapa del mismo bloque en Espera o en Activo?}
    C -- Sí --> D[No se abre nada: el bloque sigue en curso]
    C -- No --> E[El bloque queda cerrado: se busca el siguiente bloque con etapas pendientes]
    E --> F{¿Existe un bloque posterior con etapas en Espera?}
    F -- No --> G[Se agotaron los bloques de actividades: la etapa principal queda disponible para atenderse]
    F -- Sí --> H[Se evalúa cada etapa del bloque encontrado]
    H --> I{¿La etapa tiene condición y el resultado esperado no se cumplió?}
    I -- Sí --> J[La etapa se descarta: queda en Cancelado con su motivo]
    I -- No --> K[La etapa pasa a Activo y genera su subticket con el bloque registrado si lo requiere]
    J --> L{¿Se descartaron todas las etapas del bloque?}
    K --> M[Bloque abierto: el flujo continúa aquí]
    L -- Sí --> E
    L -- No --> M
```

El tercer diagrama ilustra la diferencia de comportamiento con un ejemplo de cuatro actividades. Arriba, cómo avanza hoy; abajo, cómo avanzaría por bloques. Nótese que la etapa principal arranca al mismo tiempo que el bloque 1 y se cierra después del último bloque.

```mermaid
flowchart LR
    subgraph HOY["Hoy — encadenamiento etapa contra etapa"]
        direction LR
        A1[Etapa A - Principal] --> B1[Etapa B]
        A1 --> C1[Etapa C]
        B1 --> D1[Etapa D depende solo de B]
        C1 -.-> N1[C puede seguir abierta cuando D ya arrancó]
    end
    subgraph BLOQUES["Propuesta — ejecución por bloques"]
        direction LR
        INI(( Alta del ticket )) --> P2[Bloque principal - Etapa A]
        INI --> B2[Bloque 1 - Etapa B]
        INI --> C2[Bloque 1 - Etapa C]
        B2 --> BAR1(( Barrera ))
        C2 --> BAR1
        BAR1 --> D2[Bloque 2 - Etapa D]
        D2 --> BAR2(( Barrera ))
        BAR2 --> P2
        P2 --> FIN[La etapa principal se atiende al final y el ticket queda disponible para cerrarse]
    end
```

## 6. Índice de requerimientos

> **Navegación rápida:** cada identificador RF en la primera columna es un enlace que lleva directamente al detalle del requerimiento. Hacer clic para ir al RF.

| RF | Título | Sistema | Aplica a |
|----|--------|---------|----------|
| [RF-01](#rf-01) | Selección del modo de ejecución en el detalle del flujo de trabajo | Business Suite | Flujos de Trabajo / Configuración |
| [RF-02](#rf-02) | Definición de bloques en la configuración del flujo de trabajo | Business Suite | Flujos de Trabajo / Configuración |
| [RF-03](#rf-03) | Integridad del armado del flujo por bloques | Business Suite | Flujos de Trabajo / Configuración |
| [RF-04](#rf-04) | Registro y visualización del bloque en el ticket y en sus subtickets | Business Suite | Tickets de Cómputo |
| [RF-05](#rf-05) | Apertura del bloque principal y activación por barrera del siguiente bloque | Business Suite | Tickets de Cómputo |
| [RF-06](#rf-06) | Continuidad del flujo ante bloques vacíos o descartados | Business Suite | Tickets de Cómputo |
| [RF-07](#rf-07) | Condicionamiento de una etapa al resultado de una etapa previa | Business Suite | Flujos de Trabajo / Tickets de Cómputo |
| [RF-08](#rf-08) | Migración de los flujos configurados y de los tickets en curso | Business Suite | Transversal / Liberación |

---
---

<a id="rf-01"></a>
# RF-01 — Selección del Modo de Ejecución en el Detalle del Flujo de Trabajo

| Campo        | Valor      |
|--------------|------------|
| Prioridad    | Must       |
| Estado       | Definición |
| Dependencias | Ninguna    |

> **Habilita y condiciona a RF-02, RF-03, RF-04, RF-05, RF-06, RF-07 y RF-08:** todos ellos describen el comportamiento de un flujo configurado en modo Por bloques.

## Objetivo

Permitir que cada flujo de trabajo decida, desde su propio detalle, con qué mecanismo avanza —etapa contra etapa mediante el antecesor, como opera hoy, o por bloques—, para que el negocio adopte la ejecución por bloques en los procesos donde la necesita sin obligar a reorganizar aquellos que hoy funcionan correctamente.

## Descripción

El sistema deberá incorporar, en el **detalle del flujo de trabajo**, un campo **Modo de ejecución** con dos valores posibles y mutuamente excluyentes:

- **Escalonado por antecesor**: el comportamiento vigente. Cada etapa declara de cuál otra depende y arranca en cuanto esa única etapa concluye. No hay bloques ni barreras.
- **Por bloques**: el comportamiento que describen RF-02 a RF-08. Las etapas se agrupan en tandas numeradas y el siguiente bloque no arranca hasta que todas las etapas del bloque en curso concluyeron.

El modo de ejecución no es un dato informativo: es **el dato que decide qué reglas aplican** al flujo y a los tickets que genere. De él dependen tres cosas. La primera, **qué se captura en las etapas**: en modo por bloques el bloque es obligatorio y el antecesor no se captura; en modo escalonado el antecesor conserva su papel actual y el bloque no se pide ni se exige. La segunda, **qué se valida al guardar**: las validaciones de armado por bloques de RF-03 solo tienen sentido —y solo se ejecutan— en los flujos por bloques. La tercera, **cómo avanza el ticket**: la barrera de RF-05 y el avance en cadena de RF-06 se aplican únicamente a los tickets generados desde un flujo por bloques.

Los **flujos que ya existen** al momento de la liberación quedan en modo escalonado por antecesor. Esta es una decisión deliberada: nadie cambia de comportamiento sin pedirlo. Los **flujos nuevos** se presentan en modo por bloques por omisión, porque es el esquema al que el negocio quiere migrar, y el administrador puede cambiarlo antes de guardar.

El **cambio de modo** de un flujo ya configurado es la operación más delicada de este requerimiento y tiene reglas distintas en cada dirección. Al pasar de escalonado a bloques, el sistema ejecuta la conversión descrita en RF-08 sobre ese flujo y lo deja **pendiente de validación**: el nuevo modo no surte efecto hasta que el administrador revise y valide el reporte de conversión. Al pasar de bloques a escalonado, el sistema necesita algo que en modo por bloques dejó de capturarse —el antecesor de cada etapa— y por eso **impide el cambio** mientras existan etapas activas sin antecesor, o con una etapa condicionante distinta de su antecesor, señalando cuáles debe completar el administrador antes de reintentarlo.

Un cambio de modo **no toca los tickets en curso**. Cada ticket se sella con el modo del flujo en el momento de generarlo y termina de ejecutarse con ese mecanismo, exactamente con el mismo criterio con el que hoy se congela el resto de la configuración. Esto es lo que hace seguro cambiar el modo de un flujo que tiene trabajo en proceso.

### Diagrama del cambio de modo

```mermaid
flowchart TD
    A[El administrador cambia el modo de ejecución del flujo] --> B{¿Hacia qué modo?}
    B -- Hacia Por bloques --> C[Se ejecuta la conversión del flujo RF-08]
    C --> D{¿La conversión detectó etapas huérfanas?}
    D -- Sí --> E[Se reportan como inconsistencia: requieren asignación manual de bloque]
    D -- No --> F[El flujo queda pendiente de validación con su reporte de conversión]
    E --> F
    F --> G{¿El administrador valida el reporte?}
    G -- No, lo descarta --> H[El flujo regresa a modo Escalonado y conserva su configuración previa]
    G -- Sí --> I[El flujo opera en modo Por bloques: los tickets nuevos nacen sellados por bloques]
    B -- Hacia Escalonado --> J{¿Todas las etapas activas tienen antecesor y su condicionante coincide con él?}
    J -- No --> K[Se impide el cambio: se enlistan las etapas por completar]
    J -- Sí --> L[El flujo opera en modo Escalonado: los tickets nuevos nacen sellados etapa contra etapa]
    I --> M[Los tickets ya generados conservan el modo con el que nacieron]
    L --> M
```

### Información / atributos

| Campo | Obligatorio | Descripción |
|---|---|---|
| Modo de ejecución del flujo | Sí | Mecanismo con el que avanzan las etapas del flujo. Valores: **Escalonado por antecesor** o **Por bloques**. Valor por omisión: Por bloques en flujos nuevos; Escalonado por antecesor en los flujos que ya existían al liberar. |
| Estado de validación del modo | Sí, cuando el flujo se cambió a modo por bloques | Indica si la conversión asociada al cambio de modo ya fue validada por el administrador. Mientras esté pendiente, el flujo no opera con el modo nuevo (RF-08). |
| Modo de ejecución del ticket | Sí | Copia del modo del flujo tomada al generar el ticket. No cambia durante la vida del ticket. |
| Modo en el catálogo de flujos | Sí | El modo de ejecución se presenta en el detalle del flujo y está disponible como columna y criterio de filtrado en el listado del catálogo. |

### Operaciones

El administrador del flujo de trabajo deberá poder:
- Consultar el modo de ejecución de cualquier flujo desde su detalle y desde el listado del catálogo.
- Elegir el modo de ejecución al registrar un flujo nuevo.
- Cambiar el modo de ejecución de un flujo existente, sujeto a las reglas de cada dirección de cambio.
- Consultar la bitácora de cambios de modo de un flujo, con quién lo cambió y cuándo.

### Diseño UX/UI

El modo de ejecución se presenta en el encabezado del detalle del flujo de trabajo, junto con los datos que lo identifican, como una selección de dos opciones con su descripción a la vista, de modo que el administrador entienda qué implica cada una sin consultar documentación. Al cambiarlo, el sistema pide confirmación explícita y advierte del efecto: conversión pendiente de validación en un sentido, exigencia de antecesores en el otro, y en ambos casos que los tickets ya generados no se modifican. En la pestaña de flujo de trabajo del ticket se indica con qué modo opera ese ticket, y el indicador de avance por bloques se muestra únicamente cuando el modo es Por bloques.

---

## HU-1.1 — Configuración del modo de ejecución de un flujo

Como administrador del flujo de trabajo, quiero elegir desde el detalle de cada flujo si avanza etapa contra etapa o por bloques, para adoptar la ejecución por bloques solo en los procesos que la necesitan y dejar los demás operando como hoy.

### Reglas de negocio

**RN-1.1** Todo flujo de trabajo deberá tener un modo de ejecución declarado, con exactamente uno de dos valores: Escalonado por antecesor o Por bloques. El dato es obligatorio y no admite quedarse vacío.

**RN-1.2** Los flujos de trabajo que existan al momento de la liberación quedarán en modo Escalonado por antecesor, para conservar sin cambio el comportamiento con el que operan.

**RN-1.3** Un flujo de trabajo nuevo se presentará con el modo Por bloques por omisión, y el administrador podrá cambiarlo antes de guardarlo.

**RN-1.4** El modo de ejecución determinará qué datos se capturan en las etapas del flujo: en modo Por bloques el bloque es obligatorio y el antecesor no se captura (RN-2.3, RN-2.7); en modo Escalonado por antecesor el antecesor conserva su comportamiento actual y el bloque no se solicita ni se exige.

**RN-1.5** El modo de ejecución determinará qué validaciones de armado se ejecutan al guardar el flujo: las validaciones por bloques de RF-03 aplicarán únicamente a los flujos en modo Por bloques, y los flujos en modo Escalonado por antecesor conservarán las validaciones vigentes.

**RN-1.6** El cambio de modo Escalonado por antecesor a modo Por bloques disparará la conversión del flujo descrita en RF-08 y lo dejará pendiente de validación. El modo nuevo no surtirá efecto sobre los tickets que se generen hasta que el administrador valide el reporte de conversión (RN-8.7). Mientras la validación esté pendiente, el administrador podrá descartar la conversión, con lo que el flujo regresará al modo Escalonado por antecesor conservando su configuración previa sin cambios.

**RN-1.7** El cambio de modo Por bloques a modo Escalonado por antecesor se impedirá mientras existan etapas activas del flujo sin antecesor —salvo la etapa principal— o con una etapa condicionante distinta de su antecesor. El sistema deberá indicar qué etapas requieren completarse y habilitar la captura del antecesor para poder hacerlo.

**RN-1.8** Únicamente el administrador del flujo de trabajo con permiso de configuración podrá consultar y cambiar el modo de ejecución. Ningún otro perfil podrá modificarlo.

**RN-1.9** Todo cambio de modo de ejecución quedará registrado en la bitácora del flujo de trabajo con fecha, hora, usuario que lo realizó, modo anterior y modo nuevo.

**RN-1.10** El modo de ejecución podrá cambiarse aunque existan tickets abiertos generados a partir de ese flujo, porque esos tickets conservan el modo con el que nacieron (RN-1.12) y el cambio no altera trabajo en proceso.

**RN-1.11** El modo de ejecución se presentará en el detalle del flujo y estará disponible como columna y como criterio de filtrado en el listado del catálogo de flujos de trabajo.

### Criterios de Aceptación

**CA-1.1.1 — Configuración de un flujo nuevo en modo por bloques**
Dado que el administrador registra un flujo de trabajo nuevo
Cuando consulta el detalle del flujo antes de guardarlo
Entonces el sistema le presenta el modo de ejecución con el valor Por bloques por omisión y le solicita el bloque en la captura de cada etapa.

**CA-1.1.2 — Configuración de un flujo en modo escalonado**
Dado que el administrador registra un flujo de trabajo nuevo y selecciona el modo Escalonado por antecesor
Cuando captura las etapas del flujo
Entonces el sistema le solicita el antecesor de cada etapa conforme al comportamiento vigente, no le pide el bloque y no aplica las validaciones de armado por bloques.

**CA-1.1.3 — El modo de ejecución es obligatorio**
Dado que el administrador intenta guardar un flujo de trabajo sin modo de ejecución declarado
Cuando selecciona Guardar
Entonces el sistema impide el guardado e informa que el modo de ejecución es un dato requerido.

**CA-1.1.4 — Los flujos existentes conservan su comportamiento**
Dado un flujo de trabajo configurado antes de la liberación
Cuando el administrador consulta su detalle después de la liberación
Entonces el sistema lo muestra en modo Escalonado por antecesor y el flujo continúa generando tickets que avanzan etapa contra etapa, sin bloques ni barreras.

**CA-1.1.5 — Cambio a modo por bloques con conversión pendiente de validación**
Dado un flujo en modo Escalonado por antecesor con etapas encadenadas por antecesor
Cuando el administrador cambia el modo a Por bloques y confirma la operación
Entonces el sistema ejecuta la conversión del flujo, genera el reporte con la asignación de bloques resultante, deja el flujo pendiente de validación y advierte que el modo nuevo no aplicará a los tickets hasta validarlo.

**CA-1.1.6 — Cambio a modo escalonado sin antecesores capturados**
Dado un flujo en modo Por bloques cuyas etapas no tienen antecesor porque el dato dejó de capturarse
Cuando el administrador intenta cambiar el modo a Escalonado por antecesor
Entonces el sistema impide el cambio, indica qué etapas requieren antecesor y habilita su captura para poder completarlas.

**CA-1.1.7 — Cambio a modo escalonado con los antecesores completos**
Dado un flujo en modo Por bloques en el que todas las etapas activas ya tienen antecesor y cuya etapa condicionante coincide con su antecesor
Cuando el administrador cambia el modo a Escalonado por antecesor y confirma la operación
Entonces el sistema acepta el cambio, deja de aplicar las validaciones de armado por bloques y los tickets que se generen a partir de ese momento avanzan etapa contra etapa.

**CA-1.1.8 — Registro y restricción del cambio de modo**
Dado que el administrador con permiso de configuración cambió el modo de ejecución de un flujo
Cuando el coordinador de Cómputo consulta la bitácora del flujo
Entonces encuentra el registro del cambio con la fecha, la hora, el usuario, el modo anterior y el modo nuevo, y el sistema no le habilita a él la opción de modificarlo.

---

## HU-1.2 — Ejecución del ticket conforme al modo con el que nació

Como coordinador de Cómputo, quiero que cada ticket avance con el modo de ejecución que tenía su flujo el día en que se generó, para que un cambio de configuración no altere el trabajo que ya está en proceso.

### Reglas de negocio

**RN-1.12** Al generar un ticket, el sistema copiará el modo de ejecución del flujo al ticket, y ese modo gobernará su avance hasta el cierre.

**RN-1.13** Un cambio de modo de ejecución en la plantilla no modificará el modo de ningún ticket ya generado, esté abierto o cerrado.

**RN-1.14** Los tickets sellados en modo Por bloques avanzarán conforme a la regla de barrera de RF-05 y al avance en cadena de RF-06. Los tickets sellados en modo Escalonado por antecesor avanzarán etapa contra etapa conforme a la regla vigente y no presentarán agrupación ni indicador de avance por bloques.

**RN-1.15** Dentro de un mismo ticket no podrán convivir los dos mecanismos de avance: el modo sellado se aplica a la totalidad de sus etapas.

**RN-1.16** El modo con el que opera un ticket será visible en la pestaña de flujo de trabajo de su ticket principal, para que quien lo consulta sepa con qué reglas está avanzando.

### Criterios de Aceptación

**CA-1.2.1 — El ticket se sella con el modo de su flujo**
Dado un flujo de trabajo en modo Por bloques, convertido y validado
Cuando se genera un ticket a partir de la asignación de equipo de cómputo
Entonces el ticket queda registrado en modo Por bloques y su pestaña de flujo de trabajo presenta las etapas agrupadas con el indicador de avance por bloques.

**CA-1.2.2 — Un cambio de modo en la plantilla no altera un ticket abierto**
Dado un ticket generado a partir de un flujo que en ese momento estaba en modo Escalonado por antecesor
Cuando el administrador cambia ese flujo a modo Por bloques y valida su conversión
Entonces el ticket ya generado conserva el modo Escalonado por antecesor, termina de ejecutarse etapa contra etapa, y el modo nuevo aplica únicamente a los tickets generados a partir de la validación.

**CA-1.2.3 — Un ticket en modo escalonado avanza etapa contra etapa**
Dado un ticket en modo Escalonado por antecesor con tres etapas dependientes de una misma etapa previa y una cuarta que depende solo de la primera de ellas
Cuando el responsable registra la atención realizada de esa primera etapa
Entonces el sistema activa la cuarta etapa de inmediato, sin esperar a que las otras dos concluyan, conservando el comportamiento vigente.

**CA-1.2.4 — Un ticket en modo por bloques avanza por barrera**
Dado un ticket en modo Por bloques cuyo bloque 2 tiene tres etapas activas
Cuando el responsable registra la atención realizada de una de ellas y las otras dos siguen abiertas
Entonces el sistema no activa ninguna etapa del bloque 3 y mantiene el bloque 2 como bloque en curso.

**CA-1.2.5 — Presentación del ticket según su modo**
Dado un ticket en modo Escalonado por antecesor
Cuando el responsable consulta la pestaña de flujo de trabajo
Entonces el sistema presenta las etapas con la organización vigente, indica que el ticket opera en modo escalonado y no muestra encabezados de bloque ni indicador del tipo "Bloque 2 de 4".

---

**Regla transversal:**
El modo de ejecución es la puerta de entrada de todo este documento. RF-02 a RF-07 describen exclusivamente el comportamiento de un flujo en modo Por bloques y de los tickets sellados con ese modo; RF-08 describe cómo se llega a ese modo desde el escalonado. Un flujo en modo Escalonado por antecesor no ejecuta ninguna de esas reglas y conserva íntegramente su comportamiento actual.

---
---

<a id="rf-02"></a>
# RF-02 — Definición de Bloques en la Configuración del Flujo de Trabajo

| Campo        | Valor      |
|--------------|------------|
| Prioridad    | Must       |
| Estado       | Definición |
| Dependencias | RF-01      |

> **Aplica cuando:** el flujo de trabajo está configurado en modo **Por bloques** (RF-01). Un flujo en modo Escalonado por antecesor no ejecuta las reglas de este requerimiento.

## Objetivo

Permitir que el administrador agrupe las etapas de un flujo de trabajo en tandas numeradas, de manera que el flujo exprese la idea de negocio "estas actividades se trabajan juntas y hasta que todas terminen no empieza la siguiente tanda", sin tener que armar dependencias etapa por etapa.

## Descripción

El sistema deberá incorporar, en cada etapa del flujo de trabajo, un campo **Bloque** que indique a qué tanda pertenece esa actividad. El bloque es un número entero que empieza en 1 y avanza de uno en uno; todas las etapas que compartan el mismo número forman una tanda que se abre y se trabaja en paralelo.

La **etapa principal queda fuera de esa numeración**: por sí sola constituye el **bloque principal**, que es el bloque del propio ticket principal. No se le captura bloque, no ocupa el número 1 y no desplaza a nadie, porque su comportamiento es distinto al de los bloques de actividades: se abre junto con el bloque 1 y se cierra al final (RF-05). La numeración 1, 2, 3… queda entonces íntegramente disponible para las tandas de actividades, y el "bloque 1" es la primera tanda real de trabajo.

Todo lo que describe este requerimiento aplica a los flujos configurados en **modo Por bloques** (RF-01). En un flujo en modo Escalonado por antecesor el bloque no se captura ni se exige, y la configuración de sus etapas conserva su comportamiento actual.

Dentro de un flujo por bloques, el bloque **sustituye al antecesor como el mecanismo que gobierna el avance del flujo**. En el modo escalonado, cada etapa declara de qué otra etapa depende y arranca en cuanto esa dependencia se cierra; en el modo por bloques, lo que determina cuándo arranca una etapa es únicamente el bloque al que pertenece. Esto simplifica la configuración —el administrador piensa en tandas, no en cadenas— y elimina de raíz la posibilidad de armar dependencias circulares o etapas que nunca se alcanzan.

El campo **Orden** conserva su lugar, pero cambia de significado: dentro de un bloque ya no expresa secuencia de ejecución, porque todas las etapas del bloque se abren al mismo tiempo. Sirve únicamente para **presentar las etapas en un orden legible** dentro de su bloque, tanto en la configuración como en el ticket.

El campo **Antecesor** deja de capturarse en los flujos en modo por bloques. Se conserva como dato de consulta —histórico— y como insumo de la conversión descrita en RF-08, pero no interviene en la decisión de activar una etapa mientras el flujo opere por bloques. En los flujos en modo escalonado por antecesor el campo sigue capturándose con su comportamiento actual, y volverá a solicitarse si un flujo por bloques se regresa a ese modo (RN-1.7).

### Información / atributos

Estos son **todos los campos del detalle del flujo de trabajo** y lo que se requiere de cada uno cuando el flujo opera en modo Por bloques. La configuración por bloques no agrega trabajo de captura: reemplaza el armado de la cadena etapa por etapa por un solo número de tanda.

| Campo | En modo Por bloques | Descripción |
|---|---|---|
| Bloque | **Requerido**, salvo la etapa principal | Número entero mayor o igual a 1 que identifica la tanda a la que pertenece la etapa. Todas las etapas con el mismo número se abren juntas. Es el **único dato que determina cuándo se abre la etapa**. La etapa principal no lo captura: constituye el bloque principal. En flujos en modo Escalonado por antecesor no se captura. |
| Orden | Requerido | Número entero que determina la posición en la que se presenta la etapa **dentro de su bloque**. No influye en el momento de activación. Debe ser único dentro del bloque, pero puede repetirse entre bloques distintos. |
| Clave | Requerido | Clave de la etapa. Conserva efecto funcional: la clave del check list de entrega es la que dispara su generación al abrirse la etapa. |
| Nombre | Requerido | Nombre de la actividad, con el que se identifica en la configuración y en el ticket. |
| Servicio | Requerido cuando la etapa registra ticket | Tipo de servicio con el que se genera el subticket de la etapa. |
| Cuenta | Opcional | Cuenta o acceso al que está asociada la etapa. En etapas no mandatorias es lo que determina si la etapa se genera en el ticket: solo se genera cuando esa cuenta fue solicitada. |
| Principal | Requerido, uno por flujo | Marca la etapa del propio ticket principal, que constituye el bloque principal. Solo puede haber una por flujo y no lleva bloque numerado. |
| Mandatorio | Requerido | Indica que la etapa siempre forma parte del flujo del ticket, sin importar qué cuentas o accesos se hayan solicitado. |
| Registra ticket | Requerido | Indica si la etapa genera subticket al abrirse su bloque. |
| Departamento | Opcional | Se conserva como dato de clasificación de la etapa. No interviene en la activación ni en la resolución del responsable, que se resuelve desde la colección de Responsables por unidad de negocio. |
| Etapa condicionante | Opcional | Etapa de un bloque anterior cuyo resultado determina si esta etapa se activa o se descarta (RF-07). Sustituye la referencia implícita al antecesor: ahora se declara de forma explícita **de cuál** etapa depende. |
| Resultado esperado | Requerido cuando hay etapa condicionante | Resultado —SI o NA— que debe haberse registrado en la etapa condicionante para que esta etapa se active. Es el actual parámetro de activación, ahora con referencia explícita a la etapa que evalúa. |
| Antecesor | **No se captura** | En flujos por bloques es una referencia histórica a la etapa de la que dependía en el esquema anterior: solo lectura, no se captura en etapas nuevas y no interviene en la activación (RN-2.7). En flujos en modo escalonado conserva su obligatoriedad y su comportamiento actual. |
| Estatus | Requerido | Activo o Cancelado dentro del catálogo. Una etapa cancelada no forma parte del flujo. |
| Responsables | Al menos uno | Colección de responsables por unidad de negocio a quienes se dirige la etapa y su subticket. |

En el **listado de etapas del detalle del flujo**, un flujo en modo Por bloques presenta como columnas el Bloque —como primer criterio de ordenamiento ascendente—, el Orden, el Nombre, la Cuenta, la Etapa condicionante, el Resultado esperado, Principal, Mandatorio y Estatus. El Antecesor **no se presenta** en ese listado cuando el flujo opera por bloques; solo se muestra en los flujos en modo Escalonado por antecesor, donde sigue gobernando la activación.

### Operaciones

El administrador del flujo de trabajo deberá poder:
- Capturar el bloque al registrar una etapa nueva, salvo cuando la marca como principal: en ese caso el sistema no solicita el dato porque la etapa constituye el bloque principal.
- Modificar el bloque de una etapa existente mientras el flujo lo permita.
- Consultar el flujo con sus etapas **agrupadas por bloque**, en orden ascendente de bloque y, dentro de cada uno, en el orden capturado.

---

## HU-2.1 — Agrupación de las etapas en bloques

Como administrador del flujo de trabajo, quiero agrupar las etapas de un flujo en bloques numerados, para que el equipo trabaje por tandas completas y ninguna actividad arranque antes de que estén listos los insumos que produce la tanda anterior.

### Reglas de negocio

**RN-2.1** Las reglas de este requerimiento aplicarán únicamente a los flujos configurados en modo Por bloques (RN-1.4). En los flujos en modo Escalonado por antecesor el bloque no se captura, no se exige y no interviene en ninguna decisión.

**RN-2.2** En un flujo en modo Por bloques, cada etapa distinta de la principal deberá pertenecer a exactamente un bloque de actividades, identificado por un número entero mayor o igual a 1.

**RN-2.3** En un flujo en modo Por bloques, el bloque es un dato obligatorio para toda etapa distinta de la principal; no podrá guardarse una etapa sin bloque asignado.

**RN-2.4** La etapa principal constituye por sí sola el bloque principal y no lleva bloque numerado: el sistema no le solicitará el dato ni lo aceptará. La numeración de bloques de actividades empieza en 1 y no reserva ningún número para la etapa principal.

**RN-2.5** Dentro de un mismo bloque, el Orden determina únicamente la presentación de las etapas; no condiciona el momento en que se activan, porque todas las etapas del bloque se activan simultáneamente.

**RN-2.6** El Orden deberá ser único dentro de un mismo bloque. Dos etapas de bloques distintos podrán tener el mismo Orden sin que ello represente un conflicto.

**RN-2.7** En un flujo en modo Por bloques, el Antecesor deja de gobernar la activación de las etapas: se conserva como dato de consulta y no se captura en etapas nuevas. En un flujo en modo Escalonado por antecesor continúa gobernando la activación, tal como opera hoy.

### Criterios de Aceptación

**CA-2.1.1 — Captura del bloque en una etapa nueva**
Dado que el administrador registra una etapa nueva en un flujo de trabajo configurado en modo Por bloques
Cuando captura el bloque 2, un orden y los demás datos obligatorios de la etapa
Entonces el sistema guarda la etapa asociada al bloque 2 y la presenta agrupada junto con las demás etapas de ese bloque.

**CA-2.1.2 — El bloque es obligatorio**
Dado que el administrador registra una etapa nueva, no marcada como principal, y deja el bloque vacío
Cuando intenta guardar la etapa
Entonces el sistema impide el guardado e informa que el bloque es un dato requerido.

**CA-2.1.3 — Orden duplicado dentro del mismo bloque**
Dado que en el bloque 2 ya existe una etapa con orden 1
Cuando el administrador intenta guardar otra etapa del bloque 2 también con orden 1
Entonces el sistema impide el guardado e informa que el orden ya está utilizado dentro de ese bloque.

**CA-2.1.4 — Orden repetido en bloques distintos**
Dado que en el bloque 2 existe una etapa con orden 1
Cuando el administrador guarda una etapa del bloque 3 con orden 1
Entonces el sistema acepta el guardado, porque la unicidad del orden aplica dentro de cada bloque y no en todo el flujo.

**CA-2.1.5 — El antecesor ya no se captura en un flujo por bloques**
Dado que el administrador registra una etapa nueva en un flujo de trabajo configurado en modo Por bloques
Cuando revisa los datos disponibles para captura
Entonces el sistema no le solicita ni le permite capturar un antecesor, y presenta el bloque como el único dato que determina cuándo se abrirá la etapa.

**CA-2.1.6 — Presentación agrupada de la configuración**
Dado que un flujo de trabajo tiene su etapa principal, tres etapas en el bloque 1 y dos en el bloque 2
Cuando el administrador consulta el flujo
Entonces el sistema presenta las seis etapas agrupadas, con el bloque principal al inicio y después los bloques de actividades en orden ascendente y, dentro de cada bloque, en el orden capturado.

**CA-2.1.7 — La etapa principal no admite bloque numerado**
Dado que el administrador marca una etapa como principal
Cuando revisa los datos disponibles para captura
Entonces el sistema no le solicita el bloque para esa etapa, indica que constituye el bloque principal y no le permite asignarle un número de bloque.

---

**Regla transversal:**
El bloque capturado en la configuración es el que se copia al ticket en el momento de generarlo (RF-04) y el que gobierna la apertura de las etapas durante la ejecución (RF-05), siempre que el flujo esté en modo Por bloques (RF-01). Un cambio de bloque en la configuración surte efecto únicamente en los tickets que se generen a partir de ese momento.

---
---

<a id="rf-03"></a>
# RF-03 — Integridad del Armado del Flujo por Bloques

| Campo        | Valor        |
|--------------|--------------|
| Prioridad    | Must         |
| Estado       | Definición   |
| Dependencias | RF-01, RF-02 |

> **Aplica cuando:** el flujo de trabajo está configurado en modo **Por bloques** (RF-01). Los flujos en modo Escalonado por antecesor conservan las validaciones de armado vigentes.

## Objetivo

Impedir que se guarde un flujo de trabajo cuyo armado por bloques dejaría tickets detenidos sin salida, de modo que los errores de configuración se detecten al momento de capturarlos y no cuando un ticket ya está atorado en producción.

## Descripción

El sistema deberá **validar el armado completo del flujo cada vez que se guarde** un flujo en modo Por bloques, y no únicamente la etapa que se está capturando. En un flujo en modo Escalonado por antecesor estas validaciones no se ejecutan, porque no hay bloques que recorrer: ese flujo conserva las validaciones con las que opera hoy. Un flujo por bloques es correcto solo si se puede recorrer de principio a fin sin huecos: cualquier bloque faltante en la secuencia rompe la cadena y deja las etapas posteriores esperando un momento que nunca llegará.

Las validaciones son de dos naturalezas. Las **bloqueantes** impiden el guardado porque describen configuraciones que con certeza dejarían un ticket detenido. Las **advertencias** permiten guardar pero informan al administrador de un riesgo que puede ser deliberado: es el caso de un bloque compuesto en su totalidad por etapas condicionales, que en un ticket concreto podría quedar sin ninguna actividad. Ese escenario está previsto y resuelto en RF-06, por lo que no debe impedirse; pero el administrador debe saber que lo está configurando.

Se incluye también la validación de la **cancelación de etapas**. Cancelar una etapa dentro de la configuración no debe poder dejar un bloque intermedio sin ninguna etapa activa, porque el efecto es idéntico al de un hueco en la numeración.

### Validaciones

| Validación | Tipo | Comportamiento esperado |
|---|---|---|
| La numeración de bloques debe ser consecutiva desde 1, sin huecos | Bloqueante | Impide guardar e indica qué número de bloque falta. |
| Todo bloque declarado debe tener al menos una etapa activa | Bloqueante | Impide guardar e indica el bloque vacío. |
| La etapa principal debe existir y ser única en el flujo | Bloqueante | Impide guardar e indica la inconsistencia detectada. |
| La etapa principal no puede llevar bloque numerado | Bloqueante | Impide guardar e indica que la etapa principal constituye el bloque principal. |
| Ninguna etapa distinta de la principal puede quedar sin bloque | Bloqueante | Impide guardar e indica qué etapas requieren bloque. |
| Un bloque compuesto exclusivamente por etapas condicionales | Advertencia | Permite guardar e informa que ese bloque podría quedar sin actividades en algunos tickets. |
| Cancelar la única etapa activa de un bloque intermedio | Bloqueante | Impide la cancelación mientras existan bloques posteriores con etapas activas. |

---

## HU-3.1 — Validación del armado del flujo

Como administrador del flujo de trabajo, quiero que el sistema no me permita guardar un flujo con bloques mal armados, para no descubrir el error cuando un ticket ya quedó detenido y sin forma de cerrarse.

### Reglas de negocio

**RN-3.1** Las validaciones de este requerimiento se ejecutarán únicamente al guardar un flujo en modo Por bloques (RN-1.5). Un flujo en modo Escalonado por antecesor conservará las validaciones vigentes.

**RN-3.2** La numeración de los bloques de un flujo deberá ser consecutiva a partir de 1, sin huecos intermedios.

**RN-3.3** Todo bloque declarado en un flujo deberá tener al menos una etapa activa.

**RN-3.4** Todo flujo deberá tener una y solo una etapa principal, y esa etapa no deberá llevar bloque numerado, porque constituye el bloque principal (RN-2.4).

**RN-3.5** Ninguna etapa distinta de la principal podrá quedar sin bloque asignado.

**RN-3.6** Cuando un bloque se componga exclusivamente de etapas condicionales, el sistema deberá advertirlo al guardar, sin impedir la operación, porque ese bloque podría quedar sin actividades aplicables en un ticket concreto.

**RN-3.7** No podrá cancelarse la única etapa activa de un bloque cuando existan bloques posteriores con etapas activas, porque la cancelación dejaría un hueco en la numeración.

### Criterios de Aceptación

**CA-3.1.1 — Hueco en la numeración de bloques**
Dado que un flujo tiene etapas en los bloques 1, 2 y 4, y ninguna en el bloque 3
Cuando el administrador intenta guardar el flujo
Entonces el sistema impide el guardado e informa que el bloque 3 no tiene etapas y que la numeración debe ser consecutiva.

**CA-3.1.2 — Etapa sin bloque asignado**
Dado que un flujo tiene una etapa activa, distinta de la principal, que quedó sin bloque
Cuando el administrador intenta guardar el flujo
Entonces el sistema impide el guardado e informa qué etapa requiere bloque, porque solo la etapa principal puede prescindir de él.

**CA-3.1.3 — Etapa principal con bloque numerado**
Dado que el administrador marca como principal una etapa que tiene asignado el bloque 2
Cuando intenta guardar el flujo
Entonces el sistema impide el guardado e informa que la etapa principal constituye el bloque principal y no puede llevar bloque numerado.

**CA-3.1.4 — Advertencia por bloque enteramente condicional**
Dado que el bloque 3 de un flujo se compone únicamente de etapas condicionales no mandatorias
Cuando el administrador guarda el flujo
Entonces el sistema guarda la configuración y le advierte que el bloque 3 podría quedar sin actividades en los tickets donde ninguna de esas cuentas se solicite.

**CA-3.1.5 — Cancelación que dejaría un bloque vacío**
Dado que el bloque 2 de un flujo tiene una sola etapa activa y existe un bloque 3 con etapas activas
Cuando el administrador intenta cancelar esa etapa del bloque 2
Entonces el sistema impide la cancelación e informa que el bloque quedaría sin actividades y rompería la secuencia.

---

**Regla transversal:**
Estas validaciones operan sobre la configuración y garantizan que el flujo sea recorrible en el papel. No sustituyen a RF-06, que resuelve las situaciones que solo aparecen en tiempo de ejecución, cuando el caso concreto de un ticket deja un bloque sin actividades aplicables.

---
---

<a id="rf-04"></a>
# RF-04 — Registro y Visualización del Bloque en el Ticket y en sus Subtickets

| Campo        | Valor        |
|--------------|--------------|
| Prioridad    | Must         |
| Estado       | Definición   |
| Dependencias | RF-01, RF-02 |

> **Aplica cuando:** el ticket se generó a partir de un flujo en modo **Por bloques**. Los tickets sellados en modo Escalonado por antecesor no llevan bloque ni indicador de avance por bloques (RN-1.14).

## Objetivo

Llevar el bloque configurado hasta el ticket y hacer visible, para quien trabaja el flujo, en qué tanda va el trabajo, cuáles actividades están disponibles ahora y cuáles todavía no, de modo que nadie tenga que preguntar por qué su etapa aparece bloqueada. Además, dejar registrado en cada subticket que se genera el bloque del que proviene, para que el dato viaje con el propio ticket y no solo con el flujo del ticket principal.

## Descripción

El sistema deberá **copiar el bloque de cada etapa al ticket** en el momento de generarlo, junto con el modo de ejecución del flujo (RN-1.12) y los demás datos que hoy ya se copian: el orden, el responsable, el expediente del colaborador y la condición de activación. A partir de ese momento, el bloque registrado en el ticket es el que gobierna su ejecución, con independencia de que la configuración cambie después.

Esta congelación es deliberada y tiene una consecuencia que el negocio debe conocer: **si mañana se reorganizan los bloques de un flujo, los tickets que ya estaban abiertos terminan de ejecutarse con la organización que tenían al nacer**, y la nueva aplica solo a los tickets que se generen a partir de ese cambio. Es el mismo criterio con el que hoy opera el resto de la copia del flujo.

El bloque no se queda en el ticket principal: **cada subticket que el flujo genera se registra con el número de bloque de la etapa que lo originó**. El valor se toma en el momento en que el subticket se registra y se conserva sin cambio durante toda su vida, de manera que quien consulta un subticket suelto —o un listado de subtickets— puede saber de qué tanda del proceso proviene sin abrir el ticket principal ni reconstruir el flujo. El bloque queda además disponible como columna y como criterio de filtrado en los listados de tickets, que es lo que permite responder preguntas del tipo "¿qué trae pendiente el bloque 2 de todos los tickets abiertos?".

La presentación del flujo tiene un lugar único: en los tickets que operan por bloques, la **pestaña de flujo de trabajo estará disponible únicamente en el ticket principal**, y los subtickets dejarán de mostrarla. La razón es que el flujo por bloques es una propiedad del ticket principal —el bloque en curso, la barrera y el avance solo tienen sentido vistos sobre el conjunto—, mientras que el subticket existe para atender **una** actividad. Mostrar el flujo completo en cada subticket repite la misma información en tantos lugares como subtickets abiertos haya, invita a intentar capturar desde ahí una etapa que no le corresponde y confunde sobre dónde se trabaja cada cosa.

Esto no deja al subticket sin contexto: conserva el **bloque con el que se registró** —el grupo escalonado— como dato propio y consultable, y conserva su vínculo con el ticket principal, que es donde se consulta el flujo completo. Los tickets que operan en modo escalonado por antecesor no se ven afectados por esta restricción y conservan la presentación con la que operan hoy.

En la presentación, el flujo de trabajo del ticket principal deberá mostrarse **agrupado por bloque**, en orden ascendente, con una indicación clara de cuál es el bloque en curso y un **indicador de avance** del tipo "Bloque 2 de 4". El indicador se calcula sobre los bloques que efectivamente tienen etapas en ese ticket, no sobre los que existen en la plantilla, para que el número que ve el usuario corresponda con lo que realmente va a trabajar.

Las etapas de bloques posteriores permanecen visibles pero **no editables**: el responsable puede ver que su actividad viene más adelante y qué falta para que se abra, pero no puede adelantarse a capturarla. Esta restricción se suma —no sustituye— a la restricción vigente de que una etapa solo la edita el departamento responsable de esa etapa.

### Información / atributos

| Campo | Obligatorio | Descripción |
|---|---|---|
| Modo de ejecución del ticket | Sí | Copia del modo de ejecución del flujo al momento de generar el ticket. Determina si el ticket se presenta y avanza por bloques o etapa contra etapa. No cambia durante la vida del ticket (RN-1.13). |
| Bloque de la etapa en el ticket | Sí, en tickets en modo Por bloques | Copia del bloque configurado en la plantilla al momento de generar el ticket. No cambia durante la vida del ticket. |
| Bloque en curso | Sí, en tickets en modo Por bloques | Número del bloque cuyas etapas están actualmente activas. Es único: solo puede haber un bloque en curso a la vez. |
| Indicador de avance | Sí, en tickets en modo Por bloques | Texto que expresa el bloque en curso respecto del total de bloques con etapas en ese ticket (por ejemplo, "Bloque 2 de 4"). No se presenta en los tickets en modo Escalonado por antecesor. |
| Bloque del subticket (grupo escalonado) | Sí, cuando el subticket lo genera el flujo | Número de bloque de la etapa que originó el subticket, tomado al momento de registrarlo. No cambia durante la vida del subticket. Los subtickets que no provienen del flujo escalonado no lo llevan. |
| Bloque en los listados de tickets | Sí | El bloque del subticket se presenta como columna consultable y como criterio de filtrado en los listados de tickets. |

### Diseño UX/UI

Dentro de la pestaña de flujo de trabajo del ticket principal, las etapas se presentan agrupadas bajo un encabezado por bloque. El **bloque principal se presenta primero y por separado**, señalado como el bloque del propio ticket, para que se entienda que acompaña a todo el flujo y no forma parte de la fila; mientras queden bloques pendientes se indica ahí mismo que aún no puede cerrarse. Después van los bloques de actividades: el bloque en curso se distingue visualmente de los ya concluidos y de los pendientes, y el indicador de avance se muestra en la parte superior de la pestaña. En los subtickets de un ticket por bloques la pestaña no se presenta: el subticket muestra su propio bloque —el grupo escalonado con el que se registró— entre sus datos, y el acceso al ticket principal, que es donde se consulta el flujo completo.

El cambio de fondo respecto de la presentación vigente es que **el bloque deja de ser una columna más y pasa a ser el agrupador de la rejilla**. Las columnas del listado se conservan —etapa, responsable, departamento responsable, atención realizada, estatus, quién finalizó y cuándo—, con la salvedad de que la columna de antecesor deja de presentarse, porque el agrupamiento por bloque la sustituye, y de que el orden solo ordena las filas dentro de su bloque.

Así se vería la pestaña en un ticket con tres bloques de actividades, con el bloque 1 ya concluido y el bloque 2 en curso:

```text
┌─ Flujo de trabajo ──────────────────────────────── Bloque 2 de 3 ──┐
│                                                                     │
│ ▼ BLOQUE PRINCIPAL · Abierto — se cierra al final                   │
│   Etapa              Responsable   Depto.   Atención   Estatus      │
│   Asignación equipo   Responsable A  CAU       —       Activo       │
│                                     (i) Pendientes: bloques 2 y 3   │
│                                                                     │
│ > BLOQUE 1 · Concluido (3 de 3)                                     │
│   Alta de correo      Responsable B  Redes     SI      Atendido     │
│   Directorio activo   Responsable B  Redes     SI      Atendido     │
│   Perfil seguridad    Responsable C  Segur.    NA      Cancelado    │
│                                                                     │
│ ▼ BLOQUE 2 · En curso (1 de 2)                                      │
│   Configuración red   Responsable D  Redes     SI      Atendido     │
│   Alta de VPN         Responsable D  Redes     —       Activo    E  │
│                                                                     │
│ > BLOQUE 3 · En espera                                              │
│   Check list entrega  Responsable E  CAU       —       Espera    L  │
└─────────────────────────────────────────────────────────────────────┘

E = editable      L = solo lectura
```

Los elementos que definen esa vista son cinco:

1. **Indicador de avance en la parte superior**, del tipo "Bloque 2 de 3", calculado sobre los bloques de actividades con etapas en ese ticket. El bloque principal no entra en el conteo (RN-4.3).
2. **El bloque principal va primero y aparte**, siempre abierto, con la leyenda de que se cierra al final y qué bloques siguen pendientes. Es lo que hace entendible que todavía no pueda darse por atendido (RN-5.13).
3. **Cada grupo indica su estado** —concluido, en curso o en espera— y su avance interno; el bloque en curso se distingue visualmente de los demás.
4. **Solo el bloque en curso y el bloque principal son editables**. Las etapas de bloques posteriores se ven en solo lectura, con la indicación de que pertenecen a un bloque posterior, y sobre ello sigue aplicando la restricción por departamento responsable (RN-4.2 y RNF-006).
5. **La columna de antecesor desaparece** de esta vista, sustituida por el agrupamiento por bloque.

---

## HU-4.1 — Visibilidad del avance por bloques

Como responsable de una etapa del flujo de trabajo, quiero ver el flujo agrupado por bloques y saber cuál está en curso, para entender por qué mi actividad todavía no está disponible y qué falta para que se abra.

### Reglas de negocio

**RN-4.1** Cada etapa del ticket conservará el número de bloque con el que se configuró al momento del alta, y el ticket conservará el modo de ejecución con el que nació; los cambios posteriores en la plantilla —de bloque o de modo— no afectarán a los tickets ya generados.

**RN-4.2** Únicamente las etapas del bloque en curso y la etapa principal podrán editarse. Las etapas de bloques posteriores permanecerán visibles y no editables, además de la restricción vigente por departamento responsable. La etapa principal, aunque editable durante todo el flujo, no admitirá el registro de su atención realizada hasta que todos los bloques de actividades concluyan (RN-5.2).

**RN-4.3** El indicador de avance se calculará sobre los bloques de actividades que tengan al menos una etapa en ese ticket, excluyendo los bloques de la plantilla que no generaron ninguna etapa en el caso concreto. El bloque principal no se cuenta en el indicador: se presenta aparte, porque acompaña a todo el flujo.

**RN-4.4** Solo podrá existir un bloque de actividades en curso a la vez dentro de un mismo ticket. El bloque principal permanecerá abierto en paralelo con ese bloque en curso durante todo el flujo.

**RN-4.5** En los tickets que operan en modo Por bloques, la pestaña de flujo de trabajo estará disponible únicamente en el ticket principal. Los subtickets de ese ticket no la presentarán, ni siquiera en solo lectura, y conservarán el bloque con el que se registraron como dato propio (RN-4.6) junto con el vínculo al ticket principal. Los tickets en modo Escalonado por antecesor conservarán la presentación vigente.

### Criterios de Aceptación

**CA-4.1.1 — Presentación agrupada del flujo en el ticket**
Dado un ticket cuyo flujo tiene la etapa principal, tres etapas en el bloque 1 y dos en el bloque 2
Cuando el coordinador de Cómputo consulta la pestaña de flujo de trabajo
Entonces el sistema presenta el bloque principal al inicio y después las etapas agrupadas bajo el encabezado de su bloque, en orden ascendente de bloque.

**CA-4.1.2 — Indicador del bloque en curso**
Dado un ticket con cuatro bloques de actividades, cuyo bloque 1 ya está concluido y cuyas etapas del bloque 2 están activas
Cuando el responsable consulta la pestaña de flujo de trabajo
Entonces el sistema muestra el indicador "Bloque 2 de 4" —sin contar el bloque principal— y distingue visualmente el bloque 2 como el bloque en curso.

**CA-4.1.3 — Indicador que excluye bloques sin etapas**
Dado un flujo configurado con cinco bloques de actividades, en el que un ticket concreto no generó ninguna etapa del bloque 4 porque esas cuentas no fueron solicitadas
Cuando el responsable consulta el indicador de avance
Entonces el sistema muestra un total de cuatro bloques, no de cinco, porque el bloque sin etapas no forma parte del trabajo de ese ticket.

**CA-4.1.4 — Etapa de bloque posterior no editable**
Dado que el bloque 2 está en curso y el responsable del departamento de una etapa del bloque 3 abre el ticket
Cuando intenta capturar la información de su etapa del bloque 3
Entonces el sistema le muestra la etapa en solo lectura, indica que pertenece a un bloque posterior y no le permite capturar ni registrar la atención realizada.

**CA-4.1.5 — Un cambio en la plantilla no altera un ticket en curso**
Dado un ticket generado cuando la etapa de alta de VPN estaba configurada en el bloque 2
Cuando el administrador mueve esa etapa al bloque 3 en la configuración del flujo
Entonces el ticket ya generado conserva la etapa en el bloque 2 y continúa ejecutándose con esa organización, y el cambio aplica únicamente a los tickets generados a partir de ese momento.

**CA-4.1.6 — El subticket de un ticket por bloques no presenta el flujo de trabajo**
Dado un subticket generado por un ticket principal que opera en modo Por bloques
Cuando el responsable lo abre para atender su actividad
Entonces el sistema no le presenta la pestaña de flujo de trabajo, ni siquiera en solo lectura, y le muestra el bloque con el que se registró el subticket y el vínculo al ticket principal.

**CA-4.1.7 — El flujo se consulta en el ticket principal**
Dado el ticket principal en modo Por bloques del que provienen esos subtickets
Cuando el coordinador de Cómputo lo consulta
Entonces el sistema presenta ahí la pestaña de flujo de trabajo con las etapas agrupadas por bloque y el indicador de avance, como único lugar donde se consulta el flujo completo.

**CA-4.1.8 — Un ticket escalonado conserva su presentación**
Dado un subticket generado por un ticket principal que opera en modo Escalonado por antecesor
Cuando el responsable lo abre
Entonces el sistema conserva la presentación vigente del flujo de trabajo en ese subticket, porque la restricción de RN-4.5 aplica únicamente a los tickets que operan por bloques.

**CA-4.1.9 — El bloque principal se presenta aparte y abierto desde el inicio**
Dado un ticket recién generado en modo Por bloques
Cuando el coordinador de Cómputo consulta la pestaña de flujo de trabajo
Entonces el sistema presenta el bloque principal y el bloque 1 como abiertos al mismo tiempo, distingue el bloque principal como el bloque paraguas del ticket y señala que se cerrará al final.

---

## HU-4.2 — Registro del bloque en el subticket generado

Como coordinador de Cómputo, quiero que cada subticket que genera el flujo traiga registrado el bloque —el grupo escalonado— al que perteneció la etapa que lo originó, para saber de qué tanda del proceso proviene cada atención sin tener que abrir el ticket principal y para poder agrupar y filtrar el trabajo por bloque.

### Reglas de negocio

**RN-4.6** Todo subticket que el sistema genere a partir de una etapa del flujo se registrará con el número de bloque al que pertenecía esa etapa dentro del ticket, tomado en el momento en que el subticket se registra.

**RN-4.7** El bloque será un dato obligatorio de los subtickets generados por el flujo: ninguno podrá quedar registrado sin bloque. Si el bloque no puede determinarse, el subticket no se registra y la apertura del bloque se revierte conforme a la regla transversal de RF-05.

**RN-4.8** El bloque registrado en el subticket no cambiará durante su vida: no lo altera una reorganización posterior de la plantilla ni el avance del ticket principal a bloques posteriores. Es el bloque con el que nació.

**RN-4.9** El bloque del subticket se mostrará en la consulta del propio subticket y estará disponible como columna y como criterio de filtrado en los listados de tickets.

**RN-4.10** Los subtickets que no provienen del flujo escalonado no llevarán bloque, y su ausencia no se tratará como error ni como dato incompleto.

### Criterios de Aceptación

**CA-4.2.1 — El subticket nace con el bloque de su etapa**
Dado un flujo cuyo bloque 2 contiene la etapa de alta de correo electrónico marcada para registrar ticket
Cuando el bloque 2 se abre y el sistema genera el subticket de esa etapa
Entonces el subticket queda registrado con el bloque 2 como grupo escalonado al que perteneció la etapa que lo originó, y ese valor es consultable desde el propio subticket.

**CA-4.2.2 — Todos los subtickets de una misma apertura traen su bloque**
Dado un bloque 3 con tres etapas marcadas para registrar ticket
Cuando el bloque 2 queda cerrado y el sistema abre el bloque 3 generando los tres subtickets en una sola operación
Entonces los tres subtickets quedan registrados con el bloque 3, cada uno dirigido al responsable configurado de su etapa.

**CA-4.2.3 — El bloque del subticket no cambia al avanzar el flujo**
Dado un subticket generado desde una etapa del bloque 2 y ya atendido
Cuando el ticket principal cierra el bloque 2 y abre el bloque 3
Entonces el subticket conserva el bloque 2 con el que se registró y no adopta el bloque en curso del ticket principal.

**CA-4.2.4 — Consulta y filtrado de los subtickets por bloque**
Dado un conjunto de tickets abiertos con subtickets generados en distintos bloques
Cuando el coordinador de Cómputo consulta el listado de tickets y filtra por el bloque 2
Entonces el sistema muestra únicamente los subtickets registrados con el bloque 2 y presenta el bloque como columna del listado.

**CA-4.2.5 — Un subticket ajeno al flujo escalonado no requiere bloque**
Dado un subticket registrado por una vía distinta al flujo escalonado de asignación de cómputo
Cuando el usuario lo consulta
Entonces el sistema lo presenta sin bloque, no lo señala como incompleto y no impide su atención ni su cierre.

---

**Regla transversal:**
La restricción de edición por bloque se suma a la restricción vigente por departamento responsable. Una etapa es editable únicamente cuando pertenece al bloque en curso, está activa y el usuario pertenece al departamento responsable de esa etapa; si cualquiera de las tres condiciones falla, la etapa se presenta en solo lectura. Esa evaluación ocurre en un solo lugar, porque en los tickets por bloques el flujo únicamente se presenta en el ticket principal (RN-4.5): el subticket no es una segunda vía para capturar una etapa.

---
---

<a id="rf-05"></a>
# RF-05 — Apertura del Bloque Principal y Activación por Barrera del Siguiente Bloque

| Campo        | Valor                |
|--------------|----------------------|
| Prioridad    | Must                 |
| Estado       | Definición           |
| Dependencias | RF-01, RF-02, RF-04  |

> **Aplica cuando:** el ticket se generó a partir de un flujo en modo **Por bloques**. Los tickets sellados en modo Escalonado por antecesor avanzan etapa contra etapa y no atraviesan barreras (RN-1.14).

## Objetivo

Garantizar que el siguiente bloque de actividades se abra únicamente cuando todas las actividades del bloque en curso hayan concluido, de modo que ninguna actividad comience antes de que estén listos los insumos que produce la tanda anterior; y que el bloque principal —el del propio ticket— arranque desde el inicio junto con el primer bloque y no pueda cerrarse antes de que todo el trabajo esté terminado.

## Descripción

La ejecución arranca con una **apertura conjunta**: al generar el ticket, el sistema abre en la misma operación el **bloque principal** y el **bloque 1**. El bloque principal no impone barrera al bloque 1 ni espera su turno, porque el ticket principal existe desde el primer momento; ambos quedan disponibles a la vez, cada etapa que esté marcada para registrar ticket genera su subticket, y las etapas de los bloques 2 en adelante quedan en Espera.

A partir de ahí, el avance de los bloques de actividades funciona en fila: el bloque 2 no se abre hasta que el bloque 1 queda cerrado, el bloque 3 no se abre hasta que se cierra el bloque 2, y así sucesivamente. **Mientras un bloque no cierre, no se detonan las etapas ni los subtickets del siguiente.**

El bloque principal tiene la regla inversa: **no puede cerrarse mientras quede algún bloque de actividades sin concluir**. El sistema deberá impedir el registro de la atención realizada de la etapa principal en ese caso, e informar cuántos bloques o cuáles etapas siguen pendientes. Cuando el último bloque de actividades queda cerrado, la etapa principal queda disponible para atenderse y su cierre es el que da por concluido el flujo.

En los tickets sellados en modo Por bloques, el sistema deberá evaluar, **cada vez que una etapa concluye**, si el bloque al que pertenece quedó completamente cerrado. En los tickets sellados en modo Escalonado por antecesor esta evaluación no ocurre: al concluir una etapa se activan las etapas que dependían de ella, conforme a la regla vigente. Un bloque se considera cerrado cuando ninguna de sus etapas permanece en Espera ni en Activo, es decir, cuando todas quedaron en un estatus terminal: Atendido, porque el responsable registró la atención realizada, o Cancelado, porque el sistema las descartó por no aplicar al caso.

Mientras el bloque en curso no esté cerrado, **el sistema no modifica ninguna etapa de bloques posteriores**: no las activa, no las cancela y no genera sus subtickets. Esta es la diferencia esencial con el comportamiento actual, donde el cierre de una sola actividad bastaba para abrir a las que dependían de ella.

Cuando el bloque queda cerrado, el sistema abre el siguiente bloque que tenga etapas pendientes **en una sola operación**: todas sus etapas pasan a estar disponibles al mismo tiempo y cada una que esté marcada para registrar ticket genera su subticket dirigido al responsable configurado, registrado con el número de bloque del que proviene. Si una etapa del bloque tiene una condición que no se cumple, se descarta en ese mismo momento (RF-07) y no llega a abrirse.

El sistema deberá evitar la generación de subtickets duplicados: si por cualquier razón ya existe un subticket no cancelado asociado a una etapa, no se genera un segundo.

Cuando no exista ningún bloque de actividades posterior con etapas pendientes, el flujo entra en su tramo final: la etapa principal queda disponible y, al registrarse su atención realizada, ninguna etapa del ticket permanece en Espera ni en Activo y el ticket principal queda disponible para cerrarse conforme a sus reglas vigentes.

### Momento en que ocurre la evaluación

La evaluación se dispara al **registrar la atención realizada de una etapa y guardarla**. No existe una acción independiente de "finalizar bloque": el bloque se cierra solo, cuando su última etapa pendiente concluye. Esto conserva la forma de trabajar actual del responsable, que no necesita aprender un paso nuevo. La apertura conjunta del bloque principal y del bloque 1, en cambio, ocurre una sola vez y no la dispara ninguna persona: es parte de la generación del ticket.

---

## HU-5.1 — Arranque del ticket y cierre completo del bloque antes de abrir el siguiente

Como coordinador de Cómputo, quiero que el ticket arranque abriendo a la vez el bloque principal y el primer bloque de actividades, y que cada bloque siguiente se abra solo cuando todas las actividades del bloque en curso hayan terminado, para que el trabajo empiece de inmediato y ninguna actividad se ejecute sobre información incompleta.

### Reglas de negocio

**RN-5.1** La regla de barrera se aplicará únicamente a los tickets sellados en modo Por bloques (RN-1.14). Los tickets sellados en modo Escalonado por antecesor conservarán la activación etapa contra etapa vigente.

**RN-5.2** Una etapa se considerará concluida cuando quede en estatus Atendido o en estatus Cancelado. Ambos cuentan por igual para efectos de cerrar el bloque.

**RN-5.3** Un bloque se considerará cerrado cuando ninguna de sus etapas permanezca en estatus Espera ni en estatus Activo.

**RN-5.4** Mientras el bloque en curso no esté cerrado, ninguna etapa de un bloque posterior cambiará de estatus ni generará subticket.

**RN-5.5** Al cerrarse el bloque en curso, todas las etapas del siguiente bloque con etapas pendientes se abrirán en una sola operación.

**RN-5.6** Cada etapa que se abra y esté marcada para registrar ticket generará un subticket dirigido al responsable configurado para esa etapa. Cada subticket que se genere quedará registrado con el número de bloque de la etapa que lo originó (RN-4.6). No se generará un segundo subticket si ya existe uno no cancelado asociado a esa misma etapa.

**RN-5.7** En ningún momento podrán coexistir etapas activas de más de un bloque de actividades dentro de un mismo ticket. Las etapas del bloque principal quedan fuera de esta restricción: coexisten con el bloque de actividades en curso durante todo el flujo.

**RN-5.8** Cuando no exista ningún bloque de actividades posterior con etapas pendientes, el sistema no abrirá bloques adicionales y la etapa principal quedará disponible para atenderse (RN-5.13). El flujo del ticket se dará por concluido al registrarse la atención realizada de esa etapa principal.

**RN-5.9** La apertura de cada bloque y la activación de cada etapa quedarán registradas en la bitácora del ticket, con fecha, hora y el evento que las originó.

**RN-5.10** Al generar un ticket en modo Por bloques, el sistema abrirá en una sola operación el bloque principal y el bloque 1, y generará los subtickets de las etapas de ambos que estén marcadas para registrar ticket. El bloque principal no condiciona la apertura del bloque 1 ni la retrasa. Si en ese ticket el bloque 1 no generó ninguna etapa —porque todas eran condicionales y ninguna se solicitó—, el sistema aplicará el avance en cadena de RN-6.1 desde el arranque y abrirá el primer bloque posterior que sí tenga etapas. Si ningún bloque de actividades tiene etapas en ese ticket, el bloque principal quedará abierto y disponible para atenderse de inmediato.

**RN-5.11** Las etapas de los bloques 2 y posteriores quedarán en estatus Espera al generar el ticket, y no cambiarán de estatus ni generarán subticket hasta que se cierre el bloque que las precede.

### Criterios de Aceptación

**CA-5.1.1 — El bloque no cierra mientras haya actividades pendientes**
Dado un bloque 2 con tres etapas activas, de las cuales una se atiende y dos siguen abiertas
Cuando el responsable registra la atención realizada de esa primera etapa y la guarda
Entonces el sistema deja la etapa en Atendido, mantiene el bloque 2 como bloque en curso y no activa ninguna etapa del bloque 3 ni genera subtickets.

**CA-5.1.2 — Apertura del siguiente bloque al concluir la última etapa**
Dado un bloque 2 con tres etapas, de las cuales dos ya están en Atendido y una sigue activa
Cuando el responsable registra la atención realizada de la última etapa pendiente y la guarda
Entonces el sistema da por cerrado el bloque 2, activa todas las etapas del bloque 3 en una sola operación y lo señala como el nuevo bloque en curso.

**CA-5.1.3 — Generación simultánea de los subtickets del bloque**
Dado un bloque 3 con cuatro etapas, de las cuales tres están marcadas para registrar ticket
Cuando el bloque 2 queda cerrado y el bloque 3 se abre
Entonces el sistema genera los tres subtickets correspondientes, cada uno dirigido al responsable configurado de su etapa, y deja la cuarta etapa activa sin subticket.

**CA-5.1.4 — No se duplican los subtickets**
Dado que una etapa del bloque 3 ya tiene un subticket no cancelado asociado
Cuando el sistema vuelve a evaluar la apertura de ese bloque
Entonces el sistema no genera un segundo subticket para esa etapa y conserva el existente.

**CA-5.1.5 — Una etapa descartada también cierra el bloque**
Dado un bloque 2 con dos etapas, de las cuales una quedó en Atendido y la otra fue descartada por el sistema
Cuando se evalúa el estado del bloque
Entonces el sistema considera el bloque 2 como cerrado y abre el bloque 3, porque una etapa descartada cuenta como concluida.

**CA-5.1.6 — Cierre del último bloque de actividades**
Dado un ticket cuyo último bloque de actividades tiene una sola etapa activa
Cuando el responsable registra la atención realizada de esa etapa y la guarda
Entonces el sistema no abre ningún bloque adicional y deja la etapa principal disponible para atenderse, sin dar por concluido el flujo todavía.

**CA-5.1.7 — No coexisten dos bloques de actividades abiertos**
Dado un ticket cuyo bloque 3 acaba de abrirse
Cuando el coordinador consulta el flujo de trabajo
Entonces el sistema muestra etapas activas únicamente del bloque 3 y del bloque principal, con las del bloque 2 concluidas y las del bloque 4 en espera.

**CA-5.1.8 — Apertura conjunta del bloque principal y del bloque 1**
Dado un flujo en modo Por bloques con su etapa principal, tres etapas en el bloque 1 y dos en el bloque 2
Cuando se genera el ticket a partir de la asignación de equipo de cómputo
Entonces el sistema abre en una sola operación el bloque principal y las tres etapas del bloque 1, genera los subtickets que correspondan a esas etapas y deja las dos etapas del bloque 2 en Espera.

**CA-5.1.9 — El bloque 2 no se detona hasta cerrar el bloque 1**
Dado un ticket recién generado cuyo bloque 1 tiene tres etapas activas
Cuando el responsable atiende dos de ellas y la tercera sigue abierta
Entonces el sistema no activa ninguna etapa del bloque 2 ni genera sus subtickets, y mantiene el bloque 1 como bloque de actividades en curso.

**CA-5.1.10 — Bloque 1 sin etapas generadas en el ticket**
Dado un flujo cuyo bloque 1 se compone solo de etapas condicionales y un ticket en el que ninguna de esas cuentas fue solicitada
Cuando se genera el ticket
Entonces el sistema abre el bloque principal y, en la misma operación, omite el bloque 1 y abre el primer bloque posterior con etapas, dejándolo como bloque en curso.

**CA-5.1.11 — Ticket sin bloques de actividades**
Dado un ticket en el que ningún bloque de actividades generó etapas
Cuando se genera el ticket
Entonces el sistema abre únicamente el bloque principal y lo deja disponible para atenderse de inmediato, porque no hay bloques pendientes que esperar.

---

## HU-5.2 — Cierre del bloque principal al final del flujo

Como coordinador de Cómputo, quiero que el bloque principal no pueda cerrarse hasta que todos los bloques de actividades hayan terminado, para que el ticket principal no se dé por atendido mientras siga habiendo trabajo pendiente en el flujo.

### Reglas de negocio

**RN-5.12** El bloque principal permanecerá abierto desde la generación del ticket hasta que todos los bloques de actividades de ese ticket queden concluidos.

**RN-5.13** El sistema impedirá el registro de la atención realizada de la etapa principal mientras exista al menos una etapa de un bloque de actividades en estatus Espera o en estatus Activo, e informará qué bloques o etapas siguen pendientes. La etapa principal sí admitirá captura de su información durante ese tiempo: lo que se impide es darla por atendida.

**RN-5.14** Al quedar concluidos todos los bloques de actividades, la etapa principal quedará disponible para atenderse. El registro de su atención realizada dará por concluido el flujo y dejará el ticket principal disponible para cerrarse conforme a sus reglas vigentes.

**RN-5.15** El cierre del bloque principal quedará registrado en la bitácora del ticket como el evento que concluye el flujo, y también quedará registrado todo intento rechazado de cerrarlo antes de tiempo, con el motivo del rechazo.

### Criterios de Aceptación

**CA-5.2.1 — Rechazo del cierre del bloque principal con bloques pendientes**
Dado un ticket en modo Por bloques cuyo bloque 2 sigue en curso y cuyo bloque 3 está en Espera
Cuando el responsable de la etapa principal intenta registrar su atención realizada
Entonces el sistema impide la operación e informa que el bloque principal solo puede cerrarse cuando todos los bloques de actividades hayan concluido, señalando los bloques pendientes.

**CA-5.2.2 — La etapa principal admite captura aunque no pueda cerrarse**
Dado el mismo ticket con bloques de actividades pendientes
Cuando el responsable captura información en la etapa principal sin registrar la atención realizada
Entonces el sistema acepta y conserva la captura, y mantiene la etapa principal en estatus Activo.

**CA-5.2.3 — La etapa principal queda disponible al concluir el último bloque**
Dado un ticket cuyo último bloque de actividades acaba de quedar cerrado
Cuando el responsable de la etapa principal la consulta
Entonces el sistema le indica que ya no hay bloques pendientes y le permite registrar la atención realizada.

**CA-5.2.4 — El cierre del bloque principal concluye el flujo**
Dado un ticket cuyos bloques de actividades están todos concluidos y cuya etapa principal es la única activa
Cuando el responsable registra la atención realizada de la etapa principal y la guarda
Entonces el sistema da por concluido el flujo, deja el ticket principal disponible para cerrarse y registra el cierre del bloque principal en la bitácora.

---

**Regla transversal:**
La apertura de un bloque es una operación indivisible: o se abren todas sus etapas aplicables con sus subtickets, o no se abre ninguna. Si la generación de un subticket falla, la apertura completa del bloque debe revertirse y notificarse, para no dejar el flujo en un estado intermedio en el que unas etapas quedaron activas y otras no. Esto aplica también a la apertura conjunta del arranque: si falla la generación de un subticket del bloque principal o del bloque 1, la apertura completa se revierte.

---
---

<a id="rf-06"></a>
# RF-06 — Continuidad del Flujo ante Bloques Vacíos o Descartados

| Campo        | Valor                |
|--------------|----------------------|
| Prioridad    | Must                 |
| Estado       | Definición           |
| Dependencias | RF-01, RF-05, RF-07  |

> **Aplica cuando:** el ticket se generó a partir de un flujo en modo **Por bloques**. El invariante de no bloqueo de RN-6.3, en cambio, se verifica sobre la totalidad de los tickets abiertos, sin importar su modo.

## Objetivo

Evitar que un bloque que no aplica al caso concreto detenga el ticket de manera permanente, garantizando que el flujo siempre encuentre su siguiente actividad o concluya de forma limpia.

## Descripción

Existen dos situaciones en las que un bloque completo puede quedarse sin actividades que ejecutar, y ambas deben resolverse sin intervención humana porque, de no hacerlo, el ticket quedaría detenido para siempre.

La primera es el **bloque sin etapas generadas**. Al crear el ticket, las etapas condicionales cuya cuenta o acceso no fue solicitado nunca llegan a generarse. Si todas las etapas de un bloque eran condicionales y ninguna fue solicitada, ese bloque simplemente no existe en ese ticket. El sistema deberá omitirlo y buscar el siguiente bloque que sí tenga etapas pendientes, en lugar de esperar el cierre de un bloque que no tiene nada que cerrar.

La segunda es el **bloque descartado en su totalidad**. Un bloque puede sí tener etapas, pero que todas ellas resulten descartadas al abrirse porque su condición no se cumplió (RF-07). En ese caso el bloque nace y muere en la misma operación, sin que ningún responsable intervenga. El sistema deberá continuar en ese mismo momento con el bloque siguiente, y repetir la evaluación tantas veces como haga falta, hasta abrir un bloque con al menos una etapa activa o hasta agotar los bloques del ticket.

Este comportamiento en cadena es indispensable: como el descarte de una etapa no lo ejecuta ninguna persona, nadie volvería a disparar la evaluación del flujo, y el ticket quedaría con etapas en espera de un momento que ya pasó.

Para hacer verificable que esto se cumple, el requerimiento establece un **invariante de no bloqueo**: mientras un ticket tenga etapas en Espera, deberá existir al menos una etapa en Activo **de un bloque de actividades**. La etapa principal no cuenta para este invariante, porque permanece activa durante todo el flujo y su presencia enmascararía un ticket detenido. Si un ticket incumple esa condición, está detenido y requiere atención. El sistema deberá poder listar los tickets que la incumplan. Ese listado es un **instrumento de detección, no de corrección**: no habilita ninguna acción para brincar el bloque atorado ni para forzar el avance del ticket, porque eso está fuera de alcance (sección 2). La corrección de un ticket detenido la ejecuta el área de desarrollo.

### Diagrama del avance en cadena

```mermaid
flowchart TD
    A[Se cierra el bloque en curso] --> B{¿Existe un bloque posterior con etapas pendientes?}
    B -- No --> C[Se agotaron los bloques de actividades: la etapa principal queda disponible para atenderse y su cierre concluye el flujo]
    B -- Sí --> D[Se evalúan las etapas de ese bloque]
    D --> E{¿Al menos una etapa quedó activa?}
    E -- Sí --> F[El bloque queda en curso y el flujo se detiene aquí a esperar]
    E -- No --> G[Todas se descartaron: se registra el motivo]
    G --> B
```

---

## HU-6.1 — Avance automático sobre bloques que no aplican

Como coordinador de Cómputo, quiero que el flujo continúe por sí solo cuando un bloque completo no aplica al caso, para que el ticket no quede detenido esperando actividades que nunca se van a ejecutar.

### Reglas de negocio

**RN-6.1** Los bloques que no tengan ninguna etapa generada en el ticket se omitirán; el sistema abrirá el siguiente bloque que sí tenga etapas pendientes.

**RN-6.2** Si al abrir un bloque todas sus etapas resultan descartadas, el sistema continuará en la misma operación con el bloque siguiente, y repetirá la evaluación hasta abrir un bloque con al menos una etapa activa o hasta agotar los bloques del ticket.

**RN-6.3** Mientras un ticket tenga etapas en estatus Espera, deberá existir al menos una etapa de un bloque de actividades en estatus Activo. La etapa principal no se cuenta para esta verificación. El incumplimiento de esta condición identifica un ticket detenido.

**RN-6.4** Todo descarte de una etapa deberá registrar en la bitácora del ticket el motivo por el que se descartó y la etapa cuyo resultado lo originó, cuando aplique.

**RN-6.5** Cuando el avance en cadena agote todos los bloques de actividades sin dejar ninguna etapa activa, la etapa principal quedará disponible para atenderse (RN-5.14) y el flujo se dará por concluido al registrarse su atención realizada.

### Criterios de Aceptación

**CA-6.1.1 — Bloque sin etapas generadas en el ticket**
Dado un ticket en el que el bloque 3 no generó ninguna etapa porque ninguna de sus cuentas fue solicitada
Cuando se cierra el bloque 2
Entonces el sistema omite el bloque 3 y abre directamente el bloque 4, dejándolo como bloque en curso.

**CA-6.1.2 — Bloque descartado en su totalidad**
Dado un ticket cuyo bloque 3 tiene dos etapas, ambas condicionadas a que la etapa de diagnóstico se resolviera con SI, y esa etapa se resolvió con NA
Cuando se cierra el bloque 2
Entonces el sistema descarta las dos etapas del bloque 3, registra el motivo en la bitácora y continúa abriendo el bloque 4 en la misma operación.

**CA-6.1.3 — Varios bloques consecutivos descartados**
Dado un ticket cuyos bloques 3 y 4 quedan descartados en su totalidad por no cumplirse sus condiciones
Cuando se cierra el bloque 2
Entonces el sistema descarta ambos bloques en la misma operación y abre el bloque 5, sin dejar etapas en espera de un bloque que ya no se abrirá.

**CA-6.1.4 — Todos los bloques restantes quedan descartados**
Dado un ticket cuyos bloques 3 y 4 son los últimos y ambos quedan descartados en su totalidad
Cuando se cierra el bloque 2
Entonces el sistema descarta todas las etapas restantes y deja la etapa principal disponible para atenderse, cuyo cierre concluye el flujo.

**CA-6.1.5 — Registro del motivo del descarte**
Dado que el sistema descarta una etapa porque la etapa de la que dependía se resolvió con un resultado distinto al esperado
Cuando el coordinador consulta la bitácora del ticket
Entonces encuentra el registro del descarte con la fecha, la etapa descartada, la etapa que originó el descarte y el motivo.

**CA-6.1.6 — Detección de tickets detenidos**
Dado un ticket con etapas en estatus Espera cuya única etapa en estatus Activo es la etapa principal
Cuando se ejecuta la verificación del invariante de no bloqueo
Entonces el sistema incluye ese ticket en el listado de tickets detenidos para su atención.

---

**Regla transversal:**
El avance en cadena descrito en este requerimiento y la barrera descrita en RF-05 son la misma operación vista desde dos ángulos: la barrera decide *cuándo* continuar, y este requerimiento decide *hasta dónde* continuar dentro de esa misma decisión. Ninguno de los dos puede implementarse sin el otro sin dejar tickets detenidos.

---
---

<a id="rf-07"></a>
# RF-07 — Condicionamiento de una Etapa al Resultado de una Etapa Previa

| Campo        | Valor                |
|--------------|----------------------|
| Prioridad    | Must                 |
| Estado       | Definición           |
| Dependencias | RF-01, RF-02, RF-05  |

> **Aplica cuando:** el flujo de trabajo está configurado en modo **Por bloques**. En modo Escalonado por antecesor la condición de activación conserva su forma actual: se evalúa contra el antecesor de la etapa.

## Objetivo

Conservar, dentro del esquema de bloques, la capacidad de descartar una actividad cuando la decisión de la que depende se resolvió en sentido contrario, expresando de forma explícita **de cuál** etapa depende y **qué resultado** espera.

## Descripción

Hoy una etapa puede condicionarse al resultado de su antecesor: si el antecesor cerró con un resultado distinto al esperado, la etapa se descarta. Esa capacidad es necesaria y debe conservarse, pero en un flujo en modo por bloques el antecesor deja de gobernar el encadenamiento (RF-02) y la condición se queda sin referencia: en un bloque con varias etapas previas ya no existe "el antecesor" del que hablar. En un flujo en modo escalonado por antecesor nada de esto cambia: la condición se sigue evaluando contra el antecesor, tal como opera hoy.

El sistema deberá, por tanto, permitir que una etapa declare de forma explícita **la etapa condicionante** —cualquier etapa de un bloque anterior— y el **resultado esperado** de esa etapa: SI o NA. Al abrirse el bloque de la etapa condicionada, el sistema compara el resultado registrado en la etapa condicionante contra el esperado: si coinciden, la etapa se activa con normalidad; si no coinciden, la etapa se descarta y no llega a abrirse.

Cuando la etapa condicionante fue a su vez descartada, no existe un resultado que comparar. En ese caso la etapa condicionada **también se descarta**, porque la decisión de la que dependía nunca llegó a tomarse. Este arrastre es el que permite que ramas completas del flujo se poden de forma coherente.

Una etapa sin condición declarada se activa siempre que su bloque se abra. Una etapa mandatoria no puede declararse condicionada, porque las dos definiciones se contradicen: lo mandatorio siempre aplica.

### Información / atributos

| Campo | Obligatorio | Descripción |
|---|---|---|
| Etapa condicionante | No | Etapa de un bloque anterior cuyo resultado determina si esta etapa se activa. Si se deja vacía, la etapa se activa siempre que su bloque se abra. |
| Resultado esperado | Sí, cuando hay etapa condicionante | Resultado que debe haberse registrado en la etapa condicionante para que esta etapa se active. Admite SI o NA. |

### Operaciones

El administrador del flujo de trabajo deberá poder:
- Seleccionar la etapa condicionante de entre las etapas de bloques anteriores del mismo flujo, y solo de entre ellas.
- Capturar el resultado esperado cuando haya declarado una etapa condicionante.
- Retirar la condición, dejando la etapa como incondicional.

---

## HU-7.1 — Actividades que solo aplican según el resultado de otra

Como administrador del flujo de trabajo, quiero condicionar una etapa al resultado de una etapa previa específica, para que las actividades que dependen de una decisión no se abran ni generen subtickets cuando esa decisión se resolvió en sentido contrario.

### Reglas de negocio

**RN-7.1** Una etapa podrá declarar a lo sumo una etapa condicionante, con su respectivo resultado esperado.

**RN-7.2** La etapa condicionante deberá pertenecer a un bloque de actividades estrictamente anterior al de la etapa condicionada. En consecuencia, **las etapas del bloque 1 no admiten etapa condicionante**, porque no existe ningún bloque de actividades anterior al suyo: una actividad que deba decidirse según el resultado de otra tiene que configurarse en el bloque 2 o posterior.

**RN-7.3** Cuando se declare una etapa condicionante, el resultado esperado será obligatorio y solo podrá tomar los valores SI o NA.

**RN-7.4** Al abrirse el bloque, si el resultado registrado en la etapa condicionante difiere del resultado esperado, la etapa condicionada se descartará y no se activará ni generará subticket.

**RN-7.5** Si la etapa condicionante fue descartada, la etapa condicionada también se descartará, porque la decisión de la que dependía nunca se tomó.

**RN-7.6** Una etapa sin condicionante declarado se activará siempre que su bloque se abra.

**RN-7.7** Una etapa marcada como mandatoria no podrá declararse condicionada.

**RN-7.8** La etapa principal no podrá declararse etapa condicionante de ninguna otra, porque su resultado se registra al final del flujo (RN-5.13) y no estaría disponible cuando se abren los bloques de actividades. Tampoco podrá declararse condicionada, porque el bloque principal se abre al inicio y no tiene bloques anteriores.

### Criterios de Aceptación

**CA-7.1.1 — Condición cumplida: la etapa se activa**
Dado que la etapa de diagnóstico del bloque 2 se cerró con resultado SI y que la etapa de configuración del bloque 3 está condicionada a ese mismo resultado
Cuando se cierra el bloque 2 y se abre el bloque 3
Entonces el sistema activa la etapa de configuración y genera su subticket.

**CA-7.1.2 — Condición no cumplida: la etapa se descarta**
Dado que la etapa de diagnóstico del bloque 2 se cerró con resultado NA y que la etapa de configuración del bloque 3 está condicionada al resultado SI
Cuando se cierra el bloque 2 y se abre el bloque 3
Entonces el sistema descarta la etapa de configuración, no genera subticket y registra el motivo en la bitácora.

**CA-7.1.3 — Etapa sin condición**
Dado que una etapa del bloque 3 no tiene etapa condicionante declarada
Cuando se abre el bloque 3
Entonces el sistema activa la etapa sin evaluar ninguna condición.

**CA-7.1.4 — Arrastre del descarte**
Dado que la etapa del bloque 3 fue descartada y que una etapa del bloque 4 está condicionada al resultado de esa etapa descartada
Cuando se abre el bloque 4
Entonces el sistema descarta también la etapa del bloque 4 e indica en la bitácora que su etapa condicionante había sido descartada.

**CA-7.1.5 — La etapa condicionante debe ser de un bloque anterior**
Dado que el administrador captura una etapa del bloque 3
Cuando intenta seleccionar como condicionante otra etapa del bloque 3 o de un bloque posterior
Entonces el sistema no ofrece esas etapas en la selección y, de intentarse el guardado, lo impide indicando que la etapa condicionante debe pertenecer a un bloque anterior.

**CA-7.1.6 — Resultado esperado obligatorio**
Dado que el administrador selecciona una etapa condicionante y deja vacío el resultado esperado
Cuando intenta guardar la etapa
Entonces el sistema impide el guardado e informa que el resultado esperado es requerido cuando se declara una etapa condicionante.

**CA-7.1.7 — Etapa mandatoria no puede condicionarse**
Dado que el administrador marca una etapa como mandatoria
Cuando intenta declararle una etapa condicionante
Entonces el sistema impide el guardado e informa que una etapa mandatoria siempre aplica y por lo tanto no admite condición.

---

**Regla transversal:**
El descarte de etapas que se define en este requerimiento es la causa más frecuente de que un bloque completo quede sin actividades, situación que resuelve RF-06. Ambos requerimientos deben liberarse juntos: implementar el condicionamiento sin el avance en cadena dejaría tickets detenidos.

---
---

<a id="rf-08"></a>
# RF-08 — Migración de los Flujos Configurados y de los Tickets en Curso

| Campo        | Valor                      |
|--------------|----------------------------|
| Prioridad    | Must                       |
| Estado       | Definición                 |
| Dependencias | RF-01, RF-02, RF-05, RF-07 |

> **Aplica cuando:** el administrador cambia un flujo del modo Escalonado por antecesor al modo **Por bloques** (RN-1.6), y para el tratamiento de los tickets que ya estaban abiertos al momento de la liberación.

## Objetivo

Llevar los flujos ya configurados y los tickets abiertos al nuevo esquema sin detener la operación, y sin cambiar de manera involuntaria el comportamiento de procesos que hoy funcionan correctamente.

## Descripción

El cambio a bloques toca dos poblaciones de datos y cada una requiere un tratamiento distinto.

La primera son los **flujos ya configurados**. La conversión de un flujo **no se ejecuta de manera masiva ni automática al liberar**: todos los flujos existentes quedan en modo escalonado por antecesor (RN-1.2) y la conversión se dispara **flujo por flujo, cuando el administrador cambia su modo a Por bloques** (RN-1.6). En ese momento el sistema asigna a cada etapa el bloque que le corresponde según su cadena de dependencias: la etapa principal queda como bloque principal, las etapas que dependían de ella quedan en el bloque 1, y cada etapa restante queda en el bloque inmediato siguiente al de su antecesor. La conversión deberá producir un **reporte del flujo** con la asignación resultante, para que el administrador la revise y la valide antes de darla por buena.

Esa revisión no es un trámite. La conversión mecánica **cambia el comportamiento** cuando un flujo tiene ramas de distinta longitud: actividades que hoy corren desfasadas quedarían sincronizadas en una barrera, que es precisamente lo que se busca, pero el negocio debe confirmar que esa sincronización es la deseada en cada caso. Por eso el reporte debe señalar de manera explícita **qué etapas cambian su momento de arranque** respecto del comportamiento actual.

La conversión deberá trasladar también las condiciones vigentes: la condición que hoy se evalúa contra el antecesor se convierte en una condición referida explícitamente a esa misma etapa, conservando el resultado esperado. De este modo ningún flujo pierde su lógica de ramificación.

La segunda población son los **tickets abiertos** al momento de la liberación. Sus etapas se generaron sin bloque y sin modo sellado, y no pueden reorganizarse sin alterar trabajo en proceso. El sistema deberá operar en **modo de compatibilidad** para ellos: las etapas que no tengan bloque asignado continúan avanzando con la regla anterior, etapa contra etapa, hasta que el ticket se cierre. Para efectos de ejecución, un ticket sin modo sellado se tratará como un ticket en modo Escalonado por antecesor.

Conviene precisar la diferencia entre ese modo de compatibilidad y la elección de modo de RF-01, porque se parecen pero no son lo mismo. El modo de compatibilidad es **transitorio** y existe solo para los tickets que nacieron antes de la liberación; el modo escalonado de RF-01 es una **opción permanente y soportada** del catálogo de flujos. Retirar el modo de compatibilidad —posible cuando ya no queden tickets abiertos sin modo sellado— no implica retirar el modo escalonado, y el sistema deberá permitir consultar cuántos tickets sin modo sellado quedan abiertos para saber cuándo es seguro retirar la ruta transitoria.

### Reglas de conversión

| Situación en el flujo actual | Asignación al convertir |
|---|---|
| Etapa marcada como principal | Bloque principal, sin número de bloque |
| Etapa cuyo antecesor es la etapa principal | Bloque 1 |
| Etapa con antecesor distinto de la principal | Bloque del antecesor más uno |
| Etapa con varias rutas hasta la principal | Bloque correspondiente a la ruta más larga, para no adelantarla |
| Etapa sin antecesor y no principal | Se marca como inconsistencia; requiere asignación manual antes de validar el flujo |
| Condición de activación contra el antecesor | Etapa condicionante igual al antecesor, con el mismo resultado esperado |
| Condición de activación contra la etapa principal | Se marca como inconsistencia: la etapa principal no puede ser condicionante (RN-7.8) y la condición requiere revisión manual |

---

## HU-8.1 — Conversión de un flujo al cambiarlo a modo por bloques

Como administrador del flujo de trabajo, quiero que al cambiar un flujo a modo por bloques el sistema lo convierta automáticamente y poder revisar el resultado antes de darlo por bueno, para no cambiar sin darme cuenta el comportamiento de un proceso que hoy opera correctamente.

### Reglas de negocio

**RN-8.1** La conversión de un flujo se ejecutará cuando el administrador cambie su modo de ejecución de Escalonado por antecesor a Por bloques (RN-1.6), y no como un proceso masivo al momento de la liberación.

**RN-8.2** El bloque de cada etapa se derivará de su cadena de dependencias: la etapa principal quedará como bloque principal, sin número de bloque; las etapas que dependían directamente de ella se asignarán al bloque 1; y cada etapa restante, al bloque inmediato siguiente al de su antecesor.

**RN-8.3** Cuando una etapa pueda alcanzarse por varias rutas de distinta longitud, se le asignará el bloque correspondiente a la ruta más larga, para no adelantar su arranque respecto de lo que el negocio espera.

**RN-8.4** Las etapas sin antecesor que no sean la principal se reportarán como inconsistencia y requerirán asignación manual de bloque antes de que el flujo pueda validarse.

**RN-8.5** Las condiciones de activación vigentes se convertirán en condición referida explícitamente al antecesor actual, conservando el resultado esperado.

**RN-8.6** La conversión producirá un reporte del flujo convertido que señale la asignación resultante y, de forma explícita, las etapas cuyo momento de arranque cambia respecto del comportamiento actual.

**RN-8.7** Un flujo convertido no entrará en operación en modo Por bloques hasta que el administrador responsable valide su reporte de conversión. Mientras la validación esté pendiente, los tickets que se generen seguirán naciendo en modo Escalonado por antecesor.

### Criterios de Aceptación

**CA-8.1.1 — Conversión de una cadena simple**
Dado un flujo con una etapa principal, una etapa que depende de ella y una tercera que depende de la segunda
Cuando se ejecuta la conversión
Entonces el sistema deja la etapa principal como bloque principal, asigna el bloque 1 a la segunda y el bloque 2 a la tercera, y lo refleja en el reporte de conversión.

**CA-8.1.2 — Conversión de ramas de distinta longitud**
Dado un flujo en el que una etapa puede alcanzarse por una ruta de dos pasos y por otra de tres
Cuando se ejecuta la conversión
Entonces el sistema le asigna el bloque correspondiente a la ruta más larga y señala en el reporte que esa etapa cambia su momento de arranque.

**CA-8.1.3 — Etapa huérfana detectada**
Dado un flujo que contiene una etapa activa sin antecesor y que no está marcada como principal
Cuando se ejecuta la conversión
Entonces el sistema la reporta como inconsistencia, no le asigna bloque automáticamente y marca el flujo como pendiente de asignación manual.

**CA-8.1.4 — Conversión de las condiciones de activación**
Dado un flujo en el que una etapa se activa solo cuando su antecesor cierra con resultado SI
Cuando se ejecuta la conversión
Entonces el sistema declara a ese antecesor como etapa condicionante de la etapa convertida y conserva SI como resultado esperado.

**CA-8.1.5 — El flujo convertido requiere validación**
Dado un flujo cuya conversión se ejecutó y cuyo reporte no ha sido validado por el administrador
Cuando se genera un ticket que correspondería a ese flujo
Entonces el sistema no aplica la configuración convertida y advierte que el flujo está pendiente de validación.

---

## HU-8.2 — Continuidad de los tickets abiertos

Como responsable de Cómputo, quiero que los tickets que ya estaban abiertos al momento de la liberación sigan avanzando con normalidad, para no tener que cerrarlos a mano ni perder el trabajo en proceso.

### Reglas de negocio

**RN-8.8** Los tickets cuyas etapas se generaron sin bloque y sin modo sellado continuarán avanzando con la regla anterior de encadenamiento etapa contra etapa hasta su cierre.

**RN-8.9** Los tickets generados a partir de la liberación operarán con la regla que corresponda al modo con el que se sellaron (RN-1.14): con la regla de bloques los generados desde un flujo en modo Por bloques, y con la regla etapa contra etapa los generados desde un flujo en modo Escalonado por antecesor.

**RN-8.10** El sistema deberá permitir consultar cuántos tickets abiertos permanecen operando en modo de compatibilidad, entendidos como los tickets sin modo sellado generados antes de la liberación.

**RN-8.11** El modo de compatibilidad se retirará únicamente cuando no queden tickets abiertos operando bajo él. Su retiro no afecta al modo Escalonado por antecesor, que permanece disponible en el catálogo de flujos.

### Criterios de Aceptación

**CA-8.2.1 — Un ticket abierto antes de la liberación sigue avanzando**
Dado un ticket generado antes de la liberación, cuyas etapas no tienen bloque asignado
Cuando el responsable registra la atención realizada de una de sus etapas
Entonces el sistema activa las etapas que dependían de ella conforme a la regla anterior y el ticket continúa su curso sin intervención manual.

**CA-8.2.2 — Un ticket nuevo opera por bloques**
Dado un ticket generado después de la liberación a partir de un flujo en modo Por bloques, convertido y validado
Cuando el responsable registra la atención realizada de una etapa
Entonces el sistema aplica la regla de barrera por bloques y no la regla anterior.

**CA-8.2.3 — Consulta de tickets en modo de compatibilidad**
Dado que existen tickets abiertos generados antes de la liberación
Cuando el equipo de desarrollo consulta el indicador de compatibilidad
Entonces el sistema informa cuántos tickets abiertos permanecen operando con la regla anterior.

---

**Regla transversal:**
Mientras existan tickets en modo de compatibilidad conviven en el sistema dos rutas de avance por una razón transitoria —tickets sin modo sellado— además de la convivencia permanente que introduce RF-01, donde cada flujo elige su mecanismo. El indicador de RN-8.10 sirve para decidir cuándo retirar la ruta transitoria; la convivencia de modos, en cambio, es una decisión de diseño y no una deuda por pagar.

---
---

# Requerimientos no funcionales (RNF)

### RNF-001 — Rendimiento: apertura de un bloque
- **Descripción:** La apertura de un bloque de hasta 20 etapas, con la generación de sus subtickets correspondientes, deberá completarse en menos de 5 segundos desde que el responsable guarda la última etapa del bloque anterior.
- **Métrica / criterio de verificación:** Medición del tiempo transcurrido entre el guardado y la disponibilidad de las etapas del nuevo bloque, en un ambiente de prueba con volumen equivalente al productivo, sobre 20 ejecuciones; el percentil 95 debe ubicarse por debajo de 5 segundos.
- **Prioridad:** Must

### RNF-002 — Integridad: operación indivisible de apertura
- **Descripción:** La apertura de un bloque deberá completarse en su totalidad o no aplicarse en absoluto. No podrá quedar un bloque parcialmente abierto, con unas etapas activas y otras en espera, ni etapas activas sin su subticket correspondiente.
- **Métrica / criterio de verificación:** Prueba de interrupción forzada durante la apertura de un bloque de cinco etapas; al reintentar, el estado del ticket debe ser el previo a la operación o el posterior completo, nunca intermedio. Cero estados intermedios en 10 ejecuciones.
- **Prioridad:** Must

### RNF-003 — Integridad: ausencia de tickets detenidos
- **Descripción:** Ningún ticket con etapas en estatus Espera podrá permanecer sin al menos una etapa de un bloque de actividades en estatus Activo; la etapa principal no cuenta para esta verificación, porque permanece activa durante todo el flujo. El sistema deberá disponer de una verificación consultable de esta condición.
- **Métrica / criterio de verificación:** Ejecución diaria de la verificación del invariante sobre la totalidad de tickets abiertos; meta de cero tickets detenidos. Cualquier ocurrencia se atiende como incidente.
- **Prioridad:** Must

### RNF-004 — Compatibilidad: continuidad de la operación en curso
- **Descripción:** La liberación del esquema de bloques no deberá requerir la intervención manual de ningún ticket abierto ni el cierre anticipado de ninguno.
- **Métrica / criterio de verificación:** Conteo de tickets abiertos que requirieron intervención manual durante la semana posterior a la liberación; meta de cero.
- **Prioridad:** Must

### RNF-005 — Auditoría: trazabilidad del avance del flujo
- **Descripción:** Toda apertura de bloque, activación de etapa y descarte de etapa deberá registrarse en la bitácora del ticket con fecha, hora, usuario o proceso que la originó y, en el caso de los descartes, el motivo y la etapa condicionante involucrada.
- **Métrica / criterio de verificación:** Revisión de la bitácora de una muestra de 10 tickets con flujo completo; el 100% de las transiciones de estatus de sus etapas debe tener su registro correspondiente.
- **Prioridad:** Must

### RNF-006 — Seguridad: restricción de edición de etapas
- **Descripción:** Una etapa solo podrá editarse cuando pertenezca al bloque en curso —o al bloque principal—, esté activa y el usuario pertenezca al departamento responsable de esa etapa. El incumplimiento de cualquiera de las tres condiciones deberá presentar la etapa en solo lectura. Además, la etapa principal no deberá admitir el registro de su atención realizada mientras queden bloques de actividades pendientes.
- **Métrica / criterio de verificación:** Pruebas de acceso con tres perfiles distintos —responsable del bloque en curso, responsable de un bloque posterior y usuario de otro departamento— sobre el mismo ticket; solo el primero debe poder capturar.
- **Prioridad:** Must

### RNF-007 — Mantenibilidad: cobertura de pruebas del avance del flujo
- **Descripción:** La lógica que decide el cierre de un bloque, la apertura del siguiente, el descarte por condición y el avance en cadena deberá contar con pruebas automatizadas que cubran al menos el 80% de sus rutas de decisión.
- **Métrica / criterio de verificación:** Reporte de cobertura de pruebas automatizadas sobre los componentes de avance del flujo, ejecutado en la integración continua.
- **Prioridad:** Should

### RNF-008 — Usabilidad: comprensión del avance
- **Descripción:** Un responsable de etapa deberá identificar cuál es el bloque en curso y por qué su etapa no está disponible en un tiempo no mayor a 15 segundos desde que abre la pestaña de flujo de trabajo del ticket principal, sin ayuda externa.
- **Métrica / criterio de verificación:** Prueba de usabilidad con cinco responsables de distintos departamentos; al menos cuatro de cinco deben lograrlo dentro del tiempo indicado.
- **Prioridad:** Should

### RNF-009 — Trazabilidad: bloque registrado en todo subticket del flujo
- **Descripción:** La totalidad de los subtickets generados por el flujo escalonado deberá contar con el número de bloque de la etapa que los originó, disponible para consulta en el propio subticket y para filtrado en los listados de tickets.
- **Métrica / criterio de verificación:** Consulta de verificación sobre los subtickets generados a partir de la liberación, ejecutada de forma semanal; meta de cero subtickets del flujo escalonado sin bloque registrado.
- **Prioridad:** Must

### RNF-010 — Auditoría: trazabilidad del cambio de modo de ejecución
- **Descripción:** Todo cambio del modo de ejecución de un flujo de trabajo deberá quedar registrado con fecha, hora, usuario que lo realizó, modo anterior y modo nuevo, y deberá conservarse el historial completo de cambios del flujo.
- **Métrica / criterio de verificación:** Revisión del historial de los flujos cuyo modo se haya cambiado durante el primer mes posterior a la liberación; el 100% de los cambios debe tener su registro completo.
- **Prioridad:** Must

### RNF-011 — Compatibilidad: aislamiento entre modos de ejecución
- **Descripción:** La operación de un flujo en un modo no deberá alterar el comportamiento de los flujos configurados en el otro modo ni de los tickets sellados con el otro modo. Ambos mecanismos de avance deberán poder coexistir de forma indefinida sin degradación funcional.
- **Métrica / criterio de verificación:** Ejecución de la batería de pruebas de regresión del flujo escalonado vigente con flujos por bloques activos en el mismo ambiente; cero regresiones en el comportamiento del modo escalonado.
- **Prioridad:** Must


---

# Impacto en la configuración vigente

Esta sección traduce el requerimiento a los objetos que ya existen, para que el desarrollo sepa qué se agrega, qué se conserva y qué deja de intervenir. No sustituye al diseño técnico: solo fija el alcance del cambio sobre lo que hoy está en producción.

### Flujo de trabajo — encabezado (`ga_tr_flujos_trabajos`)

| Acción | Campo | Detalle |
|---|---|---|
| Agregar | Modo de ejecución | Escalonado por antecesor o Por bloques. Es el dato que decide qué reglas aplican (RF-01). |
| Agregar | Estado de validación de la conversión | Marca el flujo cuya conversión a bloques está pendiente de validar; mientras lo esté, los tickets siguen naciendo en modo escalonado (RN-8.6). |

### Etapa del flujo — detalle (`ga_tr_flujos_trabajos_det`)

| Acción | Campo | Detalle |
|---|---|---|
| Agregar | Bloque | Entero mayor o igual a 1. Queda vacío en la etapa principal, que constituye el bloque principal (RN-2.4). |
| Agregar | Etapa condicionante | Referencia a otra etapa del mismo flujo, de un bloque anterior (RN-7.2). |
| Conservar, se reinterpreta | Parámetro de activación | Pasa a llamarse **resultado esperado** y se evalúa contra la etapa condicionante declarada, en lugar de contra el antecesor implícito. El dato guardado no cambia de forma: sigue siendo SI, NA o vacío. |
| Conservar, cambia su regla | Orden | Deja de ser único en todo el flujo y pasa a ser único **dentro del bloque**; solo ordena la presentación (RN-2.5, RN-2.6). |
| Conservar sin cambio | Clave, Nombre, Servicio, Cuenta, Principal, Mandatorio, Registra ticket, Departamento, Estatus, Responsables | Ver el inventario completo en RF-02. |
| Deja de intervenir | Antecesor | En modo por bloques queda de solo lectura y no participa en la activación; en modo escalonado conserva su comportamiento actual (RN-2.7). |

### Etapa del flujo dentro del ticket (`ga_tr_tickets_flujos_trabajos`)

| Acción | Campo | Detalle |
|---|---|---|
| Agregar | Bloque | Copia congelada del bloque de la plantilla al generar el ticket (RN-4.1). |
| Agregar | Modo de ejecución del ticket | Sello del modo con el que nació el ticket; gobierna su avance hasta el cierre (RN-1.12). |
| Conservar | Antecesor y parámetro de activación ya copiados | Se siguen copiando para los tickets en modo escalonado y para trazabilidad. |

### Ticket (`ga_tr_tickets`)

| Acción | Campo | Detalle |
|---|---|---|
| Agregar | Bloque —grupo escalonado— | Se registra en cada subticket que genera el flujo y queda disponible como columna y filtro en los listados (RN-4.6 a RN-4.9). |

El subticket ya guarda hoy su vínculo a la etapa que lo originó, así que el bloque persistido en el ticket no es la única forma de conocerlo: se persiste para poder consultarlo y filtrarlo en los listados sin recorrer la relación.

### Reglas y validaciones vigentes que cambian

| Regla vigente | Qué pasa con ella |
|---|---|
| El antecesor es obligatorio cuando la etapa no es la principal | Se retira en los flujos en modo por bloques; sigue vigente en modo escalonado. |
| El orden debe ser único en todo el flujo | Pasa a ser único dentro de cada bloque. |
| Al desmarcar la etapa como principal se fuerza su orden a 1 | Deja de aplicar: la etapa principal no lleva bloque ni participa del orden dentro de un bloque. |
| Solo puede haber una etapa principal por flujo | Se conserva, y se le agrega que no puede llevar bloque numerado (RN-3.4). |
| La activación busca las etapas cuyo antecesor acaba de cerrar | Se sustituye por la evaluación de cierre de bloque y apertura del siguiente (RF-05). |

### Puntos de atención detectados en el comportamiento actual

Dos hallazgos del análisis del código vigente que conviene resolver dentro de este cambio, porque el esquema de bloques los vuelve visibles:

1. **El orden se usa hoy para emparejar un subticket con su etapa.** Los controladores del flujo de correo electrónico y de directorio activo localizan el subticket comparando el orden de la etapa contra el orden del ticket dependiente. Al relajar la unicidad del orden a "único por bloque", dos etapas de bloques distintos pueden compartir el mismo orden y esa búsqueda traería el subticket equivocado. El emparejamiento debe hacerse por la etapa del flujo asignada al subticket, no por el orden, **antes** de cambiar la validación de unicidad.
2. **La resolución del responsable por unidad de negocio no está surtiendo efecto.** El filtro que debería elegir al responsable de la unidad de negocio solicitante evalúa el estatus del ticket en lugar del estatus del responsable configurado, por lo que la búsqueda falla siempre y se toma el primer responsable activo de la lista. El comportamiento es previo a este requerimiento, pero con bloques se abren más etapas a la vez y el efecto se multiplica.

---

# Matriz de trazabilidad

| Objetivo de negocio | RF | Historia | Criterio de aceptación | Prioridad | Estado |
|---------------------|-----|----------|------------------------|-----------|--------|
| OBJ-1 Evitar que una actividad arranque sin los insumos de su tanda | RF-02 | HU-2.1 | CA-2.1.1 Captura del bloque en una etapa nueva | Must | Propuesto |
| OBJ-1 | RF-02 | HU-2.1 | CA-2.1.4 Orden repetido en bloques distintos | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.1 | CA-5.1.1 El bloque no cierra mientras haya actividades pendientes | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.1 | CA-5.1.2 Apertura del siguiente bloque al concluir la última etapa | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.1 | CA-5.1.7 No coexisten dos bloques de actividades abiertos | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.1 | CA-5.1.8 Apertura conjunta del bloque principal y del bloque 1 | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.1 | CA-5.1.9 El bloque 2 no se detona hasta cerrar el bloque 1 | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.2 | CA-5.2.1 Rechazo del cierre del bloque principal con bloques pendientes | Must | Propuesto |
| OBJ-1 | RF-05 | HU-5.2 | CA-5.2.4 El cierre del bloque principal concluye el flujo | Must | Propuesto |
| OBJ-1 | RF-07 | HU-7.1 | CA-7.1.1 Condición cumplida: la etapa se activa | Must | Propuesto |
| OBJ-2 Que ningún ticket quede detenido sin salida | RF-06 | HU-6.1 | CA-6.1.1 Bloque sin etapas generadas en el ticket | Must | Propuesto |
| OBJ-2 | RF-06 | HU-6.1 | CA-6.1.2 Bloque descartado en su totalidad | Must | Propuesto |
| OBJ-2 | RF-06 | HU-6.1 | CA-6.1.3 Varios bloques consecutivos descartados | Must | Propuesto |
| OBJ-2 | RF-06 | HU-6.1 | CA-6.1.6 Detección de tickets detenidos | Must | Propuesto |
| OBJ-2 | RF-05 | HU-5.2 | CA-5.2.3 La etapa principal queda disponible al concluir el último bloque | Must | Propuesto |
| OBJ-2 | RF-07 | HU-7.1 | CA-7.1.4 Arrastre del descarte | Must | Propuesto |
| OBJ-2 | RF-03 | HU-3.1 | CA-3.1.1 Hueco en la numeración de bloques | Must | Propuesto |
| OBJ-3 Configuración del flujo entendible y a prueba de errores | RF-02 | HU-2.1 | CA-2.1.5 El antecesor ya no se captura | Must | Propuesto |
| OBJ-3 | RF-02 | HU-2.1 | CA-2.1.6 Presentación agrupada de la configuración | Must | Propuesto |
| OBJ-3 | RF-03 | HU-3.1 | CA-3.1.2 Etapa sin bloque asignado | Must | Propuesto |
| OBJ-3 | RF-02 | HU-2.1 | CA-2.1.7 La etapa principal no admite bloque numerado | Must | Propuesto |
| OBJ-3 | RF-04 | HU-4.1 | CA-4.1.9 El bloque principal se presenta aparte y abierto desde el inicio | Should | Propuesto |
| OBJ-3 | RF-03 | HU-3.1 | CA-3.1.4 Advertencia por bloque enteramente condicional | Must | Propuesto |
| OBJ-3 | RF-04 | HU-4.1 | CA-4.1.2 Indicador del bloque en curso | Must | Propuesto |
| OBJ-3 | RF-04 | HU-4.2 | CA-4.2.1 El subticket nace con el bloque de su etapa | Must | Propuesto |
| OBJ-3 | RF-04 | HU-4.2 | CA-4.2.4 Consulta y filtrado de los subtickets por bloque | Should | Propuesto |
| OBJ-3 | RF-04 | HU-4.1 | CA-4.1.6 El subticket de un ticket por bloques no presenta el flujo de trabajo | Must | Propuesto |
| OBJ-3 | RF-04 | HU-4.1 | CA-4.1.7 El flujo se consulta en el ticket principal | Must | Propuesto |
| OBJ-3 | RF-07 | HU-7.1 | CA-7.1.5 La etapa condicionante debe ser de un bloque anterior | Must | Propuesto |
| OBJ-4 Liberar el cambio sin afectar la operación en curso | RF-04 | HU-4.1 | CA-4.1.5 Un cambio en la plantilla no altera un ticket en curso | Must | Propuesto |
| OBJ-4 | RF-04 | HU-4.2 | CA-4.2.3 El bloque del subticket no cambia al avanzar el flujo | Must | Propuesto |
| OBJ-4 | RF-08 | HU-8.1 | CA-8.1.2 Conversión de ramas de distinta longitud | Must | Propuesto |
| OBJ-4 | RF-08 | HU-8.1 | CA-8.1.5 El flujo convertido requiere validación | Must | Propuesto |
| OBJ-4 | RF-08 | HU-8.2 | CA-8.2.1 Un ticket abierto antes de la liberación sigue avanzando | Must | Propuesto |
| OBJ-4 | RF-08 | HU-8.2 | CA-8.2.3 Consulta de tickets en modo de compatibilidad | Must | Propuesto |
| OBJ-4 | RF-01 | HU-1.2 | CA-1.2.2 Un cambio de modo en la plantilla no altera un ticket abierto | Must | Propuesto |
| OBJ-5 Adoptar la ejecución por bloques flujo por flujo, sin imponerla | RF-01 | HU-1.1 | CA-1.1.1 Configuración de un flujo nuevo en modo por bloques | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.1 | CA-1.1.2 Configuración de un flujo en modo escalonado | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.1 | CA-1.1.4 Los flujos existentes conservan su comportamiento | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.1 | CA-1.1.5 Cambio a modo por bloques con conversión pendiente de validación | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.1 | CA-1.1.6 Cambio a modo escalonado sin antecesores capturados | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.1 | CA-1.1.8 Registro y restricción del cambio de modo | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.2 | CA-1.2.1 El ticket se sella con el modo de su flujo | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.2 | CA-1.2.3 Un ticket en modo escalonado avanza etapa contra etapa | Must | Propuesto |
| OBJ-5 | RF-01 | HU-1.2 | CA-1.2.5 Presentación del ticket según su modo | Should | Propuesto |

Estados sugeridos: Propuesto → Aprobado → En desarrollo → Verificado.

---

# Reglas de negocio transversales

Reglas que se reutilizan en más de un requerimiento y que conviene tener a la vista de forma independiente:

| ID | Regla | Aplica a |
|----|-------|----------|
| RN-T.1 | Una etapa se considera concluida cuando queda en Atendido o en Cancelado; ambos estatus cuentan por igual para cerrar un bloque y para cerrar el ticket. | RF-05, RF-06, RF-07 |
| RN-T.2 | Solo puede existir un bloque de actividades en curso a la vez dentro de un mismo ticket; el bloque principal permanece abierto en paralelo durante todo el flujo. | RF-04, RF-05 |
| RN-T.3 | Las etapas del ticket son una copia congelada de la configuración vigente al momento del alta; los cambios posteriores en la plantilla no afectan tickets ya generados. | RF-04, RF-08 |
| RN-T.4 | Mientras un ticket tenga etapas en Espera, debe existir al menos una etapa de un bloque de actividades en Activo; la etapa principal no cuenta para el invariante. | RF-06 |
| RN-T.5 | Una etapa es editable únicamente cuando pertenece al bloque en curso o al bloque principal, está activa y el usuario pertenece al departamento responsable. | RF-04, RNF-006 |
| RN-T.6 | Todo subticket generado por el flujo escalonado se registra con el bloque de la etapa que lo originó, y ese valor no cambia durante su vida. | RF-04, RF-05 |
| RN-T.7 | El modo de ejecución del flujo decide qué reglas aplican: las reglas de bloques operan únicamente sobre flujos en modo Por bloques y sobre los tickets sellados con ese modo. | RF-01, RF-02 a RF-08 |
| RN-T.8 | Cada ticket se sella al generarse con el modo de ejecución de su flujo y termina de ejecutarse con ese mecanismo; un cambio de modo en la plantilla no altera tickets ya generados. | RF-01, RF-04, RF-08 |
| RN-T.9 | En los tickets que operan por bloques, el flujo de trabajo se consulta únicamente en el ticket principal; el subticket solo conserva el bloque con el que se registró. | RF-04 |
| RN-T.10 | El bloque principal se abre junto con el bloque 1 al generar el ticket y es el último en cerrarse: no admite registrar su atención realizada mientras quede algún bloque de actividades sin concluir. | RF-02, RF-04, RF-05, RF-06 |

---

# Supuestos (SUP)

| ID | Supuesto | Impacto si es falso |
|----|----------|---------------------|
| SUP-01 | Los flujos configurados hoy en producción son pocos y pueden revisarse uno a uno al cambiarlos de modo. | Si son muchos o muy ramificados, la validación de RF-08 se vuelve un proyecto en sí mismo y debe planearse por separado. |
| SUP-02 | El negocio acepta que dentro de un bloque no exista secuencia: todas sus etapas se abren al mismo tiempo. | Si se requiere secuencia interna, el modelo de bloques no basta y habría que reconsiderar el esquema de dependencias múltiples descartado en el análisis. |
| SUP-03 | La condición de activación vigente siempre se evalúa contra el antecesor directo de la etapa, sin excepciones en los flujos configurados. | Si existen configuraciones que dependen de otra etapa, la conversión de RF-08 perdería lógica de ramificación y requeriría revisión manual etapa por etapa. |
| SUP-04 | Los tickets abiertos al momento de la liberación se cierran en un plazo razonable, de modo que el modo de compatibilidad sea temporal. | Si algunos tickets permanecen abiertos indefinidamente, habría que migrarlos de forma asistida o convivir con dos reglas de avance por tiempo indefinido. |
| SUP-05 | Los responsables de etapa continúan cerrando sus actividades mediante el registro de la atención realizada, sin necesidad de una acción nueva. | Si el negocio pide una acción explícita de cierre de bloque, se agrega alcance de interfaz no contemplado en este documento. |
| SUP-06 | El negocio acepta que ambos modos de ejecución convivan de forma indefinida y que el modo escalonado por antecesor se mantenga soportado, no en vías de retiro. | Si se decide retirar el modo escalonado, habría que planear la conversión de todos los flujos restantes y el alcance de RF-01 se reduce a una etapa de transición. |
| SUP-07 | Un flujo se cambia de modo con poca frecuencia: es una decisión de diseño del proceso, no una operación cotidiana. | Si el modo se cambiara con frecuencia, la conversión y su validación se volverían un cuello de botella y convendría automatizar la revisión del reporte. |

---

# Dependencias (DEP)

| ID | Dependencia | De quién / de qué |
|----|-------------|-------------------|
| DEP-01 | Inventario y revisión de los flujos de trabajo configurados en producción, para dimensionar la conversión. | Administrador del flujo de trabajo / Innovación & Negocios |
| DEP-02 | Definición del negocio sobre cómo debe convertirse cada flujo cuando la sincronización por barrera cambie el momento de arranque de una etapa. | Coordinación de Cómputo |
| DEP-03 | Ambiente de pruebas con volumen equivalente al productivo para verificar RNF-001 y RNF-002. | Equipo de Infraestructura |
| DEP-04 | Ventana de liberación acordada, dado que la incorporación del modo de ejecución y la activación del modo de compatibilidad ocurren en el mismo despliegue. | Equipo de Desarrollo / Coordinación de Cómputo |
| DEP-05 | Decisión del negocio sobre qué flujos se cambian a modo por bloques y en qué orden, dado que la adopción es flujo por flujo. | Coordinación de Cómputo / Administrador del flujo de trabajo |

---

# Riesgos (RGO)

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| RGO-01 | Que el descarte de una etapa no propague el avance del flujo y deje tickets detenidos sin forma de cerrarse. Es el riesgo principal del cambio, porque el descarte no lo ejecuta ninguna persona y nadie volvería a disparar la evaluación. | Alta | Alto | Implementar RF-06 junto con RF-05 y RF-07, nunca por separado; verificar el invariante de RNF-003 de forma diaria desde el primer día. |
| RGO-02 | Que la conversión automática de los flujos existentes cambie el comportamiento de procesos que hoy operan correctamente, sin que nadie lo note. | Media | Alto | Reporte de conversión que señale explícitamente las etapas que cambian su momento de arranque, y validación obligatoria del administrador antes de poner el flujo en operación (RN-8.7). |
| RGO-03 | Que la apertura simultánea de un bloque numeroso genere muchos subtickets a la vez y sature al área responsable. | Media | Medio | Revisar el tamaño de los bloques al validar la conversión; considerar dividir en bloques más pequeños los que superen un umbral acordado con el negocio. |
| RGO-04 | Que una etapa quede sin responsable resoluble al abrirse un bloque y falle la apertura completa. | Media | Alto | Validar la existencia de responsable activo para todas las etapas del flujo al momento de validar la conversión; definir un responsable de respaldo por flujo. |
| RGO-05 | Que la convivencia temporal de dos reglas de avance genere confusión operativa o diagnósticos equivocados durante el periodo de compatibilidad. | Media | Medio | Identificar visiblemente en el ticket con qué regla opera; publicar el indicador de RN-8.10 y fijar fecha de revisión para retirar la regla anterior. |
| RGO-06 | Que el negocio descubra, ya en operación, que dentro de un bloque sí necesitaba secuencia entre algunas actividades. | Baja | Alto | Validar SUP-02 con la Coordinación de Cómputo antes de iniciar el desarrollo, sobre casos reales de los flujos vigentes. |
| RGO-07 | Que el mantenimiento de dos mecanismos de avance permanentes duplique el costo de cada cambio posterior al motor de flujo y multiplique los escenarios de prueba. | Alta | Medio | Aislar la decisión de avance en un único punto que consulte el modo sellado del ticket (RNF-011); exigir que toda prueba de regresión del motor se ejecute en ambos modos. |
| RGO-08 | Que un administrador cambie el modo de un flujo sin entender el efecto y sincronice actividades que el negocio esperaba desfasadas, o al revés. | Media | Alto | Confirmación explícita con advertencia del efecto al cambiar el modo (RF-01, Diseño UX/UI); validación obligatoria del reporte de conversión (RN-8.7); restricción del cambio al perfil administrador (RN-1.8) y bitácora del cambio (RN-1.9). |
| RGO-09 | Que un flujo quede indefinidamente con su conversión pendiente de validación y el negocio crea que ya opera por bloques cuando sigue generando tickets en modo escalonado. | Media | Medio | Presentar el estado de validación en el detalle y en el listado del catálogo; revisar periódicamente los flujos con conversión pendiente. |
| RGO-10 | Que el bloque principal permanezca activo durante todo el flujo y enmascare tickets detenidos, porque siempre habrá una etapa en Activo. | Alta | Alto | Excluir la etapa principal del invariante de no bloqueo (RN-6.3 y RNF-003), de modo que la verificación exija una etapa activa de un bloque de actividades. |
| RGO-11 | Que alguien intente cerrar el ticket principal antes de que concluyan los bloques y, al impedírselo el sistema, lo interprete como una falla. | Media | Bajo | Mensaje explícito al rechazar el cierre, con los bloques pendientes a la vista (RN-5.13); indicar en el propio bloque principal que se cierra al final (RF-04, Diseño UX/UI). |

---

# Preguntas abiertas

1. **¿Qué tanto se usa hoy la condición de activación?** Antes de definir RF-07 es necesario revisar los flujos configurados en producción para saber cuántas etapas tienen condición y contra qué etapa se evalúan. Si prácticamente no se usa, RF-07 podría simplificarse o posponerse. *Responsable sugerido: Administrador del flujo de trabajo.*

2. **¿Se requiere secuencia dentro de un bloque?** El documento asume que no (SUP-02). Conviene confirmarlo contra los flujos reales antes de desarrollar, porque de requerirse cambiaría el modelo. *Responsable sugerido: Coordinación de Cómputo.*

3. **¿Debe notificarse al área responsable cuando su bloque completo se descarta?** Hoy el descarte es silencioso. Con bloques, un área podría no enterarse de que su tanda ya no aplica. *Responsable sugerido: Coordinación de Cómputo.*

4. **¿Cuál es el umbral aceptable de etapas por bloque?** Para mitigar RGO-03 conviene acordar un número máximo de subtickets simultáneos que el área puede absorber. *Responsable sugerido: Coordinación de Cómputo.*

5. **¿Qué se hace con los flujos cuya conversión detecte etapas huérfanas?** RN-8.4 los deja pendientes de asignación manual. Falta definir el plazo y quién ejecuta esa asignación. *Responsable sugerido: Administrador del flujo de trabajo.*

6. **¿El modo de ejecución debe poder cambiarse existiendo tickets abiertos del flujo?** El documento asume que sí (RN-1.10), porque cada ticket conserva el modo con el que nació y el cambio no toca trabajo en proceso. Conviene confirmar que el negocio está cómodo con que dos tickets del mismo flujo, abiertos al mismo tiempo, avancen con mecanismos distintos. *Responsable sugerido: Coordinación de Cómputo.*

7. **¿Quién autoriza el cambio de modo de un flujo?** RN-1.8 lo restringe al administrador del flujo de trabajo, pero no define si además requiere autorización de la Coordinación de Cómputo, dado que cambia el comportamiento de un proceso en producción. *Responsable sugerido: Coordinación de Cómputo.*

8. **¿Se contempla retirar algún día el modo escalonado por antecesor?** El documento lo trata como una opción permanente (SUP-06). Si la intención es migrar todo a bloques en el mediano plazo, conviene fijar desde ahora una fecha objetivo y medir el avance, para no cargar de manera indefinida con el mantenimiento de dos mecanismos (RGO-07). *Responsable sugerido: Coordinación de Cómputo / Equipo de Desarrollo.*

9. **¿Debe mostrarse el bloque en la notificación del subticket?** El bloque ya queda registrado en el subticket y disponible en los listados; falta decidir si además se incluye en el asunto o el cuerpo del correo con el que se avisa al responsable, para que ubique la tanda sin entrar al sistema. *Responsable sugerido: Coordinación de Cómputo.*

---

# Casos de prueba

**CP-001 — Registro de una etapa con bloque (camino feliz)**
Verifica: CA-2.1.1 · RN-2.2
Dado que el administrador registra una etapa nueva en un flujo de trabajo y captura el bloque 2, el orden 1 y los demás datos obligatorios
Cuando selecciona Guardar
Entonces el sistema guarda la etapa asociada al bloque 2 y la presenta agrupada con las demás etapas de ese bloque.

**CP-002 — Rechazo por bloque vacío (validación)**
Verifica: CA-2.1.2 · RN-2.3
Dado que el administrador registra una etapa nueva y deja el bloque sin capturar
Cuando intenta guardar la etapa
Entonces el sistema impide el guardado e informa que el bloque es un dato requerido.

**CP-003 — Rechazo por bloque cero o negativo (validación)**
Verifica: CA-2.1.2 · RN-2.2
Dado que el administrador captura el valor 0 en el bloque de una etapa
Cuando intenta guardar la etapa
Entonces el sistema impide el guardado e informa que el bloque debe ser un número entero mayor o igual a 1.

**CP-004 — Rechazo por orden duplicado dentro del mismo bloque (validación)**
Verifica: CA-2.1.3 · RN-2.6
Dado que en el bloque 2 ya existe la etapa "Alta de correo electrónico" con orden 1
Cuando el administrador intenta guardar la etapa "Alta en directorio activo" en el bloque 2 también con orden 1
Entonces el sistema impide el guardado e informa que el orden ya está utilizado dentro de ese bloque.

**CP-005 — Orden repetido entre bloques distintos (escenario alternativo)**
Verifica: CA-2.1.4 · RN-2.6
Dado que en el bloque 2 existe una etapa con orden 1
Cuando el administrador guarda una etapa del bloque 3 con orden 1
Entonces el sistema acepta el guardado sin señalar conflicto.

**CP-006 — El antecesor no está disponible para captura**
Verifica: CA-2.1.5 · RN-2.7
Dado que el administrador registra una etapa nueva en un flujo de trabajo
Cuando revisa los datos disponibles para captura
Entonces el sistema no le presenta el antecesor como dato capturable y sí presenta el bloque.

**CP-007 — Presentación agrupada de las etapas configuradas**
Verifica: CA-2.1.6
Dado un flujo con su etapa principal, tres etapas en el bloque 1 y dos en el bloque 2
Cuando el administrador consulta el flujo
Entonces el sistema presenta las seis etapas agrupadas, con el bloque principal al inicio y los bloques de actividades en orden ascendente y, dentro de cada bloque, por el orden capturado.

**CP-008 — Usuario sin permiso no configura el flujo (permisos)**
Verifica: CA-2.1.1 · RNF-006
Dado que un usuario sin permiso de administración de flujos de trabajo abre el catálogo
Cuando intenta registrar o modificar una etapa
Entonces el sistema no le habilita la opción e impide cualquier cambio en la configuración.

**CP-009 — Rechazo por hueco en la numeración de bloques (validación)**
Verifica: CA-3.1.1 · RN-3.2
Dado un flujo con etapas en los bloques 1, 2 y 4, y ninguna en el bloque 3
Cuando el administrador intenta guardar el flujo
Entonces el sistema impide el guardado e informa que el bloque 3 no tiene etapas y que la numeración debe ser consecutiva.

**CP-010 — Guardado de un flujo con numeración correcta (camino feliz)**
Verifica: CA-3.1.1 · RN-3.2
Dado un flujo con etapas en los bloques 1, 2, 3 y 4, todos con al menos una etapa activa
Cuando el administrador guarda el flujo
Entonces el sistema acepta el guardado sin observaciones de numeración.

**CP-011 — Rechazo por etapa sin bloque asignado (validación)**
Verifica: CA-3.1.2 · RN-3.5
Dado un flujo con una etapa de alta de correo, no marcada como principal, que quedó sin bloque asignado
Cuando el administrador intenta guardar el flujo
Entonces el sistema impide el guardado e informa qué etapa requiere bloque, porque solo la etapa principal puede prescindir de él.

**CP-012 — Rechazo por etapa principal con bloque numerado (validación)**
Verifica: CA-3.1.3 · RN-3.4
Dado que el administrador marca como principal una etapa que tiene asignado el bloque 2
Cuando intenta guardar el flujo
Entonces el sistema impide el guardado e informa que la etapa principal constituye el bloque principal y no puede llevar bloque numerado.

**CP-013 — Rechazo por flujo sin etapa principal (error)**
Verifica: CA-3.1.3 · RN-3.4
Dado un flujo en el que ninguna etapa está marcada como principal
Cuando el administrador intenta guardar el flujo
Entonces el sistema impide el guardado e informa que el flujo debe tener una etapa principal, que constituirá su bloque principal.

**CP-014 — Advertencia por bloque compuesto solo de etapas condicionales**
Verifica: CA-3.1.4 · RN-3.6
Dado un flujo cuyo bloque 3 se compone únicamente de etapas condicionales no mandatorias
Cuando el administrador guarda el flujo
Entonces el sistema guarda la configuración y muestra la advertencia de que ese bloque podría quedar sin actividades en algunos tickets.

**CP-015 — Rechazo de la cancelación que dejaría un bloque intermedio vacío (validación)**
Verifica: CA-3.1.5 · RN-3.7
Dado que el bloque 2 tiene una sola etapa activa y existe un bloque 3 con etapas activas
Cuando el administrador intenta cancelar esa etapa del bloque 2
Entonces el sistema impide la cancelación e informa que el bloque quedaría sin actividades.

**CP-016 — Cancelación permitida en el último bloque (escenario alternativo)**
Verifica: CA-3.1.5 · RN-3.7
Dado que el bloque 4 es el último del flujo y tiene dos etapas activas
Cuando el administrador cancela una de ellas
Entonces el sistema acepta la cancelación porque el bloque conserva al menos una etapa activa y no se rompe la secuencia.

**CP-017 — El bloque se copia al ticket al generarlo (camino feliz)**
Verifica: CA-4.1.1 · RN-4.1
Dado un flujo con etapas distribuidas en cuatro bloques
Cuando se genera un ticket a partir de la asignación de equipo de cómputo
Entonces cada etapa del ticket queda registrada con el mismo número de bloque que tenía en la configuración.

**CP-018 — Presentación agrupada del flujo en el ticket**
Verifica: CA-4.1.1
Dado un ticket con su etapa principal, tres etapas en el bloque 1 y dos en el bloque 2
Cuando el coordinador de Cómputo consulta la pestaña de flujo de trabajo
Entonces el sistema presenta el bloque principal al inicio y después las etapas agrupadas bajo el encabezado de su bloque, en orden ascendente.

**CP-019 — Indicador del bloque en curso**
Verifica: CA-4.1.2 · RN-4.4
Dado un ticket con cuatro bloques de actividades, el bloque 1 concluido y las etapas del bloque 2 activas
Cuando el responsable consulta la pestaña de flujo de trabajo
Entonces el sistema muestra el indicador "Bloque 2 de 4" —sin contar el bloque principal— y distingue visualmente el bloque 2 como bloque en curso.

**CP-020 — El indicador excluye los bloques sin etapas**
Verifica: CA-4.1.3 · RN-4.3
Dado un flujo configurado con cinco bloques de actividades y un ticket en el que el bloque 4 no generó ninguna etapa
Cuando el responsable consulta el indicador de avance
Entonces el sistema muestra un total de cuatro bloques y no de cinco.

**CP-021 — Etapa de bloque posterior en solo lectura (permisos)**
Verifica: CA-4.1.4 · RN-4.2
Dado que el bloque 2 está en curso y el responsable del departamento de una etapa del bloque 3 abre el ticket
Cuando intenta capturar la información de esa etapa
Entonces el sistema la presenta en solo lectura, indica que pertenece a un bloque posterior y no permite registrar la atención realizada.

**CP-022 — Etapa del bloque en curso de otro departamento en solo lectura (permisos)**
Verifica: CA-4.1.4 · RNF-006
Dado que el bloque 2 está en curso y un usuario de un departamento distinto al responsable de una de sus etapas abre el ticket
Cuando intenta capturar esa etapa
Entonces el sistema la presenta en solo lectura y no permite la captura.

**CP-023 — Un cambio en la plantilla no altera un ticket en curso**
Verifica: CA-4.1.5 · RN-4.1
Dado un ticket generado cuando la etapa de alta de VPN estaba en el bloque 2
Cuando el administrador mueve esa etapa al bloque 3 en la configuración del flujo
Entonces el ticket ya generado conserva la etapa en el bloque 2 y continúa ejecutándose con esa organización.

**CP-024 — El bloque no cierra con actividades pendientes**
Verifica: CA-5.1.1 · RN-5.4
Dado un bloque 2 con tres etapas activas
Cuando el responsable registra la atención realizada de una de ellas y guarda
Entonces el sistema deja esa etapa en Atendido, mantiene el bloque 2 en curso y no activa ninguna etapa del bloque 3.

**CP-025 — Apertura del siguiente bloque al concluir la última etapa (camino feliz)**
Verifica: CA-5.1.2 · RN-5.5
Dado un bloque 2 con tres etapas, dos ya en Atendido y una activa
Cuando el responsable registra la atención realizada de la última y guarda
Entonces el sistema cierra el bloque 2, activa todas las etapas del bloque 3 y lo señala como bloque en curso.

**CP-026 — Generación simultánea de los subtickets del bloque**
Verifica: CA-5.1.3 · RN-5.6
Dado un bloque 3 con cuatro etapas, tres de ellas marcadas para registrar ticket
Cuando el bloque 2 queda cerrado y el bloque 3 se abre
Entonces el sistema genera los tres subtickets, cada uno dirigido al responsable configurado de su etapa.

**CP-027 — Etapa activa que no genera subticket (escenario alternativo)**
Verifica: CA-5.1.3 · RN-5.6
Dado un bloque 3 con una etapa que no está marcada para registrar ticket
Cuando el bloque 3 se abre
Entonces el sistema activa esa etapa sin generar subticket y la deja disponible para su captura dentro del ticket principal.

**CP-028 — No se duplican los subtickets**
Verifica: CA-5.1.4 · RN-5.6
Dado que una etapa del bloque 3 ya tiene un subticket no cancelado asociado
Cuando el sistema vuelve a evaluar la apertura de ese bloque
Entonces no genera un segundo subticket y conserva el existente.

**CP-029 — Una etapa descartada también cierra el bloque**
Verifica: CA-5.1.5 · RN-5.2
Dado un bloque 2 con dos etapas, una en Atendido y otra descartada por el sistema
Cuando se evalúa el estado del bloque
Entonces el sistema lo considera cerrado y abre el bloque 3.

**CP-030 — Cierre del último bloque de actividades**
Verifica: CA-5.1.6 · RN-5.8
Dado un ticket cuyo último bloque de actividades tiene una sola etapa activa
Cuando el responsable registra su atención realizada y guarda
Entonces el sistema no abre ningún bloque adicional y deja la etapa principal disponible para atenderse.

**CP-031 — El ticket principal no puede cerrarse con etapas pendientes (error)**
Verifica: CA-5.1.6 · RN-5.8
Dado un ticket cuyo bloque 3 tiene etapas activas y cuyo bloque 4 tiene etapas en espera
Cuando un usuario de Cómputo intenta cerrar el ticket principal
Entonces el sistema no ofrece la acción de cierre o la impide, indicando que el flujo de trabajo no ha concluido.

**CP-032 — No coexisten dos bloques de actividades abiertos**
Verifica: CA-5.1.7 · RN-5.7
Dado un ticket cuyo bloque 3 acaba de abrirse
Cuando el coordinador consulta el flujo de trabajo
Entonces el sistema muestra etapas activas únicamente del bloque 3 y del bloque principal, con las del bloque 2 concluidas y las del bloque 4 en espera.

**CP-033 — Registro en bitácora de la apertura del bloque (auditoría)**
Verifica: CA-5.1.2 · RN-5.9
Dado que el bloque 3 se abrió al cerrarse el bloque 2
Cuando el coordinador consulta la bitácora del ticket
Entonces encuentra el registro de la apertura del bloque 3 y de la activación de cada una de sus etapas, con fecha y hora.

**CP-034 — Falla al generar un subticket revierte la apertura del bloque (error)**
Verifica: CA-5.1.3 · RNF-002
Dado un bloque 3 de cinco etapas en el que una de ellas no tiene responsable activo resoluble
Cuando el sistema intenta abrir el bloque
Entonces la apertura completa se revierte, ninguna etapa del bloque 3 queda activa, no se genera ningún subticket y el sistema informa el motivo del fallo.

**CP-035 — Bloque sin etapas generadas en el ticket**
Verifica: CA-6.1.1 · RN-6.1
Dado un ticket en el que el bloque 3 no generó ninguna etapa porque ninguna de sus cuentas fue solicitada
Cuando se cierra el bloque 2
Entonces el sistema omite el bloque 3 y abre directamente el bloque 4.

**CP-036 — Bloque descartado en su totalidad**
Verifica: CA-6.1.2 · RN-6.2
Dado un ticket cuyo bloque 3 tiene dos etapas condicionadas al resultado SI de la etapa de diagnóstico, y esa etapa se cerró con NA
Cuando se cierra el bloque 2
Entonces el sistema descarta ambas etapas del bloque 3, registra el motivo y abre el bloque 4 en la misma operación.

**CP-037 — Dos bloques consecutivos descartados**
Verifica: CA-6.1.3 · RN-6.2
Dado un ticket cuyos bloques 3 y 4 quedan descartados en su totalidad
Cuando se cierra el bloque 2
Entonces el sistema descarta ambos bloques en la misma operación y abre el bloque 5, sin dejar etapas esperando un bloque que ya no se abrirá.

**CP-038 — Todos los bloques restantes quedan descartados**
Verifica: CA-6.1.4 · RN-6.5
Dado un ticket cuyos bloques 3 y 4 son los últimos y ambos quedan descartados en su totalidad
Cuando se cierra el bloque 2
Entonces el sistema da por concluido el flujo y deja el ticket principal disponible para cerrarse.

**CP-039 — Motivo del descarte registrado en bitácora (auditoría)**
Verifica: CA-6.1.5 · RN-6.4
Dado que el sistema descartó una etapa porque su etapa condicionante se resolvió con un resultado distinto al esperado
Cuando el coordinador consulta la bitácora del ticket
Entonces encuentra el registro con la fecha, la etapa descartada, la etapa condicionante y el motivo del descarte.

**CP-040 — La verificación detecta un ticket detenido**
Verifica: CA-6.1.6 · RN-6.3
Dado un ticket con etapas en estatus Espera y ninguna en estatus Activo
Cuando se ejecuta la verificación del invariante de no bloqueo
Entonces el sistema incluye ese ticket en el listado de tickets detenidos.

**CP-041 — La verificación no marca un ticket sano (escenario alternativo)**
Verifica: CA-6.1.6 · RN-6.3
Dado un ticket con etapas en Espera y al menos una etapa en Activo
Cuando se ejecuta la verificación del invariante de no bloqueo
Entonces el sistema no lo incluye en el listado de tickets detenidos.

**CP-042 — Condición cumplida: la etapa se activa (camino feliz)**
Verifica: CA-7.1.1 · RN-7.4
Dado que la etapa de diagnóstico del bloque 2 se cerró con resultado SI y la etapa de configuración del bloque 3 está condicionada a ese resultado
Cuando se cierra el bloque 2 y se abre el bloque 3
Entonces el sistema activa la etapa de configuración y genera su subticket.

**CP-043 — Condición no cumplida: la etapa se descarta**
Verifica: CA-7.1.2 · RN-7.4
Dado que la etapa de diagnóstico del bloque 2 se cerró con resultado NA y la etapa de configuración del bloque 3 está condicionada al resultado SI
Cuando se cierra el bloque 2 y se abre el bloque 3
Entonces el sistema descarta la etapa de configuración, no genera subticket y registra el motivo.

**CP-044 — Etapa sin condición se activa siempre**
Verifica: CA-7.1.3 · RN-7.6
Dado que una etapa del bloque 3 no tiene etapa condicionante declarada
Cuando se abre el bloque 3
Entonces el sistema la activa sin evaluar condición alguna.

**CP-045 — Arrastre del descarte a la etapa dependiente**
Verifica: CA-7.1.4 · RN-7.5
Dado que la etapa del bloque 3 fue descartada y una etapa del bloque 4 está condicionada al resultado de esa etapa
Cuando se abre el bloque 4
Entonces el sistema descarta también la etapa del bloque 4 e indica en la bitácora que su etapa condicionante había sido descartada.

**CP-046 — La selección de condicionante se limita a bloques anteriores**
Verifica: CA-7.1.5 · RN-7.2
Dado que el administrador captura una etapa del bloque 3
Cuando abre la selección de etapa condicionante
Entonces el sistema solo le ofrece etapas de los bloques 1 y 2.

**CP-047 — Rechazo de condicionante del mismo bloque o posterior (validación)**
Verifica: CA-7.1.5 · RN-7.2
Dado que el administrador intenta asignar como condicionante de una etapa del bloque 3 otra etapa del bloque 3
Cuando intenta guardar
Entonces el sistema impide el guardado e informa que la etapa condicionante debe pertenecer a un bloque anterior.

**CP-048 — Resultado esperado obligatorio (validación)**
Verifica: CA-7.1.6 · RN-7.3
Dado que el administrador selecciona una etapa condicionante y deja vacío el resultado esperado
Cuando intenta guardar la etapa
Entonces el sistema impide el guardado e informa que el resultado esperado es requerido.

**CP-049 — Etapa mandatoria no admite condición (validación)**
Verifica: CA-7.1.7 · RN-7.7
Dado que el administrador marca una etapa como mandatoria
Cuando intenta declararle una etapa condicionante
Entonces el sistema impide el guardado e informa que una etapa mandatoria siempre aplica y no admite condición.

**CP-050 — Retiro de la condición de una etapa (escenario alternativo)**
Verifica: CA-7.1.3 · RN-7.6
Dado que una etapa del bloque 3 tiene declarada una etapa condicionante y un resultado esperado
Cuando el administrador retira la etapa condicionante y guarda
Entonces el sistema deja la etapa como incondicional y, en los tickets que se generen a partir de ese momento, la activa siempre que su bloque se abra.

**CP-051 — Conversión de una cadena simple (camino feliz)**
Verifica: CA-8.1.1 · RN-8.2
Dado un flujo con una etapa principal, una etapa que depende de ella y una tercera que depende de la segunda
Cuando se ejecuta la conversión
Entonces el sistema deja la etapa principal como bloque principal, asigna el bloque 1 a la segunda y el bloque 2 a la tercera, y lo refleja en el reporte de conversión.

**CP-052 — Conversión de ramas de distinta longitud**
Verifica: CA-8.1.2 · RN-8.3
Dado un flujo en el que una etapa puede alcanzarse por una ruta de dos pasos y por otra de tres
Cuando se ejecuta la conversión
Entonces el sistema le asigna el bloque correspondiente a la ruta más larga y señala en el reporte que esa etapa cambia su momento de arranque.

**CP-053 — Detección de etapa huérfana (error)**
Verifica: CA-8.1.3 · RN-8.4
Dado un flujo que contiene una etapa activa sin antecesor que no está marcada como principal
Cuando se ejecuta la conversión
Entonces el sistema la reporta como inconsistencia, no le asigna bloque y marca el flujo como pendiente de asignación manual.

**CP-054 — Conversión de las condiciones de activación**
Verifica: CA-8.1.4 · RN-8.5
Dado un flujo en el que una etapa se activa solo cuando su antecesor cierra con resultado SI
Cuando se ejecuta la conversión
Entonces el sistema declara a ese antecesor como etapa condicionante y conserva SI como resultado esperado.

**CP-055 — Flujo convertido sin validar no entra en operación (error)**
Verifica: CA-8.1.5 · RN-8.7
Dado un flujo cuya conversión se ejecutó y cuyo reporte no ha sido validado por el administrador
Cuando se genera un ticket que correspondería a ese flujo
Entonces el sistema no aplica la configuración convertida y advierte que el flujo está pendiente de validación.

**CP-056 — Flujo convertido y validado entra en operación (camino feliz)**
Verifica: CA-8.1.5 · RN-8.7
Dado un flujo cuya conversión fue validada por el administrador responsable
Cuando se genera un ticket que corresponde a ese flujo
Entonces el sistema aplica la configuración por bloques y abre en una sola operación el bloque principal y el bloque 1.

**CP-057 — Ticket abierto antes de la liberación conserva la regla anterior**
Verifica: CA-8.2.1 · RN-8.8
Dado un ticket generado antes de la liberación, cuyas etapas no tienen bloque asignado
Cuando el responsable registra la atención realizada de una de sus etapas
Entonces el sistema activa las etapas que dependían de ella conforme a la regla anterior y el ticket continúa su curso sin intervención manual.

**CP-058 — Ticket nuevo opera por bloques**
Verifica: CA-8.2.2 · RN-8.9
Dado un ticket generado después de la liberación a partir de un flujo convertido y validado
Cuando el responsable registra la atención realizada de una etapa que deja pendientes otras del mismo bloque
Entonces el sistema no abre el siguiente bloque, aplicando la regla de barrera y no la regla anterior.

**CP-059 — Consulta de tickets en modo de compatibilidad**
Verifica: CA-8.2.3 · RN-8.10
Dado que existen tickets abiertos generados antes de la liberación
Cuando el equipo de desarrollo consulta el indicador de compatibilidad
Entonces el sistema informa cuántos tickets abiertos permanecen operando con la regla anterior.

**CP-060 — El subticket se registra con el bloque de su etapa (camino feliz)**
Verifica: CA-4.2.1 · RN-4.6
Dado un flujo cuyo bloque 2 contiene una etapa marcada para registrar ticket
Cuando el bloque 2 se abre y el sistema genera el subticket de esa etapa
Entonces el subticket queda registrado con el bloque 2 y el dato es consultable desde el propio subticket.

**CP-061 — Todos los subtickets de una apertura traen su bloque**
Verifica: CA-4.2.2 · RN-4.6 · RN-4.7
Dado un bloque 3 con tres etapas marcadas para registrar ticket
Cuando el sistema abre el bloque 3 y genera los tres subtickets en una sola operación
Entonces los tres quedan registrados con el bloque 3 y ninguno queda sin bloque.

**CP-062 — El bloque del subticket no cambia al avanzar el flujo**
Verifica: CA-4.2.3 · RN-4.8
Dado un subticket generado desde una etapa del bloque 2 y ya atendido
Cuando el ticket principal cierra el bloque 2 y abre el bloque 3
Entonces el subticket conserva el bloque 2 y no adopta el bloque en curso del ticket principal.

**CP-063 — Consulta y filtrado de subtickets por bloque**
Verifica: CA-4.2.4 · RN-4.9
Dado un conjunto de tickets abiertos con subtickets de distintos bloques
Cuando el coordinador filtra el listado de tickets por el bloque 2
Entonces el sistema muestra únicamente los subtickets del bloque 2 y presenta el bloque como columna del listado.

**CP-064 — Subticket ajeno al flujo escalonado sin bloque (escenario alternativo)**
Verifica: CA-4.2.5 · RN-4.10
Dado un subticket registrado por una vía distinta al flujo escalonado
Cuando el usuario lo consulta y lo atiende
Entonces el sistema lo presenta sin bloque, no lo marca como incompleto y permite su atención y cierre.

**CP-065 — Modo por bloques por omisión en un flujo nuevo (camino feliz)**
Verifica: CA-1.1.1 · RN-1.3
Dado que el administrador registra un flujo de trabajo nuevo
Cuando consulta el detalle del flujo antes de guardarlo
Entonces el sistema presenta el modo de ejecución con el valor Por bloques y solicita el bloque en la captura de las etapas.

**CP-066 — Flujo nuevo configurado en modo escalonado (escenario alternativo)**
Verifica: CA-1.1.2 · RN-1.4
Dado que el administrador registra un flujo de trabajo nuevo y selecciona el modo Escalonado por antecesor
Cuando captura una etapa del flujo
Entonces el sistema le solicita el antecesor, no le solicita el bloque y guarda la etapa sin exigirlo.

**CP-067 — Rechazo por modo de ejecución sin declarar (validación)**
Verifica: CA-1.1.3 · RN-1.1
Dado que el administrador intenta guardar un flujo de trabajo sin modo de ejecución declarado
Cuando selecciona Guardar
Entonces el sistema impide el guardado e informa que el modo de ejecución es un dato requerido.

**CP-068 — Los flujos existentes quedan en modo escalonado (compatibilidad)**
Verifica: CA-1.1.4 · RN-1.2
Dado un flujo de trabajo configurado antes de la liberación
Cuando el administrador consulta su detalle después de la liberación
Entonces el sistema lo muestra en modo Escalonado por antecesor, sin bloques asignados y sin cambios en su configuración.

**CP-069 — Las validaciones por bloques no se ejecutan en un flujo escalonado**
Verifica: CA-1.1.2 · RN-1.5 · RN-3.1
Dado un flujo en modo Escalonado por antecesor cuyas etapas no tienen bloque asignado
Cuando el administrador guarda el flujo
Entonces el sistema acepta el guardado sin señalar huecos de numeración, bloques vacíos ni exigencias sobre el bloque de la etapa principal.

**CP-070 — Cambio a modo por bloques con conversión (camino feliz)**
Verifica: CA-1.1.5 · RN-1.6
Dado un flujo en modo Escalonado por antecesor con tres etapas encadenadas por antecesor
Cuando el administrador cambia el modo a Por bloques y confirma la operación
Entonces el sistema ejecuta la conversión, presenta el reporte con los bloques 1, 2 y 3 asignados y deja el flujo pendiente de validación.

**CP-071 — Flujo con conversión pendiente sigue generando tickets escalonados (error)**
Verifica: CA-1.1.5 · RN-8.7
Dado un flujo cuyo cambio a modo Por bloques está pendiente de validación
Cuando se genera un ticket a partir de ese flujo
Entonces el sistema lo genera en modo Escalonado por antecesor y advierte que el flujo tiene una conversión pendiente de validación.

**CP-072 — Descarte de la conversión antes de validarla (escenario alternativo)**
Verifica: CA-1.1.5 · RN-1.6
Dado un flujo con una conversión a modo Por bloques pendiente de validación
Cuando el administrador descarta la conversión
Entonces el sistema regresa el flujo al modo Escalonado por antecesor y conserva su configuración previa sin cambios.

**CP-073 — Rechazo del cambio a escalonado sin antecesores (validación)**
Verifica: CA-1.1.6 · RN-1.7
Dado un flujo en modo Por bloques con cuatro etapas activas sin antecesor capturado
Cuando el administrador intenta cambiar el modo a Escalonado por antecesor
Entonces el sistema impide el cambio, enlista las etapas que requieren antecesor y habilita su captura.

**CP-074 — Cambio a escalonado con los antecesores completos (camino feliz)**
Verifica: CA-1.1.7 · RN-1.7
Dado un flujo en modo Por bloques en el que todas las etapas activas tienen antecesor y su etapa condicionante coincide con él
Cuando el administrador cambia el modo a Escalonado por antecesor y confirma la operación
Entonces el sistema acepta el cambio y los tickets que se generen a partir de ese momento avanzan etapa contra etapa.

**CP-075 — Rechazo del cambio a escalonado por condicionante distinta del antecesor (validación)**
Verifica: CA-1.1.6 · RN-1.7
Dado un flujo en modo Por bloques en el que una etapa está condicionada al resultado de una etapa que no es su antecesor
Cuando el administrador intenta cambiar el modo a Escalonado por antecesor
Entonces el sistema impide el cambio e informa que esa condición no puede evaluarse en modo escalonado, señalando la etapa involucrada.

**CP-076 — Bitácora del cambio de modo (auditoría)**
Verifica: CA-1.1.8 · RN-1.9
Dado que el administrador cambió el modo de ejecución de un flujo
Cuando el coordinador de Cómputo consulta la bitácora del flujo
Entonces encuentra el registro con la fecha, la hora, el usuario, el modo anterior y el modo nuevo.

**CP-077 — Usuario sin permiso no cambia el modo (permisos)**
Verifica: CA-1.1.8 · RN-1.8
Dado un usuario sin permiso de administración de flujos de trabajo
Cuando abre el detalle de un flujo e intenta cambiar su modo de ejecución
Entonces el sistema no le habilita la opción e impide cualquier cambio.

**CP-078 — El ticket se sella con el modo de su flujo (camino feliz)**
Verifica: CA-1.2.1 · RN-1.12
Dado un flujo en modo Por bloques, convertido y validado
Cuando se genera un ticket a partir de la asignación de equipo de cómputo
Entonces el ticket queda registrado en modo Por bloques y presenta sus etapas agrupadas con el indicador de avance.

**CP-079 — Un cambio de modo no altera un ticket abierto**
Verifica: CA-1.2.2 · RN-1.13
Dado un ticket abierto generado cuando su flujo estaba en modo Escalonado por antecesor
Cuando el administrador cambia ese flujo a modo Por bloques y valida la conversión
Entonces el ticket conserva el modo Escalonado por antecesor y termina de ejecutarse etapa contra etapa.

**CP-080 — Ticket en modo escalonado avanza etapa contra etapa (camino feliz)**
Verifica: CA-1.2.3 · RN-1.14
Dado un ticket en modo Escalonado por antecesor con tres etapas dependientes de una misma etapa previa y una cuarta que depende solo de la primera de ellas
Cuando el responsable registra la atención realizada de esa primera etapa
Entonces el sistema activa la cuarta etapa de inmediato, sin esperar a que las otras dos concluyan.

**CP-081 — Ticket en modo por bloques se detiene en la barrera**
Verifica: CA-1.2.4 · RN-1.14
Dado un ticket en modo Por bloques cuyo bloque 2 tiene tres etapas activas
Cuando el responsable registra la atención realizada de una de ellas
Entonces el sistema no activa ninguna etapa del bloque 3 y mantiene el bloque 2 como bloque en curso.

**CP-082 — Presentación del ticket escalonado sin indicador de bloque**
Verifica: CA-1.2.5 · RN-1.14 · RN-1.16
Dado un ticket en modo Escalonado por antecesor
Cuando el responsable consulta la pestaña de flujo de trabajo
Entonces el sistema indica que el ticket opera en modo escalonado y no presenta encabezados de bloque ni indicador del tipo "Bloque 2 de 4".

**CP-083 — Un ticket no mezcla los dos mecanismos (escenario límite)**
Verifica: CA-1.2.4 · RN-1.15
Dado un ticket sellado en modo Por bloques cuyo flujo de origen fue cambiado después a modo Escalonado por antecesor
Cuando el responsable registra la atención realizada de la última etapa pendiente del bloque en curso
Entonces el sistema aplica la regla de barrera a la totalidad de las etapas del ticket y en ningún momento activa etapas por antecesor.

**CP-084 — Consulta y filtrado del catálogo por modo de ejecución**
Verifica: CA-1.1.4 · RN-1.11
Dado un catálogo con flujos configurados en ambos modos
Cuando el administrador filtra el listado por el modo Por bloques
Entonces el sistema muestra únicamente los flujos en ese modo y presenta el modo de ejecución como columna del listado.

**CP-085 — El subticket por bloques no presenta la pestaña de flujo de trabajo (camino feliz)**
Verifica: CA-4.1.6 · RN-4.5
Dado un subticket generado por un ticket principal en modo Por bloques
Cuando el responsable de la etapa lo abre para atenderlo
Entonces el sistema no presenta la pestaña de flujo de trabajo en ese subticket.

**CP-086 — El subticket conserva su bloque aunque no muestre el flujo**
Verifica: CA-4.1.6 · RN-4.6
Dado un subticket generado desde una etapa del bloque 2 de un ticket en modo Por bloques
Cuando el responsable lo consulta
Entonces el sistema le muestra el bloque 2 como grupo escalonado del subticket y el vínculo al ticket principal, sin presentar el flujo completo.

**CP-087 — El flujo completo se consulta en el ticket principal (camino feliz)**
Verifica: CA-4.1.7 · RN-4.5
Dado el ticket principal en modo Por bloques del que se generaron esos subtickets
Cuando el coordinador de Cómputo lo consulta
Entonces el sistema presenta la pestaña de flujo de trabajo con las etapas agrupadas por bloque y el indicador de avance.

**CP-088 — El subticket de un ticket escalonado conserva la pestaña (escenario alternativo)**
Verifica: CA-4.1.8 · RN-4.5
Dado un subticket generado por un ticket principal en modo Escalonado por antecesor
Cuando el responsable lo abre
Entonces el sistema conserva la presentación vigente del flujo de trabajo en ese subticket y no aplica la restricción del modo por bloques.

**CP-089 — Apertura conjunta del bloque principal y del bloque 1 (camino feliz)**
Verifica: CA-5.1.8 · RN-5.10
Dado un flujo en modo Por bloques con su etapa principal, tres etapas en el bloque 1 y dos en el bloque 2
Cuando se genera el ticket a partir de la asignación de equipo de cómputo
Entonces el sistema abre en una sola operación el bloque principal y las tres etapas del bloque 1, genera los subtickets correspondientes y deja las dos etapas del bloque 2 en Espera.

**CP-090 — El bloque principal no retrasa la apertura del bloque 1**
Verifica: CA-5.1.8 · RN-5.10
Dado un ticket recién generado en modo Por bloques
Cuando el responsable de una etapa del bloque 1 la consulta
Entonces la encuentra activa y disponible para capturar desde el primer momento, sin necesidad de que la etapa principal se haya atendido.

**CP-091 — El bloque 2 no se detona hasta cerrar el bloque 1 (validación)**
Verifica: CA-5.1.9 · RN-5.11
Dado un ticket recién generado cuyo bloque 1 tiene tres etapas activas y cuyo bloque 2 tiene dos etapas en Espera
Cuando el responsable atiende dos etapas del bloque 1 y la tercera sigue abierta
Entonces las dos etapas del bloque 2 permanecen en Espera, no se genera ninguno de sus subtickets y el bloque 1 sigue siendo el bloque en curso.

**CP-092 — Rechazo del cierre del bloque principal con bloques pendientes (error)**
Verifica: CA-5.2.1 · RN-5.13
Dado un ticket en modo Por bloques cuyo bloque 2 está en curso y cuyo bloque 3 tiene etapas en Espera
Cuando el responsable de la etapa principal intenta registrar su atención realizada
Entonces el sistema impide la operación e informa que el bloque principal se cierra al final, señalando los bloques pendientes.

**CP-093 — La etapa principal admite captura sin cerrarse (escenario alternativo)**
Verifica: CA-5.2.2 · RN-5.13
Dado el mismo ticket con bloques de actividades pendientes
Cuando el responsable captura información en la etapa principal y guarda sin registrar la atención realizada
Entonces el sistema conserva la captura y mantiene la etapa principal en estatus Activo.

**CP-094 — La etapa principal queda disponible al concluir el último bloque (camino feliz)**
Verifica: CA-5.2.3 · RN-5.14
Dado un ticket cuyo último bloque de actividades acaba de quedar cerrado
Cuando el responsable de la etapa principal la consulta
Entonces el sistema le permite registrar la atención realizada e indica que no quedan bloques pendientes.

**CP-095 — El cierre del bloque principal concluye el flujo (camino feliz)**
Verifica: CA-5.2.4 · RN-5.14 · RN-5.15
Dado un ticket cuyos bloques de actividades están todos concluidos y cuya etapa principal es la única activa
Cuando el responsable registra la atención realizada de la etapa principal y guarda
Entonces el sistema da por concluido el flujo, deja el ticket principal disponible para cerrarse y registra el cierre del bloque principal en la bitácora.

**CP-096 — La etapa principal no enmascara un ticket detenido (error)**
Verifica: CA-6.1.6 · RN-6.3
Dado un ticket con etapas en Espera cuya única etapa en Activo es la etapa principal
Cuando se ejecuta la verificación del invariante de no bloqueo
Entonces el sistema lo incluye en el listado de tickets detenidos, porque la etapa principal no cuenta como etapa activa para el invariante.

**CP-097 — La etapa principal no admite bloque numerado (validación)**
Verifica: CA-2.1.7 · RN-2.4
Dado que el administrador marca una etapa como principal en un flujo en modo Por bloques
Cuando revisa los datos disponibles para captura
Entonces el sistema no le solicita el bloque, indica que esa etapa constituye el bloque principal y no le permite asignarle un número.

**CP-098 — La etapa principal no puede ser condicionante (validación)**
Verifica: CA-7.1.5 · RN-7.8
Dado que el administrador captura una etapa del bloque 2 y abre la selección de etapa condicionante
Cuando busca la etapa principal entre las opciones
Entonces el sistema no la ofrece y, de intentarse el guardado con ella, lo impide indicando que el resultado de la etapa principal se registra al final del flujo.

**CP-099 — El bloque principal se presenta aparte en el ticket**
Verifica: CA-4.1.9 · RN-4.3
Dado un ticket recién generado en modo Por bloques
Cuando el coordinador de Cómputo consulta la pestaña de flujo de trabajo
Entonces el sistema presenta el bloque principal por separado al inicio, señala que se cierra al final y no lo incluye en el conteo del indicador de avance.

**CP-100 — Bloque 1 sin etapas generadas al arrancar el ticket (escenario alternativo)**
Verifica: CA-5.1.10 · RN-5.10 · RN-6.1
Dado un flujo cuyo bloque 1 se compone solo de etapas condicionales y un ticket donde ninguna de esas cuentas fue solicitada
Cuando se genera el ticket
Entonces el sistema abre el bloque principal, omite el bloque 1 y abre el bloque 2 como bloque en curso, sin dejar etapas esperando un bloque que no existe en ese ticket.

**CP-101 — Ticket sin bloques de actividades (escenario límite)**
Verifica: CA-5.1.11 · RN-5.10
Dado un ticket en el que ningún bloque de actividades generó etapas
Cuando el responsable de la etapa principal la consulta
Entonces la encuentra activa y puede registrar su atención realizada de inmediato, porque no hay bloques pendientes.

**CP-102 — Una etapa del bloque 1 no admite condicionante (validación)**
Verifica: CA-7.1.5 · RN-7.2
Dado que el administrador captura una etapa del bloque 1 en un flujo en modo Por bloques
Cuando abre la selección de etapa condicionante
Entonces el sistema no le ofrece ninguna opción e indica que las etapas del bloque 1 no pueden condicionarse porque no existe un bloque anterior.

## Trazabilidad de la cobertura

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-1.1.1 | CP-065 | Camino feliz |
| CA-1.1.2 | CP-066, CP-069 | Escenario alternativo, Validación |
| CA-1.1.3 | CP-067 | Validación |
| CA-1.1.4 | CP-068, CP-084 | Compatibilidad, Visualización y filtrado |
| CA-1.1.5 | CP-070, CP-071, CP-072 | Camino feliz, Error, Escenario alternativo |
| CA-1.1.6 | CP-073, CP-075 | Validación (antecesor y condicionante) |
| CA-1.1.7 | CP-074 | Camino feliz |
| CA-1.1.8 | CP-076, CP-077 | Auditoría, Permisos |
| CA-1.2.1 | CP-078 | Camino feliz |
| CA-1.2.2 | CP-079 | Escenario alternativo (congelación) |
| CA-1.2.3 | CP-080 | Camino feliz (modo escalonado) |
| CA-1.2.4 | CP-081, CP-083 | Camino feliz (barrera), Escenario límite |
| CA-1.2.5 | CP-082 | Visualización |
| CA-2.1.1 | CP-001, CP-008 | Camino feliz, Permisos |
| CA-2.1.2 | CP-002, CP-003 | Validación (obligatoriedad y rango) |
| CA-2.1.3 | CP-004 | Validación (unicidad dentro del bloque) |
| CA-2.1.4 | CP-005 | Escenario alternativo |
| CA-2.1.5 | CP-006 | Camino feliz |
| CA-2.1.6 | CP-007 | Camino feliz |
| CA-2.1.7 | CP-097 | Validación |
| CA-3.1.1 | CP-009, CP-010 | Error, Camino feliz |
| CA-3.1.2 | CP-011 | Validación |
| CA-3.1.3 | CP-012, CP-013 | Validación, Error |
| CA-3.1.4 | CP-014 | Advertencia |
| CA-3.1.5 | CP-015, CP-016 | Error, Escenario alternativo |
| CA-4.1.1 | CP-017, CP-018 | Camino feliz, Visualización |
| CA-4.1.2 | CP-019 | Camino feliz |
| CA-4.1.3 | CP-020 | Escenario alternativo |
| CA-4.1.4 | CP-021, CP-022 | Permisos (por bloque y por departamento) |
| CA-4.1.5 | CP-023 | Escenario alternativo |
| CA-4.1.6 | CP-085, CP-086 | Camino feliz, Visualización |
| CA-4.1.7 | CP-087 | Camino feliz |
| CA-4.1.8 | CP-088 | Escenario alternativo |
| CA-4.1.9 | CP-099 | Visualización |
| CA-4.2.1 | CP-060 | Camino feliz |
| CA-4.2.2 | CP-061 | Camino feliz (apertura simultánea) |
| CA-4.2.3 | CP-062 | Escenario alternativo (congelación) |
| CA-4.2.4 | CP-063 | Visualización y filtrado |
| CA-4.2.5 | CP-064 | Escenario alternativo |
| CA-5.1.1 | CP-024 | Camino feliz (barrera activa) |
| CA-5.1.2 | CP-025, CP-033 | Camino feliz, Auditoría |
| CA-5.1.3 | CP-026, CP-027, CP-034 | Camino feliz, Alternativo, Error |
| CA-5.1.4 | CP-028 | Validación (idempotencia) |
| CA-5.1.5 | CP-029 | Escenario alternativo |
| CA-5.1.6 | CP-030, CP-031 | Camino feliz, Error |
| CA-5.1.7 | CP-032 | Camino feliz |
| CA-5.1.8 | CP-089, CP-090 | Camino feliz (apertura conjunta) |
| CA-5.1.9 | CP-091 | Validación (barrera del bloque 1) |
| CA-5.1.10 | CP-100 | Escenario alternativo (bloque vacío al arranque) |
| CA-5.1.11 | CP-101 | Escenario límite |
| CA-5.2.1 | CP-092 | Error |
| CA-5.2.2 | CP-093 | Escenario alternativo |
| CA-5.2.3 | CP-094 | Camino feliz |
| CA-5.2.4 | CP-095 | Camino feliz (fin del flujo) |
| CA-6.1.1 | CP-035 | Escenario alternativo |
| CA-6.1.2 | CP-036 | Escenario alternativo |
| CA-6.1.3 | CP-037 | Escenario alternativo (encadenado) |
| CA-6.1.4 | CP-038 | Escenario límite |
| CA-6.1.5 | CP-039 | Auditoría |
| CA-6.1.6 | CP-040, CP-041, CP-096 | Error, Camino feliz, Error (invariante) |
| CA-7.1.1 | CP-042 | Camino feliz |
| CA-7.1.2 | CP-043 | Escenario alternativo |
| CA-7.1.3 | CP-044, CP-050 | Camino feliz, Alternativo |
| CA-7.1.4 | CP-045 | Escenario alternativo (arrastre) |
| CA-7.1.5 | CP-046, CP-047, CP-098, CP-102 | Visibilidad, Validación, Validación (etapa principal y bloque 1) |
| CA-7.1.6 | CP-048 | Validación |
| CA-7.1.7 | CP-049 | Validación |
| CA-8.1.1 | CP-051 | Camino feliz |
| CA-8.1.2 | CP-052 | Escenario alternativo |
| CA-8.1.3 | CP-053 | Error |
| CA-8.1.4 | CP-054 | Camino feliz |
| CA-8.1.5 | CP-055, CP-056 | Error, Camino feliz |
| CA-8.2.1 | CP-057 | Camino feliz (compatibilidad) |
| CA-8.2.2 | CP-058 | Camino feliz |
| CA-8.2.3 | CP-059 | Camino feliz |

Los 75 criterios de aceptación del documento quedan cubiertos por al menos un caso de prueba; no hay criterios sin cobertura.
