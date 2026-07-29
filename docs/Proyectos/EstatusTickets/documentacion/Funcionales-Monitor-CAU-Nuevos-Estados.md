# Requerimientos Funcionales — Monitor CAU, Nuevos Estados

---

## Índice de requerimientos

| RF | Título | Grupo |
|----|--------|-------|
| [RF-01](#rf-01--administración-de-grupos-de-estados) | Administración de Grupos de Estados | Catálogos |
| [RF-02](#rf-02--administración-de-estados) | Administración de Estados | Catálogos |
| [RF-03](#rf-03--administración-de-motivos-de-cancelación) | Administración de Motivos de Cancelación | Catálogos |
| [RF-04](#rf-04--importación-de-los-estados-existentes-al-catálogo) | Importación de los Estados existentes al catálogo | Catálogos |
| [RF-05](#rf-05--bitácora-del-servicio-cliente-con-catálogo-de-estados) | Bitácora del Servicio Cliente con catálogo de Estados | Monitor CAU |
| [RF-06](#rf-06--registro-del-servicio-con-estatus-registrado-y-su-bitácora) | Registro del Servicio con Estatus Registrado y su bitácora | Monitor CAU |
| [RF-07](#rf-07--transición-de-registrado-a-investigación-cau-desde-monitor-cau) | Transición de Registrado a Investigación CAU desde Monitor CAU | Monitor CAU |
| [RF-08](#rf-08--rediseño-de-tarjetas-del-monitor-cau) | Rediseño de tarjetas del Monitor CAU | Monitor CAU |
| [RF-09](#rf-09--adecuación-del-wizard-de-registro-de-ticket-o-solicitud-de-servicio) | Adecuación del wizard de registro de Ticket o Solicitud de Servicio | Monitor CAU |
| [RF-10](#rf-10--registro-automático-de-autorización-digital-al-generar-ticket-o-solicitud-de-servicio) | Registro automático de autorización digital al generar Ticket o Solicitud de Servicio | Monitor CAU |
| [RF-11](#rf-11--cancelación-del-servicio-desde-el-wizard) | Cancelación del Servicio desde el wizard | Monitor CAU |

---

# RF-01 — Administración de Grupos de Estados

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | Ninguna      |

## Objetivo

Administrar de forma centralizada el catálogo de Grupos de Estados, que agrupan por significado de negocio los estados de los distintos procesos del sistema.

## Descripción

El sistema permite registrar, consultar, editar, cancelar y reactivar Grupos de Estados. Un Grupo de Estados representa un hecho de negocio (por ejemplo, "Registrado", "En Proceso") del cual se derivan uno o varios estados de los distintos catálogos del sistema, evitando que distintos procesos dupliquen el significado de un mismo estatus.

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

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-01        |

## Objetivo

Administrar el catálogo de Estados que utilizan los procesos del sistema, homologándolos opcionalmente a un Grupo de Estados y dotándolos de la información visual (Mensaje corto, Color, Ícono) con la que se presentan a los usuarios.

## Descripción

El sistema permite registrar, consultar, editar, cancelar y reactivar Estados. Cada Estado puede asociarse, de forma opcional, a un Grupo de Estados Activo (RF-01) para reutilizar el mismo significado de negocio entre procesos, y puede capturar, también de forma opcional, un Mensaje corto, un Color y un Ícono para identificarlo visualmente (por ejemplo, en tarjetas y bitácoras).

---

## US-2.1 — Registro de Estados

Como administrador del sistema, quiero registrar nuevos Estados asociados a un Grupo de Estados, para dar de alta el catálogo de estatus que utilizarán los distintos procesos del sistema.

### Reglas de negocio

**RN-2.1** La Clave será obligatoria y no podrá duplicarse contra ningún otro estado del catálogo (incluyendo estados cancelados).

**RN-2.2** El Nombre será obligatorio y no podrá duplicarse contra ningún otro estado del catálogo, sin importar el Grupo de Estados al que pertenezca, sin distinguir mayúsculas/minúsculas ni espacios al inicio/final.

**RN-2.3** El Grupo de Estados es opcional; cuando se captura, deberá corresponder a un grupo con Estado del Registro = Activo (RF-01).

**RN-2.4** La Descripción será obligatoria.

**RN-2.5** Todo estado se crea con Estado del Registro = Activo.

**RN-2.6** Todo alta, edición, cancelación o reactivación realizada en el catálogo de Estados deberá registrarse en la bitácora de auditoría.

**RN-2.7** El Mensaje corto es opcional.

**RN-2.20** El Color es opcional; cuando se captura, se utiliza para identificar visualmente al Estado en las tarjetas y bitácoras de los procesos que lo consumen.

**RN-2.21** El Ícono es opcional; cuando se captura, se utiliza para identificar visualmente al Estado en las tarjetas y bitácoras de los procesos que lo consumen.

### Criterios de Aceptación

**CA-2.1.1 — Registro exitoso**
Dado que el administrador captura una Clave y un Nombre que no existen en el catálogo, junto con la Descripción
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
Dado que el administrador no captura la Clave, el Nombre o la Descripción
Cuando intente registrar el estado
Entonces el sistema impedirá el registro e indicará los campos obligatorios faltantes.

---

## US-2.2 — Edición de Estados

Como administrador del sistema, quiero editar la información de un Estado existente, para corregir o actualizar su Nombre, Descripción, Mensaje corto, Color, Ícono o Grupo de Estados sin perder su identificador ni su historial.

### Reglas de negocio

**RN-2.8** La Clave no podrá modificarse una vez creado el estado.

**RN-2.9** El Nombre podrá editarse siempre que el nuevo valor no coincida (sin distinguir mayúsculas/minúsculas ni espacios) con el de otro estado del catálogo.

**RN-2.10** El Grupo de Estados podrá asignarse, reasignarse o retirarse (dejar el estado sin Grupo de Estados); cuando se asigne o reasigne, el grupo indicado deberá tener Estado del Registro = Activo.

**RN-2.11** Un estado con Estado del Registro = Cancelado no podrá editarse; primero deberá reactivarse.

**RN-2.12** El Mensaje corto puede quedar vacío al editarlo, dado que es opcional.

**RN-2.13** La Descripción no podrá quedar vacía al editarla, dado que es obligatoria.

### Criterios de Aceptación

**CA-2.2.1 — Edición exitosa**
Dado un estado activo existente
Cuando el administrador modifique su Nombre, Descripción, Mensaje corto, Color, Ícono y/o Grupo de Estados con datos válidos
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

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | Ninguna      |

## Objetivo

Administrar de forma centralizada el catálogo de Motivos de Cancelación, utilizado para documentar la causa por la que se cancela un Servicio.

## Descripción

El sistema permite registrar, consultar, editar, cancelar y reactivar Motivos de Cancelación, cada uno con Clave, Nombre y Descripción propios, siguiendo el mismo esquema administrativo que los demás catálogos de este documento. Un motivo puede marcarse con el indicador "Requiere Especificar" (por ejemplo, "Otro"), para exigir un detalle adicional en texto libre al utilizarse en una cancelación.

---

## US-3.1 — Registro de Motivos de Cancelación

Como administrador del sistema, quiero registrar nuevos Motivos de Cancelación capturando Clave, Nombre y Descripción, para dar de alta el catálogo con el que se documentarán las cancelaciones de Servicio.

### Reglas de negocio

**RN-3.1** La Clave será obligatoria y no podrá duplicarse contra ningún otro motivo del catálogo (incluyendo motivos cancelados).

**RN-3.2** El Nombre será obligatorio y no podrá duplicarse contra ningún otro motivo del catálogo, sin distinguir mayúsculas/minúsculas ni espacios al inicio/final.

**RN-3.3** La Descripción será obligatoria.

**RN-3.4** Todo motivo se crea con Estado del Registro = Activo.

**RN-3.5** Todo alta, edición, cancelación o reactivación realizada en el catálogo deberá registrarse en la bitácora de auditoría.

**RN-3.15** El Motivo de Cancelación cuenta con un indicador "Requiere Especificar", opcional, con valor por defecto No; cuando está en Sí, señala que este motivo exige capturar un detalle adicional en texto libre al utilizarse en una cancelación (por ejemplo, un motivo "Otro").

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

**RN-3.6** La Clave no podrá modificarse una vez creado el motivo.

**RN-3.7** El Nombre podrá editarse siempre que el nuevo valor no coincida (sin distinguir mayúsculas/minúsculas ni espacios) con el de otro motivo del catálogo.

**RN-3.8** Un motivo con Estado del Registro = Cancelado no podrá editarse; primero deberá reactivarse.

**RN-3.9** La Descripción no podrá quedar vacía al editarla, dado que es obligatoria.

**RN-3.16** El indicador "Requiere Especificar" podrá editarse en cualquier momento sobre un motivo Activo.

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

**RN-3.10** La cancelación es lógica: el sistema no permitirá eliminar físicamente un motivo, únicamente cambiar su Estado del Registro a Cancelado.

**RN-3.11** La cancelación de un motivo no modifica ni elimina las cancelaciones de Servicio que ya lo tengan asignado.

**RN-3.12** Un motivo cancelado no podrá asignarse a nuevas cancelaciones de Servicio.

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

**RN-3.13** Un motivo solo podrá reactivarse si su Estado del Registro actual es Cancelado.

**RN-3.14** Un motivo podrá reactivarse únicamente si no existe otro motivo Activo con el mismo Nombre (sin distinguir mayúsculas/minúsculas ni espacios).

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
El catálogo de Motivos de Cancelación es prerrequisito de cualquier acción de cancelación que lo consuma (por ejemplo, RF-11); un motivo cancelado no puede utilizarse en nuevas cancelaciones, pero las cancelaciones ya registradas que lo tengan asignado no se ven afectadas.

---


---

# RF-04 — Importación de los Estados existentes al catálogo

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-02        |

## Objetivo

Cargar en el catálogo de Estados (RF-02) los estatus que hoy están definidos de forma fija en el sistema, para que quede poblado desde su entrada en operación con un dato equivalente a cada valor ya utilizado.

## Descripción

El sistema utiliza hoy un listado fijo de estatus, compartido por múltiples procesos, que no proviene del catálogo de Estados (RF-02). Este RF realiza una carga única que registra en el catálogo un Estado por cada uno de esos estatus, tomando su misma Clave, Nombre, Color e Ícono, sin asignarles Grupo de Estados (dato opcional en RF-02). No es un proceso recurrente de sincronización.

---

## US-4.1 — Carga inicial de los Estados existentes

Como analista de negocio, quiero que el catálogo de Estados quede poblado desde el inicio con un registro equivalente a cada estatus fijo que ya utiliza el sistema, para que los procesos existentes cuenten de inmediato con sus Estados ya homologados en el catálogo administrado.

### Reglas de negocio

**RN-4.1** Se realiza una carga inicial única que registra en el catálogo de Estados un Estado por cada estatus fijo actualmente utilizado por los procesos del sistema.

**RN-4.2** Cada Estado importado toma como Clave y Nombre el valor ya utilizado internamente para ese estatus, respetando las reglas de unicidad de Clave y Nombre del catálogo (RF-02).

**RN-4.3** Cuando el estatus fijo ya cuenta con un Color y/o un Ícono definidos, estos se replican en el Estado importado; cuando no cuente con ellos, el Estado se importa sin Color y/o sin Ícono, dado que ambos son opcionales (RF-02).

**RN-4.4** Los Estados importados no se asocian a ningún Grupo de Estados durante la carga inicial, dado que el Grupo de Estados es opcional (RF-02); su homologación a un Grupo de Estados, si llegara a requerirse, queda fuera de alcance de este RF.

**RN-4.5** Todo Estado importado se crea con Estado del Registro = Activo.

**RN-4.6** Esta carga es un evento único al entrar en operación este RF; no es un proceso recurrente ni se vuelve a ejecutar ante altas futuras del listado fijo de estatus, las cuales se incorporarán manualmente al catálogo conforme a RF-02.

### Criterios de Aceptación

**CA-4.1.1 — Importación completa**
Dado el listado fijo de estatus que actualmente utilizan los procesos del sistema
Cuando se ejecuta la carga inicial de este RF
Entonces el catálogo de Estados queda con un registro por cada uno de esos estatus, con Estado del Registro = Activo.

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
Este RF depende del catálogo de Estados (RF-02), y de que el Grupo de Estados sea un dato opcional en dicho catálogo, para no requerir su asignación durante la carga inicial. Es un prerrequisito de datos para que RF-05 (relación de la bitácora del Servicio Cliente con el catálogo de Estados) pueda homologar transiciones existentes contra Estados ya presentes en el catálogo.

---


---

# RF-05 — Bitácora del Servicio Cliente con catálogo de Estados

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Media        |
| Estado         | Definición   |
| Dependencias   | RF-02, RF-04 |

## Objetivo

Relacionar cada registro de la bitácora de estatus de la petición del cliente con su Estado del catálogo administrado, para mostrar de forma consistente su Nombre, Mensaje corto, Color e Ícono.

## Descripción

La bitácora de estatus de la petición del cliente guarda hoy el estatus como un valor fijo interno, compartido con otros procesos, sin relación al catálogo de Estados (RF-02). Este RF agrega dicha relación sin eliminar el valor interno existente, de modo que ambos convivan y el histórico pueda mostrar la información visual administrada en el catálogo.

---

## US-5.1 — Relación de la bitácora con el catálogo de Estados

Como analista de negocio, quiero que cada registro de la bitácora de estatus de la petición del cliente quede relacionado, cuando exista, con su Estado correspondiente del catálogo administrado, para que el histórico muestre de forma consistente la información visual de dicho Estado en lugar de un valor fijo interno.

### Reglas de negocio

**RN-5.1** Se agrega a la bitácora de estatus de la petición del cliente una relación con el Estado correspondiente del catálogo administrado (RF-02).

**RN-5.2** Todo nuevo registro de la bitácora debe quedar relacionado con el Estado del catálogo homologado a la transición registrada, cuando dicha homologación exista.

**RN-5.3** El valor de estatus interno que hoy guarda la bitácora se conserva sin cambios; este RF no lo elimina ni lo sustituye, únicamente lo complementa.

**RN-5.4** El Estado del catálogo relacionado solo podrá corresponder a un Estado Activo (RF-02).

**RN-5.5** Si una transición de estatus no cuenta aún con un Estado homologado en el catálogo, el registro de la bitácora podrá generarse sin dicha relación; queda fuera de alcance de este RF completar retroactivamente los registros de bitácora ya generados antes de su entrada en vigor.

### Criterios de Aceptación

**CA-5.1.1 — Registro con Estado del catálogo homologado**
Dado que se genera un nuevo registro de la bitácora de estatus de la petición del cliente para una transición que cuenta con un Estado homologado en el catálogo
Cuando dicho registro se crea
Entonces el registro queda relacionado con dicho Estado del catálogo, además de conservar su valor de estatus interno.

**CA-5.1.2 — Bloqueo por Estado del catálogo cancelado**
Dado que el Estado del catálogo homologado a la transición se encuentra Cancelado
Cuando se genera el registro de bitácora para dicha transición
Entonces el sistema no relaciona el registro con ese Estado cancelado del catálogo.

**CA-5.1.3 — Registro sin Estado del catálogo homologado**
Dado que una transición de estatus no cuenta aún con un Estado homologado en el catálogo
Cuando se genera su registro de bitácora
Entonces el registro se crea con su valor de estatus interno y sin relación al catálogo, sin que esto impida su generación.

**CA-5.1.4 — Sin ajuste de registros históricos**
Dado un registro de la bitácora generado antes de la entrada en vigor de este RF
Cuando se consulta dicho registro
Entonces conserva su valor de estatus interno sin cambios y sin relación al catálogo, sin que se le aplique ningún ajuste retroactivo.

---

**Regla transversal:**
Este RF depende del catálogo de Estados (RF-02) para contar con los registros que puede relacionar, y de la importación inicial (RF-04) para que las transiciones ya existentes cuenten con un Estado homologado desde el inicio; es el prerrequisito para que el histórico de la petición del cliente pueda mostrar el Nombre, Mensaje corto, Color e Ícono administrados en dicho catálogo, en lugar de un valor fijo interno.

---


---

# RF-06 — Registro del Servicio con Estatus Registrado y su bitácora

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-05        |

## Objetivo

Que, al registrarse un nuevo Servicio (petición del cliente), su Estatus quede establecido en "Registrado" y se genere, en consecuencia, el primer registro de su bitácora de estatus.

## Descripción

Este RF garantiza que toda alta de un Servicio deje su Estatus en "Registrado" y que, como consecuencia directa de dicha alta, se genere automáticamente el primer registro de su bitácora, sin intervención manual del usuario, conforme al mecanismo de relación con el catálogo de Estados definido en RF-05.

---

## US-6.1 — Alta del Servicio con bitácora inicial

Como analista de negocio, quiero que todo nuevo Servicio quede registrado con Estatus "Registrado" y con el primer registro de su bitácora generado automáticamente, para contar con trazabilidad completa desde el origen de la petición del cliente.

### Reglas de negocio

**RN-6.1** Al registrarse un nuevo Servicio, su Estatus se establece en "Registrado".

**RN-6.2** El alta de un Servicio genera automáticamente el primer registro de su bitácora de estatus, con Estatus = "Registrado".

**RN-6.3** El registro de bitácora generado por el alta queda relacionado con el Estado "Registrado" del catálogo administrado, conforme al mecanismo de RF-05, cuando dicho Estado exista homologado en el catálogo.

**RN-6.4** El registro de bitácora del alta no requiere ninguna acción manual adicional del usuario que registra el Servicio; se genera de forma automática como parte del alta.

### Criterios de Aceptación

**CA-6.1.1 — Alta exitosa con Estatus Registrado**
Dado que un usuario registra un nuevo Servicio
Cuando el registro se completa
Entonces el Servicio queda con Estatus = "Registrado".

**CA-6.1.2 — Generación automática de la bitácora**
Dado que se registra un nuevo Servicio
Cuando el registro se completa
Entonces se genera automáticamente el primer registro de su bitácora de estatus, con Estatus = "Registrado".

**CA-6.1.3 — Relación con el catálogo de Estados**
Dado que el catálogo de Estados cuenta con un Estado homologado a "Registrado"
Cuando se genera el primer registro de bitácora de un Servicio recién registrado
Entonces dicho registro queda relacionado con ese Estado del catálogo, conforme al mecanismo de RF-05.

**CA-6.1.4 — Sin intervención manual**
Dado que un usuario registra un nuevo Servicio
Cuando el registro se completa
Entonces el primer registro de la bitácora se genera sin que el usuario deba ejecutar ninguna acción adicional.

---

**Regla transversal:**
Este RF depende de RF-05 (mecanismo de relación de la bitácora con el catálogo de Estados) para que el registro inicial de bitácora quede relacionado con el Estado homologado a "Registrado", y de que dicho Estado exista en el catálogo (RF-04, importación inicial, o alta manual conforme a RF-02).

---


---

# RF-07 — Transición de Registrado a Investigación CAU desde Monitor CAU

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-02, RF-05, RF-06 |

## Objetivo

Habilitar que el Servicio transicione de "Registrado" a "Investigación CAU" cuando el analista del CAU inicia su revisión desde Monitor CAU, tomando el Nombre, Mensaje corto, Color e Ícono del catálogo administrado (RF-02).

## Descripción

Hoy el Servicio permanece en "Registrado" hasta generarse el Ticket o la Solicitud de Servicio derivada, sin una transición a "Investigación CAU" que tome su información visual del catálogo administrado. Este RF agrega la acción Iniciar Revisión en Monitor CAU, que transiciona el Servicio a "Investigación CAU" usando la configuración de dicho Estado en el catálogo (RF-02) y registra el movimiento en su bitácora (RF-05).

---

## US-7.1 — Transición a Investigación CAU desde Monitor CAU

Como analista del CAU, quiero que el Servicio cambie a "Investigación CAU" al seleccionar Iniciar Revisión en Monitor CAU, para que el estado reflejado provenga del catálogo administrado y quede registrado en su bitácora.

### Reglas de negocio

**RN-7.1** El Servicio solo puede transicionar a "Investigación CAU" cuando su Estatus vigente es "Registrado".

**RN-7.2** Solo un usuario con el permiso especial de CAU puede ejecutar la transición.

**RN-7.3** Al ejecutar la transición, el sistema toma el Nombre, Mensaje corto, Color e Ícono del Estado "Investigación CAU" del catálogo de Estados (RF-02).

**RN-7.4** Un Estado "Investigación CAU" con Estado del Registro = Cancelado en el catálogo no puede utilizarse en la transición.

**RN-7.5** Toda transición a "Investigación CAU" genera un nuevo registro en la bitácora del Servicio, relacionado con dicho Estado del catálogo, conforme al mecanismo de RF-05.

**RN-7.6** La transición a "Investigación CAU" solo puede dispararse mediante la acción Iniciar Revisión disponible en Monitor CAU sobre el Servicio seleccionado; no existe otro punto de entrada.

### Criterios de Aceptación

**CA-7.1.1 — Transición exitosa**
Dado que el Servicio está en Estatus "Registrado", el usuario cuenta con el permiso especial de CAU y se encuentra en Monitor CAU
Cuando el analista selecciona Iniciar Revisión sobre ese Servicio
Entonces el Estatus cambia a "Investigación CAU", tomando Nombre, Mensaje corto, Color e Ícono del catálogo de Estados, y se registra el movimiento en su bitácora.

**CA-7.1.2 — Bloqueo por falta de permiso**
Dado que el usuario no cuenta con el permiso especial de CAU
Cuando intenta seleccionar Iniciar Revisión en Monitor CAU
Entonces el sistema lo impide.

**CA-7.1.3 — Bloqueo por Estatus previo inválido**
Dado que el Servicio no se encuentra en Estatus "Registrado"
Cuando se intenta transicionar a "Investigación CAU" desde Monitor CAU
Entonces el sistema impide la operación.

**CA-7.1.4 — Bloqueo por Estado cancelado en el catálogo**
Dado que el Estado "Investigación CAU" del catálogo se encuentra Cancelado
Cuando el analista selecciona Iniciar Revisión
Entonces el sistema impide la operación.

**CA-7.1.5 — Sin otro punto de entrada**
Dado que el Servicio está en Estatus "Registrado"
Cuando se intenta ejecutar la transición a "Investigación CAU" desde cualquier vista o proceso distinto a Iniciar Revisión de Monitor CAU
Entonces el sistema no ofrece ni permite dicha transición.

---

**Regla transversal:**
Este RF depende del catálogo de Estados (RF-02) para la configuración del Estado "Investigación CAU", del mecanismo de bitácora (RF-05) para registrar la transición relacionada con dicho catálogo, y de RF-06 para que el Servicio ya cuente con Estatus "Registrado" y su primer registro de bitácora antes de esta transición.

---


---

# RF-08 — Rediseño de tarjetas del Monitor CAU

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-05, RF-07 |

## Objetivo

Que Monitor CAU muestre únicamente 4 tarjetas de Estatus (Registrado, Requiere Autorización, En Autorización e Investigación CAU), cada una filtrando directamente por el Estatus propio del Servicio.

## Descripción

Hoy Monitor CAU muestra 8 tarjetas, la mayoría de las cuales no filtra por el Estatus propio del Servicio, sino que se arma revisando el Estatus del Ticket o de la Solicitud de Servicio derivada. Este RF reduce Monitor CAU a 4 tarjetas, cada una filtrando exclusivamente por el Estatus propio del Servicio; esto implica que el Servicio deberá reflejar en su propio Estatus las etapas "Requiere Autorización" y "En Autorización" conforme avance el ciclo de su Ticket o Solicitud de Servicio derivada.

---

## US-8.1 — Visualización acotada a 4 tarjetas en Monitor CAU

Como analista del CAU, quiero que Monitor CAU muestre únicamente las tarjetas Registrado, Requiere Autorización, En Autorización e Investigación CAU, cada una con los Servicios cuyo propio Estatus corresponda a esa tarjeta, para enfocar mi trabajo sin distraerme con vistas derivadas de otros procesos.

### Reglas de negocio

**RN-8.1** Monitor CAU mostrará exactamente 4 tarjetas: "Registrado", "Requiere Autorización", "En Autorización" e "Investigación CAU"; ninguna otra tarjeta o pestaña de estatus se mostrará en esta vista.

**RN-8.2** Cada tarjeta listará únicamente los Servicios cuyo propio Estatus corresponda exactamente al nombre de la tarjeta; la pertenencia a una tarjeta no podrá derivarse del Estatus de Tickets o Solicitudes de Servicio relacionados.

**RN-8.3** La tarjeta "Investigación CAU" mostrará los Servicios con Estatus = "Investigación CAU", conforme a la transición descrita en RF-07.

**RN-8.4** El Servicio deberá reflejar en su propio Estatus las etapas "Requiere Autorización" y "En Autorización" conforme a su ciclo de vida real (por ejemplo, al derivarse o avanzar su Ticket o Solicitud de Servicio), de modo que las tarjetas correspondientes puedan filtrar directamente sobre ese campo.

**RN-8.5** Toda transición del Estatus del Servicio hacia "Requiere Autorización" o "En Autorización" debe registrarse en su bitácora, relacionada con el Estado del catálogo homologado, conforme al mecanismo de RF-05.

**RN-8.6** El listado de cada una de las 4 tarjetas mostrará la Fecha de Registro del Servicio como columna visible.

**RN-8.7** El listado de cada tarjeta se ordenará por Fecha de Registro de forma ascendente (los Servicios más antiguos primero), para que el analista del CAU priorice la atención de los que llevan mayor tiempo de espera.

### Criterios de Aceptación

**CA-8.1.1 — Solo 4 tarjetas visibles**
Dado que el analista del CAU abre la vista Monitor CAU
Cuando la vista termina de cargar
Entonces se muestran únicamente las tarjetas "Registrado", "Requiere Autorización", "En Autorización" e "Investigación CAU".

**CA-8.1.2 — Tarjeta Registrado**
Dado que un Servicio tiene Estatus = "Registrado"
Cuando se consulta la tarjeta "Registrado"
Entonces el Servicio aparece listado en dicha tarjeta.

**CA-8.1.3 — Tarjeta Requiere Autorización**
Dado que un Servicio tiene Estatus = "Requiere Autorización"
Cuando se consulta la tarjeta "Requiere Autorización"
Entonces el Servicio aparece listado en dicha tarjeta.

**CA-8.1.4 — Tarjeta En Autorización**
Dado que un Servicio tiene Estatus = "En Autorización"
Cuando se consulta la tarjeta "En Autorización"
Entonces el Servicio aparece listado en dicha tarjeta.

**CA-8.1.5 — Tarjeta Investigación CAU**
Dado que un Servicio tiene Estatus = "Investigación CAU"
Cuando se consulta la tarjeta "Investigación CAU"
Entonces el Servicio aparece listado en dicha tarjeta.

**CA-8.1.6 — Exclusión de Servicios en otro Estatus**
Dado que un Servicio tiene un Estatus distinto a los cuatro contemplados por este RF
Cuando se consulta cualquiera de las 4 tarjetas del Monitor CAU
Entonces el Servicio no aparece listado en ninguna de ellas.

**CA-8.1.7 — Sin derivación desde Tickets o Solicitudes de Servicio**
Dado que el Ticket o la Solicitud de Servicio derivada de un Servicio cambia de Estatus
Cuando dicho cambio no actualiza el Estatus propio del Servicio
Entonces la tarjeta correspondiente al nuevo Estatus del Ticket/Solicitud no muestra ese Servicio, ya que la tarjeta filtra únicamente por su Estatus propio.

**CA-8.1.8 — Columna Fecha de Registro**
Dado que el analista del CAU consulta el listado de cualquiera de las 4 tarjetas
Cuando visualiza los registros listados
Entonces cada registro muestra su Fecha de Registro.

**CA-8.1.9 — Orden por antigüedad**
Dado un listado con varios Servicios dentro de una misma tarjeta
Cuando se muestra el listado
Entonces los Servicios aparecen ordenados por Fecha de Registro ascendente, mostrando primero los más antiguos.

---

**Regla transversal:**
Este RF depende de que el Servicio sincronice su propio Estatus con las etapas "Requiere Autorización" y "En Autorización" de su ciclo de vida (RN-8.4); dicha sincronización, si no existe hoy en el sistema, es un prerrequisito de este RF y debe registrarse en bitácora conforme al mecanismo de RF-05.

---


---

# RF-09 — Adecuación del wizard de registro de Ticket o Solicitud de Servicio

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | Ninguna      |

## Objetivo

Que el wizard de registro en Monitor CAU exija, según el tipo de servicio elegido, seleccionar una persona responsable desde un listado de empleados: la Persona Asignada del Ticket, o la Persona que Recibirá el Equipo de Cómputo.

## Descripción

Al seleccionar, desde Monitor CAU, un Servicio en Estatus "Registrado", el sistema presenta un wizard donde el analista elige el tipo de servicio (Ticket o Equipo de Cómputo) y captura la información necesaria para generar el Ticket o la Solicitud de Servicio derivada. Hoy, la Persona Asignada del Ticket solo es obligatoria cuando el Ticket resultante es interno, y la persona que recibirá el equipo de cómputo se captura como texto libre, sin vínculo a un registro real de empleado. Este RF exige que ambos campos se seleccionen siempre desde un listado de empleados, y que la Persona Asignada del Ticket sea siempre obligatoria.

---

## US-9.1 — Selección de la Persona Asignada al registrar un Ticket

Como analista del CAU, quiero que el wizard me exija seleccionar la Persona Asignada del Ticket desde un listado acotado de empleados que atienden tickets, cuando el tipo de servicio elegido sea Ticket, para asegurar que todo Ticket quede, desde su registro, con un responsable válido de atenderlo.

### Reglas de negocio

**RN-9.1** Cuando el tipo de servicio seleccionado en el wizard sea Ticket, el wizard deberá mostrar un listado de empleados y requerir la selección de uno de ellos como Persona Asignada del Ticket.

**RN-9.2** El listado de empleados para este caso se limitará a empleados Activos cuyo departamento sea de aquellos que atienden tickets (por ejemplo: Soporte, Centro de Atención a Usuarios/CAU, Soporte de Aplicaciones o Tecnologías de la Información/TI); si el catálogo de departamentos que atienden tickets cambia, el listado deberá reflejar dicho catálogo sin requerir modificar esta regla.

**RN-9.3** La Persona Asignada del Ticket será obligatoria para completar el registro cuando el tipo de servicio sea Ticket, independientemente de si el Ticket resultante es interno o no.

**RN-9.4** El campo Persona Asignada capturado en el wizard es el mismo campo ya existente en el Ticket; este RF amplía su obligatoriedad, no crea un campo nuevo.

### Criterios de Aceptación

**CA-9.1.1 — Listado acotado para Ticket**
Dado que el analista del CAU selecciona el tipo de servicio Ticket en el wizard
Cuando el wizard presenta el listado de empleados para elegir la Persona Asignada
Entonces el listado solo incluye empleados Activos cuyo departamento sea uno de los que atienden tickets.

**CA-9.1.2 — Persona Asignada obligatoria**
Dado que el tipo de servicio seleccionado es Ticket
Cuando el analista del CAU intenta completar el wizard sin seleccionar una Persona Asignada
Entonces el sistema impide continuar e indica que el campo es obligatorio.

**CA-9.1.3 — Registro exitoso con Persona Asignada**
Dado que el tipo de servicio seleccionado es Ticket y se selecciona una Persona Asignada válida del listado
Cuando el analista del CAU completa el wizard
Entonces el Ticket se registra con esa Persona Asignada.

---

## US-9.2 — Selección de la Persona que Recibirá el Equipo de Cómputo

Como analista del CAU, quiero que el wizard me exija seleccionar, desde un listado de empleados, a la Persona que Recibirá el Equipo de Cómputo cuando el tipo de servicio elegido sea Equipo de Cómputo, para que dicha información quede vinculada a un registro real de empleado y no a texto libre capturado manualmente.

### Reglas de negocio

**RN-9.5** Cuando el tipo de servicio seleccionado en el wizard sea Equipo de Cómputo, el wizard deberá mostrar un listado de empleados y requerir la selección de uno de ellos como Persona que Recibirá el Equipo de Cómputo.

**RN-9.6** El listado de empleados para este caso incluirá a todos los empleados Activos, sin acotarse por área.

**RN-9.7** La captura de la Persona que Recibirá el Equipo de Cómputo, hoy registrada como texto libre (nombre y apellidos), deberá sustituirse por una referencia al registro de empleado seleccionado en el wizard.

**RN-9.8** La Persona que Recibirá el Equipo de Cómputo será obligatoria para completar el registro cuando el tipo de servicio sea Equipo de Cómputo.

### Criterios de Aceptación

**CA-9.2.1 — Listado sin acotar por área**
Dado que el analista del CAU selecciona el tipo de servicio Equipo de Cómputo en el wizard
Cuando el wizard presenta el listado de empleados para elegir la Persona que Recibirá el Equipo
Entonces el listado incluye a todos los empleados Activos, sin filtrarse por área.

**CA-9.2.2 — Persona que Recibe obligatoria**
Dado que el tipo de servicio seleccionado es Equipo de Cómputo
Cuando el analista del CAU intenta completar el wizard sin seleccionar una Persona que Recibirá el Equipo
Entonces el sistema impide continuar e indica que el campo es obligatorio.

**CA-9.2.3 — Registro con referencia a empleado**
Dado que el tipo de servicio seleccionado es Equipo de Cómputo y se selecciona una Persona que Recibirá el Equipo válida del listado
Cuando el analista del CAU completa el wizard
Entonces la Solicitud de Servicio de Equipo de Cómputo queda registrada con una referencia al empleado seleccionado, en lugar de un nombre capturado como texto libre.

---

**Regla transversal:**
Este RF requiere que la Solicitud de Servicio de Equipo de Cómputo sustituya su captura actual de la persona que recibe el equipo (texto libre) por una referencia a un registro de empleado; este cambio es prerrequisito de RN-9.7 y debe coordinarse con cualquier proceso o reporte que hoy consuma el nombre capturado como texto libre.

---


---

# RF-10 — Registro automático de autorización digital al generar Ticket o Solicitud de Servicio

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-05, RF-08 |

## Objetivo

Que, al generarse el Ticket o la Solicitud de Servicio desde el wizard de Monitor CAU, el sistema registre automáticamente su autorización digital sin confirmación manual, actualizando el Estatus del documento y el del Servicio relacionado, y dejando ambas transiciones registradas en bitácora.

## Descripción

Hoy, al generar un Ticket o una Solicitud de Servicio que requiere autorización digital, el sistema pregunta al analista del CAU si desea enviarla; solo al confirmar se registra la autorización y el documento pasa a Estatus "En Autorización". Este RF elimina dicha confirmación manual únicamente para el flujo derivado del wizard de Monitor CAU: la autorización digital se intenta de forma automática al generarse el documento. Aplica a todo Ticket cuyo tipo de servicio sea "Solicitud de Acceso" y a toda Solicitud de Servicio generada, sin importar su tipo. Además, sincroniza el Estatus del Servicio con el resultado de la autorización y mantiene trazabilidad recíproca entre ambas bitácoras.

---

## US-10.1 — Registro automático de la autorización digital al generar el documento

Como analista del CAU, quiero que al generarse el Ticket (Solicitud de Acceso) o la Solicitud de Servicio desde el wizard, el sistema intente registrar su autorización digital de forma automática, para no depender de una confirmación manual adicional en el flujo de registro.

### Reglas de negocio

**RN-10.1** Al generarse un Ticket cuyo tipo de servicio sea "Solicitud de Acceso", el sistema deberá intentar registrar su autorización digital de forma automática, sin solicitar confirmación al analista del CAU.

**RN-10.2** Al generarse cualquier Solicitud de Servicio, el sistema deberá intentar registrar su autorización digital de forma automática, sin solicitar confirmación al analista del CAU.

**RN-10.3** Un Ticket cuyo tipo de servicio no sea "Solicitud de Acceso" no queda sujeto al registro automático de autorización digital de este RF.

**RN-10.4** Si el registro automático de la autorización digital se completa exitosamente, el Ticket o la Solicitud de Servicio deberá quedar en Estatus "En Autorización".

**RN-10.5** Si el registro automático de la autorización digital no puede ejecutarse (por ejemplo, por una falla técnica del servicio de autorización, o porque el autorizador correspondiente no cumple una condición de negocio requerida para autorizar), el Ticket o la Solicitud de Servicio deberá quedar en Estatus "Requiere Autorización", habilitando que el analista del CAU la registre manualmente bajo demanda mediante la acción ya existente para solicitar autorización.

**RN-10.6** Toda transición del Ticket o la Solicitud de Servicio derivada de este RF (a "En Autorización" o a "Requiere Autorización") debe quedar registrada en su propia bitácora de estatus.

### Criterios de Aceptación

**CA-10.1.1 — Autorización automática exitosa en Ticket de Solicitud de Acceso**
Dado que el wizard genera un Ticket cuyo tipo de servicio es "Solicitud de Acceso"
Cuando el sistema registra su autorización digital automáticamente sin errores
Entonces el Ticket queda en Estatus "En Autorización" sin haberse solicitado confirmación al analista del CAU.

**CA-10.1.2 — Autorización automática exitosa en Solicitud de Servicio**
Dado que el wizard genera una Solicitud de Servicio de cualquier tipo
Cuando el sistema registra su autorización digital automáticamente sin errores
Entonces la Solicitud de Servicio queda en Estatus "En Autorización" sin haberse solicitado confirmación al analista del CAU.

**CA-10.1.3 — Falla en la autorización automática**
Dado que el registro automático de la autorización digital no puede completarse (falla técnica del servicio de autorización, o incumplimiento de una condición de negocio del autorizador)
Cuando ocurre dicha falla al generar el Ticket o la Solicitud de Servicio
Entonces el documento queda en Estatus "Requiere Autorización" y disponible para que el analista del CAU la registre manualmente bajo demanda.

**CA-10.1.4 — Ticket sin condición de Solicitud de Acceso**
Dado que el wizard genera un Ticket cuyo tipo de servicio no es "Solicitud de Acceso"
Cuando se completa el registro del Ticket
Entonces no se ejecuta el registro automático de autorización digital de este RF.

**CA-10.1.5 — Registro en la bitácora propia del documento**
Dado que el Ticket o la Solicitud de Servicio transiciona a "En Autorización" o a "Requiere Autorización" como resultado de este RF
Cuando dicha transición ocurre
Entonces se genera un registro en la bitácora de estatus propia del Ticket o de la Solicitud de Servicio.

---

## US-10.2 — Sincronización del Estatus y bitácora del Servicio

Como analista de negocio, quiero que el Estatus del Servicio refleje el resultado de la autorización digital de su Ticket o Solicitud de Servicio, y que dicho movimiento quede registrado tanto en la bitácora del Servicio como en la del documento relacionado, para mantener trazabilidad completa entre ambos registros.

### Reglas de negocio

**RN-10.7** Cuando el Ticket o la Solicitud de Servicio relacionados a un Servicio transicionen a "En Autorización" conforme a RN-10.4, el Estatus del Servicio relacionado deberá actualizarse a "En Autorización".

**RN-10.8** Cuando el Ticket o la Solicitud de Servicio relacionados a un Servicio transicionen a "Requiere Autorización" conforme a RN-10.5, el Estatus del Servicio relacionado deberá actualizarse a "Requiere Autorización".

**RN-10.9** Toda actualización del Estatus del Servicio derivada de RN-10.7 o RN-10.8 debe registrarse en su bitácora, conforme al mecanismo de RF-05.

**RN-10.10** Todo registro agregado a la bitácora del Servicio como resultado de RN-10.9 deberá reflejarse también en la bitácora de estatus del Ticket o de la Solicitud de Servicio relacionado, para mantener la trazabilidad entre ambos registros.

### Criterios de Aceptación

**CA-10.2.1 — Sincronización a En Autorización**
Dado que el Ticket o la Solicitud de Servicio de un Servicio transiciona a "En Autorización"
Cuando dicha transición ocurre
Entonces el Estatus del Servicio relacionado se actualiza a "En Autorización" y queda registrado en su bitácora.

**CA-10.2.2 — Sincronización a Requiere Autorización**
Dado que el Ticket o la Solicitud de Servicio de un Servicio transiciona a "Requiere Autorización"
Cuando dicha transición ocurre
Entonces el Estatus del Servicio relacionado se actualiza a "Requiere Autorización" y queda registrado en su bitácora.

**CA-10.2.3 — Trazabilidad recíproca**
Dado que se agrega un registro en la bitácora del Servicio por efecto de RN-10.9
Cuando se consulta la bitácora de estatus del Ticket o de la Solicitud de Servicio relacionado
Entonces dicho registro también aparece reflejado ahí.

---

**Regla transversal:**
Este RF depende de RF-08 (las tarjetas "Requiere Autorización" y "En Autorización" filtran por el Estatus propio del Servicio) y de RF-05 (mecanismo de bitácora relacionada con el catálogo de Estados). La trazabilidad recíproca de RN-10.10 aplica únicamente a los movimientos originados por este RF y no se generaliza a otras transiciones de la bitácora del Servicio.

---


---

# RF-11 — Cancelación del Servicio desde el wizard

| Campo          | Valor        |
|----------------|--------------|
| Prioridad      | Alta         |
| Estado         | Definición   |
| Dependencias   | RF-03, RF-05, RF-09 |

## Objetivo

Que el wizard de registro de Ticket o Solicitud de Servicio permita cancelar el Servicio en cualquiera de sus pasos, solicitando siempre un Motivo de Cancelación del catálogo administrado (RF-03).

## Descripción

Hoy el wizard no ofrece una acción para cancelar el Servicio durante su captura; si el analista decide no continuar, debe abandonarlo sin dejar constancia del motivo. Este RF agrega la acción Cancelar, disponible en cualquier paso del wizard, que exige seleccionar un Motivo de Cancelación (RF-03) antes de completarse, transiciona el Servicio a Estatus "Cancelado" y deja el movimiento registrado en su bitácora. Cuando el motivo seleccionado esté marcado como "Requiere Especificar" (por ejemplo, "Otro"), el wizard exige además capturar el detalle en un campo de texto libre.

---

## US-11.1 — Cancelación del Servicio desde cualquier paso del wizard

Como analista del CAU, quiero poder cancelar el Servicio desde cualquier paso del wizard, indicando siempre el Motivo de Cancelación, para dejar constancia de la causa por la que no se continuó con su registro.

### Reglas de negocio

**RN-11.1** La acción Cancelar estará disponible en todos los pasos del wizard de registro de Ticket o Solicitud de Servicio.

**RN-11.2** Al seleccionar Cancelar, el sistema exigirá elegir un Motivo de Cancelación del catálogo (RF-03) con Estado del Registro = Activo.

**RN-11.3** La cancelación no podrá completarse sin seleccionar un Motivo de Cancelación.

**RN-11.4** Al completarse la cancelación, el Estatus del Servicio cambia a "Cancelado".

**RN-11.5** Toda cancelación ejecutada desde el wizard debe registrarse en la bitácora del Servicio, relacionada con el Estado "Cancelado" del catálogo de Estados (RF-02), conforme al mecanismo de RF-05.

**RN-11.6** El Motivo de Cancelación seleccionado queda asociado al registro de bitácora generado por la cancelación.

**RN-11.7** Al cancelar el Servicio desde el wizard, no queda generado ningún Ticket ni Solicitud de Servicio a partir de dicho Servicio.

**RN-11.8** Cuando el Motivo de Cancelación seleccionado tenga el indicador "Requiere Especificar" = Sí (RF-03), el wizard deberá presentar un campo de texto adicional para capturar el detalle de la cancelación.

**RN-11.9** Dicho campo de texto será obligatorio cuando se muestre; la cancelación no podrá completarse sin capturarlo.

**RN-11.10** El texto capturado se almacena junto con el registro de bitácora generado por la cancelación (RN-11.5, RN-11.6).

**RN-11.11** Cuando el Motivo de Cancelación seleccionado no tenga el indicador "Requiere Especificar" activado, el campo de texto adicional no se presenta.

### Criterios de Aceptación

**CA-11.1.1 — Cancelar disponible en cualquier paso**
Dado que el analista se encuentra en cualquier paso del wizard de registro
Cuando revisa las acciones disponibles
Entonces la acción Cancelar está disponible.

**CA-11.1.2 — Motivo de Cancelación obligatorio**
Dado que el analista selecciona Cancelar en el wizard
Cuando intenta completar la cancelación sin seleccionar un Motivo de Cancelación
Entonces el sistema lo impide e indica que el campo es obligatorio.

**CA-11.1.3 — Cancelación exitosa**
Dado que el analista selecciona Cancelar y elige un Motivo de Cancelación Activo del catálogo
Cuando confirma la cancelación
Entonces el Servicio cambia a Estatus "Cancelado" y el movimiento queda registrado en su bitácora, relacionado con el Motivo de Cancelación seleccionado.

**CA-11.1.4 — Sin generación de Ticket o Solicitud de Servicio**
Dado que el Servicio se cancela desde el wizard
Cuando se revisa dicho Servicio
Entonces no existe ningún Ticket ni Solicitud de Servicio generado a partir de él.

**CA-11.1.5 — Motivo de Cancelación inválido**
Dado que el analista intenta seleccionar un Motivo de Cancelación con Estado del Registro = Cancelado
Cuando intenta completar la cancelación
Entonces el sistema lo impide e indica que debe seleccionar un Motivo de Cancelación Activo.

**CA-11.1.6 — Campo de texto visible para motivo que requiere especificar**
Dado que el analista selecciona un Motivo de Cancelación con indicador "Requiere Especificar" = Sí
Cuando el wizard presenta el formulario de cancelación
Entonces se muestra un campo de texto para capturar el detalle de la cancelación.

**CA-11.1.7 — Texto de detalle obligatorio**
Dado que el Motivo de Cancelación seleccionado requiere especificar detalle
Cuando el analista intenta completar la cancelación sin capturar el texto
Entonces el sistema lo impide e indica que el campo es obligatorio.

**CA-11.1.8 — Motivo sin requerir detalle**
Dado que el analista selecciona un Motivo de Cancelación con indicador "Requiere Especificar" = No
Cuando el wizard presenta el formulario de cancelación
Entonces no se muestra el campo de texto adicional.

---

**Regla transversal:**
Este RF depende del catálogo de Motivos de Cancelación (RF-03) para el motivo seleccionable, del catálogo de Estados (RF-02) para el Estado "Cancelado" que la transición utiliza, del mecanismo de bitácora (RF-05) para relacionar el registro generado con dicho Estado, y del wizard de registro (RF-09) sobre el cual se agrega esta acción.

---
