# Requerimientos Funcionales — Módulo de Catálogos (Civentor)

| Campo   | Valor        |
|---------|--------------|
| Versión | 1.0          |
| Fecha   | 2026-08-29   |
| Estado  | Definición   |
| Módulo  | Catálogos maestros |
| Autor   | Análisis de Negocio |

---

## 1. Propósito del documento

Este documento describe los requerimientos funcionales para la administración de los catálogos maestros del sistema de Civentor: Agentes, Aseguradoras, Clientes, Empleados, Empresas, Grupos, Monedas, Países, Estados, Ciudades, Puestos Laborales, Ramos, Solicitante Titulares, Tipos Clasificación, Tipos Aeronave, Tipos Asegurado y Tipos Vehículo. Está dirigido al equipo de desarrollo, QA y al negocio, y sirve como base para el diseño, construcción y prueba del módulo de catálogos. El documento contiene los siguientes requerimientos funcionales:

- [RF-01](#rf-01) — Registrar ramo (Ramos)
- [RF-02](#rf-02) — Validar unicidad del nombre (Ramos)
- [RF-03](#rf-03) — Asociar aseguradoras al ramo (Ramos)
- [RF-04](#rf-04) — Consultar y filtrar ramos (Ramos)
- [RF-05](#rf-05) — Restringir eliminación de ramo vinculado a pólizas (Ramos)
- [RF-06](#rf-06) — Registrar aseguradora (Aseguradoras)
- [RF-07](#rf-07) — Validar unicidad del identificador fiscal (Aseguradoras)
- [RF-08](#rf-08) — Asociar ramos a la aseguradora (Aseguradoras)
- [RF-09](#rf-09) — Consultar y filtrar aseguradoras (Aseguradoras)
- [RF-10](#rf-10) — Restringir eliminación con relaciones activas (Aseguradoras)
- [RF-11](#rf-11) — Registrar agente (Agentes)
- [RF-12](#rf-12) — Clasificar agente como interno o externo (Agentes)
- [RF-13](#rf-13) — Asociar aseguradora a agente externo (Agentes)
- [RF-14](#rf-14) — Validar unicidad del documento de identificación (Agentes)
- [RF-15](#rf-15) — Consultar y filtrar agentes (Agentes)
- [RF-16](#rf-16) — Restringir inactivación de agente con relaciones activas (Agentes)
- [RF-17](#rf-17) — Registrar cliente (Clientes)
- [RF-18](#rf-18) — Validar unicidad del documento (Clientes)
- [RF-19](#rf-19) — Asociar solicitante titular a cliente persona moral (Clientes)
- [RF-20](#rf-20) — Asociar ubicación geográfica (Clientes)
- [RF-21](#rf-21) — Consultar y filtrar clientes (Clientes)
- [RF-22](#rf-22) — Restringir eliminación de cliente con pólizas (Clientes)
- [RF-23](#rf-23) — Registrar empleado (Empleados)
- [RF-24](#rf-24) — Validar unicidad del documento (Empleados)
- [RF-25](#rf-25) — Exigir empresa válida y activa (Empleados)
- [RF-26](#rf-26) — Exigir puesto laboral válido y activo (Empleados)
- [RF-27](#rf-27) — Consultar y filtrar empleados (Empleados)
- [RF-28](#rf-28) — Restringir inactivación con pólizas vigentes (Empleados)
- [RF-29](#rf-29) — Registrar empresa (Empresas)
- [RF-30](#rf-30) — Validar unicidad del identificador fiscal (Empresas)
- [RF-31](#rf-31) — Asociar ubicación geográfica (Empresas)
- [RF-32](#rf-32) — Consultar empresas y sus empleados (Empresas)
- [RF-33](#rf-33) — Restringir eliminación con relaciones activas (Empresas)
- [RF-34](#rf-34) — Registrar grupo (Grupos)
- [RF-35](#rf-35) — Restringir tipo de agrupación a lista predefinida (Grupos)
- [RF-36](#rf-36) — Asociar elementos al grupo según su tipo (Grupos)
- [RF-37](#rf-37) — Consultar y filtrar grupos (Grupos)
- [RF-38](#rf-38) — Restringir eliminación de grupo vinculado a póliza (Grupos)
- [RF-39](#rf-39) — Registrar moneda (Monedas)
- [RF-40](#rf-40) — Validar unicidad del código ISO (Monedas)
- [RF-41](#rf-41) — Definir moneda estándar/base (Monedas)
- [RF-42](#rf-42) — Consultar monedas disponibles (Monedas)
- [RF-43](#rf-43) — Restringir inactivación de moneda en uso (Monedas)
- [RF-44](#rf-44) — Registrar país (Países)
- [RF-45](#rf-45) — Validar unicidad del código ISO (Países)
- [RF-46](#rf-46) — Consultar país con sus estados asociados (Países)
- [RF-47](#rf-47) — Restringir eliminación de país con dependencias (Países)
- [RF-48](#rf-48) — Registrar estado/provincia (Estados)
- [RF-49](#rf-49) — Exigir país válido y activo (Estados)
- [RF-50](#rf-50) — Validar unicidad del nombre dentro del país (Estados)
- [RF-51](#rf-51) — Consultar estados filtrando por país (Estados)
- [RF-52](#rf-52) — Restringir eliminación de estado con dependencias (Estados)
- [RF-53](#rf-53) — Registrar ciudad (Ciudades)
- [RF-54](#rf-54) — Exigir estado válido y activo (Ciudades)
- [RF-55](#rf-55) — Validar unicidad del nombre dentro del estado (Ciudades)
- [RF-56](#rf-56) — Consultar ciudades con jerarquía completa (Ciudades)
- [RF-57](#rf-57) — Restringir eliminación de ciudad referenciada (Ciudades)
- [RF-58](#rf-58) — Registrar puesto laboral (Puestos Laborales)
- [RF-59](#rf-59) — Validar unicidad del nombre (Puestos Laborales)
- [RF-60](#rf-60) — Asociar nivel de riesgo al puesto (Puestos Laborales)
- [RF-61](#rf-61) — Consultar y filtrar puestos laborales (Puestos Laborales)
- [RF-62](#rf-62) — Restringir eliminación de puesto asignado (Puestos Laborales)
- [RF-63](#rf-63) — Registrar solicitante titular (Solicitante Titulares)
- [RF-64](#rf-64) — Validar unicidad del documento (Solicitante Titulares)
- [RF-65](#rf-65) — Asociar empresa cuando el vínculo es responsable de empresa (Solicitante Titulares)
- [RF-66](#rf-66) — Consultar y filtrar solicitantes titulares (Solicitante Titulares)
- [RF-67](#rf-67) — Restringir eliminación con solicitudes activas (Solicitante Titulares)
- [RF-68](#rf-68) — Registrar tipo de clasificación (Tipos Clasificación)
- [RF-69](#rf-69) — Validar unicidad del nombre (Tipos Clasificación)
- [RF-70](#rf-70) — Asociar tipo de clasificación a la póliza (Tipos Clasificación)
- [RF-71](#rf-71) — Consultar tipos de clasificación (Tipos Clasificación)
- [RF-72](#rf-72) — Restringir eliminación referenciada en pólizas (Tipos Clasificación)
- [RF-73](#rf-73) — Registrar tipo de aeronave (Tipos Aeronave)
- [RF-74](#rf-74) — Validar unicidad del nombre (Tipos Aeronave)
- [RF-75](#rf-75) — Permitir múltiples tipos aplicables por aeronave asegurada (Tipos Aeronave)
- [RF-76](#rf-76) — Consultar y filtrar tipos de aeronave (Tipos Aeronave)
- [RF-77](#rf-77) — Restringir eliminación referenciada en pólizas (Tipos Aeronave)
- [RF-78](#rf-78) — Registrar tipo de asegurado (Tipos Asegurado)
- [RF-79](#rf-79) — Restringir nivel de riesgo a valores predefinidos (Tipos Asegurado)
- [RF-80](#rf-80) — Asociar nivel de riesgo a puestos laborales (Tipos Asegurado)
- [RF-81](#rf-81) — Consultar tipos de asegurado y puestos asociados (Tipos Asegurado)
- [RF-82](#rf-82) — Restringir eliminación referenciada (Tipos Asegurado)
- [RF-83](#rf-83) — Registrar tipo de vehículo (Tipos Vehículo)
- [RF-84](#rf-84) — Validar unicidad del nombre (Tipos Vehículo)
- [RF-85](#rf-85) — Asociar tipo de vehículo a un vehículo asegurado (Tipos Vehículo)
- [RF-86](#rf-86) — Consultar y filtrar tipos de vehículo (Tipos Vehículo)
- [RF-87](#rf-87) — Restringir eliminación referenciada (Tipos Vehículo)

## 2. Alcance del documento

**Incluye:**
- El alta, consulta, edición, baja lógica y validaciones propias de cada uno de los 17 catálogos maestros listados en el propósito.
- Las relaciones de dependencia e integridad referencial entre catálogos (por ejemplo, la jerarquía País > Estado > Ciudad, o la relación Agente-Aseguradora).
- Los requerimientos no funcionales aplicables a la operación de los catálogos (rendimiento, auditoría, disponibilidad).

**No incluye:**
- La gestión de pólizas, cotizaciones o siniestros, que consumen estos catálogos pero se documentan en módulos aparte.
- La integración con sistemas externos (facturación, pagos, portales de aseguradoras).
- La definición de perfiles y permisos granulares a nivel de campo; solo se documenta el control de acceso general a nivel de catálogo.

## 3. Actores y roles

| Actor / Rol | Descripción |
|-------------|-------------|
| Administrador de catálogos | Usuario responsable de crear, editar, inactivar y mantener la integridad de los catálogos maestros. |
| Agente | Usuario de venta (interno o externo) que consulta y asocia catálogos al registrar clientes, pólizas y elementos asegurados. |
| Usuario del sistema | Cualquier usuario autenticado que consulta catálogos para apoyar su operación diaria. |

## 4. Entidad a la que aplica

Este documento aplica a las 17 entidades de catálogo maestro listadas en la sección de Propósito. Cada entidad tiene un ciclo de vida propio con estatus inicial **Activo** al crearse y estatus terminal **Inactivo** al darse de baja lógicamente; ningún catálogo contempla borrado físico, para preservar la trazabilidad histórica de las operaciones que los referencian (pólizas, clientes, empleados).

## 5. Índice de requerimientos

> **Navegación rápida:** cada identificador RF en la primera columna es un enlace que lleva directamente al detalle del requerimiento. Hacer clic para ir al RF.

| RF | Título | Catálogo | Aplica a |
|----|--------|----------|----------|
| [RF-01](#rf-01) | Registrar ramo | Ramos | Catálogo de Ramos |
| [RF-02](#rf-02) | Validar unicidad del nombre | Ramos | Catálogo de Ramos |
| [RF-03](#rf-03) | Asociar aseguradoras al ramo | Ramos | Catálogo de Ramos |
| [RF-04](#rf-04) | Consultar y filtrar ramos | Ramos | Catálogo de Ramos |
| [RF-05](#rf-05) | Restringir eliminación de ramo vinculado a pólizas | Ramos | Catálogo de Ramos |
| [RF-06](#rf-06) | Registrar aseguradora | Aseguradoras | Catálogo de Aseguradoras |
| [RF-07](#rf-07) | Validar unicidad del identificador fiscal | Aseguradoras | Catálogo de Aseguradoras |
| [RF-08](#rf-08) | Asociar ramos a la aseguradora | Aseguradoras | Catálogo de Aseguradoras |
| [RF-09](#rf-09) | Consultar y filtrar aseguradoras | Aseguradoras | Catálogo de Aseguradoras |
| [RF-10](#rf-10) | Restringir eliminación con relaciones activas | Aseguradoras | Catálogo de Aseguradoras |
| [RF-11](#rf-11) | Registrar agente | Agentes | Catálogo de Agentes |
| [RF-12](#rf-12) | Clasificar agente como interno o externo | Agentes | Catálogo de Agentes |
| [RF-13](#rf-13) | Asociar aseguradora a agente externo | Agentes | Catálogo de Agentes |
| [RF-14](#rf-14) | Validar unicidad del documento de identificación | Agentes | Catálogo de Agentes |
| [RF-15](#rf-15) | Consultar y filtrar agentes | Agentes | Catálogo de Agentes |
| [RF-16](#rf-16) | Restringir inactivación de agente con relaciones activas | Agentes | Catálogo de Agentes |
| [RF-17](#rf-17) | Registrar cliente | Clientes | Catálogo de Clientes |
| [RF-18](#rf-18) | Validar unicidad del documento | Clientes | Catálogo de Clientes |
| [RF-19](#rf-19) | Asociar solicitante titular a cliente persona moral | Clientes | Catálogo de Clientes |
| [RF-20](#rf-20) | Asociar ubicación geográfica | Clientes | Catálogo de Clientes |
| [RF-21](#rf-21) | Consultar y filtrar clientes | Clientes | Catálogo de Clientes |
| [RF-22](#rf-22) | Restringir eliminación de cliente con pólizas | Clientes | Catálogo de Clientes |
| [RF-23](#rf-23) | Registrar empleado | Empleados | Catálogo de Empleados |
| [RF-24](#rf-24) | Validar unicidad del documento | Empleados | Catálogo de Empleados |
| [RF-25](#rf-25) | Exigir empresa válida y activa | Empleados | Catálogo de Empleados |
| [RF-26](#rf-26) | Exigir puesto laboral válido y activo | Empleados | Catálogo de Empleados |
| [RF-27](#rf-27) | Consultar y filtrar empleados | Empleados | Catálogo de Empleados |
| [RF-28](#rf-28) | Restringir inactivación con pólizas vigentes | Empleados | Catálogo de Empleados |
| [RF-29](#rf-29) | Registrar empresa | Empresas | Catálogo de Empresas |
| [RF-30](#rf-30) | Validar unicidad del identificador fiscal | Empresas | Catálogo de Empresas |
| [RF-31](#rf-31) | Asociar ubicación geográfica | Empresas | Catálogo de Empresas |
| [RF-32](#rf-32) | Consultar empresas y sus empleados | Empresas | Catálogo de Empresas |
| [RF-33](#rf-33) | Restringir eliminación con relaciones activas | Empresas | Catálogo de Empresas |
| [RF-34](#rf-34) | Registrar grupo | Grupos | Catálogo de Grupos |
| [RF-35](#rf-35) | Restringir tipo de agrupación a lista predefinida | Grupos | Catálogo de Grupos |
| [RF-36](#rf-36) | Asociar elementos al grupo según su tipo | Grupos | Catálogo de Grupos |
| [RF-37](#rf-37) | Consultar y filtrar grupos | Grupos | Catálogo de Grupos |
| [RF-38](#rf-38) | Restringir eliminación de grupo vinculado a póliza | Grupos | Catálogo de Grupos |
| [RF-39](#rf-39) | Registrar moneda | Monedas | Catálogo de Monedas |
| [RF-40](#rf-40) | Validar unicidad del código ISO | Monedas | Catálogo de Monedas |
| [RF-41](#rf-41) | Definir moneda estándar/base | Monedas | Catálogo de Monedas |
| [RF-42](#rf-42) | Consultar monedas disponibles | Monedas | Catálogo de Monedas |
| [RF-43](#rf-43) | Restringir inactivación de moneda en uso | Monedas | Catálogo de Monedas |
| [RF-44](#rf-44) | Registrar país | Países | Catálogo de Países |
| [RF-45](#rf-45) | Validar unicidad del código ISO | Países | Catálogo de Países |
| [RF-46](#rf-46) | Consultar país con sus estados asociados | Países | Catálogo de Países |
| [RF-47](#rf-47) | Restringir eliminación de país con dependencias | Países | Catálogo de Países |
| [RF-48](#rf-48) | Registrar estado/provincia | Estados | Catálogo de Estados |
| [RF-49](#rf-49) | Exigir país válido y activo | Estados | Catálogo de Estados |
| [RF-50](#rf-50) | Validar unicidad del nombre dentro del país | Estados | Catálogo de Estados |
| [RF-51](#rf-51) | Consultar estados filtrando por país | Estados | Catálogo de Estados |
| [RF-52](#rf-52) | Restringir eliminación de estado con dependencias | Estados | Catálogo de Estados |
| [RF-53](#rf-53) | Registrar ciudad | Ciudades | Catálogo de Ciudades |
| [RF-54](#rf-54) | Exigir estado válido y activo | Ciudades | Catálogo de Ciudades |
| [RF-55](#rf-55) | Validar unicidad del nombre dentro del estado | Ciudades | Catálogo de Ciudades |
| [RF-56](#rf-56) | Consultar ciudades con jerarquía completa | Ciudades | Catálogo de Ciudades |
| [RF-57](#rf-57) | Restringir eliminación de ciudad referenciada | Ciudades | Catálogo de Ciudades |
| [RF-58](#rf-58) | Registrar puesto laboral | Puestos Laborales | Catálogo de Puestos Laborales |
| [RF-59](#rf-59) | Validar unicidad del nombre | Puestos Laborales | Catálogo de Puestos Laborales |
| [RF-60](#rf-60) | Asociar nivel de riesgo al puesto | Puestos Laborales | Catálogo de Puestos Laborales |
| [RF-61](#rf-61) | Consultar y filtrar puestos laborales | Puestos Laborales | Catálogo de Puestos Laborales |
| [RF-62](#rf-62) | Restringir eliminación de puesto asignado | Puestos Laborales | Catálogo de Puestos Laborales |
| [RF-63](#rf-63) | Registrar solicitante titular | Solicitante Titulares | Catálogo de Solicitante Titulares |
| [RF-64](#rf-64) | Validar unicidad del documento | Solicitante Titulares | Catálogo de Solicitante Titulares |
| [RF-65](#rf-65) | Asociar empresa cuando el vínculo es responsable de empresa | Solicitante Titulares | Catálogo de Solicitante Titulares |
| [RF-66](#rf-66) | Consultar y filtrar solicitantes titulares | Solicitante Titulares | Catálogo de Solicitante Titulares |
| [RF-67](#rf-67) | Restringir eliminación con solicitudes activas | Solicitante Titulares | Catálogo de Solicitante Titulares |
| [RF-68](#rf-68) | Registrar tipo de clasificación | Tipos Clasificación | Catálogo de Tipos Clasificación |
| [RF-69](#rf-69) | Validar unicidad del nombre | Tipos Clasificación | Catálogo de Tipos Clasificación |
| [RF-70](#rf-70) | Asociar tipo de clasificación a la póliza | Tipos Clasificación | Catálogo de Tipos Clasificación |
| [RF-71](#rf-71) | Consultar tipos de clasificación | Tipos Clasificación | Catálogo de Tipos Clasificación |
| [RF-72](#rf-72) | Restringir eliminación referenciada en pólizas | Tipos Clasificación | Catálogo de Tipos Clasificación |
| [RF-73](#rf-73) | Registrar tipo de aeronave | Tipos Aeronave | Catálogo de Tipos Aeronave |
| [RF-74](#rf-74) | Validar unicidad del nombre | Tipos Aeronave | Catálogo de Tipos Aeronave |
| [RF-75](#rf-75) | Permitir múltiples tipos aplicables por aeronave asegurada | Tipos Aeronave | Catálogo de Tipos Aeronave |
| [RF-76](#rf-76) | Consultar y filtrar tipos de aeronave | Tipos Aeronave | Catálogo de Tipos Aeronave |
| [RF-77](#rf-77) | Restringir eliminación referenciada en pólizas | Tipos Aeronave | Catálogo de Tipos Aeronave |
| [RF-78](#rf-78) | Registrar tipo de asegurado | Tipos Asegurado | Catálogo de Tipos Asegurado |
| [RF-79](#rf-79) | Restringir nivel de riesgo a valores predefinidos | Tipos Asegurado | Catálogo de Tipos Asegurado |
| [RF-80](#rf-80) | Asociar nivel de riesgo a puestos laborales | Tipos Asegurado | Catálogo de Tipos Asegurado |
| [RF-81](#rf-81) | Consultar tipos de asegurado y puestos asociados | Tipos Asegurado | Catálogo de Tipos Asegurado |
| [RF-82](#rf-82) | Restringir eliminación referenciada | Tipos Asegurado | Catálogo de Tipos Asegurado |
| [RF-83](#rf-83) | Registrar tipo de vehículo | Tipos Vehículo | Catálogo de Tipos Vehículo |
| [RF-84](#rf-84) | Validar unicidad del nombre | Tipos Vehículo | Catálogo de Tipos Vehículo |
| [RF-85](#rf-85) | Asociar tipo de vehículo a un vehículo asegurado | Tipos Vehículo | Catálogo de Tipos Vehículo |
| [RF-86](#rf-86) | Consultar y filtrar tipos de vehículo | Tipos Vehículo | Catálogo de Tipos Vehículo |
| [RF-87](#rf-87) | Restringir eliminación referenciada | Tipos Vehículo | Catálogo de Tipos Vehículo |

---

## Catálogo de Ramos

Tipos de ramos en los que se podrán gestionar las pólizas de seguro.

<a id="rf-01"></a>
# RF-01 — Registrar ramo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo ramo de seguro capturando nombre, descripción y estado.

## HU-1.1 — Registrar ramo

Como administrador de catálogos, quiero registrar un nuevo ramo de seguro, para poder gestionar pólizas bajo esa clasificación.

### Reglas de negocio

**RN-1.1** El nombre del ramo es obligatorio.

### Criterios de Aceptación

**CA-1.1.1 — Registro exitoso**
Dado que se captura el nombre y descripción del ramo
Cuando se presiona Guardar
Entonces el sistema crea el ramo en estado "activo".

**CA-1.1.2 — Nombre faltante**
Dado que no se captura el nombre del ramo
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-02"></a>
# RF-02 — Validar unicidad del nombre

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el nombre del ramo no esté duplicado en el catálogo.

## HU-2.1 — Validar nombre único

Como administrador de catálogos, quiero que el sistema valide que el nombre del ramo no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-2.1** El nombre del ramo debe ser único en el catálogo.

### Criterios de Aceptación

**CA-2.1.1 — Nombre duplicado**
Dado que ya existe un ramo con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

---

<a id="rf-03"></a>
# RF-03 — Asociar aseguradoras al ramo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-06 (Catálogo de Aseguradoras) |

## Descripción
El sistema deberá permitir asociar a cada ramo las aseguradoras que lo ofrecen.

## HU-3.1 — Asociar aseguradoras

Como administrador de catálogos, quiero asociar a cada ramo las aseguradoras que lo ofrecen, para saber con quién se puede contratar ese tipo de seguro.

### Reglas de negocio

**RN-3.1** Las aseguradoras asociadas deben seleccionarse del catálogo de Aseguradoras y estar activas.

### Criterios de Aceptación

**CA-3.1.1 — Asociación exitosa**
Dado que el administrador edita un ramo
Cuando selecciona una o más aseguradoras activas
Entonces el sistema guarda la asociación.

---

<a id="rf-04"></a>
# RF-04 — Consultar y filtrar ramos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar ramos por aseguradora asociada o estado.

## HU-4.1 — Consultar ramos

Como usuario del sistema, quiero filtrar ramos por aseguradora asociada o estado, para ubicar rápidamente el ramo que necesito.

### Reglas de negocio

**RN-4.1** El listado debe permitir filtrar por aseguradora asociada y estado.

### Criterios de Aceptación

**CA-4.1.1 — Filtro por aseguradora**
Dado que el usuario filtra por una aseguradora específica
Cuando aplica el filtro
Entonces el sistema muestra solo los ramos asociados a esa aseguradora.

---

<a id="rf-05"></a>
# RF-05 — Restringir eliminación de ramo vinculado a pólizas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un ramo que esté referenciado en pólizas vigentes.

## HU-5.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un ramo vinculado a pólizas vigentes, para no afectar la cobertura activa.

### Reglas de negocio

**RN-5.1** Un ramo no puede eliminarse si está referenciado en pólizas vigentes.

### Criterios de Aceptación

**CA-5.1.1 — Eliminación bloqueada**
Dado que un ramo está vinculado a pólizas vigentes
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Aseguradoras

Registro de las compañías aseguradoras con las que Civentor contrata pólizas.

<a id="rf-06"></a>
# RF-06 — Registrar aseguradora

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar una nueva aseguradora capturando razón social, nombre comercial, identificador fiscal, país, dirección, contacto principal y estado.

## HU-6.1 — Registrar aseguradora

Como administrador de catálogos, quiero registrar una nueva aseguradora con sus datos generales, para llevar el control de las compañías con las que Civentor contrata pólizas.

### Reglas de negocio

**RN-6.1** La razón social y el identificador fiscal son obligatorios para guardar el registro.

### Criterios de Aceptación

**CA-6.1.1 — Registro exitoso**
Dado que el administrador captura razón social, identificador fiscal, país y dirección válidos
Cuando presiona Guardar
Entonces el sistema crea la aseguradora en estado "activo".

**CA-6.1.2 — Datos incompletos**
Dado que el administrador intenta guardar una aseguradora sin razón social
Cuando presiona Guardar
Entonces el sistema muestra un error y no crea el registro.

---

<a id="rf-07"></a>
# RF-07 — Validar unicidad del identificador fiscal

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el identificador fiscal de la aseguradora no esté duplicado en el catálogo.

## HU-7.1 — Validar identificador único

Como administrador de catálogos, quiero que el sistema valide que el identificador fiscal de la aseguradora no esté duplicado, para evitar registrar la misma compañía dos veces.

### Reglas de negocio

**RN-7.1** El identificador fiscal debe ser único en todo el catálogo de aseguradoras.

### Criterios de Aceptación

**CA-7.1.1 — Identificador duplicado**
Dado que ya existe una aseguradora con un identificador fiscal específico
Cuando el administrador intenta registrar otra con el mismo dato
Entonces el sistema rechaza el guardado.

---

<a id="rf-08"></a>
# RF-08 — Asociar ramos a la aseguradora

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-01 (Catálogo de Ramos) |

## Descripción
El sistema deberá permitir asociar a cada aseguradora los ramos (catálogo de Ramos) en los que opera.

## HU-8.1 — Asociar ramos

Como administrador de catálogos, quiero asociar a cada aseguradora los ramos en los que opera, para saber qué tipos de seguro puede ofrecer cada una.

### Reglas de negocio

**RN-8.1** Los ramos asociados deben seleccionarse únicamente del catálogo de Ramos y solo pueden ser ramos activos.

### Criterios de Aceptación

**CA-8.1.1 — Asociación de ramos exitosa**
Dado que el administrador edita una aseguradora
Cuando selecciona uno o más ramos activos del catálogo
Entonces el sistema guarda la asociación y la refleja en el detalle de la aseguradora.

**CA-8.1.2 — Ramo inactivo no seleccionable**
Dado que el administrador intenta asociar un ramo inactivo
Cuando busca dicho ramo en el selector
Entonces el sistema no lo muestra como opción disponible.

---

<a id="rf-09"></a>
# RF-09 — Consultar y filtrar aseguradoras

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar y filtrar aseguradoras por país, ramo asociado y estado.

## HU-9.1 — Consultar aseguradoras

Como usuario del sistema, quiero consultar y filtrar aseguradoras por país, ramo o estado, para ubicar rápidamente la aseguradora que necesito.

### Reglas de negocio

**RN-9.1** El listado debe permitir combinar filtros de país, ramo asociado y estado simultáneamente.

### Criterios de Aceptación

**CA-9.1.1 — Filtro por ramo**
Dado que el usuario filtra por un ramo específico
Cuando aplica el filtro
Entonces el sistema muestra solo las aseguradoras que tienen ese ramo asociado.

---

<a id="rf-10"></a>
# RF-10 — Restringir eliminación con relaciones activas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar o inactivar una aseguradora que tenga agentes externos activos o pólizas vigentes asociadas.

## HU-10.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar una aseguradora con agentes o pólizas vigentes, para no romper la integridad de la información.

### Reglas de negocio

**RN-10.1** Una aseguradora no puede eliminarse ni inactivarse si tiene agentes externos activos o pólizas vigentes asociadas.

### Criterios de Aceptación

**CA-10.1.1 — Eliminación bloqueada**
Dado que una aseguradora tiene pólizas vigentes
Cuando el administrador intenta eliminarla
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Agentes

Registro de agentes de venta internos (Civentor) o externos (aseguradoras).

<a id="rf-11"></a>
# RF-11 — Registrar agente

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo agente capturando nombre completo, tipo de agente, documento de identificación, correo, teléfono y estado.

## HU-11.1 — Registrar agente

Como administrador de catálogos, quiero registrar un nuevo agente con sus datos básicos, para mantener actualizado el directorio de agentes de venta que operan con Civentor.

### Reglas de negocio

**RN-11.1** El nombre completo, tipo de agente y documento de identificación son campos obligatorios para guardar el registro.

### Criterios de Aceptación

**CA-11.1.1 — Registro exitoso**
Dado que el administrador está en la pantalla de nuevo agente
Cuando captura nombre completo, tipo de agente, documento, correo y teléfono válidos y presiona Guardar
Entonces el sistema crea el agente con estado "activo" y lo muestra en el listado.

**CA-11.1.2 — Campos obligatorios faltantes**
Dado que el administrador está registrando un agente
Cuando intenta guardar sin capturar el nombre completo o el tipo de agente
Entonces el sistema muestra un mensaje de error indicando los campos faltantes y no guarda el registro.

---

<a id="rf-12"></a>
# RF-12 — Clasificar agente como interno o externo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir clasificar al agente como interno (perteneciente a Civentor) o externo (perteneciente a una aseguradora), restringiendo el campo a estos dos valores.

## HU-12.1 — Clasificar tipo de agente

Como administrador de catálogos, quiero clasificar a cada agente como interno o externo, para saber si pertenece a Civentor o a una aseguradora.

### Reglas de negocio

**RN-12.1** El campo "tipo de agente" es obligatorio y solo admite los valores "interno" y "externo".

### Criterios de Aceptación

**CA-12.1.1 — Clasificación correcta**
Dado que el administrador está registrando un agente
Cuando selecciona el tipo "interno" o "externo" de la lista predefinida
Entonces el sistema acepta el valor y lo asocia al agente.

**CA-12.1.2 — Valor no permitido**
Dado que el administrador intenta guardar un agente
Cuando el campo tipo de agente queda vacío o con un valor distinto a los predefinidos
Entonces el sistema rechaza el guardado y solicita seleccionar un valor válido.

---

<a id="rf-13"></a>
# RF-13 — Asociar aseguradora a agente externo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-06 (Catálogo de Aseguradoras) |

## Descripción
El sistema deberá exigir la selección de la aseguradora a la que pertenece un agente externo, tomándola del catálogo de Aseguradoras.

## HU-13.1 — Asociar aseguradora al agente externo

Como administrador de catálogos, quiero asociar una aseguradora a los agentes externos, para identificar a qué aseguradora representan.

### Reglas de negocio

**RN-13.1** Si el tipo de agente es "externo", el campo aseguradora es obligatorio y debe seleccionarse de una aseguradora activa del catálogo.

### Criterios de Aceptación

**CA-13.1.1 — Asociación exitosa**
Dado que el administrador registra un agente de tipo externo
Cuando selecciona una aseguradora activa del catálogo
Entonces el sistema guarda la asociación correctamente.

**CA-13.1.2 — Aseguradora obligatoria omitida**
Dado que el administrador registra un agente de tipo externo
Cuando intenta guardar sin seleccionar una aseguradora
Entonces el sistema muestra un error indicando que la aseguradora es obligatoria para agentes externos.

---

<a id="rf-14"></a>
# RF-14 — Validar unicidad del documento de identificación

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el documento de identificación de un agente no esté duplicado dentro del catálogo.

## HU-14.1 — Validar documento único

Como administrador de catálogos, quiero que el sistema valide que el documento de identificación de un agente no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-14.1** El documento de identificación debe ser único entre todos los agentes del catálogo, sin importar su estado.

### Criterios de Aceptación

**CA-14.1.1 — Documento duplicado**
Dado que ya existe un agente registrado con un documento específico
Cuando el administrador intenta registrar otro agente con el mismo documento
Entonces el sistema rechaza el guardado e informa que el documento ya existe.

---

<a id="rf-15"></a>
# RF-15 — Consultar y filtrar agentes

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar y filtrar el listado de agentes por tipo, aseguradora asociada y estado.

## HU-15.1 — Consultar agentes

Como usuario del sistema, quiero consultar y filtrar el listado de agentes por tipo, aseguradora y estado, para ubicar rápidamente al agente que necesito.

### Reglas de negocio

**RN-15.1** El listado debe mostrarse paginado y respetar los filtros combinados que el usuario seleccione.

### Criterios de Aceptación

**CA-15.1.1 — Filtro aplicado**
Dado que el usuario está en el listado de agentes
Cuando selecciona el filtro tipo="externo" y una aseguradora específica
Entonces el sistema muestra únicamente los agentes externos asociados a esa aseguradora.

---

<a id="rf-16"></a>
# RF-16 — Restringir inactivación de agente con relaciones activas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir inactivar un agente que tenga pólizas o clientes activos asignados.

## HU-16.1 — Restringir inactivación

Como administrador de catálogos, quiero que el sistema impida inactivar un agente con pólizas o clientes activos, para no perder la trazabilidad de las operaciones vigentes.

### Reglas de negocio

**RN-16.1** Un agente no puede inactivarse si tiene pólizas vigentes o clientes activos asignados directamente a él.

### Criterios de Aceptación

**CA-16.1.1 — Inactivación bloqueada**
Dado que un agente tiene pólizas vigentes asociadas
Cuando el administrador intenta inactivarlo
Entonces el sistema bloquea la acción y muestra un mensaje explicando la causa.

**CA-16.1.2 — Inactivación permitida**
Dado que un agente no tiene pólizas ni clientes activos asociados
Cuando el administrador lo inactiva
Entonces el sistema cambia su estado a "inactivo" exitosamente.

---

## Catálogo de Clientes

Registro de clientes que han contratado pólizas de seguro.

<a id="rf-17"></a>
# RF-17 — Registrar cliente

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo cliente indicando si es persona física o moral, junto con documento de identificación, dirección, ubicación geográfica, correo, teléfono y estado.

## HU-17.1 — Registrar cliente

Como agente o administrador, quiero registrar un nuevo cliente indicando si es persona física o moral, para poder asociarle pólizas de seguro.

### Reglas de negocio

**RN-17.1** El tipo de cliente, nombre/razón social y documento de identificación son obligatorios.

### Criterios de Aceptación

**CA-17.1.1 — Registro exitoso**
Dado que se capturan todos los datos obligatorios de un cliente persona física
Cuando se presiona Guardar
Entonces el sistema crea el cliente en estado "activo".

**CA-17.1.2 — Datos obligatorios faltantes**
Dado que falta el documento de identificación
Cuando se intenta guardar el cliente
Entonces el sistema muestra un error y no guarda el registro.

---

<a id="rf-18"></a>
# RF-18 — Validar unicidad del documento

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el documento de identificación del cliente no esté duplicado en el catálogo.

## HU-18.1 — Validar documento único

Como administrador de catálogos, quiero que el sistema valide que el documento de identificación del cliente no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-18.1** El documento de identificación debe ser único en el catálogo de Clientes.

### Criterios de Aceptación

**CA-18.1.1 — Documento duplicado**
Dado que ya existe un cliente con un documento específico
Cuando se intenta registrar otro cliente con el mismo documento
Entonces el sistema rechaza el guardado.

---

<a id="rf-19"></a>
# RF-19 — Asociar solicitante titular a cliente persona moral

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-63 (Catálogo de Solicitante Titulares) |

## Descripción
El sistema deberá exigir la asociación de un solicitante titular cuando el cliente sea de tipo persona moral.

## HU-19.1 — Asociar solicitante titular

Como agente, quiero asociar un solicitante titular a los clientes de tipo persona moral, para identificar al responsable que gestiona la contratación del seguro.

### Reglas de negocio

**RN-19.1** Si el cliente es persona moral, el campo solicitante titular es obligatorio y debe existir en el catálogo correspondiente.

### Criterios de Aceptación

**CA-19.1.1 — Asociación exitosa**
Dado que se registra un cliente persona moral
Cuando se selecciona un solicitante titular existente
Entonces el sistema guarda la asociación.

**CA-19.1.2 — Solicitante titular obligatorio omitido**
Dado que se registra un cliente persona moral sin solicitante titular
Cuando se intenta guardar
Entonces el sistema muestra un error solicitando el dato.

---

<a id="rf-20"></a>
# RF-20 — Asociar ubicación geográfica

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-44, RF-48, RF-53 (Catálogos de Países, Estados, Ciudades) |

## Descripción
El sistema deberá permitir indicar el país, estado y ciudad del cliente, respetando la jerarquía geográfica del sistema.

## HU-20.1 — Asociar ubicación

Como agente, quiero indicar el país, estado y ciudad del cliente, para tener su ubicación completa registrada.

### Reglas de negocio

**RN-20.1** La ciudad seleccionada debe pertenecer al estado seleccionado, y el estado al país seleccionado, respetando la jerarquía del catálogo.

### Criterios de Aceptación

**CA-20.1.1 — Selección jerárquica correcta**
Dado que el agente selecciona un país
Cuando elige el estado y luego la ciudad
Entonces el sistema solo muestra los estados de ese país y las ciudades de ese estado.

**CA-20.1.2 — Jerarquía inconsistente**
Dado que el agente intenta guardar un cliente con una ciudad que no corresponde al estado seleccionado
Cuando presiona Guardar
Entonces el sistema rechaza el registro e indica la inconsistencia.

---

<a id="rf-21"></a>
# RF-21 — Consultar y filtrar clientes

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar clientes por tipo, ubicación, agente asignado o estado.

## HU-21.1 — Consultar clientes

Como usuario del sistema, quiero filtrar clientes por tipo, ubicación, agente asignado o estado, para ubicar rápidamente al cliente que busco.

### Reglas de negocio

**RN-21.1** El listado debe permitir combinar múltiples filtros y mostrar resultados paginados.

### Criterios de Aceptación

**CA-21.1.1 — Filtro combinado**
Dado que el usuario filtra por país y agente asignado
Cuando aplica el filtro
Entonces el sistema muestra solo los clientes que cumplen ambas condiciones.

---

<a id="rf-22"></a>
# RF-22 — Restringir eliminación de cliente con pólizas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un cliente que tenga pólizas activas o histórico de pólizas asociado.

## HU-22.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un cliente con pólizas activas o histórico, para conservar la trazabilidad de sus operaciones.

### Reglas de negocio

**RN-22.1** Un cliente no puede eliminarse si tiene al menos una póliza activa o histórica asociada.

### Criterios de Aceptación

**CA-22.1.1 — Eliminación bloqueada**
Dado que un cliente tiene pólizas históricas
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción y sugiere inactivarlo en su lugar.

---

## Catálogo de Empleados

Registro de empleados que pertenecen al grupo empresarial.

<a id="rf-23"></a>
# RF-23 — Registrar empleado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo empleado asociado a una empresa y a un puesto laboral, capturando nombre, documento, correo, teléfono y estado.

## HU-23.1 — Registrar empleado

Como administrador de recursos humanos o de catálogos, quiero registrar un nuevo empleado asociado a una empresa y un puesto laboral, para incluirlo en las pólizas grupales correspondientes.

### Reglas de negocio

**RN-23.1** El documento de identificación, la empresa y el puesto laboral son obligatorios para guardar el registro.

### Criterios de Aceptación

**CA-23.1.1 — Registro exitoso**
Dado que se capturan nombre, documento, empresa y puesto laboral válidos
Cuando se presiona Guardar
Entonces el sistema crea el empleado en estado "activo".

**CA-23.1.2 — Datos obligatorios faltantes**
Dado que no se selecciona un puesto laboral
Cuando se intenta guardar el empleado
Entonces el sistema muestra un error.

---

<a id="rf-24"></a>
# RF-24 — Validar unicidad del documento

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el documento de identificación del empleado no esté duplicado en el catálogo.

## HU-24.1 — Validar documento único

Como administrador de catálogos, quiero que el sistema valide que el documento de identificación del empleado no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-24.1** El documento de identificación debe ser único en el catálogo de Empleados.

### Criterios de Aceptación

**CA-24.1.1 — Documento duplicado**
Dado que ya existe un empleado con un documento específico
Cuando se intenta registrar otro con el mismo documento
Entonces el sistema rechaza el guardado.

---

<a id="rf-25"></a>
# RF-25 — Exigir empresa válida y activa

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-29 (Catálogo de Empresas) |

## Descripción
El sistema deberá permitir asociar empleados únicamente a empresas en estado activo.

## HU-25.1 — Exigir empresa activa

Como administrador de catálogos, quiero que el sistema solo permita asociar empleados a empresas activas, para evitar vincular personal a empresas dadas de baja.

### Reglas de negocio

**RN-25.1** El campo empresa solo admite empresas en estado "activo" del catálogo de Empresas.

### Criterios de Aceptación

**CA-25.1.1 — Empresa inactiva no disponible**
Dado que una empresa está inactiva
Cuando el administrador busca empresas en el selector al registrar un empleado
Entonces esa empresa no aparece como opción.

---

<a id="rf-26"></a>
# RF-26 — Exigir puesto laboral válido y activo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-58 (Catálogo de Puestos Laborales) |

## Descripción
El sistema deberá permitir asociar empleados únicamente a puestos laborales en estado activo.

## HU-26.1 — Exigir puesto activo

Como administrador de catálogos, quiero que el sistema solo permita asociar empleados a puestos laborales activos, para mantener consistencia en la clasificación de riesgo.

### Reglas de negocio

**RN-26.1** El campo puesto laboral solo admite valores activos del catálogo de Puestos Laborales.

### Criterios de Aceptación

**CA-26.1.1 — Puesto inactivo no disponible**
Dado que un puesto laboral está inactivo
Cuando el administrador busca puestos en el selector
Entonces ese puesto no aparece como opción.

---

<a id="rf-27"></a>
# RF-27 — Consultar y filtrar empleados

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar empleados por empresa, puesto laboral o estado.

## HU-27.1 — Consultar empleados

Como usuario del sistema, quiero filtrar empleados por empresa, puesto laboral o estado, para ubicar rápidamente al personal que necesito.

### Reglas de negocio

**RN-27.1** El listado debe permitir combinar filtros y mostrarse paginado.

### Criterios de Aceptación

**CA-27.1.1 — Filtro por empresa y puesto**
Dado que el usuario filtra por una empresa y un puesto laboral específicos
Cuando aplica el filtro
Entonces el sistema muestra solo los empleados que cumplen ambas condiciones.

---

<a id="rf-28"></a>
# RF-28 — Restringir inactivación con pólizas vigentes

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir inactivar un empleado que tenga pólizas grupales vigentes asociadas a su nombre.

## HU-28.1 — Restringir inactivación

Como administrador de catálogos, quiero que el sistema impida inactivar un empleado con pólizas de grupo vigentes, para no afectar su cobertura activa.

### Reglas de negocio

**RN-28.1** Un empleado no puede inactivarse si tiene pólizas grupales vigentes asociadas a su nombre.

### Criterios de Aceptación

**CA-28.1.1 — Inactivación bloqueada**
Dado que un empleado tiene una póliza grupal vigente
Cuando el administrador intenta inactivarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Empresas

Registro de empresas que pertenecen al grupo.

<a id="rf-29"></a>
# RF-29 — Registrar empresa

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar una nueva empresa del grupo empresarial, capturando razón social, identificador fiscal, ubicación, sector/giro y estado.

## HU-29.1 — Registrar empresa

Como administrador de catálogos, quiero registrar una nueva empresa del grupo empresarial, para poder asociarle empleados y pólizas.

### Reglas de negocio

**RN-29.1** La razón social y el identificador fiscal son obligatorios.

### Criterios de Aceptación

**CA-29.1.1 — Registro exitoso**
Dado que se capturan razón social, identificador fiscal y ubicación válidos
Cuando se presiona Guardar
Entonces el sistema crea la empresa en estado "activo".

**CA-29.1.2 — Datos incompletos**
Dado que falta el identificador fiscal
Cuando se intenta guardar la empresa
Entonces el sistema muestra un error.

---

<a id="rf-30"></a>
# RF-30 — Validar unicidad del identificador fiscal

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el identificador fiscal de la empresa no esté duplicado en el catálogo.

## HU-30.1 — Validar identificador único

Como administrador de catálogos, quiero que el sistema valide que el identificador fiscal de la empresa no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-30.1** El identificador fiscal debe ser único en el catálogo de Empresas.

### Criterios de Aceptación

**CA-30.1.1 — Identificador duplicado**
Dado que ya existe una empresa con un identificador fiscal específico
Cuando se intenta registrar otra con el mismo dato
Entonces el sistema rechaza el guardado.

---

<a id="rf-31"></a>
# RF-31 — Asociar ubicación geográfica

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-44, RF-48, RF-53 (Catálogos de Países, Estados, Ciudades) |

## Descripción
El sistema deberá permitir indicar el país, estado y ciudad de la empresa, respetando la jerarquía geográfica del sistema.

## HU-31.1 — Asociar ubicación

Como administrador de catálogos, quiero indicar el país, estado y ciudad de la empresa, para tener su domicilio completo registrado.

### Reglas de negocio

**RN-31.1** La ciudad debe corresponder al estado seleccionado, y el estado al país seleccionado.

### Criterios de Aceptación

**CA-31.1.1 — Selección jerárquica correcta**
Dado que se selecciona un país y un estado
Cuando se elige la ciudad
Entonces el sistema solo muestra ciudades pertenecientes a ese estado.

---

<a id="rf-32"></a>
# RF-32 — Consultar empresas y sus empleados

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-23 (Catálogo de Empleados) |

## Descripción
El sistema deberá permitir consultar el listado de empresas y visualizar sus empleados asociados.

## HU-32.1 — Consultar empresas

Como usuario del sistema, quiero consultar el listado de empresas y ver sus empleados asociados, para tener visibilidad de la estructura del grupo.

### Reglas de negocio

**RN-32.1** El detalle de la empresa debe mostrar el conteo y listado de empleados activos asociados.

### Criterios de Aceptación

**CA-32.1.1 — Consulta de empleados asociados**
Dado que una empresa tiene empleados registrados
Cuando el usuario abre su detalle
Entonces el sistema muestra el listado de empleados asociados a esa empresa.

---

<a id="rf-33"></a>
# RF-33 — Restringir eliminación con relaciones activas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar una empresa que tenga empleados activos o pólizas grupales vigentes.

## HU-33.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar una empresa con empleados o pólizas activas, para no perder información operativa.

### Reglas de negocio

**RN-33.1** Una empresa no puede eliminarse si tiene empleados activos o pólizas grupales vigentes.

### Criterios de Aceptación

**CA-33.1.1 — Eliminación bloqueada**
Dado que una empresa tiene empleados activos
Cuando el administrador intenta eliminarla
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Grupos

Agrupaciones a las que puede aplicarse una póliza (familiares, personas, puestos de personal, tractocamiones, vehículos utilitarios, montacargas, vehículos de uso personal).

<a id="rf-34"></a>
# RF-34 — Registrar grupo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo grupo indicando su tipo de agrupación, nombre y estado.

## HU-34.1 — Registrar grupo

Como administrador de catálogos, quiero registrar un nuevo grupo indicando su tipo de agrupación, para poder aplicarle pólizas colectivas.

### Reglas de negocio

**RN-34.1** El nombre del grupo y el tipo de agrupación son obligatorios.

### Criterios de Aceptación

**CA-34.1.1 — Registro exitoso**
Dado que se captura el nombre del grupo y se selecciona un tipo de agrupación válido
Cuando se presiona Guardar
Entonces el sistema crea el grupo en estado "activo".

**CA-34.1.2 — Tipo de agrupación faltante**
Dado que no se selecciona un tipo de agrupación
Cuando se intenta guardar el grupo
Entonces el sistema muestra un error.

---

<a id="rf-35"></a>
# RF-35 — Restringir tipo de agrupación a lista predefinida

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá restringir el tipo de agrupación a una lista cerrada: familiar, grupo de personas, puestos de personal, tractocamiones, vehículos utilitarios, montacargas, vehículos de uso personal.

## HU-35.1 — Restringir tipo de agrupación

Como administrador de catálogos, quiero que el tipo de agrupación se seleccione de una lista cerrada, para mantener consistencia en la clasificación.

### Reglas de negocio

**RN-35.1** El campo tipo de agrupación no admite texto libre, solo los valores predefinidos.

### Criterios de Aceptación

**CA-35.1.1 — Selección válida**
Dado que el administrador registra un grupo
Cuando selecciona uno de los tipos predefinidos
Entonces el sistema lo acepta sin permitir edición manual del texto.

---

<a id="rf-36"></a>
# RF-36 — Asociar elementos al grupo según su tipo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-23, RF-58, RF-83 (Catálogos de Empleados, Puestos Laborales, Tipos Vehículo) |

## Descripción
El sistema deberá permitir asociar al grupo los elementos que lo componen (miembros familiares, vehículos, puestos laborales, etc.) validando que correspondan al catálogo relacionado con el tipo seleccionado.

## HU-36.1 — Asociar elementos al grupo

Como administrador de catálogos, quiero asociar al grupo los elementos que lo componen según el tipo seleccionado, para reflejar correctamente su composición.

### Reglas de negocio

**RN-36.1** Los elementos asociados deben pertenecer al catálogo correspondiente al tipo de agrupación seleccionado (p. ej. un grupo de tipo "tractocamiones" solo admite vehículos del catálogo de Tipos Vehículo compatibles).

### Criterios de Aceptación

**CA-36.1.1 — Asociación consistente**
Dado que el grupo es de tipo "vehículos utilitarios"
Cuando el administrador selecciona vehículos del catálogo de Tipos Vehículo correspondiente
Entonces el sistema los asocia correctamente.

**CA-36.1.2 — Asociación inconsistente**
Dado que el grupo es de tipo "familiar"
Cuando el administrador intenta asociar un vehículo
Entonces el sistema rechaza la asociación por no corresponder al tipo del grupo.

---

<a id="rf-37"></a>
# RF-37 — Consultar y filtrar grupos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar grupos por tipo de agrupación y estado.

## HU-37.1 — Consultar grupos

Como usuario del sistema, quiero filtrar grupos por tipo de agrupación y estado, para ubicar rápidamente el grupo que necesito.

### Reglas de negocio

**RN-37.1** El listado debe permitir filtrar por tipo de agrupación y estado de forma combinada.

### Criterios de Aceptación

**CA-37.1.1 — Filtro aplicado**
Dado que el usuario filtra por tipo "montacargas"
Cuando aplica el filtro
Entonces el sistema muestra solo los grupos de ese tipo.

---

<a id="rf-38"></a>
# RF-38 — Restringir eliminación de grupo vinculado a póliza

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un grupo que esté referenciado en una póliza vigente.

## HU-38.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un grupo vinculado a una póliza vigente, para no afectar la cobertura activa.

### Reglas de negocio

**RN-38.1** Un grupo no puede eliminarse si está referenciado en una póliza vigente.

### Criterios de Aceptación

**CA-38.1.1 — Eliminación bloqueada**
Dado que un grupo está vinculado a una póliza vigente
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Monedas

Monedas utilizadas como estándar para las operaciones.

<a id="rf-39"></a>
# RF-39 — Registrar moneda

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar una nueva moneda capturando código ISO, nombre, símbolo y estado.

## HU-39.1 — Registrar moneda

Como administrador de catálogos, quiero registrar una nueva moneda con su código ISO y símbolo, para poder utilizarla como estándar en las operaciones.

### Reglas de negocio

**RN-39.1** El código ISO y el nombre de la moneda son obligatorios.

### Criterios de Aceptación

**CA-39.1.1 — Registro exitoso**
Dado que se captura un código ISO, nombre y símbolo válidos
Cuando se presiona Guardar
Entonces el sistema crea la moneda en estado "activo".

**CA-39.1.2 — Código ISO faltante**
Dado que no se captura el código ISO
Cuando se intenta guardar la moneda
Entonces el sistema muestra un error.

---

<a id="rf-40"></a>
# RF-40 — Validar unicidad del código ISO

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el código ISO de la moneda no esté duplicado en el catálogo.

## HU-40.1 — Validar código único

Como administrador de catálogos, quiero que el sistema valide que el código ISO de la moneda no esté duplicado, para evitar inconsistencias en las operaciones.

### Reglas de negocio

**RN-40.1** El código ISO debe ser único en el catálogo de Monedas.

### Criterios de Aceptación

**CA-40.1.1 — Código duplicado**
Dado que ya existe una moneda con un código ISO específico
Cuando se intenta registrar otra con el mismo código
Entonces el sistema rechaza el guardado.

---

<a id="rf-41"></a>
# RF-41 — Definir moneda estándar/base

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir definir una única moneda como estándar/base del sistema.

## HU-41.1 — Definir moneda base

Como administrador de catálogos, quiero definir una única moneda como estándar del sistema, para que sirva de referencia en los cálculos de las operaciones.

### Reglas de negocio

**RN-41.1** Solo puede existir una moneda marcada como "base" activa a la vez; al marcar una nueva, la anterior se desmarca automáticamente.

### Criterios de Aceptación

**CA-41.1.1 — Cambio de moneda base**
Dado que existe una moneda base activa
Cuando el administrador marca otra moneda como base
Entonces el sistema desmarca la anterior y establece la nueva como base.

---

<a id="rf-42"></a>
# RF-42 — Consultar monedas disponibles

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar el listado de monedas disponibles para su uso en pólizas y operaciones.

## HU-42.1 — Consultar monedas

Como usuario del sistema, quiero consultar el listado de monedas disponibles, para seleccionarlas al registrar una póliza u operación.

### Reglas de negocio

**RN-42.1** Solo las monedas activas deben mostrarse como opción seleccionable en otros módulos.

### Criterios de Aceptación

**CA-42.1.1 — Listado de monedas activas**
Dado que existen monedas activas e inactivas
Cuando el usuario abre el selector de moneda en una póliza
Entonces el sistema solo muestra las monedas activas.

---

<a id="rf-43"></a>
# RF-43 — Restringir inactivación de moneda en uso

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir inactivar una moneda que esté referenciada en pólizas u operaciones vigentes.

## HU-43.1 — Restringir inactivación

Como administrador de catálogos, quiero que el sistema impida inactivar una moneda utilizada en operaciones vigentes, para no afectar pólizas activas.

### Reglas de negocio

**RN-43.1** Una moneda no puede inactivarse si está referenciada en pólizas u operaciones vigentes.

### Criterios de Aceptación

**CA-43.1.1 — Inactivación bloqueada**
Dado que una moneda está siendo usada en una póliza vigente
Cuando el administrador intenta inactivarla
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Países

Base de la jerarquía geográfica del sistema (País > Estado > Ciudad).

<a id="rf-44"></a>
# RF-44 — Registrar país

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo país capturando nombre, código ISO y estado.

## HU-44.1 — Registrar país

Como administrador de catálogos, quiero registrar un nuevo país con su código ISO, para utilizarlo como base de la jerarquía geográfica del sistema.

### Reglas de negocio

**RN-44.1** El nombre y el código ISO del país son obligatorios.

### Criterios de Aceptación

**CA-44.1.1 — Registro exitoso**
Dado que se captura nombre y código ISO válidos
Cuando se presiona Guardar
Entonces el sistema crea el país en estado "activo".

**CA-44.1.2 — Código ISO faltante**
Dado que no se captura el código ISO
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-45"></a>
# RF-45 — Validar unicidad del código ISO

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el código ISO del país no esté duplicado en el catálogo.

## HU-45.1 — Validar código único

Como administrador de catálogos, quiero que el sistema valide que el código ISO del país no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-45.1** El código ISO debe ser único en el catálogo de Países.

### Criterios de Aceptación

**CA-45.1.1 — Código duplicado**
Dado que ya existe un país con un código ISO específico
Cuando se intenta registrar otro con el mismo código
Entonces el sistema rechaza el guardado.

---

<a id="rf-46"></a>
# RF-46 — Consultar país con sus estados asociados

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-48 (Catálogo de Estados) |

## Descripción
El sistema deberá permitir consultar un país y visualizar los estados/provincias asociados.

## HU-46.1 — Consultar jerarquía del país

Como usuario del sistema, quiero consultar un país y ver los estados/provincias asociados, para verificar la jerarquía geográfica configurada.

### Reglas de negocio

**RN-46.1** El detalle del país debe mostrar el listado de estados activos asociados.

### Criterios de Aceptación

**CA-46.1.1 — Consulta de jerarquía**
Dado que un país tiene estados registrados
Cuando el usuario abre su detalle
Entonces el sistema muestra el listado de estados asociados.

---

<a id="rf-47"></a>
# RF-47 — Restringir eliminación de país con dependencias

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un país que tenga estados, ciudades, clientes o empresas asociadas.

## HU-47.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un país con estados, clientes o empresas asociadas, para no romper la jerarquía geográfica ni la integridad de los datos.

### Reglas de negocio

**RN-47.1** Un país no puede eliminarse si tiene estados, ciudades, clientes o empresas asociadas, directa o indirectamente.

### Criterios de Aceptación

**CA-47.1.1 — Eliminación bloqueada**
Dado que un país tiene estados asociados
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Estados

Nivel intermedio de la jerarquía geográfica del sistema.

<a id="rf-48"></a>
# RF-48 — Registrar estado/provincia

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-39 (Catálogo de Países) |

## Descripción
El sistema deberá permitir registrar un estado o provincia asociado a un país, capturando nombre y estado.

## HU-48.1 — Registrar estado

Como administrador de catálogos, quiero registrar un estado o provincia asociado a un país, para construir la jerarquía geográfica del sistema.

### Reglas de negocio

**RN-48.1** El nombre del estado y el país al que pertenece son obligatorios.

### Criterios de Aceptación

**CA-48.1.1 — Registro exitoso**
Dado que se selecciona un país activo y se captura el nombre del estado
Cuando se presiona Guardar
Entonces el sistema crea el estado en estado "activo".

**CA-48.1.2 — País faltante**
Dado que no se selecciona un país
Cuando se intenta guardar el estado
Entonces el sistema muestra un error.

---

<a id="rf-49"></a>
# RF-49 — Exigir país válido y activo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir asociar un estado únicamente a un país en estado activo.

## HU-49.1 — Exigir país activo

Como administrador de catálogos, quiero que el sistema solo permita asociar un estado a un país activo, para mantener consistencia en la jerarquía.

### Reglas de negocio

**RN-49.1** El campo país solo admite valores activos del catálogo de Países.

### Criterios de Aceptación

**CA-49.1.1 — País inactivo no disponible**
Dado que un país está inactivo
Cuando el administrador busca países en el selector
Entonces ese país no aparece como opción.

---

<a id="rf-50"></a>
# RF-50 — Validar unicidad del nombre dentro del país

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que no se repita el nombre de un estado dentro del mismo país.

## HU-50.1 — Validar nombre único por país

Como administrador de catálogos, quiero que el sistema valide que no se repita el nombre de un estado dentro del mismo país, para evitar duplicados.

### Reglas de negocio

**RN-50.1** El nombre del estado debe ser único dentro de un mismo país, pero puede repetirse entre países distintos.

### Criterios de Aceptación

**CA-50.1.1 — Nombre duplicado en el mismo país**
Dado que ya existe un estado con un nombre específico dentro de un país
Cuando se intenta registrar otro estado con el mismo nombre en ese país
Entonces el sistema rechaza el guardado.

---

<a id="rf-51"></a>
# RF-51 — Consultar estados filtrando por país

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar el listado de estados por país.

## HU-51.1 — Consultar estados

Como usuario del sistema, quiero filtrar el listado de estados por país, para ubicar rápidamente los estados que pertenecen a un país específico.

### Reglas de negocio

**RN-51.1** El listado de estados debe permitir filtrar por país y por estado (activo/inactivo).

### Criterios de Aceptación

**CA-51.1.1 — Filtro por país**
Dado que el usuario selecciona un país en el filtro
Cuando aplica el filtro
Entonces el sistema muestra solo los estados de ese país.

---

<a id="rf-52"></a>
# RF-52 — Restringir eliminación de estado con dependencias

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un estado que tenga ciudades asociadas o esté referenciado en clientes/empresas.

## HU-52.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un estado con ciudades asociadas o referenciado en clientes/empresas, para no romper la jerarquía ni la integridad de los datos.

### Reglas de negocio

**RN-52.1** Un estado no puede eliminarse si tiene ciudades asociadas o está referenciado en clientes/empresas.

### Criterios de Aceptación

**CA-52.1.1 — Eliminación bloqueada**
Dado que un estado tiene ciudades asociadas
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Ciudades

Nivel final de la jerarquía geográfica del sistema.

<a id="rf-53"></a>
# RF-53 — Registrar ciudad

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-43 (Catálogo de Estados) |

## Descripción
El sistema deberá permitir registrar una ciudad asociada a un estado, capturando nombre y estado.

## HU-53.1 — Registrar ciudad

Como administrador de catálogos, quiero registrar una ciudad asociada a un estado, para completar la jerarquía geográfica del sistema.

### Reglas de negocio

**RN-53.1** El nombre de la ciudad y el estado al que pertenece son obligatorios.

### Criterios de Aceptación

**CA-53.1.1 — Registro exitoso**
Dado que se selecciona un estado activo y se captura el nombre de la ciudad
Cuando se presiona Guardar
Entonces el sistema crea la ciudad en estado "activo".

**CA-53.1.2 — Estado faltante**
Dado que no se selecciona un estado
Cuando se intenta guardar la ciudad
Entonces el sistema muestra un error.

---

<a id="rf-54"></a>
# RF-54 — Exigir estado válido y activo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir asociar una ciudad únicamente a un estado en estado activo.

## HU-54.1 — Exigir estado activo

Como administrador de catálogos, quiero que el sistema solo permita asociar una ciudad a un estado activo, para mantener consistencia en la jerarquía.

### Reglas de negocio

**RN-54.1** El campo estado solo admite valores activos del catálogo de Estados.

### Criterios de Aceptación

**CA-54.1.1 — Estado inactivo no disponible**
Dado que un estado está inactivo
Cuando el administrador busca estados en el selector
Entonces ese estado no aparece como opción.

---

<a id="rf-55"></a>
# RF-55 — Validar unicidad del nombre dentro del estado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que no se repita el nombre de una ciudad dentro del mismo estado.

## HU-55.1 — Validar nombre único por estado

Como administrador de catálogos, quiero que el sistema valide que no se repita el nombre de una ciudad dentro del mismo estado, para evitar duplicados.

### Reglas de negocio

**RN-55.1** El nombre de la ciudad debe ser único dentro de un mismo estado.

### Criterios de Aceptación

**CA-55.1.1 — Nombre duplicado en el mismo estado**
Dado que ya existe una ciudad con un nombre específico dentro de un estado
Cuando se intenta registrar otra ciudad con el mismo nombre en ese estado
Entonces el sistema rechaza el guardado.

---

<a id="rf-56"></a>
# RF-56 — Consultar ciudades con jerarquía completa

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar las ciudades filtrando por estado y/o país, mostrando la jerarquía completa País > Estado > Ciudad.

## HU-56.1 — Consultar ciudades

Como usuario del sistema, quiero consultar las ciudades filtrando por estado y/o país, viendo la jerarquía completa, para ubicar rápidamente la ciudad que necesito.

### Reglas de negocio

**RN-56.1** El listado debe mostrar la ruta jerárquica completa de cada ciudad.

### Criterios de Aceptación

**CA-56.1.1 — Filtro por estado**
Dado que el usuario selecciona un estado en el filtro
Cuando aplica el filtro
Entonces el sistema muestra solo las ciudades de ese estado junto con el país al que pertenece.

---

<a id="rf-57"></a>
# RF-57 — Restringir eliminación de ciudad referenciada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar una ciudad que esté referenciada en un cliente o empresa.

## HU-57.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar una ciudad referenciada en un cliente o empresa, para no afectar la integridad de esos registros.

### Reglas de negocio

**RN-57.1** Una ciudad no puede eliminarse si está referenciada en un cliente o empresa.

### Criterios de Aceptación

**CA-57.1.1 — Eliminación bloqueada**
Dado que una ciudad está referenciada en un cliente activo
Cuando el administrador intenta eliminarla
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Puestos Laborales

Tipos de puestos laborales que corresponden al personal de la organización.

<a id="rf-58"></a>
# RF-58 — Registrar puesto laboral

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un nuevo puesto laboral capturando nombre, descripción y estado.

## HU-58.1 — Registrar puesto laboral

Como administrador de recursos humanos o de catálogos, quiero registrar un nuevo puesto laboral, para poder asignarlo a los empleados de la organización.

### Reglas de negocio

**RN-58.1** El nombre del puesto laboral es obligatorio.

### Criterios de Aceptación

**CA-58.1.1 — Registro exitoso**
Dado que se captura el nombre y descripción del puesto
Cuando se presiona Guardar
Entonces el sistema crea el puesto laboral en estado "activo".

**CA-58.1.2 — Nombre faltante**
Dado que no se captura el nombre del puesto
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-59"></a>
# RF-59 — Validar unicidad del nombre

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el nombre del puesto laboral no esté duplicado en el catálogo.

## HU-59.1 — Validar nombre único

Como administrador de catálogos, quiero que el sistema valide que el nombre del puesto laboral no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-59.1** El nombre del puesto laboral debe ser único en el catálogo.

### Criterios de Aceptación

**CA-59.1.1 — Nombre duplicado**
Dado que ya existe un puesto laboral con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

---

<a id="rf-60"></a>
# RF-60 — Asociar nivel de riesgo al puesto

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-78 (Catálogo de Tipos Asegurado) |

## Descripción
El sistema deberá permitir asociar un nivel de riesgo (bajo, medio, alto) a cada puesto laboral, tomándolo del catálogo de Tipos Asegurado.

## HU-60.1 — Asociar nivel de riesgo

Como administrador de catálogos, quiero asociar un nivel de riesgo a cada puesto laboral, para clasificar correctamente a los empleados en las pólizas.

### Reglas de negocio

**RN-60.1** El nivel de riesgo debe seleccionarse del catálogo de Tipos Asegurado y es obligatorio.

### Criterios de Aceptación

**CA-60.1.1 — Asociación exitosa**
Dado que el administrador registra un puesto laboral
Cuando selecciona un nivel de riesgo del catálogo de Tipos Asegurado
Entonces el sistema guarda la asociación.

**CA-60.1.2 — Nivel de riesgo faltante**
Dado que no se selecciona un nivel de riesgo
Cuando se intenta guardar el puesto laboral
Entonces el sistema muestra un error.

---

<a id="rf-61"></a>
# RF-61 — Consultar y filtrar puestos laborales

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar puestos laborales por nivel de riesgo o estado.

## HU-61.1 — Consultar puestos laborales

Como usuario del sistema, quiero filtrar puestos laborales por nivel de riesgo o estado, para ubicar rápidamente el puesto que necesito.

### Reglas de negocio

**RN-61.1** El listado debe permitir filtrar por nivel de riesgo asociado y estado.

### Criterios de Aceptación

**CA-61.1.1 — Filtro por nivel de riesgo**
Dado que el usuario filtra por nivel de riesgo "alto"
Cuando aplica el filtro
Entonces el sistema muestra solo los puestos laborales con ese nivel asociado.

---

<a id="rf-62"></a>
# RF-62 — Restringir eliminación de puesto asignado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un puesto laboral que esté asignado a empleados activos.

## HU-62.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un puesto laboral asignado a empleados activos, para no afectar sus registros.

### Reglas de negocio

**RN-62.1** Un puesto laboral no puede eliminarse si está asignado a empleados activos.

### Criterios de Aceptación

**CA-62.1.1 — Eliminación bloqueada**
Dado que un puesto laboral está asignado a empleados activos
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Solicitante Titulares

Titulares, responsables de empresas o clientes independientes que solicitan la contratación de un seguro.

<a id="rf-63"></a>
# RF-63 — Registrar solicitante titular

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar un solicitante titular indicando su tipo de vínculo, nombre, documento, correo, teléfono y estado.

## HU-63.1 — Registrar solicitante titular

Como agente o administrador, quiero registrar un solicitante titular indicando su tipo de vínculo, para identificar quién solicita la contratación de un seguro.

### Reglas de negocio

**RN-63.1** El nombre completo, documento de identificación y tipo de vínculo son obligatorios.

### Criterios de Aceptación

**CA-63.1.1 — Registro exitoso**
Dado que se capturan nombre, documento y tipo de vínculo válidos
Cuando se presiona Guardar
Entonces el sistema crea el solicitante titular en estado "activo".

**CA-63.1.2 — Datos obligatorios faltantes**
Dado que falta el tipo de vínculo
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-64"></a>
# RF-64 — Validar unicidad del documento

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el documento de identificación del solicitante titular no esté duplicado en el catálogo.

## HU-64.1 — Validar documento único

Como administrador de catálogos, quiero que el sistema valide que el documento de identificación del solicitante titular no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-64.1** El documento de identificación debe ser único en el catálogo.

### Criterios de Aceptación

**CA-64.1.1 — Documento duplicado**
Dado que ya existe un solicitante titular con un documento específico
Cuando se intenta registrar otro con el mismo documento
Entonces el sistema rechaza el guardado.

---

<a id="rf-65"></a>
# RF-65 — Asociar empresa cuando el vínculo es responsable de empresa

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | RF-29 (Catálogo de Empresas) |

## Descripción
El sistema deberá exigir la asociación de una empresa cuando el tipo de vínculo del solicitante titular sea "responsable de empresa".

## HU-65.1 — Asociar empresa

Como agente, quiero asociar una empresa al solicitante titular cuando su vínculo sea "responsable de empresa", para saber a qué empresa representa.

### Reglas de negocio

**RN-65.1** Si el tipo de vínculo es "responsable de empresa", el campo empresa es obligatorio y debe existir en el catálogo de Empresas.

### Criterios de Aceptación

**CA-65.1.1 — Asociación exitosa**
Dado que se registra un solicitante titular con vínculo "responsable de empresa"
Cuando se selecciona una empresa existente
Entonces el sistema guarda la asociación.

**CA-65.1.2 — Empresa obligatoria omitida**
Dado que se registra un solicitante titular con vínculo "responsable de empresa" sin seleccionar empresa
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-66"></a>
# RF-66 — Consultar y filtrar solicitantes titulares

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir filtrar solicitantes titulares por tipo de vínculo, empresa/cliente asociado o estado.

## HU-66.1 — Consultar solicitantes titulares

Como usuario del sistema, quiero filtrar solicitantes titulares por tipo de vínculo, empresa/cliente asociado o estado, para ubicarlos rápidamente.

### Reglas de negocio

**RN-66.1** El listado debe permitir combinar filtros por tipo de vínculo y entidad asociada.

### Criterios de Aceptación

**CA-66.1.1 — Filtro por tipo de vínculo**
Dado que el usuario filtra por tipo "cliente independiente"
Cuando aplica el filtro
Entonces el sistema muestra solo los solicitantes titulares de ese tipo.

---

<a id="rf-67"></a>
# RF-67 — Restringir eliminación con solicitudes activas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un solicitante titular que tenga solicitudes de póliza activas o en trámite.

## HU-67.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un solicitante titular con solicitudes de póliza activas o en trámite, para no perder la trazabilidad del proceso.

### Reglas de negocio

**RN-67.1** Un solicitante titular no puede eliminarse si tiene solicitudes de póliza activas o en trámite.

### Criterios de Aceptación

**CA-67.1.1 — Eliminación bloqueada**
Dado que un solicitante titular tiene una solicitud en trámite
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Tipos Clasificación

Características que permiten clasificar los seguros según su modalidad (individuales, grupales).

<a id="rf-68"></a>
# RF-68 — Registrar tipo de clasificación

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar los tipos de clasificación de seguros (individual, grupal) capturando nombre, descripción y estado.

## HU-68.1 — Registrar tipo de clasificación

Como administrador de catálogos, quiero registrar los tipos de clasificación de seguros, para poder aplicarlos al registrar una póliza.

### Reglas de negocio

**RN-68.1** El nombre del tipo de clasificación es obligatorio.

### Criterios de Aceptación

**CA-68.1.1 — Registro exitoso**
Dado que se captura el nombre y descripción del tipo de clasificación
Cuando se presiona Guardar
Entonces el sistema lo crea en estado "activo".

**CA-68.1.2 — Nombre faltante**
Dado que no se captura el nombre
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-69"></a>
# RF-69 — Validar unicidad del nombre

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el nombre del tipo de clasificación no esté duplicado en el catálogo.

## HU-69.1 — Validar nombre único

Como administrador de catálogos, quiero que el sistema valide que el nombre del tipo de clasificación no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-69.1** El nombre debe ser único en el catálogo de Tipos Clasificación.

### Criterios de Aceptación

**CA-69.1.1 — Nombre duplicado**
Dado que ya existe un tipo de clasificación con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

---

<a id="rf-70"></a>
# RF-70 — Asociar tipo de clasificación a la póliza

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Módulo de Pólizas (externo) |

## Descripción
El sistema deberá permitir seleccionar el tipo de clasificación al registrar una póliza.

## HU-70.1 — Asociar a la póliza

Como agente, quiero seleccionar el tipo de clasificación al registrar una póliza, para indicar si es individual o grupal.

### Reglas de negocio

**RN-70.1** Solo los tipos de clasificación activos pueden seleccionarse al registrar una póliza.

### Criterios de Aceptación

**CA-70.1.1 — Selección válida**
Dado que el agente registra una póliza
Cuando selecciona un tipo de clasificación activo
Entonces el sistema lo asocia correctamente a la póliza.

---

<a id="rf-71"></a>
# RF-71 — Consultar tipos de clasificación

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar el listado de tipos de clasificación disponibles y su estado.

## HU-71.1 — Consultar tipos de clasificación

Como usuario del sistema, quiero consultar el listado de tipos de clasificación disponibles y su estado, para conocer las opciones vigentes.

### Reglas de negocio

**RN-71.1** El listado debe mostrar todos los tipos con su estado (activo/inactivo).

### Criterios de Aceptación

**CA-71.1.1 — Consulta del listado**
Dado que existen tipos de clasificación activos e inactivos
Cuando el usuario abre el catálogo
Entonces el sistema muestra ambos con su estado correspondiente.

---

<a id="rf-72"></a>
# RF-72 — Restringir eliminación referenciada en pólizas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un tipo de clasificación que esté referenciado en pólizas vigentes.

## HU-72.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un tipo de clasificación referenciado en pólizas vigentes, para no afectar la información existente.

### Reglas de negocio

**RN-72.1** Un tipo de clasificación no puede eliminarse si está referenciado en pólizas vigentes.

### Criterios de Aceptación

**CA-72.1.1 — Eliminación bloqueada**
Dado que un tipo de clasificación está referenciado en pólizas vigentes
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Tipos Aeronave

Tipos de aeronaves: aviones, helicópteros, planeadores, avionetas, de carga, de pasajeros y militares.

<a id="rf-73"></a>
# RF-73 — Registrar tipo de aeronave

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar los diferentes tipos de aeronave capturando nombre, descripción y estado.

## HU-73.1 — Registrar tipo de aeronave

Como administrador de catálogos, quiero registrar los diferentes tipos de aeronave, para poder clasificar correctamente las aeronaves aseguradas.

### Reglas de negocio

**RN-73.1** El nombre del tipo de aeronave es obligatorio.

### Criterios de Aceptación

**CA-73.1.1 — Registro exitoso**
Dado que se captura el nombre y descripción del tipo de aeronave
Cuando se presiona Guardar
Entonces el sistema lo crea en estado "activo".

**CA-73.1.2 — Nombre faltante**
Dado que no se captura el nombre
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-74"></a>
# RF-74 — Validar unicidad del nombre

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el nombre del tipo de aeronave no esté duplicado en el catálogo.

## HU-74.1 — Validar nombre único

Como administrador de catálogos, quiero que el sistema valide que el nombre del tipo de aeronave no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-74.1** El nombre debe ser único en el catálogo de Tipos Aeronave.

### Criterios de Aceptación

**CA-74.1.1 — Nombre duplicado**
Dado que ya existe un tipo de aeronave con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

---

<a id="rf-75"></a>
# RF-75 — Permitir múltiples tipos aplicables por aeronave asegurada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Could        |
| Estado       | Definición  |
| Dependencias | Módulo de Pólizas de Aeronaves (externo) |

## Descripción
El sistema deberá permitir asociar más de un tipo de aeronave a un mismo registro de aeronave asegurada cuando aplique (p. ej. "de carga" y "avión" simultáneamente).

## HU-75.1 — Asociar múltiples tipos

Como agente, quiero poder asociar más de un tipo a una aeronave asegurada cuando aplique, para reflejar correctamente sus características.

### Reglas de negocio

**RN-75.1** Una aeronave asegurada puede tener asociado uno o más tipos de aeronave activos, según lo requiera el registro de la póliza.

### Criterios de Aceptación

**CA-75.1.1 — Asociación múltiple**
Dado que se registra una aeronave asegurada
Cuando el agente selecciona más de un tipo aplicable
Entonces el sistema guarda todas las asociaciones seleccionadas.

---

<a id="rf-76"></a>
# RF-76 — Consultar y filtrar tipos de aeronave

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar y filtrar los tipos de aeronave disponibles y su estado.

## HU-76.1 — Consultar tipos de aeronave

Como usuario del sistema, quiero consultar y filtrar los tipos de aeronave disponibles y su estado, para conocer las opciones vigentes.

### Reglas de negocio

**RN-76.1** El listado debe permitir filtrar por estado (activo/inactivo).

### Criterios de Aceptación

**CA-76.1.1 — Consulta del listado**
Dado que existen tipos de aeronave activos e inactivos
Cuando el usuario filtra por estado "activo"
Entonces el sistema muestra solo los tipos activos.

---

<a id="rf-77"></a>
# RF-77 — Restringir eliminación referenciada en pólizas

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un tipo de aeronave que esté referenciado en pólizas de aeronaves vigentes.

## HU-77.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un tipo de aeronave referenciado en pólizas vigentes, para no afectar la información existente.

### Reglas de negocio

**RN-77.1** Un tipo de aeronave no puede eliminarse si está referenciado en pólizas de aeronaves vigentes.

### Criterios de Aceptación

**CA-77.1.1 — Eliminación bloqueada**
Dado que un tipo de aeronave está referenciado en una póliza vigente
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Tipos Asegurado

Niveles de riesgo (bajo, medio, alto) que distinguen a los puestos laborales.

<a id="rf-78"></a>
# RF-78 — Registrar tipo de asegurado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar los niveles de riesgo (bajo, medio, alto) capturando descripción y estado.

## HU-78.1 — Registrar tipo de asegurado

Como administrador de catálogos, quiero registrar los niveles de riesgo que clasifican a los puestos laborales, para poder aplicarlos en la evaluación de pólizas.

### Reglas de negocio

**RN-78.1** El nivel de riesgo es obligatorio para guardar el registro.

### Criterios de Aceptación

**CA-78.1.1 — Registro exitoso**
Dado que se captura un nivel de riesgo y descripción válidos
Cuando se presiona Guardar
Entonces el sistema crea el tipo de asegurado en estado "activo".

**CA-78.1.2 — Nivel de riesgo faltante**
Dado que no se captura el nivel de riesgo
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-79"></a>
# RF-79 — Restringir nivel de riesgo a valores predefinidos

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá restringir el nivel de riesgo a los valores bajo, medio o alto, sin admitir texto libre.

## HU-79.1 — Restringir nivel de riesgo

Como administrador de catálogos, quiero que el nivel de riesgo solo admita los valores bajo, medio o alto, para mantener consistencia en la clasificación.

### Reglas de negocio

**RN-79.1** El campo nivel de riesgo no admite texto libre, solo los tres valores predefinidos.

### Criterios de Aceptación

**CA-79.1.1 — Selección válida**
Dado que el administrador registra un tipo de asegurado
Cuando selecciona uno de los tres niveles predefinidos
Entonces el sistema lo acepta sin permitir texto libre.

---

<a id="rf-80"></a>
# RF-80 — Asociar nivel de riesgo a puestos laborales

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-58 (Catálogo de Puestos Laborales) |

## Descripción
El sistema deberá permitir asociar cada nivel de riesgo a los puestos laborales correspondientes.

## HU-80.1 — Asociar a puestos laborales

Como administrador de catálogos, quiero asociar cada nivel de riesgo a los puestos laborales correspondientes, para reflejar correctamente la exposición al riesgo del personal.

### Reglas de negocio

**RN-80.1** Un puesto laboral solo puede tener un nivel de riesgo asociado a la vez.

### Criterios de Aceptación

**CA-80.1.1 — Asociación exitosa**
Dado que el administrador edita un puesto laboral
Cuando selecciona un nivel de riesgo del catálogo de Tipos Asegurado
Entonces el sistema guarda la asociación.

---

<a id="rf-81"></a>
# RF-81 — Consultar tipos de asegurado y puestos asociados

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar el listado de tipos de asegurado y los puestos laborales asociados a cada nivel.

## HU-81.1 — Consultar tipos de asegurado

Como usuario del sistema, quiero consultar el listado de tipos de asegurado y los puestos laborales asociados a cada nivel, para tener visibilidad de la clasificación de riesgo.

### Reglas de negocio

**RN-81.1** El detalle de cada nivel de riesgo debe mostrar los puestos laborales asociados.

### Criterios de Aceptación

**CA-81.1.1 — Consulta de puestos asociados**
Dado que un nivel de riesgo tiene puestos laborales asociados
Cuando el usuario abre su detalle
Entonces el sistema muestra el listado de esos puestos.

---

<a id="rf-82"></a>
# RF-82 — Restringir eliminación referenciada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un tipo de asegurado que esté referenciado en puestos laborales o pólizas activas.

## HU-82.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un tipo de asegurado referenciado en puestos laborales o pólizas activas, para no afectar la información existente.

### Reglas de negocio

**RN-82.1** Un tipo de asegurado no puede eliminarse si está referenciado en puestos laborales o pólizas activas.

### Criterios de Aceptación

**CA-82.1.1 — Eliminación bloqueada**
Dado que un tipo de asegurado está referenciado en puestos laborales activos
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

## Catálogo de Tipos Vehículo

Tipos de vehículo: particulares, de carga, de pasajeros, de dos ruedas, de emergencia y especiales.

<a id="rf-83"></a>
# RF-83 — Registrar tipo de vehículo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir registrar los diferentes tipos de vehículo capturando nombre, descripción y estado.

## HU-83.1 — Registrar tipo de vehículo

Como administrador de catálogos, quiero registrar los diferentes tipos de vehículo, para poder clasificar correctamente los vehículos asegurados.

### Reglas de negocio

**RN-83.1** El nombre del tipo de vehículo es obligatorio.

### Criterios de Aceptación

**CA-83.1.1 — Registro exitoso**
Dado que se captura el nombre y descripción del tipo de vehículo
Cuando se presiona Guardar
Entonces el sistema lo crea en estado "activo".

**CA-83.1.2 — Nombre faltante**
Dado que no se captura el nombre
Cuando se intenta guardar
Entonces el sistema muestra un error.

---

<a id="rf-84"></a>
# RF-84 — Validar unicidad del nombre

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá validar que el nombre del tipo de vehículo no esté duplicado en el catálogo.

## HU-84.1 — Validar nombre único

Como administrador de catálogos, quiero que el sistema valide que el nombre del tipo de vehículo no esté duplicado, para evitar registros repetidos.

### Reglas de negocio

**RN-84.1** El nombre debe ser único en el catálogo de Tipos Vehículo.

### Criterios de Aceptación

**CA-84.1.1 — Nombre duplicado**
Dado que ya existe un tipo de vehículo con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

---

<a id="rf-85"></a>
# RF-85 — Asociar tipo de vehículo a un vehículo asegurado

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | RF-34 (Catálogo de Grupos); Módulo de Pólizas (externo) |

## Descripción
El sistema deberá permitir seleccionar el tipo de vehículo al registrar un vehículo asegurado dentro de una póliza o grupo.

## HU-85.1 — Asociar a vehículo asegurado

Como agente, quiero seleccionar el tipo de vehículo al registrar un vehículo asegurado dentro de una póliza o grupo, para clasificarlo correctamente.

### Reglas de negocio

**RN-85.1** Solo los tipos de vehículo activos pueden seleccionarse al registrar un vehículo asegurado.

### Criterios de Aceptación

**CA-85.1.1 — Selección válida**
Dado que el agente registra un vehículo asegurado
Cuando selecciona un tipo de vehículo activo
Entonces el sistema lo asocia correctamente al registro.

---

<a id="rf-86"></a>
# RF-86 — Consultar y filtrar tipos de vehículo

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Should        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá permitir consultar y filtrar los tipos de vehículo disponibles y su estado.

## HU-86.1 — Consultar tipos de vehículo

Como usuario del sistema, quiero consultar y filtrar los tipos de vehículo disponibles y su estado, para conocer las opciones vigentes.

### Reglas de negocio

**RN-86.1** El listado debe permitir filtrar por estado (activo/inactivo).

### Criterios de Aceptación

**CA-86.1.1 — Consulta del listado**
Dado que existen tipos de vehículo activos e inactivos
Cuando el usuario filtra por estado "activo"
Entonces el sistema muestra solo los tipos activos.

---

<a id="rf-87"></a>
# RF-87 — Restringir eliminación referenciada

| Campo        | Valor       |
|--------------|-------------|
| Prioridad    | Must        |
| Estado       | Definición  |
| Dependencias | Ninguna |

## Descripción
El sistema deberá impedir eliminar un tipo de vehículo que esté referenciado en pólizas o grupos vigentes.

## HU-87.1 — Restringir eliminación

Como administrador de catálogos, quiero que el sistema impida eliminar un tipo de vehículo referenciado en pólizas o grupos vigentes, para no afectar la información existente.

### Reglas de negocio

**RN-87.1** Un tipo de vehículo no puede eliminarse si está referenciado en pólizas o grupos vigentes.

### Criterios de Aceptación

**CA-87.1.1 — Eliminación bloqueada**
Dado que un tipo de vehículo está referenciado en un grupo vigente
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

---

# Requerimientos no funcionales (RNF)

### RNF-001 — Rendimiento
- **Descripción:** El 95% de las consultas y filtros sobre cualquier catálogo deben responder en menos de 2 segundos con 200 usuarios concurrentes.
- **Métrica / criterio de verificación:** Prueba de carga con 200 usuarios concurrentes midiendo el percentil 95 del tiempo de respuesta.
- **Prioridad:** Must

### RNF-002 — Escalabilidad
- **Descripción:** El módulo de catálogos debe soportar hasta 500,000 registros combinados entre todos los catálogos sin degradar el tiempo de respuesta definido en el RNF de rendimiento.
- **Métrica / criterio de verificación:** Prueba de carga de datos con volumen simulado de 500,000 registros.
- **Prioridad:** Should

### RNF-003 — Disponibilidad
- **Descripción:** El módulo de catálogos debe tener una disponibilidad del 99.5% mensual (máximo ~3.6 horas de inactividad al mes).
- **Métrica / criterio de verificación:** Monitoreo de disponibilidad del servicio durante un mes calendario.
- **Prioridad:** Must

### RNF-004 — Seguridad
- **Descripción:** El acceso a las operaciones de creación, edición e inactivación de catálogos debe restringirse por rol; ningún usuario sin el permiso correspondiente puede ejecutar dichas acciones.
- **Métrica / criterio de verificación:** Revisión de control de acceso basado en roles (RBAC) y pruebas de intento de acceso no autorizado.
- **Prioridad:** Must

### RNF-005 — Auditoría / cumplimiento
- **Descripción:** Toda operación de creación, edición o inactivación sobre un catálogo debe registrarse en bitácora con usuario, fecha/hora y tipo de cambio, conservada al menos 3 años.
- **Métrica / criterio de verificación:** Revisión de bitácora de auditoría tras ejecutar operaciones de prueba sobre distintos catálogos.
- **Prioridad:** Must

### RNF-006 — Usabilidad
- **Descripción:** Un usuario administrador debe poder completar el registro de un nuevo elemento de catálogo en 3 minutos o menos, sin ayuda externa.
- **Métrica / criterio de verificación:** Prueba de usabilidad con al menos 5 administradores midiendo el tiempo de captura.
- **Prioridad:** Should

### RNF-007 — Compatibilidad
- **Descripción:** El módulo de catálogos debe funcionar correctamente en las dos últimas versiones de Chrome, Edge y Firefox.
- **Métrica / criterio de verificación:** Prueba funcional cruzada en los navegadores indicados.
- **Prioridad:** Should

### RNF-008 — Localización
- **Descripción:** La interfaz, los formatos de fecha y los símbolos de moneda deben presentarse en español, adaptados al país configurado como estándar.
- **Métrica / criterio de verificación:** Revisión visual de formatos en cada pantalla de catálogo.
- **Prioridad:** Could

---

# Matriz de trazabilidad

| Objetivo de negocio | RF | Historia | Criterio de aceptación | Prioridad | Estado |
|---------------------|-----|----------|------------------------|-----------|--------|
| OBJ-10 Clasificar las pólizas por ramo de seguro | RF-01 | HU-1.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-10 Clasificar las pólizas por ramo de seguro | RF-02 | HU-2.1 | Escenario "Nombre duplicado" | Must | Propuesto |
| OBJ-10 Clasificar las pólizas por ramo de seguro | RF-03 | HU-3.1 | Escenario "Asociación exitosa" | Should | Propuesto |
| OBJ-10 Clasificar las pólizas por ramo de seguro | RF-04 | HU-4.1 | Escenario "Filtro por aseguradora" | Should | Propuesto |
| OBJ-10 Clasificar las pólizas por ramo de seguro | RF-05 | HU-5.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-2 Controlar las aseguradoras con las que opera Civentor | RF-06 | HU-6.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-2 Controlar las aseguradoras con las que opera Civentor | RF-07 | HU-7.1 | Escenario "Identificador duplicado" | Must | Propuesto |
| OBJ-2 Controlar las aseguradoras con las que opera Civentor | RF-08 | HU-8.1 | Escenario "Asociación de ramos exitosa" | Should | Propuesto |
| OBJ-2 Controlar las aseguradoras con las que opera Civentor | RF-09 | HU-9.1 | Escenario "Filtro por ramo" | Should | Propuesto |
| OBJ-2 Controlar las aseguradoras con las que opera Civentor | RF-10 | HU-10.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-1 Mantener actualizado el directorio de agentes de venta | RF-11 | HU-11.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-1 Mantener actualizado el directorio de agentes de venta | RF-12 | HU-12.1 | Escenario "Clasificación correcta" | Must | Propuesto |
| OBJ-1 Mantener actualizado el directorio de agentes de venta | RF-13 | HU-13.1 | Escenario "Asociación exitosa" | Must | Propuesto |
| OBJ-1 Mantener actualizado el directorio de agentes de venta | RF-14 | HU-14.1 | Escenario "Documento duplicado" | Must | Propuesto |
| OBJ-1 Mantener actualizado el directorio de agentes de venta | RF-15 | HU-15.1 | Escenario "Filtro aplicado" | Should | Propuesto |
| OBJ-1 Mantener actualizado el directorio de agentes de venta | RF-16 | HU-16.1 | Escenario "Inactivación bloqueada" | Must | Propuesto |
| OBJ-3 Administrar la base de clientes asegurados | RF-17 | HU-17.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-3 Administrar la base de clientes asegurados | RF-18 | HU-18.1 | Escenario "Documento duplicado" | Must | Propuesto |
| OBJ-3 Administrar la base de clientes asegurados | RF-19 | HU-19.1 | Escenario "Asociación exitosa" | Must | Propuesto |
| OBJ-3 Administrar la base de clientes asegurados | RF-20 | HU-20.1 | Escenario "Selección jerárquica correcta" | Should | Propuesto |
| OBJ-3 Administrar la base de clientes asegurados | RF-21 | HU-21.1 | Escenario "Filtro combinado" | Should | Propuesto |
| OBJ-3 Administrar la base de clientes asegurados | RF-22 | HU-22.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-4 Administrar al personal del grupo empresarial | RF-23 | HU-23.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-4 Administrar al personal del grupo empresarial | RF-24 | HU-24.1 | Escenario "Documento duplicado" | Must | Propuesto |
| OBJ-4 Administrar al personal del grupo empresarial | RF-25 | HU-25.1 | Escenario "Empresa inactiva no disponible" | Should | Propuesto |
| OBJ-4 Administrar al personal del grupo empresarial | RF-26 | HU-26.1 | Escenario "Puesto inactivo no disponible" | Should | Propuesto |
| OBJ-4 Administrar al personal del grupo empresarial | RF-27 | HU-27.1 | Escenario "Filtro por empresa y puesto" | Should | Propuesto |
| OBJ-4 Administrar al personal del grupo empresarial | RF-28 | HU-28.1 | Escenario "Inactivación bloqueada" | Must | Propuesto |
| OBJ-5 Administrar las empresas del grupo | RF-29 | HU-29.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-5 Administrar las empresas del grupo | RF-30 | HU-30.1 | Escenario "Identificador duplicado" | Must | Propuesto |
| OBJ-5 Administrar las empresas del grupo | RF-31 | HU-31.1 | Escenario "Selección jerárquica correcta" | Should | Propuesto |
| OBJ-5 Administrar las empresas del grupo | RF-32 | HU-32.1 | Escenario "Consulta de empleados asociados" | Should | Propuesto |
| OBJ-5 Administrar las empresas del grupo | RF-33 | HU-33.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-6 Gestionar agrupaciones para pólizas colectivas | RF-34 | HU-34.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-6 Gestionar agrupaciones para pólizas colectivas | RF-35 | HU-35.1 | Escenario "Selección válida" | Must | Propuesto |
| OBJ-6 Gestionar agrupaciones para pólizas colectivas | RF-36 | HU-36.1 | Escenario "Asociación consistente" | Should | Propuesto |
| OBJ-6 Gestionar agrupaciones para pólizas colectivas | RF-37 | HU-37.1 | Escenario "Filtro aplicado" | Should | Propuesto |
| OBJ-6 Gestionar agrupaciones para pólizas colectivas | RF-38 | HU-38.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-7 Estandarizar la moneda de las operaciones | RF-39 | HU-39.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-7 Estandarizar la moneda de las operaciones | RF-40 | HU-40.1 | Escenario "Código duplicado" | Must | Propuesto |
| OBJ-7 Estandarizar la moneda de las operaciones | RF-41 | HU-41.1 | Escenario "Cambio de moneda base" | Should | Propuesto |
| OBJ-7 Estandarizar la moneda de las operaciones | RF-42 | HU-42.1 | Escenario "Listado de monedas activas" | Should | Propuesto |
| OBJ-7 Estandarizar la moneda de las operaciones | RF-43 | HU-43.1 | Escenario "Inactivación bloqueada" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-44 | HU-44.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-45 | HU-45.1 | Escenario "Código duplicado" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-46 | HU-46.1 | Escenario "Consulta de jerarquía" | Should | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-47 | HU-47.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-48 | HU-48.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-49 | HU-49.1 | Escenario "País inactivo no disponible" | Should | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-50 | HU-50.1 | Escenario "Nombre duplicado en el mismo país" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-51 | HU-51.1 | Escenario "Filtro por país" | Should | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-52 | HU-52.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-53 | HU-53.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-54 | HU-54.1 | Escenario "Estado inactivo no disponible" | Should | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-55 | HU-55.1 | Escenario "Nombre duplicado en el mismo estado" | Must | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-56 | HU-56.1 | Escenario "Filtro por estado" | Should | Propuesto |
| OBJ-8 Sostener la jerarquía geográfica del sistema | RF-57 | HU-57.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-58 | HU-58.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-59 | HU-59.1 | Escenario "Nombre duplicado" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-60 | HU-60.1 | Escenario "Asociación exitosa" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-61 | HU-61.1 | Escenario "Filtro por nivel de riesgo" | Should | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-62 | HU-62.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-11 Identificar al responsable de la contratación | RF-63 | HU-63.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-11 Identificar al responsable de la contratación | RF-64 | HU-64.1 | Escenario "Documento duplicado" | Must | Propuesto |
| OBJ-11 Identificar al responsable de la contratación | RF-65 | HU-65.1 | Escenario "Asociación exitosa" | Must | Propuesto |
| OBJ-11 Identificar al responsable de la contratación | RF-66 | HU-66.1 | Escenario "Filtro por tipo de vínculo" | Should | Propuesto |
| OBJ-11 Identificar al responsable de la contratación | RF-67 | HU-67.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-12 Clasificar pólizas por modalidad | RF-68 | HU-68.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-12 Clasificar pólizas por modalidad | RF-69 | HU-69.1 | Escenario "Nombre duplicado" | Must | Propuesto |
| OBJ-12 Clasificar pólizas por modalidad | RF-70 | HU-70.1 | Escenario "Selección válida" | Should | Propuesto |
| OBJ-12 Clasificar pólizas por modalidad | RF-71 | HU-71.1 | Escenario "Consulta del listado" | Should | Propuesto |
| OBJ-12 Clasificar pólizas por modalidad | RF-72 | HU-72.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-13 Clasificar aeronaves aseguradas | RF-73 | HU-73.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-13 Clasificar aeronaves aseguradas | RF-74 | HU-74.1 | Escenario "Nombre duplicado" | Must | Propuesto |
| OBJ-13 Clasificar aeronaves aseguradas | RF-75 | HU-75.1 | Escenario "Asociación múltiple" | Could | Propuesto |
| OBJ-13 Clasificar aeronaves aseguradas | RF-76 | HU-76.1 | Escenario "Consulta del listado" | Should | Propuesto |
| OBJ-13 Clasificar aeronaves aseguradas | RF-77 | HU-77.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-78 | HU-78.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-79 | HU-79.1 | Escenario "Selección válida" | Must | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-80 | HU-80.1 | Escenario "Asociación exitosa" | Should | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-81 | HU-81.1 | Escenario "Consulta de puestos asociados" | Should | Propuesto |
| OBJ-9 Clasificar al personal por riesgo laboral | RF-82 | HU-82.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |
| OBJ-14 Clasificar vehículos asegurados | RF-83 | HU-83.1 | Escenario "Registro exitoso" | Must | Propuesto |
| OBJ-14 Clasificar vehículos asegurados | RF-84 | HU-84.1 | Escenario "Nombre duplicado" | Must | Propuesto |
| OBJ-14 Clasificar vehículos asegurados | RF-85 | HU-85.1 | Escenario "Selección válida" | Should | Propuesto |
| OBJ-14 Clasificar vehículos asegurados | RF-86 | HU-86.1 | Escenario "Consulta del listado" | Should | Propuesto |
| OBJ-14 Clasificar vehículos asegurados | RF-87 | HU-87.1 | Escenario "Eliminación bloqueada" | Must | Propuesto |

Estados sugeridos: Propuesto → Aprobado → En desarrollo → Verificado.

---

# Supuestos, dependencias y riesgos

## Supuestos (SUP)

| ID | Supuesto | Impacto si es falso |
|----|----------|---------------------|
| SUP-01 | El rol "administrador de catálogos" es quien tiene permisos de creación/edición/eliminación en todos los catálogos; los roles "agente" y "usuario del sistema" tienen principalmente permisos de consulta. | Sería necesario rediseñar el modelo de permisos y ajustar los criterios de aceptación de visibilidad. |
| SUP-02 | Todas las eliminaciones descritas corresponden a baja lógica (inactivación), no a borrado físico. | Si el negocio requiere borrado físico en algún catálogo, deben redefinirse las RN y CA de eliminación de ese RF. |
| SUP-03 | Los catálogos de Tipos Clasificación, Tipos Aeronave y Tipos Vehículo son consumidos por un módulo de Pólizas que está fuera del alcance de este documento. | Si el módulo de Pólizas no existe aún, algunas dependencias marcadas como "externo" deberán tratarse como riesgo de integración. |

## Dependencias (DEP)

| ID | Dependencia | De quién / de qué |
|----|-------------|-------------------|
| DEP-01 | Disponibilidad del catálogo de Países, Estados y Ciudades para habilitar la jerarquía geográfica en Clientes y Empresas. | Equipo de desarrollo del módulo de Catálogos. |
| DEP-02 | Definición del módulo de Pólizas para validar las restricciones de eliminación de Ramos, Tipos Clasificación, Tipos Aeronave, Tipos Asegurado y Tipos Vehículo. | Equipo responsable del módulo de Pólizas. |

## Riesgos (RGO)

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| RGO-01 | Cambios frecuentes de alcance sobre la estructura de algún catálogo (p. ej. nuevos campos en Agentes o Clientes) durante el desarrollo. | Media | Alto | Congelar el alcance de este documento por versión; gestionar cambios mediante control de versiones formal. |
| RGO-02 | Falta de definición del módulo de Pólizas al momento de implementar las restricciones de eliminación de varios catálogos. | Media | Medio | Coordinar con el equipo de Pólizas antes de implementar las RN de restricción de eliminación referenciada. |

---

# Casos de prueba

**CP-001 — Registro exitoso (Ramos)**
Verifica: CA-1.1.1
Dado que se captura el nombre y descripción del ramo
Cuando se presiona Guardar
Entonces el sistema crea el ramo en estado "activo".

**CP-002 — Nombre faltante (Ramos)**
Verifica: CA-1.1.2
Dado que no se captura el nombre del ramo
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-003 — Nombre duplicado (Ramos)**
Verifica: CA-2.1.1
Dado que ya existe un ramo con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

**CP-004 — Asociación exitosa (Ramos)**
Verifica: CA-3.1.1
Dado que el administrador edita un ramo
Cuando selecciona una o más aseguradoras activas
Entonces el sistema guarda la asociación.

**CP-005 — Filtro por aseguradora (Ramos)**
Verifica: CA-4.1.1
Dado que el usuario filtra por una aseguradora específica
Cuando aplica el filtro
Entonces el sistema muestra solo los ramos asociados a esa aseguradora.

**CP-006 — Eliminación bloqueada (Ramos)**
Verifica: CA-5.1.1
Dado que un ramo está vinculado a pólizas vigentes
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-007 — Registro exitoso (Aseguradoras)**
Verifica: CA-6.1.1
Dado que el administrador captura razón social, identificador fiscal, país y dirección válidos
Cuando presiona Guardar
Entonces el sistema crea la aseguradora en estado "activo".

**CP-008 — Datos incompletos (Aseguradoras)**
Verifica: CA-6.1.2
Dado que el administrador intenta guardar una aseguradora sin razón social
Cuando presiona Guardar
Entonces el sistema muestra un error y no crea el registro.

**CP-009 — Identificador duplicado (Aseguradoras)**
Verifica: CA-7.1.1
Dado que ya existe una aseguradora con un identificador fiscal específico
Cuando el administrador intenta registrar otra con el mismo dato
Entonces el sistema rechaza el guardado.

**CP-010 — Asociación de ramos exitosa (Aseguradoras)**
Verifica: CA-8.1.1
Dado que el administrador edita una aseguradora
Cuando selecciona uno o más ramos activos del catálogo
Entonces el sistema guarda la asociación y la refleja en el detalle de la aseguradora.

**CP-011 — Ramo inactivo no seleccionable (Aseguradoras)**
Verifica: CA-8.1.2
Dado que el administrador intenta asociar un ramo inactivo
Cuando busca dicho ramo en el selector
Entonces el sistema no lo muestra como opción disponible.

**CP-012 — Filtro por ramo (Aseguradoras)**
Verifica: CA-9.1.1
Dado que el usuario filtra por un ramo específico
Cuando aplica el filtro
Entonces el sistema muestra solo las aseguradoras que tienen ese ramo asociado.

**CP-013 — Eliminación bloqueada (Aseguradoras)**
Verifica: CA-10.1.1
Dado que una aseguradora tiene pólizas vigentes
Cuando el administrador intenta eliminarla
Entonces el sistema bloquea la acción e informa la causa.

**CP-014 — Registro exitoso (Agentes)**
Verifica: CA-11.1.1
Dado que el administrador está en la pantalla de nuevo agente
Cuando captura nombre completo, tipo de agente, documento, correo y teléfono válidos y presiona Guardar
Entonces el sistema crea el agente con estado "activo" y lo muestra en el listado.

**CP-015 — Campos obligatorios faltantes (Agentes)**
Verifica: CA-11.1.2
Dado que el administrador está registrando un agente
Cuando intenta guardar sin capturar el nombre completo o el tipo de agente
Entonces el sistema muestra un mensaje de error indicando los campos faltantes y no guarda el registro.

**CP-016 — Clasificación correcta (Agentes)**
Verifica: CA-12.1.1
Dado que el administrador está registrando un agente
Cuando selecciona el tipo "interno" o "externo" de la lista predefinida
Entonces el sistema acepta el valor y lo asocia al agente.

**CP-017 — Valor no permitido (Agentes)**
Verifica: CA-12.1.2
Dado que el administrador intenta guardar un agente
Cuando el campo tipo de agente queda vacío o con un valor distinto a los predefinidos
Entonces el sistema rechaza el guardado y solicita seleccionar un valor válido.

**CP-018 — Asociación exitosa (Agentes)**
Verifica: CA-13.1.1
Dado que el administrador registra un agente de tipo externo
Cuando selecciona una aseguradora activa del catálogo
Entonces el sistema guarda la asociación correctamente.

**CP-019 — Aseguradora obligatoria omitida (Agentes)**
Verifica: CA-13.1.2
Dado que el administrador registra un agente de tipo externo
Cuando intenta guardar sin seleccionar una aseguradora
Entonces el sistema muestra un error indicando que la aseguradora es obligatoria para agentes externos.

**CP-020 — Documento duplicado (Agentes)**
Verifica: CA-14.1.1
Dado que ya existe un agente registrado con un documento específico
Cuando el administrador intenta registrar otro agente con el mismo documento
Entonces el sistema rechaza el guardado e informa que el documento ya existe.

**CP-021 — Filtro aplicado (Agentes)**
Verifica: CA-15.1.1
Dado que el usuario está en el listado de agentes
Cuando selecciona el filtro tipo="externo" y una aseguradora específica
Entonces el sistema muestra únicamente los agentes externos asociados a esa aseguradora.

**CP-022 — Inactivación bloqueada (Agentes)**
Verifica: CA-16.1.1
Dado que un agente tiene pólizas vigentes asociadas
Cuando el administrador intenta inactivarlo
Entonces el sistema bloquea la acción y muestra un mensaje explicando la causa.

**CP-023 — Inactivación permitida (Agentes)**
Verifica: CA-16.1.2
Dado que un agente no tiene pólizas ni clientes activos asociados
Cuando el administrador lo inactiva
Entonces el sistema cambia su estado a "inactivo" exitosamente.

**CP-024 — Registro exitoso (Clientes)**
Verifica: CA-17.1.1
Dado que se capturan todos los datos obligatorios de un cliente persona física
Cuando se presiona Guardar
Entonces el sistema crea el cliente en estado "activo".

**CP-025 — Datos obligatorios faltantes (Clientes)**
Verifica: CA-17.1.2
Dado que falta el documento de identificación
Cuando se intenta guardar el cliente
Entonces el sistema muestra un error y no guarda el registro.

**CP-026 — Documento duplicado (Clientes)**
Verifica: CA-18.1.1
Dado que ya existe un cliente con un documento específico
Cuando se intenta registrar otro cliente con el mismo documento
Entonces el sistema rechaza el guardado.

**CP-027 — Asociación exitosa (Clientes)**
Verifica: CA-19.1.1
Dado que se registra un cliente persona moral
Cuando se selecciona un solicitante titular existente
Entonces el sistema guarda la asociación.

**CP-028 — Solicitante titular obligatorio omitido (Clientes)**
Verifica: CA-19.1.2
Dado que se registra un cliente persona moral sin solicitante titular
Cuando se intenta guardar
Entonces el sistema muestra un error solicitando el dato.

**CP-029 — Selección jerárquica correcta (Clientes)**
Verifica: CA-20.1.1
Dado que el agente selecciona un país
Cuando elige el estado y luego la ciudad
Entonces el sistema solo muestra los estados de ese país y las ciudades de ese estado.

**CP-030 — Jerarquía inconsistente (Clientes)**
Verifica: CA-20.1.2
Dado que el agente intenta guardar un cliente con una ciudad que no corresponde al estado seleccionado
Cuando presiona Guardar
Entonces el sistema rechaza el registro e indica la inconsistencia.

**CP-031 — Filtro combinado (Clientes)**
Verifica: CA-21.1.1
Dado que el usuario filtra por país y agente asignado
Cuando aplica el filtro
Entonces el sistema muestra solo los clientes que cumplen ambas condiciones.

**CP-032 — Eliminación bloqueada (Clientes)**
Verifica: CA-22.1.1
Dado que un cliente tiene pólizas históricas
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción y sugiere inactivarlo en su lugar.

**CP-033 — Registro exitoso (Empleados)**
Verifica: CA-23.1.1
Dado que se capturan nombre, documento, empresa y puesto laboral válidos
Cuando se presiona Guardar
Entonces el sistema crea el empleado en estado "activo".

**CP-034 — Datos obligatorios faltantes (Empleados)**
Verifica: CA-23.1.2
Dado que no se selecciona un puesto laboral
Cuando se intenta guardar el empleado
Entonces el sistema muestra un error.

**CP-035 — Documento duplicado (Empleados)**
Verifica: CA-24.1.1
Dado que ya existe un empleado con un documento específico
Cuando se intenta registrar otro con el mismo documento
Entonces el sistema rechaza el guardado.

**CP-036 — Empresa inactiva no disponible (Empleados)**
Verifica: CA-25.1.1
Dado que una empresa está inactiva
Cuando el administrador busca empresas en el selector al registrar un empleado
Entonces esa empresa no aparece como opción.

**CP-037 — Puesto inactivo no disponible (Empleados)**
Verifica: CA-26.1.1
Dado que un puesto laboral está inactivo
Cuando el administrador busca puestos en el selector
Entonces ese puesto no aparece como opción.

**CP-038 — Filtro por empresa y puesto (Empleados)**
Verifica: CA-27.1.1
Dado que el usuario filtra por una empresa y un puesto laboral específicos
Cuando aplica el filtro
Entonces el sistema muestra solo los empleados que cumplen ambas condiciones.

**CP-039 — Inactivación bloqueada (Empleados)**
Verifica: CA-28.1.1
Dado que un empleado tiene una póliza grupal vigente
Cuando el administrador intenta inactivarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-040 — Registro exitoso (Empresas)**
Verifica: CA-29.1.1
Dado que se capturan razón social, identificador fiscal y ubicación válidos
Cuando se presiona Guardar
Entonces el sistema crea la empresa en estado "activo".

**CP-041 — Datos incompletos (Empresas)**
Verifica: CA-29.1.2
Dado que falta el identificador fiscal
Cuando se intenta guardar la empresa
Entonces el sistema muestra un error.

**CP-042 — Identificador duplicado (Empresas)**
Verifica: CA-30.1.1
Dado que ya existe una empresa con un identificador fiscal específico
Cuando se intenta registrar otra con el mismo dato
Entonces el sistema rechaza el guardado.

**CP-043 — Selección jerárquica correcta (Empresas)**
Verifica: CA-31.1.1
Dado que se selecciona un país y un estado
Cuando se elige la ciudad
Entonces el sistema solo muestra ciudades pertenecientes a ese estado.

**CP-044 — Consulta de empleados asociados (Empresas)**
Verifica: CA-32.1.1
Dado que una empresa tiene empleados registrados
Cuando el usuario abre su detalle
Entonces el sistema muestra el listado de empleados asociados a esa empresa.

**CP-045 — Eliminación bloqueada (Empresas)**
Verifica: CA-33.1.1
Dado que una empresa tiene empleados activos
Cuando el administrador intenta eliminarla
Entonces el sistema bloquea la acción e informa la causa.

**CP-046 — Registro exitoso (Grupos)**
Verifica: CA-34.1.1
Dado que se captura el nombre del grupo y se selecciona un tipo de agrupación válido
Cuando se presiona Guardar
Entonces el sistema crea el grupo en estado "activo".

**CP-047 — Tipo de agrupación faltante (Grupos)**
Verifica: CA-34.1.2
Dado que no se selecciona un tipo de agrupación
Cuando se intenta guardar el grupo
Entonces el sistema muestra un error.

**CP-048 — Selección válida (Grupos)**
Verifica: CA-35.1.1
Dado que el administrador registra un grupo
Cuando selecciona uno de los tipos predefinidos
Entonces el sistema lo acepta sin permitir edición manual del texto.

**CP-049 — Asociación consistente (Grupos)**
Verifica: CA-36.1.1
Dado que el grupo es de tipo "vehículos utilitarios"
Cuando el administrador selecciona vehículos del catálogo de Tipos Vehículo correspondiente
Entonces el sistema los asocia correctamente.

**CP-050 — Asociación inconsistente (Grupos)**
Verifica: CA-36.1.2
Dado que el grupo es de tipo "familiar"
Cuando el administrador intenta asociar un vehículo
Entonces el sistema rechaza la asociación por no corresponder al tipo del grupo.

**CP-051 — Filtro aplicado (Grupos)**
Verifica: CA-37.1.1
Dado que el usuario filtra por tipo "montacargas"
Cuando aplica el filtro
Entonces el sistema muestra solo los grupos de ese tipo.

**CP-052 — Eliminación bloqueada (Grupos)**
Verifica: CA-38.1.1
Dado que un grupo está vinculado a una póliza vigente
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-053 — Registro exitoso (Monedas)**
Verifica: CA-39.1.1
Dado que se captura un código ISO, nombre y símbolo válidos
Cuando se presiona Guardar
Entonces el sistema crea la moneda en estado "activo".

**CP-054 — Código ISO faltante (Monedas)**
Verifica: CA-39.1.2
Dado que no se captura el código ISO
Cuando se intenta guardar la moneda
Entonces el sistema muestra un error.

**CP-055 — Código duplicado (Monedas)**
Verifica: CA-40.1.1
Dado que ya existe una moneda con un código ISO específico
Cuando se intenta registrar otra con el mismo código
Entonces el sistema rechaza el guardado.

**CP-056 — Cambio de moneda base (Monedas)**
Verifica: CA-41.1.1
Dado que existe una moneda base activa
Cuando el administrador marca otra moneda como base
Entonces el sistema desmarca la anterior y establece la nueva como base.

**CP-057 — Listado de monedas activas (Monedas)**
Verifica: CA-42.1.1
Dado que existen monedas activas e inactivas
Cuando el usuario abre el selector de moneda en una póliza
Entonces el sistema solo muestra las monedas activas.

**CP-058 — Inactivación bloqueada (Monedas)**
Verifica: CA-43.1.1
Dado que una moneda está siendo usada en una póliza vigente
Cuando el administrador intenta inactivarla
Entonces el sistema bloquea la acción e informa la causa.

**CP-059 — Registro exitoso (Países)**
Verifica: CA-44.1.1
Dado que se captura nombre y código ISO válidos
Cuando se presiona Guardar
Entonces el sistema crea el país en estado "activo".

**CP-060 — Código ISO faltante (Países)**
Verifica: CA-44.1.2
Dado que no se captura el código ISO
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-061 — Código duplicado (Países)**
Verifica: CA-45.1.1
Dado que ya existe un país con un código ISO específico
Cuando se intenta registrar otro con el mismo código
Entonces el sistema rechaza el guardado.

**CP-062 — Consulta de jerarquía (Países)**
Verifica: CA-46.1.1
Dado que un país tiene estados registrados
Cuando el usuario abre su detalle
Entonces el sistema muestra el listado de estados asociados.

**CP-063 — Eliminación bloqueada (Países)**
Verifica: CA-47.1.1
Dado que un país tiene estados asociados
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-064 — Registro exitoso (Estados)**
Verifica: CA-48.1.1
Dado que se selecciona un país activo y se captura el nombre del estado
Cuando se presiona Guardar
Entonces el sistema crea el estado en estado "activo".

**CP-065 — País faltante (Estados)**
Verifica: CA-48.1.2
Dado que no se selecciona un país
Cuando se intenta guardar el estado
Entonces el sistema muestra un error.

**CP-066 — País inactivo no disponible (Estados)**
Verifica: CA-49.1.1
Dado que un país está inactivo
Cuando el administrador busca países en el selector
Entonces ese país no aparece como opción.

**CP-067 — Nombre duplicado en el mismo país (Estados)**
Verifica: CA-50.1.1
Dado que ya existe un estado con un nombre específico dentro de un país
Cuando se intenta registrar otro estado con el mismo nombre en ese país
Entonces el sistema rechaza el guardado.

**CP-068 — Filtro por país (Estados)**
Verifica: CA-51.1.1
Dado que el usuario selecciona un país en el filtro
Cuando aplica el filtro
Entonces el sistema muestra solo los estados de ese país.

**CP-069 — Eliminación bloqueada (Estados)**
Verifica: CA-52.1.1
Dado que un estado tiene ciudades asociadas
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-070 — Registro exitoso (Ciudades)**
Verifica: CA-53.1.1
Dado que se selecciona un estado activo y se captura el nombre de la ciudad
Cuando se presiona Guardar
Entonces el sistema crea la ciudad en estado "activo".

**CP-071 — Estado faltante (Ciudades)**
Verifica: CA-53.1.2
Dado que no se selecciona un estado
Cuando se intenta guardar la ciudad
Entonces el sistema muestra un error.

**CP-072 — Estado inactivo no disponible (Ciudades)**
Verifica: CA-54.1.1
Dado que un estado está inactivo
Cuando el administrador busca estados en el selector
Entonces ese estado no aparece como opción.

**CP-073 — Nombre duplicado en el mismo estado (Ciudades)**
Verifica: CA-55.1.1
Dado que ya existe una ciudad con un nombre específico dentro de un estado
Cuando se intenta registrar otra ciudad con el mismo nombre en ese estado
Entonces el sistema rechaza el guardado.

**CP-074 — Filtro por estado (Ciudades)**
Verifica: CA-56.1.1
Dado que el usuario selecciona un estado en el filtro
Cuando aplica el filtro
Entonces el sistema muestra solo las ciudades de ese estado junto con el país al que pertenece.

**CP-075 — Eliminación bloqueada (Ciudades)**
Verifica: CA-57.1.1
Dado que una ciudad está referenciada en un cliente activo
Cuando el administrador intenta eliminarla
Entonces el sistema bloquea la acción e informa la causa.

**CP-076 — Registro exitoso (Puestos Laborales)**
Verifica: CA-58.1.1
Dado que se captura el nombre y descripción del puesto
Cuando se presiona Guardar
Entonces el sistema crea el puesto laboral en estado "activo".

**CP-077 — Nombre faltante (Puestos Laborales)**
Verifica: CA-58.1.2
Dado que no se captura el nombre del puesto
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-078 — Nombre duplicado (Puestos Laborales)**
Verifica: CA-59.1.1
Dado que ya existe un puesto laboral con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

**CP-079 — Asociación exitosa (Puestos Laborales)**
Verifica: CA-60.1.1
Dado que el administrador registra un puesto laboral
Cuando selecciona un nivel de riesgo del catálogo de Tipos Asegurado
Entonces el sistema guarda la asociación.

**CP-080 — Nivel de riesgo faltante (Puestos Laborales)**
Verifica: CA-60.1.2
Dado que no se selecciona un nivel de riesgo
Cuando se intenta guardar el puesto laboral
Entonces el sistema muestra un error.

**CP-081 — Filtro por nivel de riesgo (Puestos Laborales)**
Verifica: CA-61.1.1
Dado que el usuario filtra por nivel de riesgo "alto"
Cuando aplica el filtro
Entonces el sistema muestra solo los puestos laborales con ese nivel asociado.

**CP-082 — Eliminación bloqueada (Puestos Laborales)**
Verifica: CA-62.1.1
Dado que un puesto laboral está asignado a empleados activos
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-083 — Registro exitoso (Solicitante Titulares)**
Verifica: CA-63.1.1
Dado que se capturan nombre, documento y tipo de vínculo válidos
Cuando se presiona Guardar
Entonces el sistema crea el solicitante titular en estado "activo".

**CP-084 — Datos obligatorios faltantes (Solicitante Titulares)**
Verifica: CA-63.1.2
Dado que falta el tipo de vínculo
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-085 — Documento duplicado (Solicitante Titulares)**
Verifica: CA-64.1.1
Dado que ya existe un solicitante titular con un documento específico
Cuando se intenta registrar otro con el mismo documento
Entonces el sistema rechaza el guardado.

**CP-086 — Asociación exitosa (Solicitante Titulares)**
Verifica: CA-65.1.1
Dado que se registra un solicitante titular con vínculo "responsable de empresa"
Cuando se selecciona una empresa existente
Entonces el sistema guarda la asociación.

**CP-087 — Empresa obligatoria omitida (Solicitante Titulares)**
Verifica: CA-65.1.2
Dado que se registra un solicitante titular con vínculo "responsable de empresa" sin seleccionar empresa
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-088 — Filtro por tipo de vínculo (Solicitante Titulares)**
Verifica: CA-66.1.1
Dado que el usuario filtra por tipo "cliente independiente"
Cuando aplica el filtro
Entonces el sistema muestra solo los solicitantes titulares de ese tipo.

**CP-089 — Eliminación bloqueada (Solicitante Titulares)**
Verifica: CA-67.1.1
Dado que un solicitante titular tiene una solicitud en trámite
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-090 — Registro exitoso (Tipos Clasificación)**
Verifica: CA-68.1.1
Dado que se captura el nombre y descripción del tipo de clasificación
Cuando se presiona Guardar
Entonces el sistema lo crea en estado "activo".

**CP-091 — Nombre faltante (Tipos Clasificación)**
Verifica: CA-68.1.2
Dado que no se captura el nombre
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-092 — Nombre duplicado (Tipos Clasificación)**
Verifica: CA-69.1.1
Dado que ya existe un tipo de clasificación con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

**CP-093 — Selección válida (Tipos Clasificación)**
Verifica: CA-70.1.1
Dado que el agente registra una póliza
Cuando selecciona un tipo de clasificación activo
Entonces el sistema lo asocia correctamente a la póliza.

**CP-094 — Consulta del listado (Tipos Clasificación)**
Verifica: CA-71.1.1
Dado que existen tipos de clasificación activos e inactivos
Cuando el usuario abre el catálogo
Entonces el sistema muestra ambos con su estado correspondiente.

**CP-095 — Eliminación bloqueada (Tipos Clasificación)**
Verifica: CA-72.1.1
Dado que un tipo de clasificación está referenciado en pólizas vigentes
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-096 — Registro exitoso (Tipos Aeronave)**
Verifica: CA-73.1.1
Dado que se captura el nombre y descripción del tipo de aeronave
Cuando se presiona Guardar
Entonces el sistema lo crea en estado "activo".

**CP-097 — Nombre faltante (Tipos Aeronave)**
Verifica: CA-73.1.2
Dado que no se captura el nombre
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-098 — Nombre duplicado (Tipos Aeronave)**
Verifica: CA-74.1.1
Dado que ya existe un tipo de aeronave con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

**CP-099 — Asociación múltiple (Tipos Aeronave)**
Verifica: CA-75.1.1
Dado que se registra una aeronave asegurada
Cuando el agente selecciona más de un tipo aplicable
Entonces el sistema guarda todas las asociaciones seleccionadas.

**CP-100 — Consulta del listado (Tipos Aeronave)**
Verifica: CA-76.1.1
Dado que existen tipos de aeronave activos e inactivos
Cuando el usuario filtra por estado "activo"
Entonces el sistema muestra solo los tipos activos.

**CP-101 — Eliminación bloqueada (Tipos Aeronave)**
Verifica: CA-77.1.1
Dado que un tipo de aeronave está referenciado en una póliza vigente
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-102 — Registro exitoso (Tipos Asegurado)**
Verifica: CA-78.1.1
Dado que se captura un nivel de riesgo y descripción válidos
Cuando se presiona Guardar
Entonces el sistema crea el tipo de asegurado en estado "activo".

**CP-103 — Nivel de riesgo faltante (Tipos Asegurado)**
Verifica: CA-78.1.2
Dado que no se captura el nivel de riesgo
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-104 — Selección válida (Tipos Asegurado)**
Verifica: CA-79.1.1
Dado que el administrador registra un tipo de asegurado
Cuando selecciona uno de los tres niveles predefinidos
Entonces el sistema lo acepta sin permitir texto libre.

**CP-105 — Asociación exitosa (Tipos Asegurado)**
Verifica: CA-80.1.1
Dado que el administrador edita un puesto laboral
Cuando selecciona un nivel de riesgo del catálogo de Tipos Asegurado
Entonces el sistema guarda la asociación.

**CP-106 — Consulta de puestos asociados (Tipos Asegurado)**
Verifica: CA-81.1.1
Dado que un nivel de riesgo tiene puestos laborales asociados
Cuando el usuario abre su detalle
Entonces el sistema muestra el listado de esos puestos.

**CP-107 — Eliminación bloqueada (Tipos Asegurado)**
Verifica: CA-82.1.1
Dado que un tipo de asegurado está referenciado en puestos laborales activos
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

**CP-108 — Registro exitoso (Tipos Vehículo)**
Verifica: CA-83.1.1
Dado que se captura el nombre y descripción del tipo de vehículo
Cuando se presiona Guardar
Entonces el sistema lo crea en estado "activo".

**CP-109 — Nombre faltante (Tipos Vehículo)**
Verifica: CA-83.1.2
Dado que no se captura el nombre
Cuando se intenta guardar
Entonces el sistema muestra un error.

**CP-110 — Nombre duplicado (Tipos Vehículo)**
Verifica: CA-84.1.1
Dado que ya existe un tipo de vehículo con un nombre específico
Cuando se intenta registrar otro con el mismo nombre
Entonces el sistema rechaza el guardado.

**CP-111 — Selección válida (Tipos Vehículo)**
Verifica: CA-85.1.1
Dado que el agente registra un vehículo asegurado
Cuando selecciona un tipo de vehículo activo
Entonces el sistema lo asocia correctamente al registro.

**CP-112 — Consulta del listado (Tipos Vehículo)**
Verifica: CA-86.1.1
Dado que existen tipos de vehículo activos e inactivos
Cuando el usuario filtra por estado "activo"
Entonces el sistema muestra solo los tipos activos.

**CP-113 — Eliminación bloqueada (Tipos Vehículo)**
Verifica: CA-87.1.1
Dado que un tipo de vehículo está referenciado en un grupo vigente
Cuando el administrador intenta eliminarlo
Entonces el sistema bloquea la acción e informa la causa.

## Trazabilidad de la cobertura

| CA | Caso(s) de prueba |
| --- | --- |
| CA-1.1.1 | CP-001 |
| CA-1.1.2 | CP-002 |
| CA-2.1.1 | CP-003 |
| CA-3.1.1 | CP-004 |
| CA-4.1.1 | CP-005 |
| CA-5.1.1 | CP-006 |
| CA-6.1.1 | CP-007 |
| CA-6.1.2 | CP-008 |
| CA-7.1.1 | CP-009 |
| CA-8.1.1 | CP-010 |
| CA-8.1.2 | CP-011 |
| CA-9.1.1 | CP-012 |
| CA-10.1.1 | CP-013 |
| CA-11.1.1 | CP-014 |
| CA-11.1.2 | CP-015 |
| CA-12.1.1 | CP-016 |
| CA-12.1.2 | CP-017 |
| CA-13.1.1 | CP-018 |
| CA-13.1.2 | CP-019 |
| CA-14.1.1 | CP-020 |
| CA-15.1.1 | CP-021 |
| CA-16.1.1 | CP-022 |
| CA-16.1.2 | CP-023 |
| CA-17.1.1 | CP-024 |
| CA-17.1.2 | CP-025 |
| CA-18.1.1 | CP-026 |
| CA-19.1.1 | CP-027 |
| CA-19.1.2 | CP-028 |
| CA-20.1.1 | CP-029 |
| CA-20.1.2 | CP-030 |
| CA-21.1.1 | CP-031 |
| CA-22.1.1 | CP-032 |
| CA-23.1.1 | CP-033 |
| CA-23.1.2 | CP-034 |
| CA-24.1.1 | CP-035 |
| CA-25.1.1 | CP-036 |
| CA-26.1.1 | CP-037 |
| CA-27.1.1 | CP-038 |
| CA-28.1.1 | CP-039 |
| CA-29.1.1 | CP-040 |
| CA-29.1.2 | CP-041 |
| CA-30.1.1 | CP-042 |
| CA-31.1.1 | CP-043 |
| CA-32.1.1 | CP-044 |
| CA-33.1.1 | CP-045 |
| CA-34.1.1 | CP-046 |
| CA-34.1.2 | CP-047 |
| CA-35.1.1 | CP-048 |
| CA-36.1.1 | CP-049 |
| CA-36.1.2 | CP-050 |
| CA-37.1.1 | CP-051 |
| CA-38.1.1 | CP-052 |
| CA-39.1.1 | CP-053 |
| CA-39.1.2 | CP-054 |
| CA-40.1.1 | CP-055 |
| CA-41.1.1 | CP-056 |
| CA-42.1.1 | CP-057 |
| CA-43.1.1 | CP-058 |
| CA-44.1.1 | CP-059 |
| CA-44.1.2 | CP-060 |
| CA-45.1.1 | CP-061 |
| CA-46.1.1 | CP-062 |
| CA-47.1.1 | CP-063 |
| CA-48.1.1 | CP-064 |
| CA-48.1.2 | CP-065 |
| CA-49.1.1 | CP-066 |
| CA-50.1.1 | CP-067 |
| CA-51.1.1 | CP-068 |
| CA-52.1.1 | CP-069 |
| CA-53.1.1 | CP-070 |
| CA-53.1.2 | CP-071 |
| CA-54.1.1 | CP-072 |
| CA-55.1.1 | CP-073 |
| CA-56.1.1 | CP-074 |
| CA-57.1.1 | CP-075 |
| CA-58.1.1 | CP-076 |
| CA-58.1.2 | CP-077 |
| CA-59.1.1 | CP-078 |
| CA-60.1.1 | CP-079 |
| CA-60.1.2 | CP-080 |
| CA-61.1.1 | CP-081 |
| CA-62.1.1 | CP-082 |
| CA-63.1.1 | CP-083 |
| CA-63.1.2 | CP-084 |
| CA-64.1.1 | CP-085 |
| CA-65.1.1 | CP-086 |
| CA-65.1.2 | CP-087 |
| CA-66.1.1 | CP-088 |
| CA-67.1.1 | CP-089 |
| CA-68.1.1 | CP-090 |
| CA-68.1.2 | CP-091 |
| CA-69.1.1 | CP-092 |
| CA-70.1.1 | CP-093 |
| CA-71.1.1 | CP-094 |
| CA-72.1.1 | CP-095 |
| CA-73.1.1 | CP-096 |
| CA-73.1.2 | CP-097 |
| CA-74.1.1 | CP-098 |
| CA-75.1.1 | CP-099 |
| CA-76.1.1 | CP-100 |
| CA-77.1.1 | CP-101 |
| CA-78.1.1 | CP-102 |
| CA-78.1.2 | CP-103 |
| CA-79.1.1 | CP-104 |
| CA-80.1.1 | CP-105 |
| CA-81.1.1 | CP-106 |
| CA-82.1.1 | CP-107 |
| CA-83.1.1 | CP-108 |
| CA-83.1.2 | CP-109 |
| CA-84.1.1 | CP-110 |
| CA-85.1.1 | CP-111 |
| CA-86.1.1 | CP-112 |
| CA-87.1.1 | CP-113 |

Todos los criterios de aceptación (CA) del documento quedan cubiertos por al menos un caso de prueba (CP), con correspondencia 1 a 1 entre el escenario descrito en el CA y su verificación en el CP. Los escenarios adicionales (permisos/visibilidad diferenciados por rol) quedan señalados como pregunta abierta, ya que su definición depende de SUP-01.

---

# Preguntas abiertas

- ¿Existen otros roles (p. ej. supervisor, auditor) con permisos diferenciados sobre estos catálogos que deban reflejarse en criterios de aceptación adicionales de permisos/visibilidad? (Relacionado con SUP-01.)
- ¿El catálogo de Grupos requiere una entidad de "detalle de grupo" (miembros) independiente, o los miembros se heredan directamente de otros catálogos (Empleados, Clientes) según el tipo de agrupación?
- ¿Los Tipos Aeronave, Tipos Vehículo y Tipos Asegurado se usan únicamente como catálogo de referencia (un valor por registro asegurado) o permiten selección múltiple en todos los casos?
- ¿Cuál es el tiempo de retención legal exacto requerido para la bitácora de auditoría de catálogos en cada país donde opera Civentor? (Afecta RNF-005.)