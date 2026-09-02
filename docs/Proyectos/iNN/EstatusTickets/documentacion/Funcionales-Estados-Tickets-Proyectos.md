# Requerimientos Funcionales — Reestructura de Estados en Tickets y Proyectos

| Campo    | Valor                                        |
|----------|-----------------------------------------------|
| Versión  | 1.0                                           |
| Fecha    | 2026-08-19                                    |
| Estado   | Validación funcional                          |
| Módulo   | Tickets y Proyectos                            |

---

## Historial de versiones

| Versión | Fecha      | Descripción del cambio                                                      | Autor           |
|---------|------------|-------------------------------------------------------------------------------|-----------------|
| 1.0     | 2026-08-19 | Versión inicial del documento. | José Antonio Solis |

---

## Actores y Roles

| Rol                        | Descripción                                                                                                   |
|-----------------------------|----------------------------------------------------------------------------------------------------------------|
| Administrador del sistema   | Perfil con permiso para administrar los catálogos de este documento (Grupos de Estados, Estados, Motivos de Cancelación): registrar, editar, cancelar y reactivar. |
| CAU                         | Analista del Centro de Atención a Usuarios, responsable de la investigación e ingreso de Tickets. |
| Soporte                     | Personal que atiende y resuelve Tickets asignados. |
| Áreas Especializadas         | Desarrollo, Ciberseguridad, Redes, Servidores y Base de Datos; atienden Tickets o actividades de Proyecto que requieren su especialidad. |

> El detalle de permisos por rol (qué acción puede ejecutar cada uno) se documenta en el documento de seguridad por rol, fuera del alcance de este documento (ver sección 2).

---

## 1. Propósito del documento

Registrar y versionar los requerimientos funcionales de la reestructura de estados en Tickets y Proyectos, organizados por requerimiento (RF). Cada RF incluye descripción, User Stories (US) y Criterios de Aceptación (CA).

## 2. Alcance del documento

**Incluye:**
- Requerimientos funcionales organizados por RF
- User Stories (US) y Criterios de Aceptación (CA) por requerimiento
- Reglas de cálculo y visualización
- Reglas transversales compartidas

**No incluye:**
- Implementación técnica de consultas o persistencia
- Detalle de seguridad por rol (se documenta en documento separado)
- Maquetas o diseño visual

## 3. Índice de requerimientos

| RF | Título | Grupo | Plataforma | Estatus | Asignado |
|----|--------|-------|------------|---------|----------|
| [RF-01](#rf-01--administración-de-grupos-de-estados) | Administración de Grupos de Estados | Catálogos | BSuite | Completado | Falcón |
| [RF-02](#rf-02--administración-de-estados) | Administración de Estados | Catálogos | BSuite | Completado | Falcón |
| [RF-03](#rf-03--administración-de-motivos-de-cancelación) | Administración de Motivos de Cancelación | Catálogos | BSuite | Completado | Falcón |
| [RF-04](#rf-04--importación-de-los-estados-existentes-al-catálogo) | Importación de los Estados existentes al catálogo | Catálogos | BSuite | Completado | Falcón |
| [RF-05](#rf-05--marca-de-validación-en-el-catálogo-de-servicios-de-tickets) | Marca de Validación en el catálogo de Servicios de Tickets | Catálogos | BSuite | En Proceso | Jiri |
| [RF-06](#rf-06--marca-de-autorización-en-los-catálogos-de-servicios) | Marca de Autorización en los catálogos de Servicios | Catálogos | BSuite | En Proceso | Jiri |
| [RF-07](#rf-07--bitácora-obligatoria-del-servicio-cliente-relacionada-al-catálogo-de-estados) | Bitácora obligatoria del Servicio Cliente relacionada al catálogo de Estados (trigger de base de datos) | Servicio Cliente | BSuite | En Proceso | Falcón |
| [RF-08](#rf-08--registro-del-servicio-con-estatus-registrado) | Registro del Servicio con Estatus Registrado | Servicio Cliente | BSuite | Completado | Falcón |
| [RF-09](#rf-09--visualización-de-trayectoria-en-mis-tickets) | Visualización de Trayectoria en Mis Tickets | Servicio Cliente | BSuite | Completado | Falcón |
| [RF-10](#rf-10--transición-de-registrado-a-investigación-cau-desde-monitor-cau) | Transición de Registrado a Investigación CAU desde Monitor CAU | Monitor CAU | BSuite | Completado | Falcón |
| [RF-11](#rf-11--rediseño-de-tarjetas-del-monitor-cau) | Rediseño de tarjetas del Monitor CAU | Monitor CAU | BSuite | Completado | Jiri |
| [RF-12](#rf-12--adecuación-del-wizard-de-registro-de-ticket-o-solicitud-de-servicio) | Adecuación del wizard de registro de Ticket o Solicitud de Servicio | Monitor CAU | BSuite | Completado | Falcón |
| [RF-13](#rf-13--registro-automático-de-autorización-al-generar-ticket-o-solicitud-de-servicio) | Registro automático de autorización al generar Ticket o Solicitud de Servicio | Monitor CAU | BSuite | Completado | Falcón |
| [RF-14](#rf-14--cancelación-del-servicio-desde-el-wizard) | Cancelación del Servicio desde el wizard | Monitor CAU | BSuite | Completado | Falcón |
| [RF-15](#rf-15--transición-del-ticket-a-proceso-con-la-persona-asignada-del-wizard-y-su-historial-de-asignaciones) | Transición del Ticket a "Proceso" con la Persona Asignada del wizard y su historial de asignaciones | Monitor CAU | BSuite | En Proceso | Jiri |
| [RF-16](#rf-16--alta-del-estado-ing-traslado) | Alta del Estado "Ing. Traslado" | Catálogos | BSuite | Definición | |
| [RF-17](#rf-17--transición-del-ticket-a-ing-traslado-y-su-reverso-a-en-proceso) | Transición del Ticket a "Ing. Traslado" y su reverso a "En Proceso" | Monitor CAU | BSuite | Definición | |
| [RF-18](#rf-18--alta-del-estado-en-espera-del-usuario) | Alta del Estado "En Espera del Usuario" | Catálogos | BSuite | Definición | |
| [RF-19](#rf-19--transición-del-ticket-a-en-espera-del-usuario-y-su-reverso-a-en-proceso) | Transición del Ticket a "En Espera del Usuario" y su reverso a "En Proceso" | Monitor CAU | BSuite | Definición | |
| [RF-20](#rf-20--alta-del-estado-en-validación) | Alta del Estado "En Validación" | Catálogos | BSuite | Definición | |
| [RF-21](#rf-21--transición-del-ticket-a-en-validación-al-cerrarse-un-servicio-que-la-requiere) | Transición del Ticket a "En Validación" al cerrarse un servicio que la requiere | Monitor CAU | BSuite | Definición | |
| [RF-22](#rf-22--alta-del-estado-autorización-financiera) | Alta del Estado "Autorización Financiera" | Catálogos | BSuite | Definición | |
| [RF-23](#rf-23--autorización-financiera-del-ticket-a-partir-de-compras-registradas-en-sus-diagnósticos) | Autorización Financiera del Ticket a partir de compras registradas en sus Diagnósticos | Monitor CAU | BSuite | Definición | |
| [RF-24](#rf-24--job-para-finalizar-tickets-con-plazo-de-validación-vencido) | Job para finalizar Tickets con plazo de validación vencido | Monitor CAU | BSuite | Definición | |

---

# RF-01 — Administración de Grupos de Estados

| Campo        | Valor      |
| ------------ | ---------- |
| Prioridad    | Alta       |
| Asignado       | Falcón |
| Dependencias | Ninguna    |

## Objetivo

Administrar de forma centralizada el catálogo de Grupos de Estados, que agrupan por significado de negocio los estados de los distintos procesos del sistema.

## Descripción

El sistema permite registrar, consultar, editar, cancelar y reactivar Grupos de Estados (por ejemplo, "Registrado", "En Proceso"), evitando que distintos procesos dupliquen el significado de un mismo estatus.

---

## US-1.1 — Registro de Grupos de Estados

Como administrador del sistema, quiero registrar nuevos Grupos de Estados capturando Clave, Nombre y Descripción, para dar de alta el catálogo con el que se homologarán los estados de los distintos procesos.

### Reglas de negocio

**RN-1.1** La Clave será obligatoria y no podrá duplicarse contra ningún otro grupo del catálogo (incluyendo grupos cancelados).

**RN-1.2** El Nombre será obligatorio y no podrá duplicarse contra ningún otro grupo del catálogo, sin distinguir entre mayúsculas y minúsculas ni espacios al inicio/final (por ejemplo, "En Proceso", "EN PROCESO" y " en proceso " se consideran el mismo nombre).

**RN-1.3** La Descripción será obligatoria.

**RN-1.4** Todo grupo se crea con Estado del Registro = Activo.

**RN-1.5** Todo alta, edición, cancelación o reactivación realizada en el catálogo deberá registrarse en la bitácora de auditoría.

### Criterios de Aceptación

**CA-1.1.1 — Registro exitoso**
Dado que el administrador captura una Clave y un Nombre que no existen en el catálogo, junto con la Descripción
Cuando seleccione Registrar
Entonces el sistema creará el nuevo grupo con Estado del Registro = Activo y lo dejará disponible para su consulta.

**CA-1.1.2 — Clave duplicada**
Dado que existe un grupo (activo o cancelado) con la misma Clave
Cuando el administrador intente registrar un nuevo grupo con esa Clave
Entonces el sistema impedirá el registro e informará que la Clave ya existe.

**CA-1.1.3 — Nombre duplicado**
Dado que existe un grupo (activo o cancelado) con el mismo Nombre, sin distinguir mayúsculas/minúsculas ni espacios
Cuando el administrador intente registrar un nuevo grupo con ese Nombre
Entonces el sistema impedirá el registro e informará que el Nombre ya existe.

**CA-1.1.4 — Campos obligatorios**
Dado que el administrador no captura la Clave, el Nombre o la Descripción
Cuando intente registrar el grupo
Entonces el sistema impedirá el registro e indicará los campos obligatorios faltantes.

---

## US-1.2 — Edición de Grupos de Estados

Como administrador del sistema, quiero editar la información de un Grupo de Estados existente, para corregir o actualizar su Nombre o Descripción sin perder su identificador ni su historial.

### Reglas de negocio

**RN-1.6** La Clave no podrá modificarse una vez creado el grupo.

**RN-1.7** El Nombre podrá editarse siempre que el nuevo valor no coincida (sin distinguir mayúsculas/minúsculas ni espacios) con el de otro grupo del catálogo.

**RN-1.8** Un grupo con Estado del Registro = Cancelado no podrá editarse; primero deberá reactivarse.

**RN-1.9** La Descripción no podrá quedar vacía al editarla, dado que es obligatoria.

### Criterios de Aceptación

**CA-1.2.1 — Edición exitosa**
Dado un grupo activo existente
Cuando el administrador modifique su Nombre y/o Descripción con datos válidos
Entonces el sistema actualizará el registro conservando su Clave.

**CA-1.2.2 — Nombre duplicado al editar**
Dado un grupo activo existente
Cuando el administrador intente editar su Nombre a uno ya utilizado por otro grupo
Entonces el sistema impedirá la actualización e informará que el Nombre ya existe.

**CA-1.2.3 — Edición de grupo cancelado**
Dado un grupo con Estado del Registro = Cancelado
Cuando el administrador intente editarlo
Entonces el sistema impedirá la edición e indicará que el grupo debe reactivarse primero.

---

## US-1.3 — Cancelación de Grupos de Estados

Como administrador del sistema, quiero cancelar un Grupo de Estados que ya no debe utilizarse, para evitar que se asigne a nuevos estados sin eliminar la información histórica.

### Reglas de negocio

**RN-1.10** La cancelación es lógica: el sistema no permitirá eliminar físicamente un grupo, únicamente cambiar su Estado del Registro a Cancelado.

**RN-1.11** La cancelación de un grupo no modifica ni elimina los registros o estados que ya lo tengan asignado.

**RN-1.12** Un grupo cancelado no podrá asignarse a nuevos estados de ningún catálogo que lo consuma.

### Criterios de Aceptación

**CA-1.3.1 — Cancelación exitosa**
Dado un grupo con Estado del Registro = Activo
Cuando el administrador seleccione Cancelar
Entonces el sistema cambiará su Estado del Registro a Cancelado, conservando la información histórica.

**CA-1.3.2 — Cancelación de grupo ya cancelado**
Dado un grupo con Estado del Registro = Cancelado
Cuando el administrador intente cancelarlo nuevamente
Entonces el sistema no permitirá la operación e indicará que el grupo ya se encuentra cancelado.

---

## US-1.4 — Reactivación de Grupos de Estados

Como administrador del sistema, quiero reactivar un Grupo de Estados previamente cancelado, para volver a utilizarlo cuando el hecho de negocio que representa vuelva a ser vigente.

### Reglas de negocio

**RN-1.13** Un grupo solo podrá reactivarse si su Estado del Registro actual es Cancelado.

**RN-1.14** Un grupo podrá reactivarse únicamente si no existe otro grupo Activo con el mismo Nombre (sin distinguir mayúsculas/minúsculas ni espacios).

### Criterios de Aceptación

**CA-1.4.1 — Reactivación exitosa**
Dado un grupo con Estado del Registro = Cancelado y sin que exista otro grupo activo con el mismo Nombre
Cuando el administrador seleccione Reactivar
Entonces el sistema cambiará su Estado del Registro a Activo.

**CA-1.4.2 — Reactivación bloqueada por nombre duplicado**
Dado un grupo con Estado del Registro = Cancelado cuyo Nombre coincide con el de un grupo actualmente Activo
Cuando el administrador seleccione Reactivar
Entonces el sistema impedirá la reactivación e informará que ya existe un grupo activo con ese Nombre.

**CA-1.4.3 — Reactivación de grupo activo**
Dado un grupo con Estado del Registro = Activo
Cuando el administrador intente reactivarlo
Entonces el sistema no permitirá la operación e indicará que el grupo ya se encuentra activo.

---

**Regla transversal:**
El catálogo de Grupos de Estados es prerrequisito de cualquier catálogo de estados que lo consuma: cuando un estado de dichos catálogos se homologa a un Grupo de Estados, este debe estar Activo, evitando que el mismo hecho de negocio se represente con nombres distintos entre procesos. La Clave y el Nombre son únicos en todo el catálogo, considerando tanto los grupos Activos como los Cancelados.

---


---

# RF-02 — Administración de Estados

| Campo        | Valor      |
| ------------ | ---------- |
| Prioridad    | Alta       |
| Asignado       | Falcón |
| Dependencias | RF-01      |

## Objetivo

Administrar el catálogo de Estados que utilizan los procesos del sistema, homologándolos opcionalmente a un Grupo de Estados y dotándolos de la información visual (Mensaje corto, Color, Ícono) con la que se presentan a los usuarios.

## Descripción

El sistema permite registrar, consultar, editar, cancelar y reactivar Estados, con el mismo esquema administrativo de RF-01. El Grupo de Estados, el Color y el Ícono son opcionales; el Mensaje corto es obligatorio. Todos sirven para reutilizar significado entre procesos e identificar visualmente al Estado en tarjetas y bitácoras.

---

## US-2.1 — Registro de Estados

Como administrador del sistema, quiero registrar nuevos Estados asociados a un Grupo de Estados, para dar de alta el catálogo de estatus que utilizarán los distintos procesos del sistema.

### Reglas de negocio

**RN-2.1** La Clave será obligatoria y no podrá duplicarse contra ningún otro estado del catálogo (incluyendo estados cancelados).

**RN-2.2** El Nombre será obligatorio y no podrá duplicarse contra ningún otro estado del catálogo, sin importar el Grupo de Estados al que pertenezca, sin distinguir mayúsculas/minúsculas ni espacios al inicio/final.

**RN-2.3** El Grupo de Estados es opcional; cuando se captura, deberá corresponder a un grupo con Estado del Registro = Activo (RF-01).

**RN-2.4** El Mensaje corto será obligatorio.

**RN-2.5** El Color es opcional; cuando se captura, se utiliza para identificar visualmente al Estado en las tarjetas y bitácoras de los procesos que lo consumen.

**RN-2.6** El Ícono es opcional; cuando se captura, se utiliza para identificar visualmente al Estado en las tarjetas y bitácoras de los procesos que lo consumen.

**RN-2.7** Todo estado se crea con Estado del Registro = Activo.

**RN-2.8** Todo alta, edición, cancelación o reactivación realizada en el catálogo de Estados deberá registrarse en la bitácora de auditoría.

### Criterios de Aceptación

**CA-2.1.1 — Registro exitoso**
Dado que el administrador captura una Clave y un Nombre que no existen en el catálogo, junto con el Mensaje corto
Cuando seleccione Registrar
Entonces el sistema creará el nuevo estado con Estado del Registro = Activo y lo dejará disponible para su consulta, con o sin Grupo de Estados asignado.

**CA-2.1.2 — Clave duplicada**
Dado que existe un estado (activo o cancelado) con la misma Clave
Cuando el administrador intente registrar un nuevo estado con esa Clave
Entonces el sistema impedirá el registro e informará que la Clave ya existe.

**CA-2.1.3 — Nombre duplicado**
Dado que existe un estado (activo o cancelado) con el mismo Nombre, sin distinguir mayúsculas/minúsculas ni espacios, sin importar su Grupo de Estados
Cuando el administrador intente registrar un nuevo estado con ese Nombre
Entonces el sistema impedirá el registro e informará que el Nombre ya existe.

**CA-2.1.4 — Grupo de Estados inválido**
Dado que el administrador selecciona un Grupo de Estados con Estado del Registro = Cancelado
Cuando intente registrar el estado
Entonces el sistema impedirá el registro e indicará que el Grupo de Estados seleccionado debe estar Activo.

**CA-2.1.5 — Campos obligatorios**
Dado que el administrador no captura la Clave, el Nombre o el Mensaje corto
Cuando intente registrar el estado
Entonces el sistema impedirá el registro e indicará los campos obligatorios faltantes.

---

## US-2.2 — Edición de Estados

Como administrador del sistema, quiero editar la información de un Estado existente, para corregir o actualizar su Nombre, Mensaje corto, Color, Ícono o Grupo de Estados sin perder su identificador ni su historial.

### Reglas de negocio

**RN-2.9** La Clave no podrá modificarse una vez creado el estado.

**RN-2.10** El Nombre podrá editarse siempre que el nuevo valor no coincida (sin distinguir mayúsculas/minúsculas ni espacios) con el de otro estado del catálogo.

**RN-2.11** El Grupo de Estados podrá asignarse, reasignarse o retirarse (dejar el estado sin Grupo de Estados); cuando se asigne o reasigne, el grupo indicado deberá tener Estado del Registro = Activo.

**RN-2.12** Un estado con Estado del Registro = Cancelado no podrá editarse; primero deberá reactivarse.

**RN-2.13** El Mensaje corto no podrá quedar vacío al editarlo, dado que es obligatorio.

### Criterios de Aceptación

**CA-2.2.1 — Edición exitosa**
Dado un estado activo existente
Cuando el administrador modifique su Nombre, Mensaje corto, Color, Ícono y/o Grupo de Estados con datos válidos
Entonces el sistema actualizará el registro conservando su Clave.

**CA-2.2.2 — Nombre duplicado al editar**
Dado un estado activo existente
Cuando el administrador intente editar su Nombre a uno ya utilizado por otro estado
Entonces el sistema impedirá la actualización e informará que el Nombre ya existe.

**CA-2.2.3 — Reasignación a grupo cancelado**
Dado un estado activo existente
Cuando el administrador intente reasignarlo a un Grupo de Estados Cancelado
Entonces el sistema impedirá la actualización e indicará que el grupo debe estar Activo.

**CA-2.2.4 — Edición de estado cancelado**
Dado un estado con Estado del Registro = Cancelado
Cuando el administrador intente editarlo
Entonces el sistema impedirá la edición e indicará que el estado debe reactivarse primero.

---

## US-2.3 — Cancelación de Estados

Como administrador del sistema, quiero cancelar un Estado que ya no debe utilizarse, para evitar que se asigne a nuevos registros sin eliminar la información histórica.

### Reglas de negocio

**RN-2.14** La cancelación es lógica: el sistema no permitirá eliminar físicamente un estado, únicamente cambiar su Estado del Registro a Cancelado.

**RN-2.15** La cancelación de un estado no modifica ni elimina los registros que ya lo tengan asignado.

**RN-2.16** Un estado cancelado no podrá asignarse a nuevos registros de ningún proceso.

### Criterios de Aceptación

**CA-2.3.1 — Cancelación exitosa**
Dado un estado con Estado del Registro = Activo
Cuando el administrador seleccione Cancelar
Entonces el sistema cambiará su Estado del Registro a Cancelado, conservando la información histórica.

**CA-2.3.2 — Cancelación de estado ya cancelado**
Dado un estado con Estado del Registro = Cancelado
Cuando el administrador intente cancelarlo nuevamente
Entonces el sistema no permitirá la operación e indicará que el estado ya se encuentra cancelado.

---

## US-2.4 — Reactivación de Estados

Como administrador del sistema, quiero reactivar un Estado previamente cancelado, para volver a utilizarlo cuando el estatus que representa vuelva a ser vigente.

### Reglas de negocio

**RN-2.17** Un estado solo podrá reactivarse si su Estado del Registro actual es Cancelado.

**RN-2.18** Un estado podrá reactivarse únicamente si no existe otro estado Activo con el mismo Nombre (sin distinguir mayúsculas/minúsculas ni espacios).

**RN-2.19** Si el estado tiene un Grupo de Estados asociado, solo podrá reactivarse si dicho grupo tiene Estado del Registro = Activo; si el estado no tiene Grupo de Estados asociado, esta condición no aplica.

### Criterios de Aceptación

**CA-2.4.1 — Reactivación exitosa**
Dado un estado con Estado del Registro = Cancelado, sin que exista otro estado activo con el mismo Nombre, y cuyo Grupo de Estados (si tiene uno asignado) esté Activo
Cuando el administrador seleccione Reactivar
Entonces el sistema cambiará su Estado del Registro a Activo.

**CA-2.4.2 — Reactivación bloqueada por nombre duplicado**
Dado un estado con Estado del Registro = Cancelado cuyo Nombre coincide con el de un estado actualmente Activo
Cuando el administrador seleccione Reactivar
Entonces el sistema impedirá la reactivación e informará que ya existe un estado activo con ese Nombre.

**CA-2.4.3 — Reactivación bloqueada por grupo cancelado**
Dado un estado con Estado del Registro = Cancelado cuyo Grupo de Estados asociado se encuentra Cancelado
Cuando el administrador seleccione Reactivar
Entonces el sistema impedirá la reactivación e indicará que el Grupo de Estados debe estar Activo.

**CA-2.4.4 — Reactivación de estado activo**
Dado un estado con Estado del Registro = Activo
Cuando el administrador intente reactivarlo
Entonces el sistema no permitirá la operación e indicará que el estado ya se encuentra activo.

---

**Regla transversal:**
Un Estado puede pertenecer, de forma opcional, a un Grupo de Estados (RF-01); cuando lo tenga asignado, dicho grupo debe estar Activo. La Clave y el Nombre del Estado son únicos en todo el catálogo, considerando tanto los estados Activos como los Cancelados, independientemente del Grupo de Estados al que pertenezcan o de si no tienen uno asignado.

---


---

# RF-03 — Administración de Motivos de Cancelación

| Campo        | Valor      |
| ------------ | ---------- |
| Prioridad    | Alta       |
| Asignado       | Falcón |
| Dependencias | Ninguna    |

## Objetivo

Administrar de forma centralizada el catálogo de Motivos de Cancelación, utilizado para documentar la causa por la que se cancela un Servicio.

## Descripción

El sistema permite registrar, consultar, editar, cancelar y reactivar Motivos de Cancelación, con el mismo esquema administrativo de los demás catálogos. El indicador "Requiere Especificar" (por ejemplo, en "Otro") exige capturar un detalle adicional en texto libre al usarse en una cancelación.

---

## US-3.1 — Registro de Motivos de Cancelación

Como administrador del sistema, quiero registrar nuevos Motivos de Cancelación capturando Clave, Nombre y Descripción, para dar de alta el catálogo con el que se documentarán las cancelaciones de Servicio.

### Reglas de negocio

**RN-3.1** La Clave será obligatoria y no podrá duplicarse contra ningún otro motivo del catálogo (incluyendo motivos cancelados).

**RN-3.2** El Nombre será obligatorio y no podrá duplicarse contra ningún otro motivo del catálogo, sin distinguir mayúsculas/minúsculas ni espacios al inicio/final.

**RN-3.3** La Descripción será obligatoria.

**RN-3.4** El Motivo de Cancelación cuenta con un indicador "Requiere Especificar", opcional, con valor por defecto No; cuando está en Sí, señala que este motivo exige capturar un detalle adicional en texto libre al utilizarse en una cancelación (por ejemplo, un motivo "Otro").

**RN-3.5** Todo motivo se crea con Estado del Registro = Activo.

**RN-3.6** Todo alta, edición, cancelación o reactivación realizada en el catálogo deberá registrarse en la bitácora de auditoría.

### Criterios de Aceptación

**CA-3.1.1 — Registro exitoso**
Dado que el administrador captura una Clave y un Nombre que no existen en el catálogo, junto con la Descripción
Cuando seleccione Registrar
Entonces el sistema creará el nuevo motivo con Estado del Registro = Activo y lo dejará disponible para su consulta.

**CA-3.1.5 — Valor por defecto de Requiere Especificar**
Dado que el administrador registra un nuevo motivo sin modificar el valor propuesto de "Requiere Especificar"
Cuando seleccione Registrar
Entonces el motivo queda creado con "Requiere Especificar" = No.

**CA-3.1.2 — Clave duplicada**
Dado que existe un motivo (activo o cancelado) con la misma Clave
Cuando el administrador intente registrar un nuevo motivo con esa Clave
Entonces el sistema impedirá el registro e informará que la Clave ya existe.

**CA-3.1.3 — Nombre duplicado**
Dado que existe un motivo (activo o cancelado) con el mismo Nombre, sin distinguir mayúsculas/minúsculas ni espacios
Cuando el administrador intente registrar un nuevo motivo con ese Nombre
Entonces el sistema impedirá el registro e informará que el Nombre ya existe.

**CA-3.1.4 — Campos obligatorios**
Dado que el administrador no captura la Clave, el Nombre o la Descripción
Cuando intente registrar el motivo
Entonces el sistema impedirá el registro e indicará los campos obligatorios faltantes.

---

## US-3.2 — Edición de Motivos de Cancelación

Como administrador del sistema, quiero editar la información de un Motivo de Cancelación existente, para corregir o actualizar su Nombre, Descripción o indicador "Requiere Especificar" sin perder su identificador ni su historial.

### Reglas de negocio

**RN-3.7** La Clave no podrá modificarse una vez creado el motivo.

**RN-3.8** El Nombre podrá editarse siempre que el nuevo valor no coincida (sin distinguir mayúsculas/minúsculas ni espacios) con el de otro motivo del catálogo.

**RN-3.9** Un motivo con Estado del Registro = Cancelado no podrá editarse; primero deberá reactivarse.

**RN-3.10** La Descripción no podrá quedar vacía al editarla, dado que es obligatoria.

**RN-3.11** El indicador "Requiere Especificar" podrá editarse en cualquier momento sobre un motivo Activo.

### Criterios de Aceptación

**CA-3.2.1 — Edición exitosa**
Dado un motivo activo existente
Cuando el administrador modifique su Nombre, Descripción y/o indicador "Requiere Especificar" con datos válidos
Entonces el sistema actualizará el registro conservando su Clave.

**CA-3.2.2 — Nombre duplicado al editar**
Dado un motivo activo existente
Cuando el administrador intente editar su Nombre a uno ya utilizado por otro motivo
Entonces el sistema impedirá la actualización e informará que el Nombre ya existe.

**CA-3.2.3 — Edición de motivo cancelado**
Dado un motivo con Estado del Registro = Cancelado
Cuando el administrador intente editarlo
Entonces el sistema impedirá la edición e indicará que el motivo debe reactivarse primero.

---

## US-3.3 — Cancelación de Motivos de Cancelación

Como administrador del sistema, quiero cancelar un Motivo de Cancelación que ya no debe utilizarse, para evitar que se asigne a nuevas cancelaciones sin eliminar la información histórica.

### Reglas de negocio

**RN-3.12** La cancelación es lógica: el sistema no permitirá eliminar físicamente un motivo, únicamente cambiar su Estado del Registro a Cancelado.

**RN-3.13** La cancelación de un motivo no modifica ni elimina las cancelaciones de Servicio que ya lo tengan asignado.

**RN-3.14** Un motivo cancelado no podrá asignarse a nuevas cancelaciones de Servicio.

### Criterios de Aceptación

**CA-3.3.1 — Cancelación exitosa**
Dado un motivo con Estado del Registro = Activo
Cuando el administrador seleccione Cancelar
Entonces el sistema cambiará su Estado del Registro a Cancelado, conservando la información histórica.

**CA-3.3.2 — Cancelación de motivo ya cancelado**
Dado un motivo con Estado del Registro = Cancelado
Cuando el administrador intente cancelarlo nuevamente
Entonces el sistema no permitirá la operación e indicará que el motivo ya se encuentra cancelado.

---

## US-3.4 — Reactivación de Motivos de Cancelación

Como administrador del sistema, quiero reactivar un Motivo de Cancelación previamente cancelado, para volver a utilizarlo cuando vuelva a ser vigente.

### Reglas de negocio

**RN-3.15** Un motivo solo podrá reactivarse si su Estado del Registro actual es Cancelado.

**RN-3.16** Un motivo podrá reactivarse únicamente si no existe otro motivo Activo con el mismo Nombre (sin distinguir mayúsculas/minúsculas ni espacios).

### Criterios de Aceptación

**CA-3.4.1 — Reactivación exitosa**
Dado un motivo con Estado del Registro = Cancelado y sin que exista otro motivo activo con el mismo Nombre
Cuando el administrador seleccione Reactivar
Entonces el sistema cambiará su Estado del Registro a Activo.

**CA-3.4.2 — Reactivación bloqueada por nombre duplicado**
Dado un motivo con Estado del Registro = Cancelado cuyo Nombre coincide con el de un motivo actualmente Activo
Cuando el administrador seleccione Reactivar
Entonces el sistema impedirá la reactivación e informará que ya existe un motivo activo con ese Nombre.

**CA-3.4.3 — Reactivación de motivo activo**
Dado un motivo con Estado del Registro = Activo
Cuando el administrador intente reactivarlo
Entonces el sistema no permitirá la operación e indicará que el motivo ya se encuentra activo.

---

**Regla transversal:**
El catálogo de Motivos de Cancelación es prerrequisito de cualquier acción de cancelación que lo consuma; un motivo cancelado no puede utilizarse en nuevas cancelaciones, pero las cancelaciones ya registradas que lo tengan asignado no se ven afectadas.

---


---

# RF-04 — Importación de los Estados existentes al catálogo

| Campo        | Valor      |
| ------------ | ---------- |
| Prioridad    | Alta       |
| Asignado       | Falcón |
| Dependencias | RF-02      |

## Objetivo

Cargar en el catálogo de Estados (RF-02) los estatus que hoy están definidos de forma fija en el sistema, para que quede poblado desde su entrada en operación con un dato equivalente a cada valor ya utilizado.

## Descripción

El sistema utiliza hoy un listado fijo de más de 120 estatus, compartido por múltiples módulos (Compras, Backbone, Gestión de Proyectos, Cómputo, entre otros), que no proviene del catálogo de Estados (RF-02). Este RF carga ese listado completo al catálogo en un solo evento —no solo lo que usan hoy Ticket y Proyecto—, tomando de cada estatus su Nombre, Color e Ícono, sin Grupo de Estados. No es un proceso recurrente.

La carga la ejecuta el equipo de desarrollo como codificación única; no es una acción disponible para el administrador del sistema.

---

## US-4.1 — Carga inicial de los Estados existentes

Como analista de negocio, quiero que el catálogo de Estados quede poblado desde el inicio con un registro equivalente a cada estatus fijo que ya utiliza el sistema, para que los procesos existentes cuenten de inmediato con sus Estados ya homologados en el catálogo administrado.

### Reglas de negocio

**RN-4.1** Se realiza una carga inicial única que registra en el catálogo de Estados un Estado por cada estatus fijo del listado global actualmente utilizado por los procesos del sistema, sin acotarse a los que hoy consumen Ticket y Proyecto.

**RN-4.2** Cada Estado importado toma como **Nombre** el texto de despliegue ya utilizado para ese estatus (por ejemplo, "REGISTRADO"). La **Clave** se genera de forma secuencial con el formato `CV###` (por ejemplo, CV001, CV002…), sin relación con el identificador interno de código del estatus, respetando las reglas de unicidad de Clave y Nombre del catálogo (RF-02).

**RN-4.3** Cuando el estatus fijo ya cuenta con un Color y/o un Ícono definidos, estos se replican en el Estado importado; cuando no cuente con ellos, el Estado se importa sin Color y/o sin Ícono, dado que ambos son opcionales (RF-02).

**RN-4.4** Los Estados importados no se asocian a ningún Grupo de Estados durante la carga inicial, dado que el Grupo de Estados es opcional (RF-02); su homologación a un Grupo de Estados, si llegara a requerirse, queda fuera de alcance de este RF.

**RN-4.5** Todo Estado importado se crea con Estado del Registro = Activo.

**RN-4.6** Esta carga es un evento único al entrar en operación este RF; no es un proceso recurrente ni se vuelve a ejecutar ante altas futuras del listado fijo de estatus, las cuales se incorporarán manualmente al catálogo conforme a RF-02.

### Criterios de Aceptación

**CA-4.1.1 — Importación completa**
Dado el listado fijo global de estatus que actualmente utilizan los procesos del sistema
Cuando se ejecuta la carga inicial de este RF
Entonces el catálogo de Estados queda con un registro por cada uno de esos estatus, con Estado del Registro = Activo, Clave con formato `CV###` y Nombre igual al texto de despliegue original.

**CA-4.1.2 — Réplica de Color e Ícono existentes**
Dado un estatus fijo que ya cuenta con Color y/o Ícono definidos
Cuando se importa al catálogo de Estados
Entonces el Estado resultante conserva ese mismo Color y/o Ícono.

**CA-4.1.3 — Importación sin Grupo de Estados**
Dado que se ejecuta la carga inicial de este RF
Cuando se revisan los Estados resultantes
Entonces ninguno queda asociado a un Grupo de Estados.

**CA-4.1.4 — Evento único**
Dado que la carga inicial de este RF ya se ejecutó
Cuando se da de alta manualmente un nuevo estatus fijo en el sistema
Entonces dicha alta no dispara una nueva ejecución de la carga inicial; su incorporación al catálogo de Estados se realiza manualmente conforme a RF-02.

---

**Regla transversal:**
Este RF depende del catálogo de Estados (RF-02), y de que el Grupo de Estados sea un dato opcional en dicho catálogo, para no requerir su asignación durante la carga inicial.

---


---

# RF-05 — Marca de Validación en el catálogo de Servicios de Tickets

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Media        |
| Asignado         | Jiri   |
| Dependencias   | Ninguna      |

## Objetivo

Incorporar al catálogo de Servicios de Tickets (TipoServicioComputo) una marca que indique si el tipo de servicio requiere validación del usuario que reporta antes de darse por concluido, junto con su tiempo de expiración en horas.

## Descripción

El catálogo de Servicios de Tickets no distingue hoy qué tipos de servicio exigen una confirmación adicional del usuario que reporta antes de cerrarse. Este RF agrega dos campos al catálogo: un indicador booleano "Requiere Validación" y un "Tiempo de Expiración de Validación (Horas)". Es únicamente alta de datos; su consumo por el cierre del Ticket queda fuera de alcance de este RF.

---

## US-5.1 — Captura de la marca de validación y su tiempo de expiración

Como administrador del catálogo de Servicios de Tickets, quiero marcar si un tipo de servicio requiere validación y capturar su tiempo de expiración en horas, para contar con esta información base en el catálogo.

### Reglas de negocio

**RN-5.1** El catálogo incorpora un campo booleano "Requiere Validación", con valor por defecto No.

**RN-5.2** El catálogo incorpora un campo numérico "Tiempo de Expiración de Validación (Horas)".

**RN-5.3** El campo "Tiempo de Expiración de Validación (Horas)" será obligatorio y mayor a cero únicamente cuando "Requiere Validación" = Sí.

**RN-5.4** Cuando "Requiere Validación" = No, el campo "Tiempo de Expiración de Validación (Horas)" no se exige; si ya tenía un valor capturado, se conserva sin exigirse ni validarse.

**RN-5.5** Toda alta o edición de estos dos campos debe registrarse en la bitácora de auditoría del catálogo, conforme al mecanismo ya utilizado por los demás campos de TipoServicioComputo.

### Criterios de Aceptación

**CA-5.1.1 — Alta con validación requerida**
Dado que el administrador marca "Requiere Validación" = Sí y captura un "Tiempo de Expiración de Validación (Horas)" mayor a cero
Cuando registra o edita el tipo de servicio
Entonces el sistema guarda ambos valores en el catálogo.

**CA-5.1.2 — Tiempo obligatorio cuando se requiere validación**
Dado que "Requiere Validación" = Sí
Cuando el administrador intenta guardar el tipo de servicio sin capturar el "Tiempo de Expiración de Validación (Horas)", o con un valor menor o igual a cero
Entonces el sistema impide el registro e indica que el campo es obligatorio y debe ser mayor a cero.

**CA-5.1.3 — Sin validación no exige tiempo**
Dado que "Requiere Validación" = No
Cuando el administrador guarda el tipo de servicio sin capturar el "Tiempo de Expiración de Validación (Horas)"
Entonces el sistema permite el registro sin exigir dicho campo.

**CA-5.1.4 — Registro en bitácora**
Dado un tipo de servicio existente
Cuando se modifica el valor de "Requiere Validación" o de "Tiempo de Expiración de Validación (Horas)"
Entonces queda un registro en la bitácora de auditoría del catálogo con el valor anterior del campo modificado.

---

**Regla transversal:**
Este RF cubre únicamente el alta de datos en el catálogo de Servicios de Tickets; no define su consumo por el Ticket ni por el wizard de Monitor CAU (RF-12). Dicho consumo queda fuera de alcance de este RF.

---


---

# RF-06 — Marca de Autorización en los catálogos de Servicios

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Media        |
| Asignado         | Jiri   |
| Dependencias   | Ninguna      |

## Objetivo

Estandarizar en los catálogos de Servicios de Ticket y de Solicitud de Servicio, y reflejar en el catálogo concentrador de Servicios que consulta el wizard de Monitor CAU, un único indicador "Requiere Autorización" que identifique qué Servicios exigen autorización al generarse su Ticket o Solicitud de Servicio.

## Descripción

Hoy, el sistema decide si un Ticket requiere autorización (RF-13) únicamente cuando su Servicio corresponde a un valor fijo predeterminado ("Solicitud de Acceso"), y toda Solicitud de Servicio se autoriza siempre, sin distinción por Servicio. Este RF agrega el indicador booleano "Requiere Autorización" al catálogo de Servicios de Ticket y al catálogo de Servicios de Solicitud, para que cualquier Servicio de cualquiera de los dos catálogos pueda marcarse como tal según lo determine el administrador, y hace que el catálogo concentrador de Servicios —el que efectivamente lista el wizard del CAU— refleje siempre ese mismo valor. Es únicamente alta de datos y su sincronización entre catálogos; su consumo por el registro automático de autorización se documenta en RF-13.

---

## US-6.1 — Captura de la marca en los catálogos de Servicios de origen

Como administrador de los catálogos de Servicios (de Ticket y de Solicitud de Servicio), quiero marcar si un Servicio requiere autorización, para contar con esta información base antes de que se generen Tickets o Solicitudes de Servicio a partir de él.

### Reglas de negocio

**RN-6.1** El catálogo de Servicios de Ticket y el catálogo de Servicios de Solicitud incorporan, cada uno, un campo booleano "Requiere Autorización", con valor por defecto No.

**RN-6.2** Toda alta o edición de este campo debe registrarse en la bitácora de auditoría del catálogo correspondiente, conforme al mecanismo ya utilizado por sus demás campos.

### Criterios de Aceptación

**CA-6.1.1 — Alta con autorización requerida en Servicio de Ticket**
Dado que el administrador marca "Requiere Autorización" = Sí en un Servicio del catálogo de Ticket
Cuando registra o edita el Servicio
Entonces el sistema guarda dicho valor en el catálogo.

**CA-6.1.2 — Alta con autorización requerida en Servicio de Solicitud**
Dado que el administrador marca "Requiere Autorización" = Sí en un Servicio del catálogo de Solicitud de Servicio
Cuando registra o edita el Servicio
Entonces el sistema guarda dicho valor en el catálogo.

**CA-6.1.3 — Valor por defecto**
Dado que el administrador registra un nuevo Servicio (de Ticket o de Solicitud) sin modificar el valor propuesto de "Requiere Autorización"
Cuando lo guarda
Entonces el Servicio queda creado con "Requiere Autorización" = No.

**CA-6.1.4 — Registro en bitácora**
Dado un Servicio existente (de Ticket o de Solicitud)
Cuando se modifica el valor de "Requiere Autorización"
Entonces queda un registro en la bitácora de auditoría del catálogo correspondiente con el valor anterior del campo.

---

## US-6.2 — Reflejo de la marca en el catálogo concentrador de Servicios del wizard

Como analista de negocio, quiero que el catálogo concentrador de Servicios que utiliza el wizard de Monitor CAU muestre siempre el valor vigente de "Requiere Autorización" de su Servicio de origen, para que el wizard cuente con esta información sin depender de una captura adicional.

### Reglas de negocio

**RN-6.3** Al asociar un Servicio del catálogo de Ticket o del catálogo de Solicitud de Servicio a un registro del catálogo concentrador, el valor de "Requiere Autorización" se copia desde dicho Servicio de origen.

**RN-6.4** Si el valor de "Requiere Autorización" se modifica posteriormente en el catálogo de origen, el catálogo concentrador debe reflejar el valor vigente.

### Criterios de Aceptación

**CA-6.2.1 — Reflejo al asociar el Servicio**
Dado un Servicio del catálogo de Ticket o de Solicitud con "Requiere Autorización" = Sí
Cuando dicho Servicio se asocia a un registro del catálogo concentrador
Entonces el registro del catálogo concentrador queda con "Requiere Autorización" = Sí.

**CA-6.2.2 — Reflejo tras actualizar el valor de origen**
Dado un registro del catálogo concentrador ya asociado a un Servicio de origen
Cuando el valor de "Requiere Autorización" de dicho Servicio de origen se modifica
Entonces el registro del catálogo concentrador queda con el valor vigente.

---

**Regla transversal:**
Este RF cubre únicamente el alta de datos en los catálogos de Servicios de Ticket y de Solicitud de Servicio, y su reflejo en el catálogo concentrador de Servicios. Su consumo se documenta en RF-13, que identifica los Tickets y las Solicitudes de Servicio sujetos al registro automático de autorización a partir de esta marca, en lugar del valor fijo "Solicitud de Acceso" y de la autorización incondicional que usaba antes para toda Solicitud de Servicio.

---


---

# RF-07 — Bitácora obligatoria del Servicio Cliente relacionada al catálogo de Estados

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | RF-02, RF-04 |

## Objetivo

Garantizar que toda alta o actualización del Estatus del Servicio Cliente genere un registro en su bitácora, siempre relacionado con un Estado Activo del catálogo administrado (RF-02). Si dicha relación no puede establecerse, la operación se bloquea con el mensaje correspondiente, sin importar qué aplicación la origine.

## Descripción

La bitácora del Servicio Cliente se relaciona con el catálogo de Estados (RF-02): toda alta o cambio de Estatus debe quedar homologado con un Estado Activo, sin excepción; si no existe homologación, la operación se bloquea con el mensaje correspondiente.

BusinessSuite e InnoVapp escriben ambos sobre la misma base de datos, por lo que esta regla no puede garantizarse solo desde el código de BusinessSuite. Por eso se aplica mediante un **trigger de base de datos**, sin importar qué aplicación origine el cambio. Su diseño técnico se documenta aparte.

---

## US-7.1 — Bitácora obligatoria relacionada al catálogo de Estados

Como analista de negocio, quiero que toda alta o actualización del Estatus del Servicio Cliente quede registrada en su bitácora y relacionada con un Estado Activo del catálogo administrado, para que ningún movimiento del Servicio Cliente quede sin homologar, sin importar qué aplicación lo origine.

### Reglas de negocio

**RN-7.1** Toda alta o actualización del Estatus del Servicio Cliente, sin importar el proceso, vista, aplicación o acción que la origine (incluyendo BusinessSuite e InnoVapp), debe generar un registro en su bitácora relacionado con un Estado del catálogo administrado (RF-02).

**RN-7.2** El Estado del catálogo relacionado deberá tener Estado del Registro = Activo (RF-02); un Estado Cancelado no podrá utilizarse.

**RN-7.3** Si el Estatus destino de la alta o actualización no cuenta con un Estado homologado Activo en el catálogo, el sistema impedirá completar dicha operación e informará el motivo mediante un mensaje.

**RN-7.4** Esta obligatoriedad se garantiza mediante un desencadenante (trigger) en el motor de base de datos, que se ejecuta sin importar la aplicación que origine el cambio de Estatus (BusinessSuite o InnoVapp); no implica que el campo de relación al catálogo se declare obligatorio (`NOT NULL`) a nivel de esquema de base de datos.

**RN-7.5** El valor de estatus interno que hoy guarda la bitácora se conserva sin cambios; este RF lo complementa con la relación al catálogo de Estados, no lo sustituye.

### Criterios de Aceptación

**CA-7.1.1 — Alta o actualización exitosa con Estado homologado**
Dado que el Estatus destino de una alta o actualización del Servicio Cliente cuenta con un Estado Activo homologado en el catálogo
Cuando dicha operación se ejecuta, sin importar el proceso o aplicación que la origine
Entonces la operación se completa y el registro de bitácora generado queda relacionado con dicho Estado del catálogo, además de conservar su valor de estatus interno.

**CA-7.1.2 — Bloqueo por falta de homologación**
Dado que el Estatus destino de una alta o actualización del Servicio Cliente no cuenta con ningún Estado homologado en el catálogo
Cuando se intenta ejecutar dicha operación
Entonces el sistema impide completarla e informa, mediante un mensaje, que el Estatus no cuenta con un Estado homologado en el catálogo.

**CA-7.1.3 — Bloqueo por Estado homologado cancelado**
Dado que el Estatus destino tiene homologado un Estado con Estado del Registro = Cancelado
Cuando se intenta ejecutar dicha operación
Entonces el sistema impide completarla e informa, mediante un mensaje, que el Estado homologado debe estar Activo.

**CA-7.1.4 — Cumplimiento sin importar la aplicación de origen**
Dado que InnoVapp actualiza directamente el Estatus de un Servicio Cliente (Ticket Externo) sin pasar por BusinessSuite
Cuando dicha actualización no cuenta con un Estado homologado Activo en el catálogo
Entonces la actualización tampoco se completa, de la misma forma que si se hubiera originado desde BusinessSuite.

---

## US-7.2 — Identificación de la Persona que registra o actualiza el Estatus

Como analista de negocio, quiero que toda alta o actualización del Estatus del Servicio Cliente identifique a la Persona que la realizó, para que la bitácora refleje quién generó cada movimiento sin depender de un texto de Descripción capturado manualmente.

### Reglas de negocio

**RN-7.6** Toda alta o actualización del Estatus del Servicio Cliente debe identificar a la Persona que la realiza, sin importar el proceso, vista o aplicación que la origine.

**RN-7.7** La Persona que registra o actualiza el Estatus queda registrada en el propio Servicio Cliente y se refleja como Generada Por en el registro de bitácora generado.

**RN-7.8** El campo Descripción de la bitácora no requiere capturarse: la información visual del movimiento (Nombre, Mensaje corto, Color, Ícono) se obtiene mediante la relación al Estado del catálogo que este mismo RF garantiza (RN-7.1 a RN-7.3).

### Criterios de Aceptación

**CA-7.2.1 — Registro con Persona identificada**
Dado que se ejecuta una alta o actualización de Estatus del Servicio Cliente
Cuando dicha operación se completa
Entonces el registro de bitácora generado queda relacionado con la Persona que la realizó.

**CA-7.2.2 — Bloqueo por falta de Persona identificada**
Dado que una alta o actualización de Estatus del Servicio Cliente no identifica a la Persona que la realiza
Cuando se intenta completar dicha operación
Entonces el sistema impide completarla.

**CA-7.2.3 — Bitácora sin Descripción en texto libre**
Dado que se genera un registro de bitácora por una alta o actualización de Estatus cubierta por este RF
Cuando se consulta dicho registro
Entonces su información visual se obtiene a través del Estado del catálogo relacionado, sin requerir un texto de Descripción capturado manualmente.

---

**Regla transversal:**
Este RF depende de que el catálogo de Estados esté completo y vigente (RF-02, RF-04). Es prerrequisito de cualquier proceso, presente o futuro, que registre o actualice el Estatus del Servicio Cliente (incluyendo los grupos Monitor CAU, Ticket, Proyectos y Equipo de Cómputo de este documento), los cuales deben garantizar que el Estatus destino cuente con un Estado homologado Activo y con la Persona que la realiza antes de completarse. El diseño técnico del desencadenante de base de datos se documenta por separado.

---


---

# RF-08 — Registro del Servicio con Estatus Registrado

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | RF-07        |

## Objetivo

Que, al registrarse un nuevo Servicio (petición del cliente), su Estatus quede establecido en "Registrado".

## Descripción

Este RF fija el Estatus inicial de todo Servicio en "Registrado". La bitácora inicial se genera automáticamente por el mecanismo de RF-07, por lo que no se documenta aquí como una mecánica aparte.

---

## US-8.1 — Alta del Servicio con Estatus Registrado

Como analista de negocio, quiero que todo nuevo Servicio quede registrado con Estatus "Registrado", para que su ciclo de vida siempre inicie desde un estado conocido y consistente.

### Reglas de negocio

**RN-8.1** Al registrarse un nuevo Servicio, su Estatus se establece en "Registrado".

### Criterios de Aceptación

**CA-8.1.1 — Alta exitosa con Estatus Registrado**
Dado que un usuario registra un nuevo Servicio
Cuando el registro se completa
Entonces el Servicio queda con Estatus = "Registrado".

---

**Regla transversal:**
Este RF depende de RF-07 (bitácora obligatoria relacionada al catálogo de Estados) para que la generación del primer registro de bitácora, relacionado con el Estado homologado a "Registrado", ocurra automáticamente sin necesidad de una mecánica adicional en este RF.

---


---

# RF-09 — Visualización de Trayectoria en Mis Tickets

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | RF-02, RF-07 |

## Objetivo

Que la pestaña Trayectoria del detalle del Servicio Cliente en Mis Tickets muestre, para cada movimiento, el Nombre o Mensaje corto del Estado homologado del catálogo administrado (RF-02), en lugar de depender de la descripción en texto libre que los movimientos nuevos ya no capturan (RF-07).

## Descripción

La consulta que alimenta la Trayectoria en Mis Tickets hoy devuelve, por cada registro de bitácora, su fecha, persona y descripción en texto libre. A partir de RF-07, los movimientos nuevos ya no capturan esa descripción, así que sin adecuarla la Trayectoria mostraría filas vacías. Este RF adecúa la consulta para resolver el Estado homologado al momento de mostrarlo: por relación directa en movimientos nuevos, y por el código de estatus legado en históricos sin esa relación, sin modificar ningún dato almacenado.

---

## US-9.1 — Trayectoria homologada al catálogo de Estados

Como analista de negocio, quiero que la Trayectoria del Servicio Cliente muestre el Nombre o Mensaje corto del Estado homologado del catálogo para cada movimiento, sin importar si es nuevo o histórico, para que la trayectoria sea legible y consistente sin importar cuándo se generó cada registro.

### Reglas de negocio

**RN-9.1** Para cada registro de la bitácora del Servicio Cliente que se muestra en la Trayectoria, se resuelve el Estado homologado del catálogo (RF-02): mediante la relación directa al catálogo cuando exista, o mediante el código de estatus que el registro conserva, comparado contra el código homologado del catálogo, cuando no exista dicha relación.

**RN-9.2** El texto mostrado para cada movimiento es el Mensaje corto del Estado homologado; si el Estado no tiene Mensaje corto capturado, se usa su Nombre.

**RN-9.3** Si no puede resolverse ningún Estado homologado para un registro, la fila se muestra sin texto descriptivo.

**RN-9.4** Esta homologación se resuelve al momento de consultar la Trayectoria; no se modifica el valor almacenado en ningún registro de la bitácora del Servicio Cliente.

### Criterios de Aceptación

**CA-9.1.1 — Movimiento nuevo homologado**
Dado un registro de bitácora generado después de la entrada en vigor de RF-07, con relación a un Estado del catálogo
Cuando se consulta la Trayectoria del Servicio Cliente
Entonces la fila muestra el Mensaje corto (o, en su ausencia, el Nombre) de dicho Estado.

**CA-9.1.2 — Movimiento histórico homologado por código de estatus**
Dado un registro de bitácora generado antes de RF-07, sin relación directa al catálogo, cuyo código de estatus coincide con el código homologado de un Estado del catálogo
Cuando se consulta la Trayectoria del Servicio Cliente
Entonces la fila muestra el Mensaje corto (o, en su ausencia, el Nombre) de dicho Estado, sin que el registro almacenado se modifique.

**CA-9.1.3 — Movimiento sin homologación posible**
Dado un registro de bitácora cuyo código de estatus no coincide con ningún Estado Activo del catálogo
Cuando se consulta la Trayectoria del Servicio Cliente
Entonces la fila se muestra sin texto descriptivo.

**CA-9.1.4 — Sin modificación de datos almacenados**
Dado que se consulta la Trayectoria del Servicio Cliente
Cuando se resuelve el Estado homologado de sus registros históricos
Entonces ningún registro de la bitácora del Servicio Cliente se actualiza como resultado de esa consulta.

---

**Regla transversal:**
Este RF depende del catálogo de Estados (RF-02) y del mecanismo de bitácora obligatoria de RF-07, en particular de la columna de código homologado que dicho RF introduce para relacionar el código de estatus legado con el catálogo. Aplica únicamente a la consulta que alimenta la Trayectoria del Servicio Cliente; no modifica el esquema ni los datos almacenados en su bitácora.

---


---

# RF-10 — Transición de Registrado a Investigación CAU desde Monitor CAU

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | RF-02, RF-07, RF-08 |

## Objetivo

Habilitar que el Servicio Cliente transicione de "Registrado" a "Investigación CAU" cuando el analista del CAU inicia su revisión desde Monitor CAU, dejando el movimiento registrado en su bitácora conforme al mecanismo transversal de RF-07.

## Descripción

Hoy el Servicio Cliente permanece en "Registrado" hasta generarse el Ticket o la Solicitud de Servicio derivada. Este RF agrega, en Monitor CAU (`CAUListEditor`), la acción Iniciar Revisión, que lo transiciona a "Investigación CAU". La relación al catálogo y el registro en bitácora ya los garantiza RF-07; aquí solo se define quién puede ejecutarla, desde qué Estatus previo, y su único punto de entrada.

---

## US-10.1 — Transición a Investigación CAU desde Monitor CAU

Como analista del CAU, quiero que el Servicio Cliente cambie a "Investigación CAU" al seleccionar Iniciar Revisión en Monitor CAU, para iniciar formalmente mi revisión y dejar constancia del movimiento en su bitácora.

### Reglas de negocio

**RN-10.1** El Servicio Cliente solo puede transicionar a "Investigación CAU" cuando su Estatus vigente es "Registrado".

**RN-10.2** La acción Iniciar Revisión solo se muestra a un usuario con permiso para ejecutarla; dicho permiso se asigna hoy al rol CAU, pero no está restringido exclusivamente a él, de modo que pueda otorgarse a otros roles sin requerir un cambio a esta regla. Un usuario sin ese permiso no ve la acción disponible.

**RN-10.3** La transición a "Investigación CAU" solo puede dispararse mediante la acción Iniciar Revisión, disponible en la vista Monitor CAU (`CAUListEditor`) sobre el Servicio Cliente seleccionado; no existe otro punto de entrada.

**RN-10.4** La relación con el Estado "Investigación CAU" del catálogo (RF-02) y el registro del movimiento en la bitácora del Servicio Cliente se garantizan mediante el mecanismo transversal de RF-07; este RF no define un mecanismo aparte.

### Criterios de Aceptación

**CA-10.1.1 — Transición exitosa**
Dado que el Servicio Cliente está en Estatus "Registrado" y el usuario cuenta con permiso para ejecutar Iniciar Revisión
Cuando el usuario selecciona Iniciar Revisión sobre ese Servicio Cliente en Monitor CAU
Entonces el Estatus cambia a "Investigación CAU" y el movimiento queda registrado en su bitácora, conforme al mecanismo de RF-07.

**CA-10.1.2 — Acción no disponible por falta de permiso**
Dado que el usuario no cuenta con permiso para ejecutar Iniciar Revisión
Cuando visualiza el Servicio Cliente en Monitor CAU
Entonces la acción Iniciar Revisión no se muestra.

**CA-10.1.3 — Bloqueo por Estatus previo inválido**
Dado que el Servicio Cliente no se encuentra en Estatus "Registrado"
Cuando se intenta transicionar a "Investigación CAU" desde Monitor CAU
Entonces el sistema impide la operación.

**CA-10.1.4 — Sin otro punto de entrada**
Dado que el Servicio Cliente está en Estatus "Registrado"
Cuando se intenta ejecutar la transición a "Investigación CAU" desde cualquier vista o proceso distinto a Iniciar Revisión en Monitor CAU
Entonces el sistema no ofrece ni permite dicha transición.

---

**Regla transversal:**
Este RF depende del catálogo de Estados (RF-02) para la configuración de "Investigación CAU", del mecanismo de bitácora obligatoria (RF-07) para registrar y relacionar el movimiento sin necesidad de una mecánica propia, y de RF-08 para que el Servicio Cliente ya cuente con Estatus "Registrado" antes de esta transición.

---


---

# RF-11 — Rediseño de tarjetas del Monitor CAU

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Jiri   |
| Dependencias   | RF-07, RF-10 |

## Objetivo

Que Monitor CAU muestre únicamente 4 tarjetas de Estatus (Registrado, Requiere Autorización, En Autorización e Investigación CAU), cada una filtrando directamente por el Estatus propio del Servicio Cliente.

## Descripción

Monitor CAU muestra hoy 8 tarjetas, la mayoría armadas a partir del Estatus del Ticket o Solicitud de Servicio derivada, no del propio Servicio Cliente. Este RF lo reduce a esas 4 tarjetas, cada una filtrando exclusivamente por el Estatus propio del Servicio Cliente, lo cual exige que dicho Estatus refleje las etapas "Requiere Autorización" y "En Autorización" conforme avance el ciclo de vida de su Ticket o Solicitud de Servicio derivada.

---

## US-11.1 — Visualización acotada a 4 tarjetas en Monitor CAU

Como analista del CAU, quiero que Monitor CAU muestre únicamente las tarjetas Registrado, Requiere Autorización, En Autorización e Investigación CAU, cada una con los Servicios Cliente cuyo propio Estatus corresponda a esa tarjeta, para enfocar mi trabajo sin distraerme con vistas derivadas de otros procesos.

### Reglas de negocio

**RN-11.1** Monitor CAU mostrará exactamente 4 tarjetas: "Registrado", "Requiere Autorización", "En Autorización" e "Investigación CAU"; ninguna otra tarjeta o pestaña de estatus se mostrará en esta vista.

**RN-11.2** Cada tarjeta listará únicamente los Servicios Cliente cuyo propio Estatus corresponda exactamente al nombre de la tarjeta; la pertenencia a una tarjeta no podrá derivarse del Estatus de Tickets o Solicitudes de Servicio relacionados.

**RN-11.3** La tarjeta "Investigación CAU" mostrará los Servicios Cliente con Estatus = "Investigación CAU", conforme a la transición descrita en RF-10.

**RN-11.4** El Servicio Cliente deberá reflejar en su propio Estatus las etapas "Requiere Autorización" y "En Autorización" conforme a su ciclo de vida real (por ejemplo, al derivarse o avanzar su Ticket o Solicitud de Servicio), de modo que las tarjetas correspondientes puedan filtrar directamente sobre ese campo.

**RN-11.5** Toda transición del Estatus del Servicio Cliente hacia "Requiere Autorización" o "En Autorización" debe registrarse en su bitácora, relacionada con el Estado del catálogo homologado, conforme al mecanismo de RF-07.

**RN-11.6** El listado de cada una de las 4 tarjetas mostrará la Fecha de Registro del Servicio Cliente como columna visible.

**RN-11.7** El listado de cada tarjeta se ordenará por Fecha de Registro de forma ascendente (los Servicios más antiguos primero), para que el analista del CAU priorice la atención de los que llevan mayor tiempo de espera.

### Criterios de Aceptación

**CA-11.1.1 — Solo 4 tarjetas visibles**
Dado que el analista del CAU abre la vista Monitor CAU
Cuando la vista termina de cargar
Entonces se muestran únicamente las tarjetas "Registrado", "Requiere Autorización", "En Autorización" e "Investigación CAU".

**CA-11.1.2 — Tarjeta Registrado**
Dado que un Servicio Cliente tiene Estatus = "Registrado"
Cuando se consulta la tarjeta "Registrado"
Entonces el Servicio Cliente aparece listado en dicha tarjeta.

**CA-11.1.3 — Tarjeta Requiere Autorización**
Dado que un Servicio Cliente tiene Estatus = "Requiere Autorización"
Cuando se consulta la tarjeta "Requiere Autorización"
Entonces el Servicio Cliente aparece listado en dicha tarjeta.

**CA-11.1.4 — Tarjeta En Autorización**
Dado que un Servicio Cliente tiene Estatus = "En Autorización"
Cuando se consulta la tarjeta "En Autorización"
Entonces el Servicio Cliente aparece listado en dicha tarjeta.

**CA-11.1.5 — Tarjeta Investigación CAU**
Dado que un Servicio Cliente tiene Estatus = "Investigación CAU"
Cuando se consulta la tarjeta "Investigación CAU"
Entonces el Servicio Cliente aparece listado en dicha tarjeta.

**CA-11.1.6 — Exclusión de Servicios en otro Estatus**
Dado que un Servicio Cliente tiene un Estatus distinto a los cuatro contemplados por este RF
Cuando se consulta cualquiera de las 4 tarjetas del Monitor CAU
Entonces el Servicio Cliente no aparece listado en ninguna de ellas.

**CA-11.1.7 — Sin derivación desde Tickets o Solicitudes de Servicio**
Dado que el Ticket o la Solicitud de Servicio derivada de un Servicio Cliente cambia de Estatus
Cuando dicho cambio no actualiza el Estatus propio del Servicio Cliente
Entonces la tarjeta correspondiente al nuevo Estatus del Ticket/Solicitud no muestra ese Servicio Cliente, ya que la tarjeta filtra únicamente por su Estatus propio.

**CA-11.1.8 — Columna Fecha de Registro**
Dado que el analista del CAU consulta el listado de cualquiera de las 4 tarjetas
Cuando visualiza los registros listados
Entonces cada registro muestra su Fecha de Registro.

**CA-11.1.9 — Orden por antigüedad**
Dado un listado con varios Servicios Cliente dentro de una misma tarjeta
Cuando se muestra el listado
Entonces los Servicios aparecen ordenados por Fecha de Registro ascendente, mostrando primero los más antiguos.

---

**Regla transversal:**
Este RF depende de que el Servicio Cliente sincronice su propio Estatus con las etapas "Requiere Autorización" y "En Autorización" de su ciclo de vida (RN-11.4); dicha sincronización, si no existe hoy en el sistema, es un prerrequisito de este RF y debe registrarse en bitácora conforme al mecanismo de RF-07.

---


---

# RF-12 — Adecuación del wizard de registro de Ticket o Solicitud de Servicio

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | Ninguna      |

## Objetivo

Que el wizard de registro en Monitor CAU exija, según el tipo de servicio elegido, seleccionar una persona responsable desde un listado de empleados: la Persona Asignada del Ticket, o la Persona que Recibirá el Equipo de Cómputo.

## Descripción

Al derivar un Servicio Cliente en Estatus "Registrado" hacia un Ticket o una Solicitud de Servicio de Equipo de Cómputo, el wizard de Monitor CAU pide la Persona Asignada del Ticket solo de forma obligatoria cuando el Ticket es interno, y captura la persona que recibirá el equipo como texto libre, sin vínculo a un empleado real. Este RF exige seleccionar ambas siempre desde un listado de empleados, y hace la Persona Asignada del Ticket obligatoria en todos los casos.

---

## US-12.1 — Selección de la Persona Asignada al registrar un Ticket

Como analista del CAU, quiero que el wizard me exija seleccionar la Persona Asignada del Ticket desde un listado acotado de empleados que atienden tickets, cuando el tipo de servicio elegido sea Ticket, para asegurar que todo Ticket quede, desde su registro, con un responsable válido de atenderlo.

### Reglas de negocio

**RN-12.1** Cuando el tipo de servicio seleccionado en el wizard sea Ticket, el wizard deberá mostrar un listado de empleados y requerir la selección de uno de ellos como Persona Asignada del Ticket.

**RN-12.2** El listado de empleados para este caso se limitará a empleados Activos cuyo departamento sea de aquellos que atienden tickets (por ejemplo: Soporte, Centro de Atención a Usuarios/CAU, Soporte de Aplicaciones o Tecnologías de la Información/TI); si el catálogo de departamentos que atienden tickets cambia, el listado deberá reflejar dicho catálogo sin requerir modificar esta regla.

**RN-12.3** La Persona Asignada del Ticket será obligatoria para completar el registro cuando el tipo de servicio sea Ticket, independientemente de si el Ticket resultante es interno o no.

**RN-12.4** El campo Persona Asignada capturado en el wizard es el mismo campo ya existente en el Ticket; este RF amplía su obligatoriedad, no crea un campo nuevo.

### Criterios de Aceptación

**CA-12.1.1 — Listado acotado para Ticket**
Dado que el analista del CAU selecciona el tipo de servicio Ticket en el wizard
Cuando el wizard presenta el listado de empleados para elegir la Persona Asignada
Entonces el listado solo incluye empleados Activos cuyo departamento sea uno de los que atienden tickets.

**CA-12.1.2 — Persona Asignada obligatoria**
Dado que el tipo de servicio seleccionado es Ticket
Cuando el analista del CAU intenta completar el wizard sin seleccionar una Persona Asignada
Entonces el sistema impide continuar e indica que el campo es obligatorio.

**CA-12.1.3 — Registro exitoso con Persona Asignada**
Dado que el tipo de servicio seleccionado es Ticket y se selecciona una Persona Asignada válida del listado
Cuando el analista del CAU completa el wizard
Entonces el Ticket se registra con esa Persona Asignada.

---

## US-12.2 — Selección de la Persona que Recibirá el Equipo de Cómputo

Como analista del CAU, quiero que el wizard me exija seleccionar, desde un listado de empleados, a la Persona que Recibirá el Equipo de Cómputo cuando el tipo de servicio elegido sea Equipo de Cómputo, para que dicha información quede vinculada a un registro real de empleado y no a texto libre capturado manualmente.

### Reglas de negocio

**RN-12.5** Cuando el tipo de servicio seleccionado en el wizard sea Equipo de Cómputo, el wizard deberá mostrar un listado de empleados y requerir la selección de uno de ellos como Persona que Recibirá el Equipo de Cómputo.

**RN-12.6** El listado de empleados para este caso incluirá a todos los empleados Activos, sin acotarse por área.

**RN-12.7** La captura de la Persona que Recibirá el Equipo de Cómputo, hoy registrada como texto libre (nombre y apellidos), deberá sustituirse por una referencia al registro de empleado seleccionado en el wizard.

**RN-12.8** La Persona que Recibirá el Equipo de Cómputo será obligatoria para completar el registro cuando el tipo de servicio sea Equipo de Cómputo.

### Criterios de Aceptación

**CA-12.2.1 — Listado sin acotar por área**
Dado que el analista del CAU selecciona el tipo de servicio Equipo de Cómputo en el wizard
Cuando el wizard presenta el listado de empleados para elegir la Persona que Recibirá el Equipo
Entonces el listado incluye a todos los empleados Activos, sin filtrarse por área.

**CA-12.2.2 — Persona que Recibe obligatoria**
Dado que el tipo de servicio seleccionado es Equipo de Cómputo
Cuando el analista del CAU intenta completar el wizard sin seleccionar una Persona que Recibirá el Equipo
Entonces el sistema impide continuar e indica que el campo es obligatorio.

**CA-12.2.3 — Registro con referencia a empleado**
Dado que el tipo de servicio seleccionado es Equipo de Cómputo y se selecciona una Persona que Recibirá el Equipo válida del listado
Cuando el analista del CAU completa el wizard
Entonces la Solicitud de Servicio de Equipo de Cómputo queda registrada con una referencia al empleado seleccionado, en lugar de un nombre capturado como texto libre.

---

**Regla transversal:**
Este RF requiere que la Solicitud de Servicio de Equipo de Cómputo sustituya su captura actual de la persona que recibe el equipo (texto libre) por una referencia a un registro de empleado; este cambio es prerrequisito de RN-12.7 y debe coordinarse con cualquier proceso o reporte que hoy consuma el nombre capturado como texto libre.

---


---

# RF-13 — Registro automático de autorización al generar Ticket o Solicitud de Servicio

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | RF-06, RF-07, RF-11 |

## Objetivo

Que, al generarse el Ticket o la Solicitud de Servicio desde el wizard de Monitor CAU, el sistema registre automáticamente su autorización sin confirmación manual cuando el Servicio lo requiera, actualizando el Estatus del documento y el del Servicio Cliente relacionado, y dejando ambas transiciones registradas en bitácora.

## Descripción

Hoy, al generarse un Ticket que requiere autorización, el sistema pide confirmación al analista del CAU antes de registrarla; y toda Solicitud de Servicio se autoriza siempre, sin distinción por Servicio. Este RF automatiza ese registro para el flujo derivado del wizard de Monitor CAU, condicionándolo por igual —tanto para Ticket como para Solicitud de Servicio— a que el Servicio relacionado tenga activa la marca "Requiere Autorización" (RF-06): el documento transiciona primero a Estatus "Requiere Autorización" y, de inmediato, el sistema intenta registrar su autorización de forma automática; si tiene éxito, avanza a "En Autorización", y si falla, permanece en "Requiere Autorización" para gestión manual bajo demanda. El RF sincroniza el Estatus del Servicio Cliente con el resultado de la autorización y mantiene trazabilidad recíproca entre la bitácora del Servicio Cliente y la del documento generado.

---

## US-13.1 — Registro automático de la autorización al generar el documento

Como analista del CAU, quiero que al generarse el Ticket o la Solicitud de Servicio cuyo Servicio requiere autorización desde el wizard, el sistema intente registrarla de forma automática, para no depender de una confirmación manual adicional en el flujo de registro.

### Reglas de negocio

**RN-13.1** Al generarse un Ticket o una Solicitud de Servicio cuyo Servicio tenga activa la marca "Requiere Autorización" (RF-06), el sistema lo transiciona primero a Estatus "Requiere Autorización" y, de inmediato, intenta registrar su autorización de forma automática, sin solicitar confirmación al analista del CAU.

**RN-13.2** Un Ticket o una Solicitud de Servicio cuyo Servicio no tenga activa la marca "Requiere Autorización" no queda sujeto al registro automático de autorización de este RF, ni requiere autorización de ningún otro tipo.

**RN-13.3** Si el intento automático de autorización de RN-13.1 se completa exitosamente, el Ticket o la Solicitud de Servicio avanza de Estatus "Requiere Autorización" a Estatus "En Autorización".

**RN-13.4** Si el intento automático de autorización de RN-13.1 no puede ejecutarse (por ejemplo, por una falla técnica del servicio de autorización, o porque el autorizador correspondiente no cumple una condición de negocio requerida para autorizar), el Ticket o la Solicitud de Servicio permanece en Estatus "Requiere Autorización", habilitando que el analista del CAU la registre manualmente bajo demanda mediante la acción ya existente para solicitar autorización.

**RN-13.5** Toda transición del Ticket o la Solicitud de Servicio derivada de este RF (a "En Autorización" o a "Requiere Autorización") debe quedar registrada en su propia bitácora de estatus.

### Criterios de Aceptación

**CA-13.1.1 — Autorización automática exitosa en Ticket cuyo Servicio requiere autorización**
Dado que el wizard genera un Ticket cuyo Servicio tiene activa la marca "Requiere Autorización"
Cuando el Ticket transiciona a "Requiere Autorización" y el sistema registra de inmediato su autorización automáticamente sin errores
Entonces el Ticket avanza a Estatus "En Autorización" sin haberse solicitado confirmación al analista del CAU.

**CA-13.1.2 — Autorización automática exitosa en Solicitud de Servicio cuyo Servicio requiere autorización**
Dado que el wizard genera una Solicitud de Servicio cuyo Servicio tiene activa la marca "Requiere Autorización"
Cuando la Solicitud de Servicio transiciona a "Requiere Autorización" y el sistema registra de inmediato su autorización automáticamente sin errores
Entonces la Solicitud de Servicio avanza a Estatus "En Autorización" sin haberse solicitado confirmación al analista del CAU.

**CA-13.1.3 — Falla en la autorización automática**
Dado que el Ticket o la Solicitud de Servicio cuyo Servicio requiere autorización transiciona a "Requiere Autorización"
Cuando el intento automático de autorización no puede completarse (falla técnica del servicio de autorización, o incumplimiento de una condición de negocio del autorizador)
Entonces el documento permanece en Estatus "Requiere Autorización" y disponible para que el analista del CAU la registre manualmente bajo demanda.

**CA-13.1.4 — Ticket o Solicitud de Servicio cuyo Servicio no requiere autorización**
Dado que el wizard genera un Ticket o una Solicitud de Servicio cuyo Servicio no tiene activa la marca "Requiere Autorización"
Cuando se completa el registro del documento
Entonces no se ejecuta el registro automático de autorización de este RF.

**CA-13.1.5 — Registro en la bitácora propia del documento**
Dado que el Ticket o la Solicitud de Servicio transiciona a "En Autorización" o a "Requiere Autorización" como resultado de este RF
Cuando dicha transición ocurre
Entonces se genera un registro en la bitácora de estatus propia del Ticket o de la Solicitud de Servicio.

---

## US-13.2 — Sincronización del Estatus y bitácora del Servicio Cliente

Como analista de negocio, quiero que el Estatus del Servicio Cliente refleje el resultado de la autorización de su Ticket o Solicitud de Servicio, y que dicho movimiento quede registrado tanto en la bitácora del Servicio Cliente como en la del documento relacionado, para mantener trazabilidad completa entre ambos registros.

### Reglas de negocio

**RN-13.7** Cuando el Ticket o la Solicitud de Servicio relacionados a un Servicio Cliente transicionen a "En Autorización" conforme a RN-13.3, el Estatus del Servicio Cliente relacionado deberá actualizarse a "En Autorización".

**RN-13.8** Cuando el Ticket o la Solicitud de Servicio relacionados a un Servicio Cliente transicionen a "Requiere Autorización" conforme a RN-13.4, el Estatus del Servicio Cliente relacionado deberá actualizarse a "Requiere Autorización".

**RN-13.9** Toda actualización del Estatus del Servicio Cliente derivada de RN-13.7 o RN-13.8 debe registrarse en su bitácora, conforme al mecanismo de RF-07.

**RN-13.10** Todo registro agregado a la bitácora del Servicio Cliente como resultado de RN-13.9 deberá reflejarse también en la bitácora de estatus del Ticket o de la Solicitud de Servicio relacionado, para mantener la trazabilidad entre ambos registros.

### Criterios de Aceptación

**CA-13.2.1 — Sincronización a En Autorización**
Dado que el Ticket o la Solicitud de Servicio de un Servicio Cliente transiciona a "En Autorización"
Cuando dicha transición ocurre
Entonces el Estatus del Servicio Cliente relacionado se actualiza a "En Autorización" y queda registrado en su bitácora.

**CA-13.2.2 — Sincronización a Requiere Autorización**
Dado que el Ticket o la Solicitud de Servicio de un Servicio Cliente transiciona a "Requiere Autorización"
Cuando dicha transición ocurre
Entonces el Estatus del Servicio Cliente relacionado se actualiza a "Requiere Autorización" y queda registrado en su bitácora.

**CA-13.2.3 — Trazabilidad recíproca**
Dado que se agrega un registro en la bitácora del Servicio Cliente por efecto de RN-13.9
Cuando se consulta la bitácora de estatus del Ticket o de la Solicitud de Servicio relacionado
Entonces dicho registro también aparece reflejado ahí.

---

**Regla transversal:**
Este RF depende de RF-11 (las tarjetas "Requiere Autorización" y "En Autorización" filtran por el Estatus propio del Servicio Cliente), de RF-07 (mecanismo de bitácora obligatoria relacionada con el catálogo de Estados) y de RF-06 (marca "Requiere Autorización", estandarizada en los catálogos de Servicios de Ticket y de Solicitud de Servicio, que identifica los Tickets y las Solicitudes de Servicio sujetos a RN-13.1). La trazabilidad recíproca de RN-13.10 aplica únicamente a los movimientos originados por este RF y no se generaliza a otras transiciones de la bitácora del Servicio Cliente.

---


---

# RF-14 — Cancelación del Servicio desde el wizard

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Falcón   |
| Dependencias   | RF-02, RF-03, RF-07, RF-12 |

## Objetivo

Que el wizard de registro de Ticket o Solicitud de Servicio permita cancelar el Servicio Cliente en cualquiera de sus pasos, solicitando siempre un Motivo de Cancelación del catálogo administrado (RF-03).

## Descripción

El wizard no ofrece hoy una acción para cancelar el Servicio Cliente durante su captura; si el analista decide no continuar, debe abandonarlo sin dejar constancia del motivo. Este RF agrega la acción Cancelar, disponible en cualquier paso, que exige seleccionar un Motivo de Cancelación (RF-03) —con un campo de texto adicional obligatorio cuando el motivo esté marcado como "Requiere Especificar"—, transiciona el Servicio Cliente a Estatus "Cancelado" y deja el movimiento registrado en su bitácora.

---

## US-14.1 — Cancelación del Servicio Cliente desde cualquier paso del wizard

Como analista del CAU, quiero poder cancelar el Servicio Cliente desde cualquier paso del wizard, indicando siempre el Motivo de Cancelación, para dejar constancia de la causa por la que no se continuó con su registro.

### Reglas de negocio

**RN-14.1** La acción Cancelar estará disponible en todos los pasos del wizard de registro de Ticket o Solicitud de Servicio.

**RN-14.2** Al seleccionar Cancelar, el sistema exigirá elegir un Motivo de Cancelación del catálogo (RF-03) con Estado del Registro = Activo.

**RN-14.3** La cancelación no podrá completarse sin seleccionar un Motivo de Cancelación.

**RN-14.4** Al completarse la cancelación, el Estatus del Servicio Cliente cambia a "Cancelado".

**RN-14.5** Toda cancelación ejecutada desde el wizard debe registrarse en la bitácora del Servicio Cliente, relacionada con el Estado "Cancelado" del catálogo de Estados (RF-02), conforme al mecanismo de RF-07.

**RN-14.6** El Motivo de Cancelación seleccionado queda asociado al registro de bitácora generado por la cancelación.

**RN-14.7** Al cancelar el Servicio Cliente desde el wizard, no queda generado ningún Ticket ni Solicitud de Servicio a partir de dicho Servicio.

**RN-14.8** Cuando el Motivo de Cancelación seleccionado tenga el indicador "Requiere Especificar" = Sí (RF-03), el wizard deberá presentar un campo de texto adicional para capturar el detalle de la cancelación.

**RN-14.9** Dicho campo de texto será obligatorio cuando se muestre; la cancelación no podrá completarse sin capturarlo.

**RN-14.10** El texto capturado se almacena junto con el registro de bitácora generado por la cancelación (RN-14.5, RN-14.6).

**RN-14.11** Cuando el Motivo de Cancelación seleccionado no tenga el indicador "Requiere Especificar" activado, el campo de texto adicional no se presenta.

### Criterios de Aceptación

**CA-14.1.1 — Cancelar disponible en cualquier paso**
Dado que el analista se encuentra en cualquier paso del wizard de registro
Cuando revisa las acciones disponibles
Entonces la acción Cancelar está disponible.

**CA-14.1.2 — Motivo de Cancelación obligatorio**
Dado que el analista selecciona Cancelar en el wizard
Cuando intenta completar la cancelación sin seleccionar un Motivo de Cancelación
Entonces el sistema lo impide e indica que el campo es obligatorio.

**CA-14.1.3 — Cancelación exitosa**
Dado que el analista selecciona Cancelar y elige un Motivo de Cancelación Activo del catálogo
Cuando confirma la cancelación
Entonces el Servicio Cliente cambia a Estatus "Cancelado" y el movimiento queda registrado en su bitácora, relacionado con el Motivo de Cancelación seleccionado.

**CA-14.1.4 — Sin generación de Ticket o Solicitud de Servicio**
Dado que el Servicio Cliente se cancela desde el wizard
Cuando se revisa dicho Servicio
Entonces no existe ningún Ticket ni Solicitud de Servicio generado a partir de él.

**CA-14.1.5 — Motivo de Cancelación inválido**
Dado que el analista intenta seleccionar un Motivo de Cancelación con Estado del Registro = Cancelado
Cuando intenta completar la cancelación
Entonces el sistema lo impide e indica que debe seleccionar un Motivo de Cancelación Activo.

**CA-14.1.6 — Campo de texto visible para motivo que requiere especificar**
Dado que el analista selecciona un Motivo de Cancelación con indicador "Requiere Especificar" = Sí
Cuando el wizard presenta el formulario de cancelación
Entonces se muestra un campo de texto para capturar el detalle de la cancelación.

**CA-14.1.7 — Texto de detalle obligatorio**
Dado que el Motivo de Cancelación seleccionado requiere especificar detalle
Cuando el analista intenta completar la cancelación sin capturar el texto
Entonces el sistema lo impide e indica que el campo es obligatorio.

**CA-14.1.8 — Motivo sin requerir detalle**
Dado que el analista selecciona un Motivo de Cancelación con indicador "Requiere Especificar" = No
Cuando el wizard presenta el formulario de cancelación
Entonces no se muestra el campo de texto adicional.

---

**Regla transversal:**
Este RF depende del catálogo de Motivos de Cancelación (RF-03) para el motivo seleccionable, del catálogo de Estados (RF-02) para el Estado "Cancelado" que la transición utiliza, del mecanismo de bitácora obligatoria (RF-07) para relacionar el registro generado con dicho Estado, y del wizard de registro (RF-12) sobre el cual se agrega esta acción.

---


---

# RF-15 — Transición del Ticket a "Proceso" con la Persona Asignada del wizard y su historial de asignaciones

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado         | Jiri   |
| Dependencias   | RF-07, RF-10, RF-12, RF-13 |

## Objetivo

Que, al transicionar a Estatus "Proceso" el Ticket generado desde el wizard de Monitor CAU —de forma directa si el Servicio no requiere autorización, o tras resolverse Autorizada su autorización si la requiere (RF-13)—, el sistema le fije la Persona Asignada capturada en el wizard (RF-12), registre dicha transición en la bitácora de estatus propia del Ticket, genere el historial de asignaciones con los responsables reales que tuvieron el Ticket bajo su responsabilidad, y sincronice el Estatus del Servicio Cliente relacionado.

## Descripción

RF-12 exige capturar la Persona Asignada del Ticket en el wizard, pero hoy ningún proceso posterior la utiliza: fuera de los casos ya cubiertos por otros RFs, el Ticket generado desde el wizard queda sin Persona Asignada fijada, sin historial de asignaciones, sin registrar sus propias transiciones de Estatus, y sin llegar a Estatus "Proceso". Este RF cierra esa brecha: define cuándo el Ticket transiciona a "Proceso" según el Servicio requiera o no autorización (RF-13), y establece que, al llegar a dicho Estatus, se fija la Persona Asignada del Ticket con el valor capturado en el wizard y se genera el historial de asignaciones correspondiente a cada caso —dos registros (Investigación CAU y Persona Asignada) cuando el Servicio no requiere autorización; tres registros (Investigación CAU, Autorización y Persona Asignada) cuando sí la requiere—, además de registrar cada transición en la bitácora de estatus propia del Ticket y sincronizar el Estatus del Servicio Cliente relacionado.

---

## US-15.1 — Asignación del Ticket e historial de asignaciones al transicionar a "Proceso"

Como analista de negocio, quiero que el Ticket generado desde el wizard transicione a Estatus "Proceso" según el Servicio requiera o no autorización, reciba en ese momento su Persona Asignada, y cuente con un historial de asignaciones que refleje a todos los responsables reales que lo tuvieron bajo su cargo, para contar con trazabilidad completa de quién ha tenido el Ticket bajo su responsabilidad.

### Reglas de negocio

**RN-15.1** Cuando el Servicio Cliente relacionado al Ticket no requiera autorización, el Ticket transiciona directamente a Estatus "Proceso" al completarse su registro desde el wizard.

**RN-15.2** Cuando el Servicio Cliente relacionado al Ticket requiera autorización, el Ticket transiciona a Estatus "Proceso" únicamente después de que dicha autorización se resuelva como Autorizada, conforme al flujo ya definido en RF-13 (el Ticket transiciona primero a "Requiere Autorización" y, si el intento automático de autorización tiene éxito, avanza a "En Autorización").

**RN-15.3** Al transicionar el Ticket a Estatus "Proceso" conforme a RN-15.1 o RN-15.2, el sistema fija su Persona Asignada con el valor capturado en el wizard (RF-12); mientras el Ticket permanece en "Requiere Autorización" y/o "En Autorización" (RN-15.2), su Persona Asignada aún no queda fijada.

**RN-15.4** Cuando el Ticket transicione a "Proceso" conforme a RN-15.1 (el Servicio no requiere autorización), el sistema genera dos registros consecutivos en el historial de asignaciones del Ticket: el primero con el personal y la fecha de la transición a "Investigación CAU" registrados en la bitácora del Servicio Cliente (RF-10); el segundo con la Persona Asignada del wizard (RN-15.3) y la fecha en que el Ticket transiciona a "Proceso".

**RN-15.5** Cuando el Ticket, conforme a RN-15.2, transicione a Estatus "Requiere Autorización" (RF-13), el sistema genera de inmediato el segundo registro del historial de asignaciones del Ticket —inmediatamente después del registro de Investigación CAU—, identificado con el Departamento y el Personal Asignado genéricos reservados para el tramo de "Autorización".

**RN-15.6** Cuando el Ticket, conforme a RN-15.2, transicione finalmente a Estatus "Proceso", el sistema genera el tercer registro del historial de asignaciones del Ticket con la Persona Asignada del wizard (RN-15.3) y la fecha de dicha transición, quedando el historial con exactamente tres registros consecutivos: Investigación CAU, Autorización y Persona Asignada.

**RN-15.7** Todos los registros de asignación generados conforme a RN-15.4, RN-15.5 y RN-15.6 quedan con Estatus "Atendido".

**RN-15.8** Toda transición de Estatus del Ticket —no solo a "Proceso" conforme a RN-15.1 o RN-15.2, sino cualquier transición de su ciclo de vida— debe quedar registrada en la bitácora de estatus propia del Ticket.

**RN-15.9** Todo registro del historial de asignaciones del Ticket queda relacionado con el registro de la bitácora de estatus propia del Ticket correspondiente al momento (Estatus) al que pertenece dicha asignación: el de Investigación CAU con el registro generado al crearse el Ticket; el de Autorización (cuando aplique) con el registro de la transición a "Requiere Autorización"; y el de Persona Asignada con el registro de la transición a "Proceso".

### Criterios de Aceptación

**CA-15.1.1 — Transición directa sin autorización**
Dado un Ticket cuyo Servicio Cliente relacionado no requiere autorización
Cuando se completa el registro del Ticket desde el wizard
Entonces el Ticket transiciona directamente a Estatus "Proceso" con la Persona Asignada del wizard.

**CA-15.1.2 — Transición tras autorización aprobada**
Dado un Ticket cuyo Servicio Cliente relacionado requiere autorización
Cuando dicha autorización se resuelve como Autorizada
Entonces el Ticket transiciona a Estatus "Proceso" con la Persona Asignada del wizard.

**CA-15.1.3 — Historial de asignaciones sin autorización**
Dado un Ticket cuyo Servicio Cliente relacionado no requiere autorización, que transiciona a Estatus "Proceso" conforme a CA-15.1.1
Cuando se consulta su historial de asignaciones
Entonces contiene exactamente dos registros: el primero con el personal y la fecha de la transición a "Investigación CAU" de la bitácora del Servicio Cliente, y el segundo con la Persona Asignada del wizard y la fecha de la transición a "Proceso".

**CA-15.1.4 — Estatus de los registros de asignación**
Dado un historial de asignaciones generado conforme a CA-15.1.3 o CA-15.1.6
Cuando se consulta el Estatus de cada uno de sus registros
Entonces todos se encuentran en Estatus "Atendido".

**CA-15.1.5 — Persona Asignada sin fijar mientras se resuelve la autorización**
Dado un Ticket cuyo Servicio Cliente relacionado requiere autorización, recién registrado desde el wizard
Cuando se consulta el Ticket mientras aún se encuentra en "Requiere Autorización" o "En Autorización", sin haberse resuelto todavía su autorización
Entonces el Ticket todavía no tiene fijada su Persona Asignada.

**CA-15.1.6 — Historial de asignaciones con autorización**
Dado un Ticket cuyo Servicio Cliente relacionado requiere autorización, que transiciona a Estatus "Proceso" conforme a CA-15.1.2
Cuando se consulta su historial de asignaciones
Entonces contiene exactamente tres registros en este orden: Investigación CAU, Autorización (Departamento y Personal Asignado genéricos) y la Persona Asignada del wizard con la fecha de la transición a "Proceso".

**CA-15.1.7 — Registro de Autorización generado de inmediato**
Dado un Ticket cuyo Servicio Cliente relacionado requiere autorización, recién transicionado a "Requiere Autorización"
Cuando se consulta su historial de asignaciones antes de que se resuelva la autorización
Entonces ya contiene el segundo registro, identificado con el Departamento y el Personal Asignado genéricos del tramo de "Autorización".

**CA-15.1.8 — Registro en la bitácora propia del Ticket ante cualquier transición**
Dado un Ticket que transiciona de un Estatus a otro, sea a "Proceso" (haya requerido o no autorización) o a cualquier otro Estatus de su ciclo de vida
Cuando dicha transición ocurre
Entonces queda registrada en la bitácora de estatus propia del Ticket.

**CA-15.1.9 — Relación de cada asignación con su bitácora de estatus**
Dado un Ticket con su historial de asignaciones (Investigación CAU, Autorización cuando aplique, y Persona Asignada)
Cuando se consulta cada registro de dicho historial
Entonces cada uno queda relacionado con el registro de la bitácora de estatus propia del Ticket correspondiente a su momento: Investigación CAU con el registro de creación del Ticket, Autorización con el de la transición a "Requiere Autorización", y Persona Asignada con el de la transición a "Proceso".

---

## US-15.2 — Sincronización del Estatus del Servicio Cliente a "Asignado"

Como analista de negocio, quiero que el Estatus del Servicio Cliente refleje que su Ticket relacionado ya cuenta con una Persona Asignada, para que su bitácora conserve trazabilidad completa del ciclo de vida del Servicio, incluyendo el tramo de autorización cuando aplique.

### Reglas de negocio

**RN-15.10** Cuando el Ticket relacionado a un Servicio Cliente transicione a Estatus "Proceso" conforme a RN-15.1 o RN-15.2, el Estatus del Servicio Cliente relacionado se actualiza a "Asignado" (RF-25); su posterior actualización a "En Proceso" se documenta en RF-26.

**RN-15.11** Toda actualización del Estatus del Servicio Cliente derivada de RN-15.10 debe registrarse en su bitácora, conforme al mecanismo de RF-07.

### Criterios de Aceptación

**CA-15.2.1 — Sincronización sin autorización**
Dado un Servicio Cliente que no requiere autorización, cuyo Ticket transiciona directamente a "Proceso" conforme a CA-15.1.1
Cuando dicha transición ocurre
Entonces el Estatus del Servicio Cliente relacionado se actualiza a "Asignado" y queda registrado en su bitácora, conservando en dicha bitácora los movimientos previos "Registrado" e "Investigación CAU".

**CA-15.2.2 — Sincronización tras autorización aprobada**
Dado un Servicio Cliente que requiere autorización, cuyo Ticket transiciona a "Proceso" conforme a CA-15.1.2
Cuando dicha transición ocurre
Entonces el Estatus del Servicio Cliente relacionado se actualiza a "Asignado" y queda registrado en su bitácora, conservando en dicha bitácora los movimientos previos "Registrado", "Requiere Autorización" y/o "En Autorización" según haya aplicado.

---

## US-15.3 — Relación retroactiva del historial de asignaciones del año en curso con su bitácora de estatus

Como analista de negocio, quiero que los registros del historial de asignaciones de Tickets generados durante el año en curso también queden relacionados con el registro de bitácora de estatus correspondiente a su momento, para contar con esta trazabilidad también en los Tickets ya existentes de este año, sin necesidad de esperar a que se generen nuevos movimientos.

### Reglas de negocio

**RN-15.12** La relación de RN-15.9 se aplica de forma retroactiva (backfill) únicamente a los registros del historial de asignaciones del Ticket generados durante el año en curso al momento de implementar este RF; los registros de años anteriores no se modifican.

**RN-15.13** El backfill relaciona cada registro histórico del historial de asignaciones con el registro de la bitácora de estatus propia del Ticket correspondiente a su momento, conforme al mismo criterio de RN-15.9.

### Criterios de Aceptación

**CA-15.3.1 — Backfill del año en curso**
Dado un Ticket con registros del historial de asignaciones generados durante el año en curso, previos a la implementación de este RF
Cuando se ejecuta el backfill
Entonces cada uno de esos registros queda relacionado con el registro de bitácora de estatus correspondiente a su momento.

**CA-15.3.2 — Sin backfill de años anteriores**
Dado un Ticket con registros del historial de asignaciones generados en años anteriores al actual
Cuando se ejecuta el backfill
Entonces dichos registros no se modifican ni se relacionan con ningún registro de bitácora.

---

**Regla transversal:**
Este RF depende de RF-12 (captura de la Persona Asignada en el wizard, hoy sin consumidor), de RF-10 (identificación del personal y fecha de la transición a "Investigación CAU" que alimenta el primer registro de asignación), de RF-13 (flujo de autorización que antecede a la transición a "Proceso" cuando el Servicio la requiere, incluyendo la transición a "Requiere Autorización" que dispara RN-15.5) y de RF-07 (mecanismo de bitácora obligatoria del Servicio Cliente). El registro de "Autorización" de RN-15.5 requiere que exista previamente un Departamento y un Personal Asignado genéricos reservados para este tramo; su alta es un requisito de datos, no de este RF. El Estatus "Atendido" de RN-15.7 es un valor nuevo para el historial de asignaciones del Ticket: hoy ningún registro de dicho historial transiciona a otro Estatus distinto de su valor inicial; este RF introduce el primer caso de negocio que lo utiliza. La resolución final de la autorización referenciada en RN-15.2 depende de un proveedor externo de autorización; el mecanismo técnico para recibir esa resolución y disparar esta transición se documenta en el documento técnico asociado. La relación de RN-15.9 identifica, para cada registro del historial de asignaciones, a qué momento del Ticket pertenece; no debe confundirse con un mecanismo para determinar quién estuvo asignado en cualquier Estatus del Ticket en general, ya que solo cubre los tres momentos que generan un registro de asignación (Investigación CAU, Autorización y Persona Asignada) — otras transiciones de Estatus del Ticket (RN-15.8) no generan por sí mismas un nuevo registro de asignación ni, por tanto, una nueva relación. El backfill de US-15.3 es una excepción puntual, acotada al año en curso, al principio general de no modificar históricos (ver Guía de Redacción, sección 9); no aplica a ningún otro RF de este documento. El Estatus "Asignado" de RN-15.10 es de uso exclusivo del Servicio Cliente (RF-25); el Ticket permanece en su propio Estatus "Proceso" durante todo este intervalo, y la transición del Servicio Cliente de "Asignado" a "En Proceso" se documenta en RF-26.

---


---

# RF-16 — Alta del Estado "Ing. Traslado"

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-01, RF-02 |

## Objetivo

Registrar "Ing. Traslado" como Grupo de Estados (RF-01) y como Estado (RF-02), prerrequisito de la transición del Ticket descrita en RF-17.

## Descripción

"Ing. Traslado" representa que el ingeniero asignado al Ticket se encuentra en desplazamiento físico para atenderlo. Este RF cubre exclusivamente el alta de datos, dejando el Estado disponible para que lo consuman tanto el Ticket como el Servicio Cliente relacionado, ya que el catálogo de Estados es transversal. Su uso real se documenta en RF-17.

---

## US-16.1 — Alta del Grupo de Estados y del Estado "Ing. Traslado"

Como analista de negocio, quiero que "Ing. Traslado" quede registrado en el catálogo de Grupos de Estados y en el catálogo de Estados, para que el Ticket y el Servicio Cliente puedan transicionar a él sin depender de una definición fija en código.

### Reglas de negocio

**RN-16.1** Debe existir un registro Activo en el catálogo de Grupos de Estados (RF-01) que represente el traslado del ingeniero asignado, previo al alta del Estado.

**RN-16.2** Debe existir un registro Activo en el catálogo de Estados (RF-02) con Nombre "Ing. Traslado", asociado al Grupo de Estados de RN-16.1, con Mensaje corto y Descripción conforme a RF-02.

**RN-16.3** No podrá existir más de un Estado Activo con Nombre "Ing. Traslado" en el catálogo, conforme a la regla de unicidad de RF-02.

**RN-16.4** El mismo Estado "Ing. Traslado" dado de alta por este RF es el que consumen tanto el Ticket como el Servicio Cliente en RF-17, sin duplicar el alta por cada proceso.

### Criterios de Aceptación

**CA-16.1.1 — Alta del Grupo de Estados**
Dado que no existe un Grupo de Estados que represente el traslado del ingeniero asignado
Cuando el administrador lo registra conforme a RF-01 (US-1.1)
Entonces el grupo queda disponible, Activo, para asociarse al Estado "Ing. Traslado".

**CA-16.1.2 — Alta del Estado**
Dado que existe el Grupo de Estados de CA-16.1.1, Activo
Cuando el administrador registra el Estado "Ing. Traslado" asociándolo a ese grupo, conforme a RF-02 (US-2.1)
Entonces el sistema crea el Estado como Activo y disponible para su uso por el Ticket y por el Servicio Cliente.

---

**Regla transversal:**
El Estado "Ing. Traslado" registrado por este RF es prerrequisito de la transición funcional descrita en RF-17; no modifica el alcance de RF-01 ni de RF-02, a cuyas reglas de alta, unicidad y ciclo de vida queda sujeto como cualquier otro registro de dichos catálogos. Este Estado es un alta nueva, distinta de cualquier estatus fijo ya importado por RF-04: aunque el sistema ya cuenta con estatus de nombre similar usados para logística de traslado de equipo de cómputo, ninguno representa que el ingeniero asignado al Ticket se encuentra en desplazamiento para atenderlo, que es el concepto de negocio que cubre este RF.

---


---

# RF-17 — Transición del Ticket a "Ing. Traslado" y su reverso a "En Proceso"

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-07, RF-16 |

## Objetivo

Incorporar al Ticket la acción "Ing. Traslado", protegida por un permiso especial y disponible únicamente en Estatus "Proceso", que transiciona el Ticket y refleja el mismo movimiento en el Estatus y la bitácora del Servicio Cliente relacionado, bloqueando la edición del Ticket mientras permanezca en dicho Estatus; y la acción de reverso a "En Proceso", que libera nuevamente la edición.

## Descripción

Hoy el Ticket no cuenta con una forma de indicar que el ingeniero asignado se encuentra en desplazamiento físico. Este RF agrega dos acciones simétricas: "Ing. Traslado" (desde "Proceso", con permiso especial dedicado) y "Regresar a Proceso" (desde "Ing. Traslado", mismo permiso). Ambas transiciones se reflejan en el Estatus y la bitácora del Servicio Cliente relacionado, conforme al mecanismo transversal de RF-07. Mientras el Ticket permanece en "Ing. Traslado", queda bloqueado para cualquier edición o modificación.

---

## US-17.1 — Transición del Ticket a "Ing. Traslado"

Como ingeniero asignado a un Ticket, quiero marcarlo como "Ing. Traslado" mientras me desplazo para atenderlo, para que quede protegido de modificaciones y su estatus refleje correctamente mi situación, tanto en el Ticket como en el Servicio Cliente relacionado.

### Reglas de negocio

**RN-17.1** La acción "Ing. Traslado" solo estará disponible cuando el Ticket se encuentre en Estatus "Proceso".

**RN-17.2** Solo un usuario con el permiso especial dedicado a esta acción podrá ver y ejecutar "Ing. Traslado".

**RN-17.3** Al ejecutar la acción, el Ticket transiciona a Estatus "Ing. Traslado" (RF-16), y dicho movimiento se registra en la bitácora de estatus del Ticket.

**RN-17.4** Al ejecutar la acción, el Estatus del Servicio Cliente relacionado se actualiza a "Ing. Traslado" (el mismo Estado de RF-16), y dicho movimiento se registra en su bitácora, conforme al mecanismo de RF-07.

**RN-17.5** Mientras el Ticket se encuentre en Estatus "Ing. Traslado", queda bloqueado para cualquier edición o modificación de sus campos; la única operación disponible es el reverso a "En Proceso" (US-17.2).

**RN-17.6** La acción "Ing. Traslado" no estará disponible si el Ticket no se encuentra en Estatus "Proceso", ni para usuarios sin el permiso especial de RN-17.2.

### Criterios de Aceptación

**CA-17.1.1 — Acción visible y disponible**
Dado que el Ticket está en Estatus "Proceso" y el usuario cuenta con el permiso especial dedicado
Cuando el usuario consulta el Ticket
Entonces la acción "Ing. Traslado" está visible y disponible para ejecutarse.

**CA-17.1.2 — Acción no visible por estatus inválido**
Dado que el Ticket no se encuentra en Estatus "Proceso"
Cuando el usuario consulta el Ticket
Entonces la acción "Ing. Traslado" no está disponible, sin importar el permiso del usuario.

**CA-17.1.3 — Acción no visible por falta de permiso**
Dado que el usuario no cuenta con el permiso especial dedicado a esta acción
Cuando consulta un Ticket en Estatus "Proceso"
Entonces la acción "Ing. Traslado" no está disponible.

**CA-17.1.4 — Transición exitosa y reflejo en Servicio Cliente**
Dado que el Ticket está en Estatus "Proceso" y el usuario cuenta con el permiso especial
Cuando ejecuta la acción "Ing. Traslado"
Entonces el Ticket transiciona a Estatus "Ing. Traslado", queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado se actualiza al mismo Estado y queda registrado en su propia bitácora.

**CA-17.1.5 — Bloqueo de edición**
Dado un Ticket en Estatus "Ing. Traslado"
Cuando cualquier usuario intenta editar o modificar alguno de sus campos
Entonces el sistema impide la operación, sin importar el permiso del usuario.

---

## US-17.2 — Reverso del Ticket a "En Proceso"

Como ingeniero asignado a un Ticket, quiero regresarlo a "En Proceso" al concluir mi traslado, para retomar su edición y continuar atendiéndolo, reflejando correctamente el cambio tanto en el Ticket como en el Servicio Cliente relacionado.

### Reglas de negocio

**RN-17.7** La acción "Regresar a Proceso" solo estará disponible cuando el Ticket se encuentre en Estatus "Ing. Traslado".

**RN-17.8** Solo un usuario con el mismo permiso especial de RN-17.2 podrá ver y ejecutar "Regresar a Proceso".

**RN-17.9** Al ejecutar la acción, el Ticket transiciona a Estatus "Proceso", y dicho movimiento se registra en la bitácora de estatus del Ticket.

**RN-17.10** Al ejecutar la acción, el Estatus del Servicio Cliente relacionado regresa al Estatus que tenía inmediatamente antes de la transición a "Ing. Traslado" (RN-17.4), tomado de su propia bitácora, y dicho movimiento se registra en dicha bitácora.

**RN-17.11** Al ejecutar la acción, el Ticket deja de estar bloqueado y vuelve a quedar disponible para su edición conforme a las reglas ya existentes.

### Criterios de Aceptación

**CA-17.2.1 — Acción visible únicamente en Ing. Traslado**
Dado que el Ticket está en Estatus "Ing. Traslado" y el usuario cuenta con el permiso especial dedicado
Cuando el usuario consulta el Ticket
Entonces la acción "Regresar a Proceso" está visible y disponible para ejecutarse.

**CA-17.2.2 — Acción no visible en otro estatus**
Dado que el Ticket no se encuentra en Estatus "Ing. Traslado"
Cuando el usuario lo consulta
Entonces la acción "Regresar a Proceso" no está disponible.

**CA-17.2.3 — Reverso exitoso y reflejo en Servicio Cliente**
Dado un Ticket en Estatus "Ing. Traslado" y un usuario con el permiso especial
Cuando ejecuta la acción "Regresar a Proceso"
Entonces el Ticket transiciona a Estatus "Proceso" y queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado regresa al que tenía antes de "Ing. Traslado", quedando registrado en su propia bitácora.

**CA-17.2.4 — Edición restablecida**
Dado un Ticket que acaba de regresar a Estatus "Proceso" mediante esta acción
Cuando un usuario intenta editarlo
Entonces el sistema permite la edición conforme a las reglas ya existentes para un Ticket en Proceso.

---

**Regla transversal:**
Este RF depende de RF-16 (alta del Estado "Ing. Traslado") y de RF-07 (bitácora obligatoria relacionada al catálogo de Estados) para reflejar y registrar el movimiento en el Servicio Cliente. El permiso especial de RN-17.2/RN-17.8 es exclusivo de estas dos acciones y no se generaliza a ninguna otra funcionalidad del Ticket. Queda fuera de alcance de este RF definir si un bloqueo de edición y acciones equivalentes deben existir también para la Solicitud de Servicio.

---


---

# RF-18 — Alta del Estado "En Espera del Usuario"

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-01, RF-02 |

## Objetivo

Registrar "En Espera del Usuario" como Grupo de Estados (RF-01) y como Estado (RF-02), prerrequisito de la transición del Ticket descrita en RF-19.

## Descripción

"En Espera del Usuario" representa que el Ticket quedó detenido en espera de información adicional (por ejemplo, del cliente o de un tercero) necesaria para continuar su atención. Este RF cubre exclusivamente el alta de datos, dejando el Estado disponible para que lo consuman tanto el Ticket como el Servicio Cliente relacionado. Su uso real se documenta en RF-19.

---

## US-18.1 — Alta del Grupo de Estados y del Estado "En Espera del Usuario"

Como analista de negocio, quiero que "En Espera del Usuario" quede registrado en el catálogo de Grupos de Estados y en el catálogo de Estados, para que el Ticket y el Servicio Cliente puedan transicionar a él sin depender de una definición fija en código.

### Reglas de negocio

**RN-18.1** Debe existir un registro Activo en el catálogo de Grupos de Estados (RF-01) que represente la espera de información, previo al alta del Estado.

**RN-18.2** Debe existir un registro Activo en el catálogo de Estados (RF-02) con Nombre "En Espera del Usuario", asociado al Grupo de Estados de RN-18.1, con Mensaje corto y Descripción conforme a RF-02.

**RN-18.3** No podrá existir más de un Estado Activo con Nombre "En Espera del Usuario" en el catálogo, conforme a la regla de unicidad de RF-02.

**RN-18.4** El mismo Estado "En Espera del Usuario" dado de alta por este RF es el que consumen tanto el Ticket como el Servicio Cliente en RF-19, sin duplicar el alta por cada proceso.

### Criterios de Aceptación

**CA-18.1.1 — Alta del Grupo de Estados**
Dado que no existe un Grupo de Estados que represente la espera de información
Cuando el administrador lo registra conforme a RF-01 (US-1.1)
Entonces el grupo queda disponible, Activo, para asociarse al Estado "En Espera del Usuario".

**CA-18.1.2 — Alta del Estado**
Dado que existe el Grupo de Estados de CA-18.1.1, Activo
Cuando el administrador registra el Estado "En Espera del Usuario" asociándolo a ese grupo, conforme a RF-02 (US-2.1)
Entonces el sistema crea el Estado como Activo y disponible para su uso por el Ticket y por el Servicio Cliente.

---

**Regla transversal:**
El Estado "En Espera del Usuario" registrado por este RF es prerrequisito de la transición funcional descrita en RF-19; no modifica el alcance de RF-01 ni de RF-02. Es independiente del Estado "Ing. Traslado" (RF-16): ambos son Estados distintos del mismo catálogo transversal. Este Estado es un alta nueva, distinta de cualquier estatus fijo ya importado por RF-04: aunque el sistema ya cuenta con un estatus de nombre similar usado para la espera de recolección de equipo de cómputo asignado, no representa que el Ticket quedó detenido en espera de información adicional del usuario que reporta, que es el concepto de negocio que cubre este RF.

---


---

# RF-19 — Transición del Ticket a "En Espera del Usuario" y su reverso a "En Proceso"

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-07, RF-18 |

## Objetivo

Incorporar al Ticket la acción "En Espera del Usuario", protegida por un permiso especial propio y disponible únicamente en Estatus "Proceso", que transiciona el Ticket y refleja el mismo movimiento en el Estatus y la bitácora del Servicio Cliente relacionado, bloqueando la edición del Ticket mientras permanezca en dicho Estatus; y la acción de reverso a "En Proceso", que libera nuevamente la edición.

## Descripción

Hoy el Ticket no cuenta con una forma de indicar que quedó detenido en espera de información adicional. Este RF agrega dos acciones simétricas, mecánicamente equivalentes a las de RF-17 pero mediante un permiso especial propio y distinto: "En Espera del Usuario" (desde "Proceso") y "Regresar a Proceso" (desde "En Espera del Usuario"). Ambas transiciones se reflejan en el Estatus y la bitácora del Servicio Cliente relacionado, conforme al mecanismo transversal de RF-07. Mientras el Ticket permanece en este Estatus, queda bloqueado para cualquier edición o modificación.

---

## US-19.1 — Transición del Ticket a "En Espera del Usuario"

Como responsable del Ticket, quiero marcarlo como "En Espera del Usuario" mientras aguardo datos adicionales necesarios para continuar su atención, para que quede protegido de modificaciones y su estatus refleje correctamente dicha espera, tanto en el Ticket como en el Servicio Cliente relacionado.

### Reglas de negocio

**RN-19.1** La acción "En Espera del Usuario" solo estará disponible cuando el Ticket se encuentre en Estatus "Proceso".

**RN-19.2** Solo un usuario con el permiso especial dedicado a esta acción podrá ver y ejecutar "En Espera del Usuario"; este permiso es distinto e independiente del permiso especial de "Ing. Traslado" (RF-17).

**RN-19.3** Al ejecutar la acción, el Ticket transiciona a Estatus "En Espera del Usuario" (RF-18), y dicho movimiento se registra en la bitácora de estatus del Ticket.

**RN-19.4** Al ejecutar la acción, el Estatus del Servicio Cliente relacionado se actualiza a "En Espera del Usuario" (el mismo Estado de RF-18), y dicho movimiento se registra en su bitácora, conforme al mecanismo de RF-07.

**RN-19.5** Mientras el Ticket se encuentre en este Estatus, queda bloqueado para cualquier edición o modificación de sus campos; la única operación disponible es el reverso a "En Proceso" (US-19.2).

**RN-19.6** La acción no estará disponible si el Ticket no se encuentra en Estatus "Proceso", ni para usuarios sin el permiso especial de RN-19.2.

### Criterios de Aceptación

**CA-19.1.1 — Acción visible y disponible**
Dado que el Ticket está en Estatus "Proceso" y el usuario cuenta con el permiso especial dedicado a "En Espera del Usuario"
Cuando el usuario consulta el Ticket
Entonces la acción está visible y disponible para ejecutarse.

**CA-19.1.2 — Acción no visible por estatus inválido**
Dado que el Ticket no se encuentra en Estatus "Proceso"
Cuando el usuario consulta el Ticket
Entonces la acción no está disponible, sin importar el permiso del usuario.

**CA-19.1.3 — Acción no visible por falta de permiso**
Dado que el usuario no cuenta con el permiso especial dedicado a esta acción
Cuando consulta un Ticket en Estatus "Proceso"
Entonces la acción no está disponible, aun cuando dicho usuario cuente con el permiso especial de "Ing. Traslado".

**CA-19.1.4 — Transición exitosa y reflejo en Servicio Cliente**
Dado que el Ticket está en Estatus "Proceso" y el usuario cuenta con el permiso especial de esta acción
Cuando ejecuta la acción
Entonces el Ticket transiciona a Estatus "En Espera del Usuario", queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado se actualiza al mismo Estado y queda registrado en su propia bitácora.

**CA-19.1.5 — Bloqueo de edición**
Dado un Ticket en Estatus "En Espera del Usuario"
Cuando cualquier usuario intenta editar o modificar alguno de sus campos
Entonces el sistema impide la operación, sin importar el permiso del usuario.

---

## US-19.2 — Reverso del Ticket a "En Proceso"

Como responsable del Ticket, quiero regresarlo a "En Proceso" al recibir la información esperada, para retomar su edición y continuar atendiéndolo, reflejando correctamente el cambio tanto en el Ticket como en el Servicio Cliente relacionado.

### Reglas de negocio

**RN-19.7** La acción "Regresar a Proceso" solo estará disponible cuando el Ticket se encuentre en Estatus "En Espera del Usuario".

**RN-19.8** Solo un usuario con el mismo permiso especial de RN-19.2 podrá ver y ejecutar "Regresar a Proceso".

**RN-19.9** Al ejecutar la acción, el Ticket transiciona a Estatus "Proceso", y dicho movimiento se registra en la bitácora de estatus del Ticket.

**RN-19.10** Al ejecutar la acción, el Estatus del Servicio Cliente relacionado regresa al Estatus que tenía inmediatamente antes de la transición a "En Espera del Usuario" (RN-19.4), tomado de su propia bitácora, y dicho movimiento se registra en dicha bitácora.

**RN-19.11** Al ejecutar la acción, el Ticket deja de estar bloqueado y vuelve a quedar disponible para su edición conforme a las reglas ya existentes.

### Criterios de Aceptación

**CA-19.2.1 — Acción visible únicamente en En Espera del Usuario**
Dado que el Ticket está en ese Estatus y el usuario cuenta con el permiso especial de esta acción
Cuando el usuario consulta el Ticket
Entonces la acción "Regresar a Proceso" está visible y disponible para ejecutarse.

**CA-19.2.2 — Acción no visible en otro estatus**
Dado que el Ticket no se encuentra en Estatus "En Espera del Usuario"
Cuando el usuario lo consulta
Entonces la acción "Regresar a Proceso" no está disponible.

**CA-19.2.3 — Reverso exitoso y reflejo en Servicio Cliente**
Dado un Ticket en Estatus "En Espera del Usuario" y un usuario con el permiso especial de esta acción
Cuando ejecuta la acción "Regresar a Proceso"
Entonces el Ticket transiciona a Estatus "Proceso" y queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado regresa al que tenía antes, quedando registrado en su propia bitácora.

**CA-19.2.4 — Edición restablecida**
Dado un Ticket que acaba de regresar a Estatus "Proceso" mediante esta acción
Cuando un usuario intenta editarlo
Entonces el sistema permite la edición conforme a las reglas ya existentes para un Ticket en Proceso.

---

**Regla transversal:**
Este RF depende de RF-18 (alta del Estado "En Espera del Usuario") y de RF-07 (bitácora obligatoria). El permiso especial de RN-19.2/RN-19.8 es exclusivo de estas dos acciones, distinto e independiente del permiso especial de "Ing. Traslado" (RF-17), y no se generaliza a ninguna otra funcionalidad del Ticket. Es mecánicamente equivalente a RF-17, pero ambos Estados y ambos permisos son independientes entre sí. Queda fuera de alcance de este RF definir si un bloqueo de edición y acciones equivalentes deben existir también para la Solicitud de Servicio.

---


---

# RF-20 — Alta del Estado "En Validación"

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-01, RF-02 |

## Objetivo

Registrar "En Validación" como Grupo de Estados (RF-01) y como Estado (RF-02), prerrequisito de la transición del Ticket descrita en RF-21.

## Descripción

"En Validación" representa que el Ticket fue cerrado con un Tipo de Servicio Interno que exige la confirmación del usuario que reporta antes de darlo por concluido de forma definitiva. Este RF cubre exclusivamente el alta de datos, dejando el Estado disponible para que lo consuman tanto el Ticket como el Servicio Cliente relacionado. Su uso real se documenta en RF-21.

---

## US-20.1 — Alta del Grupo de Estados y del Estado "En Validación"

Como analista de negocio, quiero que "En Validación" quede registrado en el catálogo de Grupos de Estados y en el catálogo de Estados, para que el Ticket y el Servicio Cliente puedan transicionar a él sin depender de una definición fija en código.

### Reglas de Negocio

**RN-20.1** Debe existir un registro Activo en el catálogo de Grupos de Estados (RF-01) que represente la validación del servicio por parte del usuario que reporta, previo al alta del Estado.

**RN-20.2** Debe existir un registro Activo en el catálogo de Estados (RF-02) con Nombre "En Validación", asociado al Grupo de Estados de RN-20.1, con Mensaje corto y Descripción conforme a RF-02.

**RN-20.3** No podrá existir más de un Estado Activo con Nombre "En Validación" en el catálogo, conforme a la regla de unicidad de RF-02.

**RN-20.4** El mismo Estado "En Validación" dado de alta por este RF es el que consumen tanto el Ticket como el Servicio Cliente en RF-21, sin duplicar el alta por cada proceso.

### Criterios de Aceptación

**CA-20.1.1 — Alta del Grupo de Estados**
Dado que no existe un Grupo de Estados que represente la validación del servicio por parte del usuario que reporta
Cuando el administrador lo registra conforme a RF-01 (US-1.1)
Entonces el grupo queda disponible, Activo, para asociarse al Estado "En Validación".

**CA-20.1.2 — Alta del Estado**
Dado que existe el Grupo de Estados de CA-20.1.1, Activo
Cuando el administrador registra el Estado "En Validación" asociándolo a ese grupo, conforme a RF-02 (US-2.1)
Entonces el sistema crea el Estado como Activo y disponible para su uso por el Ticket y por el Servicio Cliente.

---

**Regla transversal:**
El Estado "En Validación" registrado por este RF es prerrequisito de la transición funcional descrita en RF-21; no modifica el alcance de RF-01 ni de RF-02. Es independiente de los Estados "Ing. Traslado" (RF-16) y "En Espera del Usuario" (RF-18): son tres Estados distintos del mismo catálogo transversal.

---


---

# RF-21 — Transición del Ticket a "En Validación" al cerrarse un servicio que la requiere

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-05, RF-07, RF-20 |

## Objetivo

Que, al ejecutarse la acción de cerrar el Ticket, el sistema evalúe si el Tipo de Servicio Interno definido en el cierre requiere validación (RF-05), y en ese caso el Ticket transicione a Estatus "En Validación" (RF-20) en lugar de cerrarse, dejando el movimiento registrado en la bitácora del Ticket y reflejado en el Estatus y bitácora del Servicio Cliente relacionado.

## Descripción

Hoy, al cerrar un Ticket, este pasa directamente a su Estatus de cierre sin considerar si el Tipo de Servicio Interno exige confirmación adicional. Este RF conecta la marca "Requiere Validación" (RF-05) con la acción de cierre ya existente: si no requiere validación, el Ticket se cierra sin cambios; si sí la requiere, transiciona a "En Validación" en lugar de cerrarse. La acción con la que el usuario que reporta resuelve la validación (Válido/No Válido) es un requerimiento independiente fuera de este documento; este RF cubre únicamente la transición de entrada y su trazabilidad. Mientras el Ticket permanece en "En Validación", queda bloqueado para cualquier edición, igual que "Ing. Traslado" (RF-17) y "En Espera del Usuario" (RF-19).

---

## US-21.1 — Transición automática del Ticket a "En Validación" al cerrarse

Como analista de negocio, quiero que el Ticket transicione automáticamente a "En Validación" al cerrarse con un Tipo de Servicio Interno que lo requiera, para asegurar que ningún servicio sujeto a validación se dé por concluido sin la confirmación del usuario que reporta.

### Reglas de Negocio

**RN-21.1** Al ejecutarse la acción de cerrar el Ticket, el sistema evalúa la marca "Requiere Validación" (RF-05) del Tipo de Servicio Interno definido en el cierre.

**RN-21.2** Si "Requiere Validación" = No, el Ticket se cierra conforme al comportamiento ya existente, sin transicionar a "En Validación".

**RN-21.3** Si "Requiere Validación" = Sí, el Ticket no se cierra: transiciona a Estatus "En Validación" (RF-20) en lugar del Estatus de cierre, y dicho movimiento se registra en la bitácora de estatus del Ticket.

**RN-21.4** Al transicionar el Ticket a "En Validación" conforme a RN-21.3, el Estatus del Servicio Cliente relacionado se actualiza a "En Validación" (el mismo Estado de RF-20), y dicho movimiento se registra en su bitácora, conforme al mecanismo de RF-07.

**RN-21.5** Mientras el Ticket se encuentre en Estatus "En Validación", queda bloqueado para cualquier edición o modificación de sus campos.

**RN-21.6** Esta regla no define la acción de resolución de la validación (Válido/No Válido) ni el Estatus resultante de cada caso; dicha resolución se documentará en un requerimiento independiente, fuera de este documento.

**RN-21.7** El Ticket incorpora un campo propio "Fecha de Inicio de Validación", capturado automáticamente al transicionar a "En Validación" conforme a RN-21.3, sin captura manual, para uso de un mecanismo de finalización automática por vencimiento de plazo que se documentará en un requerimiento independiente.

### Criterios de Aceptación

**CA-21.1.1 — Cierre normal sin validación requerida**
Dado que el Tipo de Servicio Interno definido en el cierre del Ticket tiene "Requiere Validación" = No
Cuando se ejecuta la acción de cerrar el Ticket
Entonces el Ticket se cierra conforme al comportamiento ya existente, sin transicionar a "En Validación".

**CA-21.1.2 — Transición a En Validación**
Dado que el Tipo de Servicio Interno definido en el cierre del Ticket tiene "Requiere Validación" = Sí
Cuando se ejecuta la acción de cerrar el Ticket
Entonces el Ticket no se cierra y transiciona a Estatus "En Validación", quedando registrado en su bitácora.

**CA-21.1.3 — Reflejo en Servicio Cliente**
Dado que el Ticket transiciona a "En Validación" conforme a CA-21.1.2
Cuando dicha transición ocurre
Entonces el Estatus del Servicio Cliente relacionado se actualiza al mismo Estado y queda registrado en su propia bitácora.

**CA-21.1.4 — Bloqueo de edición**
Dado un Ticket en Estatus "En Validación"
Cuando cualquier usuario intenta editar o modificar alguno de sus campos
Entonces el sistema impide la operación.

**CA-21.1.5 — Fecha de Inicio de Validación**
Dado un Ticket que transicionó a "En Validación" conforme a CA-21.1.2
Cuando se consulta el campo Fecha de Inicio de Validación del Ticket
Entonces contiene la fecha y hora de dicha transición, sin haberse capturado manualmente.

---

**Regla transversal:**
Este RF depende de RF-20 (alta del Estado "En Validación"), RF-05 (marca "Requiere Validación") y RF-07 (bitácora obligatoria). Queda fuera de alcance la acción de resolución de la validación (Válido/No Válido) y su Estatus resultante, documentada en un requerimiento independiente; el comportamiento ante el vencimiento del tiempo de expiración de RF-05 se documentará en un requerimiento independiente que dependerá de la Fecha de Inicio de Validación de RN-21.7. Queda igualmente fuera de alcance definir si esta transición y su bloqueo deben existir también para la Solicitud de Servicio.

---


---

# RF-22 — Alta del Estado "Autorización Financiera"

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-01, RF-02 |

## Objetivo

Registrar "Autorización Financiera" como Grupo de Estados (RF-01) y como Estado (RF-02), prerrequisito de la transición del Ticket descrita en RF-23.

## Descripción

"Autorización Financiera" representa que el Ticket quedó a la espera de la resolución de la autorización genérica de compras registradas en sus Diagnósticos. Este RF cubre exclusivamente el alta de datos, dejando el Estado disponible para que lo consuman tanto el Ticket como el Servicio Cliente relacionado. Su uso real se documenta en RF-23. El Estatus "Autorización Rechazada", usado por RF-23 para el caso de rechazo, ya existe en el sistema y se reutiliza sin alta adicional.

---

## US-22.1 — Alta del Grupo de Estados y del Estado "Autorización Financiera"

Como analista de negocio, quiero que "Autorización Financiera" quede registrado en el catálogo de Grupos de Estados y en el catálogo de Estados, para que el Ticket y el Servicio Cliente puedan transicionar a él sin depender de una definición fija en código.

### Reglas de Negocio

**RN-22.1** Debe existir un registro Activo en el catálogo de Grupos de Estados (RF-01) que represente la espera de resolución de una autorización financiera, previo al alta del Estado.

**RN-22.2** Debe existir un registro Activo en el catálogo de Estados (RF-02) con Nombre "Autorización Financiera", asociado al Grupo de Estados de RN-22.1, con Mensaje corto y Descripción conforme a RF-02.

**RN-22.3** No podrá existir más de un Estado Activo con Nombre "Autorización Financiera" en el catálogo, conforme a la regla de unicidad de RF-02.

**RN-22.4** El mismo Estado "Autorización Financiera" dado de alta por este RF es el que consumen tanto el Ticket como el Servicio Cliente en RF-23, sin duplicar el alta por cada proceso.

### Criterios de Aceptación

**CA-22.1.1 — Alta del Grupo de Estados**
Dado que no existe un Grupo de Estados que represente la espera de resolución de una autorización financiera
Cuando el administrador lo registra conforme a RF-01 (US-1.1)
Entonces el grupo queda disponible, Activo, para asociarse al Estado "Autorización Financiera".

**CA-22.1.2 — Alta del Estado**
Dado que existe el Grupo de Estados de CA-22.1.1, Activo
Cuando el administrador registra el Estado "Autorización Financiera" asociándolo a ese grupo, conforme a RF-02 (US-2.1)
Entonces el sistema crea el Estado como Activo y disponible para su uso por el Ticket y por el Servicio Cliente.

---

**Regla transversal:**
El Estado "Autorización Financiera" registrado por este RF es prerrequisito de la transición funcional descrita en RF-23; no modifica el alcance de RF-01 ni de RF-02. Es independiente de los Estados "Ing. Traslado" (RF-16), "En Espera del Usuario" (RF-18) y "En Validación" (RF-20).

---


---

# RF-23 — Autorización Financiera del Ticket a partir de compras registradas en sus Diagnósticos

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-01, RF-02, RF-07, RF-22 |

## Objetivo

Habilitar, desde el Ticket, la solicitud de la autorización genérica de compras ("Autorización Financiera") hoy disponible únicamente desde cada Diagnóstico, exigiendo al menos una compra registrada en alguno de los Diagnósticos del Ticket; transicionar el Ticket a Estatus "Autorización Financiera" mientras se resuelve, bloqueando su edición; y reflejar automáticamente el resultado (Autorizado → "En Proceso"; Rechazado → "Autorización Rechazada") en el Ticket, su bitácora, y el Estatus y bitácora del Servicio Cliente relacionado.

## Descripción

Hoy la autorización genérica de compras registradas durante el diagnóstico del Ticket solo puede solicitarse desde cada Diagnóstico de forma individual. Este RF traslada esa misma solicitud al nivel del Ticket, transicionándolo a "Autorización Financiera" (RF-22) mientras se resuelve mediante el mecanismo de autorización genérica ya existente —el mismo que hoy usa "Solicitud de Acceso" (RF-13)—, sin modificarlo. Su resultado (Autorizado/Rechazado) se refleja automáticamente en el Ticket y en el Servicio Cliente relacionado.

---

## US-23.1 — Solicitud de la Autorización Financiera desde el Ticket

Como analista del CAU, quiero poder solicitar la Autorización Financiera directamente desde el Ticket cuando exista al menos una compra registrada en cualquiera de sus Diagnósticos, para no depender de entrar a cada Diagnóstico individual.

### Reglas de Negocio

**RN-23.1** La acción estará disponible en el Ticket cuando exista al menos una compra registrada en cualquiera de sus Diagnósticos activos (no cancelados), sin importar en cuál se haya registrado.

**RN-23.2** La acción solo estará disponible cuando el Ticket se encuentre en Estatus "Proceso".

**RN-23.3** Solo un usuario con el mismo permiso especial ya utilizado hoy para solicitar esta autorización desde el Diagnóstico podrá ver y ejecutar la acción desde el Ticket; este RF no crea un permiso nuevo.

**RN-23.4** Al ejecutarse la acción, el Ticket transiciona a Estatus "Autorización Financiera" (RF-22), y dicho movimiento se registra en la bitácora de estatus del Ticket.

**RN-23.5** Al ejecutarse la acción, el Estatus del Servicio Cliente relacionado se actualiza a "Autorización Financiera" (el mismo Estado de RF-22), y dicho movimiento se registra en su bitácora, conforme al mecanismo de RF-07.

**RN-23.6** Mientras el Ticket se encuentre en Estatus "Autorización Financiera", queda bloqueado para cualquier edición o modificación de sus campos.

**RN-23.7** Esta acción reutiliza el mismo mecanismo y el mismo tipo de autorización genérica ("Autorización Financiera") ya utilizado por el Diagnóstico; no crea un tipo de autorización nuevo.

### Criterios de Aceptación

**CA-23.1.1 — Acción disponible con al menos una compra**
Dado un Ticket en Estatus "Proceso" con al menos una compra registrada en alguno de sus Diagnósticos activos, y un usuario con el permiso especial correspondiente
Cuando consulta el Ticket
Entonces la acción para solicitar la Autorización Financiera está visible y disponible.

**CA-23.1.2 — Acción no disponible sin compras registradas**
Dado un Ticket en Estatus "Proceso" sin ninguna compra registrada en sus Diagnósticos
Cuando lo consulta
Entonces la acción no está disponible.

**CA-23.1.3 — Acción no disponible fuera de Proceso**
Dado un Ticket que no se encuentra en Estatus "Proceso"
Cuando lo consulta
Entonces la acción no está disponible, sin importar si tiene compras registradas.

**CA-23.1.4 — Acción no disponible sin permiso**
Dado un usuario sin el permiso especial correspondiente
Cuando consulta un Ticket en Estatus "Proceso" con al menos una compra registrada
Entonces la acción no está disponible.

**CA-23.1.5 — Transición exitosa y reflejo en Servicio Cliente**
Dado un Ticket en Estatus "Proceso" con al menos una compra registrada y un usuario con el permiso especial correspondiente
Cuando ejecuta la acción para solicitar la Autorización Financiera
Entonces el Ticket transiciona a Estatus "Autorización Financiera", queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado se actualiza al mismo Estado y queda registrado en su propia bitácora.

**CA-23.1.6 — Bloqueo de edición**
Dado un Ticket en Estatus "Autorización Financiera"
Cuando cualquier usuario intenta editar o modificar alguno de sus campos
Entonces el sistema impide la operación.

---

## US-23.2 — Reflejo automático de la resolución de la Autorización Financiera en el Ticket

Como analista de negocio, quiero que la resolución de la Autorización Financiera (Autorizado o Rechazado) se refleje automáticamente en el Ticket y en el Servicio Cliente relacionado, para que ninguno de los dos quede desincronizado respecto al resultado.

### Reglas de Negocio

**RN-23.8** Cuando la Autorización Financiera vinculada al Ticket se resuelva como Autorizada, mediante el mecanismo de autorización genérica ya existente, el Ticket transiciona automáticamente a Estatus "En Proceso", y dicho movimiento se registra en su bitácora.

**RN-23.9** Al ejecutarse RN-23.8, el Estatus del Servicio Cliente relacionado regresa al Estatus que tenía inmediatamente antes de la transición a "Autorización Financiera" (RN-23.5), tomado de su propia bitácora, y dicho movimiento se registra en dicha bitácora.

**RN-23.10** Al ejecutarse RN-23.8, el Ticket deja de estar bloqueado y vuelve a quedar disponible para su edición conforme a las reglas ya existentes para un Ticket en Proceso.

**RN-23.11** Cuando la Autorización Financiera vinculada al Ticket se resuelva como Rechazada, el Ticket transiciona a Estatus "Autorización Rechazada" (estatus ya existente en el sistema), y dicho movimiento se registra en su bitácora.

**RN-23.12** Al ejecutarse RN-23.11, el Estatus del Servicio Cliente relacionado se actualiza a "Autorización Rechazada", y dicho movimiento se registra en su bitácora.

**RN-23.13** El Estatus "Autorización Rechazada" es terminal para efectos de este RF: no se define ninguna acción de regreso a "En Proceso" ni a ningún otro Estatus.

### Criterios de Aceptación

**CA-23.2.1 — Autorización aprobada**
Dado un Ticket en Estatus "Autorización Financiera" cuya autorización es resuelta como Autorizada
Cuando dicha resolución ocurre
Entonces el Ticket transiciona a Estatus "En Proceso", queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado regresa al que tenía antes, quedando registrado en su propia bitácora.

**CA-23.2.2 — Autorización rechazada**
Dado un Ticket en Estatus "Autorización Financiera" cuya autorización es resuelta como Rechazada
Cuando dicha resolución ocurre
Entonces el Ticket transiciona a Estatus "Autorización Rechazada", queda registrado en su bitácora, y el Estatus del Servicio Cliente relacionado se actualiza al mismo Estatus, quedando registrado en su propia bitácora.

**CA-23.2.3 — Edición restablecida tras autorización**
Dado un Ticket que acaba de regresar a Estatus "Proceso" conforme a CA-23.2.1
Cuando un usuario intenta editarlo
Entonces el sistema permite la edición conforme a las reglas ya existentes para un Ticket en Proceso.

**CA-23.2.4 — Sin acción de regreso tras el rechazo**
Dado un Ticket en Estatus "Autorización Rechazada" conforme a CA-23.2.2
Cuando se consulta el Ticket
Entonces no existe ninguna acción disponible, dentro del alcance de este RF, para regresarlo a "En Proceso" o a cualquier otro Estatus.

---

**Regla transversal:**
Este RF depende de RF-22 (alta del Estado "Autorización Financiera") y de RF-07 (bitácora obligatoria). Reutiliza el mismo permiso especial y el mismo mecanismo de autorización genérica ya utilizado hoy por el Diagnóstico; no crea un permiso ni un tipo de autorización nuevos. El Estatus "Autorización Rechazada" ya existe en el sistema y se reutiliza sin alta adicional en el catálogo de Estados. Queda como consideración técnica para el equipo de desarrollo la coexistencia de este flujo con el que el Ticket ya utiliza para su propia "Solicitud de Acceso" (RF-13), dado que ambos se apoyan en el mismo mecanismo genérico de autorización; este RF no prescribe cómo debe resolverse dicha coexistencia.

**Nota — fuera de alcance:** este RF no incorpora ningún mecanismo automático de vencimiento por tolerancia para el Estatus "Autorización Financiera" (a diferencia de "En Validación", que sí lo tiene en RF-24); el Job de cancelación automática existente en el sistema opera sobre Estatus "En Autorización"/"Autorización Rechazada" y es independiente de este flujo, por lo que no aplica aquí. Si se requiere un mecanismo equivalente, es un requerimiento independiente fuera de este documento.

---


---

# RF-24 — Job para finalizar Tickets con plazo de validación vencido

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Asignado       |              |
| Dependencias   | RF-05, RF-07, RF-20, RF-21 |

## Objetivo

Ejecutar, mediante una Tarea Programada (Job) que corre cada hora dentro del horario laboral, la finalización automática de los Tickets en Estatus "En Validación" cuyo plazo de validación —contabilizado únicamente en horas laborales— ya venció, tratando la falta de respuesta del usuario que reporta como una validación implícita "Válido", y reflejando el movimiento en la bitácora del Ticket y en el Estatus y bitácora del Servicio Cliente relacionado.

## Descripción

RF-21 estableció que un Ticket cerrado con un Tipo de Servicio Interno que requiere validación (RF-05) transiciona a "En Validación", registrando su Fecha de Inicio de Validación (RN-21.7). Este RF finaliza automáticamente esos Tickets cuando su plazo vence sin respuesta del usuario que reporta, tratando el silencio como una validación implícita "Válido". El plazo se contabiliza únicamente en horas dentro del horario laboral (ver RN-24.1 y el ejemplo en CA-24.2.5/CA-24.2.6), no en horas de reloj corridas.

---

## US-24.1 — Ejecución del Job dentro del horario laboral

Como analista de negocio, quiero que el Job de finalización de validaciones se ejecute únicamente dentro del horario laboral definido, para que los Tickets no se finalicen fuera de la operación normal del CAU.

### Reglas de Negocio

**RN-24.1** El Job se ejecuta cada hora, únicamente de lunes a viernes entre las 9:00 y las 18:00 horas, y los sábados entre las 9:00 y las 14:00 horas.

**RN-24.2** El Job no se ejecuta los domingos, ni en ningún horario fuera de las ventanas de RN-24.1.

### Criterios de Aceptación

**CA-24.1.1 — Ejecución en horario laboral entre semana**
Dado que es un día de lunes a viernes y la hora actual se encuentra entre las 9:00 y las 18:00
Cuando corresponde la ejecución horaria del Job
Entonces el Job se ejecuta.

**CA-24.1.2 — Ejecución en horario laboral de sábado**
Dado que es sábado y la hora actual se encuentra entre las 9:00 y las 14:00
Cuando corresponde la ejecución horaria del Job
Entonces el Job se ejecuta.

**CA-24.1.3 — Sin ejecución fuera de horario laboral**
Dado que la hora actual se encuentra fuera de las ventanas de RN-24.1
Cuando correspondería la ejecución horaria del Job
Entonces el Job no se ejecuta.

---

## US-24.2 — Finalización automática de Tickets con plazo vencido

Como analista de negocio, quiero que el Job finalice automáticamente los Tickets en "En Validación" cuyo plazo de validación venció, para que ningún Ticket quede indefinidamente a la espera de una confirmación que no llegó.

### Reglas de Negocio

**RN-24.3** En cada ejecución, el Job obtiene los Tickets en Estatus "En Validación".

**RN-24.4** Para cada Ticket obtenido, el Job calcula las horas laborales acumuladas desde su Fecha de Inicio de Validación (RN-21.7) hasta el momento de la ejecución, contando exclusivamente las horas dentro de las ventanas de RN-24.1.

**RN-24.5** Un Ticket se considera con el plazo vencido cuando las horas laborales acumuladas conforme a RN-24.4 son mayores o iguales al Tiempo de Expiración de Validación en Horas (RF-05) del Tipo de Servicio Interno definido en el cierre.

**RN-24.6** Todo Ticket con el plazo vencido transiciona a Estatus "Atendido" (el mismo Estatus de cierre que habría recibido de no requerir validación), tratando la falta de resolución como una validación implícita "Válido".

**RN-24.7** Toda transición ejecutada por el Job conforme a RN-24.6 se registra en la bitácora de estatus del Ticket.

**RN-24.8** Toda transición ejecutada por el Job conforme a RN-24.6 debe reflejarse en el Estatus del Servicio Cliente relacionado, mediante el mismo mecanismo que ya sincroniza dicho Estatus cuando el Ticket se cierra normalmente, y dicho movimiento se registra en su bitácora.

**RN-24.9** Un Ticket en "En Validación" cuyo plazo aún no está vencido no es modificado por el Job.

**RN-24.10** Al finalizar un Ticket, el Job registra como responsable de la atención (Atendió) a un empleado de respaldo configurado para cierres automáticos, siguiendo el mismo mecanismo ya utilizado por el Job de cancelación existente (variable de sistema con el personal encargado de soporte); ningún Ticket queda finalizado sin un responsable identificado.

### Criterios de Aceptación

**CA-24.2.1 — Finalización de Ticket vencido**
Dado un Ticket en Estatus "En Validación" cuyas horas laborales acumuladas desde su Fecha de Inicio de Validación ya alcanzan el Tiempo de Expiración de Validación en Horas del Tipo de Servicio Interno definido en el cierre
Cuando el Job se ejecuta
Entonces el Ticket transiciona a Estatus "Atendido", quedando registrado en su bitácora.

**CA-24.2.2 — Reflejo en Servicio Cliente**
Dado un Ticket finalizado por el Job conforme a CA-24.2.1
Cuando dicha finalización ocurre
Entonces el Estatus del Servicio Cliente relacionado se actualiza conforme al cierre del Ticket y queda registrado en su propia bitácora.

**CA-24.2.3 — Ticket sin plazo vencido no se modifica**
Dado un Ticket en Estatus "En Validación" cuyas horas laborales acumuladas aún no alcanzan el Tiempo de Expiración de Validación en Horas correspondiente
Cuando el Job se ejecuta
Entonces dicho Ticket permanece sin cambios en Estatus "En Validación".

**CA-24.2.4 — Ejecución masiva**
Dado que existen varios Tickets en Estatus "En Validación" con el plazo vencido al momento de ejecutarse el Job
Cuando el Job se ejecuta
Entonces todos ellos son finalizados conforme a CA-24.2.1 y CA-24.2.2 en la misma ejecución.

**CA-24.2.5 — Plazo que abarca un fin de semana**
Dado un Ticket cuya Fecha de Inicio de Validación es un sábado a las 13:00 y cuyo Tipo de Servicio Interno tiene un Tiempo de Expiración de Validación de 5 horas
Cuando el Job se ejecuta en cualquier momento entre el sábado a las 14:00 y el lunes antes de las 13:00
Entonces el Ticket permanece sin cambios en "En Validación", pues solo ha acumulado 1 hora laboral; su plazo se cumple hasta el lunes a las 13:00.

**CA-24.2.6 — Cumplimiento del plazo tras el fin de semana**
Dado el mismo Ticket de CA-24.2.5
Cuando el Job se ejecuta el lunes a las 13:00 o después
Entonces el Ticket transiciona a Estatus "Atendido", conforme a CA-24.2.1.

**CA-24.2.7 — Responsable de la finalización automática**
Dado un Ticket finalizado por el Job conforme a CA-24.2.1
Cuando se consulta quién quedó registrado como responsable de la atención
Entonces corresponde al empleado de respaldo configurado para cierres automáticos, y no queda vacío.

---

**Regla transversal:**
Este RF depende de RF-05 (Tiempo de Expiración de Validación), RF-07 (bitácora obligatoria), RF-20 (alta del Estado "En Validación") y RF-21 (transición a "En Validación" y Fecha de Inicio de Validación, RN-21.7). La finalización automática de este Job trata siempre la falta de respuesta como una validación implícita "Válido"; no aplica cuando el usuario que reporta resuelve la validación como "No Válido" antes del vencimiento, caso cubierto por el requerimiento independiente referenciado en RF-21. Queda fuera de alcance de este RF definir un mecanismo equivalente para la Solicitud de Servicio.

**Nota técnica:** el cierre de un Ticket dispara lógica adicional (registro de quién atendió, fecha de atención, tipo de servicio interno de cierre) que hoy solo se ejecuta desde la acción de cierre operada por una persona. El desarrollo debe asegurar que la finalización automática de este Job dispare esa misma lógica —incluyendo el responsable de RN-24.10—, en lugar de únicamente cambiar el campo Estatus, para no dejar el Ticket en un estado inconsistente.

---

