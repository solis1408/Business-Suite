# Requerimientos Funcionales — Foliación Independiente por Proceso, Sistema de Caja Operativa

| Campo   | Valor        |
|---------|--------------|
| Versión | 1.0          |
| Fecha   | 2026-08-17   |
| Estado  | Borrador     |
| Módulo  | Caja Operativa — Foliación de documentos |
| Autor   | Análisis de Negocio — Dirección de Innovación y Negocios |

---

## 1. Propósito del documento

Este documento describe los ajustes funcionales requeridos en el Sistema de Caja Operativa para separar la generación de folios de los procesos **administrativos** respecto de los procesos **operativos**, implementando un consecutivo independiente por sucursal para cada tipo de documento administrativo. Contiene los siguientes requerimientos funcionales:

- **RF-01** — Consecutivo de folios para Solicitud de Crédito.
- **RF-02** — Consecutivo de folios para Crédito.
- **RF-03** — Consecutivo de folios para Autorización de Entrega de Efectivo.
- **RF-04** — Consecutivo de folios para Pago.
- **RF-05** — Consecutivo de folios para Autorización de Condonación de Crédito (proceso administrativo).
- **RF-06** — Continuidad del consecutivo de folios para Autorización de Condonación de Crédito (proceso operativo).

## 2. Alcance del documento

**Incluye:**
- Separación del consecutivo de folios de los procesos administrativos respecto de los operativos.
- Foliación independiente por sucursal para los cinco documentos administrativos: Solicitud de Crédito, Crédito, Autorización de Entrega de Efectivo, Pago y Autorización de Condonación de Crédito.

**No incluye:**
- Cualquier afectación a los folios o a la operación de los procesos operativos actuales.

## 3. Actores y roles

| Actor / Rol | Descripción |
|-------------|-------------|
| Usuario del proceso administrativo | Persona que genera los documentos administrativos (solicitud de crédito, crédito, entrega de efectivo, pago, condonación de crédito) en una sucursal y necesita que cada uno cuente con folio propio y trazable. |
| Usuario del proceso operativo | Persona que genera el documento de Autorización de Condonación de Crédito dentro del proceso operativo y necesita que su consecutivo actual no se reinicie ni se vea afectado por la nueva foliación administrativa. |
| Sistema de Caja Operativa | Sistema que administra la generación y el consecutivo de los folios por sucursal y tipo de proceso. |

## 4. Glosario

| Término / Sigla | Definición |
|-----------------|------------|
| Folio | Identificador consecutivo que el sistema asigna a un documento generado por un proceso. |
| Consecutivo | Número que se incrementa de manera secuencial e independiente por sucursal y por tipo de proceso administrativo. |
| Proceso Administrativo | Proceso de negocio dentro del alcance de este documento (Solicitud de Crédito, Crédito, Autorización de Entrega de Efectivo, Pago, Autorización de Condonación de Crédito). |
| Proceso Operativo | Proceso existente cuya foliación actual no debe verse afectada por este cambio (fuera de alcance). |
| Abreviatura de sucursal | Código corto que identifica a la sucursal y que forma parte de la composición del folio. |

## 5. Entidad a la que aplica

Aplica a los documentos generados por los procesos administrativos listados en el alcance. El estatus inicial de cada consecutivo es **1** por sucursal y por tipo de documento; no se define un estatus terminal, ya que el consecutivo es de incremento continuo mientras el proceso esté activo.

## 6. Usuarios y Responsables

| Usuarios | Responsable |
|----------|-------------|
| pablnfin01 | Myrka Gabriela López Tavares |

<a id="indice-requerimientos"></a>
## 7. Índice de requerimientos

> **Navegación rápida:** cada identificador RF de la primera columna es un enlace que lleva directamente al detalle del requerimiento, su historia de usuario y sus criterios de aceptación. Haz clic en el RF para ir a su ficha completa.

| RF | Título | Sistema | Aplica a |
|----|--------|---------|----------|
| [RF-01](#rf-01) | Consecutivo de folios — Solicitud de Crédito (administrativo) | Sistema de Caja Operativa | Todas las sucursales |
| [RF-02](#rf-02) | Consecutivo de folios — Crédito (administrativo)| Sistema de Caja Operativa | Todas las sucursales |
| [RF-03](#rf-03) | Consecutivo de folios — Autorización de Entrega de Efectivo (administrativo) | Sistema de Caja Operativa | Todas las sucursales |
| [RF-04](#rf-04) | Consecutivo de folios — Pago (administrativo)| Sistema de Caja Operativa | Todas las sucursales |
| [RF-05](#rf-05) | Consecutivo de folios — Autorización de Condonación de Crédito (administrativo) | Sistema de Caja Operativa | Todas las sucursales |
| [RF-06](#rf-06) | Continuidad de folios — Autorización de Condonación de Crédito (operativo) | Sistema de Caja Operativa | Todas las sucursales |

---
---

<a id="rf-01"></a>
# RF-01 — Consecutivo de folios para Solicitud de Crédito

[⬆ Volver al índice de requerimientos](#indice-requerimientos)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna     |

## Descripción

El sistema deberá administrar un consecutivo de folios independiente para el proceso de **Solicitud de Crédito**, correspondiente a la clasificación Administrativos, de manera independiente para cada una de las sucursales.

## HU-1.1 — Foliación independiente de Solicitud de Crédito

Como usuario del Sistema de Caja Operativa, quiero que el sistema administre un consecutivo de folios independiente para el proceso de Solicitud de Crédito, correspondiente a la clasificación Administrativos, para cada una de las sucursales, para facilitar la identificación, control y seguimiento de las solicitudes generadas en cada sucursal.

### Reglas de negocio

No aplica (no se identificaron reglas de negocio adicionales en el documento original más allá de las cubiertas por los criterios de aceptación).

### Criterios de Aceptación

**CA-1.1.1 — Configuración de consecutivo inicial por sucursal**
Dado que el administrador configura los folios del proceso Solicitud de Crédito
Cuando define el valor distintivo en la variable de sistema para los folios a nivel sucursal
Entonces el sistema deberá permitir esa configuración considerando como valor inicial el consecutivo **1** para cada sucursal definida.

**CA-1.1.2 — Identificación de sucursal en el folio**
Dado que el sistema genera un folio de Solicitud de Crédito
Cuando identifica la sucursal de origen
Entonces deberá usar la abreviatura configurada para esa sucursal, de acuerdo con la siguiente tabla:

| Sucursal | Abreviatura | Consecutivo inicial |
|----------|-------------|----------------------|
| Distribuidora Reyma | SCDA | 1 |
| León | SCA | 1 |
| Mérida | SCMEA | 1 |
| Monterrey | SCMA | 1 |
| Nogales | SCNA | 1 |
| Reyma del Este Central | SCSAA | 1 |
| San Francisco del Rincón | SCSA | 1 |

**CA-1.1.3 — Consecutivo independiente por sucursal**
Dado que existen varias sucursales operando en paralelo
Cuando se incrementa el consecutivo de folios de una sucursal
Entonces el sistema no deberá afectar el consecutivo de ninguna otra sucursal.

**CA-1.1.4 — Composición del folio**
Dado que el sistema genera un folio para Solicitud de Crédito
Cuando lo construye
Entonces deberá incorporar la abreviatura de la sucursal y el consecutivo correspondiente, de acuerdo con el formato definido para el proyecto.

---

<a id="rf-02"></a>
# RF-02 — Consecutivo de folios para Crédito

[⬆ Volver al índice de requerimientos](#indice-requerimientos)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna     |

## Descripción

El sistema deberá administrar un consecutivo de folios independiente para el proceso de **Crédito**, correspondiente a la clasificación Administrativos, de manera independiente para cada una de las sucursales.

## HU-2.1 — Foliación independiente de Crédito

Como usuario del proceso administrativo, quiero que el sistema administre un consecutivo de folios para el proceso de "Crédito", para identificar, controlar y dar seguimiento a los documentos generados en cada sucursal.

### Reglas de negocio

No aplica (no se identificaron reglas de negocio adicionales en el documento original más allá de las cubiertas por los criterios de aceptación).

### Criterios de Aceptación

**CA-2.1.1 — Configuración de consecutivo inicial por sucursal**
Dado que el administrador configura los folios del proceso Crédito
Cuando define el valor distintivo en la variable de sistema para los folios a nivel sucursal
Entonces el sistema deberá permitir esa configuración considerando como valor inicial el consecutivo **1** para cada sucursal definida.

**CA-2.1.2 — Identificación de sucursal en el folio**
Dado que el sistema genera un folio de Crédito
Cuando identifica la sucursal de origen
Entonces deberá usar la abreviatura configurada para esa sucursal, de acuerdo con la siguiente tabla:

| Sucursal | Abreviatura | Consecutivo inicial |
|----------|-------------|----------------------|
| Distribuidora Reyma | CRDA | 1 |
| León | CRA | 1 |
| Mérida | CRMEA | 1 |
| Monterrey | CRMA | 1 |
| Nogales | CRNA | 1 |
| Reyma del Este Central | CRSAA | 1 |
| San Francisco del Rincón | CRSA | 1 |

**CA-2.1.3 — Consecutivo independiente por sucursal**
Dado que existen varias sucursales operando en paralelo
Cuando se incrementa el consecutivo de folios de una sucursal
Entonces el sistema no deberá afectar el consecutivo de ninguna otra sucursal.

**CA-2.1.4 — Composición del folio**
Dado que el sistema genera un folio para Crédito
Cuando lo construye
Entonces deberá incorporar la abreviatura de la sucursal y el consecutivo correspondiente, de acuerdo con el formato definido para el proyecto.

---

<a id="rf-03"></a>
# RF-03 — Consecutivo de folios para Autorización de Entrega de Efectivo

[⬆ Volver al índice de requerimientos](#indice-requerimientos)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna     |

## Descripción

El sistema deberá generar y administrar un consecutivo de folios independiente para el proceso de **Autorización de Entrega de Efectivo**, correspondiente a la clasificación Administrativos, de manera independiente para cada una de las sucursales.

## HU-3.1 — Foliación independiente de Autorización de Entrega de Efectivo

Como usuario del proceso administrativo, quiero que el sistema genere y administre un consecutivo de folios para el proceso "Autorizar la Entrega de Efectivo", para identificar, controlar y dar trazabilidad a las operaciones realizadas en cada sucursal.

### Reglas de negocio

No aplica (no se identificaron reglas de negocio adicionales en el documento original más allá de las cubiertas por los criterios de aceptación).

### Criterios de Aceptación

**CA-3.1.1 — Configuración de consecutivo inicial por sucursal**
Dado que el administrador configura los folios del proceso Autorización de Entrega de Efectivo
Cuando define el valor distintivo en la variable de sistema para los folios a nivel sucursal
Entonces el sistema deberá permitir esa configuración considerando como valor inicial el consecutivo **1** para cada sucursal definida.

**CA-3.1.2 — Identificación de sucursal en el folio**
Dado que el sistema genera un folio de Autorización de Entrega de Efectivo
Cuando identifica la sucursal de origen
Entonces deberá usar la abreviatura configurada para esa sucursal, de acuerdo con la siguiente tabla:

| Sucursal | Abreviatura | Consecutivo inicial |
|----------|-------------|----------------------|
| Distribuidora Reyma | EFDA | 1 |
| León | EFA | 1 |
| Mérida | EFMEA | 1 |
| Monterrey | EFMA | 1 |
| Nogales | EFNA | 1 |
| Reyma del Este Central | EFSAA | 1 |
| San Francisco del Rincón | EFSA | 1 |

**CA-3.1.3 — Consecutivo independiente por sucursal**
Dado que existen varias sucursales operando en paralelo
Cuando se incrementa el consecutivo de folios de una sucursal
Entonces el sistema no deberá afectar el consecutivo de ninguna otra sucursal.

**CA-3.1.4 — Composición del folio**
Dado que el sistema genera un folio para Autorización de Entrega de Efectivo
Cuando lo construye
Entonces deberá incorporar la abreviatura de la sucursal y el consecutivo correspondiente, de acuerdo con el formato definido para el proyecto.

---

<a id="rf-04"></a>
# RF-04 — Consecutivo de folios para Pago

[⬆ Volver al índice de requerimientos](#indice-requerimientos)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna     |

## Descripción

El sistema deberá generar y administrar un consecutivo de folios independiente para el proceso de **Pago**, correspondiente a la clasificación Administrativos, de manera independiente para cada una de las sucursales.

## HU-4.1 — Foliación independiente de Pago

Como usuario del proceso administrativo, quiero que el sistema genere y administre un consecutivo de folios para el proceso de "Pago", para identificar, controlar y dar trazabilidad a las operaciones de pago realizadas en cada sucursal.

### Reglas de negocio

No aplica (no se identificaron reglas de negocio adicionales en el documento original más allá de las cubiertas por los criterios de aceptación).

### Criterios de Aceptación

**CA-4.1.1 — Configuración de consecutivo inicial por sucursal**
Dado que el administrador configura los folios del proceso Pago
Cuando define el valor distintivo en la variable de sistema para los folios a nivel sucursal
Entonces el sistema deberá permitir esa configuración considerando como valor inicial el consecutivo **1** para cada sucursal definida.

**CA-4.1.2 — Identificación de sucursal en el folio**
Dado que el sistema genera un folio de Pago
Cuando identifica la sucursal de origen
Entonces deberá usar la abreviatura configurada para esa sucursal, de acuerdo con la siguiente tabla:

| Sucursal | Abreviatura | Consecutivo inicial |
|----------|-------------|----------------------|
| Distribuidora Reyma | PDA | 1 |
| León | PA | 1 |
| Mérida | PMEA | 1 |
| Monterrey | PMA | 1 |
| Nogales | PNA | 1 |
| Reyma del Este Central | PSAA | 1 |
| San Francisco del Rincón | PSA | 1 |

**CA-4.1.3 — Consecutivo independiente por sucursal**
Dado que existen varias sucursales operando en paralelo
Cuando se incrementa el consecutivo de folios de una sucursal
Entonces el sistema no deberá afectar el consecutivo de ninguna otra sucursal.

**CA-4.1.4 — Composición del folio**
Dado que el sistema genera un folio para Pago
Cuando lo construye
Entonces deberá incorporar la abreviatura de la sucursal y el consecutivo correspondiente, de acuerdo con el formato definido para el proyecto.

---

<a id="rf-05"></a>
# RF-05 — Consecutivo de folios para Autorización de Condonación de Crédito (proceso administrativo)

[⬆ Volver al índice de requerimientos](#indice-requerimientos)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna     |

## Descripción

El sistema deberá generar y administrar un consecutivo de folios independiente para el proceso de **Autorización de Condonación de Crédito**, correspondiente a la clasificación Administrativos, de manera independiente para cada una de las sucursales.

## HU-5.1 — Foliación independiente de Autorización de Condonación de Crédito

Como usuario del proceso administrativo, quiero que el sistema genere y administre un consecutivo de folios para el proceso de "Autorización de Condonación de Crédito", para identificar, controlar y dar trazabilidad a las solicitudes y operaciones de condonación de crédito realizadas en cada sucursal.

### Reglas de negocio

No aplica (no se identificaron reglas de negocio adicionales en el documento original más allá de las cubiertas por los criterios de aceptación).

### Criterios de Aceptación

**CA-5.1.1 — Configuración de consecutivo inicial por sucursal**
Dado que el administrador configura los folios del proceso Autorización de Condonación de Crédito
Cuando define el valor distintivo en la variable de sistema para los folios a nivel sucursal
Entonces el sistema deberá permitir esa configuración considerando como valor inicial el consecutivo **1** para cada sucursal definida.

**CA-5.1.2 — Identificación de sucursal en el folio**
Dado que el sistema genera un folio de Autorización de Condonación de Crédito
Cuando identifica la sucursal de origen
Entonces deberá usar la abreviatura configurada para esa sucursal, de acuerdo con la siguiente tabla:

| Sucursal | Abreviatura | Consecutivo inicial |
|----------|-------------|----------------------|
| Distribuidora Reyma | ACDA | 1 |
| León | ACA | 1 |
| Mérida | ACMEA | 1 |
| Monterrey | ACMA | 1 |
| Nogales | ACNA | 1 |
| Reyma del Este Central | ACSAA | 1 |
| San Francisco del Rincón | ACSA | 1 |

**CA-5.1.3 — Consecutivo independiente por sucursal**
Dado que existen varias sucursales operando en paralelo
Cuando se incrementa el consecutivo de folios de una sucursal
Entonces el sistema no deberá afectar el consecutivo de ninguna otra sucursal.

**CA-5.1.4 — Composición del folio**
Dado que el sistema genera un folio para Autorización de Condonación de Crédito
Cuando lo construye
Entonces deberá incorporar la abreviatura de la sucursal y el consecutivo correspondiente, de acuerdo con el formato definido para el proyecto.

---

<a id="rf-06"></a>
# RF-06 — Continuidad del consecutivo de folios para Autorización de Condonación de Crédito (proceso operativo)

[⬆ Volver al índice de requerimientos](#indice-requerimientos)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-05 (comparten el mismo tipo de documento, pero clasificaciones distintas: administrativo vs. operativo) |

## Descripción

El sistema deberá generar y administrar un consecutivo de folios independiente por sucursal para el proceso de **Autorización de Condonación de Crédito** cuando este se origina dentro del proceso **operativo**. A diferencia de RF-05 (clasificación Administrativos), en este caso el consecutivo **no se reinicia**: debe continuar a partir del último consecutivo ya utilizado por cada sucursal, preservando la operación actual y sin afectar la foliación administrativa nueva.

## HU-6.1 — Continuidad de folios de Autorización de Condonación de Crédito (operativo)

Como usuario del proceso operativo, quiero que el sistema genere y administre un consecutivo de folios para el proceso de "Autorización de Condonación de Crédito", para identificar, controlar y dar trazabilidad a las solicitudes y operaciones de condonación de crédito realizadas en cada sucursal.

### Reglas de negocio

**RN-6.1** El consecutivo de folios del proceso operativo de Autorización de Condonación de Crédito no se reinicia con esta iniciativa: continúa a partir del último valor utilizado por cada sucursal.

### Criterios de Aceptación

**CA-6.1.1 — Configuración de consecutivo inicial por sucursal (continuidad)**
Dado que el administrador configura los folios del proceso operativo Autorización de Condonación de Crédito
Cuando define el valor distintivo en la variable de sistema para los folios a nivel sucursal
Entonces el sistema deberá permitir esa configuración considerando como valor inicial **el último consecutivo ya utilizado** por cada sucursal, en lugar de reiniciarlo en 1.

**CA-6.1.2 — Identificación de sucursal en el folio**
Dado que el sistema genera un folio operativo de Autorización de Condonación de Crédito
Cuando identifica la sucursal de origen
Entonces deberá usar la abreviatura configurada para esa sucursal, de acuerdo con la siguiente tabla:

| Sucursal | Abreviatura | Consecutivo inicial |
|----------|-------------|----------------------|
| Distribuidora Reyma | ACD | Ultimo |
| León | AC | Ultimo |
| Mérida | ACME | Ultimo |
| Monterrey | ACM | Ultimo |
| Nogales | ACN | Ultimo |
| Reyma del Este Central | ACSA | Ultimo |
| San Francisco del Rincón | ACS | Ultimo |

**CA-6.1.3 — Consecutivo independiente por sucursal**
Dado que existen varias sucursales operando en paralelo
Cuando se incrementa el consecutivo de folios de una sucursal
Entonces el sistema no deberá afectar el consecutivo de ninguna otra sucursal.

**CA-6.1.4 — Composición del folio**
Dado que el sistema genera un folio operativo para Autorización de Condonación de Crédito
Cuando lo construye
Entonces deberá incorporar la abreviatura de la sucursal y el consecutivo correspondiente, de acuerdo con el formato definido para el proyecto.

---

## 8. Requerimientos no funcionales

No aplica — el documento original no especificó requerimientos no funcionales (la tabla correspondiente se dejó en "NA").

## 9. Matriz de trazabilidad

| Objetivo de negocio | RF | Historia | Criterio de aceptación | Prioridad | Estado |
|---|---|---|---|---|---|
| Separar la foliación administrativa de la operativa, con consecutivo independiente por sucursal | [RF-01](#rf-01) | HU-1.1 | CA-1.1.1 a CA-1.1.4 | Must | Definición |
| Separar la foliación administrativa de la operativa, con consecutivo independiente por sucursal | [RF-02](#rf-02) | HU-2.1 | CA-2.1.1 a CA-2.1.4 | Must | Definición |
| Separar la foliación administrativa de la operativa, con consecutivo independiente por sucursal | [RF-03](#rf-03) | HU-3.1 | CA-3.1.1 a CA-3.1.4 | Must | Definición |
| Separar la foliación administrativa de la operativa, con consecutivo independiente por sucursal | [RF-04](#rf-04) | HU-4.1 | CA-4.1.1 a CA-4.1.4 | Must | Definición |
| Separar la foliación administrativa de la operativa, con consecutivo independiente por sucursal | [RF-05](#rf-05) | HU-5.1 | CA-5.1.1 a CA-5.1.4 | Must | Definición |
| Preservar sin afectación el consecutivo del proceso operativo de Autorización de Condonación de Crédito | [RF-06](#rf-06) | HU-6.1 | CA-6.1.1 a CA-6.1.4 | Must | Definición |

## 10. Supuestos, dependencias y riesgos

**Supuestos (SUP)**

| ID | Supuesto | Impacto si es falso |
|----|----------|---------------------|
| SUP-01 | El listado de sucursales y sus abreviaturas (Distribuidora Reyma, León, Mérida, Monterrey, Nogales, Reyma del Este Central, San Francisco del Rincón) es completo y no cambiará antes de la implementación. | Habría que ajustar la configuración inicial de folios por sucursal. |

**Dependencias (DEP)**

No aplica — no se identificaron dependencias externas en el documento original.

**Riesgos (RGO)**

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| RGO-01 | Confusión operativa durante la transición si conviven folios antiguos (consecutivo único) y nuevos (consecutivo por sucursal/proceso) para los mismos documentos. | Media | Medio | Definir una fecha de corte clara y comunicarla a las sucursales antes del despliegue. |

## 11. Preguntas abiertas

| # | Pregunta | Responsable sugerido |
|---|----------|------------------------|
| 1 | El documento no define el formato exacto de composición del folio (orden de la abreviatura y el consecutivo, separadores, longitud del número). ¿Cuál es el formato final esperado? | Product Owner |
| 2 | No se definieron requerimientos no funcionales (rendimiento, concurrencia entre sucursales, auditoría). ¿Existen restricciones que deban documentarse? | Responsable de Implementación |
