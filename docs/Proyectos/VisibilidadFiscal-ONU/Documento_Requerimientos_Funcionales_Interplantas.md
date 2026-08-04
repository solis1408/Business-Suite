# Requerimientos Funcionales — Control de Acceso a Sistema REMV Ventas de Consignación (Interplantas)

| Campo                         | Valor                                                    |
|-------------------------------|-----------------------------------------------------------|
| Proyecto                      | Adecuación al Sistema REMV — Interplantas                 |
| Número de Solicitud de Servicio | 3765                                                     |
| Versión                       | 1.0                                                       |
| Fecha                         | 2026-07-17                                                |
| Estado                        | Definición                                                |
| Módulo                        | Ventas / Facturación / Cuentas por Cobrar (CXC)           |
| Prioridad general             | Urgente                                                   |
| Área de negocio                | Otras unidades de negocio                                |
| Responsable del requerimiento / Product Owner | María De Lourdes Viurquiz Gamiño            |
| Autor del análisis            | Análisis de Negocio de TI                                 |

---

## 1. Propósito del documento

Este documento describe los requerimientos funcionales necesarios para implementar un mecanismo de control de acceso, basado en el permiso especial **FN-INTERPLANTAS**, que restrinja la visualización de la información relacionada con ventas de consignación en el sistema ERP REMV. Actualmente cualquier usuario puede consultar esta información sin distinción, lo que representa un riesgo de exposición de datos financieros sensibles. El documento traduce esa necesidad en un conjunto de 25 requerimientos funcionales (uno por cada pantalla o consulta afectada), agrupados en los módulos de Facturación/Ventas y Cuentas por Cobrar (CXC):

- **RF-01** — Restricción de visualización en Ventas > Facturas.
- **RF-02** — Restricción de visualización en Ventas > Notas de Crédito.
- **RF-03** — Restricción de visualización en Ventas > Facturas Emitidas.
- **RF-04** — Restricción de visualización en Ventas > Facturas por producto.
- **RF-05** — Restricción de visualización en Ventas > Notas de crédito por producto.
- **RF-06** — Restricción de visualización en Ventas > Resumen facturas.
- **RF-07** — Restricción de visualización en Ventas > Resumen Notas de crédito.
- **RF-08** — Restricción de visualización en Ventas > Facturas Canceladas.
- **RF-09** — Restricción de visualización en Ventas > Ventas por factura pagada.
- **RF-10** — Restricción de visualización en Ventas > Detallado de ventas por factura pagada.
- **RF-11** — Restricción de visualización en Cuentas por Cobrar > Abonos.
- **RF-12** — Restricción de visualización en Cuentas por Cobrar > Transacciones.
- **RF-13** — Restricción de visualización en CXC > Antigüedad de Saldos.
- **RF-14** — Restricción de visualización en CXC > Cobranza general.
- **RF-15** — Restricción de visualización en Ventas > Cobranza general consulta.
- **RF-16** — Restricción de visualización en CXC > Comportamiento de pagos.
- **RF-17** — Restricción de visualización en Ventas > Concentrado de cobranza.
- **RF-18** — Restricción de visualización en CXC > Diario de abonos.
- **RF-19** — Restricción de visualización en Ventas > Documentos de Cobranza.
- **RF-20** — Restricción de visualización en Ventas > Detalle de abonos por facturas.
- **RF-21** — Restricción de visualización en Ventas > Detalle abonos facturas (Pagado).
- **RF-22** — Restricción de visualización en Ventas > Facturas Relación de factura.
- **RF-23** — Restricción de visualización en CXC > Estado de Cuenta.
- **RF-24** — Restricción de visualización en CXC > Estado de Cuenta Detallado.
- **RF-25** — Restricción de visualización en CXC > Resumen de movimientos.

**Objetivo del proyecto:** implementar un mecanismo de control de acceso mediante el permiso especial FN-INTERPLANTAS, con el fin de restringir la visualización de las consultas relacionadas con ventas de consignación en los módulos de Ventas, Inventario, Facturación y Cobranza, permitiendo el acceso únicamente a los usuarios autorizados.

**Antecedentes:** actualmente no existe un mecanismo de control de acceso que restrinja la visualización de estas opciones según el perfil o los permisos del usuario, lo que representa un riesgo de exposición de información financiera sensible. El ERP actual permite que todos los usuarios accedan a las consultas de los módulos de Ventas, Inventario, Facturación y Cobranza sin distinguir el tipo de venta que gestionan.

**Beneficio de negocio:** facilidad en la interpretación de la información de venta interplantas, al separar claramente lo que es visible según el perfil del usuario.

## 2. Alcance del documento

**Incluye:**
- La implementación del permiso especial FN-INTERPLANTAS como mecanismo de control de acceso.
- La restricción de visualización de la información de ventas de consignación en las 25 pantallas y consultas de los módulos de Facturación/Ventas y Cuentas por Cobrar (CXC) listadas en el punto 1.
- Mostrar la información de consignación únicamente a los usuarios cuyo perfil tenga asignado el permiso FN-INTERPLANTAS, y ocultarla al resto de los usuarios.

**No incluye:**
- La modificación de la lógica de negocio existente para las ventas de consignación.
- La creación o eliminación de perfiles de usuario (esto lo gestiona el área de Administración de Sistemas).
- La auditoría de accesos a la información de consignación (se cubre mediante un requerimiento separado, fuera de este documento).

## 3. Actores y roles

| Actor / Rol | Descripción |
|-------------|-------------|
| Usuario autorizado (permiso FN-INTERPLANTAS) | Usuario del ERP REMV cuyo perfil (por ejemplo remcxc01, remvta01, remvta02 o remvta06) tiene asignado el permiso especial FN-INTERPLANTAS; puede visualizar la información de ventas de consignación en las pantallas y consultas dentro del alcance. |
| Usuario no autorizado | Cualquier usuario del ERP REMV que no tenga asignado el permiso especial FN-INTERPLANTAS; no debe visualizar la información de ventas de consignación en las pantallas y consultas dentro del alcance. |
| Administración de Sistemas | Área responsable de la creación, eliminación y asignación de perfiles y permisos (incluido FN-INTERPLANTAS); esta gestión queda fuera del alcance de este documento. |
| Responsable del requerimiento / Product Owner de negocio | María De Lourdes Viurquiz Gamiño; define y valida la necesidad de negocio y prioriza el alcance funcional. |
| Consultor (Product Owner del proyecto) | José Cruz Cisneros; participa en la aprobación funcional del alcance. |
| Coordinador de Desarrollo | Ma. Luisa Brandi; coordina la implementación técnica de los requerimientos. |
| Aseguramiento de Calidad de Software (QA) | Edwin Quintanilla; valida el cumplimiento de los criterios de aceptación antes de la liberación. |

## 4. Glosario

| Término / Sigla | Definición |
|-----------------|------------|
| FN-INTERPLANTAS | Permiso especial del ERP REMV que habilita a un perfil de usuario a visualizar la información de ventas de consignación en las pantallas y consultas dentro del alcance. |
| Venta de consignación / Documento CONSIGNACIÓN | Tipo de venta en la que el producto se traslada entre plantas o a un cliente sin que se facture como una venta ordinaria inmediata; el documento asociado (factura, nota de crédito, abono, transacción) queda marcado con este atributo en el sistema. |
| CXC | Cuentas por Cobrar; módulo del ERP REMV donde se gestionan abonos, transacciones y el seguimiento de cobranza. |
| ERP REMV | Sistema de planeación de recursos empresariales utilizado por Grupo Reyes, sobre el cual se implementan estos requerimientos. |
| Perfil (remcxc01, remvta01, remvta02, remvta06) | Perfiles de usuario predefinidos en el ERP REMV a los que, de acuerdo con la información disponible, se asigna el permiso FN-INTERPLANTAS. |

## 5. Entidad a la que aplica

Este conjunto de requerimientos aplica sobre los **documentos de venta** del ERP REMV (facturas, notas de crédito, abonos y transacciones) que tienen el atributo o tipo de documento **CONSIGNACIÓN**, así como sobre las pantallas y consultas que exponen esa información en los módulos de Facturación/Ventas y Cuentas por Cobrar (CXC).

No se trata de un flujo de estados de la entidad, sino de una condición de visibilidad: el documento conserva su ciclo de vida normal (registro, cancelación, cobro, etc.) y lo único que cambia es si un usuario determinado puede o no verlo, en función de si su perfil tiene asignado el permiso FN-INTERPLANTAS. Por lo tanto, **no aplica** un estatus inicial/terminal propio de este control de acceso.

## 6. Índice de requerimientos

| RF | Título | Sistema | Aplica a |
|----|--------|---------|----------|
| RF-01 | Restricción de visualización — Facturas | Facturación / Ventas | Pantalla/consulta "Ventas > Facturas" |
| RF-02 | Restricción de visualización — Notas de Crédito | Facturación / Ventas | Pantalla/consulta "Ventas > Notas de Crédito" |
| RF-03 | Restricción de visualización — Facturas Emitidas | Facturación / Ventas | Pantalla/consulta "Ventas > Facturas Emitidas" |
| RF-04 | Restricción de visualización — Facturas por producto | Facturación / Ventas | Pantalla/consulta "Ventas > Facturas por producto" |
| RF-05 | Restricción de visualización — Notas de crédito por producto | Facturación / Ventas | Pantalla/consulta "Ventas > Notas de crédito por producto" |
| RF-06 | Restricción de visualización — Resumen facturas | Facturación / Ventas | Pantalla/consulta "Ventas > Resumen facturas" |
| RF-07 | Restricción de visualización — Resumen Notas de crédito | Facturación / Ventas | Pantalla/consulta "Ventas > Resumen Notas de crédito" |
| RF-08 | Restricción de visualización — Facturas Canceladas | Facturación / Ventas | Pantalla/consulta "Ventas > Facturas Canceladas" |
| RF-09 | Restricción de visualización — Ventas por factura pagada | Facturación / Ventas | Pantalla/consulta "Ventas > Ventas por factura pagada" |
| RF-10 | Restricción de visualización — Detallado de ventas por factura pagada | Facturación / Ventas | Pantalla/consulta "Ventas > Detallado de ventas por factura pagada" |
| RF-11 | Restricción de visualización — Abonos | Cuentas por Cobrar (CXC) | Pantalla/consulta "Cuentas por Cobrar > Abonos" |
| RF-12 | Restricción de visualización — Transacciones | Cuentas por Cobrar (CXC) | Pantalla/consulta "Cuentas por Cobrar > Transacciones" |
| RF-13 | Restricción de visualización — Antigüedad de Saldos | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Antigüedad de Saldos" |
| RF-14 | Restricción de visualización — Cobranza general | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Cobranza general" |
| RF-15 | Restricción de visualización — Cobranza general consulta | Facturación / Ventas | Pantalla/consulta "Ventas > Cobranza general consulta" |
| RF-16 | Restricción de visualización — Comportamiento de pagos | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Comportamiento de pagos" |
| RF-17 | Restricción de visualización — Concentrado de cobranza | Facturación / Ventas | Pantalla/consulta "Ventas > Concentrado de cobranza" |
| RF-18 | Restricción de visualización — Diario de abonos | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Diario de abonos" |
| RF-19 | Restricción de visualización — Documentos de Cobranza | Facturación / Ventas | Pantalla/consulta "Ventas > Documentos de Cobranza" |
| RF-20 | Restricción de visualización — Detalle de abonos por facturas | Facturación / Ventas | Pantalla/consulta "Ventas > Detalle de abonos por facturas" |
| RF-21 | Restricción de visualización — Detalle abonos facturas (Pagado) | Facturación / Ventas | Pantalla/consulta "Ventas > Detalle abonos facturas (Pagado)" |
| RF-22 | Restricción de visualización — Facturas Relación de factura | Facturación / Ventas | Pantalla/consulta "Ventas > Facturas Relación de factura" |
| RF-23 | Restricción de visualización — Estado de Cuenta | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Estado de Cuenta" |
| RF-24 | Restricción de visualización — Estado de Cuenta Detallado | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Estado de Cuenta Detallado" |
| RF-25 | Restricción de visualización — Resumen de movimientos | Cuentas por Cobrar (CXC) | Pantalla/consulta "CXC > Resumen de movimientos" |

---
---

# RF-01 — Restricción de visualización de información de consignación en Facturas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Facturas", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la pantalla "Ventas > Facturas" para que las facturas marcadas con documento CONSIGNACIÓN sean visibles para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Facturas", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-1.1 — Visualización restringida en Facturas

Como usuario autorizado para consultar información de consignación, quiero que en la pantalla "Ventas > Facturas" solo sean visibles los documentos marcados como CONSIGNACIÓN cuando tenga asignado el permiso FN-INTERPLANTAS, para proteger la información sensible y evitar accesos no autorizados.

### Reglas de negocio

**RN-1.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Facturas".

**RN-1.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-1.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas"
Entonces el sistema muestra información de consigna a los usuarios con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-1.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-02 — Restricción de visualización de información de consignación en Notas de Crédito

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Notas de Crédito", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la pantalla "Ventas > Notas de Crédito" para que los registros relacionados a facturas marcadas con documento CONSIGNACIÓN sean visibles para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Notas de Crédito", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-2.1 — Visualización restringida en Notas de Crédito

Como usuario autorizado para consultar información de consignación, quiero que en la pantalla "Ventas > Notas de Crédito" solo sean visibles los documentos marcados como CONSIGNACIÓN cuando tenga asignado el permiso FN-INTERPLANTAS, para garantizar que únicamente el personal autorizado acceda a esta información.

### Reglas de negocio

**RN-2.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Notas de Crédito".

**RN-2.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-2.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Notas de Crédito"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-2.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Notas de Crédito"
Entonces el sistema oculta la información de consigna a usuario no autorizado.

---

# RF-03 — Restricción de visualización de información de consignación en Facturas Emitidas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Facturas Emitidas", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas Emitidas" para que la información correspondiente solo a ventas de consignación y sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Facturas Emitidas", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-3.1 — Visualización restringida en Facturas Emitidas

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Facturas Emitidas" muestre la información correspondiente a ventas de consignación únicamente cuando tenga el permiso FN-INTERPLANTAS, para resguardar la información financiera sensible.

### Reglas de negocio

**RN-3.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Facturas Emitidas".

**RN-3.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-3.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas Emitidas"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-3.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas Emitidas"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-04 — Restricción de visualización de información de consignación en Facturas por producto

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Facturas por producto", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas por producto" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Facturas por producto", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-4.1 — Visualización restringida en Facturas por producto

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Facturas por Producto" muestre únicamente la información de ventas de consignación cuando cuente con el permiso FN-INTERPLANTAS, para evitar el acceso no autorizado.

### Reglas de negocio

**RN-4.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Facturas por producto".

**RN-4.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-4.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas por producto"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-4.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas por producto"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-05 — Restricción de visualización de información de consignación en Notas de crédito por producto

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Notas de crédito por producto", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Notas de crédito por producto" para que la información de nota de crédito ligada a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Notas de crédito por producto", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-5.1 — Visualización restringida en Notas de crédito por producto

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Notas de Crédito por Producto" muestre únicamente la información de consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la confidencialidad de la información.

### Reglas de negocio

**RN-5.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Notas de crédito por producto".

**RN-5.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-5.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Notas de crédito por producto"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-5.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Notas de crédito por producto"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-06 — Restricción de visualización de información de consignación en Resumen facturas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Resumen facturas", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Resumen facturas" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Resumen facturas", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-6.1 — Visualización restringida en Resumen facturas

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Resumen Facturas" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la información financiera.

### Reglas de negocio

**RN-6.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Resumen facturas".

**RN-6.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-6.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Resumen facturas"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-6.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Resumen facturas"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-07 — Restricción de visualización de información de consignación en Resumen Notas de crédito

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Resumen Notas de crédito", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Resumen Notas de crédito" para que la información de notas de crédito relacionada a facturas consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Resumen Notas de crédito", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-7.1 — Visualización restringida en Resumen Notas de crédito

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Resumen Notas de Crédito" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para restringir el acceso a usuarios autorizados.

### Reglas de negocio

**RN-7.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Resumen Notas de crédito".

**RN-7.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-7.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Resumen Notas de crédito"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-7.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Resumen Notas de crédito"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-08 — Restricción de visualización de información de consignación en Facturas Canceladas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Facturas Canceladas", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas Canceladas" para que la información correspondiente a facturas consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Facturas Canceladas", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-8.1 — Visualización restringida en Facturas Canceladas

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Facturas Canceladas" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para evitar la exposición de información sensible.

### Reglas de negocio

**RN-8.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Facturas Canceladas".

**RN-8.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-8.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas Canceladas"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-8.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas Canceladas"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-09 — Restricción de visualización de información de consignación en Ventas por factura pagada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Ventas por factura pagada", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Ventas por factura pagada" para que la información correspondiente a ventas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Ventas por factura pagada", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-9.1 — Visualización restringida en Ventas por factura pagada

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Ventas por Factura Pagada" muestre únicamente la información de ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la información restringida.

### Reglas de negocio

**RN-9.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Ventas por factura pagada".

**RN-9.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-9.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Ventas por factura pagada"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-9.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Ventas por factura pagada"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-10 — Restricción de visualización de información de consignación en Detallado de ventas por factura pagada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Detallado de ventas por factura pagada", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detallado de ventas por factura pagada" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Detallado de ventas por factura pagada", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-10.1 — Visualización restringida en Detallado de ventas por factura pagada

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Detallado de Ventas por Factura Pagada" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para garantizar el acceso exclusivo a usuarios autorizados.

### Reglas de negocio

**RN-10.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Detallado de ventas por factura pagada".

**RN-10.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-10.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Detallado de ventas por factura pagada"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-10.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Detallado de ventas por factura pagada"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-11 — Restricción de visualización de información de consignación en Abonos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Cuentas por Cobrar > Abonos", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la pantalla "Cuentas por Cobrar > Abonos" para que los abonos marcados con documento CONSIGNACIÓN sean visibles para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Cuentas por Cobrar > Abonos", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-11.1 — Visualización restringida en Abonos

Como usuario autorizado para consultar información de consignación, quiero que en la pantalla "Cuentas por Cobrar > Abonos" solo sean visibles los documentos marcados como CONSIGNACIÓN cuando tenga el permiso FN-INTERPLANTAS, para proteger la información de consignación.

### Reglas de negocio

**RN-11.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Cuentas por Cobrar > Abonos".

**RN-11.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-11.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Cuentas por Cobrar > Abonos"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-11.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Cuentas por Cobrar > Abonos"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-12 — Restricción de visualización de información de consignación en Transacciones

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Cuentas por Cobrar > Transacciones", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la pantalla "Cuentas por Cobrar > Transacciones" para que las transacciones marcadas con documento CONSIGNACIÓN sean visibles para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Cuentas por Cobrar > Transacciones", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-12.1 — Visualización restringida en Transacciones

Como usuario autorizado para consultar información de consignación, quiero que en la pantalla "Cuentas por Cobrar > Transacciones" solo sean visibles los documentos marcados como CONSIGNACIÓN cuando tenga el permiso FN-INTERPLANTAS, para restringir el acceso a la información sensible.

### Reglas de negocio

**RN-12.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Cuentas por Cobrar > Transacciones".

**RN-12.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-12.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Cuentas por Cobrar > Transacciones"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-12.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Cuentas por Cobrar > Transacciones"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-13 — Restricción de visualización de información de consignación en Antigüedad de Saldos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Antigüedad de Saldos", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Antigüedad de Saldos" para que la información correspondiente a movimientos y transacciones marcadas por consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Antigüedad de Saldos", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-13.1 — Visualización restringida en Antigüedad de Saldos

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Antigüedad de Saldos" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la información financiera.

### Reglas de negocio

**RN-13.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Antigüedad de Saldos".

**RN-13.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-13.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Antigüedad de Saldos"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-13.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Antigüedad de Saldos"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-14 — Restricción de visualización de información de consignación en Cobranza general

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Cobranza general", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Cobranza general" para que la información correspondiente a consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Cobranza general", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-14.1 — Visualización restringida en Cobranza general

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Cobranza General" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para evitar consultas no autorizadas.

### Reglas de negocio

**RN-14.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Cobranza general".

**RN-14.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-14.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Cobranza general"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-14.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Cobranza general"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-15 — Restricción de visualización de información de consignación en Cobranza general consulta

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Cobranza general consulta", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Cobranza general consulta" para que la información correspondiente a facturas marcadas por consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Cobranza general consulta", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-15.1 — Visualización restringida en Cobranza general consulta

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Cobranza General Consulta" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para preservar la confidencialidad de la información.

### Reglas de negocio

**RN-15.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Cobranza general consulta".

**RN-15.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-15.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Cobranza general consulta"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-15.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Cobranza general consulta"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-16 — Restricción de visualización de información de consignación en Comportamiento de pagos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Comportamiento de pagos", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Comportamiento de pagos" para que la información correspondiente a movimientos y transacciones por consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Comportamiento de pagos", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-16.1 — Visualización restringida en Comportamiento de pagos

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Comportamiento de Pagos" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la información restringida.

### Reglas de negocio

**RN-16.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Comportamiento de pagos".

**RN-16.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-16.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Comportamiento de pagos"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-16.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Comportamiento de pagos"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-17 — Restricción de visualización de información de consignación en Concentrado de cobranza

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Concentrado de cobranza", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Concentrado de cobranza" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Concentrado de cobranza", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-17.1 — Visualización restringida en Concentrado de cobranza

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Concentrado de Cobranza" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para garantizar que solo usuarios autorizados puedan consultarla.

### Reglas de negocio

**RN-17.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Concentrado de cobranza".

**RN-17.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-17.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Concentrado de cobranza"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-17.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Concentrado de cobranza"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-18 — Restricción de visualización de información de consignación en Diario de abonos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Diario de abonos", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Diario de abonos" para que la información correspondiente a movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Diario de abonos", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-18.1 — Visualización restringida en Diario de abonos

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Diario de Abonos" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la información financiera.

### Reglas de negocio

**RN-18.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Diario de abonos".

**RN-18.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-18.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Diario de abonos"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-18.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Diario de abonos"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-19 — Restricción de visualización de información de consignación en Documentos de Cobranza

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Documentos de Cobranza", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Documentos de Cobranza" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Documentos de Cobranza", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-19.1 — Visualización restringida en Documentos de Cobranza

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Documentos de Cobranza" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para evitar la exposición de información restringida.

### Reglas de negocio

**RN-19.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Documentos de Cobranza".

**RN-19.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-19.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Documentos de Cobranza"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-19.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Documentos de Cobranza"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-20 — Restricción de visualización de información de consignación en Detalle de abonos por facturas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Detalle de abonos por facturas", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detalle de abonos por facturas" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Detalle de abonos por facturas", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-20.1 — Visualización restringida en Detalle de abonos por facturas

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Detalle de Abonos por Facturas" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para garantizar la seguridad de la información.

### Reglas de negocio

**RN-20.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Detalle de abonos por facturas".

**RN-20.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-20.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Detalle de abonos por facturas"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-20.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Detalle de abonos por facturas"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-21 — Restricción de visualización de información de consignación en Detalle abonos facturas (Pagado)

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Detalle abonos facturas (Pagado)", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Detalle abonos facturas (Pagado)" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Detalle abonos facturas (Pagado)", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-21.1 — Visualización restringida en Detalle abonos facturas (Pagado)

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Detalle Abonos Facturas (Pagado)" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para restringir su consulta a usuarios autorizados.

### Reglas de negocio

**RN-21.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Detalle abonos facturas (Pagado)".

**RN-21.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-21.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Detalle abonos facturas (Pagado)"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-21.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Detalle abonos facturas (Pagado)"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-22 — Restricción de visualización de información de consignación en Facturas Relación de factura

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "Ventas > Facturas Relación de factura", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "Ventas > Facturas Relación de factura" para que la información correspondiente a facturas de consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "Ventas > Facturas Relación de factura", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-22.1 — Visualización restringida en Facturas Relación de factura

Como usuario autorizado para consultar información de consignación, quiero que la consulta "Ventas > Facturas Relación de Factura" muestre únicamente la información correspondiente a ventas de consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la confidencialidad de la información.

### Reglas de negocio

**RN-22.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "Ventas > Facturas Relación de factura".

**RN-22.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-22.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas Relación de factura"
Entonces el sistema muestra la información de consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-22.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "Ventas > Facturas Relación de factura"
Entonces el sistema oculta la información de consigna a usuarios no autorizados.

---

# RF-23 — Restricción de visualización de información de consignación en Estado de Cuenta

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Estado de Cuenta", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Estado de Cuenta" para que la información de movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Estado de Cuenta", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-23.1 — Visualización restringida en Estado de Cuenta

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Estado de Cuenta" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para garantizar que solo usuarios autorizados puedan acceder a ella.

### Reglas de negocio

**RN-23.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Estado de Cuenta".

**RN-23.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-23.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Estado de Cuenta"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-23.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Estado de Cuenta"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-24 — Restricción de visualización de información de consignación en Estado de Cuenta Detallado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Estado de Cuenta Detallado", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Estado de Cuenta Detallado" para que la información de movimientos y transacciones marcadas como consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Estado de Cuenta Detallado", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-24.1 — Visualización restringida en Estado de Cuenta Detallado

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Estado de Cuenta Detallado" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para proteger la información financiera sensible.

### Reglas de negocio

**RN-24.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Estado de Cuenta Detallado".

**RN-24.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-24.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Estado de Cuenta Detallado"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-24.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Estado de Cuenta Detallado"
Entonces el sistema no permite filtrar la información por Consigna.

---

# RF-25 — Restricción de visualización de información de consignación en Resumen de movimientos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna (requiere que el permiso especial FN-INTERPLANTAS ya exista en el catálogo de permisos del ERP REMV) |

## Objetivo
Evitar que usuarios sin autorización visualicen información financiera de ventas de consignación en la pantalla/consulta "CXC > Resumen de movimientos", exponiendo dicha información únicamente a los perfiles que cuenten con el permiso especial FN-INTERPLANTAS.

## Descripción
El sistema deberá limitar la visualización de la consulta "CXC > Resumen de movimientos" para que la información de movimientos y transacciones marcadas como  consignación sea visible únicamente para los usuarios que cuenten con el permiso especial FN-INTERPLANTAS.

### Información / atributos
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Tipo de documento | Sí | Atributo del documento (factura, nota de crédito, abono o transacción, según la pantalla) que indica si corresponde a una venta de consignación. |
| Permiso especial FN-INTERPLANTAS | Sí | Permiso asignado al perfil del usuario que habilita la visualización de los documentos de consignación en esta pantalla/consulta. |

### Operaciones
- Consultar: al abrir la pantalla/consulta "CXC > Resumen de movimientos", el sistema evalúa si el usuario cuenta con el permiso FN-INTERPLANTAS antes de incluir los registros de consignación en el resultado.

## HU-25.1 — Visualización restringida en Resumen de movimientos

Como usuario autorizado para consultar información de consignación, quiero que la consulta "CXC > Resumen de Movimientos" muestre únicamente la información correspondiente a consignación cuando tenga el permiso FN-INTERPLANTAS, para restringir el acceso a la información sensible.

### Reglas de negocio

**RN-25.1** Solo los usuarios con el permiso especial FN-INTERPLANTAS asignado a su perfil podrán visualizar los documentos marcados como CONSIGNACIÓN en "CXC > Resumen de movimientos".

**RN-25.2** Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este documento, los perfiles a los que se asigna el permiso FN-INTERPLANTAS (supuesto SUP-02, sujeto a validación con Administración de Sistemas).

### Criterios de Aceptación

**CA-25.1.1 — Usuario autorizado visualiza la información de consignación**
Dado que el usuario tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Resumen de movimientos"
Entonces el sistema permite filtrar la información por Consigna a usuarios autorizados con permisos especial: remcxc01, remvta01, remvta02, remvta06.

**CA-25.2.1 — Usuario no autorizado no visualiza la información de consignación**
Dado que el usuario no tiene asignado el permiso especial FN-INTERPLANTAS
Cuando el usuario ingresa a "CXC > Resumen de movimientos"
Entonces el sistema no permite filtrar la información por Consigna.


---

# Requerimientos No Funcionales (RNF)

El documento original no especifica requerimientos no funcionales. Dado que el proyecto trata sobre control de acceso a información financiera sensible, se proponen los siguientes RNF como punto de partida; deben validarse con el negocio y con el equipo técnico responsable del ERP REMV.

### RNF-001 — Seguridad: aplicación de la restricción del lado del servidor
- **Descripción:** La restricción de visualización de información de consignación debe aplicarse en la capa de datos/servicio del ERP REMV, y no únicamente ocultando elementos en la interfaz, para evitar que un usuario no autorizado acceda a la información por otra vía (exportación, impresión, servicios internos).
- **Métrica / criterio de verificación:** Pruebas de seguridad confirman que ninguna respuesta del servidor (incluyendo exportaciones a Excel/PDF de las 25 pantallas y consultas en alcance) contiene registros de consignación cuando el usuario no tiene el permiso FN-INTERPLANTAS.
- **Prioridad:** Must

### RNF-002 — Rendimiento: sin degradación de tiempos de respuesta
- **Descripción:** La validación del permiso FN-INTERPLANTAS y el filtrado de registros de consignación no deben incrementar de forma perceptible el tiempo de respuesta de las pantallas y consultas en alcance.
- **Métrica / criterio de verificación:** El tiempo de respuesta de cada pantalla/consulta con el filtro aplicado no aumenta más de un 10% respecto al tiempo de respuesta actual (medido antes del cambio), en condiciones de carga equivalentes.
- **Prioridad:** Should

### RNF-003 — Compatibilidad con el ERP vigente
- **Descripción:** La solución debe operar sobre la versión actual del ERP REMV, sin requerir actualización de clientes ni de infraestructura adicional.
- **Métrica / criterio de verificación:** La funcionalidad se valida exitosamente en el ambiente de pruebas actual del ERP REMV, sin cambios de versión.
- **Prioridad:** Should

---

# Matriz de trazabilidad

| Objetivo de negocio | RF | Historia | Criterio de aceptación | Prioridad | Estado |
|---------------------|-----|----------|------------------------|-----------|--------|
| OBJ-1 Restringir la visualización de información de ventas de consignación a usuarios autorizados | RF-01 a RF-25 | HU-1.1 a HU-25.1 | CA-x.1.1 "Usuario autorizado visualiza la información de consignación" | Must | Definición |
| OBJ-1 | RF-01 a RF-25 | HU-1.1 a HU-25.1 | CA-x.2.1 "Usuario no autorizado no visualiza la información de consignación" | Must | Definición |
| OBJ-2 Reducir el riesgo de exposición de información financiera sensible | RF-01 a RF-25 | HU-1.1 a HU-25.1 | RN-x.1 "Solo los usuarios con permiso FN-INTERPLANTAS pueden visualizar la información de consignación" | Must | Definición |

> Nota: dado que las 25 historias comparten el mismo objetivo de negocio y el mismo patrón de criterios, se resume la trazabilidad en un solo bloque por objetivo en lugar de repetir 25 filas idénticas. Si el equipo de QA requiere trazabilidad fila por fila para su matriz de pruebas, puede expandirse esta tabla sustituyendo "RF-01 a RF-25" por cada RF individual.

# Reglas de negocio (consolidado)

| ID | Regla | Aplica a |
|----|-------|----------|
| RN-global-1 | Un usuario solo puede visualizar documentos e información marcados como CONSIGNACIÓN si su perfil tiene asignado el permiso especial FN-INTERPLANTAS. | RF-01 a RF-25 |
| RN-global-2 | Los perfiles remcxc01, remvta01, remvta02 y remvta06 son, a la fecha de este análisis, los perfiles con el permiso FN-INTERPLANTAS asignado. | RF-01 a RF-25 |

# Supuestos (SUP)

| ID | Supuesto | Impacto si es falso |
|----|----------|---------------------|
| SUP-01 | El ERP REMV permite marcar/identificar a nivel de dato (no solo de interfaz) qué documentos corresponden a ventas de consignación (atributo o tipo de documento CONSIGNACIÓN). | Si no existe ese marcado a nivel de dato, se requeriría primero un desarrollo adicional para clasificar los documentos, lo cual amplía el alcance y el esfuerzo. |
| SUP-02 | Los perfiles remcxc01, remvta01, remvta02 y remvta06 son la lista completa y vigente de perfiles autorizados; cualquier perfil nuevo que requiera el permiso deberá solicitarse a Administración de Sistemas. | Si la lista cambia o está incompleta, algunos usuarios que deberían ver la información de consignación quedarían bloqueados, o viceversa. |
| SUP-03 | El permiso especial FN-INTERPLANTAS ya existe o será creado como parte de la infraestructura de permisos del ERP REMV, de forma independiente a estos 25 requerimientos. | Si no existe, se requiere un requerimiento adicional para su creación antes de poder implementar las restricciones descritas. |
| SUP-04 | La prioridad Must asignada a los 25 RF es correcta, dado que el documento original no especificó prioridad MoSCoW por requerimiento y se trata de un proyecto marcado como "Urgente". | Si el negocio considera que algunas pantallas/consultas son menos críticas que otras, la priorización debe ajustarse RF por RF. |

# Dependencias (DEP)

| ID | Dependencia | De quién / de qué |
|----|-------------|-------------------|
| DEP-01 | Existencia y asignación previa del permiso especial FN-INTERPLANTAS a los perfiles autorizados. | Administración de Sistemas |
| DEP-02 | Disponibilidad de un ambiente de pruebas del ERP REMV con datos de ejemplo marcados como CONSIGNACIÓN, para validar los 25 criterios de aceptación. | Equipo de Infraestructura / Administración del ERP |

# Riesgos (RGO)

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| RGO-01 | Que la restricción se implemente solo a nivel de interfaz y no a nivel de datos, permitiendo el acceso a la información de consignación por otra vía (exportaciones, reportes, servicios). | Media | Alto | Validar con el equipo técnico que el filtro se aplique en la capa de datos/servicio (ver RNF-001) y no solo en la pantalla. |
| RGO-02 | Que la lista de perfiles autorizados (remcxc01, remvta01, remvta02, remvta06) quede desactualizada con el tiempo, dejando usuarios sin el acceso que deberían tener o con acceso indebido. | Media | Medio | Definir junto con Administración de Sistemas un proceso claro de alta/baja del permiso FN-INTERPLANTAS, aunque esté fuera del alcance funcional de este documento. |
| RGO-03 | Inconsistencia detectada entre el alcance descrito en la sección 3 del documento original (que menciona la pantalla "Inventario > Detallado de Movimientos de Almacén") y la tabla de requerimientos funcionales, que no incluye ningún RF para el módulo de Inventario. | Alta | Medio | Confirmar con el negocio si la restricción en Inventario está pendiente de definir (y agregar el RF correspondiente) o si fue descartada del alcance. |

# Preguntas abiertas

1. **Inventario fuera de la tabla de RF:** el documento original menciona en el punto 3.1 la pantalla "Inventario > Detallado de Movimientos de Almacén" como parte del alcance, pero no existe ningún RF para ese módulo en la tabla de requerimientos. ¿Debe agregarse un RF-26 para Inventario, o esa pantalla queda fuera del alcance de esta entrega? — Responsable sugerido: Responsable del requerimiento (María De Lourdes Viurquiz Gamiño).
2. **Prioridad MoSCoW por RF:** el documento original no define prioridad individual por requerimiento; se asumió "Must" para los 25 RF dado que el proyecto está marcado como "Urgente" (ver SUP-04). ¿Existen RF que puedan degradarse a Should/Could en una primera entrega? — Responsable sugerido: Product Owner del proyecto.
3. **Nivel de aplicación del filtro:** ¿la restricción debe aplicarse también a exportaciones, impresiones y reportes generados desde estas 25 pantallas/consultas, o únicamente a la visualización en pantalla? — Responsable sugerido: Coordinador de Desarrollo.
4. **Vigencia de la lista de perfiles:** ¿remcxc01, remvta01, remvta02 y remvta06 son los únicos perfiles que deben tener el permiso FN-INTERPLANTAS, o existen otros perfiles (por ejemplo de Dirección o Auditoría) que también deban visualizar esta información? — Responsable sugerido: Administración de Sistemas.
5. **Duplicidad "Resumen de facturas":** en la sección de alcance del documento original, "Resumen de facturas" aparece listado tanto en Facturación como en Cuentas por Cobrar; ¿son dos consultas distintas o un error de captura? — Responsable sugerido: Responsable del requerimiento.
