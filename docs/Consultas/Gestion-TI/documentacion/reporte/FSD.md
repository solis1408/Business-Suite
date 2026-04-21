# 📘 FSD — Consultas / Reporte / Forecast

**Functional Specification Document**

| Campo   | Valor                                           |
| ------- | ----------------------------------------------- |
| Área    | Procesos                                        |
| Módulo  | Consultas - Reporte - Forecast                  |
| Versión | 1.0                                             |
| Fecha   | 08-04-2026                                      |
| Autor   | José Antonio Solis                              |
| Estado  | Inicial                                         |

---

## 1. 📖 Funcionalidad

### 1.1 Generación en contrato nuevo

**Evento:** Primer guardado persistido en base de datos.

**Restricción de periodicidad:** Solo aplica para contratos con periodo de pago mensual.

**Condición de fecha:** Se aplica la misma lógica existente de DiasAnticipacion + fechaProyeccion basada en la fecha aniversario del contrato, para determinar si corresponde generar la programación en el mes actual.

**Flujo**

- Si existen registros de prorrateo activos:
  - Se genera una programación por cada registro, con:
    - Importe = TotalContrato × (Porcentaje / 100)
    - CentroTrabajo = del registro de prorrateo
    - ProrrateoOrigen = referencia al registro de prorrateo
    - PorcentajeAplicado = porcentaje del registro
    - EsAutomatico = false
- Si no existen:
  - Se ejecuta flujo estándar

**Restricción:**

- Solo ocurre una vez (primer guardado)

---

### 1.2 Generación por servicio automático (Background Service)

**Condición de fecha:** Se aplica la lógica existente de DiasAnticipacion + fechaProyeccion para determinar si corresponde generar la programación en el periodo actual.

**Validación de duplicidad:** Incluye CentroTrabajo en la combinación de verificación.

**Flujo**

- Para cada contrato activo:
  - Si tiene prorrateo activo y no existe programación:
    - Generar programaciones correspondientes con:
      - Importe = TotalContrato × (Porcentaje / 100)
      - CentroTrabajo = del registro de prorrateo
    - ProrrateoOrigen = referencia al registro de prorrateo
      - PorcentajeAplicado = porcentaje del registro
      - EsAutomatico = true
  - Si no existe prorateo y no existe programación:

    - Se ejecuta flujo estándar

---

### 1.3 Generación manual

**Flujo**

- Al crear una programación manual, el sistema registra **una única programación**, El flujo de creación es el **estándar actual** en todos los casos.
- **Acción bajo demanda — "Aplicar Prorrateo"**
- La acción se muestra **únicamente en la lista de programaciones** y solo cuando el contrato asociado tiene registros de prorrateo activos. Si no los tiene, la acción no es visible.
- La acción solo puede ejecutarse **una única vez** por programación. Una vez aplicada, deja de estar disponible para esa programación.
- Al ejecutar la acción, el sistema:
  - **Actualiza** la programación original con los datos del **primer** registro de prorrateo activo:
    - Importe = TotalContrato × (Porcentaje / 100)
    - CentroTrabajo = del registro de prorrateo
    - ProrrateoOrigen = referencia al registro de prorrateo
    - PorcentajeAplicado = porcentaje del registro
    - EsAutomatico = false
  - **Crea** una nueva programación por cada registro de prorrateo activo restante (2°, 3°, ...), con:
    - Importe = TotalContrato × (Porcentaje / 100)
    - CentroTrabajo = del registro de prorrateo
    - ProrrateoOrigen = referencia al registro de prorrateo
    - PorcentajeAplicado = porcentaje del registro
    - EsAutomatico = false

- Al crear una programación manual
  - Si hay prorrateo activo:
    - Generar una programación por cada registro de prorrateo, con:
      - Importe = TotalContrato × (Porcentaje / 100)
      - CentroTrabajo = del registro de prorrateo
      - ProrrateoOrigen = referencia al registro de prorrateo
      - PorcentajeAplicado = porcentaje del registro
      - EsAutomatico = false

---

### 1.4 No regeneración

- Cambios en prorrateo NO afectan programaciones existentes

---

### 1.5 Gestión de registros de prorrateo

**Operación:** Creación de registro

**Restricción:** El porcentaje debe ser mayor a 0. No se permite asignar un centro de trabajo ya asignado en otro registro activo del mismo contrato.

**Flujo**

- El usuario asigna un centro de trabajo y un porcentaje al registro.
- Al guardar, si la suma de porcentajes de los registros activos no es exactamente 100%, el sistema bloquea el guardado y muestra: *"La sumatoria de los porcentajes en el Prorrateo de Gasto debe ser exactamente 100%."*
- La creación no genera entrada en bitácora.

---

**Operación:** Edición de registro activo

**Flujo**

- Se permite modificar el porcentaje y/o el centro de trabajo.
- Se aplican las mismas validaciones de unicidad de centro de trabajo y suma de 100%.
- Los cambios quedan registrados en bitácora.

---

**Operación:** Cancelación (baja lógica)

**Flujo**

- Un registro activo puede cancelarse.
- Al cancelarse, queda excluido del cálculo de suma de porcentajes.
- Un registro cancelado no puede editarse en sus campos de datos (centro de trabajo, porcentaje).
- El cambio de estatus queda registrado en bitácora.

---

**Operación:** Reactivación

**Flujo**

- Un registro cancelado puede reactivarse (volver a estado Activo).
- Si el centro de trabajo ya está asignado en otro registro activo del mismo contrato, el sistema bloquea la operación con mensaje de error.
- Si la suma de porcentajes de los registros activos resultante no es exactamente 100%, el sistema bloquea la operación con mensaje de error.
- El cambio de estatus queda registrado en bitácora.

---

### 1.6 Trazabilidad / Bitácora de prorrateo

**Evento:** Cambio en la configuración de un registro de prorrateo (modificación, cancelación o reactivación).

**Condición:** Solo aplica para modificaciones, cancelaciones y reactivaciones. La creación de un nuevo registro no genera entrada en bitácora.

**Flujo**

- Al detectar un cambio aplicable, el sistema registra automáticamente en bitácora:
  - Campo modificado y valor anterior.
  - Cambio de estatus y valor anterior (en cancelaciones y reactivaciones).
  - Usuario que realizó el cambio.
  - Fecha y hora del evento.
- La bitácora es visible desde la pantalla de detalle del registro de prorrateo.

**Restricción:**

- La creación de un nuevo registro de prorrateo **no** genera entrada en bitácora.

---

### 1.7 — Marcado de programaciones extraordinarias

Una programación de pago se considera **extraordinaria** cuando fue generada a partir de un registro de prorrateo de gasto específico, o cuando su fecha de aniversario no coincide con el ciclo proyectado del contrato. El indicador de programación extraordinaria es de uso interno (no visible al usuario) y se asigna automáticamente; nunca se edita manualmente.

**Condiciones que activan el marcado:**

| Condición                    | Descripción                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| **A — Prorrateo aplicado**   | La programación tiene asignado un registro de prorrateo de gasto, es decir, fue generada como parte de un prorrateo de gasto. |
| **B — Fecha fuera de ciclo** | La programación es de tipo renovación o adquisición, y el día del mes de su fecha de aniversario difiere del día del mes de la fecha de aniversario del contrato. |

Ambas condiciones son independientes; basta con que se cumpla cualquiera de las dos.

---

### 1.8 — Control de prorrateo por variable de sistema en la consulta de servicios. (Reporte Financiero)

El **Reporte Financiero** utiliza una variable de sistema para determinar si la lógica de distribución por tabla de configuración debe aplicarse al generar la consulta de pagos de servicios (contratos).

**Variable de sistema:**

| Nombre                                       | Tipo  | Valor predeterminado | Descripción                                                  |
| -------------------------------------------- | ----- | -------------------- | ------------------------------------------------------------ |
| Fecha de transición del esquema de prorrateo | Fecha | 10-04-2026           | Fecha a partir de la cual **no** se aplica la lógica de distribución por tabla de configuración en la consulta. Representa la fecha de transición al nuevo esquema donde el prorrateo queda registrado directamente en las programaciones de pago. |

**Regla de evaluación:**

Si la Fecha de Inicio del filtro del reporte es menor o igual a la fecha de transición, se activa la lógica de distribución por tabla de configuración de prorrateo. De lo contrario, se utiliza el flujo estándar sin distribución.

**Comportamiento de las consultas según el estado del indicador:**

| Consulta                                                     | Indicador activo (aplica prorrateo)                          | Indicador inactivo (no aplica prorrateo)                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Consulta de pagos de servicios                               | Se ejecuta **excluyendo** los contratos que tienen prorrateo activo con pagos en el rango desde la Fecha de Inicio hasta la fecha de transición, para evitar doble conteo. | Se ejecuta **sin exclusiones**; todos los contratos aparecen bajo el flujo estándar. |
| Consulta de pagos de servicios con distribución por prorrateo | Se ejecuta para el rango desde la Fecha de Inicio hasta la fecha de transición, aplicando la distribución por porcentaje y centro de trabajo. | **No se ejecuta.**                                           |

**Manejo de rangos que cruzan la fecha de corte:**

Cuando el rango del reporte comprende tanto el periodo anterior como el posterior a la fecha de transición, el reporte cubre ambos tramos:

- **Tramo con prorrateo** (desde la Fecha de Inicio hasta la fecha de transición): cubierto por la consulta de pagos con distribución por centro de trabajo.
- **Tramo posterior** (desde la fecha de transición hasta la Fecha de Fin): cubierto por la consulta estándar sin exclusión, como pago estándar del contrato.

**Protección contra doble conteo:**

La condición de exclusión en la consulta estándar (cuando el indicador está activo) evalúa si el contrato tiene configuración de prorrateo activa **y además** tiene pagos registrados dentro del tramo anterior a la fecha de transición. Si el contrato tiene prorrateo configurado pero **no tiene pagos** en ese tramo, la exclusión no aplica y el contrato aparece en el flujo estándar, evitando que quede sin representación en el reporte.

**Acotamiento intencional de la consulta de prorrateo:**

La consulta de pagos con distribución por prorrateo utiliza la fecha de transición como límite superior del rango de fechas, independientemente de la Fecha de Fin seleccionada por el usuario. Esto es intencional: se asume que después de la fecha de corte no existirán pagos bajo el esquema de distribución por tabla de configuración, ya que el nuevo esquema registra el prorrateo directamente en las programaciones.

---

## 2. 📐 Cambios al modelo de Datos

**Tabla:** ga_tr_programaciones_pagos

Los siguientes campos son nuevos y deben agregarse:

- fk_contrato_prorrateo_gasto
- porcentaje_aplicado

---

## 3. 📋 Historias de Usuario y Criterios de Aceptación

---

### HU-01 — Configuración de prorrateo en contrato

**Como** usuario administrativo,
**quiero** configurar registros de prorrateo de gasto en un contrato asignando un centro de trabajo y un porcentaje a cada uno,
**para** distribuir el gasto del contrato entre diferentes unidades organizacionales.

| ID       | Criterio de Aceptación                                       |
| -------- | ------------------------------------------------------------ |
| CA-01.1  | Al guardar un registro de prorrateo, si la suma de porcentajes de los registros activos no es igual a 100%, el sistema bloquea el guardado y muestra: *"La sumatoria de los porcentajes en el Prorrateo de Gasto debe ser exactamente 100%."* |
| CA-01.2  | No es posible guardar un registro de prorrateo sin centro de trabajo asignado. |
| CA-01.3  | No es posible asignar el mismo centro de trabajo a dos registros de prorrateo activos del mismo contrato. El lookup excluye los centros ya asignados en registros. |
| CA-01.4  | Un registro de prorrateo puede cancelarse (baja lógica). Al cancelarse, queda excluido del cálculo de suma de porcentajes. |
| CA-01.5  | El porcentaje de cada registro debe ser mayor que 0.         |
| CA-01.6  | Un registro cancelado no puede editarse en sus campos de datos (centro de trabajo, porcentaje). Solo permite la acción de reactivación |
| CA-01.7  | Un registro cancelado puede ser reactivado (volver a Activo). |
| CA-01.8  | Al reactivar, si el centro de trabajo ya está asignado en otro registro activo del mismo contrato, el sistema bloquea la reactivación con mensaje de error. |
| CA-01.9  | Al reactivar, si la suma de porcentajes de los registros activos resultante no es 100%, el sistema bloquea la reactivación con mensaje de error. |
| CA-01.10 | La reactivación queda registrada en bitácora indicando el cambio de estatus y el valor anterior. |

---

### HU-02 — Registro de cambios en configuración de prorrateo (Bitácora)

**Como** auditor o usuario administrativo,
**quiero** que el sistema registre automáticamente cualquier modificación en los registros de prorrateo,
**para** contar con trazabilidad completa de los cambios realizados.

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-02.1 | Al modificar el porcentaje, el sistema registra en bitácora el campo modificado y el valor anterior. |
| CA-02.2 | Al modificar el centro de trabajo, el sistema registra en bitácora el campo modificado y el valor anterior. |
| CA-02.3 | Al cancelar un registro, el sistema registra en bitácora el cambio de estatus y el valor anterior. |
| CA-02.4 | Cada entrada de bitácora incluye el usuario que realizó el cambio y la fecha/hora del evento. |
| CA-02.5 | La creación de un nuevo registro de prorrateo **no** genera entrada en bitácora. |
| CA-02.6 | La bitácora es visible desde la pantalla de detalle del registro de prorrateo. |
| CA-02.7 | Al reactivar un registro cancelado, el sistema registra en bitácora el cambio de estatus y el valor anterior (Cancelado). |

---

### HU-03 — Generación automática de programaciones en primer guardado de contrato

**Como** sistema,
**quiero** generar automáticamente las programaciones de pago al crear un contrato mensual,
**para** iniciar el ciclo de pagos desde el primer guardado sin intervención del usuario.

| ID       | Criterio de Aceptación                                       |
| -------- | ------------------------------------------------------------ |
| CA-03.1  | La generación automática en primer guardado aplica **únicamente** a contratos con periodo de pago mensual. |
| CA-03.2  | Solo se genera si, conforme a la fecha aniversario y la lógica de `DiasAnticipacion` + `fechaProyeccion`, **corresponde realizar el pago en el periodo actual**. |
| CA-03.3  | Si el contrato tiene prorrateo activo, se genera **una programación por cada registro de prorrateo activo**. |
| CA-03.4  | Cada programación generada tiene: `Importe = TotalContrato × (Porcentaje / 100)`, redondeado a 2 decimales. |
| CA-03.5  | Cada programación generada tiene asignado el `CentroTrabajo` del registro de prorrateo correspondiente. |
| CA-03.6  | Cada programación generada almacena `ProrrateoOrigen` y `PorcentajeAplicado`. |
| CA-03.7  | El campo `EsAutomatico` de cada programación generada es `false`. |
| CA-03.8  | Si el contrato **no tiene** prorrateo activo, se ejecuta el flujo estándar actual sin cambios. |
| CA-03.9  | La generación ocurre **una sola vez** (primer guardado). Si el contrato ya tiene programaciones, no se genera ninguna adicional. |
| CA-03.10 | Si no corresponde generar en el periodo actual, no se crea ninguna programación y no se muestra error. |

---

### HU-04 — Generación automática de programaciones por Background Service

**Como** sistema,
**quiero** generar programaciones de pago de forma automática y periódica para los contratos activos con prorrateo configurado,
**para** asegurar que los pagos sean calendarizados sin intervención manual en cada periodo.

| ID       | Criterio de Aceptación                                       |
| -------- | ------------------------------------------------------------ |
| CA-04.1  | El servicio evalúa todos los contratos activos con fecha aniversario válida y que no sean de pago perpetuo. |
| CA-04.2  | Solo genera programaciones cuando `fechaProyeccion - DiasAnticipacion <= fechaActual`. |
| CA-04.3  | Si el contrato tiene prorrateo activo, se genera **una programación por cada registro de prorrateo activo**. |
| CA-04.4  | Antes de generar, el servicio valida que no exista ya una programación para la combinación: **Contrato + FechaAniversario + CentroTrabajo**. Si existe, omite ese registro. |
| CA-04.5  | Cada programación generada tiene: `Importe = TotalContrato × (Porcentaje / 100)`, redondeado a 2 decimales. |
| CA-04.6  | Cada programación generada tiene asignado el `CentroTrabajo` del registro de prorrateo. |
| CA-04.7  | Cada programación generada almacena `ProrrateoOrigen` y `PorcentajeAplicado`. |
| CA-04.8  | El campo `EsAutomatico` de cada programación generada es `true`. |
| CA-04.9  | Si el contrato **no tiene** prorrateo activo, se ejecuta el flujo estándar actual sin cambios. |
| CA-04.10 | Si ocurre un error durante la generación de un contrato, el servicio registra el error en el log(seq) y **continúa** con el siguiente contrato. |

---

### HU-05 — Generación manual de programaciones con prorrateo

**Como** usuario operativo,
**quiero** que al crear manualmente una programación de pago para un contrato con prorrateo activo, el sistema genere automáticamente una programación por cada registro de prorrateo,
**para** no tener que crear cada programación de forma individual.

| ID       | Criterio de Aceptación                                       |
| -------- | ------------------------------------------------------------ |
| CA-05.1  | Al crear manualmente una programación, el sistema registra **una sola programación** con el total del contrato como importe, sin centro de trabajo, referencia al prorrateo de origen ni porcentaje aplicado (sin valor asignado), independientemente de si el contrato tiene prorrateo activo. |
| CA-05.2  | El flujo de creación manual es el **estándar actual** en todos los casos. |
| CA-05.3  | La acción **"Aplicar Prorrateo"** se muestra en la lista de programaciones **únicamente** cuando el contrato asociado tiene registros de prorrateo activos. Si no los tiene, la acción no es visible. |
| CA-05.4  | La acción **"Aplicar Prorrateo"** solo puede ejecutarse **una única vez** por programación. Una vez aplicada, la acción deja de estar disponible para esa programación. |
| CA-05.5  | Al ejecutar la acción, la programación original se **actualiza** con los datos del primer registro de prorrateo activo: importe igual al total del contrato multiplicado por el porcentaje, redondeado a 2 decimales; centro de trabajo, referencia al registro de prorrateo de origen y porcentaje aplicado en el cálculo. |
| CA-05.6  | Al ejecutar la acción, se **crea una nueva programación** por cada registro de prorrateo activo restante (2°, 3°, ...), con importe, centro de trabajo, referencia al registro de prorrateo de origen y porcentaje aplicado correspondientes, redondeado a 2 decimales. |
| CA-05.7  | Todas las programaciones resultantes de la acción quedan marcadas como generadas manualmente (no por el servicio automático). |
| CA-05.8  | Todas las programaciones resultantes de la acción comparten la misma fecha de aniversario de la programación original. |
| CA-05.9  | No aplica restricción de duplicidad al ejecutar la acción.   |
| CA-05.10 | Si el contrato **no tiene** prorrateo activo, el flujo de creación manual sigue el comportamiento estándar actual sin cambios y la acción no es visible. |

---

### HU-06 — Trazabilidad del origen en programaciones con prorrateo

**Como** usuario administrativo,
**quiero** que cada programación de pago generada por prorrateo almacene el registro de origen y el porcentaje aplicado,
**para** poder identificar de dónde proviene cada programación y verificar el cálculo del importe.

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-06.1 | Las programaciones generadas por prorrateo almacenan en `ProrrateoOrigen` la referencia al `ContratoProrrateoGasto` que las originó. |
| CA-06.2 | Las programaciones generadas por prorrateo almacenan en `PorcentajeAplicado` el porcentaje utilizado en el cálculo. |
| CA-06.3 | Los campos `ProrrateoOrigen` y `PorcentajeAplicado` son opcionales. Las programaciones sin prorrateo no tienen valor asignado en estos campos. |
| CA-06.4 | El campo `EsAutomatico` indica `true` si fue generada por el Background Service, o `false` si fue generada manualmente o en el primer guardado. |
| CA-06.5 | Los campos `ProrrateoOrigen` y `PorcentajeAplicado` son de **solo lectura** una vez que la programación ha sido guardada. |
| CA-06.6 | La programación muestra en pantalla: centro de trabajo, importe, fecha, estatus, porcentaje aplicado y origen. |

---

### HU-07 — Independencia de programaciones existentes ante cambios en prorrateo

**Como** usuario administrativo,
**quiero** que los cambios en la configuración de prorrateo de un contrato no afecten las programaciones de pago ya generadas,
**para** mantener la integridad de los registros financieros históricos.

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-07.1 | Al modificar el porcentaje de un registro de prorrateo, las programaciones existentes **mantienen** su importe original. |
| CA-07.2 | Al cancelar un registro de prorrateo, las programaciones generadas a partir de ese registro **no se cancelan**. |
| CA-07.3 | Al agregar un nuevo registro de prorrateo, no se generan retroactivamente programaciones adicionales. |
| CA-07.4 | Al modificar el centro de trabajo de un registro de prorrateo, el centro de trabajo de las programaciones ya generadas **no cambia**. |

---

### HU-08 — Cambios al modelo de datos

**Como** equipo técnico,
**quiero** incorporar los campos necesarios en la tabla de programaciones de pago,
**para** soportar la trazabilidad requerida por las historias de usuario anteriores.

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-08.1 | La tabla `ga_tr_programaciones_pagos` incluye el campo `fk_contrato_prorrateo_gasto` (`uniqueidentifier`, FK nullable) que referencia a `ga_tr_contrato_prorrateo_gasto`. |
| CA-08.2 | La tabla `ga_tr_programaciones_pagos` incluye el campo `porcentaje_aplicado` (`decimal(5,2)`, nullable). |
| CA-08.3 | Ambos campos son opcionales y no afectan registros existentes (valor `NULL` por defecto). |
| CA-08.4 | Los campos nuevos no generan errores en programaciones existentes sin prorrateo asociado. |

---

### HU-09 — Marcado automático de programaciones extraordinarias

**Como** sistema,
**quiero** marcar automáticamente una programación de pago como extraordinaria cuando corresponda,
**para** facilitar la identificación y el filtrado de programaciones fuera del ciclo normal o generadas por prorrateo.

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-09.1 | Al guardar una programación de pago, el sistema revisa si cumple condiciones para marcarse como extraordinaria antes de confirmar el registro. |
| CA-09.2 | Si la programación proviene de un prorrateo de gasto, se marca como extraordinaria (condición A). |
| CA-09.3 | Si la programación no proviene de un prorrateo, la condición A no aplica y no se marca por ese motivo. |
| CA-09.4 | Si la programación es de renovación o adquisición y su día de aniversario no coincide con el día de aniversario del contrato, se marca como extraordinaria (condición B). |
| CA-09.5 | Si no se cumple ninguna condición (A o B), la programación se mantiene como no extraordinaria. |
| CA-09.6 | Esta marca no puede ser editada manualmente por el usuario.  |
| CA-09.7 | Las programaciones creadas automáticamente a partir de prorrateo se registran directamente como extraordinarias, en línea con la condición A. |
| CA-09.8 | Esta validación no altera programaciones ya existentes; solo aplica cuando se crea una nueva. |
| CA-09.9 | Los reportes y consultas pueden filtrar las programaciones extraordinarias para identificarlas fácilmente. |

---

### HU-10 — Control de prorrateo por variable de sistema en la consulta de servicios (Reporte Financiero)

**Como** sistema,
**quiero** decidir automáticamente cuándo aplicar la distribución por prorrateo en los pagos de servicios,
**para** que el Reporte Financiero muestre información correcta según el periodo consultado.

| ID       | Criterio de Aceptación                                       |
| -------- | ------------------------------------------------------------ |
| CA-10.1  | Al ejecutar el reporte, el sistema toma una fecha de corte desde la configuración general. Si no existe una fecha configurada, usa una fecha predeterminada. |
| CA-10.2  | Si la fecha inicial del reporte es igual o anterior a la fecha de corte, se activa la lógica de prorrateo; si es posterior, se usa el flujo estándar. |
| CA-10.3  | Cuando la lógica de prorrateo está activa, la consulta estándar excluye contratos con prorrateo activo que ya tienen pagos dentro del tramo previo a la fecha de corte, para evitar duplicidades. |
| CA-10.4  | Cuando la lógica de prorrateo está activa, se ejecuta una consulta específica para distribuir los importes por porcentaje y centro de trabajo en el tramo previo a la fecha de corte. |
| CA-10.5  | Cuando la lógica de prorrateo no está activa, solo se ejecuta la consulta estándar y no se aplica la consulta de distribución. |
| CA-10.6  | Si el rango consultado cruza la fecha de corte, el tramo anterior se procesa con prorrateo y el posterior con el flujo estándar, sin duplicar registros. |
| CA-10.7  | Si un contrato tiene prorrateo configurado pero no tiene pagos en el tramo previo a la fecha de corte, no debe excluirse de la consulta estándar, para que sí aparezca en el reporte. |
| CA-10.8  | La consulta de prorrateo usa la fecha de corte como límite final del tramo a distribuir, aunque el usuario seleccione una fecha final mayor. |
| CA-10.9  | La fecha de corte puede ajustarse desde configuración, sin requerir cambios técnicos. |
| CA-10.10 | Los resultados del flujo estándar y del flujo con prorrateo se integran en un único conjunto de datos antes de mostrarse en el reporte. |

