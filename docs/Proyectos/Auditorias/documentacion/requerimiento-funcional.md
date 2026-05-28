# Requerimientos Funcionales — Módulo de Auditorías

| Campo       | Valor                      |
|-------------|----------------------------|
| Versión     | 1.1                        |
| Fecha       | 2026-05-20                 |
| Estado      | Validación funcional       |
| Módulo      | Auditorías                 |

---

## 1. Propósito del documento

Registrar y versionar los requerimientos funcionales del módulo de Auditorías, organizados por requerimiento (RF). Cada RF incluye descripción, User Stories (US) y Criterios de Aceptación (CA).

---

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

---

## 3. Índice de requerimientos

| RF           | Título                                       | Estado                | Asignado | Fecha estimada |
|--------------|----------------------------------------------|-----------------------|----------|----------------|
| RF-01        | Esquema de colores por estatus               | Completado            | Jiri Karell | N/A |
| RF-02        | Gestión de fechas en Auditoría               | Completado            | Jiri Karell | N/A |
| RF-03        | Generación automática de Plan al crear Auditoría | Completado        | Jiri Karell | N/A |
| RF-04        | Reprogramación de Auditoría                  | Completado            | Jiri Karell | N/A |
| RF-05        | Sincronización de estatus Plan ↔ Auditoría  | Completado            | Jiri Karell | N/A |
| RF-06        | Calendario de planes en detalle de Auditoría | Completado            | Jiri Karell | N/A |
| RF-07        | Reporte Resumen de Auditoría por Criterio   | En Proceso           | Falcon | Por definir |
| RF-08        | Vista calendario multi-mes                  | Pendiente             | Por definir | Por definir |
| RF-09        | Hallazgos con ítems expandidos              | Completado            | Jiri Karell | N/A |
| RF-10        | Histórico de reprogramaciones en calendario  | Completado            | Jiri Karell | N/A |
| RF-11        | Notificación por correo electrónico con resumen de auditoría | Pendiente | Falcon | 30/06/2026     |
| RF-12        | Gestión del catálogo de Grupos de Criterios  | Completado            | Jiri Karell | N/A |
| RF-13        | Segmentación por departamento en catálogos, procesos y monitores | Completado | Jiri Karell | N/A |
| RF-14        | Flujo base de estados de Auditoría           | En Proceso            | Jiri Karell | 29/06/2026 |
| RF-15        | Ciclo PDCA — Seguimiento y cierre de hallazgos | En Proceso | Jiri Karell | 29/06/2026     |
| RF-16        | Bitácora de estados de Auditoría             | En Proceso  | Jiri Karell | 29/06/2026 |
| RF-17        | Monitor consolidado de Auditorías            | Validación funcional  | Por definir | 15/06/2026     |
| RF-18        | Monitor de Hallazgos/Acciones Correctivas              | Definición            | Por definir | 27/06/2026     |
| RF-19        | Finalización de hallazgos desde el monitor de acciones correctivas | Definición | Por definir | 04/07/2026 |
| RF-20        | Registro de seguimiento de acciones correctivas | Definición          | Por definir | 11/07/2026     |
| RF-21        | Catálogo de colores para porcentajes de resultados | Falcón               | Falcón | 02/06/2026 |
| RF-22        | Configuración de departamento del Auditado para gestión de hallazgos y acciones correctivas | Falcón               | Por definir | 02/06/2026     |
| RF-23        | Limitar grid de hallazgos y acciones correctivas | Falcón   | Por definir | 02/06/2026     |
| RF-24        | Reapertura de Acciones Correctivas           | Falcón      | Por definir | 03/06/2026     |
| RF-25        | Aplicación del catálogo de colores en resultados de Auditoría | Definición | Por definir | Por definir |
| RF-26        | Aplicación del catálogo de colores en monitores de Auditoría y Acciones Correctivas | Definición | Por definir | Por definir |
| RF-27        | Clasificación de Tipo de Auditoría como programada           | Definición            | Por definir | 04/06/2026     |
| RF-28        | Clasificación de Tipo de Hallazgo como alto impacto          | Definición            | Por definir | 04/06/2026 |
| RF-29        | Auditoría de validación del ciclo PDCA                       | Definición            | Por definir | Por definir |
| RF-30        | Configuración de días límite para registro de acciones correctivas | Definición       | Por definir | Por definir |

---

## 4. Trazabilidad con requerimientos del cliente

La siguiente tabla relaciona los requerimientos acordados con el cliente (numeración original RF16–RF27) con los RFs de este documento. La diferencia de numeración es intencional: el documento E2 expande cada requerimiento del cliente en uno o más RFs con mayor granularidad funcional.

| RF Cliente | Descripción (resumen) | RF E2 |
|------------|-----------------------|-------|
| RF16 | Gestión del catálogo de grupos y acceso desde menú | RF-12 |
| RF17 | Histórico de reprogramaciones en calendario | RF-10 |
| RF18 | Requerir fechas de planeación en creación de auditoría | RF-02 |
| RF19 | Limitar auditores disponibles por departamento | RF-13 |
| RF20 | Registro de auditorías para validación de ACs (ciclo PDCA) | RF-29 |
| RF21 | Correo automático con resumen y tiempo límite configurable de ACs | RF-11, RF-30 |
| RF22 | Reporte resumen de auditorías en sustitución del reporte actual | RF-07 |
| RF23 | Seguimiento de acciones correctivas asociadas a hallazgos | RF-15, RF-18 |
| RF24 | Limitar cierre de auditoría hasta hallazgos y ACs finalizados | RF-14, RF-15 |
| RF25 | Sistema móvil — firma del listado de hallazgos en finalización | Pendiente de definición |
| RF26 | Monitor consolidado: auditorías + hallazgos + ACs + estados | RF-17, RF-18 |
| RF27 | Monitor de ACs por auditoría, área y responsable | RF-18 |

---

---

# RF-01 — Esquema de colores por estatus

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Completado               |
| Aplica a       | Gestión de Auditorías, Gestión de Hallazgos, Gestión de Acciones Correctivas |

**Descripción:** El sistema debe mostrar un color distinto según el estatus del registro para facilitar la identificación visual del estado de auditorías, hallazgos y acciones correctivas sin necesidad de leer el texto completo.

---


## US-1.1

Como coordinador de auditorías, quiero que cada registro en el listado de auditorías muestre un color distinto según su estatus, para identificar visualmente el estado de cada auditoría sin necesidad de leer el texto.

**CA-1.1.1**
Dado que el usuario visualiza el listado de auditorías
Cuando el sistema aplica el color de estado
Entonces la fila o badge del registro refleja el estatus correspondiente.

**CA-1.1.2**
Dado que el usuario consulta diferentes vistas del módulo
Cuando aparece el estatus de auditoría
Entonces los colores son consistentes en todas las vistas donde aplica.

**CA-1.1.3**
Dado que un registro se encuentra en estatus Activo, En Ejecución o Finalizado
Cuando se muestra el color del registro
Entonces Activo es verde, En Ejecución es cyan y Finalizado es azul.

**CA-1.1.4**
Dado que un registro se encuentra en estatus Cancelado o Reprogramado
Cuando se muestra el color del registro
Entonces Cancelado es rojo y Reprogramado es naranja.

---


## US-1.2

Como auditor, quiero que los hallazgos en el listado muestren un color según su estatus, para priorizar cuáles requieren atención inmediata.

**CA-1.2.1**
Dado que el usuario visualiza el listado de hallazgos
Cuando el sistema aplica el esquema de colores
Entonces el color se asigna de forma consistente al estatus del hallazgo.

**CA-1.2.2**
Dado que un hallazgo se encuentra en estatus Activo
Cuando se muestra el registro
Entonces su color se distingue claramente del color de un hallazgo Finalizado.

**CA-1.2.3**
Dado que el usuario navega entre vistas del módulo
Cuando aparecen hallazgos
Entonces el esquema visual se mantiene homogéneo donde se presente.

---


## US-1.3

Como responsable de área, quiero que las acciones correctivas muestren un color según su estatus, para identificar rápidamente su estado operativo.

**CA-1.3.1**
Dado que el usuario visualiza acciones correctivas
Cuando el sistema muestra el registro
Entonces el color se asigna según su estatus.

**CA-1.3.2**
Dado que la acción correctiva aparece en listados, detalle o cualquier otra vista
Cuando se representa visualmente
Entonces el color se conserva de forma consistente.

**CA-1.3.3**
Dado que la acción correctiva se encuentra en estatus Activo, En Ejecución, Finalizado o Cancelado
Cuando se aplica el color
Entonces los colores se mantienen consistentes con la tabla de colores definida.

---

### Tabla de colores definidos en `ConstantsAuditorias`

| Estatus      | Color   | Hex       |
| ------------ | ------- | --------- |
| Activo       | Verde   | `#007D15` |
| En Ejecución | Cyan    | `#00838F` |
| Finalizado   | Azul    | `#0C6EFD` |
| Cancelado    | Rojo    | `#D32F2F` |
| Reprogramado | Naranja | `#F57C00` |

**Regla transversal:**
El esquema de colores aplica únicamente al estatus del registro. Cualquier regla de alerta por vencimiento, atraso o proximidad a vencer debe definirse en un requerimiento separado.

---

# RF-02 — Gestión de fechas en Auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Completado               |
| Dependencias   | Ninguna                  |

**Descripción:** El sistema debe permitir capturar únicamente las fechas programadas de inicio y fin durante la creación de la auditoría, y registrar automáticamente las fechas reales de inicio de ejecución y completado cuando se ejecuten las acciones correspondientes. Además, debe mostrar las fechas programadas en el listado para facilitar la planeación.

---


## US-2.1

Como coordinador de auditorías, quiero que el formulario de creación solicite únicamente la fecha programada de inicio y fin, para no confundir las fechas de planificación con las de ejecución real.

**CA-2.1.1**  
Dado que el usuario crea una auditoría  
Cuando visualiza el formulario  
Entonces los campos `FechaInicio` y `FechaFin` no son visibles.

**CA-2.1.2**  
Dado que el usuario visualiza el formulario de creación  
Cuando revisa los campos de fecha  
Entonces `FechaProgramadaInicio` y `FechaProgramadaFin` son visibles y obligatorios.

**CA-2.1.3**  
Dado que el usuario captura las fechas programadas  
Cuando `FechaProgramadaInicio` es mayor que `FechaProgramadaFin`  
Entonces el sistema muestra un mensaje de validación y no permite guardar.

---


## US-2.2

Como coordinador de auditorías, quiero que las fechas reales se registren automáticamente por el sistema al abrir y completar la auditoría para evitar capturas manuales y errores.

**CA-2.2.1**  
Dado que el usuario ejecuta la acción Abrir Auditoría  
Cuando el sistema registra la apertura  
Entonces FechaInicio se asigna automáticamente con la fecha y hora actual.

**CA-2.2.2**
Dado que el usuario ejecuta la acción Completar Auditoría
Cuando el sistema aplica la transición desde En Ejecución
Entonces el sistema asigna estatus Completado a la auditoría.

**CA-2.2.3**  
Dado que el usuario consulta la interfaz  
Cuando visualiza las fechas reales  
Entonces `FechaInicio` y `FechaFin` no son editables manualmente.

---


## US-2.3

Como auditor, quiero ver en el listado las fechas programadas de inicio y fin, para planificar mi agenda.

**CA-2.3.1**  
Dado que el usuario visualiza el listado de auditorías  
Cuando se muestran las columnas disponibles  
Entonces `FechaProgramadaInicio` y `FechaProgramadaFin` son visibles.

**CA-2.3.2**  
Dado que el usuario interactúa con las columnas de fechas programadas  
Cuando hace clic en el encabezado  
Entonces puede ordenar el listado por `FechaProgramadaInicio` o `FechaProgramadaFin`.

**CA-2.3.3**
Dado que el usuario visualiza el listado de auditorías
Cuando se muestran las columnas disponibles
Entonces `FechaProgramadaInicio` y `FechaProgramadaFin` son visibles como columnas opcionales.

---

**Regla transversal:**
Las fechas programadas se usan para planeación y visualización operativa. Las fechas reales (`FechaInicio` , `FechaFin`) se registran únicamente por acción del sistema al ejecutar la transición de estatus correspondiente y no deben capturarse manualmente.

---

# RF-03 — Generación automática de Plan al crear Auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Completado               |
| Dependencias   | RF-02                    |

**Descripción:** El sistema debe generar automáticamente un PlanAuditoria al crear una nueva auditoría, utilizando las fechas programadas registradas en la auditoría, para evitar su captura manual y garantizar que toda auditoría cuente con al menos un plan inicial.

---


## US-3.1

Como coordinador de auditorías, quiero que al guardar una nueva auditoría se genere automáticamente un plan de auditoría con las fechas programadas, para no crearlo manualmente y garantizar que toda auditoría tenga al menos un plan desde el inicio.

**CA-3.1.1**  
Dado que el usuario guarda una auditoría nueva con estatus Activo  
Cuando el sistema registra la auditoría  
Entonces se crea automáticamente un PlanAuditoria asociado.

**CA-3.1.2**  
Dado que el sistema genera el plan automáticamente  
Cuando asigna el nombre del plan  
Entonces el nombre tiene el formato "{Objetivo} - {FechaProgramadaInicio:dd/MM/yyyy}".

**CA-3.1.3**  
Dado que el sistema genera el plan automáticamente  
Cuando asigna las fechas del plan  
Entonces FechaInicio toma el valor de FechaProgramadaInicio y FechaFin toma el valor de FechaProgramadaFin de la auditoría.

**CA-3.1.4**  
Dado que el sistema genera el plan automáticamente  
Cuando define los atributos del plan  
Entonces EsReprogramado es false y el estatus del plan es Activo.

**CA-3.1.5**  
Dado que la operación de guardado falla  
Cuando se interrumpe el registro de la auditoría  
Entonces no se crea el plan y la operación se revierte por completo.

---


## US-3.2

Como coordinador de auditorías, quiero que el plan generado aparezca en el calendario de planes, para tener visibilidad inmediata en la línea de tiempo.

**CA-3.2.1**  
Dado que se generó el plan automáticamente  
Cuando el usuario abre el calendario de planes  
Entonces el PlanAuditoria es visible sin ninguna acción adicional.

**CA-3.2.2**  
Dado que el plan está visible en el calendario  
Cuando se revisa su ubicación temporal  
Entonces aparece en la fecha correcta según FechaProgramadaInicio y FechaProgramadaFin.

---


## US-3.3

Como sistema, debo generar solo un plan en la creación inicial; los planes adicionales solo se crean vía Reprogramación.

**CA-3.3.1**  
Dado que una auditoría ya fue creada  
Cuando el usuario la edita  
Entonces no se genera un nuevo plan automáticamente.

**CA-3.3.2**  
Dado que existe una reprogramación posterior  
Cuando se crea un plan adicional  
Entonces el sistema solo lo permite mediante el flujo de Reprogramación.

---

**Especificación funcional del plan auto-generado**

| Campo | Valor |
|---|---|
| Nombre | "{Objetivo} - {FechaProgramadaInicio:dd/MM/yyyy}" |
| Descripcion | Auditorias.Objetivo |
| FechaInicio | Auditorias.FechaProgramadaInicio |
| FechaFin | Auditorias.FechaProgramadaFin |
| Auditoria | FK a la auditoría recién creada |
| EsReprogramado | false |
| MotivoReprogramada | null |
| Estatus | Activo |

**Regla transversal:**  
El plan inicial de la auditoría se genera una sola vez al momento de crear el registro. Cualquier plan posterior debe originarse únicamente por el proceso de reprogramación.

---

# RF-04 — Reprogramación de Auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Completado               |
| Dependencias   | RF-02, RF-03             |

**Descripción:** El sistema debe permitir reprogramar una auditoría existente desde la gestión de auditorías o desde el listado de planes, solicitando obligatoriamente un motivo y generando un nuevo plan con las fechas actualizadas. El plan anterior debe quedar cancelado y la auditoría debe conservar trazabilidad del cambio.

---


## US-4.1

Como coordinador de auditorías, quiero poder reprogramar desde la gestión de auditorías o desde el listado de planes, para tener flexibilidad en el punto de acceso.

**CA-4.1.1**  
Dado que el usuario visualiza la lista de Auditorías  
Cuando la auditoría tiene estatus Activo  
Entonces la acción Reprogramar está disponible.

**CA-4.1.2**  
Dado que el usuario visualiza la lista de PlanAuditoria  
Cuando el plan tiene estatus Activo o Reprogramado  
Entonces la acción Reprogramar está disponible.

**CA-4.1.3**  
Dado que la auditoría o el plan tiene estatus Finalizado o Cancelado  
Cuando se visualiza la lista  
Entonces la acción Reprogramar no está disponible.

---


## US-4.2

Como coordinador de auditorías, al reprogramar quiero que el sistema solicite obligatoriamente un motivo, para mantener trazabilidad de los cambios de fecha.

**CA-4.2.1**  
Dado que el usuario abre el diálogo de reprogramación  
Cuando el sistema muestra los campos disponibles  
Entonces se presentan FechaProgramadaInicio, FechaProgramadaFin y Motivo.

**CA-4.2.2**  
Dado que el campo Motivo está vacío  
Cuando el usuario intenta confirmar la reprogramación  
Entonces el sistema no permite continuar.

**CA-4.2.3**  
Dado que el usuario captura un motivo  
Cuando el texto supera 500 caracteres  
Entonces el sistema muestra validación y no permite guardar.

**CA-4.2.4**  
Dado que el usuario captura las nuevas fechas programadas  
Cuando FechaProgramadaInicio es mayor que FechaProgramadaFin  
Entonces el sistema muestra validación y no permite confirmar.

---


## US-4.3

Como coordinador de auditorías, quiero que al reprogramar se cancele el plan vigente y se genere uno nuevo con las nuevas fechas y el motivo registrado.

**CA-4.3.1**  
Dado que el usuario confirma una reprogramación válida  
Cuando el sistema procesa la acción  
Entonces el PlanAuditoria vigente cambia a estatus Cancelado.

**CA-4.3.2**  
Dado que la reprogramación se ejecuta correctamente  
Cuando el sistema genera el nuevo plan  
Entonces se crea un PlanAuditoria con EsReprogramado en true, MotivoReprogramada con el valor capturado y estatus Reprogramado.

**CA-4.3.3**  
Dado que la reprogramación fue confirmada  
Cuando se registran los nuevos valores  
Entonces las fechas programadas de la auditoría se actualizan con las nuevas fechas.

**CA-4.3.4**  
Dado que el nuevo plan fue creado  
Cuando el usuario consulta el calendario  
Entonces el nuevo plan es visible sin acciones adicionales.

**CA-4.3.5**  
Dado que ocurre un error durante la operación  
Cuando falla cualquiera de los pasos del proceso  
Entonces no se aplica ningún cambio y la operación se revierte por completo.

---


## US-4.4

Como auditor, quiero que el plan de auditoría cambie visualmente a estatus Reprogramado cuando se haya reprogramado, para identificar claramente el cambio realizado.

**CA-4.4.1**  
Dado que una reprogramación fue exitosa  
Cuando el sistema actualiza el plan nuevo  
Entonces el estatus del plan es Reprogramado.

**CA-4.4.2**  
Dado que el plan tiene estatus Reprogramado  
Cuando se visualiza en cualquier listado o calendario  
Entonces se aplica el color definido para Reprogramado de forma consistente.

---

**Regla transversal:**  
La reprogramación siempre genera un nuevo plan y conserva la trazabilidad del motivo. El plan anterior no se modifica; únicamente cambia a Cancelado. El color del estatus Reprogramado se rige por la regla visual definida en RF-01.

---

# RF-05 — Sincronización de estatus Plan ↔ Auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Completado               |
| Dependencias   | RF-03, RF-04             |

**Descripción:** El sistema debe sincronizar automáticamente el estatus de los planes de auditoría con el estatus final de la auditoría, para asegurar consistencia entre el calendario de planes y el estado real del proceso.

---


## US-5.1

Como sistema, cuando una auditoría se finaliza, debo cambiar automáticamente el estatus del plan activo a Finalizado, para que el calendario refleje el cierre real.

**CA-5.1.1**  
Dado que el usuario ejecuta la acción Finalizar Auditoría  
Cuando el sistema procesa el cierre  
Entonces todos los PlanAuditoria asociados con estatus Activo o Reprogramado cambian a estatus Finalizado.

**CA-5.1.2**  
Dado que se finaliza la auditoría  
Cuando el sistema actualiza el plan asociado  
Entonces el cambio de estatus queda registrado con la misma fecha de finalización de la auditoría.

**CA-5.1.3**  
Dado que el plan fue actualizado  
Cuando el usuario visualiza el calendario de planes  
Entonces el nuevo estatus se refleja de forma inmediata.

---


## US-5.2

Como sistema, cuando una auditoría se cancela, debo cambiar automáticamente el estatus del plan activo a Cancelado, para evitar planes huérfanos activos en el calendario.

**CA-5.2.1**  
Dado que el usuario ejecuta la acción Cancelar Auditoría  
Cuando el sistema procesa la cancelación  
Entonces todos los PlanAuditoria asociados con estatus Activo cambian a estatus Cancelado.

**CA-5.2.2**  
Dado que la auditoría fue cancelada  
Cuando se revisa su historial de planes  
Entonces no quedan planes en estatus Activo asociados a esa auditoría.

**CA-5.2.3**  
Dado que la auditoría quedó cancelada  
Cuando el usuario visualiza el calendario  
Entonces el plan asociado muestra el estatus Cancelado de forma consistente.

---

**Regla transversal:**  
La sincronización de estatus solo aplica a planes asociados a una auditoría cuyo estado final cambie a Finalizado o Cancelado. La creación de planes sigue siendo responsabilidad de RF-03 y la reprogramación de RF-04.

---

# RF-06 — Calendario de planes en detalle de Auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-03, RF-04, RF-05      |

**Descripción:** El sistema debe mostrar, dentro del detalle de cada auditoría, un calendario de planes que permita visualizar cronológicamente el plan inicial y los planes generados por reprogramación, incluyendo estatus, fechas y motivo de reprogramación cuando aplique, para asegurar trazabilidad operativa y consulta rápida del historial de planeación.

---


## US-6.1

Como coordinador de auditorías, quiero visualizar en el detalle de la auditoría el calendario completo de planes asociados, para entender la secuencia de planeación y cambios realizados.

**CA-6.1.1**  
Dado que el usuario abre el detalle de una auditoría  
Cuando existe al menos un PlanAuditoria asociado  
Entonces se muestra una sección de calendario de planes dentro del detalle.

**CA-6.1.2**  
Dado que la auditoría tiene múltiples planes asociados  
Cuando se visualiza el calendario  
Entonces los planes se presentan en orden cronológico por FechaInicio.

**CA-6.1.3**  
Dado que la auditoría no tiene planes asociados  
Cuando el usuario visualiza el detalle  
Entonces el sistema muestra un estado vacío controlado indicando que no hay planes registrados.

---


## US-6.2

Como auditor, quiero ver los datos clave de cada plan en el calendario, para identificar rápidamente vigencia, cambios y contexto de cada planeación.

**CA-6.2.1**  
Dado que un plan se muestra en el calendario  
Cuando se renderiza el evento o registro del plan  
Entonces se visualizan como mínimo: Nombre del plan, FechaInicio, FechaFin y Estatus.

**CA-6.2.2**  
Dado que el plan fue generado por reprogramación  
Cuando se visualiza su detalle  
Entonces EsReprogramado se identifica como verdadero y se muestra MotivoReprogramada.

**CA-6.2.3**  
Dado que el plan corresponde al plan inicial  
Cuando se visualiza su detalle  
Entonces se identifica como plan base y no muestra motivo de reprogramación.

---


## US-6.3

Como coordinador de auditorías, quiero que el calendario refleje de forma consistente los cambios de estatus de los planes, para mantener alineación con el estado real de la auditoría.

**CA-6.3.1**  
Dado que un plan cambia de estatus por flujo de negocio  
Cuando el usuario consulta el calendario  
Entonces el estatus mostrado coincide con el estatus actual del PlanAuditoria.

**CA-6.3.2**  
Dado que la auditoría fue finalizada  
Cuando se actualizan planes asociados  
Entonces el calendario muestra los planes aplicables en estatus Finalizado conforme a las reglas de sincronización.

**CA-6.3.3**  
Dado que la auditoría fue cancelada  
Cuando se actualizan planes asociados  
Entonces el calendario muestra los planes aplicables en estatus Cancelado conforme a las reglas de sincronización.

---


## US-6.4

Como usuario del módulo, quiero distinguir visualmente el estatus de cada plan en el calendario, para facilitar la lectura operativa del historial.

**CA-6.4.1**  
Dado que el calendario muestra planes con distintos estatus  
Cuando se aplica representación visual  
Entonces cada estatus usa el esquema de color definido para auditorías y planes.

**CA-6.4.2**  
Dado que el usuario consulta el calendario en distintas vistas del módulo  
Cuando se muestran planes de auditoría  
Entonces los colores y etiquetas de estatus se mantienen consistentes.

---

**Regla transversal:**  
El calendario del detalle de auditoría es una vista de consulta y trazabilidad. La creación del plan inicial se rige por RF-03, la creación de planes por reprogramación por RF-04 y la sincronización de estatus por RF-05.

---

# RF-07 — Reporte Resumen de Auditoría por Criterio

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-12, RF-17             |

**Descripción:** El sistema debe generar un reporte de una auditoría específica que sustituya el reporte actual, mostrando datos generales de la auditoría y el detalle por criterio evaluado, incluyendo hallazgos detectados y la calificación obtenida por criterio.

---


## US-7.1

Como auditor o coordinador, quiero consultar un reporte de una auditoría específica para visualizar su resultado por criterio y tomar decisiones de seguimiento.

**CA-7.1.1**  
Dado que el usuario selecciona una auditoría  
Cuando genera el reporte  
Entonces el reporte corresponde únicamente a esa auditoría.

**CA-7.1.2**  
Dado que el reporte se genera  
Cuando se muestra la cabecera  
Entonces incluye datos generales: Folio, Fecha, Proceso, Responsable, Auditor, Área auditada y Estatus.

---


## US-7.2

Como auditor, quiero ver el resumen de resultados por criterio evaluado para identificar cumplimiento y desviaciones.

**CA-7.2.1**  
Dado que la auditoría tiene criterios evaluados  
Cuando se muestra la sección de resultados  
Entonces se presenta una fila por criterio evaluado.

**CA-7.2.2**  
Dado que se visualiza cada criterio  
Cuando se muestra su información  
Entonces incluye: Nombre del criterio, Calificación del criterio, Hallazgos detectados (conteo) y Observaciones relevantes.

**CA-7.2.3**  
Dado que un criterio no tiene hallazgos  
Cuando se muestra el reporte  
Entonces el conteo de hallazgos detectados se muestra en cero.

---


## US-7.3

Como coordinador, quiero visualizar un consolidado de hallazgos para dimensionar el resultado general de la auditoría.

**CA-7.3.1**  
Dado que el reporte se genera  
Cuando se muestra el resumen ejecutivo  
Entonces incluye Total de criterios evaluados y Total de hallazgos detectados de la auditoría.

**CA-7.3.2**  
Dado que existen hallazgos registrados  
Cuando se calcula el total  
Entonces el valor corresponde a la suma de hallazgos detectados en todos los criterios evaluados.

---

## Estructura funcional sugerida del reporte

1. Encabezado: Folio de auditoría, Fecha, Proceso, Responsable, Auditor, Área auditada y Estatus.
2. Resumen ejecutivo: Total de criterios evaluados, Total de hallazgos detectados y Calificación global (si aplica en negocio).
3. Tabla de detalle por criterio: Criterio, Calificación del criterio, Hallazgos detectados (número), Descripción corta de hallazgos y Estado del criterio (opcional, si existe en modelo).

---

**Regla transversal:**  
El reporte debe mostrar exclusivamente información de una auditoría por vez y mantener consistencia entre el total de hallazgos del resumen y la suma de hallazgos del detalle por criterio.

---

# RF-08 — Vista calendario multi-mes

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-06                    |

**Descripción:** El sistema debe permitir visualizar el calendario de planes en vistas de 2 y 3 meses simultáneos para facilitar la planeación y comparación de auditorías sin cambiar de vista constantemente.

---


## US-8.1

Como coordinador de auditorías, quiero poder cambiar entre vista de 1, 2 y 3 meses en el calendario de planes, para analizar la carga de auditorías en distintos horizontes de tiempo.

**CA-8.1.1**  
Dado que el usuario visualiza el calendario de planes  
Cuando consulta los controles de vista  
Entonces el sistema muestra las opciones 1 mes, 2 meses y 3 meses.

**CA-8.1.2**  
Dado que el usuario selecciona 2 meses o 3 meses  
Cuando se aplica la vista  
Entonces el calendario muestra de forma continua el rango de meses seleccionado.

**CA-8.1.3**  
Dado que el usuario cambia de una vista a otra  
Cuando se renderiza el calendario  
Entonces se conserva el periodo base de navegación seleccionado.

---


## US-8.2

Como coordinador de auditorías, quiero que los planes se representen correctamente en vista multi-mes, para validar fechas y traslapes sin errores visuales.

**CA-8.2.1**  
Dado que existen planes con FechaInicio y FechaFin  
Cuando se visualizan en vista de 2 o 3 meses  
Entonces cada plan se muestra una sola vez y en su posición temporal correcta.

**CA-8.2.2**  
Dado que un plan inicia en un mes y termina en otro  
Cuando se muestra en vista multi-mes  
Entonces el plan se representa de forma continua entre ambos meses.

**CA-8.2.3**  
Dado que no existen planes en el periodo visible  
Cuando el usuario consulta la vista multi-mes  
Entonces el sistema muestra estado vacío controlado.

---


## US-8.3

Como coordinador de auditorías, quiero navegar entre periodos en vista multi-mes, para revisar ventanas futuras y pasadas sin perder el modo de visualización.

**CA-8.3.1**  
Dado que el usuario está en vista de 2 meses  
Cuando navega al periodo siguiente o anterior  
Entonces el calendario avanza o retrocede en bloques de 2 meses.

**CA-8.3.2**  
Dado que el usuario está en vista de 3 meses  
Cuando navega al periodo siguiente o anterior  
Entonces el calendario avanza o retrocede en bloques de 3 meses.

**CA-8.3.3**  
Dado que el usuario navega entre periodos  
Cuando se refresca la vista  
Entonces se mantiene el modo de visualización activo (2 o 3 meses).

---

**Regla transversal:**  
La vista multi-mes es una capacidad de visualización del calendario de planes y no modifica la lógica de creación, reprogramación ni sincronización de estatus definida en RF-03, RF-04 y RF-05.

---

# RF-09 — Hallazgos con ítems expandidos

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-07                    |

**Descripción:** El sistema debe mostrar los hallazgos expandidos por defecto en la vista de ejecución de la auditoría, para que el usuario visualice de inmediato el detalle de cada hallazgo sin necesidad de abrir manualmente cada tarjeta. El comportamiento debe aplicar a la vista actual de hallazgos, donde hoy los ítems se presentan colapsados.

---


## US-9.1

Como auditor, quiero que los hallazgos se muestren expandidos por defecto en la vista de ejecución de la auditoría, para revisar de inmediato su detalle sin hacer clic adicional en cada hallazgo.

**CA-9.1.1**  
Dado que el usuario abre la vista de ejecución de la auditoría  
Cuando se cargan los hallazgos  
Entonces todos los ítems visibles se muestran expandidos por defecto.

**CA-9.1.2**  
Dado que un hallazgo se muestra expandido por defecto  
Cuando el usuario lo colapsa manualmente  
Entonces el sistema permite colapsarlo sin afectar a los demás hallazgos.

**CA-9.1.3**  
Dado que un hallazgo fue colapsado manualmente  
Cuando el usuario decide expandirlo nuevamente  
Entonces el sistema permite expandirlo de forma individual.

**CA-9.1.4**  
Dado que la vista contiene más de 20 hallazgos  
Cuando el sistema carga los ítems expandidos  
Entonces el comportamiento visual se mantiene consistente sin degradar de forma perceptible la experiencia de carga.

---


## US-9.2

Como auditor, quiero que el estado expandido por defecto no altere la consistencia visual de la vista, para mantener una experiencia clara y predecible.

**CA-9.2.1**  
Dado que la vista de hallazgos se carga con ítems expandidos  
Cuando el usuario recorre la lista  
Entonces cada hallazgo conserva su jerarquía visual y su detalle se presenta de forma legible.

**CA-9.2.2**  
Dado que un hallazgo contiene información anidada  
Cuando se muestra expandido  
Entonces el detalle interno se presenta completo en el primer nivel visible.

**CA-9.2.3**  
Dado que el usuario interactúa con la vista  
Cuando cambia entre hallazgos expandido y colapsado  
Entonces el sistema conserva el comportamiento esperado de expansión individual.

---

**Regla transversal:**  
El estado expandido por defecto aplica únicamente a la vista de ejecución de hallazgos. El comportamiento no debe alterar la información registrada, solo su forma de presentación inicial.

---

# RF-10 — Histórico de reprogramaciones en calendario

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Completado               |
| Dependencias   | RF-04, RF-06             |

**Descripción:** El sistema debe permitir la visualización del histórico de reprogramaciones de auditorías dentro del calendario de planeación y en el listado de PlanAuditoria. Cada auditoría se representa como un único evento en el calendario; si ha sido reprogramada, muestra un indicador visual de color naranja y expone el historial completo de planes —incluyendo cancelados— al hacer clic, con fecha, estatus y motivo de cada reprogramación.

---

### US-10.1 — Indicador visual de reprogramación en el calendario

Como coordinador de auditorías
Quiero que los eventos del calendario muestren un indicador cuando la auditoría ha sido reprogramada
Para identificar de un vistazo qué auditorías han tenido cambios de fecha.

**CA-10.1.1**
Dado que una auditoría tiene al menos un PlanAuditoria con `EsReprogramado = true`
Cuando el evento se renderiza en el calendario de planeación
Entonces el registro se muestra de color naranja para indicar que la auditoría ha sido reprogramada.

**CA-10.1.2**
Dado que una auditoría no tiene planes reprogramados
Cuando el evento se renderiza en el calendario
Entonces el registro se muestra de color verde para indicar que la auditoría no ha sido reprogramada.

**CA-10.1.3**
Dado que la auditoría tiene múltiples reprogramaciones
Cuando el evento se renderiza en el calendario
Entonces se muestra un único evento (no uno por plan) con el indicador naranja de reprogramación.

**CA-10.1.4**
Dado que el indicador naranja es visible en el calendario
Cuando el usuario consulta distintas vistas del calendario (mensual, semanal, multi-mes)
Entonces el indicador naranja se mantiene consistente en todas las vistas.

---

### US-10.2 — Motivo de reprogramación en el popup del evento del calendario

Como coordinador de auditorías
Quiero que el popup del evento del calendario muestre el motivo de reprogramación cuando la auditoría ha sido reprogramada
Para conocer la razón del cambio de fechas sin salir del calendario.

**CA-10.2.1**
Dado que el usuario hace clic sobre un evento del calendario
Cuando el popup se despliega
Entonces se muestra el nombre de la auditoría y las nuevas fechas planeadas (FechaProgramadaInicio y FechaProgramadaFin).

**CA-10.2.2**
Dado que la auditoría tiene al menos un PlanAuditoria con `EsReprogramado = true`
Cuando el popup se despliega
Entonces se muestra el campo MotivoReprogramada con el motivo del último cambio de fechas.

**CA-10.2.3**
Dado que la auditoría no ha sido reprogramada
Cuando el popup se despliega
Entonces el campo MotivoReprogramada no se muestra.

---

### US-10.3 — Histórico de reprogramaciones en el listado de PlanAuditoria

Como coordinador de auditorías
Quiero que el listado de PlanAuditoria muestre todos los planes de una auditoría incluyendo los cancelados
Para tener trazabilidad completa de las reprogramaciones desde esa vista.

**CA-10.3.1**
Dado que el usuario consulta el listado de PlanAuditoria
Cuando la auditoría asociada tiene planes cancelados por reprogramación
Entonces los planes con estatus Cancelado son visibles en el listado.

**CA-10.3.2**
Dado que el usuario visualiza un plan en el listado
Cuando el plan tiene `EsReprogramado = true`
Entonces se muestra el campo MotivoReprogramada en la vista.

**CA-10.3.3**
Dado que el usuario visualiza un plan con estatus Cancelado
Cuando se aplica representación visual
Entonces se aplica el color de estatus Cancelado conforme al esquema definido en RF-01.

---

**Regla transversal:**
RF-10 es exclusivamente una vista de consulta y trazabilidad. La lógica de creación de planes y registro del motivo se rige por RF-04. La representación visual del evento único en el calendario es extensión del comportamiento definido en RF-06.

---

# RF-11 — Notificación por correo electrónico con resumen de auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-05, RF-07, RF-30      |

**Descripción:** El sistema debe enviar por correo electrónico un resumen de la auditoría al Auditado y al Auditor en dos momentos: automáticamente cuando la auditoría cambie al estado Completado y manualmente cuando el Auditor ejecute la acción Correo después de ese estado. El estado Completado no representa el cierre de la auditoría, sino un estado operativo a partir del cual puede realizarse el envío manual. Si el Auditado o el Auditor no tienen correo registrado en el sistema, no se debe enviar el correo y el sistema debe notificar al usuario. El contenido del correo debe incluir datos generales de la auditoría, resumen de hallazgos, recordatorio para el registro de acciones correctivas (PDCA) e incorporar una nota con el tiempo límite para el registro de dichas acciones, el cual será configurable porque no todas las auditorías aplican con esta regla.

---


## US-11.1

Como auditor, quiero que al pasar una auditoría al estado Completado se envíe automáticamente un correo con el resumen, para notificar al Auditado y dejar constancia del avance del proceso.

**CA-11.1.1**  
Dado que una auditoría cambia al estado Completado  
Cuando el sistema procesa el cambio de estado  
Entonces se envía automáticamente el resumen de auditoría por correo.

**CA-11.1.2**  
Dado que el sistema envía el resumen automáticamente  
Cuando prepara el envío  
Entonces el correo se dirige al Auditado y al Auditor.

**CA-11.1.3**  
Dado que el Auditado o el Auditor no tienen correo registrado  
Cuando el sistema intenta enviar el resumen automático  
Entonces no se realiza el envío y se notifica al usuario.

**CA-11.1.4**  
Dado que el envío automático se realiza correctamente  
Cuando el sistema completa la operación  
Entonces el usuario recibe confirmación del envío.

---


## US-11.2

Como auditor, quiero poder ejecutar manualmente la acción Correo después de que la auditoría esté en estado Completado o posterior, para reenviar el resumen cuando lo considere necesario.

**CA-11.2.1**  
Dado que una auditoría se encuentra en estado Completado o posterior a ese estado  
Cuando el Auditor visualiza la opción disponible  
Entonces se muestra la acción Correo.

**CA-11.2.2**  
Dado que el Auditor ejecuta la acción Correo  
Cuando el sistema procesa la solicitud  
Entonces se genera y envía el resumen de auditoría por correo.

**CA-11.2.3**  
Dado que el envío manual se ejecuta  
Cuando el sistema prepara el correo  
Entonces el destinatario incluye al Auditado y al Auditor.

**CA-11.2.4**  
Dado que el Auditado o el Auditor no tienen correo registrado  
Cuando el Auditor intenta ejecutar la acción Correo  
Entonces el sistema evita el envío y notifica al usuario.

---


## US-11.3

Como usuario del sistema, quiero que el contenido del correo sea consistente con el resumen de la auditoría, para asegurar trazabilidad y comprensión del mensaje.

**CA-11.3.1**  
Dado que el sistema genera el correo  
Cuando arma el contenido  
Entonces incluye datos generales de la auditoría, resumen de hallazgos y el recordatorio para el registro de acciones correctivas (PDCA).

**CA-11.3.2**  
Dado que el sistema genera el correo  
Cuando construye el mensaje  
Entonces incluye una nota con el tiempo límite para registrar las acciones correctivas, siempre que esa regla aplique para la auditoría.

**CA-11.3.3**  
Dado que la auditoría no tiene tiempo límite configurado para PDCA  
Cuando se genera el correo  
Entonces la nota de límite no se muestra.

**CA-11.3.4**  
Dado que el correo no puede enviarse por falta de correo del Auditado o del Auditor  
Cuando se informa al usuario  
Entonces el mensaje indica que falta registrar correo en el sistema.

---

**Regla transversal:**  
El envío del resumen aplica únicamente al Auditado y al Auditor. La acción del usuario será Correo. Si el Auditado o el Auditor no tienen correo registrado en el sistema, el envío debe bloquearse y mostrarse el siguiente mensaje:

No se pudo enviar el resumen de auditoría porque el Auditado o el Auditor no tienen un correo registrado. Actualízalo e inténtalo nuevamente.

---

# RF-12 — Gestión del catálogo de Grupos de Criterios

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Validación funcional     |
| Dependencias   | Ninguna                  |

**Descripción:** El sistema debe permitir la gestión del catálogo de Grupos de Criterios y habilitar su acceso desde el menú de navegación únicamente para usuarios con rol Auditor. Este catálogo es dato maestro prerrequisito para la ejecución de auditorías y el tablero ejecutivo.

---

## US-12.1 — Acceso al catálogo desde el menú de navegación

Como Auditor
Quiero acceder al catálogo de Grupos de Criterios desde el menú de navegación
Para consultar y administrar los grupos disponibles.

**CA-12.1.1**
Dado que el usuario tiene el rol de Auditor
Cuando abre el menú de navegación en Catálogos / Auditorías
Entonces visualiza la opción Grupos de Criterios.

**CA-12.1.2**
Dado que el usuario no tiene el rol de Auditor
Cuando abre el menú de navegación
Entonces no visualiza la opción Grupos de Criterios.

---

## US-12.2 — Gestión del ciclo de vida del catálogo

Como Auditor
Quiero gestionar el catálogo de Grupos de Criterios (consulta, alta, edición, baja, reactivación)
Para mantener actualizada la información de los grupos que se usan en auditorías.

**CA-12.2.1 — Consulta con filtros**
Dado que el usuario accede al catálogo
Cuando consulta el listado
Entonces puede filtrar por Todos, Activos o Baja.

**CA-12.2.2 — Alta de registro**
Dado que el usuario crea un nuevo grupo
Cuando registra clave y nombre válidos y guarda
Entonces el sistema crea el registro en estatus Activo.

**CA-12.2.3 — Validación de unicidad**
Dado que el usuario intenta registrar clave o nombre ya existente
Cuando guarda el registro
Entonces el sistema muestra un mensaje de validación y no permite duplicados.

**CA-12.2.4 — Edición de registro activo**
Dado que el usuario edita un grupo activo
Cuando confirma los cambios
Entonces el sistema actualiza el registro sin duplicar clave ni nombre.

**CA-12.2.5 — Baja de registro**
Dado que el usuario da de baja un grupo
Cuando confirma la acción
Entonces el sistema cambia el estatus a Baja y deshabilita la edición del registro.

**CA-12.2.6 — Reactivación de registro**
Dado que el usuario reactiva un grupo dado de baja
Cuando ejecuta la acción de reactivar
Entonces el sistema cambia el estatus a Activo y habilita la edición del registro.

---

# RF-13 — Segmentación por departamento en catálogos, procesos y monitores

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-12                    |

**Descripción:** El sistema debe restringir la visualización de información por departamento en todo el módulo de Auditorías (catálogos, procesos y monitores), segmentando desde la perspectiva del **Auditor**: cada Auditor ve únicamente la información del departamento que tiene asignado. La configuración de departamentos debe ser administrable. Los Auditores con rol Administrador conservan visibilidad global y pueden asignar auditores entre departamentos. Si un Auditor no tiene un departamento válido configurado para el módulo, puede acceder, pero debe visualizar información vacía.

---

## US-13.1

Como Auditor, quiero visualizar solo registros del departamento que tengo asignado, para operar con información correspondiente a mi ámbito como auditor.

**CA-13.1.1**  
Dado que el usuario accede a un catálogo, proceso o monitor del módulo  
Cuando el sistema carga la información  
Entonces solo muestra registros del departamento asignado al usuario.

**CA-13.1.2**  
Dado que el usuario consulta monitores con indicadores y listados  
Cuando el sistema calcula y presenta la información  
Entonces los KPIs, conteos y registros consideran únicamente el mismo alcance departamental del usuario.

**CA-13.1.3**  
Dado que el usuario tiene un solo departamento asignado  
Cuando opera en el módulo  
Entonces el filtrado se aplica de forma consistente en todas las vistas habilitadas.

---

## US-13.2

Como Administrador, quiero conservar visibilidad global y poder asignar auditores entre departamentos, para administrar el módulo sin restricciones operativas departamentales.

**CA-13.2.1**  
Dado que el usuario tiene rol Administrador  
Cuando accede a catálogos, procesos y monitores  
Entonces puede visualizar información de todos los departamentos.

**CA-13.2.2**  
Dado que el usuario tiene rol Administrador  
Cuando realiza asignaciones de auditores  
Entonces puede asignar auditores a auditorías de cualquier departamento.

---

## US-13.3

Como Auditor sin departamento válido configurado en el módulo, quiero poder acceder con vistas vacías y mensaje claro, para identificar que requiero configuración previa.

**CA-13.3.1**  
Dado que el Auditor no tiene departamento válido configurado para el módulo  
Cuando accede a un catálogo, proceso o monitor  
Entonces el sistema permite el acceso, muestra información vacía y no expone registros.

---

## US-13.4

Como auditor, quiero que en el monitor de acciones correctivas exista filtro por Auditado dentro del alcance departamental, para localizar y dar seguimiento a acciones correctivas del auditado correspondiente.

**CA-13.4.1**  
Dado que el usuario utiliza el filtro de Auditado en el Monitor de Hallazgos/Acciones Correctivas  
Cuando despliega opciones o captura criterios  
Entonces el filtrado aplica solo sobre auditados con registros dentro de su alcance departamental.

**CA-13.4.2**  
Dado que el usuario con alcance departamental aplica el filtro de Auditado  
Cuando no existen acciones correctivas para el criterio seleccionado  
Entonces el sistema muestra estado vacío controlado.

---

## US-13.5

Como auditor, quiero que en el Monitor de Auditorías exista un filtro por Auditado dentro del alcance departamental, para localizar y dar seguimiento a las auditorías del auditado correspondiente.

**CA-13.5.1**  
Dado que el usuario accede al Monitor de Auditorías  
Cuando utiliza el filtro de Auditado  
Entonces las opciones disponibles solo incluyen auditados con auditorías dentro de su alcance departamental.

**CA-13.5.2**  
Dado que el usuario aplica el filtro de Auditado en el Monitor de Auditorías  
Cuando el grid se actualiza  
Entonces los KPIs del monitor recalculan sus valores considerando únicamente las auditorías del Auditado seleccionado.

**CA-13.5.3**  
Dado que el usuario aplica el filtro de Auditado  
Cuando no existen auditorías para el criterio seleccionado dentro de su alcance  
Entonces el sistema muestra estado vacío controlado, sin exposición de registros de otros departamentos.

---

**Regla transversal:**  
La segmentación por departamento es obligatoria en todo el módulo de Auditorías para usuarios no administradores y se aplica de forma consistente a catálogos, procesos, monitores, KPIs y filtros. El departamento no se define por valor hardcodeado, sino por configuración administrable. El rol Administrador es excepción con visibilidad global.

---

---

# RF-14 — Flujo base de estados de Auditoría

| Campo        | Valor               |
|--------------|---------------------|
| Prioridad    | Alta                |
| Estado       | Definición          |
| Dependencias | RF-07, RF-13        |

**Descripción:** El sistema debe gestionar el flujo base de estados de la Auditoría con transiciones controladas entre Activo, Abierta, En_Ejecucion, Completado y Cancelado, y determinar automáticamente la ruta de cierre al alcanzar Completado. La cancelación solo está permitida en el flujo base y requiere captura obligatoria de motivo. El registro de cada transición en bitácora se rige por RF-16.

---

## US-14.1

Como auditor, quiero avanzar manualmente la auditoría en su flujo base (Activo, Abierta, En Ejecución, Completado), para reflejar el progreso real de la ejecución.

**CA-14.1.1**  
Dado que la auditoría está en estado Activo  
Cuando el usuario ejecuta la acción de apertura  
Entonces el sistema cambia el estado a Abierta.

**CA-14.1.2**  
Dado que la auditoría está en estado Abierta  
Cuando el usuario inicia la ejecución  
Entonces el sistema cambia el estado a En Ejecución.

**CA-14.1.3**  
Dado que la auditoría está en estado En Ejecución  
Cuando el usuario concluye la ejecución  
Entonces el sistema cambia el estado a Completado.

**CA-14.1.4**  
Dado que la auditoría cambia de estado en el flujo base  
Cuando se confirma la transición  
Entonces el sistema registra la transición en bitácora conforme a RF-16.

---

## US-14.2

Como sistema, debo determinar automáticamente la ruta posterior al estado Completado según existan o no hallazgos abiertos, para evitar decisiones manuales inconsistentes en el cierre.

**CA-14.2.1**  
Dado que la auditoría cambia a Completado  
Cuando no existen hallazgos abiertos ni acciones correctivas pendientes  
Entonces el sistema cambia automáticamente el estado a Finalizado en la misma operación.

**CA-14.2.2**  
Dado que la auditoría cambia a Completado  
Cuando existen hallazgos abiertos o acciones correctivas pendientes  
Entonces el sistema cambia automáticamente el estado a Registro_PDCA en la misma operación, iniciando el ciclo PDCA definido en RF-15.

**CA-14.2.3**  
Dado que ocurre cualquiera de las rutas automáticas desde Completado  
Cuando se confirma la transición  
Entonces se registra la transición en bitácora conforme a RF-16.

---

## US-14.3

Como usuario autorizado, quiero poder cancelar una auditoría únicamente en el flujo base previo al ciclo PDCA, para cerrar administrativamente procesos que no continuarán antes de iniciar el tratamiento formal de hallazgos.

**CA-14.3.1**  
Dado que la auditoría está en estado Activo, Abierta, En_Ejecucion o Completado  
Cuando el usuario ejecuta la acción Cancelar  
Entonces el sistema solicita de forma obligatoria el motivo de cancelación.

**CA-14.3.2**  
Dado que el usuario intenta confirmar la cancelación sin motivo  
Cuando valida la operación  
Entonces el sistema no permite continuar y muestra mensaje de validación obligatoria.

**CA-14.3.3**  
Dado que el usuario captura un motivo de cancelación válido  
Cuando confirma la acción  
Entonces el sistema cambia el estado de la auditoría a Cancelado y guarda el motivo.

**CA-14.3.4**  
Dado que la auditoría cambia a Cancelado  
Cuando se confirma la transición  
Entonces el sistema registra la transición en bitácora conforme a RF-16, conservando el motivo de cancelación.

**CA-14.3.5**  
Dado que la auditoría está en Registro_PDCA, Entregado_PDCA, PDCA_En_Ejecucion, PDCA_Finalizado, PDCA_Validación, Finalizado o Cancelado  
Cuando el usuario intenta ejecutar la acción Cancelar  
Entonces el sistema no permite la transición y muestra mensaje de restricción.

**CA-14.3.6**  
Dado que la auditoría ya está en Cancelado  
Cuando el usuario consulta acciones de avance de flujo  
Entonces el sistema no permite transiciones adicionales.

---

**Regla transversal:**  
El flujo base comprende las transiciones entre Activo, Abierta, En_Ejecucion, Completado y Cancelado. Al alcanzar Completado, el sistema determina automáticamente la ruta de cierre: sin hallazgos avanza a Finalizado de forma inmediata; con hallazgos inicia el ciclo PDCA definido en RF-15. La cancelación solo está permitida en los estados Activo, Abierta, En_Ejecucion y Completado. El registro de cada transición en bitácora se rige por RF-16.

---

# RF-15 — Ciclo PDCA — Seguimiento y cierre de hallazgos

| Campo        | Valor               |
|--------------|---------------------|
| Prioridad    | Alta                |
| Estado       | Definición          |
| Dependencias | RF-14, RF-18        |

**Descripción:** El sistema debe gestionar el ciclo de seguimiento de acciones correctivas (PDCA) dentro de la auditoría, desde la entrega formal del plan de corrección hasta el cierre validado, con transiciones controladas entre Registro_PDCA, Entregado_PDCA, PDCA_En_Ejecucion, PDCA_Finalizado, PDCA_Validación y Finalizado, para garantizar que ninguna auditoría con hallazgos abiertos se cierre sin resolución formal.

---

## US-15.1

Como auditor, quiero registrar la entrega del PDCA y que el sistema arranque automáticamente la ejecución de acciones correctivas al detectar trabajo real, para reflejar el avance operativo sin intervención manual innecesaria.

**CA-15.1.1**  
Dado que la auditoría está en Registro_PDCA  
Cuando el auditor ejecuta la acción de entrega  
Entonces el sistema cambia el estado a Entregado_PDCA.

**CA-15.1.2**  
Dado que la auditoría está en Entregado_PDCA  
Cuando el sistema detecta al menos una acción correctiva en ejecución  
Entonces cambia automáticamente el estado a PDCA_En_Ejecucion.

**CA-15.1.3**  
Dado que ocurre la transición manual o automática de este tramo  
Cuando se confirma cada transición  
Entonces se registra la transición en bitácora conforme a RF-16.

---

## US-15.2

Como sistema, debo cerrar automáticamente la fase de ejecución PDCA cuando todas las acciones correctivas estén finalizadas y enviarla a validación, para estandarizar la entrada al proceso de cierre.

**CA-15.2.1**  
Dado que la auditoría está en PDCA_En_Ejecucion  
Cuando el 100% de las acciones correctivas asociadas están en estado Finalizado  
Entonces el sistema cambia automáticamente el estado a PDCA_Finalizado.

**CA-15.2.2**  
Dado que la auditoría cambia a PDCA_Finalizado  
Cuando se completa la operación  
Entonces el sistema cambia automáticamente el estado a PDCA_Validación.

**CA-15.2.3**  
Dado que se ejecutan estas transiciones automáticas  
Cuando se confirma cada cambio  
Entonces se registra la transición en bitácora conforme a RF-16.

---

## US-15.3

Como coordinador o auditor líder, quiero validar el cierre PDCA para aprobar el Finalizado o devolver a retrabajo sin límite de iteraciones, para garantizar que no se cierre ninguna auditoría con pendientes sin resolver.

**CA-15.3.1**  
Dado que la auditoría está en PDCA_Validación  
Cuando el usuario autorizado rechaza la validación  
Entonces el sistema cambia el estado a Registro_PDCA.

**CA-15.3.2**  
Dado que la auditoría está en PDCA_Validación  
Cuando el Coordinador o Auditor Líder aprueba manualmente el cierre  
Entonces el sistema cambia el estado a Finalizado.

**CA-15.3.3**  
Dado que la auditoría entra en ciclo de rechazo y retrabajo  
Cuando se repite el proceso de validación  
Entonces el sistema permite iteraciones sin límite hasta lograr aprobación final.

**CA-15.3.4**  
Dado que ocurre una transición en el ciclo de validación  
Cuando se confirma la transición  
Entonces se registra la transición en bitácora conforme a RF-16.

---

**Regla transversal:**  
El ciclo PDCA inicia de forma automática desde RF-14 cuando la auditoría alcanza Completado con hallazgos abiertos. El estado Finalizado solo puede alcanzarse desde PDCA_Validación por aprobación manual de Coordinador o Auditor Líder. El ciclo de rechazo PDCA_Validación → Registro_PDCA no tiene límite de iteraciones. Toda transición en este ciclo debe registrarse en bitácora conforme a RF-16.

---

# RF-16 — Bitácora de estados de Auditoría

| Campo        | Valor               |
|--------------|---------------------|
| Prioridad    | Alta                |
| Estado       | Definición          |
| Dependencias | RF-14               |

**Descripción:** El sistema debe registrar automáticamente cada transición de estado de la Auditoría en una bitácora inmutable, incluyendo como mínimo fecha-hora, estatus destino y usuario ejecutor, para garantizar trazabilidad completa del ciclo de vida del proceso. La bitácora aplica a todas las transiciones del flujo base (RF-14) y del ciclo PDCA (RF-15).

---

## US-16.1

Como coordinador de auditorías, quiero consultar la bitácora de estados de cada auditoría, para contar con trazabilidad completa del ciclo de vida del proceso.

**CA-16.1.1**  
Dado que una auditoría tuvo una o más transiciones  
Cuando el usuario consulta su bitácora  
Entonces visualiza los registros en orden cronológico.

**CA-16.1.2**  
Dado que se muestra un registro de bitácora  
Cuando el usuario revisa el detalle  
Entonces se visualiza la fecha-hora, el estatus destino y el usuario que ejecutó la transición.

**CA-16.1.3**  
Dado que la transición registrada corresponde a una cancelación  
Cuando el usuario revisa la bitácora  
Entonces se muestra también el motivo de cancelación capturado.

**CA-16.1.4**  
Dado que ocurre un fallo al registrar una transición en bitácora  
Cuando el sistema intenta confirmar el cambio de estado  
Entonces la transición no se confirma y se mantiene el estado previo.

---

**Regla transversal:**  
La bitácora es inmutable: una vez registrada una transición no puede modificarse ni eliminarse. Aplica a todas las transiciones de estado definidas en RF-14 (flujo base) y RF-15 (ciclo PDCA). Cada entrada guarda como mínimo: fecha-hora, estatus destino y usuario ejecutor. Las cancelaciones incluyen adicionalmente el motivo capturado.

---

# RF-17 — Monitor consolidado de Auditorías

| Campo          | Valor                    |
|----------------|-------------------------|
| Prioridad      | Alta                     |
| Estado         | Validación funcional     |
| Dependencias   | RF-12, RF-13, RF-27      |

**Descripción:** El sistema debe contar con un monitor consolidado que muestre las auditorías aplicadas, el concentrado de hallazgos, las acciones correctivas y sus respectivos estados. Incluye 4 tarjetas KPI, grid principal de 15 columnas e interacción bidireccional KPI-Grid, con exportación a Excel y comportamiento responsivo.

---

## Tarjetas KPI

### US-17.1 — Tarjeta: Auditorías Programadas

Como Auditor
Quiero visualizar cuántas auditorías programadas han sido realizadas respecto al total planificado
Para conocer el grado de cumplimiento del plan de auditorías vigente.

**CA-17.1.1**
Dado el universo de auditorías cuyo Tipo de Auditoría tiene activo el campo "Es Programada"
Cuando se consulta la tarjeta
Entonces el denominador muestra el total de esas auditorías con estatus diferente a Cancelado.

**CA-17.1.2**
Dado el universo de auditorías cuyo Tipo de Auditoría tiene activo el campo "Es Programada"
Cuando se consulta la tarjeta
Entonces el numerador muestra las auditorías realizadas: aquellas con estatus Completado, Registro PDCA, PDCA En Ejecución, PDCA Finalizado, PDCA Validación o Finalizado.

**CA-17.1.3**
Dado que el denominador es 0
Cuando se calcula el indicador
Entonces se muestra 0/0 y porcentaje 0%, sin error de división.

**CA-17.1.4**
Dado que el usuario abre el detalle de la tarjeta
Cuando entra al drill-down
Entonces visualiza el listado de auditorías programadas con su estatus actual.

Regla de cálculo:
- EstadosRealizados = [Completado, Registro PDCA, PDCA En Ejecución, PDCA Finalizado, PDCA Validación, Finalizado]
- Realizadas = count(auditorías cuyo TipoAuditoria.EsProgramada = true AND estatus in EstadosRealizados)
- Programadas = count(auditorías cuyo TipoAuditoria.EsProgramada = true AND estatus != Cancelado)
- Ratio = Realizadas / Programadas

Semáforo sugerido:
- Verde: >= 80%
- Amarillo: >= 60% y < 80%
- Rojo: < 60%

---

### US-17.2 — Tarjeta: Auditorías Reprogramadas

Como Auditor
Quiero conocer cuántas auditorías han sido reprogramadas
Para identificar desviaciones en la ejecución del plan de auditorías.

**CA-17.2.1**
Dado el universo de auditorías del periodo activo
Cuando se calcula la tarjeta
Entonces se cuentan las auditorías que registran al menos un cambio de fecha de programación respecto a la fecha original planificada.

**CA-17.2.2**
Dado que hay 0 auditorías reprogramadas
Cuando se visualiza la tarjeta
Entonces se muestra 0 y estado verde.

**CA-17.2.3**
Dado que el usuario abre el detalle de la tarjeta
Cuando entra al drill-down
Entonces visualiza el listado de auditorías reprogramadas con la fecha original y la fecha reprogramada.

**CA-17.2.4**
Dado que una auditoría ha sido reprogramada más de una vez
Cuando se calcula la tarjeta
Entonces se cuenta una sola vez en el indicador, sin duplicados.

Regla de cálculo:
- Reprogramadas = count(auditorías con al menos un registro de cambio de fecha de programación)

Semáforo sugerido:
- Verde: 0 a 2
- Amarillo: 3 a 5
- Rojo: >= 6

---

### US-17.3 — Tarjeta: Completadas en Tiempo (%)

Como Auditor
Quiero ver el porcentaje de auditorías completadas en tiempo
Para evaluar el cumplimiento de compromisos de cierre.

**CA-17.3.1**
Dado el universo general de auditorías
Cuando se calcula la tarjeta
Entonces el denominador es el total de auditorías que alcanzaron el estado Completado con fecha compromiso definida.

**CA-17.3.2**
Dadas las auditorías en estado Completado con fecha compromiso
Cuando se calcula la tarjeta
Entonces el numerador incluye solo auditorías cuya fechaCompletado es menor o igual a la fecha compromiso.

**CA-17.3.3**
Dado que no existen auditorías en estado Completado con fecha compromiso
Cuando se visualiza la tarjeta
Entonces se muestra N/A y se evita porcentaje artificial.

**CA-17.3.4**
Dado que el usuario consulta el detalle de la tarjeta
Cuando abre el drill-down
Entonces visualiza únicamente la información de las auditorías en tiempo y fuera de tiempo.

Regla de calculo:
- EnTiempo = count(auditorias estatus Completado or posterior and fechaCompletado <= fechaCompromiso)
- CompletadasConCompromiso = count(auditorias estatus Completado or posterior and fechaCompromiso definida)
- CierreEnTiempo = EnTiempo / CompletadasConCompromiso

Semaforo sugerido:
- Verde: >= 85%
- Amarillo: >= 70% y < 85%
- Rojo: < 70%

---


## Reglas transversales (RT)

RT-01 Filtros
- Todas las tarjetas usan el mismo alcance organizacional (empresa, sucursal, área, auditor) y permiten aplicar un filtro de periodo (Mes, Trimestre, Año, Todas).

RT-02 Consistencia
- Todas las tarjetas deben usar la misma fecha de corte (timestamp) dentro de una misma carga de tablero.

RT-03 Drill-down obligatorio
- Cada tarjeta debe permitir navegar a detalle con exportacion.

RT-04 Exclusiones
- Auditorias canceladas no forman parte de vigentes.
- Registros con borrado logico no deben considerarse.

RT-05 Rendimiento
- Carga inicial del tablero <= 3 segundos en condiciones normales.
- Refresco por filtro <= 2 segundos.

RT-06 Interaccion bidireccional KPI-Grid
- Al dar clic en un KPI, el grid filtra los registros que explican el indicador.
- Al filtrar el grid, los KPIs se recalculan con el mismo subconjunto.

RT-07 Grid principal estandar
- El tablero usa un grid principal de 15 columnas funcionales definidas en este documento.

RT-08 Exportacion
- La exportacion a Excel respeta filtros activos y columnas visibles.

RT-09 Responsivo
- El tablero conserva funcionalidad critica en escritorio y movil.

RT-10 Consistencia de datos
- KPIs y grid deben compartir la misma fecha de corte y alcance activo.

---

## Definition of Done — Tablero Ejecutivo
- Las 3 tarjetas de auditoria calculan correctamente contra datos historicos validados por negocio.
- Usuarios clave de Auditoria aprueban definiciones y semaforos.
- Existe evidencia de prueba funcional por cada CA.
- El grid principal muestra las 15 columnas funcionales definidas.
- Se valida la interaccion bidireccional KPI-Grid.
- Se valida exportacion a Excel del resultado filtrado.
- Se valida comportamiento responsivo en escritorio y movil.

---

## Riesgos y supuestos
- Supuesto: las auditorias abiertas cuentan con fecha compromiso de cierre registrada.
- Supuesto: existe fecha/hora de ultima actualizacion confiable por auditoria.
- Riesgo: definicion no homologada de que se considera avance operativo entre areas.
- Riesgo: calidad de fechas compromiso/cierre en historicos antiguos.

---

## Decisiones de negocio cerradas
1. Alcance temporal: general, sin periodo.
2. Fecha de corte: unica y consistente para KPIs y grid en cada carga.
3. Semaforos: se mantienen los propuestos.
4. Tarjeta 1: se presenta como Auditorías Programadas (Realizadas / Programadas).
5. Tarjeta 2: se presenta como Auditorías Reprogramadas.
6. Tarjeta 3: se presenta como Completadas en Tiempo de Auditorías (%).
7. Grid principal: se conforma por 15 columnas funcionales oficiales.
8. Interaccion KPI-Grid: se implementa en ambos sentidos.


---

## Grid principal — 15 columnas

Define las 15 columnas oficiales del grid principal y establece su fuente de llenado a nivel funcional, sin detalle técnico.

| No | Columna                        | Se llena desde                                      |
|----|--------------------------------|-----------------------------------------------------|
| 1  | Folio                          | Datos generales de la auditoría.                     |
| 2  | Objetivo                       | Datos generales de la auditoría.                     |
| 3  | Tipo                           | Clasificación/tipo de auditoría capturado.           |
| 4  | Auditor                        | Persona asignada como auditor responsable.           |
| 5  | Área Auditable                 | Área o unidad organizacional auditada.               |
| 6  | Auditado                       | Responsable o área auditada asociada.                |
| 7  | Estatus                        | Estado actual de la auditoría.                       |
| 8  | Total Hallazgos                | Total de hallazgos vinculados a la auditoría.        |
| 9  | Total Acciones Correctivas     | Total de acciones correctivas asociadas.             |
| 10 | Calificación / Resultado       | Resultado/calificación final de la auditoría.        |
| 11 | Fecha Compromiso               | Fecha compromiso de cierre de la auditoría.          |
| 12 | Fecha Completado               | Fecha de término/cierre de la auditoría.             |
| 13 | Completado en tiempo           | Indicador (Sí/No) si la auditoría cerró en tiempo.   |
| 14 | Días sin avance                | Días desde la última actualización relevante.        |
| 15 | No. Reprogramaciones           | Cantidad de veces que la auditoría ha sido reprogramada. |

Reglas funcionales de llenado:
- Todas las columnas respetan el mismo alcance de filtros del tablero.
- Las columnas derivadas (completado en tiempo, días sin avance, No. Reprogramaciones) se recalculan con el contexto activo.
- No. Reprogramaciones muestra 0 cuando la auditoría nunca ha sido reprogramada; el valor se obtiene del historial de planes de la auditoría (RF-10).
- Cuando un dato no aplica, se muestra vacío controlado.

---

## Interacción KPI-Grid (bidireccional)

Asegura análisis dinámico entre tarjetas KPI y registros del grid, manteniendo consistencia funcional en ambos sentidos.

### US-17.4 — Drill-down desde KPI al grid

Como Auditor
Quiero dar clic en un KPI
Para ver en el grid los registros que explican su valor.

### US-17.5 — Recálculo de KPIs al filtrar el grid

Como usuario analista
Quiero que al filtrar el grid se actualicen los KPIs
Para analizar el comportamiento del subconjunto filtrado.

### US-17.6 — Filtros, búsqueda y ordenamiento en el grid

Como usuario operativo
Quiero usar filtros, búsqueda y ordenamiento en el grid
Para localizar rápidamente registros relevantes.

### US-17.7 — Exportación a Excel

Como usuario del tablero
Quiero exportar a Excel la vista filtrada del grid
Para compartir y analizar información fuera del sistema.

### US-17.8 — UI responsiva

Como usuario de escritorio y móvil
Quiero una UI responsiva
Para operar el tablero sin perder funcionalidad crítica.

---

### Criterios de Aceptación — Interacción KPI-Grid

**CA-17.8.1**
Dado que el usuario visualiza el tablero
Cuando da clic en una tarjeta KPI
Entonces el grid muestra solo registros relacionados con ese indicador.

**CA-17.8.2**
Dado que el usuario aplica filtros en el grid
Cuando cambia cualquier criterio disponible
Entonces los 4 KPIs se recalculan con el mismo alcance filtrado.

**CA-17.8.3**
Dado que existen filtros activos
Cuando el usuario limpia filtros
Entonces KPI y grid regresan al estado global.

**CA-17.8.4**
Dado que el usuario exporta a Excel
Cuando confirma la acción
Entonces se exporta la vista filtrada y las columnas visibles del grid.

**CA-17.8.5**
Dado que el usuario accede desde móvil o escritorio
Cuando interactúa con KPI y grid
Entonces se conserva funcionalidad y legibilidad.

**CA-17.8.6**
Dado un escenario de operación normal
Cuando se carga o recalcula el tablero
Entonces se cumple: carga inicial ≤ 3 segundos y refresco ≤ 2 segundos.

**CA-17.8.7**
Dado que el usuario consulta el detalle de un registro del monitor
Cuando abre la vista de detalle
Entonces el sistema muestra una ventana flotante con datos generales de la auditoría y una única tabla que relaciona Hallazgo, Acción Correctiva y Estatus de la acción, conservando los filtros activos al cerrar.

---

**Regla transversal:**
RF-17 cubre el monitor consolidado de auditorías: KPIs de avance, cumplimiento y programación, más el grid de auditorías aplicadas. El seguimiento detallado de hallazgos y acciones correctivas —con sus propios KPIs, grid de 14 columnas, drawer de seguimiento y exportación— se encuentra en RF-18. Juntos satisfacen el requerimiento RF26 del cliente (monitor consolidado auditorías + hallazgos + ACs); la separación en dos monitores es intencional para mantener filtros, KPIs y exportaciones independientes por ámbito funcional sin duplicar lógica.

---

---

# RF-18 — Monitor de Hallazgos/Acciones Correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-13, RF-17, RF-28      |

**Descripción:** El sistema debe contar con un monitor consolidado que muestre el estado de las acciones correctivas por auditoría, área y responsable, permitiendo realizar el seguimiento correspondiente desde el mismo monitor. Incluye 5 KPIs ejecutivos clicables con filtro bidireccional, tabla de registros, modal de detalle y exportación a Excel (XLSX).

---

## Tarjetas KPI — Monitor de Hallazgos/Acciones Correctivas

### US-18.1 — Tarjeta: Hallazgos Activos

Como Auditor
Quiero visualizar el total de hallazgos en estado activo
Para conocer de un vistazo la carga general del programa.

**CA-18.1.1**
Dado que el usuario visualiza el monitor
Cuando carga la pantalla
Entonces se muestra tarjeta KPI "Hallazgos Activos" con valor total de hallazgos con estatus IN ('Activo', 'Ejecucion').

**CA-18.1.2**
Dado que se visualiza la tarjeta
Cuando el usuario revisa el subtítulo
Entonces se muestra "distribuidos en N auditorías".

**CA-18.1.3**
Dado que hay hallazgos activos
Cuando se carga el monitor
Entonces el contador se anima con efecto incremental.

---

### US-18.2 — Tarjeta: Hallazgos Alto Impacto Vigentes

Como Auditor
Quiero visualizar hallazgos cuyo Tipo de Hallazgo tiene activo el campo "Es Alto Impacto" en estado abierto
Para identificar riesgos críticos que requieren atención inmediata.

**CA-18.2.1**
Dado que el usuario visualiza el monitor
Cuando carga la pantalla
Entonces se muestra tarjeta KPI "Hallazgos Alto Impacto" con el total de hallazgos cuyo Tipo de Hallazgo tiene activo el campo "Es Alto Impacto" y estatus IN ('Activo', 'Ejecucion').

**CA-18.2.2**
Dado que se visualiza la tarjeta
Cuando el usuario revisa el subtítulo
Entonces se muestra "distribuidos en N auditorías".

---

### US-18.3 — Tarjeta: Acciones Correctivas Vencidas

Como Auditor
Quiero conocer cuántas acciones correctivas han vencido su Fecha Límite sin ser finalizadas
Para priorizar intervenciones sobre atrasos críticos.

**CA-18.3.1**
Dado que el usuario visualiza el monitor
Cuando carga la pantalla
Entonces se muestra tarjeta KPI "Acciones Vencidas" con el total de acciones correctivas cuya FechaLímite es anterior a la fecha actual y cuyo estatus es Activo o En Ejecución.

**CA-18.3.2**
Dado que se visualiza la tarjeta
Cuando el usuario revisa el subtítulo
Entonces se muestra "de X auditorías".

---

### US-18.4 — Tarjeta: Eficacia de Cierre en Tiempo (%)

Como Auditor
Quiero visualizar el porcentaje de acciones correctivas finalizadas dentro del plazo
Para evaluar la efectividad del seguimiento de AC.

**CA-18.4.1**
Dado que el usuario visualiza el monitor
Cuando carga la pantalla
Entonces se muestra tarjeta KPI "Eficacia Cierre en Tiempo (%)" con el porcentaje de acciones correctivas en estatus Finalizado cuya FechaEjecución es menor o igual a su FechaLímite, respecto al total de acciones correctivas con estatus Finalizado (con o sin FechaLímite definida). Las ACs sin FechaLímite se contabilizan en el denominador pero no en el numerador.

Regla de cálculo:
- Denominador = count(ACs con Estatus = Finalizado)
- Numerador   = count(ACs con Estatus = Finalizado AND FechaLímite definida AND FechaEjecución <= FechaLímite)
- Ratio = Numerador / Denominador

**CA-18.4.2**
Dado que se visualiza la tarjeta
Cuando el denominador es 0
Entonces se muestra "0%" sin error de división.

---

### US-18.5 — Tarjeta: Validaciones Pendientes

Como Coordinador de Calidad o Dirección
Quiero ver cuántas auditorías están en fase de validación de cierre
Para conocer el volumen de verificaciones que requieren revisión.

**CA-18.5.1**
Dado que el usuario visualiza el monitor
Cuando carga la pantalla
Entonces se muestra tarjeta KPI "Validaciones Pendientes" contando auditorías en estatus PDCA_Validacion.

**CA-18.5.2**
Dado que se visualiza la tarjeta
Cuando el usuario revisa el subtítulo
Entonces se muestra "esperando validación de cierre".

---

### US-18.18 — Leyenda de contexto: KPIs por Auditado

Como Auditor
Quiero que la sección de KPIs muestre una leyenda fija que indique que los indicadores corresponden al auditado
Para interpretar correctamente el alcance de los datos visualizados sin ambigüedad.

**CA-18.18.1**
Dado que el usuario accede al monitor
Cuando se visualizan las tarjetas KPI
Entonces se muestra una leyenda estática y siempre visible con el texto: "Los indicadores corresponden al Auditado".

**CA-18.18.2**
Dado que la leyenda está visible
Cuando se visualiza en cualquier tamaño de pantalla
Entonces mantiene legibilidad y posición coherente respecto a las tarjetas KPI, tanto en escritorio como en móvil.

---

## Tabla y Filtros — Registro de Acciones Correctivas

### US-18.6 — Visualizar tabla principal de Acciones Correctivas

Como Auditor
Quiero consultar el listado consolidado de auditorías con columnas de hallazgos y acciones
Para realizar el seguimiento operativo del estado de cada auditoría.

**CA-18.6.1**
Dado que existen auditorías con hallazgos y acciones correctivas
Cuando el usuario accede a la tabla
Entonces se muestran las 14 columnas definidas a continuación.

| No | Columna                      | Se llena desde                                                                 |
|----|------------------------------|--------------------------------------------------------------------------------|
| 1  | Folio                        | Datos generales de la auditoría.                                               |
| 2  | Objetivo                     | Datos generales de la auditoría.                                               |
| 3  | Fecha Fin                    | Fecha de fin registrada en la auditoría.                                       |
| 4  | Auditado                     | Responsable del área auditada asociada a la auditoría.                         |
| 5  | Departamento                 | Departamento asociado a la auditoría.                                          |
| 6  | No. Hallazgos                | Total de hallazgos vinculados a la auditoría.                                  |
| 7  | Hallazgos Corregidos         | Hallazgos en estatus Finalizado respecto al total; formato (x/y) con color.   |
| 8  | Total AC                     | Total de acciones correctivas asociadas a los hallazgos de la auditoría.       |
| 9  | AC en Ejecución              | Acciones correctivas en estatus En Ejecución.                                  |
| 10 | AC Finalizadas               | Acciones correctivas en estatus Finalizado respecto al total; formato (x/y) con color. |
| 11 | PDCA En Tiempo               | Indicador (Sí/No): ACs finalizadas con FechaEjecución <= FechaLímite.          |
| 12 | Estatus                      | Estado actual de la auditoría.                                                 |
| 13 | Seguimiento                  | Consolidado de comentarios de seguimiento de acciones correctivas.             |
| 14 | Acciones                     | Botón de acceso al detalle integral de la auditoría (popup de detalles).       |

Reglas funcionales de llenado:
- Todas las columnas respetan el mismo alcance de filtros del monitor.
- Las columnas derivadas (Hallazgos Corregidos, AC Finalizadas, PDCA En Tiempo) se recalculan con el contexto activo.
- Las columnas Total AC, AC en Ejecución y AC Finalizadas muestran "—" cuando la auditoría está en estatus Completado o Registro PDCA.
- Cuando un dato no aplica, se muestra vacío controlado.

**CA-18.6.2**
Dado que una auditoría tiene estatus "Completado" o "Registro PDCA"
Cuando el usuario la visualiza
Entonces Total AC, AC en Ejecución y AC Finalizadas muestran "—" y no se interpretan como 0.

**CA-18.6.3**
Dado que la tabla ya está cargada
Cuando cambia el conjunto de filas visibles (por búsqueda, filtros o limpieza de filtros)
Entonces el contador muestra exactamente la cantidad de filas visibles en formato "N registros" y se actualiza automáticamente sin recargar la pantalla.

---

### US-18.7 — Búsqueda global en la tabla

Como cualquier usuario del monitor
Quiero buscar registros con un campo de texto global
Para localizar auditorías por folio, objetivo, auditado, departamento o estatus.

**CA-18.7.1**
Dado que el usuario escribe un término en el campo de búsqueda global
Cuando la búsqueda se ejecuta
Entonces la tabla muestra solo registros con el término en campos buscables.

---

### US-18.8 — Filtros por columna

Como Auditor
Quiero aplicar filtros por columna desde la fila bajo los encabezados
Para acotar registros por fecha, departamento, rangos numéricos u otros criterios.

**CA-18.8.1**
Dado que el usuario escribe "GABRIEL" en el filtro de columna "Auditado"
Cuando el filtro se aplica
Entonces la tabla muestra solo registros cuyo Auditado contiene "GABRIEL".

**CA-18.8.2**
Dado que el usuario ingresa "5" en el filtro de "No. Hallazgos"
Cuando el filtro se aplica
Entonces la tabla muestra solo registros con No. Hallazgos = 5.

**CA-18.8.3**
Dado que el usuario selecciona "Sí" en el filtro de "PDCA En Tiempo"
Cuando aplica la selección
Entonces solo se muestran auditorías con PDCA entregado en tiempo.

Nota técnica: Tipos de filtro — Texto: Folio, Objetivo, Fecha Fin, Auditado, Departamento. Numérico: columnas de hallazgos y AC. Select Sí/No: PDCA en Tiempo. Select: Estatus. Filtros se combinan con AND lógico.

---

### US-18.9 — Ordenar tabla por columna

Como cualquier usuario del monitor
Quiero ordenar la tabla haciendo clic en cualquier encabezado
Para organizar registros ascendente o descendentemente.

**CA-18.9.1**
Dado que el usuario hace clic en el encabezado "Fecha Fin"
Cuando el orden se aplica
Entonces la tabla se ordena ascendente y el encabezado muestra (↑).

**CA-18.9.2**
Dado que "Fecha Fin" está en orden ascendente
Cuando el usuario hace clic nuevamente
Entonces la tabla se ordena descendente y el encabezado muestra (↓).

Nota técnica: Toggle: sin orden → ascendente → descendente → sin orden. Solo una columna activa a la vez.

---

### US-18.10 — Selección visual de fila

Como cualquier usuario del monitor
Quiero que al hacer clic en una fila ésta se resalte
Para identificar el registro que reviso antes de abrir detalles.

**CA-18.10.1**
Dado que el usuario hace clic en una fila
Cuando la selección se aplica
Entonces la fila se resalta con fondo diferenciado hasta clic en otra.

**CA-18.10.2**
Dado que hay una fila seleccionada
Cuando el usuario hace clic en otra
Entonces la selección anterior se quita y la nueva queda resaltada.

---

### US-18.11 — Limpiar todos los filtros

Como cualquier usuario del monitor
Quiero limpiar todos los filtros con un solo botón
Para regresar a la vista global sin borrar filtro por filtro.

**CA-18.11.1**
Dado que hay filtros de búsqueda, columna y estatus activos simultáneamente
Cuando el usuario hace clic en "✕ Limpiar"
Entonces búsqueda vacía, filtros de columna limpios, selector en "Todos" y la tabla muestra todos los registros.

**CA-18.11.2**
Dado que no hay ningún filtro activo
Cuando el usuario hace clic en "✕ Limpiar"
Entonces no ocurre ningún cambio visible.

---

## Detalle y Seguimiento

US-18.12 — Ver detalle integral de auditoría (ventana flotante)

Como Auditor Líder
Quiero abrir una ventana flotante desde el botón "Detalles"
Para consultar en una sola vista los datos generales de la auditoría, sus hallazgos y las acciones correctivas relacionadas con su estatus.

CA-18.12.1
Dado que el usuario hace clic en el botón "Detalles" de una fila
Cuando se ejecuta la acción
Entonces se abre una ventana flotante sin salir del monitor ni perder filtros activos.

CA-18.12.2
Dado que la ventana de detalle está abierta
Cuando se muestra la cabecera
Entonces se visualizan datos generales de la auditoría: Folio, Objetivo, Fecha Fin, Auditor, Auditado, Departamento, Criterios Evaluados en la auditoría y Estatus.

CA-18.12.3
Dado que la ventana de detalle está abierta
Cuando se carga la sección de detalle
Entonces se muestra una única tabla que relaciona cada Hallazgo con su Acción Correctiva y el Estatus actual de la acción.

CA-18.12.4
Dado que la ventana de detalle está abierta
Cuando el usuario la cierra
Entonces regresa al monitor conservando búsqueda, filtros y ordenamiento aplicados.

---

## Exportación

### US-18.13 — Exportar tabla a Excel (XLSX)

Como Coordinador de Calidad o Dirección
Quiero exportar los registros visibles en formato Excel
Para generar reportes formales con formato enriquecido respetando los filtros activos.

**CA-18.13.1**
Dado que hay filtros activos
Cuando el usuario selecciona "Excel (XLSX)"
Entonces descarga .xlsx con los registros visibles, columna "Seguimiento" incluida.

**CA-18.13.2**
Dado que el archivo se genera exitosamente
Cuando se exporta
Entonces se muestra toast "N registros exportados" que desaparece en ~2.5 seg.

**CA-18.13.3**
Dado que no hay filtros activos
Cuando el usuario selecciona "Excel (XLSX)"
Entonces el archivo contiene todos los registros del monitor.

**CA-18.13.4**
Dado que la tabla está en estado vacío
Cuando el usuario intenta exportar
Entonces muestra "No hay registros para exportar" y no genera archivo.

---

## Calidad Transversal

### US-18.15 — Filtro bidireccional KPI-Grid

Como Auditor
Quiero que los KPIs se comporten como filtros clicables y que los filtros de tabla recalculen los KPIs
Para analizar el comportamiento del subconjunto de registros dinámicamente.

**CA-18.15.1**
Dado que el usuario hace clic en una tarjeta KPI
Cuando el clic se ejecuta
Entonces la tabla muestra únicamente los registros que explican ese indicador.

**CA-18.15.2**
Dado que existe un filtro KPI activo
Cuando el usuario visualiza la tabla
Entonces la tarjeta se resalta (borde azul) y un badge muestra el nombre del KPI con botón "✕" para limpiar.

**CA-18.15.3**
Dado que el usuario aplica un filtro en la tabla
Cuando el filtro se ejecuta
Entonces los 5 KPIs se recalculan considerando únicamente los registros visibles.

**CA-18.15.4**
Dado que hay filtros activos
Cuando el usuario hace clic en "✕ Limpiar"
Entonces los KPIs regresan a valores globales y la tabla muestra todos los registros.

---

### US-18.16 — Comportamiento responsivo del monitor

Como usuario de escritorio o dispositivo móvil
Quiero que el monitor sea funcional en distintos tamaños de pantalla
Para consultar el estado desde cualquier dispositivo.

**CA-18.16.1**
Dado que el usuario accede desde escritorio (>= 1024px)
Cuando la pantalla carga
Entonces los 5 KPIs se muestran en fila horizontal y la tabla es visible con scroll horizontal si se requiere.

**CA-18.16.2**
Dado que el usuario accede desde móvil (< 768px)
Cuando la pantalla carga
Entonces los KPIs se adaptan en layout de 2-3 por fila, la tabla tiene scroll horizontal habilitado y modales/drawers ocupan el ancho completo.

---

### US-18.17 — Animación de valores en KPIs

Como Auditor
Quiero que los valores de KPIs se animen al cambiar
Para percibir claramente cuándo los indicadores se actualizan.

**CA-18.17.1**
Dado que un filtro modifica el valor de un KPI
Cuando los KPIs se recalculan
Entonces los valores se animan con efecto contador (< 500 ms).

**CA-18.17.2**
Dado que un filtro no modifica ningún KPI
Cuando se verifica
Entonces los valores permanecen estáticos.

---

## Definition of Done — Monitor de Hallazgos/Acciones Correctivas
- Los 5 KPIs calculan correctamente contra datos históricos validados por negocio.
- Usuarios clave de Auditoria aprueban definiciones y reglas de cálculo.
- Existe evidencia de prueba funcional por cada CA.
- La tabla principal muestra todas las columnas definidas.
- Se valida la interacción bidireccional KPI-Grid.
- Se valida exportación a Excel (XLSX) del resultado filtrado.
- Se valida el modal de detalles y drawer de seguimiento.
- Se valida comportamiento responsivo en escritorio y móvil.
- Se valida accesibilidad WCAG 2.1 AA.

---

## Riesgos y supuestos — Monitor de Hallazgos/Acciones Correctivas
- Supuesto: Las auditorías tienen fecha de fin registrada y estados PDCA bien definidos.
- Supuesto: Existe información confiable de seguimientos históricos y evidencias.
- Riesgo: Calidad de datos históricos en auditorías antiguas.
- Riesgo: Volumen de seguimientos puede impactar performance del drawer.

---

## Decisiones de negocio cerradas — Monitor de Hallazgos/Acciones Correctivas
1. Monitor enfocado en acciones correctivas por auditoría, área y responsable.
2. 5 KPIs ejecutivos con filtro bidireccional hacia tabla.
3. Tabla principal con 14 columnas funcionales estándar.
4. Modal de detalles para consulta rápida sin cambiar contexto.
5. Exportación a Excel (XLSX) respetando filtros activos.
6. Accesibilidad WCAG 2.1 AA como requisito transversal.
7. Responsivo para escritorio (≥1024px) y móvil (<768px).
8. Performance: carga ≤3s, refresco ≤2s, animaciones <500ms.
9. Este monitor es el complemento de RF-17 (Monitor consolidado de Auditorías). Juntos conforman el monitor consolidado del requerimiento RF26 del cliente; la separación en dos monitores permite KPIs, filtros y exportaciones independientes por ámbito funcional.

---

# RF-19 — Finalización de hallazgos desde el monitor de acciones correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-18                    |

**Descripción:** El sistema debe permitir finalizar hallazgos elegibles desde el popup de Detalles del monitor de acciones correctivas, cuando todas las acciones correctivas relacionadas estén en estado Cancelado o Finalizado y exista al menos una en estado Finalizado.

---

### US-19.1 — Finalizar hallazgo desde popup de Detalles

Como auditor
Quiero finalizar un hallazgo desde el popup de Detalles
Para cerrar hallazgos cuando sus acciones correctivas relacionadas ya no tienen trabajo pendiente.

**CA-19.1.1 — Regla de elegibilidad para mostrar acción**
Dado que el usuario abrió el popup de Detalles
Cuando el sistema evalúa un hallazgo en estatus Activo
Entonces muestra la acción Finalizar Hallazgo solo si todas sus acciones correctivas relacionadas están en estatus Cancelado o Finalizado y existe al menos una en estatus Finalizado.

**CA-19.1.2 — No visibilidad en casos no elegibles**
Dado que un hallazgo no cumple la regla de elegibilidad
Cuando se renderiza el popup de Detalles
Entonces la acción Finalizar Hallazgo no se muestra para ese hallazgo.

**CA-19.1.3 — Confirmación de operación**
Dado que el auditor selecciona Finalizar Hallazgo
Cuando inicia la operación
Entonces el sistema muestra un mensaje de confirmación de finalización de hallazgo antes de aplicar cambios.

**CA-19.1.4 — Cambio de estado**
Dado que el hallazgo es elegible y el auditor confirma la operación
Cuando el sistema procesa la solicitud
Entonces el hallazgo cambia únicamente a estatus Finalizado.

**CA-19.1.5 — Trazabilidad en historial de hallazgos**
Dado que la finalización del hallazgo fue exitosa
Cuando se registra la operación
Entonces el sistema guarda el evento en el historial de hallazgos con fecha-hora, usuario ejecutor y origen Monitor de Hallazgos/Acciones Correctivas - Popup de Detalles.

**CA-19.1.6 — Conservación de contexto en monitor**
Dado que la operación finaliza correctamente
Cuando el usuario continúa en el popup y regresa al monitor
Entonces se conservan búsqueda, filtros y ordenamiento activos, reflejando el nuevo estatus del hallazgo.

**CA-19.1.7 — Control de concurrencia**
Dado que el estado del hallazgo cambió por otro usuario antes de confirmar
Cuando el auditor intenta finalizar
Entonces el sistema rechaza la operación, informa que el registro fue actualizado y refresca los datos visibles.

---

# RF-20 — Registro de seguimiento de acciones correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-18                    |

**Descripción:** El sistema debe permitir registrar y consultar seguimiento de acciones correctivas desde el contexto del monitor, incluyendo captura de comentario, evidencia adjunta y navegación entre modal y drawer.

---

### US-20.1 — Registrar un nuevo seguimiento

Como Auditor
Quiero registrar un seguimiento con comentario obligatorio desde el drawer
Para documentar el avance de una acción correctiva en el momento en que ocurre.

**CA-20.1.1**
Dado que el usuario escribe un comentario válido
Cuando hace clic en "Registrar seguimiento"
Entonces el sistema agrega la entrada al inicio del timeline con fecha/hora y usuario autenticado.

**CA-20.1.2**
Dado que el sistema confirma el registro exitoso
Cuando se completa
Entonces muestra toast "Seguimiento registrado" y limpia el formulario.

**CA-20.1.3**
Dado que el campo de comentario está vacío
Cuando el usuario intenta hacer clic en "Registrar seguimiento"
Entonces muestra error "El comentario es obligatorio" y no registra nada.

---

### US-20.2 — Adjuntar evidencia en seguimiento

Como Responsable de Área
Quiero adjuntar un archivo (PDF o imagen) al registrar un seguimiento
Para sustentar el avance con evidencia documental.

**CA-20.2.1**
Dado que el usuario selecciona un PDF o imagen (JPG/PNG)
Cuando el archivo se adjunta
Entonces el sistema muestra el nombre con botón "✕" para quitarlo.

**CA-20.2.2**
Dado que existe una evidencia adjunta
Cuando el usuario registra el seguimiento
Entonces la evidencia queda como link descargable en el timeline.

**CA-20.2.3**
Dado que el usuario intenta adjuntar extensión no permitida
Cuando el sistema valida
Entonces muestra "Tipo de archivo no permitido. Solo PDF e imágenes." y no adjunta.

Nota técnica: Tipos permitidos: PDF, JPG, PNG. Evidencia es opcional; comentario obligatorio.

---

### US-20.3 — Navegar de modal a drawer

Como Auditor Líder o Coordinador de Calidad
Quiero acceder al drawer de seguimiento desde el modal de detalles
Para consultar o registrar seguimientos sin perder el contexto.

**CA-20.3.1**
Dado que el modal "Ver Detalles" está abierto
Cuando el usuario hace clic en "Ver Seguimiento"
Entonces el modal se cierra y el drawer del mismo folio se abre automáticamente.

**CA-20.3.2**
Dado que el drawer se abre desde el modal
Cuando se visualiza
Entonces muestra únicamente los seguimientos de ese folio.

---

# RF-21 — Catálogo de colores para porcentajes de resultados

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-13                    |

**Descripción:** El sistema debe permitir administrar un catálogo de colores por rango porcentual de resultado, segmentado por departamento, para definir de forma parametrizable la semaforización visual de cumplimiento usada en auditorías y monitores.

---

## US-21.1 — Registrar contenedor de catálogo de colores por departamento

Como administrador funcional del módulo
Quiero registrar un contenedor de catálogo de colores por departamento
Para parametrizar los rangos y colores de evaluación sin depender de valores hardcodeados.

**CA-21.1.1**
Dado que el usuario crea un contenedor de catálogo de colores
Cuando captura la clave y descripción
Entonces el sistema valida que ambos datos sean obligatorios y que la clave no se repita.

**CA-21.1.2**
Dado que el usuario define el contenedor
Cuando selecciona la propiedad de visualización del detalle
Entonces el sistema permite configurar el campo de despliegue para los elementos del catálogo.

**CA-21.1.3**
Dado que el usuario guarda el contenedor
Cuando no existe al menos un detalle asociado
Entonces el sistema no permite guardar y muestra validación de captura mínima.

---

## US-21.2 — Registrar detalle de rangos y color

Como administrador funcional del módulo
Quiero registrar renglones de detalle con límites porcentuales y color
Para clasificar resultados por rangos de cumplimiento.

**CA-21.2.1**
Dado que el usuario registra un detalle
Cuando captura el rango porcentual
Entonces el sistema valida límite inferior y superior dentro de 0 a 100.

**CA-21.2.2**
Dado que el usuario registra varios rangos en el mismo departamento
Cuando guarda el detalle
Entonces el sistema valida que no existan traslapes entre rangos activos.

**CA-21.2.3**
Dado que el usuario define un detalle
Cuando captura el color a aplicar
Entonces el sistema exige un identificador de color válido (nombre o código hexadecimal).

**CA-21.2.4**
Dado que el usuario consulta el catálogo
Cuando visualiza los detalles registrados
Entonces observa rango, color y descripción de forma legible y consistente.

---

**Regla transversal:**
La parametrización del catálogo de colores es dato maestro. Su administración se realiza por departamento y su consumo funcional se define en RF-25 (auditoría) y RF-26 (monitores). El sistema recupera únicamente la configuración vigente del departamento del usuario; si no existe configuración para ese departamento, aplica comportamiento controlado (sin color o color neutro) sin bloquear la operación. No se permite lógica de color fija cuando exista configuración vigente.

---

# RF-22 — Configuración de departamento del Auditado para gestión de hallazgos y acciones correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | —                        |

**Descripción:** El sistema debe permitir al Administrador registrar la configuración de departamento por Auditado, definiendo explícitamente desde qué departamento cada Auditado podrá visualizar y gestionar los hallazgos y acciones correctivas que le corresponden. Esta configuración es independiente de la segmentación del Auditor definida en RF-13.

---

## US-22.1 — Registrar configuración de departamento por Auditado

Como Administrador
Quiero registrar el departamento habilitado para cada Auditado en el módulo
Para controlar desde qué departamento puede gestionar los hallazgos y acciones correctivas que le corresponden.

**CA-22.1.1**
Dado que el administrador crea una configuración
Cuando captura la información
Entonces el sistema exige Auditado y Departamento como campos obligatorios.

**CA-22.1.2**
Dado que el administrador intenta registrar una configuración duplicada del mismo Auditado-Departamento
Cuando guarda
Entonces el sistema bloquea el guardado y muestra mensaje de duplicidad.

**CA-22.1.3**
Dado que la configuración es válida
Cuando se guarda
Entonces queda disponible para su consumo en la limitación de grid definida en RF-23.

---

## US-22.2 — Vigencia y efecto de la configuración

Como Administrador
Quiero activar o desactivar la configuración de departamento por Auditado
Para controlar qué Auditados tienen acceso habilitado a sus hallazgos y acciones correctivas.

**CA-22.2.1**
Dado que una configuración está inactiva
Cuando el sistema evalúa el departamento del Auditado
Entonces esa configuración no se considera y el Auditado opera sin departamento habilitado.

**CA-22.2.2**
Dado que el administrador modifica la configuración de un Auditado
Cuando el Auditado refresca su sesión o vuelve a ingresar al módulo
Entonces el sistema aplica el departamento vigente actualizado.

---

**Regla transversal:**
RF-22 define la segmentación departamental del Auditado — es independiente y complementaria a RF-13 (segmentación del Auditor). Su consumo en visualización y limitación de grid se implementa en RF-23. Un Auditado puede tener una sola configuración activa por departamento; si no tiene ninguna configuración activa, aplica el comportamiento definido en US-13.3.

---

# RF-23 — Limitar grid de hallazgos y acciones correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-13, RF-22, RF-18      |

**Descripción:** El sistema debe limitar los registros visibles y gestionables en el grid de Hallazgos y Acciones Correctivas con base en la configuración de departamento del Auditado definida en RF-22, respetando la segmentación departamental del Auditor establecida en RF-13.

---

## US-23.1 — Limitar visualización del grid por configuración vigente

Como Auditado
Quiero ver en el grid solo los registros que me corresponden según mi departamento configurado
Para trabajar únicamente con información bajo mi alcance autorizado.

**CA-23.1.1**
Dado que el Auditado accede al grid
Cuando el sistema carga registros
Entonces muestra únicamente Hallazgos y Acciones Correctivas del departamento configurado en RF-22 para ese Auditado.

**CA-23.1.2**
Dado que el Auditado tiene configuraciones activas en múltiples departamentos
Cuando se carga el grid
Entonces el sistema unifica los alcances autorizados sin duplicar registros.

**CA-23.1.3**
Dado que el Auditado no tiene configuración activa aplicable
Cuando accede al grid
Entonces el sistema muestra vista vacía controlada con mensaje informativo.

---

## US-23.2 — Limitar acciones del grid al departamento autorizado

Como Auditado
Quiero que las acciones del grid operen solo sobre registros de mi departamento autorizado
Para evitar la gestión de registros fuera de mi alcance.

**CA-23.2.1**
Dado que un registro está visible pero pertenece a un departamento no autorizado para el Auditado
Cuando intenta ejecutar una acción operativa
Entonces el sistema bloquea la acción y muestra mensaje de restricción.

**CA-23.2.2**
Dado que el registro pertenece al departamento autorizado del Auditado
Cuando ejecuta una acción permitida
Entonces el sistema permite continuar con el flujo normal.

---

## US-23.3 — Mantener consistencia con filtros y experiencia de usuario

Como Auditado
Quiero que los filtros y conteos del grid se apliquen sobre mi universo autorizado
Para que la navegación y análisis sean consistentes.

**CA-23.3.1**
Dado que el grid está limitado por configuración
Cuando el Auditado aplica filtros, búsqueda u ordenamiento
Entonces las operaciones actúan únicamente sobre registros autorizados y visibles.

**CA-23.3.2**
Dado que se exporta el grid
Cuando el Auditado solicita Excel (XLSX)
Entonces se exportan únicamente los registros dentro del alcance autorizado en esa sesión.

---

**Regla transversal:**
RF-23 consume RF-22 (configuración de departamento del Auditado) y RF-13 (segmentación del Auditor) como fuentes de alcance funcional, sin redefinir sus reglas. En caso de conflicto, prevalece primero la segmentación departamental del Auditor (RF-13) y después la configuración de departamento del Auditado (RF-22).

---

# RF-24 — Reapertura de Acciones Correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | Por definir              |

**Descripción:** El sistema debe permitir reabrir acciones correctivas que se encuentren en estatus Finalizado, para gestionar casos en los que se detecte que la acción no fue efectiva o requiere trabajo adicional. La reapertura debe estar controlada, registrar el motivo y dejar trazabilidad en el historial de la acción.

---

## US-24.1

Como auditor o responsable autorizado, quiero poder reabrir una acción correctiva finalizada, para dar seguimiento a casos donde se detecte reincidencia, insuficiencia o necesidad de ajustes adicionales.

**CA-24.1.1**  
Dado que el usuario visualiza una acción correctiva en estatus Finalizado  
Cuando tiene permisos de reapertura  
Entonces el sistema muestra la opción "Reabrir Acción Correctiva".

**CA-24.1.2**  
Dado que el usuario selecciona la opción de reapertura  
Cuando inicia la operación  
Entonces el sistema solicita de forma obligatoria el motivo de reapertura.

**CA-24.1.3**  
Dado que el campo motivo está vacío  
Cuando el usuario intenta confirmar la reapertura  
Entonces el sistema no permite continuar y muestra mensaje de validación.

**CA-24.1.4**  
Dado que el usuario confirma la reapertura con motivo válido  
Cuando el sistema procesa la solicitud  
Entonces la acción correctiva cambia a estatus Activo y se registra el motivo en el historial.

**CA-24.1.5**  
Dado que la acción fue reabierta  
Cuando el usuario consulta el historial de la acción  
Entonces se visualiza el evento de reapertura con fecha-hora, usuario ejecutor y motivo registrado.

**CA-24.1.6**  
Dado que la acción correctiva ya no está en estatus Finalizado  
Cuando el usuario visualiza la opción  
Entonces la opción de reapertura no está disponible.

---

**Regla transversal:**  
La reapertura de acciones correctivas solo está permitida para registros en estatus Finalizado y requiere captura obligatoria de motivo. Cada reapertura debe quedar registrada en el historial de la acción para garantizar trazabilidad y control de reincidencias.

---

# RF-25 — Aplicación del catálogo de colores en resultados de Auditoría

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-21, RF-14             |

**Descripción:** El sistema debe aplicar el catálogo de colores por rango porcentual en la evaluación de resultados de auditoría, usando la configuración vigente del departamento correspondiente, para estandarizar la interpretación visual del cumplimiento durante el ciclo de la auditoría.

---

## US-25.1 — Calcular color por porcentaje en resultado de auditoría

Como auditor
Quiero que el resultado porcentual de una auditoría muestre color según su rango configurado
Para identificar rápidamente el nivel de cumplimiento alcanzado.

**CA-25.1.1**
Dado que la auditoría tiene un porcentaje de resultado calculado
Cuando el sistema determina su representación visual
Entonces asigna el color del rango que contiene dicho porcentaje en el catálogo del departamento.

**CA-25.1.2**
Dado que el porcentaje corresponde exactamente a un límite de rango
Cuando el sistema evalúa el catálogo
Entonces aplica la regla de frontera definida para evitar ambigüedad (sin doble clasificación).

**CA-25.1.3**
Dado que la auditoría cambia su porcentaje por actualización de evaluación
Cuando se refresca la vista
Entonces el color se recalcula y refleja el nuevo rango aplicable.

---

## US-25.2 — Consistencia visual en vistas de auditoría

Como usuario del módulo
Quiero visualizar el mismo color de resultado en las vistas de auditoría donde aplique
Para mantener una lectura homogénea del cumplimiento.

**CA-25.2.1**
Dado que el resultado se muestra en listado y detalle de auditoría
Cuando el sistema renderiza el porcentaje
Entonces conserva el mismo color para el mismo valor y departamento.

**CA-25.2.2**
Dado que el catálogo vigente del departamento se actualiza
Cuando se vuelve a consultar la auditoría
Entonces se aplica la nueva configuración sin requerir cambios manuales sobre auditorías previas.

---

**Regla transversal:**
RF-25 consume exclusivamente la configuración vigente definida en RF-21 y respetando segmentación departamental de RF-13. La aplicación de color es de visualización funcional y no altera la fórmula de cálculo del porcentaje.

---

# RF-26 — Aplicación del catálogo de colores en monitores de Auditoría y Acciones Correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-21, RF-17, RF-18      |

**Descripción:** El sistema debe aplicar el catálogo de colores por porcentaje en los monitores del módulo (Monitor consolidado de Auditorías y Monitor de Hallazgos/Acciones Correctivas), para homologar la semaforización visual de KPIs, columnas y métricas porcentuales con base en configuración departamental.

---

## US-26.1 — Aplicar color en KPIs porcentuales de monitores

Como auditor o coordinador
Quiero que los KPIs basados en porcentaje muestren color conforme al catálogo vigente
Para interpretar de forma inmediata el nivel de desempeño.

**CA-26.1.1**
Dado que un KPI del monitor representa un porcentaje
Cuando se renderiza su valor
Entonces el sistema aplica el color del rango configurado en el catálogo del departamento.

**CA-26.1.2**
Dado que el usuario aplica filtros en el monitor y cambia el porcentaje del KPI
Cuando se recalcula el indicador
Entonces se recalcula también el color conforme al nuevo valor.

---

## US-26.2 — Aplicar color en columnas porcentuales del grid

Como usuario operativo
Quiero que las columnas porcentuales del grid usen la misma lógica de color
Para asegurar consistencia entre tarjetas y detalle tabular.

**CA-26.2.1**
Dado que el grid contiene una columna de porcentaje aplicable
Cuando se muestra cada registro
Entonces el color de la celda o badge corresponde al rango configurado del departamento.

**CA-26.2.2**
Dado que un mismo porcentaje aparece en KPI y grid bajo el mismo contexto de filtros
Cuando el monitor renderiza ambos componentes
Entonces el color aplicado es consistente entre ambos.

---

## US-26.3 — Comportamiento ante ausencia de configuración

Como usuario del monitor
Quiero que el sistema responda de forma controlada cuando no existe catálogo de colores configurado
Para continuar operando sin errores de visualización.

**CA-26.3.1**
Dado que el departamento no tiene catálogo de colores vigente
Cuando se muestra un porcentaje en monitor
Entonces el sistema aplica estilo neutro controlado y mantiene el valor numérico visible.

**CA-26.3.2**
Dado que falta configuración en el departamento
Cuando el usuario consulta el monitor
Entonces el sistema no bloquea KPI ni grid y conserva filtros, ordenamiento y exportación.

---

**Regla transversal:**
RF-26 estandariza la semaforización de porcentajes en RF-17 y RF-18 consumiendo RF-21. La lógica de color debe ser única por departamento para evitar discrepancias entre KPI, grid y exportaciones visuales.

---

---

# RF-27 — Clasificación de Tipo de Auditoría como programada

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | —                        |

**Descripción:** El catálogo de Tipo de Auditoría debe permitir configurar si las auditorías de ese tipo se consideran "programadas" para efectos de los monitores y KPIs del módulo. Esta configuración determina qué auditorías se contabilizan en los indicadores de planeación sin necesidad de modificar código al agregar nuevos tipos.

---

## US-27.1

Como Administrador, quiero marcar cada Tipo de Auditoría como programada o no, para controlar qué tipos se consideran en los indicadores de planeación del Monitor de Auditorías.

**CA-27.1.1**
Dado que el administrador registra o edita un Tipo de Auditoría
Cuando visualiza el formulario
Entonces el sistema muestra el campo "Es Programada" (checkbox) para indicar si las auditorías de ese tipo se consideran planificadas en calendario.

**CA-27.1.2**
Dado que el campo "Es Programada" está activo en un tipo
Cuando existen auditorías de ese tipo en el sistema
Entonces dichas auditorías son consideradas en el KPI "Auditorías Programadas" del Monitor de Auditorías (RF-17).

**CA-27.1.3**
Dado que el campo "Es Programada" está inactivo en un tipo
Cuando existen auditorías de ese tipo en el sistema
Entonces dichas auditorías no se contabilizan en ningún indicador de planeación del Monitor de Auditorías.

**CA-27.1.4**
Dado que se registra un nuevo Tipo de Auditoría sin especificar el campo
Cuando se guarda el registro
Entonces el valor predeterminado de "Es Programada" es falso, requiriendo confirmación explícita del administrador para activarlo.

---

**Regla transversal:**
El campo "Es Programada" del Tipo de Auditoría es la única fuente de verdad para determinar si una auditoría participa en los KPIs de planeación de RF-17. No se permite lógica de clasificación hardcodeada por nombre o clave del tipo.

---

---

# RF-28 — Clasificación de Tipo de Hallazgo como alto impacto

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | —                        |

**Descripción:** El catálogo de Tipo de Hallazgo debe permitir configurar si los hallazgos de ese tipo se consideran de alto impacto para efectos de los monitores y KPIs del módulo. Esta configuración determina qué tipos se contabilizan en el indicador "Hallazgos Alto Impacto" sin necesidad de modificar código al agregar nuevos tipos.

---

## US-28.1

Como Administrador, quiero marcar cada Tipo de Hallazgo como de alto impacto o no, para controlar qué tipos se consideran en el KPI de hallazgos críticos del Monitor de Hallazgos/Acciones Correctivas.

**CA-28.1.1**
Dado que el administrador registra o edita un Tipo de Hallazgo
Cuando visualiza el formulario
Entonces el sistema muestra el campo "Es Alto Impacto" (checkbox) para indicar si los hallazgos de ese tipo se consideran de alta criticidad en el monitor.

**CA-28.1.2**
Dado que el campo "Es Alto Impacto" está activo en un tipo
Cuando existen hallazgos de ese tipo con estatus Activo o En Ejecución
Entonces dichos hallazgos son considerados en el KPI "Hallazgos Alto Impacto" del Monitor de Hallazgos/Acciones Correctivas (RF-18).

**CA-28.1.3**
Dado que el campo "Es Alto Impacto" está inactivo en un tipo
Cuando existen hallazgos de ese tipo en el sistema
Entonces dichos hallazgos no se contabilizan en el KPI "Hallazgos Alto Impacto".

**CA-28.1.4**
Dado que se registra un nuevo Tipo de Hallazgo sin especificar el campo
Cuando se guarda el registro
Entonces el valor predeterminado de "Es Alto Impacto" es falso, requiriendo confirmación explícita del administrador para activarlo.

---

**Regla transversal:**
El campo "Es Alto Impacto" del Tipo de Hallazgo es la única fuente de verdad para determinar si un hallazgo participa en el KPI de criticidad de RF-18. No se permite lógica de clasificación hardcodeada por nombre o clave del tipo.

---

---

# RF-29 — Auditoría de validación del ciclo PDCA

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-14                    |

**Descripción:** El sistema debe permitir crear una auditoría de validación vinculada a una auditoría anterior, para que el Auditor verifique en campo o documentalmente que las acciones correctivas del ciclo PDCA de la auditoría de origen fueron implementadas correctamente. Los resultados de la validación se documentan como hallazgos propios de la auditoría de validación y no modifican el estado de las ACs originales. La clasificación como auditoría de validación PDCA la determina el campo EsValidacionPDCA del TipoAuditoria, configurado en US-29.4.

---

## US-29.1 — Creación con vínculo a auditoría de origen

Como Auditor
Quiero crear una auditoría de validación vinculada a una auditoría anterior
Para verificar el nivel de implementación de sus acciones correctivas.

**CA-29.1.1**
Dado que el Auditor selecciona un TipoAuditoria con EsValidacionPDCA activo
Cuando visualiza el formulario de creación
Entonces el sistema muestra el campo obligatorio "Auditoría de Origen".

**CA-29.1.2**
Dado que el Auditor despliega el campo "Auditoría de Origen"
Cuando selecciona una opción
Entonces el sistema muestra únicamente auditorías en estado Finalizado dentro del alcance departamental del Auditor (RF-13).

**CA-29.1.3**
Dado que el Auditor selecciona la Auditoría de Origen y guarda el registro
Cuando el sistema confirma la creación
Entonces el vínculo queda establecido y no puede modificarse posteriormente.

**CA-29.1.4**
Dado que la auditoría de validación fue creada con Auditoría de Origen
Cuando el usuario consulta su detalle
Entonces el sistema muestra un panel de solo lectura con folio de origen, área auditada, responsable, auditor, y totales de hallazgos y ACs de la auditoría de origen.

**CA-29.1.5**
Dado que el Auditor intenta guardar el formulario sin seleccionar Auditoría de Origen
Cuando el tipo tiene EsValidacionPDCA activo
Entonces el sistema rechaza el guardado y muestra mensaje de validación obligatoria.

---

## US-29.2 — Registro de resultados de la validación

Como Auditor
Quiero documentar observaciones sobre el estado de implementación de las ACs durante la validación
Para dejar constancia del nivel de cumplimiento sin alterar el estado de las ACs originales.

**CA-29.2.1**
Dado que el Auditor ejecuta la auditoría de validación
Cuando registra hallazgos
Entonces los hallazgos se crean como registros propios de la auditoría de validación, sin modificar el estado de las ACs de la auditoría de origen.

**CA-29.2.2**
Dado que el Auditor registra un hallazgo en la auditoría de validación
Cuando el sistema procesa el registro
Entonces las ACs de la auditoría de origen conservan su estado actual sin ningún cambio.

**CA-29.2.3**
Dado que la auditoría de validación sigue el flujo base (RF-14)
Cuando el Auditor la completa y existen hallazgos abiertos
Entonces el sistema inicia el ciclo PDCA propio de la auditoría de validación conforme a RF-15, de forma independiente a la auditoría de origen.

---

## US-29.3 — Trazabilidad desde la auditoría de origen

Como Auditor o Coordinador
Quiero visualizar desde una auditoría las auditorías de validación que la referencian
Para contar con trazabilidad completa del seguimiento PDCA realizado sobre sus acciones correctivas.

**CA-29.3.1**
Dado que el usuario consulta el detalle de una auditoría en estado Finalizado
Cuando revisa la pantalla
Entonces el sistema muestra una sección "Auditorías de Validación" listando las auditorías que la referencian como origen.

**CA-29.3.2**
Dado que existen auditorías de validación vinculadas a la auditoría
Cuando se muestra la sección
Entonces cada registro muestra folio, fecha, auditor, estado y área auditada de la auditoría de validación.

**CA-29.3.3**
Dado que la auditoría no tiene auditorías de validación vinculadas
Cuando se muestra la sección
Entonces el sistema presenta estado vacío controlado sin error.

---

## US-29.4 — Clasificación del Tipo de Auditoría como validación PDCA

Como Administrador
Quiero marcar cada Tipo de Auditoría como de validación PDCA o no
Para que el sistema habilite el vínculo a una auditoría de origen al crear una auditoría de ese tipo.

**CA-29.4.1**
Dado que el administrador registra o edita un Tipo de Auditoría
Cuando visualiza el formulario
Entonces el sistema muestra el campo "Es Validación PDCA" (checkbox) para indicar si las auditorías de ese tipo tienen como propósito verificar la implementación de acciones correctivas de una auditoría anterior.

**CA-29.4.2**
Dado que el campo "Es Validación PDCA" está activo en un tipo
Cuando el Auditor crea una auditoría de ese tipo
Entonces el sistema habilita y requiere el campo "Auditoría de Origen" definido en US-29.1.

**CA-29.4.3**
Dado que se registra un nuevo Tipo de Auditoría sin especificar el campo
Cuando se guarda el registro
Entonces el valor predeterminado de "Es Validación PDCA" es falso.

---

**Regla transversal:**
La clasificación como auditoría de validación PDCA la determina TipoAuditoria.EsValidacionPDCA, configurado en US-29.4; no se permite lógica hardcodeada por nombre o clave del tipo. El vínculo a la Auditoría de Origen es obligatorio para tipos con EsValidacionPDCA activo e inmutable tras el guardado. Los hallazgos y resultados documentados en la auditoría de validación son independientes del estado de las ACs de la auditoría de origen. La auditoría de validación sigue el mismo flujo base de RF-14 y puede derivar en su propio ciclo PDCA conforme a RF-15.

---

---

# RF-30 — Configuración de días límite para registro de acciones correctivas

| Campo          | Valor                    |
|----------------|--------------------------|
| Prioridad      | Alta                     |
| Estado         | Definición               |
| Dependencias   | RF-11                    |

**Descripción:** El sistema debe permitir configurar, a través de un Contenedor Catalogo, el número de días que tiene el área auditada para registrar acciones correctivas a partir de que la auditoría alcanza el estado Completado. La configuración se establece por departamento auditado y es consumida por la notificación por correo (RF-11) para determinar si se incluye la nota de tiempo límite y qué fecha concreta mostrar.

---

## US-30.1 — Registro del contenedor de catálogo

Como Administrador
Quiero registrar el contenedor de catálogo de días límite PDCA
Para que el sistema tenga una fuente única de configuración por departamento auditado.

**CA-30.1.1**
Dado que el administrador accede al módulo de Catálogos
Cuando navega al catálogo "Días Límite PDCA"
Entonces el sistema muestra el ContenedorCatalogo con clave fija definida por el sistema, editable únicamente en sus detalles.

**CA-30.1.2**
Dado que el administrador visualiza el ContenedorCatalogo
Cuando consulta su configuración
Entonces el campo DetailDisplayProperty está predefinido como "Char1" para mostrar el nombre del departamento en vistas de búsqueda.

---

## US-30.2 — Registro de días límite por departamento auditado

Como Administrador
Quiero registrar un detalle por cada departamento auditado con su respectivo número de días límite
Para controlar el plazo de registro de ACs sin modificar código.

**CA-30.2.1**
Dado que el administrador agrega un detalle al contenedor
Cuando llena el formulario
Entonces el sistema solicita Char1 (obligatorio): clave o nombre del departamento auditado, coincidente con el AreaAuditable de la Auditoría; y Numerico1 (obligatorio): número de días límite, entero mayor a cero.

**CA-30.2.2**
Dado que el administrador intenta guardar un detalle con Numerico1 igual a cero o negativo
Cuando el sistema valida
Entonces rechaza el guardado y muestra mensaje de validación.

**CA-30.2.3**
Dado que ya existe un detalle con el mismo Char1 en el contenedor
Cuando el administrador intenta registrar otro con el mismo valor
Entonces el sistema rechaza el duplicado y muestra mensaje de departamento ya configurado.

**CA-30.2.4**
Dado que el administrador modifica Numerico1 en un detalle existente
Cuando guarda el cambio
Entonces el nuevo valor aplica a correos generados a partir de ese momento; no afecta correos ya enviados.

---

## US-30.3 — Consumo en notificación por correo

Como Sistema
Debo consultar el catálogo de días límite al generar el correo de notificación
Para incluir o excluir la nota de tiempo límite según la configuración del departamento auditado.

**CA-30.3.1**
Dado que el sistema genera el correo de notificación (RF-11) al alcanzar el estado Completado
Cuando busca la configuración de días límite
Entonces consulta el ContenedorCatalogo usando el AreaAuditable de la Auditoría como clave de búsqueda en Char1.

**CA-30.3.2**
Dado que se encuentra un detalle para el departamento auditado
Cuando el sistema construye el correo
Entonces calcula la fecha límite como FechaCompletado + Numerico1 días e incluye la nota en el correo con esa fecha en formato DD/MM/AAAA.

**CA-30.3.3**
Dado que no existe detalle configurado para el departamento auditado
Cuando el sistema construye el correo
Entonces omite la nota de tiempo límite sin mostrar error ni bloquear el envío.

---

**Regla transversal:**
El ContenedorCatalogo de días límite PDCA es la única fuente de verdad para el plazo de registro de ACs. La clave de búsqueda es Char1 del detalle, que debe coincidir exactamente con la clave del AreaAuditable de la Auditoría. Numerico1 debe ser siempre un entero mayor a cero; los valores nulos o no positivos son inválidos. Si no existe configuración para un departamento, el sistema omite la nota en el correo sin bloquear ninguna operación.
