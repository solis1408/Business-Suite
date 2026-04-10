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

- Al crear una programación manual:
  - Si hay prorrateo activo:
    - Generar una programación por cada registro de prorrateo, con:
      - Importe = TotalContrato × (Porcentaje / 100)
      - CentroTrabajo = del registro de prorrateo
      - ProrrateoOrigen = referencia al registro de prorrateo
      - PorcentajeAplicado = porcentaje del registro
      - EsAutomatico = false
  - Si no existen:
    - Se ejecuta flujo estándar

---

### 1.4 No regeneración

- Cambios en prorrateo NO afectan programaciones existentes

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

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-05.1 | Al crear una programación manualmente para un contrato con prorrateo activo, el sistema genera **una programación por cada registro de prorrateo activo** sin requerir confirmación. |
| CA-05.2 | Cada programación generada tiene: `Importe = TotalContrato × (Porcentaje / 100)`, redondeado a 2 decimales. |
| CA-05.3 | Cada programación generada tiene asignado el `CentroTrabajo` del registro de prorrateo. |
| CA-05.4 | Todas las programaciones generadas comparten la misma `FechaAniversario` calculada. |
| CA-05.5 | Cada programación generada almacena `ProrrateoOrigen` y `PorcentajeAplicado`. |
| CA-05.6 | El campo `EsAutomatico` de cada programación generada es `false`. |
| CA-05.7 | No aplica restricción de duplicidad en generación manual.    |
| CA-05.8 | Si el contrato **no tiene** prorrateo activo, se ejecuta el flujo estándar actual sin cambios. |

---

### HU-06 — Trazabilidad del origen en programaciones con prorrateo

**Como** usuario administrativo o auditor,
**quiero** que cada programación de pago generada por prorrateo almacene el registro de origen y el porcentaje aplicado,
**para** poder identificar de dónde proviene cada programación y verificar el cálculo del importe.

| ID      | Criterio de Aceptación                                       |
| ------- | ------------------------------------------------------------ |
| CA-06.1 | Las programaciones generadas por prorrateo almacenan en `ProrrateoOrigen` la referencia al `ContratoProrrateoGasto` que las originó. |
| CA-06.2 | Las programaciones generadas por prorrateo almacenan en `PorcentajeAplicado` el porcentaje utilizado en el cálculo. |
| CA-06.3 | Los campos `ProrrateoOrigen` y `PorcentajeAplicado` son opcionales. Las programaciones sin prorrateo los tienen en `NULL`. |
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
| CA-07.2 | Al cancelar un registro de prorrateo, las programaciones generadas a partir de ese registro **no se cancelan** ni modifican. |
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

## 4. 🗂️ Control de Cambios del Documento

El presente documento deberá mantener un historial de modificaciones con el objetivo de asegurar trazabilidad, control de versiones y claridad en la evolución funcional.

| Versión | Fecha      | Autor              | Descripción del Cambio                         |
| ------- | ---------- | ------------------ | ---------------------------------------------- |
| 1.0     | 08-04-2026 | José Antonio Solis | Versión inicial del documento                  |
| 1.1     | DD-MM-YYYY | Nombre             | Ajustes en criterios de aceptación (HU-XX)     |
| 1.2     | DD-MM-YYYY | Nombre             | Inclusión de nueva funcionalidad               |
