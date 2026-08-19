# Requerimientos Funcionales — Restricción de Visualización de Ventas de Consignación (Interplantas)

| Campo   | Valor        |
|---------|--------------|
| Versión | 1.0          |
| Fecha   | 2026-08-06   |
| Estado  | Definición   |
| Módulo  | Ventas, Facturación, Cuentas por Cobrar (CXC), Inventario — Sistema Remv |
| Autor   | Análisis de Negocio |

> Documento actualizado a partir de "RY-01INN01-FT01 — Documento de Alcance Funcional (Interplantas)", Solicitud de Servicio 3765, Grupo Reyes — Dirección de Innovación y Negocios. Responsable del requerimiento y Product Owner: María De Lourdes Viurquiz Gamiño.

---

## 1. Propósito del documento

Este documento describe los requerimientos funcionales necesarios para implementar un mecanismo de control de acceso, mediante el permiso especial **FN-INTERPLANTAS**, que restrinja la visualización de la información relacionada con ventas de consignación (documentos marcados como **CONSIGNACIÓN**) en las pantallas y consultas de los módulos de Ventas, Facturación y Cuentas por Cobrar (CXC) del sistema Remv. El documento está dirigido al equipo de desarrollo, control de calidad y a las áreas de negocio involucradas (Otras Unidades de Negocio) para su validación y seguimiento. Contiene los siguientes requerimientos funcionales:

- [RF-01](#rf-01) — Restricción de visualización de consignación en Ventas > Facturas.
- [RF-02](#rf-02) — Restricción de visualización de consignación en Ventas > Notas de Crédito.
- [RF-03](#rf-03) — Restricción de visualización de consignación en Ventas > Facturas Emitidas.
- [RF-04](#rf-04) — Restricción de visualización de consignación en Ventas > Facturas por Producto.
- [RF-05](#rf-05) — Restricción de visualización de consignación en Ventas > Notas de Crédito por Producto.
- [RF-06](#rf-06) — Restricción de visualización de consignación en Ventas > Resumen de Facturas.
- [RF-07](#rf-07) — Restricción de filtrado de consignación en Ventas > Resumen de Notas de Crédito.
- [RF-08](#rf-08) — Restricción de visualización de consignación en Ventas > Facturas Canceladas.
- [RF-09](#rf-09) — Restricción de visualización de consignación en Ventas > Ventas por Factura Pagada.
- [RF-10](#rf-10) — Restricción de visualización de consignación en Ventas > Detallado de Ventas por Factura Pagada.
- [RF-11](#rf-11) — Restricción de visualización de consignación en Cuentas por Cobrar > Abonos.
- [RF-12](#rf-12) — Restricción de visualización de consignación en Cuentas por Cobrar > Transacciones.
- [RF-13](#rf-13) — Restricción de filtrado de consignación en CXC > Antigüedad de Saldos.
- [RF-14](#rf-14) — Restricción de filtrado de consignación en CXC > Cobranza General.
- [RF-15](#rf-15) — Restricción de visualización de consignación en Ventas > Cobranza General Consulta.
- [RF-16](#rf-16) — Restricción de filtrado de consignación en CXC > Comportamiento de Pagos.
- [RF-17](#rf-17) — Restricción de visualización de consignación en Ventas > Concentrado de Cobranza.
- [RF-18](#rf-18) — Restricción de filtrado de consignación en CXC > Diario de Abonos.
- [RF-19](#rf-19) — Restricción de visualización de consignación en Ventas > Documentos de Cobranza.
- [RF-20](#rf-20) — Restricción de visualización de consignación en Ventas > Detalle de Abonos por Facturas.
- [RF-21](#rf-21) — Restricción de visualización de consignación en Ventas > Detalle Abonos Facturas (Pagado).
- [RF-22](#rf-22) — Restricción de visualización de consignación en Ventas > Facturas Relación de Factura.
- [RF-23](#rf-23) — Restricción de filtrado de consignación en CXC > Estado de Cuenta.
- [RF-24](#rf-24) — Restricción de filtrado de consignación en CXC > Estado de Cuenta Detallado.
- [RF-25](#rf-25) — Restricción de filtrado de consignación en CXC > Resumen de Movimientos.
- [RF-26](#rf-26) — Restricción de visualización de consignación en Ventas > Detalles de Ventas.
- [RF-27](#rf-27) — Restricción de visualización de consignación en Ventas > Devolución del Cliente.
- [RF-28](#rf-28) — Restricción de visualización de consignación en Cuentas por Cobrar > Anticipos.

## 2. Alcance del documento

**Incluye:**
- Restringir la visualización de información de consignación (documentos/registros marcados como CONSIGNACIÓN) en 28 pantallas y consultas de los módulos de Ventas, Facturación y Cuentas por Cobrar (CXC), condicionada al permiso especial FN-INTERPLANTAS.
- Ocultar o, según la naturaleza de la consulta, impedir el filtrado por Consigna a los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS.
- Los usuarios autorizados son aquellos que cuenten con el permiso especial FN-INTERPLANTAS junto con alguno de los roles remcxc01, remvta01, remvta02 o remvta06.

**No incluye:**
- Modificación de la lógica de negocio existente para ventas de consignación.
- Creación o eliminación de perfiles de usuario (gestionado por Administración de Sistemas).
- Auditoría de accesos (cubierta por un requerimiento separado).
- Restricciones sobre la pantalla "Inventario > Detallado de Movimientos de Almacén" mencionada en el alcance original; no se documentó como RF explícito en la fuente y queda registrada como pregunta abierta (ver sección de Preguntas abiertas).

## 3. Actores y roles

| Actor / Rol | Descripción |
|-------------|-------------|
| Usuario autorizado | Usuario que cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06; puede visualizar y, donde aplique, filtrar la información de consignación. |
| Usuario no autorizado | Usuario que no cuenta con el permiso especial FN-INTERPLANTAS; no debe visualizar ni filtrar información de consignación en las pantallas y consultas dentro del alcance. |
| Administrador de Sistemas | Área responsable de crear/eliminar perfiles de usuario y de asignar el permiso especial FN-INTERPLANTAS y los roles remcxc01, remvta01, remvta02, remvta06 (fuera del alcance de este documento). |
| Product Owner / Responsable del Requerimiento | María De Lourdes Viurquiz Gamiño; valida y prioriza el alcance funcional. |

## 4. Glosario

| Término / Sigla | Definición |
|-----------------|------------|
| FN-INTERPLANTAS | Permiso especial del sistema Remv que habilita la visualización (y, en algunas consultas, el filtrado) de la información marcada como CONSIGNACIÓN. |
| CONSIGNACIÓN | Marca/tipo de documento que identifica una venta, factura, nota de crédito, abono, anticipo o transacción derivada de una operación de venta interplantas (consignación). |
| Interplantas | Operaciones de venta entre plantas del grupo que se gestionan como consignación dentro del ERP. |
| CXC | Cuentas por Cobrar. |
| remcxc01, remvta01, remvta02, remvta06 | Roles/perfiles de seguridad del sistema Remv autorizados, junto con el permiso FN-INTERPLANTAS, para visualizar información de consignación. |
| Remv | Sistema ERP (Grupo Reyes) sobre el que se implementa el control de acceso descrito en este documento. |

## 5. Entidad a la que aplica

Este documento aplica sobre los documentos y registros de venta (facturas, notas de crédito, abonos, anticipos, transacciones y sus consultas derivadas) marcados con el tipo **CONSIGNACIÓN** en el sistema Remv. Estatus inicial: la información de consignación es visible para todos los usuarios sin distinción de perfil. Estatus terminal: la información de consignación solo es visible (o filtrable, según la consulta) para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06.

## 6. Índice de requerimientos

> **Navegación rápida:** cada identificador RF en la primera columna es un enlace que lleva directamente al detalle del requerimiento, su historia de usuario, sus reglas de negocio y sus criterios de aceptación.

| RF | Título | Sistema | Aplica a |
|----|--------|---------|----------|
| [RF-01](#rf-01) | Restricción de visualización de consignación en Ventas > Facturas | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-02](#rf-02) | Restricción de visualización de consignación en Ventas > Notas de Crédito | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-03](#rf-03) | Restricción de visualización de consignación en Ventas > Facturas Emitidas | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-04](#rf-04) | Restricción de visualización de consignación en Ventas > Facturas por Producto | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-05](#rf-05) | Restricción de visualización de consignación en Ventas > Notas de Crédito por Producto | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-06](#rf-06) | Restricción de visualización de consignación en Ventas > Resumen de Facturas | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-07](#rf-07) | Restricción de filtrado de consignación en Ventas > Resumen de Notas de Crédito | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-08](#rf-08) | Restricción de visualización de consignación en Ventas > Facturas Canceladas | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-09](#rf-09) | Restricción de visualización de consignación en Ventas > Ventas por Factura Pagada | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-10](#rf-10) | Restricción de visualización de consignación en Ventas > Detallado de Ventas por Factura Pagada | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-11](#rf-11) | Restricción de visualización de consignación en Cuentas por Cobrar > Abonos | Cuentas por Cobrar | Información de consignación (FN-INTERPLANTAS) |
| [RF-12](#rf-12) | Restricción de visualización de consignación en Cuentas por Cobrar > Transacciones | Cuentas por Cobrar | Información de consignación (FN-INTERPLANTAS) |
| [RF-13](#rf-13) | Restricción de filtrado de consignación en CXC > Antigüedad de Saldos | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-14](#rf-14) | Restricción de filtrado de consignación en CXC > Cobranza General | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-15](#rf-15) | Restricción de visualización de consignación en Ventas > Cobranza General Consulta | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-16](#rf-16) | Restricción de filtrado de consignación en CXC > Comportamiento de Pagos | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-17](#rf-17) | Restricción de visualización de consignación en Ventas > Concentrado de Cobranza | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-18](#rf-18) | Restricción de filtrado de consignación en CXC > Diario de Abonos | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-19](#rf-19) | Restricción de visualización de consignación en Ventas > Documentos de Cobranza | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-20](#rf-20) | Restricción de visualización de consignación en Ventas > Detalle de Abonos por Facturas | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-21](#rf-21) | Restricción de visualización de consignación en Ventas > Detalle Abonos Facturas (Pagado) | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-22](#rf-22) | Restricción de visualización de consignación en Ventas > Facturas Relación de Factura | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-23](#rf-23) | Restricción de filtrado de consignación en CXC > Estado de Cuenta | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-24](#rf-24) | Restricción de filtrado de consignación en CXC > Estado de Cuenta Detallado | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-25](#rf-25) | Restricción de filtrado de consignación en CXC > Resumen de Movimientos | CXC | Información de consignación (FN-INTERPLANTAS) |
| [RF-26](#rf-26) | Restricción de visualización de consignación en Ventas > Detalles de Ventas | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-27](#rf-27) | Restricción de visualización de consignación en Ventas > Devolución del Cliente | Ventas | Información de consignación (FN-INTERPLANTAS) |
| [RF-28](#rf-28) | Restricción de visualización de consignación en Cuentas por Cobrar > Anticipos | Cuentas por Cobrar | Información de consignación (FN-INTERPLANTAS) |

---
---

<a id="rf-01"></a>
# RF-01 — Restricción de visualización de consignación en Ventas > Facturas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la pantalla "Ventas > Facturas" para que las facturas marcadas con documento CONSIGNACIÓN sean visibles únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-1.1 — Visualización restringida en Ventas > Facturas

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Facturas" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información sensible y evitar accesos no autorizados.

### Reglas de negocio

**RN-1.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Facturas".

**RN-1.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Facturas"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-1.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Facturas"
Entonces el sistema muestra en "Ventas > Facturas" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-1.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Facturas"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Facturas" y no la incluye en el resultado.

---

<a id="rf-02"></a>
# RF-02 — Restricción de visualización de consignación en Ventas > Notas de Crédito

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la pantalla "Ventas > Notas de Crédito" para que los registros relacionados a facturas marcadas con documento CONSIGNACIÓN sean visibles únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-2.1 — Visualización restringida en Ventas > Notas de Crédito

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Notas de Crédito" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para garantizar que únicamente el personal autorizado acceda a esta información.

### Reglas de negocio

**RN-2.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Notas de Crédito".

**RN-2.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Notas de Crédito"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-2.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Notas de Crédito"
Entonces el sistema muestra en "Ventas > Notas de Crédito" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-2.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Notas de Crédito"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Notas de Crédito" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-03"></a>
# RF-03 — Restricción de visualización de consignación en Ventas > Facturas Emitidas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas Emitidas" para que la información correspondiente a ventas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-3.1 — Visualización restringida en Ventas > Facturas Emitidas

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Facturas Emitidas" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para resguardar la información financiera sensible.

### Reglas de negocio

**RN-3.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Facturas Emitidas".

**RN-3.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Facturas Emitidas"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-3.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Facturas Emitidas"
Entonces el sistema muestra en "Ventas > Facturas Emitidas" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-3.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Facturas Emitidas"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Facturas Emitidas" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-04"></a>
# RF-04 — Restricción de visualización de consignación en Ventas > Facturas por Producto

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas por Producto" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-4.1 — Visualización restringida en Ventas > Facturas por Producto

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Facturas por Producto" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para evitar el acceso no autorizado.

### Reglas de negocio

**RN-4.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Facturas por Producto".

**RN-4.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Facturas por Producto"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-4.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Facturas por Producto"
Entonces el sistema muestra en "Ventas > Facturas por Producto" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-4.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Facturas por Producto"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Facturas por Producto" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-05"></a>
# RF-05 — Restricción de visualización de consignación en Ventas > Notas de Crédito por Producto

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Notas de Crédito por Producto" para que la información de nota de crédito ligada a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-5.1 — Visualización restringida en Ventas > Notas de Crédito por Producto

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Notas de Crédito por Producto" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la confidencialidad de la información.

### Reglas de negocio

**RN-5.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Notas de Crédito por Producto".

**RN-5.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Notas de Crédito por Producto"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-5.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Notas de Crédito por Producto"
Entonces el sistema muestra en "Ventas > Notas de Crédito por Producto" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-5.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Notas de Crédito por Producto"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Notas de Crédito por Producto" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-06"></a>
# RF-06 — Restricción de visualización de consignación en Ventas > Resumen de Facturas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Resumen de Facturas" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-6.1 — Visualización restringida en Ventas > Resumen de Facturas

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Resumen de Facturas" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información financiera.

### Reglas de negocio

**RN-6.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Resumen de Facturas".

**RN-6.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Resumen de Facturas"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-6.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Resumen de Facturas"
Entonces el sistema muestra en "Ventas > Resumen de Facturas" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-6.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Resumen de Facturas"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Resumen de Facturas" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-07"></a>
# RF-07 — Restricción de filtrado de consignación en Ventas > Resumen de Notas de Crédito

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Resumen de Notas de Crédito" para que la información de notas de crédito relacionada a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-7.1 — Visualización restringida en Ventas > Resumen de Notas de Crédito

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Resumen de Notas de Crédito" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para restringir el acceso a usuarios autorizados.

### Reglas de negocio

**RN-7.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Resumen de Notas de Crédito".

**RN-7.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "Ventas > Resumen de Notas de Crédito".

### Criterios de Aceptación

**CA-7.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Resumen de Notas de Crédito"
Entonces el sistema permite utilizar el filtro por Consigna en "Ventas > Resumen de Notas de Crédito" y devuelve la información marcada como CONSIGNACIÓN.

**CA-7.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Resumen de Notas de Crédito"
Entonces el sistema no permite utilizar el filtro por Consigna en "Ventas > Resumen de Notas de Crédito".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-08"></a>
# RF-08 — Restricción de visualización de consignación en Ventas > Facturas Canceladas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas Canceladas" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-8.1 — Visualización restringida en Ventas > Facturas Canceladas

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Facturas Canceladas" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para evitar la exposición de información sensible.

### Reglas de negocio

**RN-8.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Facturas Canceladas".

**RN-8.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Facturas Canceladas"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-8.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Facturas Canceladas"
Entonces el sistema muestra en "Ventas > Facturas Canceladas" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-8.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Facturas Canceladas"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Facturas Canceladas" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-09"></a>
# RF-09 — Restricción de visualización de consignación en Ventas > Ventas por Factura Pagada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Ventas por Factura Pagada" para que la información correspondiente a ventas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-9.1 — Visualización restringida en Ventas > Ventas por Factura Pagada

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Ventas por Factura Pagada" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información restringida.

### Reglas de negocio

**RN-9.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Ventas por Factura Pagada".

**RN-9.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Ventas por Factura Pagada"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-9.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Ventas por Factura Pagada"
Entonces el sistema muestra en "Ventas > Ventas por Factura Pagada" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-9.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Ventas por Factura Pagada"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Ventas por Factura Pagada" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-10"></a>
# RF-10 — Restricción de visualización de consignación en Ventas > Detallado de Ventas por Factura Pagada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detallado de Ventas por Factura Pagada" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-10.1 — Visualización restringida en Ventas > Detallado de Ventas por Factura Pagada

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Detallado de Ventas por Factura Pagada" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para garantizar el acceso exclusivo a usuarios autorizados.

### Reglas de negocio

**RN-10.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Detallado de Ventas por Factura Pagada".

**RN-10.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Detallado de Ventas por Factura Pagada"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-10.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Detallado de Ventas por Factura Pagada"
Entonces el sistema muestra en "Ventas > Detallado de Ventas por Factura Pagada" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-10.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Detallado de Ventas por Factura Pagada"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Detallado de Ventas por Factura Pagada" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-11"></a>
# RF-11 — Restricción de visualización de consignación en Cuentas por Cobrar > Abonos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la pantalla "Cuentas por Cobrar > Abonos" para que los abonos aplicados a facturas marcadas con documento CONSIGNACIÓN sean visibles únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-11.1 — Visualización restringida en Cuentas por Cobrar > Abonos

Como usuario autorizado para consultar información de consignación, quiero que "Cuentas por Cobrar > Abonos" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información de consignación.

### Reglas de negocio

**RN-11.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Cuentas por Cobrar > Abonos".

**RN-11.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Cuentas por Cobrar > Abonos"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-11.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Cuentas por Cobrar > Abonos"
Entonces el sistema muestra en "Cuentas por Cobrar > Abonos" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-11.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Cuentas por Cobrar > Abonos"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Cuentas por Cobrar > Abonos" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-12"></a>
# RF-12 — Restricción de visualización de consignación en Cuentas por Cobrar > Transacciones

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la pantalla "Cuentas por Cobrar > Transacciones" para que las transacciones relacionadas a abonos y facturas marcadas con documento CONSIGNACIÓN sean visibles únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-12.1 — Visualización restringida en Cuentas por Cobrar > Transacciones

Como usuario autorizado para consultar información de consignación, quiero que "Cuentas por Cobrar > Transacciones" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para restringir el acceso a la información sensible.

### Reglas de negocio

**RN-12.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Cuentas por Cobrar > Transacciones".

**RN-12.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Cuentas por Cobrar > Transacciones"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-12.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Cuentas por Cobrar > Transacciones"
Entonces el sistema muestra en "Cuentas por Cobrar > Transacciones" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-12.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Cuentas por Cobrar > Transacciones"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Cuentas por Cobrar > Transacciones" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-13"></a>
# RF-13 — Restricción de filtrado de consignación en CXC > Antigüedad de Saldos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Antigüedad de Saldos" para que la información correspondiente a movimientos y transacciones marcadas por consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-13.1 — Visualización restringida en CXC > Antigüedad de Saldos

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Antigüedad de Saldos" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información financiera.

### Reglas de negocio

**RN-13.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Antigüedad de Saldos".

**RN-13.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Antigüedad de Saldos".

### Criterios de Aceptación

**CA-13.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Antigüedad de Saldos"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Antigüedad de Saldos" y devuelve la información marcada como CONSIGNACIÓN.

**CA-13.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Antigüedad de Saldos"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Antigüedad de Saldos".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-14"></a>
# RF-14 — Restricción de filtrado de consignación en CXC > Cobranza General

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Cobranza General" para que la información correspondiente a consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-14.1 — Visualización restringida en CXC > Cobranza General

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Cobranza General" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para evitar consultas no autorizadas.

### Reglas de negocio

**RN-14.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Cobranza General".

**RN-14.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Cobranza General".

### Criterios de Aceptación

**CA-14.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Cobranza General"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Cobranza General" y devuelve la información marcada como CONSIGNACIÓN.

**CA-14.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Cobranza General"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Cobranza General".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-15"></a>
# RF-15 — Restricción de visualización de consignación en Ventas > Cobranza General Consulta

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Cobranza General Consulta" para que la información correspondiente a facturas marcadas por consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-15.1 — Visualización restringida en Ventas > Cobranza General Consulta

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Cobranza General Consulta" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para preservar la confidencialidad de la información.

### Reglas de negocio

**RN-15.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Cobranza General Consulta".

**RN-15.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Cobranza General Consulta"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-15.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Cobranza General Consulta"
Entonces el sistema muestra en "Ventas > Cobranza General Consulta" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-15.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Cobranza General Consulta"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Cobranza General Consulta" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-16"></a>
# RF-16 — Restricción de filtrado de consignación en CXC > Comportamiento de Pagos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Comportamiento de Pagos" para que la información correspondiente a movimientos y transacciones por consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-16.1 — Visualización restringida en CXC > Comportamiento de Pagos

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Comportamiento de Pagos" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información restringida.

### Reglas de negocio

**RN-16.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Comportamiento de Pagos".

**RN-16.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Comportamiento de Pagos".

### Criterios de Aceptación

**CA-16.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Comportamiento de Pagos"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Comportamiento de Pagos" y devuelve la información marcada como CONSIGNACIÓN.

**CA-16.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Comportamiento de Pagos"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Comportamiento de Pagos".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-17"></a>
# RF-17 — Restricción de visualización de consignación en Ventas > Concentrado de Cobranza

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Concentrado de Cobranza" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-17.1 — Visualización restringida en Ventas > Concentrado de Cobranza

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Concentrado de Cobranza" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para garantizar que solo usuarios autorizados puedan consultarla.

### Reglas de negocio

**RN-17.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Concentrado de Cobranza".

**RN-17.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Concentrado de Cobranza"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-17.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Concentrado de Cobranza"
Entonces el sistema muestra en "Ventas > Concentrado de Cobranza" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-17.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Concentrado de Cobranza"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Concentrado de Cobranza" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-18"></a>
# RF-18 — Restricción de filtrado de consignación en CXC > Diario de Abonos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Diario de Abonos" para que la información correspondiente a movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-18.1 — Visualización restringida en CXC > Diario de Abonos

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Diario de Abonos" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información financiera.

### Reglas de negocio

**RN-18.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Diario de Abonos".

**RN-18.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Diario de Abonos".

### Criterios de Aceptación

**CA-18.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Diario de Abonos"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Diario de Abonos" y devuelve la información marcada como CONSIGNACIÓN.

**CA-18.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Diario de Abonos"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Diario de Abonos".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-19"></a>
# RF-19 — Restricción de visualización de consignación en Ventas > Documentos de Cobranza

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Documentos de Cobranza" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-19.1 — Visualización restringida en Ventas > Documentos de Cobranza

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Documentos de Cobranza" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para evitar la exposición de información restringida.

### Reglas de negocio

**RN-19.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Documentos de Cobranza".

**RN-19.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Documentos de Cobranza"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-19.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Documentos de Cobranza"
Entonces el sistema muestra en "Ventas > Documentos de Cobranza" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-19.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Documentos de Cobranza"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Documentos de Cobranza" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-20"></a>
# RF-20 — Restricción de visualización de consignación en Ventas > Detalle de Abonos por Facturas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detalle de Abonos por Facturas" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-20.1 — Visualización restringida en Ventas > Detalle de Abonos por Facturas

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Detalle de Abonos por Facturas" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para garantizar la seguridad de la información.

### Reglas de negocio

**RN-20.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Detalle de Abonos por Facturas".

**RN-20.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Detalle de Abonos por Facturas"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-20.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Detalle de Abonos por Facturas"
Entonces el sistema muestra en "Ventas > Detalle de Abonos por Facturas" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-20.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Detalle de Abonos por Facturas"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Detalle de Abonos por Facturas" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-21"></a>
# RF-21 — Restricción de visualización de consignación en Ventas > Detalle Abonos Facturas (Pagado)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detalle Abonos Facturas (Pagado)" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-21.1 — Visualización restringida en Ventas > Detalle Abonos Facturas (Pagado)

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Detalle Abonos Facturas (Pagado)" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para restringir su consulta a usuarios autorizados.

### Reglas de negocio

**RN-21.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Detalle Abonos Facturas (Pagado)".

**RN-21.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Detalle Abonos Facturas (Pagado)"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-21.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Detalle Abonos Facturas (Pagado)"
Entonces el sistema muestra en "Ventas > Detalle Abonos Facturas (Pagado)" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-21.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Detalle Abonos Facturas (Pagado)"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Detalle Abonos Facturas (Pagado)" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-22"></a>
# RF-22 — Restricción de visualización de consignación en Ventas > Facturas Relación de Factura

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas Relación de Factura" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-22.1 — Visualización restringida en Ventas > Facturas Relación de Factura

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Facturas Relación de Factura" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la confidencialidad de la información.

### Reglas de negocio

**RN-22.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Facturas Relación de Factura".

**RN-22.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Facturas Relación de Factura"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-22.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Facturas Relación de Factura"
Entonces el sistema muestra en "Ventas > Facturas Relación de Factura" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-22.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Facturas Relación de Factura"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Facturas Relación de Factura" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-23"></a>
# RF-23 — Restricción de filtrado de consignación en CXC > Estado de Cuenta

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Estado de Cuenta" para que la información de movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-23.1 — Visualización restringida en CXC > Estado de Cuenta

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Estado de Cuenta" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para garantizar que solo usuarios autorizados puedan acceder a ella.

### Reglas de negocio

**RN-23.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Estado de Cuenta".

**RN-23.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Estado de Cuenta".

### Criterios de Aceptación

**CA-23.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Estado de Cuenta"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Estado de Cuenta" y devuelve la información marcada como CONSIGNACIÓN.

**CA-23.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Estado de Cuenta"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Estado de Cuenta".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-24"></a>
# RF-24 — Restricción de filtrado de consignación en CXC > Estado de Cuenta Detallado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Estado de Cuenta Detallado" para que la información de movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-24.1 — Visualización restringida en CXC > Estado de Cuenta Detallado

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Estado de Cuenta Detallado" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información financiera sensible.

### Reglas de negocio

**RN-24.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Estado de Cuenta Detallado".

**RN-24.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Estado de Cuenta Detallado".

### Criterios de Aceptación

**CA-24.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Estado de Cuenta Detallado"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Estado de Cuenta Detallado" y devuelve la información marcada como CONSIGNACIÓN.

**CA-24.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Estado de Cuenta Detallado"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Estado de Cuenta Detallado".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-25"></a>
# RF-25 — Restricción de filtrado de consignación en CXC > Resumen de Movimientos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Resumen de Movimientos" para que la información de movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-25.1 — Visualización restringida en CXC > Resumen de Movimientos

Como usuario autorizado para consultar información de consignación, quiero que "CXC > Resumen de Movimientos" permita filtrar únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para restringir el acceso a la información sensible.

### Reglas de negocio

**RN-25.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "CXC > Resumen de Movimientos".

**RN-25.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán utilizar el filtro por Consigna en "CXC > Resumen de Movimientos".

### Criterios de Aceptación

**CA-25.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "CXC > Resumen de Movimientos"
Entonces el sistema permite utilizar el filtro por Consigna en "CXC > Resumen de Movimientos" y devuelve la información marcada como CONSIGNACIÓN.

**CA-25.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "CXC > Resumen de Movimientos"
Entonces el sistema no permite utilizar el filtro por Consigna en "CXC > Resumen de Movimientos".

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-26"></a>
# RF-26 — Restricción de visualización de consignación en Ventas > Detalles de Ventas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detalles de Ventas" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-26.1 — Visualización restringida en Ventas > Detalles de Ventas

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Detalles de Ventas" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para restringir el acceso a la información sensible.

### Reglas de negocio

**RN-26.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Detalles de Ventas".

**RN-26.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Detalles de Ventas"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-26.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Detalles de Ventas"
Entonces el sistema muestra en "Ventas > Detalles de Ventas" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-26.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Detalles de Ventas"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Detalles de Ventas" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-27"></a>
# RF-27 — Restricción de visualización de consignación en Ventas > Devolución del Cliente

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la pantalla de proceso "Ventas > Devolución del Cliente" para que la información de las devoluciónes relacionadas a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-27.1 — Visualización restringida en Ventas > Devolución del Cliente

Como usuario autorizado para consultar información de consignación, quiero que "Ventas > Devolución del Cliente" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para restringir el acceso a la información sensible.

### Reglas de negocio

**RN-27.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Ventas > Devolución del Cliente".

**RN-27.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Ventas > Devolución del Cliente"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-27.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Ventas > Devolución del Cliente"
Entonces el sistema muestra en "Ventas > Devolución del Cliente" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-27.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Ventas > Devolución del Cliente"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Ventas > Devolución del Cliente" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

<a id="rf-28"></a>
# RF-28 — Restricción de visualización de consignación en Cuentas por Cobrar > Anticipos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | DEP-01 |

## Descripción
El sistema deberá limitar la visualización de la pantalla de proceso "Cuentas por Cobrar > Anticipos" para que solo sean visibles los anticipos marcados como CONSIGNACIÓN para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

## HU-28.1 — Visualización restringida en Cuentas por Cobrar > Anticipos

Como usuario autorizado para consultar información de consignación, quiero que "Cuentas por Cobrar > Anticipos" muestre únicamente la información correspondiente a consignación cuando cuente con el permiso especial FN-INTERPLANTAS, para proteger la información de consignación.

### Reglas de negocio

**RN-28.1** Solo los usuarios que cuenten con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06 podrán visualizar información de consignación en "Cuentas por Cobrar > Anticipos".

**RN-28.2** Los usuarios que no cuenten con el permiso especial FN-INTERPLANTAS no podrán visualizar los registros marcados como CONSIGNACIÓN en "Cuentas por Cobrar > Anticipos"; dichos registros deberán permanecer ocultos.

### Criterios de Aceptación

**CA-28.1.1 — Acceso autorizado a la información de consignación**
Dado que el usuario cuenta con el permiso especial FN-INTERPLANTAS y alguno de los roles remcxc01, remvta01, remvta02 o remvta06
Cuando ingresa a "Cuentas por Cobrar > Anticipos"
Entonces el sistema muestra en "Cuentas por Cobrar > Anticipos" la información marcada como CONSIGNACIÓN correspondiente a ese usuario.

**CA-28.1.2 — Restricción para usuario no autorizado**
Dado que el usuario no cuenta con el permiso especial FN-INTERPLANTAS
Cuando ingresa a "Cuentas por Cobrar > Anticipos"
Entonces el sistema oculta la información marcada como CONSIGNACIÓN en "Cuentas por Cobrar > Anticipos" y no la incluye en el resultado.

---

**Regla transversal:**
Este requerimiento comparte el mismo mecanismo de autorización que [RF-01](#rf-01): el permiso especial FN-INTERPLANTAS junto con los roles remcxc01, remvta01, remvta02 o remvta06 determina la visibilidad de la información de consignación en todas las pantallas y consultas listadas en el [índice de requerimientos](#6-índice-de-requerimientos).

---

## 7. Requerimientos No Funcionales (RNF)

> El documento fuente indica "NA" para requerimientos no funcionales. Se proponen los siguientes RNF mínimos, razonables para un control de acceso a información financiera sensible; deben ser confirmados por el negocio (ver Preguntas abiertas).

### RNF-001 — Seguridad: enforcement a nivel de consulta
- **Descripción:** La validación del permiso especial FN-INTERPLANTAS y de los roles remcxc01, remvta01, remvta02 y remvta06 debe aplicarse en el motor de consulta/servidor, no únicamente en la interfaz de usuario.
- **Métrica / criterio de verificación:** 0 registros marcados como CONSIGNACIÓN devueltos a un usuario no autorizado en pruebas de acceso directo (API/reporte) a cualquiera de las 28 consultas/pantallas.
- **Prioridad:** Must

### RNF-002 — Rendimiento
- **Descripción:** La validación adicional de permiso no debe degradar el tiempo de respuesta de las consultas existentes.
- **Métrica / criterio de verificación:** El 95% de las consultas afectadas debe responder en un tiempo no mayor al 10% del tiempo actual medido antes del cambio.
- **Prioridad:** Should

### RNF-003 — Auditabilidad (preparación)
- **Descripción:** Aunque la auditoría de accesos está fuera de alcance (ver requerimiento separado), el mecanismo de validación de permisos debe quedar disponible para ser auditado a futuro sin cambios de arquitectura.
- **Métrica / criterio de verificación:** El punto de validación de FN-INTERPLANTAS queda centralizado en un único componente/servicio reutilizable por las 28 consultas.
- **Prioridad:** Could

## 8. Reglas de negocio generales

| ID | Regla | Aplica a |
|----|-------|----------|
| RN-000 | Un usuario se considera autorizado para ver información de consignación solo si tiene asignado el permiso especial FN-INTERPLANTAS junto con alguno de los roles remcxc01, remvta01, remvta02 o remvta06. | RF-01 a RF-28 |
| RN-000.1 | Un documento (factura, nota de crédito, abono, anticipo o transacción) se considera de consignación cuando está marcado con el tipo CONSIGNACIÓN en el sistema Remv. | RF-01 a RF-28 |

## 9. Matriz de trazabilidad

| Objetivo de negocio | RF | Historia | Criterio de aceptación | Prioridad | Estado |
|---------------------|-----|----------|------------------------|-----------|--------|
| Restringir visualización de ventas de consignación | RF-01 | HU-1.1 | CA-1.1.1, CA-1.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-02 | HU-2.1 | CA-2.1.1, CA-2.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-03 | HU-3.1 | CA-3.1.1, CA-3.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-04 | HU-4.1 | CA-4.1.1, CA-4.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-05 | HU-5.1 | CA-5.1.1, CA-5.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-06 | HU-6.1 | CA-6.1.1, CA-6.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-07 | HU-7.1 | CA-7.1.1, CA-7.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-08 | HU-8.1 | CA-8.1.1, CA-8.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-09 | HU-9.1 | CA-9.1.1, CA-9.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-10 | HU-10.1 | CA-10.1.1, CA-10.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-11 | HU-11.1 | CA-11.1.1, CA-11.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-12 | HU-12.1 | CA-12.1.1, CA-12.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-13 | HU-13.1 | CA-13.1.1, CA-13.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-14 | HU-14.1 | CA-14.1.1, CA-14.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-15 | HU-15.1 | CA-15.1.1, CA-15.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-16 | HU-16.1 | CA-16.1.1, CA-16.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-17 | HU-17.1 | CA-17.1.1, CA-17.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-18 | HU-18.1 | CA-18.1.1, CA-18.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-19 | HU-19.1 | CA-19.1.1, CA-19.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-20 | HU-20.1 | CA-20.1.1, CA-20.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-21 | HU-21.1 | CA-21.1.1, CA-21.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-22 | HU-22.1 | CA-22.1.1, CA-22.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-23 | HU-23.1 | CA-23.1.1, CA-23.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-24 | HU-24.1 | CA-24.1.1, CA-24.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-25 | HU-25.1 | CA-25.1.1, CA-25.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-26 | HU-26.1 | CA-26.1.1, CA-26.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-27 | HU-27.1 | CA-27.1.1, CA-27.1.2 | Must | Propuesto |
| Restringir visualización de ventas de consignación | RF-28 | HU-28.1 | CA-28.1.1, CA-28.1.2 | Must | Propuesto |

Estados sugeridos: Propuesto → Aprobado → En desarrollo → Verificado.

## 10. Supuestos, Dependencias y Riesgos

### Supuestos (SUP)

| ID | Supuesto | Impacto si es falso |
|----|----------|---------------------|
| SUP-01 | El permiso especial FN-INTERPLANTAS puede crearse y asignarse en el catálogo de seguridad del sistema Remv sin desarrollo adicional. | Si no, se requiere un requerimiento adicional para el módulo de seguridad. |
| SUP-02 | El campo/marca CONSIGNACIÓN ya existe en las entidades de factura, nota de crédito, abono, anticipo y transacción, y es consistente en todas las 28 pantallas/consultas. | Si no, se requiere homologar el dato antes de aplicar el filtro de visibilidad. |
| SUP-03 | Los roles remcxc01, remvta01, remvta02 y remvta06 ya existen y están asignados a los usuarios que deben conservar el acceso. | Si no, se requiere depurar/crear roles antes de liberar el control de acceso. |

### Dependencias (DEP)

| ID | Dependencia | De quién / de qué |
|----|-------------|--------------------|
| DEP-01 | Creación del permiso especial FN-INTERPLANTAS y asignación a los roles remcxc01, remvta01, remvta02, remvta06 en el módulo de seguridad del sistema Remv. | Administración de Sistemas |

### Riesgos (RGO)

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| RGO-01 | Que existan otras consultas o reportes (por ejemplo, exportaciones o integraciones) que expongan información de consignación fuera de las 28 pantallas listadas. | Media | Alto | Inventariar reportes/exportaciones adicionales en una fase posterior de descubrimiento. |
| RGO-02 | Que el campo CONSIGNACIÓN no esté marcado de forma consistente en datos históricos. | Media | Medio | Validar/depurar datos históricos antes de liberar a producción. |

## 11. Preguntas abiertas

| # | Pregunta | Responsable sugerido |
|---|----------|------------------------|
| 1 | ¿La pantalla "Inventario > Detallado de Movimientos de Almacén", mencionada en el alcance original, requiere un RF propio con el mismo control FN-INTERPLANTAS, o queda fuera de esta entrega? | Product Owner (María De Lourdes Viurquiz Gamiño) |
| 2 | ¿Los RNF propuestos (rendimiento, enforcement a nivel de consulta) son aceptables para el negocio o existen umbrales ya definidos por TI? | Área de I&N / Infraestructura |
| 3 | Para las consultas de tipo "filtro" (RF-07, RF-13, RF-14, RF-16, RF-18, RF-23, RF-24, RF-25), ¿el usuario no autorizado debe ver la opción de filtro deshabilitada, o no debe ver la opción en absoluto? | Product Owner / UX |
| 4 | ¿Existe un requerimiento de auditoría de accesos ya definido (mencionado como "cubierta por requerimiento separado") con el que este documento deba conectarse mediante dependencia? | Product Owner |
