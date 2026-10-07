# Requerimientos Funcionales — Catálogos del sistema CIVENTOR

| Campo   | Valor |
|---------|-------|
| Versión | 2.0 |
| Fecha   | 2026-10-07 |
| Estado  | En definición |
| Módulo  | Backbone — menú **Catálogos** |
| Autor   | Análisis de Negocio |
---

## 1. Propósito del documento

Este documento describe qué deben hacer los catálogos del menú **Catálogos** del sistema CIVENTOR.

Cada catálogo se documenta como **un solo requerimiento funcional** que agrupa sus funcionalidades:

- **Registrar:** dar de alta un elemento nuevo.
- **Editar:** cambiar los datos de un elemento existente.
- **Dar de baja y reactivar:** dejar de usar un elemento sin borrarlo y volver a usarlo después. Según el catálogo, la acción de baja se llama **Baja**, **Deshabilitar** o **Cancelar**.
- **Consultar:** buscar en el listado, filtrar y ver el detalle de un elemento.
- **Funcionalidades propias del catálogo:** por ejemplo, enlazar y desvincular elementos relacionados.

## 2. Alcance del documento

**Incluye:** los requerimientos de los catálogos del sistema CIVENTOR, que soporta la operación del negocio.

**No incluye:**

- La definición, la carga y el mantenimiento del contenido de cada catálogo. De eso se encarga el área operativa.
- El registro, la edición y la baja de certificados de sello digital, sucursales y empleados. Cada uno se describe en el requerimiento de su propio catálogo.
- La elección automática del certificado y del PAC vigentes al timbrar, que se describe en el requerimiento del catálogo de Certificados.

## 3. Cómo leer este documento

Cada catálogo sigue la misma estructura, de lo general a lo particular:

```
RF  Requerimiento funcional del catálogo
├── RN  Reglas de negocio del RF (ordenadas según las HU)
└── HU  Historias de usuario
    └── CA  Criterios de aceptación de la HU
        └── CP  Casos de prueba de cada CA
```

| Nivel | Qué es | Numeración | Ejemplo |
|---|---|---|---|
| **RF** — Requerimiento funcional | La capacidad completa de un catálogo | RF-nn | RF-01 Catálogo de Empresas |
| **RN** — Regla de negocio | Una regla que el sistema siempre debe cumplir dentro del RF | RN-nn (consecutivo en el RF) | RN-12 Razón Social, RFC y Abreviatura no se repiten |
| **HU** — Historia de usuario | Una funcionalidad completa, desde el punto de vista de quien la usa | HU-n | HU-1 Registro de empresa |
| **CA** — Criterio de aceptación | Condición que confirma que la HU funciona. Pertenece a una sola HU | CA-*HU*.*n* | CA-1.5 Razón Social, RFC o Abreviatura repetidos |
| **CP** — Caso de prueba | Ejemplo concreto, con datos, que prueba un solo CA | CP-*HU*.*CA*.*n* | CP-1.5.3 RFC repetido |
| **PD** — Pendiente de definir | Una duda que el negocio debe resolver | PD-nn | PD-09 Roles con permiso |

El número de cada CP indica el CA al que pertenece: **CP-1.5.3** es el tercer caso de prueba del **CA-1.5**, que a su vez pertenece a la **HU-1**.

Los criterios de aceptación y los casos de prueba se escriben en tres pasos:

- **Dado que:** la situación de partida.
- **Cuando:** lo que hace el usuario.
- **Entonces:** lo que el sistema debe hacer.

Cada caso de prueba indica entre paréntesis qué tipo de situación revisa:

| Tipo | Qué revisa |
|---|---|
| Flujo principal | El uso normal, cuando todo sale bien |
| Alternativo | Otra forma válida de llegar al resultado |
| Error | Datos incorrectos o incompletos que el sistema debe rechazar |
| Validación | Que el sistema revise o muestre bien un dato |
| Permisos | Lo que puede o no puede hacer un usuario según su rol |
| Estatus no permitido | Una acción que no aplica por el estatus del registro (por ejemplo, editar una empresa en BAJA) |
| Falta un paso previo | Una acción que aún no se puede hacer (por ejemplo, porque la empresa no se ha guardado o no hay nada seleccionado) |
| Dos usuarios al mismo tiempo | Dos personas cambian el mismo dato casi a la vez |
| Visibilidad | Qué se ve y qué no en pantalla |
| Restricción | Una acción que el sistema nunca permite |

La **prioridad** de cada historia indica su importancia:

- **Indispensable (Must):** sin ella no se puede operar.
- **Importante (Should):** es necesaria, pero se puede operar un tiempo sin ella.

## 4. Glosario

| Término | Significado |
|---|---|
| Backbone | Sistema de administración donde se encuentra el menú **Catálogos**. |
| SAT | Servicio de Administración Tributaria, la autoridad fiscal de México. |
| RFC | Registro Federal de Contribuyentes. Clave fiscal de la empresa ante el SAT. |
| Razón Social | Nombre legal de la empresa. |
| Persona física / moral | Una persona física es un individuo; una persona moral es una sociedad o empresa. |
| Régimen Fiscal | Forma en que la empresa paga impuestos ante el SAT. |
| Régimen Capital | Tipo de sociedad de la empresa (por ejemplo, S.A. de C.V.). |
| CFDI | Comprobante Fiscal Digital por Internet, es decir, la factura electrónica. |
| Uso CFDI | Para qué se usará la factura, según el catálogo del SAT. |
| Certificado de sello digital (CSD) | Archivo que entrega el SAT para firmar las facturas electrónicas de la empresa. Tiene fecha de vencimiento. |
| Timbrar | Enviar una factura para que se certifique y sea válida ante el SAT. |
| PAC | Proveedor Autorizado de Certificación. Es la empresa externa que timbra las facturas. |
| Consulta de timbres del PAC | Proceso del sistema que consulta al PAC la información de timbrado de cada empresa, por su RFC. |
| Forma de pago TRANS | Forma de pago "transferencia" del catálogo del SAT. Define qué formato debe tener un número de cuenta bancaria. |
| CLABE | Clave bancaria de 18 dígitos que se usa para transferencias. |
| Estatus | Situación de un registro: **ACTIVO** (se puede usar) o **BAJA** (ya no se usa, pero se conserva). |
| Enlazar / Desvincular | Enlazar asocia con la empresa un elemento que ya existe (certificado, sucursal o empleado). Desvincular quita esa asociación sin borrar el elemento. |
| Solo lectura | El dato se puede ver, pero no se puede cambiar. |
| Datos de auditoría | Fecha, hora, equipo y usuario del último cambio guardado. |
| Bitácora de cambios | Historial completo de todos los movimientos que se hicieron sobre una empresa (ver la sección 6.3). |
| Equipo | Nombre o dirección IP de la computadora desde donde se hizo un movimiento. |
| Rol | Conjunto de permisos que tiene un usuario. Define qué acciones puede ver y usar. |

## 5. Usuarios que participan

| Usuario | Qué puede hacer |
|-------------|-------------|
| Responsable del catálogo de empresas | Registra, edita y consulta empresas. El sistema controla su acceso con roles de seguridad. Los roles que tienen este permiso están **pendientes de definir** (ver PD-09). |
| Usuario con permiso de baja | Responsable del catálogo cuyo rol le permite dar de baja empresas. Solo este usuario puede usar la acción **Baja**. |
| Usuario con permiso de reactivar | Responsable del catálogo cuyo rol le permite regresar a ACTIVO una empresa que está en BAJA. Solo este usuario puede usar la acción **Reactivar**. |
| Usuario con permiso de enlazar y desvincular | Responsable del catálogo cuyo rol le permite enlazar certificados, sucursales o personal a la empresa, y desvincularlos. Solo este usuario puede usar las acciones **Enlazar** y **Desvincular** de cada lista. |
| Usuario del sistema | Cualquier persona que consulta el catálogo o que elige una empresa desde otras pantallas. |

Los roles concretos de cada permiso están **pendientes de definir** (ver PD-09).

## 6. Conceptos comunes del catálogo

### 6.1 Estatus de una empresa

| Estatus | Qué significa | Cómo se asigna |
|---|---|---|
| ACTIVO | La empresa está vigente y se puede usar en los procesos | Automáticamente, al guardar una empresa nueva o al reactivarla |
| BAJA | La empresa ya no se usa; sus datos se conservan y solo se pueden consultar | Con la acción **Baja** del listado |

### 6.2 Flujo de estados

| Estatus inicial | Estatus final | Qué lo provoca |
|---|---|---|
| (Empresa nueva) | ACTIVO | Guardar la empresa por primera vez |
| ACTIVO | BAJA | Acción Baja, después de confirmar |
| BAJA | ACTIVO | Acción Reactivar, después de confirmar |

No existe ningún otro cambio de estatus. La empresa se crea en ACTIVO, se puede dar de baja y, desde BAJA, se puede reactivar. El ciclo se puede repetir las veces que sea necesario (RN-01).

```mermaid
stateDiagram-v2
    [*] --> ACTIVO: Alta
    ACTIVO --> BAJA: Acción Baja (con confirmación)
    BAJA --> ACTIVO: Acción Reactivar (con confirmación)
```

### 6.3 Bitácora de cambios

La bitácora de cambios es el historial de movimientos de cada empresa. Se muestra en la sección **Bitácora de cambios** del detalle de la empresa.

| Tipo de movimiento | Cuándo se genera | Detalle que registra |
|---|---|---|
| Alta | Al guardar una empresa nueva (HU-1) | Fecha y hora, usuario y equipo |
| Modificación | Al guardar cambios en los datos de la empresa (HU-2) o en sus listas de certificados, sucursales o personal (HU-5 a HU-7) | Fecha y hora, usuario, equipo y, por cada campo que cambió, su valor anterior y el nuevo |
| Baja | Al confirmar la baja (HU-3) | Fecha y hora, usuario, equipo y "Estatus: ACTIVO → BAJA" |
| Reactivación | Al confirmar la reactivación (HU-3) | Fecha y hora, usuario, equipo y "Estatus: BAJA → ACTIVO" |

Las reglas de la bitácora son RN-07 a RN-10.

<a id="indice-requerimientos"></a>
## 7. Índice de requerimientos

<a id="menu-catalogos"></a>
### 7.1 Menú de catálogos

<a id="cat-empresas"></a>
[RF-01 Gestión del catálogo de **Empresas**](#rf-01)

---
---

<a id="rf-01"></a>
# RF-01 — Catálogo de Empresas

| Campo        | Valor |
|--------------|-------|
| Prioridad    | Indispensable (Must) |
| Estado       | En definición |
| Sistema      | Backbone — Catálogos > Empresa |
| Dependencias | Catálogos del SAT (Régimen Fiscal, Uso CFDI, Forma de Pago), catálogos de Ciudad, Estado, País, Régimen Capital y Banco, catálogos de Certificados, Sucursales y Empleados (ver sección 11) |

## Objetivo

Administrar las empresas con las que opera y factura el negocio, de forma que cada empresa exista una sola vez, con datos fiscales válidos ante el SAT, con su información al día y con un historial completo de sus cambios.

## Descripción

El sistema permite al usuario con permiso registrar empresas, mantener sus datos actualizados, darlas de baja sin perder su información y reactivarlas cuando se necesiten. También permite consultar y filtrar el listado de empresas y asociar a cada empresa sus certificados de sello digital, sus sucursales y su personal, que se registran en sus propios catálogos.

Las empresas nunca se borran. Toda operación que se guarda queda registrada en la bitácora de cambios de la empresa, y cada acción está disponible solo para los roles con el permiso correspondiente.

### Datos de la empresa

La pantalla de la empresa se organiza en las secciones **Información General**, **Dirección**, **Contacto** y **Cuenta Beneficiario**. Después vienen las listas **Lista Certificados**, **Lista Sucursales**, **Lista Personales** y la sección **Bitácora de cambios**. El orden y el contenido de cada sección se validan en CA-1.3.

**Campos que captura el usuario**

| Nombre | Descripción | Tipo de dato | Obligatorio | Longitud o formato | Valores permitidos | Observaciones |
|---|---|---|---|---|---|---|
| Abreviatura | Clave corta que identifica a la empresa | Texto | Sí | Máximo 6 caracteres | No se puede repetir entre empresas (RN-12) | Si se usa la opción de duplicar la empresa, este dato no se copia (ver P-03) |
| Razón Social | Nombre fiscal de la empresa | Texto | Sí | De 1 a 254 caracteres; no admite el carácter `\|` | No se puede repetir entre empresas (RN-12) | Es el nombre con el que se elige la empresa en otras pantallas (RN-31). Si se usa la opción de duplicar la empresa, este dato no se copia (ver P-03) |
| RFC | Registro Federal de Contribuyentes | Texto | Sí | Máximo 13 caracteres. Formato del SAT: 3 o 4 letras (A-Z, Ñ, &), 6 dígitos de fecha y 3 caracteres de homoclave | No se puede repetir entre empresas (RN-12) | Si se usa la opción de duplicar la empresa, este dato no se copia (ver P-03). Ver PD-05 y PD-13 |
| Tipo de Persona | Tipo de persona fiscal | Lista de opciones | Pendiente de definir (ver PD-06) | No aplica | FÍSICA, MORAL | Al cambiarlo se borra el Régimen Fiscal elegido (RN-17) |
| Régimen Fiscal | Régimen fiscal ante el SAT | Lista de opciones (catálogo) | Sí | No aplica | Regímenes activos que corresponden al Tipo de Persona (RN-15) | Al cambiarlo se borra el Uso CFDI elegido (RN-17) |
| Uso CFDI | Uso de CFDI de la empresa | Lista de opciones (catálogo) | Sí, solo al crear la empresa | No aplica | Usos activos del Régimen Fiscal elegido que aplican al Tipo de Persona (RN-16) | Ver PD-02 |
| Régimen Capital | Régimen de capital de la sociedad | Lista de opciones (catálogo) | Sí | No aplica | Regímenes de capital activos (RN-14) | |
| F. Registro | Fecha de registro de la empresa | Fecha | No | Fecha | Pendiente de definir (ver P-12) | |
| Calle | Calle del domicilio fiscal | Texto | No | Máximo 80 caracteres | Libre | |
| No. Exterior | Número exterior | Texto | No | Máximo 20 caracteres | Libre | |
| No. Interior | Número interior | Texto | No | Máximo 20 caracteres | Libre | |
| Colonia | Colonia | Texto | No | Máximo 60 caracteres | Libre | |
| Ciudad | Ciudad del domicilio | Lista de opciones (catálogo) | No | No aplica | Catálogo de ciudades | Al elegirla se llenan solos Estado y País (RN-18) |
| Estado | Estado del domicilio | Lista de opciones (catálogo) | No | No aplica | El de la ciudad elegida | No se puede editar |
| País | País del domicilio | Lista de opciones (catálogo) | No | No aplica | El del estado | No se puede editar. Al crear una empresa aparece "México" |
| C.P. | Código postal | Texto | Sí | Exactamente 5 dígitos | Solo números del 0 al 9 | |
| Email | Correo de contacto | Texto | No | Máximo 60 caracteres, con formato de correo válido | Libre | Se guarda en minúsculas (RN-19) |
| Teléfono | Teléfono de contacto | Texto | No | Máximo 25 caracteres | Libre | No se valida el formato |
| Banco | Banco de la cuenta beneficiaria | Lista de opciones (catálogo) | No | No aplica | Catálogo de bancos | No aparece en el listado (RN-28) |
| No. Cuenta | Número de la cuenta beneficiaria | Texto | No | Máximo 100 caracteres; debe tener el formato de cuenta que indica la forma de pago TRANS del SAT | Según ese formato | No aparece en el listado (RN-28). Ver PD-10 |

**Campos que llena el sistema**

| Nombre | Descripción | Tipo de dato | Observaciones |
|---|---|---|---|
| Estatus | Situación de la empresa | Lista | ACTIVO o BAJA. No se captura. Ver la sección 6.1 y PD-07 |
| Fecha de estatus | Fecha y hora del último cambio de estatus | Fecha y hora | Automática (RN-24) |
| Baja por | Usuario que dio de baja la empresa | Usuario | No se muestra en pantalla; se llena al dar de baja (RN-24) |
| Reactivado por | Usuario que reactivó la empresa, con la fecha y hora | Usuario, fecha y hora | No se muestra en pantalla; se llena al reactivar (RN-24). Ver PD-14 |
| Datos de auditoría | Fecha y hora de la última modificación, equipo o dirección IP desde donde se hizo, y usuario | Varios | Automáticos al guardar (RN-06) |

**Listas de detalle**

| Lista | Contenido | Observaciones |
|---|---|---|
| Lista Certificados | Certificados de sello digital enlazados a la empresa: No. Certificado, F. Expiración y Estatus | Se agregan con Enlazar y se quitan con Desvincular (HU-5). Los certificados se registran en su propio catálogo |
| Lista Sucursales | Sucursales enlazadas a la empresa: Abreviatura, Nombre, Tipo y Estatus | Se agregan con Enlazar y se quitan con Desvincular (HU-6). Las sucursales se registran en su propio catálogo |
| Lista Personales | Empleados enlazados a la empresa: No. Nómina, Nombre completo, Puesto y Estatus | Se agregan con Enlazar y se quitan con Desvincular (HU-7). Los empleados se registran en su propio catálogo |
| Bitácora de cambios | Movimientos de alta, modificación, baja y reactivación de la empresa | Solo lectura. Ver la sección 6.3 |

### Cómo se ve en pantalla

- **Listado de empresas:** tiene un buscador, los filtros **Todas**, **Activas** y **Baja**, y las columnas Abreviatura, Razón Social, RFC, Régimen Capital, Teléfono, C.P. y Estatus. Las empresas en BAJA aparecen resaltadas.
- **Barra de botones del listado:** contiene las acciones **Baja** y **Reactivar**, que nunca están disponibles al mismo tiempo para la misma empresa (RN-22, RN-23).
- **Barra de cada lista de detalle:** contiene las acciones **Enlazar** y **Desvincular**. Enlazar abre una lista para elegir uno o varios elementos; Desvincular solo se activa cuando hay elementos seleccionados (RN-32, RN-33).

## Reglas de negocio

Las reglas de negocio aplican a todo el catálogo. Se agrupan en reglas generales y después en el orden de las historias de usuario.

### Reglas generales del catálogo

**RN-01 — Ciclo de estatus.** Una empresa solo puede estar en ACTIVO o en BAJA. Toda empresa nueva queda en ACTIVO. Solo pasa a BAJA con la acción Baja y solo regresa a ACTIVO con la acción Reactivar; no existe otra forma de cambiar su estatus. El ciclo se puede repetir. *Se valida en: HU-1, HU-3.*

**RN-02 — Sin eliminación.** No se permite eliminar una empresa. Las empresas dadas de baja conservan todos sus datos y siguen disponibles para consulta. *Se valida en: HU-3.*

**RN-03 — Empresa en BAJA en solo lectura.** Una empresa en BAJA no se puede editar ni se pueden enlazar o desvincular sus certificados, sucursales o personal. La única acción disponible sobre ella es Reactivar. *Se valida en: HU-2, HU-3, HU-5, HU-6, HU-7.*

**RN-04 — Acciones por rol.** Las acciones de alta, edición, baja, reactivación, enlace y desvinculación solo están disponibles para los roles que tengan el permiso correspondiente. A un usuario sin el permiso, el sistema no le ofrece la acción. Los roles están pendientes de definir (PD-09). *Se valida en: HU-1, HU-2, HU-3, HU-5, HU-6, HU-7.*

**RN-05 — Confirmación de acciones.** Las acciones Baja, Reactivar y Desvincular siempre piden confirmación. Si el usuario cancela la confirmación, no se hace ningún cambio. *Se valida en: HU-3, HU-5, HU-6, HU-7.*

**RN-06 — Datos de auditoría.** Cada vez que se guarda una empresa se registran la fecha y hora, el equipo y el usuario del cambio. *Se valida en: HU-1, HU-2.*

**RN-07 — Registro en la bitácora.** Cada alta, modificación, baja y reactivación que se guarda con éxito agrega un registro a la bitácora de cambios de la empresa, con el tipo de movimiento, la fecha y hora, el usuario y el equipo. Los enlaces y desvinculaciones de certificados, sucursales y personal se registran como Modificación. *Se valida en: HU-1, HU-2, HU-3, HU-5, HU-6, HU-7.*

**RN-08 — Detalle del registro de la bitácora.**
- Un registro de Modificación incluye, por cada campo que cambió, el nombre del campo, el valor anterior y el valor nuevo. Los campos que no cambiaron no aparecen.
- Si en un mismo guardado cambian varios campos, se genera un solo registro.
- Si se guarda sin haber cambiado ningún campo, no se genera registro.
- Un registro de Baja o de Reactivación incluye el campo Estatus con su valor anterior y el nuevo.

*Se valida en: HU-2, HU-3.*

**RN-09 — Operaciones no guardadas.** Una operación que no se guarda no genera registro en la bitácora. Esto incluye las operaciones rechazadas por una validación o por falta de permiso, las que se cancelan en la confirmación y los cambios que se descartan sin guardar. *Se valida en: HU-1, HU-2, HU-3, HU-5, HU-6, HU-7.*

**RN-10 — Bitácora en solo lectura.** Los registros de la bitácora no se pueden modificar ni eliminar. Se conservan aunque la empresa pase a BAJA o se reactive, y se muestran del más reciente al más antiguo. *Se valida en: HU-3, HU-4.*

### Reglas de registro de empresa (HU-1)

**RN-11 — Campos obligatorios.** Abreviatura, Razón Social, RFC, Régimen Fiscal, Régimen Capital y C.P. son obligatorios. El Uso CFDI es obligatorio solo al crear la empresa; al editarla no se exige (ver PD-02). *Se valida en: HU-1, HU-2.*

**RN-12 — Datos únicos.** La Razón Social, el RFC y la Abreviatura no se pueden repetir entre empresas, estén en ACTIVO o en BAJA (ver P-02). *Se valida en: HU-1, HU-2.*

**RN-13 — Formatos y longitudes.**
- Abreviatura: máximo 6 caracteres.
- Razón Social: de 1 a 254 caracteres, sin el carácter `|`.
- RFC: máximo 13 caracteres, con el formato del SAT: 3 o 4 letras (A-Z, Ñ, &), 6 dígitos de fecha y 3 caracteres de homoclave.
- C.P.: exactamente 5 dígitos numéricos.

El resto de las longitudes está en la tabla "Campos que captura el usuario". *Se valida en: HU-1.*

**RN-14 — Régimen Capital activo.** Solo se pueden elegir regímenes de capital activos. *Sin CA propio (ver P-10).*

**RN-15 — Régimen Fiscal según el Tipo de Persona.** La lista de Régimen Fiscal solo muestra regímenes activos del Tipo de Persona elegido: los de persona física si es FÍSICA, y los de persona moral si es MORAL o si todavía no se elige un Tipo de Persona. *Se valida en: HU-1.*

**RN-16 — Uso CFDI según el régimen.** La lista de Uso CFDI solo muestra usos activos del Régimen Fiscal elegido que aplican al Tipo de Persona. *Se valida en: HU-1.*

**RN-17 — Datos dependientes.** Al cambiar el Tipo de Persona se borra el Régimen Fiscal elegido. Al cambiar el Régimen Fiscal se borra el Uso CFDI elegido. *Se valida en: HU-1, HU-2.*

**RN-18 — Domicilio.** Al elegir una Ciudad, el Estado y el País se llenan solos y no se pueden editar. Al crear una empresa aparece el País "México". Solo el C.P. es obligatorio; el resto del domicilio es opcional. *Se valida en: HU-1.*

**RN-19 — Email.** El Email es opcional. Si se captura, debe tener formato de correo válido y se guarda en minúsculas. *Se valida en: HU-1.*

**RN-20 — Número de cuenta.** El No. Cuenta es opcional. Si se captura, debe tener el formato de cuenta que indica la forma de pago TRANS. Si esa forma de pago no existe en el sistema, la cuenta no se revisa (ver PD-10). *Se valida en: HU-1.*

### Reglas de edición (HU-2)

**RN-21 — Edición de empresas activas.** Solo se pueden editar empresas en ACTIVO. Al editar se aplican las mismas reglas de captura del alta (RN-11 a RN-20), salvo que el Uso CFDI no es obligatorio (RN-11). *Se valida en: HU-2.*

### Reglas de baja y reactivación (HU-3)

**RN-22 — Disponibilidad de Baja.** La acción Baja solo está disponible en el listado, para una sola empresa seleccionada, que esté en ACTIVO y ya guardada, y si el usuario tiene permiso de baja. Pide confirmación con el mensaje "¿Realmente desea dar de Baja el elemento seleccionado?". *Se valida en: HU-3.*

**RN-23 — Disponibilidad de Reactivar.** La acción Reactivar solo está disponible en el listado, para una sola empresa seleccionada, que esté en BAJA, y si el usuario tiene permiso de reactivar. Pide confirmación con el mensaje "¿Realmente desea Reactivar el elemento seleccionado?". Baja y Reactivar nunca están disponibles al mismo tiempo para la misma empresa. *Se valida en: HU-3.*

**RN-24 — Efecto de confirmar.** Al confirmar la baja o la reactivación, el estatus cambia, se actualiza la Fecha de estatus y se registra el usuario que hizo la acción (Baja por o Reactivado por) con la fecha y hora. *Se valida en: HU-3.*

**RN-25 — Disponibilidad de la empresa según su estatus.** Una empresa en BAJA queda en solo lectura (RN-03), se resalta en el listado (RN-30) y deja de estar disponible en los procesos. Al reactivarse vuelve a poder editarse, deja de resaltarse, aparece en el filtro Activas y se puede elegir en otras pantallas (ver P-08). *Se valida en: HU-3.*

**RN-26 — Consulta de timbres del PAC.** La consulta de timbres del PAC solo considera empresas en ACTIVO, por su RFC. Una empresa en BAJA deja de consultarse y vuelve a consultarse al reactivarse. *Se valida en: HU-3.*

**RN-27 — Conservación de la información.** La reactivación conserva todos los datos que la empresa tenía al darse de baja: datos fiscales, domicilio, contacto, cuenta beneficiaria, certificados, sucursales y personal asignado. Ni la baja ni la reactivación cambian el estatus de sus sucursales ni de su personal (ver PD-03). *Se valida en: HU-3.*

### Reglas de consulta y filtros (HU-4)

**RN-28 — Columnas del listado.** El listado muestra Abreviatura, Razón Social, RFC, Régimen Capital, Teléfono, C.P. y Estatus. Banco y No. Cuenta no se muestran. *Se valida en: HU-4.*

**RN-29 — Búsqueda y filtros.** El listado tiene un buscador y los filtros Todas, Activas y Baja. Al abrir el catálogo está seleccionado el filtro "Todas" (ver P-06). *Se valida en: HU-4.*

**RN-30 — Empresas en BAJA resaltadas.** Las empresas en BAJA se resaltan en el listado. *Se valida en: HU-3, HU-4.*

**RN-31 — Identificación en otras pantallas.** En las pantallas que piden elegir una empresa, la empresa se identifica por su Razón Social. *Se valida en: HU-4.*

### Reglas comunes de las listas de certificados, sucursales y personal (HU-5, HU-6 y HU-7)

**RN-32 — Disponibilidad de Enlazar.** La acción Enlazar de cada lista solo está disponible en una empresa en ACTIVO ya guardada, y solo si el usuario tiene permiso para enlazar en esa lista. Permite elegir uno o varios elementos. *Se valida en: HU-5, HU-6, HU-7.*

**RN-33 — Disponibilidad de Desvincular.** La acción Desvincular de cada lista solo está disponible en una empresa en ACTIVO, con uno o más elementos seleccionados, y solo si el usuario tiene permiso para desvincular en esa lista. Pide confirmación con el mensaje propio de la lista (tabla siguiente). *Se valida en: HU-5, HU-6, HU-7.*

**RN-34 — Aplicación al guardar.** Los enlaces y desvinculaciones se aplican al guardar la empresa. Si el usuario cierra la lista sin elegir o descarta los cambios de la empresa sin guardarlos, la lista no cambia. *Se valida en: HU-5, HU-6, HU-7.*

**RN-35 — Una sola empresa por elemento.** Un certificado, una sucursal o un empleado solo puede estar enlazado a una empresa a la vez. Para pasarlo a otra empresa, primero se desvincula de la actual. Si al guardar el elemento ya está enlazado a otra empresa, el sistema muestra el mensaje propio de la lista y no guarda. *Se valida en: HU-5, HU-6, HU-7.*

**RN-36 — El elemento se conserva.** Enlazar o desvincular un elemento no lo borra ni cambia sus datos ni su estatus; en los certificados, tampoco cambia sus PAC. Un elemento desvinculado queda sin empresa y vuelve a estar disponible para enlazarse si cumple las condiciones de su lista. *Se valida en: HU-5, HU-6, HU-7.*

**RN-37 — Registro en la bitácora.** Cada enlace o desvinculación que se guarda agrega a la bitácora un registro de tipo Modificación con el campo de la lista:
- al enlazar: valor anterior vacío y valor nuevo con el identificador del elemento;
- al desvincular: valor anterior con el identificador del elemento y valor nuevo vacío.

Si en un mismo guardado cambian varios elementos, se genera un solo registro, con un detalle por cada elemento. *Se valida en: HU-5, HU-6, HU-7.*

**RN-38 — Documentos ya registrados.** Desvincular un elemento no cambia los documentos ni las operaciones que ya se registraron con él. *Se valida en: HU-5, HU-6, HU-7.*

Valores propios de cada lista:

| Lista | Campo en la bitácora | Identificador del elemento | Confirmación de Desvincular | Mensaje si ya está enlazado a otra empresa |
|---|---|---|---|---|
| Certificados | Certificados | No. Certificado | "¿Realmente desea desvincular de la empresa el certificado seleccionado?" | "El certificado {No. Certificado} ya está enlazado a la empresa {Razón Social}." |
| Sucursales | Sucursales | Abreviatura - Nombre | "¿Realmente desea desvincular de la empresa la sucursal seleccionada?" | "La sucursal {Nombre} ya está enlazada a la empresa {Razón Social}." |
| Personal | Personal | No. Nómina - Nombre completo | "¿Realmente desea desvincular de la empresa al empleado seleccionado?" | "El empleado {Nombre completo} ya está asignado a la empresa {Razón Social}." |

### Reglas de certificados del SAT (HU-5)

**RN-39 — Certificados que se pueden enlazar.** La lista de Enlazar solo ofrece certificados que cumplen todo lo siguiente:
- están registrados en el catálogo de Certificados;
- están en estatus Activo;
- no están vencidos;
- su RFC es el mismo que el RFC de la empresa;
- no están enlazados a ninguna empresa.

*Se valida en: HU-5.*

**RN-40 — RFC del certificado.** El RFC del certificado debe ser igual al RFC de la empresa. Si al guardar no coinciden, el sistema muestra "El certificado {No. Certificado} no corresponde al RFC de la empresa." y no guarda (ver P-04). *Se valida en: HU-5.*

**RN-41 — Aviso de empresa sin certificado vigente.** Si después de desvincular la empresa se queda sin certificados activos y no vencidos, la confirmación agrega el aviso "La empresa se quedará sin un certificado vigente y no podrá timbrar." El usuario puede continuar o cancelar (ver PD-17). *Se valida en: HU-5.*

### Reglas de sucursales (HU-6)

**RN-42 — Sucursales que se pueden enlazar.** La lista de Enlazar solo ofrece sucursales que cumplen todo lo siguiente:
- están registradas en el catálogo de Sucursales;
- están en estatus ACTIVO;
- no están enlazadas a ninguna empresa.

*Se valida en: HU-6.*

**RN-43 — Personal de la sucursal desvinculada.** Al desvincularse, la sucursal pierde su personal asignado y su Responsable, porque los dos deben ser empleados de la empresa. Los empleados siguen asignados a la empresa. Si la sucursal tiene personal o Responsable, la confirmación agrega el aviso "La sucursal perderá su personal asignado y su responsable." *Se valida en: HU-6.*

**RN-44 — Sucursal sin empresa.** Una sucursal sin empresa no se puede elegir en los procesos hasta que se enlace a una empresa (ver PD-19). *Se valida en: HU-6.*

### Reglas de personal (HU-7)

**RN-45 — Empleados que se pueden enlazar.** La lista de Enlazar solo ofrece empleados que cumplen todo lo siguiente:
- están registrados en el catálogo de Empleados;
- están en estatus ACTIVO;
- no están asignados a ninguna empresa.

*Se valida en: HU-7.*

**RN-46 — Enlazar no asigna sucursal.** Enlazar a un empleado no lo asigna a ninguna sucursal. Asignar empleados a una sucursal se hace desde la sucursal. *Se valida en: HU-7.*

**RN-47 — Salida de las sucursales.** Al desvincularse de la empresa, el empleado se quita de las sucursales de esa empresa en las que estaba asignado. *Se valida en: HU-7.*

**RN-48 — Empleado responsable.** No se puede desvincular a un empleado que es Responsable de una sucursal o de otro empleado de la empresa. El sistema muestra "El empleado {Nombre completo} es responsable de {Sucursal o empleado}; cambie el responsable antes de desvincularlo." y no guarda. *Se valida en: HU-7.*

**Relación entre reglas:** como el RFC de la empresa es único (RN-12) y un certificado solo se enlaza a una empresa con su mismo RFC (RN-39, RN-40), un certificado no puede quedar enlazado a dos empresas distintas. Una sucursal solo puede tener personal y Responsable asignados a su misma empresa; por eso aplican RN-43, RN-47 y RN-48.

---

<a id="hu-1"></a>
## HU-1 — Registro de empresa

| Campo | Valor |
|---|---|
| Prioridad | Indispensable (Must) |
| Objetivo de negocio | OBJ-1 Empresa emisora válida ante el SAT; OBJ-2 Datos de contacto y pago correctos |
| Reglas que aplica | RN-01, RN-04, RN-06, RN-07, RN-09, RN-11 a RN-20 |

Como responsable del catálogo de empresas, quiero registrar una empresa nueva con sus datos fiscales, de domicilio, de contacto y de cuenta beneficiaria, para poder emitir documentos y operar procesos a su nombre.

### Criterios de aceptación

**CA-1.1 — Registrar empresa con datos válidos**
Dado que el responsable captura Abreviatura, Razón Social, RFC, Régimen Fiscal, Uso CFDI, Régimen Capital y C.P. válidos y que no existen en otra empresa
Cuando guarda
Entonces el sistema crea la empresa en estatus ACTIVO.

**CA-1.2 — Valores iniciales de una empresa nueva**
Dado que el responsable elige Nuevo en el catálogo de empresas
Cuando se muestra la pantalla de captura
Entonces el País aparece como "México" y el Estatus como ACTIVO.

**CA-1.3 — Secciones de la pantalla de captura**
Dado que el responsable abre la pantalla de captura de una empresa
Cuando se muestra la pantalla
Entonces los campos aparecen agrupados en secciones con título propio, en este orden, y cada campo aparece solo en su sección:

| Orden | Sección | Contenido |
|---|---|---|
| 1 | Información General | Abreviatura, Razón Social, RFC, Tipo de Persona, Régimen Fiscal, Uso CFDI, Régimen Capital, F. Registro y Estatus |
| 2 | Dirección | Calle, No. Exterior, No. Interior, Colonia, Ciudad, Estado, País y C.P. |
| 3 | Contacto | Email y Teléfono |
| 4 | Cuenta Beneficiario | Banco y No. Cuenta |
| 5 | Lista Certificados | Certificados de sello digital enlazados (HU-5) |
| 6 | Lista Sucursales | Sucursales enlazadas (HU-6) |
| 7 | Lista Personales | Empleados enlazados (HU-7) |
| 8 | Bitácora de cambios | Movimientos de la empresa, en solo lectura (sección 6.3) |

**CA-1.4 — Campo obligatorio vacío**
Dado que el responsable deja vacío alguno de los campos Abreviatura, Razón Social, RFC, Régimen Fiscal, Uso CFDI, Régimen Capital o C.P.
Cuando guarda
Entonces el sistema muestra el mensaje de campo requerido correspondiente y no guarda.

**CA-1.5 — Razón Social, RFC o Abreviatura repetidos**
Dado que ya existe otra empresa, en ACTIVO o en BAJA, con la misma Razón Social, el mismo RFC o la misma Abreviatura
Cuando el responsable guarda la nueva empresa
Entonces el sistema muestra el mensaje de valor repetido correspondiente y no guarda.

**CA-1.6 — Longitud o formato inválido**
Dado que la Abreviatura tiene más de 6 caracteres, la Razón Social contiene el carácter `|`, el RFC no cumple el formato del SAT, o el C.P. no tiene exactamente 5 dígitos
Cuando el responsable captura o guarda
Entonces el sistema no acepta el valor o muestra el mensaje de formato inválido correspondiente, y no guarda.

**CA-1.7 — Regímenes fiscales según el Tipo de Persona**
Dado que el Tipo de Persona es FÍSICA o MORAL
Cuando el responsable abre la lista de Régimen Fiscal
Entonces solo ve regímenes activos que aplican a ese Tipo de Persona.

**CA-1.8 — Cambio de Tipo de Persona**
Dado que el responsable ya eligió un Régimen Fiscal
Cuando cambia el Tipo de Persona
Entonces el Régimen Fiscal queda vacío.

**CA-1.9 — Usos de CFDI del régimen**
Dado que el responsable eligió un Régimen Fiscal
Cuando abre la lista de Uso CFDI
Entonces solo ve usos activos de ese régimen que aplican al Tipo de Persona.

**CA-1.10 — Cambio de Régimen Fiscal**
Dado que el responsable ya eligió un Uso CFDI
Cuando cambia el Régimen Fiscal
Entonces el Uso CFDI queda vacío.

**CA-1.11 — Estado y país automáticos**
Dado que el responsable está capturando el domicilio
Cuando elige una Ciudad
Entonces el Estado y el País se llenan con los que corresponden a esa ciudad y no se pueden editar.

**CA-1.12 — Domicilio parcial**
Dado que el responsable captura solo el C.P. y deja vacíos Calle, números, Colonia y Ciudad
Cuando guarda con el resto de los datos obligatorios válidos
Entonces el sistema guarda la empresa.

**CA-1.13 — Email válido**
Dado que el responsable captura un Email con formato de correo válido
Cuando guarda
Entonces el sistema lo acepta y lo guarda en minúsculas.

**CA-1.14 — Email inválido**
Dado que el responsable captura un Email sin formato de correo
Cuando guarda
Entonces el sistema muestra "El Email no posee un formato válido." y no guarda.

**CA-1.15 — Email vacío**
Dado que el responsable deja vacío el Email
Cuando guarda
Entonces el sistema no valida el correo y guarda la empresa.

**CA-1.16 — Número de cuenta válido**
Dado que existe la forma de pago TRANS y el responsable captura un No. Cuenta con el formato que ella indica
Cuando guarda
Entonces el sistema acepta la cuenta.

**CA-1.17 — Número de cuenta inválido**
Dado que existe la forma de pago TRANS y el responsable captura un No. Cuenta que no tiene el formato que ella indica
Cuando guarda
Entonces el sistema muestra "El Número de Cuenta especificado no es válido de acuerdo al patrón indicado en el catálogo de FormaPago del SAT." y no guarda.

**CA-1.18 — Número de cuenta sin validar**
Dado que el No. Cuenta está vacío, o no existe la forma de pago TRANS
Cuando el responsable guarda
Entonces el sistema no valida la cuenta y guarda la empresa.

**CA-1.19 — Datos de auditoría del alta**
Dado que el responsable guardó una empresa nueva con éxito
Cuando se revisan los datos de auditoría de la empresa
Entonces aparecen la fecha y hora, el equipo y el usuario que hizo el alta.

**CA-1.20 — Alta registrada en la bitácora**
Dado que el responsable guardó una empresa nueva con éxito
Cuando consulta la sección Bitácora de cambios de la empresa
Entonces aparece un único registro de tipo Alta con la fecha y hora, el usuario y el equipo del alta.

**CA-1.21 — Alta rechazada no se registra**
Dado que el responsable intenta guardar una empresa nueva que no cumple una regla del alta
Cuando el sistema rechaza el guardado
Entonces no se crea la empresa ni ningún registro en la bitácora.

**CA-1.22 — Usuario sin permiso de alta**
Dado que el rol del usuario no le permite crear empresas
Cuando abre el catálogo de empresas
Entonces el sistema no le ofrece la opción de crear una empresa nueva.

### Casos de prueba

**CP-1.1.1 — Alta exitosa de empresa (flujo principal)**
Verifica: CA-1.1 · RN-01, RN-11
Dado que no existe ninguna empresa con Abreviatura "GMAL", Razón Social "GRUPO MALIA SA DE CV" ni RFC "GMA010101AB1"
Cuando el responsable captura esos datos, elige Tipo de Persona MORAL, un Régimen Fiscal, un Uso CFDI, un Régimen Capital, el C.P. "20000" y guarda
Entonces el sistema crea la empresa y la muestra con estatus ACTIVO.

**CP-1.1.2 — Alta de persona física (alternativo)**
Verifica: CA-1.1 · RN-01, RN-11
Dado que no existe ninguna empresa con RFC "VERM800101AB1"
Cuando el responsable registra una empresa con Tipo de Persona FÍSICA, ese RFC de 13 caracteres y el resto de los campos obligatorios válidos
Entonces el sistema crea la empresa en estatus ACTIVO.

**CP-1.2.1 — Valores iniciales al crear (validación)**
Verifica: CA-1.2 · RN-01, RN-18
Dado que el responsable está en el listado de empresas
Cuando elige Nuevo
Entonces el campo País muestra "México" y el Estatus muestra ACTIVO.

**CP-1.3.1 — Secciones de la pantalla y su orden (flujo principal)**
Verifica: CA-1.3
Dado que el responsable está en el listado de empresas
Cuando elige Nuevo
Entonces la pantalla muestra, en este orden, las secciones con título "Información General", "Dirección", "Contacto", "Cuenta Beneficiario", "Lista Certificados", "Lista Sucursales", "Lista Personales" y "Bitácora de cambios".

**CP-1.3.2 — Campos de la sección Información General (validación)**
Verifica: CA-1.3
Dado que el responsable abre la pantalla de captura de una empresa nueva
Cuando revisa la sección "Información General"
Entonces encuentra Abreviatura, Razón Social, RFC, Tipo de Persona, Régimen Fiscal, Uso CFDI, Régimen Capital, F. Registro y Estatus, y ninguno de esos campos aparece en otra sección.

**CP-1.3.3 — Campos de la sección Dirección (validación)**
Verifica: CA-1.3
Dado que el responsable abre la pantalla de captura de una empresa nueva
Cuando revisa la sección "Dirección"
Entonces encuentra Calle, No. Exterior, No. Interior, Colonia, Ciudad, Estado, País y C.P., y ninguno de esos campos aparece en otra sección.

**CP-1.3.4 — Campos de las secciones Contacto y Cuenta Beneficiario (validación)**
Verifica: CA-1.3
Dado que el responsable abre la pantalla de captura de una empresa nueva
Cuando revisa las secciones "Contacto" y "Cuenta Beneficiario"
Entonces "Contacto" contiene solo Email y Teléfono, y "Cuenta Beneficiario" contiene solo Banco y No. Cuenta.

**CP-1.3.5 — Listas de una empresa nueva (alternativo)**
Verifica: CA-1.3
Dado que el responsable está creando una empresa que aún no se ha guardado
Cuando revisa las secciones "Lista Certificados", "Lista Sucursales", "Lista Personales" y "Bitácora de cambios"
Entonces las cuatro secciones se muestran con su título y sin registros.

**CP-1.4.1 — Falta la Abreviatura (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable captura todos los campos obligatorios excepto la Abreviatura
Cuando guarda
Entonces el sistema muestra "La Abreviatura es un campo requerido." y no guarda.

**CP-1.4.2 — Falta la Razón Social (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable deja vacía la Razón Social
Cuando guarda
Entonces el sistema muestra "La Razón Social es un campo requerido." y no guarda.

**CP-1.4.3 — Falta el RFC (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable deja vacío el RFC
Cuando guarda
Entonces el sistema muestra "El RFC es un campo requerido." y no guarda.

**CP-1.4.4 — Falta el Régimen Fiscal (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable no elige Régimen Fiscal
Cuando guarda
Entonces el sistema muestra "El Régimen Fiscal es un campo requerido." y no guarda.

**CP-1.4.5 — Falta el Uso CFDI en una empresa nueva (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable está creando una empresa y no elige Uso CFDI
Cuando guarda
Entonces el sistema muestra "Seleccione el uso del CFDI" y no guarda.

**CP-1.4.6 — Falta el Régimen Capital (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable no elige Régimen Capital
Cuando guarda
Entonces el sistema muestra "El Régimen Capital es un campo requerido." y no guarda.

**CP-1.4.7 — Falta el C.P. (error)**
Verifica: CA-1.4 · RN-11
Dado que el responsable deja vacío el C.P.
Cuando guarda
Entonces el sistema muestra "El Código Postal (C.P.) es un campo requerido." y no guarda.

**CP-1.5.1 — Razón Social repetida con empresa activa (validación)**
Verifica: CA-1.5 · RN-12
Dado que existe la empresa "GRUPO MALIA SA DE CV" en estatus ACTIVO
Cuando el responsable intenta registrar otra empresa con esa misma Razón Social
Entonces el sistema muestra "La Razón Social debe de ser único, el mismo valor ya existe." y no guarda.

**CP-1.5.2 — Razón Social repetida con empresa dada de baja (validación)**
Verifica: CA-1.5 · RN-12
Dado que existe la empresa "VICENTE REYES MAGAÑA" en estatus BAJA
Cuando el responsable intenta registrar otra empresa con esa misma Razón Social
Entonces el sistema muestra el mensaje de Razón Social repetida y no guarda.

**CP-1.5.3 — RFC repetido (validación)**
Verifica: CA-1.5 · RN-12
Dado que existe una empresa con RFC "GMA010101AB1"
Cuando el responsable intenta registrar otra empresa con ese RFC
Entonces el sistema muestra "El RFC debe de ser único, el mismo valor ya existe." y no guarda.

**CP-1.5.4 — Abreviatura repetida (validación)**
Verifica: CA-1.5 · RN-12
Dado que existe una empresa con Abreviatura "GMAL"
Cuando el responsable intenta registrar otra empresa con esa Abreviatura
Entonces el sistema muestra "La Abreviatura ya se encuentra registrado en el sistema." y no guarda.

**CP-1.6.1 — Abreviatura de más de 6 caracteres (validación)**
Verifica: CA-1.6 · RN-13
Dado que el responsable está capturando la Abreviatura
Cuando intenta escribir "GRUPOMA" (7 caracteres)
Entonces el campo no admite más de 6 caracteres.

**CP-1.6.2 — Razón Social con carácter no permitido (validación)**
Verifica: CA-1.6 · RN-13
Dado que el responsable captura la Razón Social "GRUPO | MALIA"
Cuando guarda
Entonces el sistema muestra "La Razón Social no contiene un formato válido de acuerdo a la especificación del SAT." y no guarda.

**CP-1.6.3 — RFC con formato inválido (validación)**
Verifica: CA-1.6 · RN-13
Dado que el responsable captura el RFC "12AB0101"
Cuando guarda
Entonces el sistema muestra "El RFC no contiene un formato válido de acuerdo a la especificación del SAT." y no guarda.

**CP-1.6.4 — C.P. de 4 dígitos (validación)**
Verifica: CA-1.6 · RN-13
Dado que el responsable captura el C.P. "2000"
Cuando guarda
Entonces el sistema muestra "El Codigo Postal es inválido." y no guarda.

**CP-1.6.5 — C.P. con letras (validación)**
Verifica: CA-1.6 · RN-13
Dado que el responsable está capturando el C.P.
Cuando intenta escribir "20A00"
Entonces el campo no acepta la letra.

**CP-1.7.1 — Regímenes para persona física (flujo principal)**
Verifica: CA-1.7 · RN-15
Dado que el responsable elige Tipo de Persona FÍSICA
Cuando abre la lista de Régimen Fiscal
Entonces solo aparecen regímenes activos marcados para persona física.

**CP-1.7.2 — Régimen inactivo no aparece (validación)**
Verifica: CA-1.7 · RN-15
Dado que en el catálogo de Régimen Fiscal hay un régimen de persona física en estatus inactivo
Cuando el responsable, con Tipo de Persona FÍSICA, abre la lista de Régimen Fiscal
Entonces ese régimen no aparece.

**CP-1.7.3 — Regímenes para persona moral (flujo principal)**
Verifica: CA-1.7 · RN-15
Dado que el responsable elige Tipo de Persona MORAL
Cuando abre la lista de Régimen Fiscal
Entonces solo aparecen regímenes activos marcados para persona moral.

**CP-1.8.1 — Cambio de MORAL a FÍSICA borra el régimen (alternativo)**
Verifica: CA-1.8 · RN-17
Dado que la empresa tiene Tipo de Persona MORAL y un Régimen Fiscal elegido
Cuando el responsable cambia el Tipo de Persona a FÍSICA
Entonces el Régimen Fiscal queda vacío y la lista solo ofrece regímenes de persona física.

**CP-1.8.2 — Guardar tras borrar el régimen (error)**
Verifica: CA-1.8 · RN-17, RN-11
Dado que el responsable cambió el Tipo de Persona y el Régimen Fiscal quedó vacío
Cuando guarda sin elegir un nuevo régimen
Entonces el sistema muestra "El Régimen Fiscal es un campo requerido." y no guarda.

**CP-1.9.1 — Usos de CFDI del régimen (flujo principal)**
Verifica: CA-1.9 · RN-16
Dado que el responsable eligió Tipo de Persona MORAL y un Régimen Fiscal
Cuando abre la lista de Uso CFDI
Entonces solo aparecen usos activos ligados a ese régimen y que aplican a persona moral.

**CP-1.9.2 — Uso de CFDI inactivo no aparece (validación)**
Verifica: CA-1.9 · RN-16
Dado que un uso de CFDI ligado al régimen elegido está inactivo
Cuando el responsable abre la lista de Uso CFDI
Entonces ese uso no aparece.

**CP-1.10.1 — Cambio de régimen borra el uso (alternativo)**
Verifica: CA-1.10 · RN-17
Dado que la empresa tiene un Régimen Fiscal y un Uso CFDI elegidos
Cuando el responsable elige otro Régimen Fiscal
Entonces el Uso CFDI queda vacío.

**CP-1.11.1 — Llenado automático de estado y país (flujo principal)**
Verifica: CA-1.11 · RN-18
Dado que el responsable está capturando una empresa
Cuando elige la Ciudad "Aguascalientes"
Entonces el Estado muestra "Aguascalientes" y el País "México".

**CP-1.11.2 — Estado y país no editables (validación)**
Verifica: CA-1.11 · RN-18
Dado que el responsable ya eligió una Ciudad
Cuando intenta cambiar a mano el Estado o el País
Entonces ambos campos aparecen deshabilitados.

**CP-1.12.1 — Guardar con domicilio parcial (alternativo)**
Verifica: CA-1.12 · RN-18
Dado que el responsable captura solo el C.P. "20000" y deja vacíos los demás datos del domicilio
Cuando guarda con el resto de los datos obligatorios válidos
Entonces el sistema guarda la empresa en estatus ACTIVO.

**CP-1.13.1 — Email en mayúsculas se guarda en minúsculas (flujo principal)**
Verifica: CA-1.13 · RN-19
Dado que el responsable captura el Email "Contacto@GrupoMalia.MX"
Cuando guarda
Entonces el sistema guarda "contacto@grupomalia.mx".

**CP-1.14.1 — Email sin arroba (error)**
Verifica: CA-1.14 · RN-19
Dado que el responsable captura el Email "contacto.grupomalia.mx"
Cuando guarda
Entonces el sistema muestra "El Email no posee un formato válido." y no guarda.

**CP-1.15.1 — Email vacío (alternativo)**
Verifica: CA-1.15 · RN-19
Dado que el responsable deja vacío el Email y los demás datos obligatorios son válidos
Cuando guarda
Entonces el sistema guarda la empresa.

**CP-1.16.1 — Cuenta con formato correcto (flujo principal)**
Verifica: CA-1.16 · RN-20
Dado que existe la forma de pago TRANS con su formato de cuenta configurado
Cuando el responsable captura una CLABE de 18 dígitos que tiene ese formato y guarda
Entonces el sistema acepta la cuenta.

**CP-1.17.1 — Cuenta con formato incorrecto (error)**
Verifica: CA-1.17 · RN-20
Dado que existe la forma de pago TRANS con su formato de cuenta configurado
Cuando el responsable captura el No. Cuenta "ABC123" y guarda
Entonces el sistema muestra el mensaje de número de cuenta no válido y no guarda.

**CP-1.18.1 — Cuenta vacía (alternativo)**
Verifica: CA-1.18 · RN-20
Dado que el responsable deja vacío el No. Cuenta
Cuando guarda
Entonces el sistema no valida la cuenta y guarda la empresa.

**CP-1.18.2 — Sin forma de pago TRANS (alternativo)**
Verifica: CA-1.18 · RN-20
Dado que en el catálogo de formas de pago no existe la clave TRANS
Cuando el responsable captura cualquier No. Cuenta y guarda
Entonces el sistema no valida la cuenta y guarda la empresa.

**CP-1.19.1 — Datos de auditoría del alta (validación)**
Verifica: CA-1.19 · RN-06
Dado que el usuario "jperez" guarda una empresa nueva con éxito
Cuando se consultan los datos de auditoría de esa empresa
Entonces aparecen la fecha y hora del alta, el equipo desde donde se hizo y el usuario "jperez".

**CP-1.20.1 — Registro de Alta en la bitácora (flujo principal)**
Verifica: CA-1.20 · RN-07
Dado que el usuario "jperez" guarda con éxito la empresa nueva "GRUPO MALIA SA DE CV"
Cuando abre su detalle y revisa la sección "Bitácora de cambios"
Entonces aparece un solo registro de tipo "Alta", con la fecha y hora del alta, el usuario "jperez" y el equipo desde donde se hizo.

**CP-1.21.1 — Alta rechazada por RFC repetido (error)**
Verifica: CA-1.21 · RN-09, RN-12
Dado que existe una empresa con RFC "GMA010101AB1"
Cuando el responsable intenta registrar otra empresa con ese RFC y el sistema muestra "El RFC debe de ser único, el mismo valor ya existe."
Entonces no se crea la empresa ni ningún registro de Alta en la bitácora.

**CP-1.22.1 — Usuario sin permiso de alta (permisos)**
Verifica: CA-1.22 · RN-04
Dado que un usuario cuyo rol solo permite consultar abre el catálogo de empresas
Cuando busca la opción para crear una empresa
Entonces el sistema no la muestra o la deshabilita (ver P-07).

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-1.1 | CP-1.1.1, CP-1.1.2 | Flujo principal, persona física |
| CA-1.2 | CP-1.2.1 | Valores iniciales |
| CA-1.3 | CP-1.3.1 a CP-1.3.5 | Orden de secciones, campos por sección, listas vacías |
| CA-1.4 | CP-1.4.1 a CP-1.4.7 | Error por cada campo obligatorio |
| CA-1.5 | CP-1.5.1 a CP-1.5.4 | Repetidos con empresa activa y en baja |
| CA-1.6 | CP-1.6.1 a CP-1.6.5 | Longitud de Abreviatura, formato de Razón Social, RFC y C.P. |
| CA-1.7 | CP-1.7.1 a CP-1.7.3 | Persona física, régimen inactivo, persona moral |
| CA-1.8 | CP-1.8.1, CP-1.8.2 | Borrado del régimen, error al guardar |
| CA-1.9 | CP-1.9.1, CP-1.9.2 | Usos del régimen, uso inactivo |
| CA-1.10 | CP-1.10.1 | Borrado del Uso CFDI |
| CA-1.11 | CP-1.11.1, CP-1.11.2 | Llenado automático, solo lectura |
| CA-1.12 | CP-1.12.1 | Domicilio parcial |
| CA-1.13 | CP-1.13.1 | Email en minúsculas |
| CA-1.14 | CP-1.14.1 | Email inválido |
| CA-1.15 | CP-1.15.1 | Email vacío |
| CA-1.16 | CP-1.16.1 | Cuenta válida |
| CA-1.17 | CP-1.17.1 | Cuenta inválida |
| CA-1.18 | CP-1.18.1, CP-1.18.2 | Cuenta vacía, sin forma de pago TRANS |
| CA-1.19 | CP-1.19.1 | Auditoría |
| CA-1.20 | CP-1.20.1 | Bitácora: registro de Alta |
| CA-1.21 | CP-1.21.1 | Bitácora: alta rechazada |
| CA-1.22 | CP-1.22.1 | Permisos |

[↑ Regresar al índice](#cat-empresas)

---

<a id="hu-2"></a>
## HU-2 — Edición de empresa

| Campo | Valor |
|---|---|
| Prioridad | Indispensable (Must) |
| Objetivo de negocio | OBJ-3 Información vigente y con historial |
| Reglas que aplica | RN-03, RN-04, RN-06 a RN-09, RN-11 a RN-21 |

Como responsable del catálogo de empresas, quiero modificar los datos de una empresa activa, para mantener al día su información fiscal, de domicilio y de contacto.

### Criterios de aceptación

**CA-2.1 — Edición exitosa**
Dado que la empresa está en estatus ACTIVO
Cuando el responsable modifica datos con valores válidos y guarda
Entonces el sistema guarda los cambios y actualiza los datos de auditoría.

**CA-2.2 — Validaciones al editar**
Dado que la empresa está en estatus ACTIVO
Cuando el responsable deja un valor que incumple una regla del alta y guarda
Entonces el sistema muestra el mensaje de la regla y no guarda.

**CA-2.3 — Uso CFDI no obligatorio al editar**
Dado que la empresa ya existe y el Uso CFDI quedó vacío
Cuando el responsable guarda
Entonces el sistema guarda la empresa sin exigir el Uso CFDI.

**CA-2.4 — Empresa en BAJA en solo lectura**
Dado que la empresa está en estatus BAJA
Cuando el responsable abre su detalle
Entonces todos los campos aparecen en solo lectura.

**CA-2.5 — Usuario sin permiso de edición**
Dado que el rol del usuario no le permite modificar empresas
Cuando abre el detalle de una empresa activa
Entonces no puede modificar sus datos.

**CA-2.6 — Modificación registrada en la bitácora**
Dado que la empresa está en estatus ACTIVO
Cuando el responsable modifica uno o más campos con valores válidos y guarda
Entonces se agrega a la bitácora un solo registro de tipo Modificación con la fecha y hora, el usuario, el equipo y, por cada campo modificado, su valor anterior y el nuevo.

**CA-2.7 — Guardar sin cambios**
Dado que el responsable abre una empresa en ACTIVO y no cambia ningún campo
Cuando guarda
Entonces no se agrega ningún registro a la bitácora.

**CA-2.8 — Modificación rechazada no se registra**
Dado que el responsable modifica un campo con un valor que incumple una regla
Cuando el sistema rechaza el guardado
Entonces no se agrega ningún registro a la bitácora.

### Casos de prueba

**CP-2.1.1 — Cambio de teléfono (flujo principal)**
Verifica: CA-2.1 · RN-21, RN-06
Dado que la empresa "GRUPO MALIA SA DE CV" está en ACTIVO
Cuando el usuario "jperez" cambia el Teléfono a "449 123 4567" y guarda
Entonces el sistema guarda el cambio y registra a "jperez" con la fecha y hora de la modificación.

**CP-2.2.1 — RFC repetido al editar (validación)**
Verifica: CA-2.2 · RN-21, RN-12
Dado que existen las empresas A con RFC "GMA010101AB1" y B con otro RFC
Cuando el responsable cambia el RFC de B a "GMA010101AB1" y guarda
Entonces el sistema muestra "El RFC debe de ser único, el mismo valor ya existe." y no guarda.

**CP-2.2.2 — C.P. borrado al editar (error)**
Verifica: CA-2.2 · RN-21, RN-11
Dado que la empresa está en ACTIVO con C.P. "20000"
Cuando el responsable borra el C.P. y guarda
Entonces el sistema muestra "El Código Postal (C.P.) es un campo requerido." y no guarda.

**CP-2.3.1 — Guardar sin Uso CFDI tras cambiar el régimen (alternativo)**
Verifica: CA-2.3 · RN-11, RN-17
Dado que la empresa ya existe con Régimen Fiscal y Uso CFDI
Cuando el responsable cambia el Régimen Fiscal, el Uso CFDI queda vacío y guarda
Entonces el sistema guarda la empresa sin Uso CFDI.

**CP-2.4.1 — Detalle de empresa en BAJA (estatus no permitido)**
Verifica: CA-2.4 · RN-03, RN-21
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA
Cuando el responsable abre su detalle
Entonces ningún campo se puede modificar.

**CP-2.5.1 — Usuario de solo consulta (permisos)**
Verifica: CA-2.5 · RN-04
Dado que un usuario cuyo rol solo permite consultar abre una empresa activa
Cuando intenta modificar la Razón Social
Entonces el sistema no le permite editar el campo ni guardar cambios.

**CP-2.6.1 — Registro de Modificación de un campo (flujo principal)**
Verifica: CA-2.6 · RN-07, RN-08
Dado que la empresa "GRUPO MALIA SA DE CV" está en ACTIVO con Teléfono "449 000 0000"
Cuando el usuario "jperez" cambia el Teléfono a "449 123 4567" y guarda
Entonces la bitácora muestra, como registro más reciente, una Modificación de "jperez" con la fecha, la hora y el equipo, y el detalle "Teléfono: 449 000 0000 → 449 123 4567".

**CP-2.6.2 — Registro de Modificación de varios campos (alternativo)**
Verifica: CA-2.6 · RN-08
Dado que la empresa "GRUPO MALIA SA DE CV" está en ACTIVO con Email "contacto@malia.mx" y Colonia "CENTRO"
Cuando el responsable cambia el Email a "ventas@malia.mx" y la Colonia a "JARDINES", y guarda una sola vez
Entonces se agrega un solo registro de Modificación con dos detalles: "Email: contacto@malia.mx → ventas@malia.mx" y "Colonia: CENTRO → JARDINES".

**CP-2.6.3 — Cambio de régimen registra también el Uso CFDI borrado (alternativo)**
Verifica: CA-2.6 · RN-08, RN-17
Dado que la empresa tiene un Régimen Fiscal y un Uso CFDI elegidos
Cuando el responsable cambia el Régimen Fiscal, el Uso CFDI queda vacío y guarda
Entonces el registro de Modificación incluye el Régimen Fiscal con su valor anterior y el nuevo, y el Uso CFDI con su valor anterior y el valor nuevo vacío.

**CP-2.6.4 — Campos que no cambiaron no aparecen (validación)**
Verifica: CA-2.6 · RN-08
Dado que la empresa "GRUPO MALIA SA DE CV" está en ACTIVO
Cuando el responsable cambia solo el Teléfono y guarda
Entonces el registro de Modificación solo contiene el detalle del Teléfono.

**CP-2.7.1 — Guardar sin cambios (alternativo)**
Verifica: CA-2.7 · RN-08
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el responsable abre la empresa, no cambia ningún campo y guarda
Entonces la bitácora sigue con 3 registros.

**CP-2.8.1 — Modificación rechazada por C.P. vacío (error)**
Verifica: CA-2.8 · RN-09, RN-11
Dado que la bitácora de la empresa tiene 3 registros y su C.P. es "20000"
Cuando el responsable borra el C.P., guarda y el sistema muestra "El Código Postal (C.P.) es un campo requerido."
Entonces la bitácora sigue con 3 registros.

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-2.1 | CP-2.1.1 | Flujo principal, auditoría |
| CA-2.2 | CP-2.2.1, CP-2.2.2 | Validación de repetido, error por obligatorio |
| CA-2.3 | CP-2.3.1 | Uso CFDI vacío al editar |
| CA-2.4 | CP-2.4.1 | Estatus no permitido |
| CA-2.5 | CP-2.5.1 | Permisos |
| CA-2.6 | CP-2.6.1 a CP-2.6.4 | Bitácora: un campo, varios campos, campo borrado automáticamente, solo campos cambiados |
| CA-2.7 | CP-2.7.1 | Bitácora: guardar sin cambios |
| CA-2.8 | CP-2.8.1 | Bitácora: modificación rechazada |

[↑ Regresar al índice](#cat-empresas)

---

<a id="hu-3"></a>
## HU-3 — Baja y reactivación de empresa

| Campo | Valor |
|---|---|
| Prioridad | Indispensable (Must) |
| Objetivo de negocio | OBJ-3 Información vigente y con historial |
| Reglas que aplica | RN-01 a RN-10, RN-22 a RN-27, RN-30 |

Como usuario con permiso de baja o de reactivar, quiero dar de baja una empresa que ya no opera y reactivarla cuando se vuelva a necesitar, para sacarla de los procesos sin perder su información ni su historial, y volver a operar a su nombre sin capturarla de nuevo.

### Criterios de aceptación

**Baja**

**CA-3.1 — Baja exitosa**
Dado que el usuario tiene permiso de baja y la empresa está en ACTIVO
Cuando selecciona la empresa en el listado, elige Baja y confirma
Entonces el estatus cambia a BAJA y queda registrado su usuario con la fecha y hora.

**CA-3.2 — La empresa dada de baja queda fuera de operación**
Dado que el usuario confirmó la baja de una empresa
Cuando abre su detalle y vuelve al listado
Entonces sus campos están en solo lectura y la empresa aparece resaltada en el listado.

**CA-3.3 — Cancelar la baja**
Dado que el usuario eligió Baja
Cuando cancela la confirmación
Entonces la empresa sigue en ACTIVO sin cambios.

**CA-3.4 — Baja no disponible por estatus**
Dado que la empresa ya está en BAJA o todavía no se ha guardado
Cuando el usuario busca la acción Baja
Entonces la acción no está disponible.

**CA-3.5 — Usuario sin permiso de baja**
Dado que el rol del usuario no le da permiso de baja
Cuando selecciona una empresa en ACTIVO
Entonces no ve la acción Baja.

**CA-3.6 — No se puede eliminar**
Dado que el usuario selecciona cualquier empresa
Cuando busca la acción para eliminarla
Entonces la acción no está disponible.

**CA-3.7 — Baja registrada en la bitácora**
Dado que el usuario confirmó la baja de una empresa en ACTIVO
Cuando se consulta la bitácora de la empresa
Entonces aparece como registro más reciente un movimiento de tipo Baja con la fecha y hora, el usuario, el equipo y el detalle "Estatus: ACTIVO → BAJA".

**CA-3.8 — Baja cancelada no se registra**
Dado que el usuario eligió Baja
Cuando cancela la confirmación
Entonces no se agrega ningún registro a la bitácora.

**CA-3.9 — La bitácora se conserva en BAJA**
Dado que la empresa está en BAJA
Cuando el usuario abre su detalle
Entonces puede consultar la bitácora completa, en solo lectura, incluidos los movimientos anteriores a la baja.

**CA-3.10 — Consulta de timbres solo de empresas activas**
Dado que existen empresas en ACTIVO y en BAJA
Cuando se consultan los timbres del PAC
Entonces solo se consultan las empresas en ACTIVO.

**Reactivación**

**CA-3.11 — Reactivación exitosa**
Dado que el usuario tiene permiso de reactivar y la empresa está en BAJA
Cuando selecciona la empresa en el listado, elige Reactivar y confirma
Entonces el estatus cambia a ACTIVO, se actualiza la Fecha de estatus y queda registrado el usuario que hizo la acción, con la fecha y hora.

**CA-3.12 — Cancelar la reactivación**
Dado que el usuario eligió Reactivar
Cuando cancela la confirmación
Entonces la empresa sigue en BAJA sin cambios.

**CA-3.13 — Reactivar no disponible por estatus**
Dado que la empresa está en ACTIVO o todavía no se ha guardado
Cuando el usuario busca la acción Reactivar
Entonces la acción no está disponible.

**CA-3.14 — Usuario sin permiso de reactivar**
Dado que el rol del usuario no le da permiso de reactivar
Cuando selecciona una empresa en BAJA
Entonces no ve la acción Reactivar.

**CA-3.15 — Reactivar solo una empresa a la vez**
Dado que el usuario selecciona más de una empresa en BAJA en el listado
Cuando busca la acción Reactivar
Entonces la acción no está disponible.

**CA-3.16 — La empresa reactivada vuelve a operar**
Dado que la empresa se reactivó con éxito
Cuando el usuario la consulta en el listado, abre su detalle o la busca en otros procesos
Entonces la empresa se puede editar, ya no aparece resaltada, aparece en el filtro Activas y se considera en la consulta de timbres del PAC.

**CA-3.17 — Se conservan los datos de la empresa**
Dado que la empresa se reactivó con éxito
Cuando el usuario abre su detalle
Entonces encuentra los mismos datos, certificados, sucursales y personal asignado que tenía al darse de baja.

**CA-3.18 — Nueva baja después de reactivar**
Dado que la empresa se reactivó con éxito
Cuando el usuario con permiso de baja la selecciona en el listado
Entonces la acción Baja vuelve a estar disponible y la acción Reactivar ya no.

**CA-3.19 — Reactivación registrada en la bitácora**
Dado que el usuario confirmó la reactivación de una empresa en BAJA
Cuando se consulta la bitácora de la empresa
Entonces aparece como registro más reciente un movimiento de tipo Reactivación con la fecha y hora, el usuario, el equipo y el detalle "Estatus: BAJA → ACTIVO", y se conservan todos los registros anteriores.

**CA-3.20 — Reactivación cancelada no se registra**
Dado que el usuario eligió Reactivar
Cuando cancela la confirmación
Entonces no se agrega ningún registro a la bitácora.

### Casos de prueba

**CP-3.1.1 — Baja de empresa activa (flujo principal)**
Verifica: CA-3.1 · RN-22, RN-24
Dado que el usuario "admin01" tiene permiso de baja y la empresa "GRUPO MALIA SA DE CV" está en ACTIVO
Cuando la selecciona en el listado, elige Baja y responde que sí a "¿Realmente desea dar de Baja el elemento seleccionado?"
Entonces la empresa pasa a BAJA y queda registrado "admin01" con la fecha y hora de la baja.

**CP-3.2.1 — Empresa dada de baja queda bloqueada (validación)**
Verifica: CA-3.2 · RN-03, RN-25, RN-30
Dado que la empresa "GRUPO MALIA SA DE CV" acaba de pasar a BAJA
Cuando el usuario abre su detalle y vuelve al listado
Entonces sus campos están en solo lectura y en el listado aparece resaltada.

**CP-3.3.1 — Cancelar la confirmación de baja (alternativo)**
Verifica: CA-3.3 · RN-05
Dado que la empresa "GRUPO MALIA SA DE CV" está en ACTIVO
Cuando el usuario elige Baja y responde que no en la confirmación
Entonces la empresa sigue en ACTIVO.

**CP-3.4.1 — Empresa ya en BAJA (estatus no permitido)**
Verifica: CA-3.4 · RN-22
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA
Cuando el usuario la selecciona en el listado
Entonces la acción Baja no está disponible.

**CP-3.4.2 — Empresa sin guardar (falta un paso previo)**
Verifica: CA-3.4 · RN-22
Dado que el usuario está capturando una empresa nueva que aún no guarda
Cuando busca la acción Baja
Entonces la acción no está disponible.

**CP-3.5.1 — Usuario sin permiso de baja (permisos)**
Verifica: CA-3.5 · RN-04, RN-22
Dado que el rol del usuario no le da permiso de baja
Cuando selecciona la empresa "GRUPO MALIA SA DE CV" en ACTIVO
Entonces la acción Baja no aparece.

**CP-3.6.1 — Intento de eliminar (restricción)**
Verifica: CA-3.6 · RN-02
Dado que el usuario selecciona una empresa en ACTIVO o en BAJA
Cuando busca la acción de eliminar
Entonces la acción no está disponible.

**CP-3.7.1 — Registro de Baja en la bitácora (flujo principal)**
Verifica: CA-3.7 · RN-07, RN-08
Dado que el usuario "admin01" da de baja la empresa "GRUPO MALIA SA DE CV", que estaba en ACTIVO
Cuando abre su detalle y revisa la sección "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Baja", del usuario "admin01", con la fecha, la hora y el equipo de la baja y el detalle "Estatus: ACTIVO → BAJA".

**CP-3.8.1 — Baja cancelada sin registro (alternativo)**
Verifica: CA-3.8 · RN-09
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el usuario elige Baja y responde que no en la confirmación
Entonces la bitácora sigue con 3 registros.

**CP-3.9.1 — Bitácora de una empresa en BAJA (visibilidad)**
Verifica: CA-3.9 · RN-10
Dado que la empresa "VICENTE REYES MAGAÑA" tuvo un Alta y dos Modificaciones y después se dio de baja
Cuando el usuario abre su detalle
Entonces la sección "Bitácora de cambios" muestra los 4 registros (Baja, Modificación, Modificación, Alta), en solo lectura.

**CP-3.10.1 — Consulta de timbres excluye empresas en BAJA (visibilidad)**
Verifica: CA-3.10 · RN-26
Dado que "GRUPO MALIA SA DE CV" está en ACTIVO y "VICENTE REYES MAGAÑA" en BAJA
Cuando se consultan los timbres del PAC
Entonces solo se consulta el RFC de "GRUPO MALIA SA DE CV".

**CP-3.11.1 — Reactivación de empresa en baja (flujo principal)**
Verifica: CA-3.11 · RN-01, RN-23, RN-24
Dado que el usuario "admin01" tiene permiso de reactivar y la empresa "VICENTE REYES MAGAÑA" está en BAJA
Cuando la selecciona en el listado, elige Reactivar y responde que sí a "¿Realmente desea Reactivar el elemento seleccionado?"
Entonces la empresa pasa a ACTIVO, la Fecha de estatus se actualiza y queda registrado el usuario "admin01" con la fecha y hora de la reactivación.

**CP-3.12.1 — Cancelar la confirmación de reactivación (alternativo)**
Verifica: CA-3.12 · RN-05
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA
Cuando el usuario elige Reactivar y responde que no en la confirmación
Entonces la empresa sigue en BAJA, en solo lectura y resaltada en el listado.

**CP-3.13.1 — Empresa en ACTIVO (estatus no permitido)**
Verifica: CA-3.13 · RN-23
Dado que la empresa "GRUPO MALIA SA DE CV" está en ACTIVO
Cuando el usuario la selecciona en el listado
Entonces la acción Reactivar no está disponible.

**CP-3.13.2 — Empresa sin guardar (falta un paso previo)**
Verifica: CA-3.13 · RN-23
Dado que el usuario está capturando una empresa nueva que aún no guarda
Cuando busca la acción Reactivar
Entonces la acción no está disponible.

**CP-3.14.1 — Usuario sin permiso de reactivar (permisos)**
Verifica: CA-3.14 · RN-04, RN-23
Dado que el rol del usuario no le da permiso de reactivar
Cuando selecciona la empresa "VICENTE REYES MAGAÑA" en BAJA
Entonces la acción Reactivar no aparece y la empresa sigue en BAJA.

**CP-3.15.1 — Selección de varias empresas (restricción)**
Verifica: CA-3.15 · RN-23
Dado que existen dos empresas en BAJA
Cuando el usuario selecciona ambas en el listado
Entonces la acción Reactivar no está disponible.

**CP-3.16.1 — Empresa reactivada se puede editar (validación)**
Verifica: CA-3.16 · RN-25
Dado que la empresa "VICENTE REYES MAGAÑA" acaba de reactivarse
Cuando el usuario abre su detalle, cambia el Teléfono y guarda
Entonces el sistema guarda el cambio y actualiza los datos de auditoría.

**CP-3.16.2 — Empresa reactivada en el listado (visibilidad)**
Verifica: CA-3.16 · RN-25
Dado que la empresa "VICENTE REYES MAGAÑA" acaba de reactivarse
Cuando el usuario vuelve al listado y aplica los filtros Activas y Baja
Entonces la empresa ya no aparece resaltada, aparece con el filtro Activas y no aparece con el filtro Baja.

**CP-3.16.3 — Empresa reactivada en la consulta de timbres (visibilidad)**
Verifica: CA-3.16 · RN-26
Dado que la empresa "VICENTE REYES MAGAÑA" acaba de reactivarse
Cuando se ejecuta la consulta de timbres del PAC
Entonces la consulta incluye el RFC de esa empresa.

**CP-3.17.1 — Datos conservados tras reactivar (validación)**
Verifica: CA-3.17 · RN-27
Dado que la empresa "VICENTE REYES MAGAÑA" se dio de baja con RFC "VERM800101AB1", C.P. "20000", un certificado, una sucursal y dos empleados asignados
Cuando el usuario la reactiva y abre su detalle
Entonces la empresa conserva ese RFC, ese C.P., el certificado, la sucursal y los dos empleados, sin cambios en su estatus.

**CP-3.18.1 — Baja después de reactivar (alternativo)**
Verifica: CA-3.18 · RN-01, RN-22
Dado que la empresa "VICENTE REYES MAGAÑA" acaba de reactivarse
Cuando un usuario con permiso de baja la selecciona en el listado, elige Baja y confirma
Entonces la empresa vuelve a BAJA y queda registrado el usuario con la fecha y hora de la nueva baja.

**CP-3.19.1 — Registro de Reactivación en la bitácora (flujo principal)**
Verifica: CA-3.19 · RN-07, RN-08, RN-10
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA y su bitácora tiene 4 registros
Cuando el usuario "admin01" la reactiva
Entonces la bitácora tiene 5 registros; el más reciente es de tipo "Reactivación", del usuario "admin01", con la fecha, la hora, el equipo y el detalle "Estatus: BAJA → ACTIVO", y los 4 anteriores siguen sin cambios.

**CP-3.19.2 — Historial completo del ciclo de vida (validación)**
Verifica: CA-3.19 · RN-07, RN-10
Dado que la empresa "GRUPO MALIA SA DE CV" se da de alta, se modifica su Teléfono, se da de baja, se reactiva y se vuelve a dar de baja
Cuando el usuario consulta su bitácora
Entonces aparecen 5 registros, del más reciente al más antiguo: Baja, Reactivación, Baja, Modificación y Alta, cada uno con su usuario, fecha, hora y equipo.

**CP-3.20.1 — Reactivación cancelada sin registro (alternativo)**
Verifica: CA-3.20 · RN-09
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA y su bitácora tiene 4 registros
Cuando el usuario elige Reactivar y responde que no en la confirmación
Entonces la bitácora sigue con 4 registros.

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-3.1 | CP-3.1.1 | Flujo principal de baja |
| CA-3.2 | CP-3.2.1 | Solo lectura y resaltado tras la baja |
| CA-3.3 | CP-3.3.1 | Cancelar la baja |
| CA-3.4 | CP-3.4.1, CP-3.4.2 | Estatus no permitido, falta un paso previo |
| CA-3.5 | CP-3.5.1 | Permisos de baja |
| CA-3.6 | CP-3.6.1 | Restricción: no se elimina |
| CA-3.7 | CP-3.7.1 | Bitácora: registro de Baja |
| CA-3.8 | CP-3.8.1 | Bitácora: baja cancelada |
| CA-3.9 | CP-3.9.1 | Bitácora conservada en BAJA |
| CA-3.10 | CP-3.10.1 | Consulta de timbres del PAC |
| CA-3.11 | CP-3.11.1 | Flujo principal de reactivación |
| CA-3.12 | CP-3.12.1 | Cancelar la reactivación |
| CA-3.13 | CP-3.13.1, CP-3.13.2 | Estatus no permitido, falta un paso previo |
| CA-3.14 | CP-3.14.1 | Permisos de reactivación |
| CA-3.15 | CP-3.15.1 | Selección múltiple |
| CA-3.16 | CP-3.16.1 a CP-3.16.3 | Edición, listado y filtros, consulta de timbres |
| CA-3.17 | CP-3.17.1 | Conservación de datos |
| CA-3.18 | CP-3.18.1 | Ciclo baja → reactivación → baja |
| CA-3.19 | CP-3.19.1, CP-3.19.2 | Bitácora: registro de Reactivación, historial completo |
| CA-3.20 | CP-3.20.1 | Bitácora: reactivación cancelada |

[↑ Regresar al índice](#cat-empresas)

---

<a id="hu-4"></a>
## HU-4 — Consulta y filtros de empresas

| Campo | Valor |
|---|---|
| Prioridad | Indispensable (Must) |
| Objetivo de negocio | OBJ-3 Información vigente y con historial |
| Reglas que aplica | RN-10, RN-28 a RN-31 |

Como usuario del sistema, quiero consultar las empresas, filtrarlas por estatus y revisar su detalle y su bitácora de cambios, para encontrar rápido las vigentes o las dadas de baja y conocer su información e historial.

### Criterios de aceptación

**CA-4.1 — Filtro inicial**
Dado que el usuario tiene acceso al catálogo
Cuando lo abre
Entonces el filtro "Todas" está seleccionado y ve empresas en ACTIVO y en BAJA.

**CA-4.2 — Filtrar por estatus**
Dado que el usuario está en el listado
Cuando elige el filtro "Activas" o "Baja"
Entonces solo ve las empresas con ese estatus.

**CA-4.3 — Empresas en BAJA resaltadas**
Dado que hay empresas en BAJA
Cuando el usuario ve el listado con el filtro "Todas"
Entonces las empresas en BAJA se ven resaltadas.

**CA-4.4 — Datos bancarios fuera del listado**
Dado que el usuario está en el listado de empresas
Cuando revisa las columnas
Entonces no ve Banco ni No. Cuenta.

**CA-4.5 — Identificación por Razón Social**
Dado que el usuario está en otra pantalla que pide elegir una empresa
Cuando abre la lista de empresas
Entonces cada empresa aparece con su Razón Social.

**CA-4.6 — Detalle de la empresa con sus listas**
Dado que la empresa tiene certificados, sucursales o empleados enlazados
Cuando el usuario abre su detalle
Entonces cada elemento aparece solo en su lista: Lista Certificados, Lista Sucursales o Lista Personales.

**CA-4.7 — Bitácora en solo lectura y en orden**
Dado que la empresa tiene registros en su bitácora de cambios
Cuando el usuario consulta la sección Bitácora de cambios
Entonces ve los registros del más reciente al más antiguo y no puede modificarlos ni eliminarlos.

### Casos de prueba

**CP-4.1.1 — Apertura del catálogo (flujo principal)**
Verifica: CA-4.1 · RN-29
Dado que existen las empresas "GRUPO MALIA SA DE CV" en ACTIVO y "VICENTE REYES MAGAÑA" en BAJA
Cuando el usuario abre Catálogos > Empresa
Entonces el filtro "Todas" está seleccionado y aparecen las dos empresas.

**CP-4.2.1 — Filtro Activas (alternativo)**
Verifica: CA-4.2 · RN-29
Dado el mismo escenario de CP-4.1.1
Cuando el usuario elige el filtro "Activas"
Entonces solo aparece "GRUPO MALIA SA DE CV".

**CP-4.2.2 — Filtro Baja (alternativo)**
Verifica: CA-4.2 · RN-29
Dado el mismo escenario de CP-4.1.1
Cuando el usuario elige el filtro "Baja"
Entonces solo aparece "VICENTE REYES MAGAÑA".

**CP-4.3.1 — Resaltado de empresas en BAJA (visibilidad)**
Verifica: CA-4.3 · RN-30
Dado el mismo escenario de CP-4.1.1
Cuando el usuario ve el listado con el filtro "Todas"
Entonces "VICENTE REYES MAGAÑA" aparece con color resaltado y "GRUPO MALIA SA DE CV" con color normal.

**CP-4.4.1 — Listado sin datos bancarios (visibilidad)**
Verifica: CA-4.4 · RN-28
Dado que existe una empresa con Banco y No. Cuenta capturados
Cuando el usuario abre el listado de empresas
Entonces no aparecen las columnas Banco ni No. Cuenta.

**CP-4.5.1 — Elección de empresa desde una sucursal (visibilidad)**
Verifica: CA-4.5 · RN-31
Dado que el usuario está capturando una sucursal
Cuando abre la lista del campo Empresa
Entonces las empresas aparecen con su Razón Social.

**CP-4.6.1 — Listas de una empresa con registros (validación)**
Verifica: CA-4.6
Dado que existe la empresa "GRUPO MALIA SA DE CV" con un certificado, dos sucursales y tres empleados asignados
Cuando el usuario abre su detalle
Entonces "Lista Certificados" muestra el certificado, "Lista Sucursales" muestra las dos sucursales y "Lista Personales" muestra los tres empleados, cada uno solo en su lista.

**CP-4.7.1 — Registros de la bitácora no editables (restricción)**
Verifica: CA-4.7 · RN-10
Dado que la empresa "GRUPO MALIA SA DE CV" tiene su registro de Alta en la bitácora
Cuando el usuario intenta modificar o eliminar ese registro desde la sección "Bitácora de cambios"
Entonces el sistema no ofrece ninguna acción para modificarlo ni eliminarlo.

**CP-4.7.2 — Orden de los registros (validación)**
Verifica: CA-4.7 · RN-10
Dado que la empresa "GRUPO MALIA SA DE CV" tiene un registro de Alta y, después, dos de Modificación
Cuando el usuario consulta la sección "Bitácora de cambios"
Entonces la Modificación más reciente aparece primero y el Alta aparece al final.

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-4.1 | CP-4.1.1 | Flujo principal |
| CA-4.2 | CP-4.2.1, CP-4.2.2 | Filtros Activas y Baja |
| CA-4.3 | CP-4.3.1 | Visibilidad del resaltado |
| CA-4.4 | CP-4.4.1 | Visibilidad de datos bancarios |
| CA-4.5 | CP-4.5.1 | Identificación en otras pantallas |
| CA-4.6 | CP-4.6.1 | Detalle con listas |
| CA-4.7 | CP-4.7.1, CP-4.7.2 | Bitácora: solo lectura, orden |

[↑ Regresar al índice](#cat-empresas)

---

<a id="hu-5"></a>
## HU-5 — Enlazar y desvincular certificados del SAT

| Campo | Valor |
|---|---|
| Prioridad | Indispensable (Must) |
| Objetivo de negocio | OBJ-4 Certificados correctos por empresa |
| Reglas que aplica | RN-03 a RN-05, RN-07, RN-09, RN-32 a RN-41 |
| Fuera de alcance | Registro, edición y baja de certificados y de sus PAC; elección del certificado y del PAC vigentes al timbrar (catálogo de Certificados) |

Como usuario con permiso de enlazar y desvincular certificados, quiero enlazar a la empresa los certificados de sello digital que ya están registrados y desvincular los que ya no deben usarse, para que la empresa tenga los certificados con los que timbra a su nombre sin borrarlos del catálogo de Certificados.

### Criterios de aceptación

**Enlazar**

**CA-5.1 — Enlace exitoso**
Dado que el usuario tiene permiso para enlazar y la empresa está en ACTIVO
Cuando elige Enlazar, selecciona uno o varios certificados de la lista y guarda la empresa
Entonces los certificados aparecen en la Lista Certificados de la empresa, con su No. Certificado, su F. Expiración y su Estatus.

**CA-5.2 — Solo se ofrecen certificados que se pueden enlazar**
Dado que en el catálogo de Certificados hay certificados inactivos, vencidos, de otro RFC o ya enlazados a una empresa
Cuando el usuario elige Enlazar
Entonces la lista no muestra ninguno de esos certificados.

**CA-5.3 — Certificado ya enlazado a otra empresa**
Dado que un certificado ya está enlazado a una empresa
Cuando se intenta enlazar ese certificado a otra empresa y guardar
Entonces el sistema muestra "El certificado {No. Certificado} ya está enlazado a la empresa {Razón Social}." y no guarda.

**CA-5.4 — RFC del certificado distinto al de la empresa**
Dado que el RFC del certificado no es el mismo que el RFC de la empresa
Cuando se intenta enlazar el certificado y guardar
Entonces el sistema muestra "El certificado {No. Certificado} no corresponde al RFC de la empresa." y no guarda.

**CA-5.5 — El certificado no cambia al enlazarse**
Dado que el usuario enlazó un certificado a la empresa
Cuando se consulta ese certificado en el catálogo de Certificados
Entonces conserva sus mismos datos, su mismo estatus y sus mismos PAC.

**CA-5.6 — Enlazar no disponible**
Dado que la empresa está en BAJA, todavía no se ha guardado, o el usuario no tiene permiso para enlazar
Cuando el usuario revisa la sección Lista Certificados
Entonces la acción Enlazar no está disponible.

**CA-5.7 — Enlace registrado en la bitácora**
Dado que el usuario enlazó uno o varios certificados y guardó la empresa
Cuando se consulta la bitácora de la empresa
Entonces el registro más reciente es de tipo Modificación, con la fecha y hora, el usuario, el equipo y un detalle "Certificados" por cada certificado enlazado, con el valor anterior vacío y su No. Certificado como valor nuevo.

**CA-5.8 — Enlace cancelado no se registra**
Dado que el usuario eligió Enlazar
Cuando cierra la lista sin elegir un certificado, o descarta los cambios de la empresa sin guardarlos
Entonces la Lista Certificados no cambia y no se agrega ningún registro a la bitácora.

**Desvincular**

**CA-5.9 — Desvinculación exitosa**
Dado que el usuario tiene permiso para desvincular, la empresa está en ACTIVO y tiene certificados enlazados
Cuando selecciona uno o varios certificados, elige Desvincular, confirma y guarda la empresa
Entonces los certificados ya no aparecen en la Lista Certificados de la empresa.

**CA-5.10 — El certificado se conserva en su catálogo**
Dado que el usuario desvinculó un certificado de la empresa
Cuando se consulta ese certificado en el catálogo de Certificados
Entonces el certificado sigue existiendo, con sus mismos datos, su mismo estatus y sus mismos PAC, y no tiene empresa enlazada.

**CA-5.11 — Se puede volver a enlazar**
Dado que un certificado activo y no vencido se desvinculó de la empresa
Cuando el usuario elige Enlazar en esa misma empresa
Entonces el certificado vuelve a aparecer en la lista para enlazar.

**CA-5.12 — Cancelar la desvinculación**
Dado que el usuario eligió Desvincular
Cuando cancela la confirmación
Entonces el certificado sigue en la Lista Certificados sin cambios.

**CA-5.13 — Aviso de empresa sin certificado vigente**
Dado que el certificado seleccionado es el único certificado activo y no vencido de la empresa
Cuando el usuario elige Desvincular
Entonces la confirmación muestra además "La empresa se quedará sin un certificado vigente y no podrá timbrar."

**CA-5.14 — Desvincular no disponible**
Dado que la empresa está en BAJA, que no hay certificados seleccionados, o que el usuario no tiene permiso para desvincular
Cuando el usuario revisa la sección Lista Certificados
Entonces la acción Desvincular no está disponible.

**CA-5.15 — Documentos ya timbrados**
Dado que existen documentos timbrados con un certificado
Cuando el usuario desvincula ese certificado de la empresa
Entonces esos documentos no cambian.

**CA-5.16 — Desvinculación registrada en la bitácora**
Dado que el usuario desvinculó uno o varios certificados y guardó la empresa
Cuando se consulta la bitácora de la empresa
Entonces el registro más reciente es de tipo Modificación, con la fecha y hora, el usuario, el equipo y un detalle "Certificados" por cada certificado desvinculado, con su No. Certificado como valor anterior y el valor nuevo vacío.

**CA-5.17 — Desvinculación cancelada no se registra**
Dado que el usuario eligió Desvincular
Cuando cancela la confirmación, o descarta los cambios de la empresa sin guardarlos
Entonces no se agrega ningún registro a la bitácora.

### Casos de prueba

**CP-5.1.1 — Enlazar un certificado (flujo principal)**
Verifica: CA-5.1 · RN-32, RN-39
Dado que:
- la empresa "GRUPO MALIA SA DE CV", con RFC "GMA010101AB1", está en ACTIVO;
- en el catálogo de Certificados existe el certificado "00001000000500000001", activo, que vence el 2028-03-31, con RFC "GMA010101AB1" y sin empresa enlazada.

Cuando el responsable elige Enlazar, selecciona ese certificado y guarda la empresa
Entonces la Lista Certificados muestra el certificado "00001000000500000001", con F. Expiración 2028-03-31 y Estatus Activo.

**CP-5.1.2 — Enlazar varios certificados a la vez (alternativo)**
Verifica: CA-5.1 · RN-32, RN-39
Dado que existen dos certificados con RFC "GMA010101AB1" que se pueden enlazar
Cuando el responsable elige Enlazar, selecciona los dos y guarda la empresa
Entonces la Lista Certificados muestra los dos certificados.

**CP-5.2.1 — Certificado vencido no se ofrece (validación)**
Verifica: CA-5.2 · RN-39
Dado que el certificado "00001000000500000002", con RFC "GMA010101AB1", venció el 2026-01-31
Cuando el responsable elige Enlazar en la empresa "GRUPO MALIA SA DE CV"
Entonces ese certificado no aparece en la lista.

**CP-5.2.2 — Certificado inactivo no se ofrece (validación)**
Verifica: CA-5.2 · RN-39
Dado que el certificado "00001000000500000003", con RFC "GMA010101AB1", está inactivo
Cuando el responsable elige Enlazar en la empresa "GRUPO MALIA SA DE CV"
Entonces ese certificado no aparece en la lista.

**CP-5.2.3 — Certificado de otro RFC no se ofrece (validación)**
Verifica: CA-5.2 · RN-39
Dado que el certificado "00001000000500000004" es del RFC "VERM800101AB1"
Cuando el responsable elige Enlazar en la empresa "GRUPO MALIA SA DE CV", con RFC "GMA010101AB1"
Entonces ese certificado no aparece en la lista.

**CP-5.2.4 — Certificado ya enlazado no se ofrece (validación)**
Verifica: CA-5.2 · RN-39, RN-35
Dado que el certificado "00001000000500000001" ya está enlazado a "GRUPO MALIA SA DE CV"
Cuando el responsable elige Enlazar en esa misma empresa
Entonces ese certificado no aparece en la lista.

**CP-5.3.1 — Certificado enlazado a otra empresa (dos usuarios al mismo tiempo)**
Verifica: CA-5.3 · RN-35
**Pendiente de validar el escenario (ver P-05).**
Dado que:
- el certificado "00001000000500000001" está enlazado a "GRUPO MALIA SA DE CV";
- otro usuario lo desvincula de esa empresa y lo enlaza a una segunda empresa antes de que el responsable guarde.

Cuando el responsable guarda la empresa "GRUPO MALIA SA DE CV" con ese certificado enlazado
Entonces el sistema muestra "El certificado 00001000000500000001 ya está enlazado a la empresa {Razón Social}." y no guarda.

**CP-5.4.1 — RFC del certificado no coincide al guardar (error)**
Verifica: CA-5.4 · RN-40
Dado que el responsable enlazó un certificado con RFC "GMA010101AB1" y, antes de guardar, cambió el RFC de la empresa a "GMB020202CD2"
Cuando guarda la empresa
Entonces el sistema muestra "El certificado {No. Certificado} no corresponde al RFC de la empresa." y no guarda.

**CP-5.5.1 — El certificado conserva sus datos (validación)**
Verifica: CA-5.5 · RN-36
Dado que el certificado "00001000000500000001" tiene F. Expiración 2028-03-31, Estatus Activo y un PAC activo
Cuando el responsable lo enlaza a "GRUPO MALIA SA DE CV", guarda y lo consulta en el catálogo de Certificados
Entonces el certificado sigue con la misma F. Expiración, el mismo Estatus y el mismo PAC.

**CP-5.6.1 — Empresa en BAJA (estatus no permitido)**
Verifica: CA-5.6 · RN-03, RN-32
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA
Cuando el usuario abre su detalle y revisa la sección Lista Certificados
Entonces la acción Enlazar no está disponible.

**CP-5.6.2 — Empresa sin guardar (falta un paso previo)**
Verifica: CA-5.6 · RN-32
Dado que el responsable está capturando una empresa nueva que aún no guarda
Cuando revisa la sección Lista Certificados
Entonces la acción Enlazar no está disponible.

**CP-5.6.3 — Usuario sin permiso de enlazar (permisos)**
Verifica: CA-5.6 · RN-04, RN-32
Dado que el rol del usuario no le da permiso para enlazar certificados
Cuando abre el detalle de "GRUPO MALIA SA DE CV", que está en ACTIVO
Entonces la acción Enlazar no aparece.

**CP-5.7.1 — Registro del enlace en la bitácora (flujo principal)**
Verifica: CA-5.7 · RN-07, RN-37
Dado que el usuario "jperez" enlaza el certificado "00001000000500000001" a "GRUPO MALIA SA DE CV" y guarda
Cuando consulta la sección "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Modificación", del usuario "jperez", con la fecha, la hora, el equipo y el detalle "Certificados: (vacío) → 00001000000500000001".

**CP-5.7.2 — Enlace de varios certificados en un solo registro (alternativo)**
Verifica: CA-5.7 · RN-37
Dado que el responsable enlaza dos certificados y guarda una sola vez
Cuando consulta la bitácora
Entonces se agrega un solo registro de Modificación, con un detalle "Certificados" por cada certificado enlazado.

**CP-5.8.1 — Enlace descartado (alternativo)**
Verifica: CA-5.8 · RN-09, RN-34
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el responsable elige Enlazar, selecciona un certificado y descarta los cambios de la empresa sin guardar
Entonces la Lista Certificados no cambia y la bitácora sigue con 3 registros.

**CP-5.9.1 — Desvincular un certificado (flujo principal)**
Verifica: CA-5.9 · RN-33, RN-36
Dado que "GRUPO MALIA SA DE CV" está en ACTIVO y tiene enlazados los certificados "00001000000500000001" y "00001000000500000005"
Cuando el responsable selecciona "00001000000500000001", elige Desvincular, responde que sí a "¿Realmente desea desvincular de la empresa el certificado seleccionado?" y guarda
Entonces la Lista Certificados solo muestra "00001000000500000005".

**CP-5.9.2 — Desvincular varios certificados (alternativo)**
Verifica: CA-5.9 · RN-33
Dado que "GRUPO MALIA SA DE CV" tiene enlazados tres certificados
Cuando el responsable selecciona dos, elige Desvincular, confirma y guarda
Entonces la Lista Certificados solo muestra el certificado que no se seleccionó.

**CP-5.10.1 — El certificado sigue en su catálogo (validación)**
Verifica: CA-5.10 · RN-36
Dado que el responsable desvinculó el certificado "00001000000500000001" de "GRUPO MALIA SA DE CV"
Cuando consulta ese certificado en el catálogo de Certificados
Entonces el certificado aparece con la misma F. Expiración, el mismo Estatus y el mismo PAC, y sin empresa enlazada.

**CP-5.11.1 — Volver a enlazar un certificado desvinculado (alternativo)**
Verifica: CA-5.11 · RN-36, RN-39
Dado que el certificado "00001000000500000001", activo y vigente, se desvinculó de "GRUPO MALIA SA DE CV"
Cuando el responsable elige Enlazar en esa empresa
Entonces el certificado aparece en la lista y se puede enlazar de nuevo.

**CP-5.12.1 — Cancelar la confirmación (alternativo)**
Verifica: CA-5.12 · RN-05
Dado que "GRUPO MALIA SA DE CV" tiene enlazado el certificado "00001000000500000001"
Cuando el responsable lo selecciona, elige Desvincular y responde que no en la confirmación
Entonces el certificado sigue en la Lista Certificados.

**CP-5.13.1 — Desvincular el único certificado vigente (validación)**
Verifica: CA-5.13 · RN-41
Dado que:
- "GRUPO MALIA SA DE CV" tiene enlazado el certificado "00001000000500000001", activo y vigente;
- también tiene enlazado el certificado "00001000000500000002", vencido.

Cuando el responsable selecciona "00001000000500000001" y elige Desvincular
Entonces la confirmación muestra además "La empresa se quedará sin un certificado vigente y no podrá timbrar."

**CP-5.13.2 — Sin aviso cuando queda otro certificado vigente (alternativo)**
Verifica: CA-5.13 · RN-41
Dado que "GRUPO MALIA SA DE CV" tiene enlazados dos certificados activos y vigentes
Cuando el responsable selecciona uno y elige Desvincular
Entonces la confirmación no muestra el aviso de empresa sin certificado vigente.

**CP-5.14.1 — Empresa en BAJA (estatus no permitido)**
Verifica: CA-5.14 · RN-03, RN-33
Dado que la empresa "VICENTE REYES MAGAÑA" está en BAJA y tiene un certificado enlazado
Cuando el usuario abre su detalle y selecciona el certificado
Entonces la acción Desvincular no está disponible.

**CP-5.14.2 — Sin certificado seleccionado (falta un paso previo)**
Verifica: CA-5.14 · RN-33
Dado que "GRUPO MALIA SA DE CV" está en ACTIVO con certificados enlazados
Cuando el responsable no selecciona ningún certificado en la Lista Certificados
Entonces la acción Desvincular no está disponible.

**CP-5.14.3 — Usuario sin permiso de desvincular (permisos)**
Verifica: CA-5.14 · RN-04, RN-33
Dado que el rol del usuario no le da permiso para desvincular certificados
Cuando selecciona un certificado en la Lista Certificados de "GRUPO MALIA SA DE CV"
Entonces la acción Desvincular no aparece.

**CP-5.15.1 — Documentos timbrados no cambian (validación)**
Verifica: CA-5.15 · RN-38
Dado que existe una factura timbrada con el certificado "00001000000500000001"
Cuando el responsable desvincula ese certificado de "GRUPO MALIA SA DE CV" y guarda
Entonces la factura conserva su No. de certificado y su timbre sin cambios.

**CP-5.16.1 — Registro de la desvinculación en la bitácora (flujo principal)**
Verifica: CA-5.16 · RN-07, RN-37
Dado que el usuario "jperez" desvincula el certificado "00001000000500000001" de "GRUPO MALIA SA DE CV" y guarda
Cuando consulta la sección "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Modificación", del usuario "jperez", con la fecha, la hora, el equipo y el detalle "Certificados: 00001000000500000001 → (vacío)".

**CP-5.17.1 — Desvinculación cancelada sin registro (alternativo)**
Verifica: CA-5.17 · RN-09
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el responsable elige Desvincular y responde que no en la confirmación
Entonces la bitácora sigue con 3 registros.

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-5.1 | CP-5.1.1, CP-5.1.2 | Flujo principal, varios certificados |
| CA-5.2 | CP-5.2.1 a CP-5.2.4 | Lista: vencido, inactivo, otro RFC, ya enlazado |
| CA-5.3 | CP-5.3.1 | Dos usuarios al mismo tiempo (pendiente P-05) |
| CA-5.4 | CP-5.4.1 | Error: RFC distinto |
| CA-5.5 | CP-5.5.1 | Conservación de datos del certificado al enlazar |
| CA-5.6 | CP-5.6.1 a CP-5.6.3 | Estatus no permitido, falta un paso previo, permisos |
| CA-5.7 | CP-5.7.1, CP-5.7.2 | Bitácora: uno y varios certificados |
| CA-5.8 | CP-5.8.1 | Bitácora: enlace descartado |
| CA-5.9 | CP-5.9.1, CP-5.9.2 | Flujo principal, varios certificados |
| CA-5.10 | CP-5.10.1 | Conservación en el catálogo |
| CA-5.11 | CP-5.11.1 | Volver a enlazar |
| CA-5.12 | CP-5.12.1 | Cancelar la confirmación |
| CA-5.13 | CP-5.13.1, CP-5.13.2 | Aviso con y sin certificado vigente restante |
| CA-5.14 | CP-5.14.1 a CP-5.14.3 | Estatus no permitido, falta un paso previo, permisos |
| CA-5.15 | CP-5.15.1 | Documentos ya timbrados |
| CA-5.16 | CP-5.16.1 | Bitácora: registro de desvinculación |
| CA-5.17 | CP-5.17.1 | Bitácora: desvinculación cancelada |

[↑ Regresar al índice](#cat-empresas)

---

<a id="hu-6"></a>
## HU-6 — Enlazar y desvincular sucursales

| Campo | Valor |
|---|---|
| Prioridad | Importante (Should) |
| Objetivo de negocio | OBJ-5 Estructura de la empresa al día |
| Reglas que aplica | RN-03 a RN-05, RN-07, RN-09, RN-32 a RN-38, RN-42 a RN-44 |
| Fuera de alcance | Registro, edición y baja de sucursales (catálogo de Sucursales) |

Como usuario con permiso de enlazar y desvincular sucursales, quiero enlazar a la empresa las sucursales que ya están registradas y desvincular las que ya no le pertenecen, para saber qué sucursales tiene la empresa sin borrar ninguna sucursal.

### Criterios de aceptación

**Enlazar**

**CA-6.1 — Enlace exitoso**
Dado que el usuario tiene permiso para enlazar y la empresa está en ACTIVO
Cuando elige Enlazar, selecciona una o varias sucursales y guarda la empresa
Entonces las sucursales aparecen en la Lista Sucursales de la empresa.

**CA-6.2 — Solo se ofrecen sucursales que se pueden enlazar**
Dado que hay sucursales en BAJA o ya enlazadas a una empresa
Cuando el usuario elige Enlazar
Entonces la lista no muestra esas sucursales.

**CA-6.3 — Sucursal ya enlazada a otra empresa**
Dado que una sucursal ya está enlazada a una empresa
Cuando se intenta enlazar esa sucursal a otra empresa y guardar
Entonces el sistema muestra "La sucursal {Nombre} ya está enlazada a la empresa {Razón Social}." y no guarda.

**CA-6.4 — La sucursal no cambia al enlazarse**
Dado que el usuario enlazó una sucursal
Cuando se consulta esa sucursal en el catálogo de Sucursales
Entonces conserva sus mismos datos y su mismo estatus, y muestra la empresa enlazada.

**CA-6.5 — Enlazar no disponible**
Dado que la empresa está en BAJA, todavía no se ha guardado, o el usuario no tiene permiso para enlazar
Cuando el usuario revisa la sección Lista Sucursales
Entonces la acción Enlazar no está disponible.

**CA-6.6 — Enlace registrado en la bitácora**
Dado que el usuario enlazó una o varias sucursales y guardó la empresa
Cuando se consulta la bitácora
Entonces el registro más reciente es de tipo Modificación, con un detalle "Sucursales" por cada sucursal enlazada.

**CA-6.7 — Enlace cancelado no se registra**
Dado que el usuario eligió Enlazar
Cuando cierra la lista sin elegir, o descarta los cambios sin guardar
Entonces la Lista Sucursales no cambia y no se agrega ningún registro a la bitácora.

**Desvincular**

**CA-6.8 — Desvinculación exitosa**
Dado que el usuario tiene permiso para desvincular y la empresa está en ACTIVO con sucursales enlazadas
Cuando selecciona una o varias sucursales, elige Desvincular, confirma y guarda
Entonces las sucursales ya no aparecen en la Lista Sucursales.

**CA-6.9 — La sucursal se conserva sin empresa**
Dado que el usuario desvinculó una sucursal
Cuando se consulta esa sucursal en el catálogo de Sucursales
Entonces la sucursal sigue existiendo, con el mismo estatus y sin empresa, y se puede volver a enlazar.

**CA-6.10 — Se quitan el personal y el responsable de la sucursal**
Dado que la sucursal tiene personal asignado o un Responsable
Cuando el usuario la desvincula
Entonces la confirmación muestra el aviso "La sucursal perderá su personal asignado y su responsable." y, al guardar, la sucursal queda sin personal y sin Responsable, mientras los empleados siguen en la empresa.

**CA-6.11 — Cancelar la desvinculación**
Dado que el usuario eligió Desvincular
Cuando cancela la confirmación
Entonces la sucursal sigue en la Lista Sucursales sin cambios.

**CA-6.12 — Desvincular no disponible**
Dado que la empresa está en BAJA, que no hay sucursales seleccionadas, o que el usuario no tiene permiso
Cuando el usuario revisa la sección Lista Sucursales
Entonces la acción Desvincular no está disponible.

**CA-6.13 — Sucursal sin empresa en los procesos**
Dado que una sucursal se desvinculó
Cuando el usuario busca elegirla en un proceso
Entonces la sucursal no aparece, y los documentos que ya se registraron con ella no cambian.

**CA-6.14 — Desvinculación registrada en la bitácora**
Dado que el usuario desvinculó sucursales y guardó
Cuando se consulta la bitácora
Entonces el registro más reciente es de tipo Modificación, con un detalle "Sucursales" por cada sucursal desvinculada y el valor nuevo vacío.

**CA-6.15 — Desvinculación cancelada no se registra**
Dado que el usuario eligió Desvincular
Cuando cancela la confirmación o descarta los cambios
Entonces no se agrega ningún registro a la bitácora.

### Casos de prueba

**CP-6.1.1 — Enlazar una sucursal (flujo principal)**
Verifica: CA-6.1 · RN-32, RN-42
Dado que "GRUPO MALIA SA DE CV" está en ACTIVO y la sucursal "CEN - Centro" está en ACTIVO y sin empresa enlazada
Cuando el responsable elige Enlazar, selecciona "CEN - Centro" y guarda
Entonces la Lista Sucursales muestra "CEN - Centro".

**CP-6.1.2 — Enlazar varias sucursales (alternativo)**
Verifica: CA-6.1 · RN-32, RN-42
Dado que las sucursales "CEN - Centro" y "NTE - Norte" están en ACTIVO y sin empresa enlazada
Cuando el responsable las enlaza a "GRUPO MALIA SA DE CV" y guarda
Entonces la Lista Sucursales muestra las dos sucursales.

**CP-6.2.1 — Sucursal en BAJA no se ofrece (validación)**
Verifica: CA-6.2 · RN-42
Dado que la sucursal "SUR - Sur" está en BAJA
Cuando el responsable elige Enlazar
Entonces "SUR - Sur" no aparece en la lista.

**CP-6.2.2 — Sucursal ya enlazada no se ofrece (validación)**
Verifica: CA-6.2 · RN-42, RN-35
Dado que "CEN - Centro" está enlazada a "GRUPO MALIA SA DE CV"
Cuando el responsable elige Enlazar en "GRUPO MALIA SA DE CV" o en otra empresa en ACTIVO
Entonces "CEN - Centro" no aparece en la lista.

**CP-6.3.1 — Sucursal enlazada a otra empresa al guardar (dos usuarios al mismo tiempo)**
Verifica: CA-6.3 · RN-35
Dado que:
- el responsable eligió "NTE - Norte" para enlazarla a "GRUPO MALIA SA DE CV";
- antes de que guarde, otro usuario enlaza "NTE - Norte" a otra empresa.

Cuando el responsable guarda
Entonces el sistema muestra "La sucursal Norte ya está enlazada a la empresa {Razón Social}." y no guarda.

**CP-6.4.1 — La sucursal conserva sus datos (validación)**
Verifica: CA-6.4 · RN-36
Dado que "CEN - Centro" es de Tipo "Matriz" y está en ACTIVO
Cuando el responsable la enlaza a "GRUPO MALIA SA DE CV", guarda y la consulta en el catálogo de Sucursales
Entonces conserva su Tipo y su Estatus, y muestra "GRUPO MALIA SA DE CV" como empresa.

**CP-6.5.1 — Empresa en BAJA (estatus no permitido)**
Verifica: CA-6.5 · RN-03, RN-32
Dado que "VICENTE REYES MAGAÑA" está en BAJA
Cuando el usuario revisa su Lista Sucursales
Entonces la acción Enlazar no está disponible.

**CP-6.5.2 — Empresa sin guardar (falta un paso previo)**
Verifica: CA-6.5 · RN-32
Dado que el responsable está capturando una empresa nueva que aún no guarda
Cuando revisa la Lista Sucursales
Entonces la acción Enlazar no está disponible.

**CP-6.5.3 — Usuario sin permiso (permisos)**
Verifica: CA-6.5 · RN-04, RN-32
Dado que el rol del usuario no le da permiso para enlazar sucursales
Cuando abre "GRUPO MALIA SA DE CV", que está en ACTIVO
Entonces la acción Enlazar no aparece.

**CP-6.6.1 — Registro del enlace en la bitácora (flujo principal)**
Verifica: CA-6.6 · RN-07, RN-37
Dado que el usuario "jperez" enlaza "CEN - Centro" a "GRUPO MALIA SA DE CV" y guarda
Cuando consulta la "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Modificación", de "jperez", con el detalle "Sucursales: (vacío) → CEN - Centro".

**CP-6.7.1 — Enlace descartado (alternativo)**
Verifica: CA-6.7 · RN-09, RN-34
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el responsable elige Enlazar, selecciona una sucursal y descarta los cambios
Entonces la Lista Sucursales no cambia y la bitácora sigue con 3 registros.

**CP-6.8.1 — Desvincular una sucursal (flujo principal)**
Verifica: CA-6.8 · RN-33, RN-36
Dado que "GRUPO MALIA SA DE CV" tiene enlazadas "CEN - Centro" y "NTE - Norte"
Cuando el responsable selecciona "NTE - Norte", elige Desvincular, responde que sí a "¿Realmente desea desvincular de la empresa la sucursal seleccionada?" y guarda
Entonces la Lista Sucursales solo muestra "CEN - Centro".

**CP-6.9.1 — La sucursal queda sin empresa (validación)**
Verifica: CA-6.9 · RN-36
Dado que se desvinculó "NTE - Norte"
Cuando el responsable la consulta en el catálogo de Sucursales
Entonces aparece en ACTIVO y sin empresa.

**CP-6.9.2 — Volver a enlazar (alternativo)**
Verifica: CA-6.9 · RN-36, RN-42
Dado que se desvinculó "NTE - Norte", que está en ACTIVO
Cuando el responsable elige Enlazar en "GRUPO MALIA SA DE CV"
Entonces "NTE - Norte" aparece en la lista y se puede enlazar de nuevo.

**CP-6.10.1 — Sucursal con personal y responsable (validación)**
Verifica: CA-6.10 · RN-43
Dado que "CEN - Centro" tiene como Responsable a "Juan Pérez López" y dos empleados asignados
Cuando el responsable la desvincula, acepta el aviso "La sucursal perderá su personal asignado y su responsable." y guarda
Entonces "CEN - Centro" queda sin personal y sin Responsable, y los tres empleados siguen en la Lista Personales de "GRUPO MALIA SA DE CV".

**CP-6.10.2 — Sucursal sin personal (alternativo)**
Verifica: CA-6.10 · RN-43
Dado que "NTE - Norte" no tiene personal ni Responsable
Cuando el responsable elige Desvincular
Entonces la confirmación no muestra el aviso de personal.

**CP-6.11.1 — Cancelar la confirmación (alternativo)**
Verifica: CA-6.11 · RN-05
Dado que "GRUPO MALIA SA DE CV" tiene enlazada "CEN - Centro"
Cuando el responsable elige Desvincular y responde que no
Entonces "CEN - Centro" sigue en la lista, con su personal y su Responsable.

**CP-6.12.1 — Empresa en BAJA (estatus no permitido)**
Verifica: CA-6.12 · RN-03, RN-33
Dado que "VICENTE REYES MAGAÑA" está en BAJA y tiene una sucursal enlazada
Cuando el usuario selecciona la sucursal
Entonces la acción Desvincular no está disponible.

**CP-6.12.2 — Sin sucursal seleccionada (falta un paso previo)**
Verifica: CA-6.12 · RN-33
Dado que "GRUPO MALIA SA DE CV" tiene sucursales enlazadas
Cuando el responsable no selecciona ninguna
Entonces la acción Desvincular no está disponible.

**CP-6.12.3 — Usuario sin permiso (permisos)**
Verifica: CA-6.12 · RN-04, RN-33
Dado que el rol del usuario no le da permiso para desvincular sucursales
Cuando selecciona una sucursal de "GRUPO MALIA SA DE CV"
Entonces la acción Desvincular no aparece.

**CP-6.13.1 — Sucursal desvinculada fuera de los procesos (visibilidad)**
Verifica: CA-6.13 · RN-44, RN-38
Dado que:
- "NTE - Norte" tiene documentos registrados;
- después se desvinculó de su empresa.

Cuando el usuario captura un documento nuevo y abre la lista de sucursales
Entonces "NTE - Norte" no aparece, y sus documentos anteriores no cambian.

**CP-6.14.1 — Registro de la desvinculación en la bitácora (flujo principal)**
Verifica: CA-6.14 · RN-07, RN-37
Dado que el usuario "jperez" desvincula "NTE - Norte" de "GRUPO MALIA SA DE CV" y guarda
Cuando consulta la "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Modificación", de "jperez", con el detalle "Sucursales: NTE - Norte → (vacío)".

**CP-6.15.1 — Desvinculación cancelada sin registro (alternativo)**
Verifica: CA-6.15 · RN-09
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el responsable elige Desvincular y responde que no
Entonces la bitácora sigue con 3 registros.

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-6.1 | CP-6.1.1, CP-6.1.2 | Flujo principal, varias sucursales |
| CA-6.2 | CP-6.2.1, CP-6.2.2 | Lista: en BAJA, ya enlazada |
| CA-6.3 | CP-6.3.1 | Dos usuarios al mismo tiempo |
| CA-6.4 | CP-6.4.1 | Conservación de datos de la sucursal |
| CA-6.5 | CP-6.5.1 a CP-6.5.3 | Estatus no permitido, falta un paso previo, permisos |
| CA-6.6 | CP-6.6.1 | Bitácora: registro del enlace |
| CA-6.7 | CP-6.7.1 | Bitácora: enlace descartado |
| CA-6.8 | CP-6.8.1 | Flujo principal de desvinculación |
| CA-6.9 | CP-6.9.1, CP-6.9.2 | Sucursal sin empresa, volver a enlazar |
| CA-6.10 | CP-6.10.1, CP-6.10.2 | Con y sin personal o responsable |
| CA-6.11 | CP-6.11.1 | Cancelar la confirmación |
| CA-6.12 | CP-6.12.1 a CP-6.12.3 | Estatus no permitido, falta un paso previo, permisos |
| CA-6.13 | CP-6.13.1 | Visibilidad en procesos |
| CA-6.14 | CP-6.14.1 | Bitácora: registro de desvinculación |
| CA-6.15 | CP-6.15.1 | Bitácora: desvinculación cancelada |

[↑ Regresar al índice](#cat-empresas)

---

<a id="hu-7"></a>
## HU-7 — Enlazar y desvincular personal

| Campo | Valor |
|---|---|
| Prioridad | Importante (Should) |
| Objetivo de negocio | OBJ-5 Estructura de la empresa al día |
| Reglas que aplica | RN-03 a RN-05, RN-07, RN-09, RN-32 a RN-38, RN-45 a RN-48 |
| Fuera de alcance | Registro, edición y baja de empleados (catálogo de Empleados); asignación de empleados a una sucursal (se hace desde la sucursal) |

Como usuario con permiso de enlazar y desvincular personal, quiero enlazar a la empresa los empleados que ya están registrados y desvincular a los que ya no trabajan para ella, para saber quién trabaja para la empresa sin borrar a ningún empleado.

### Criterios de aceptación

**Enlazar**

**CA-7.1 — Enlace exitoso**
Dado que el usuario tiene permiso para enlazar y la empresa está en ACTIVO
Cuando elige Enlazar, selecciona uno o varios empleados y guarda la empresa
Entonces los empleados aparecen en la Lista Personales de la empresa.

**CA-7.2 — Solo se ofrecen empleados que se pueden enlazar**
Dado que hay empleados en BAJA o ya asignados a una empresa
Cuando el usuario elige Enlazar
Entonces la lista no muestra esos empleados.

**CA-7.3 — Empleado ya asignado a otra empresa**
Dado que un empleado ya está asignado a una empresa
Cuando se intenta enlazarlo a otra empresa y guardar
Entonces el sistema muestra "El empleado {Nombre completo} ya está asignado a la empresa {Razón Social}." y no guarda.

**CA-7.4 — El empleado no cambia al enlazarse**
Dado que el usuario enlazó un empleado
Cuando se consulta ese empleado en el catálogo de Empleados
Entonces conserva sus mismos datos y su mismo estatus, muestra la empresa como su Empresa Asignada y no tiene una sucursal nueva.

**CA-7.5 — Enlazar no disponible**
Dado que la empresa está en BAJA, todavía no se ha guardado, o el usuario no tiene permiso para enlazar
Cuando el usuario revisa la sección Lista Personales
Entonces la acción Enlazar no está disponible.

**CA-7.6 — Enlace registrado en la bitácora**
Dado que el usuario enlazó uno o varios empleados y guardó
Cuando se consulta la bitácora
Entonces el registro más reciente es de tipo Modificación, con un detalle "Personal" por cada empleado enlazado.

**CA-7.7 — Enlace cancelado no se registra**
Dado que el usuario eligió Enlazar
Cuando cierra la lista sin elegir, o descarta los cambios sin guardar
Entonces la Lista Personales no cambia y no se agrega ningún registro a la bitácora.

**Desvincular**

**CA-7.8 — Desvinculación exitosa**
Dado que el usuario tiene permiso para desvincular y la empresa está en ACTIVO con personal enlazado
Cuando selecciona uno o varios empleados, elige Desvincular, confirma y guarda
Entonces los empleados ya no aparecen en la Lista Personales.

**CA-7.9 — El empleado se conserva sin empresa**
Dado que el usuario desvinculó a un empleado
Cuando se consulta ese empleado en el catálogo de Empleados
Entonces sigue existiendo, con el mismo estatus, sin empresa y sin las sucursales de la empresa anterior, y se puede volver a enlazar.

**CA-7.10 — Empleado responsable**
Dado que el empleado es Responsable de una sucursal o de otro empleado de la empresa
Cuando el usuario intenta desvincularlo y guardar
Entonces el sistema muestra "El empleado {Nombre completo} es responsable de {Sucursal o empleado}; cambie el responsable antes de desvincularlo." y no guarda.

**CA-7.11 — Cancelar la desvinculación**
Dado que el usuario eligió Desvincular
Cuando cancela la confirmación
Entonces el empleado sigue en la Lista Personales sin cambios.

**CA-7.12 — Desvincular no disponible**
Dado que la empresa está en BAJA, que no hay empleados seleccionados, o que el usuario no tiene permiso
Cuando el usuario revisa la sección Lista Personales
Entonces la acción Desvincular no está disponible.

**CA-7.13 — Documentos ya registrados**
Dado que existen documentos registrados con un empleado
Cuando el usuario lo desvincula de la empresa
Entonces esos documentos no cambian.

**CA-7.14 — Desvinculación registrada en la bitácora**
Dado que el usuario desvinculó empleados y guardó
Cuando se consulta la bitácora
Entonces el registro más reciente es de tipo Modificación, con un detalle "Personal" por cada empleado desvinculado y el valor nuevo vacío.

**CA-7.15 — Desvinculación cancelada o rechazada no se registra**
Dado que el usuario eligió Desvincular
Cuando cancela la confirmación, descarta los cambios, o el sistema rechaza el guardado por RN-48
Entonces no se agrega ningún registro a la bitácora.

### Casos de prueba

**CP-7.1.1 — Enlazar un empleado (flujo principal)**
Verifica: CA-7.1 · RN-32, RN-45
Dado que "GRUPO MALIA SA DE CV" está en ACTIVO y el empleado "1001 - Juan Pérez López" está en ACTIVO y sin empresa
Cuando el responsable elige Enlazar, selecciona a "Juan Pérez López" y guarda
Entonces la Lista Personales muestra "1001 - Juan Pérez López".

**CP-7.1.2 — Enlazar varios empleados (alternativo)**
Verifica: CA-7.1 · RN-32, RN-45
Dado que "1001 - Juan Pérez López" y "1002 - Ana Ruiz Gómez" están en ACTIVO y sin empresa
Cuando el responsable los enlaza a "GRUPO MALIA SA DE CV" y guarda
Entonces la Lista Personales muestra a los dos.

**CP-7.2.1 — Empleado en BAJA no se ofrece (validación)**
Verifica: CA-7.2 · RN-45
Dado que el empleado "1003 - Luis Díaz Mora" está en BAJA
Cuando el responsable elige Enlazar
Entonces "Luis Díaz Mora" no aparece en la lista.

**CP-7.2.2 — Empleado ya asignado no se ofrece (validación)**
Verifica: CA-7.2 · RN-45, RN-35
Dado que "Juan Pérez López" está asignado a "GRUPO MALIA SA DE CV"
Cuando el responsable elige Enlazar en otra empresa en ACTIVO
Entonces "Juan Pérez López" no aparece en la lista.

**CP-7.3.1 — Empleado asignado a otra empresa al guardar (dos usuarios al mismo tiempo)**
Verifica: CA-7.3 · RN-35
Dado que:
- el responsable eligió a "Ana Ruiz Gómez" para enlazarla a "GRUPO MALIA SA DE CV";
- antes de que guarde, otro usuario la asigna a otra empresa.

Cuando el responsable guarda
Entonces el sistema muestra "El empleado Ana Ruiz Gómez ya está asignado a la empresa {Razón Social}." y no guarda.

**CP-7.4.1 — El empleado conserva sus datos (validación)**
Verifica: CA-7.4 · RN-36, RN-46
Dado que "Juan Pérez López" tiene el Puesto "Cajero" y no tiene sucursal
Cuando el responsable lo enlaza a "GRUPO MALIA SA DE CV", guarda y lo consulta en el catálogo de Empleados
Entonces conserva el Puesto "Cajero", tiene como Empresa Asignada "GRUPO MALIA SA DE CV" y sigue sin sucursal.

**CP-7.5.1 — Empresa en BAJA (estatus no permitido)**
Verifica: CA-7.5 · RN-03, RN-32
Dado que "VICENTE REYES MAGAÑA" está en BAJA
Cuando el usuario revisa su Lista Personales
Entonces la acción Enlazar no está disponible.

**CP-7.5.2 — Empresa sin guardar (falta un paso previo)**
Verifica: CA-7.5 · RN-32
Dado que el responsable está capturando una empresa nueva que aún no guarda
Cuando revisa la Lista Personales
Entonces la acción Enlazar no está disponible.

**CP-7.5.3 — Usuario sin permiso (permisos)**
Verifica: CA-7.5 · RN-04, RN-32
Dado que el rol del usuario no le da permiso para enlazar personal
Cuando abre "GRUPO MALIA SA DE CV", que está en ACTIVO
Entonces la acción Enlazar no aparece.

**CP-7.6.1 — Registro del enlace en la bitácora (flujo principal)**
Verifica: CA-7.6 · RN-07, RN-37
Dado que el usuario "jperez" enlaza a "1001 - Juan Pérez López" y guarda
Cuando consulta la "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Modificación", de "jperez", con el detalle "Personal: (vacío) → 1001 - Juan Pérez López".

**CP-7.7.1 — Enlace descartado (alternativo)**
Verifica: CA-7.7 · RN-09, RN-34
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros
Cuando el responsable elige Enlazar, selecciona un empleado y descarta los cambios
Entonces la Lista Personales no cambia y la bitácora sigue con 3 registros.

**CP-7.8.1 — Desvincular un empleado (flujo principal)**
Verifica: CA-7.8 · RN-33, RN-36
Dado que "GRUPO MALIA SA DE CV" tiene enlazados a "1001 - Juan Pérez López" y "1002 - Ana Ruiz Gómez", y ninguno es responsable
Cuando el responsable selecciona a "Ana Ruiz Gómez", elige Desvincular, responde que sí a "¿Realmente desea desvincular de la empresa al empleado seleccionado?" y guarda
Entonces la Lista Personales solo muestra a "Juan Pérez López".

**CP-7.9.1 — El empleado sale de las sucursales (validación)**
Verifica: CA-7.9 · RN-36, RN-47
Dado que "Ana Ruiz Gómez" está asignada a la sucursal "CEN - Centro" de "GRUPO MALIA SA DE CV"
Cuando el responsable la desvincula de la empresa y guarda
Entonces "Ana Ruiz Gómez" queda sin empresa y ya no aparece en el personal de "CEN - Centro".

**CP-7.9.2 — Volver a enlazar (alternativo)**
Verifica: CA-7.9 · RN-36, RN-45
Dado que "Ana Ruiz Gómez", en ACTIVO, se desvinculó de "GRUPO MALIA SA DE CV"
Cuando el responsable elige Enlazar en cualquier empresa en ACTIVO
Entonces "Ana Ruiz Gómez" aparece en la lista y se puede enlazar.

**CP-7.10.1 — Empleado responsable de una sucursal (error)**
Verifica: CA-7.10 · RN-48
Dado que "Juan Pérez López" es Responsable de la sucursal "CEN - Centro"
Cuando el responsable lo desvincula y guarda
Entonces el sistema muestra "El empleado Juan Pérez López es responsable de CEN - Centro; cambie el responsable antes de desvincularlo." y no guarda.

**CP-7.10.2 — Empleado responsable de otro empleado (error)**
Verifica: CA-7.10 · RN-48
Dado que "Juan Pérez López" es Responsable de "Ana Ruiz Gómez"
Cuando el responsable lo desvincula y guarda
Entonces el sistema muestra el mensaje de RN-48 y no guarda.

**CP-7.11.1 — Cancelar la confirmación (alternativo)**
Verifica: CA-7.11 · RN-05
Dado que "GRUPO MALIA SA DE CV" tiene enlazada a "Ana Ruiz Gómez"
Cuando el responsable elige Desvincular y responde que no
Entonces "Ana Ruiz Gómez" sigue en la lista, con sus sucursales.

**CP-7.12.1 — Empresa en BAJA (estatus no permitido)**
Verifica: CA-7.12 · RN-03, RN-33
Dado que "VICENTE REYES MAGAÑA" está en BAJA y tiene personal enlazado
Cuando el usuario selecciona a un empleado
Entonces la acción Desvincular no está disponible.

**CP-7.12.2 — Sin empleado seleccionado (falta un paso previo)**
Verifica: CA-7.12 · RN-33
Dado que "GRUPO MALIA SA DE CV" tiene personal enlazado
Cuando el responsable no selecciona a ningún empleado
Entonces la acción Desvincular no está disponible.

**CP-7.12.3 — Usuario sin permiso (permisos)**
Verifica: CA-7.12 · RN-04, RN-33
Dado que el rol del usuario no le da permiso para desvincular personal
Cuando selecciona a un empleado de "GRUPO MALIA SA DE CV"
Entonces la acción Desvincular no aparece.

**CP-7.13.1 — Documentos anteriores no cambian (validación)**
Verifica: CA-7.13 · RN-38
Dado que "Ana Ruiz Gómez" registró operaciones en "GRUPO MALIA SA DE CV"
Cuando el responsable la desvincula y guarda
Entonces esas operaciones conservan a "Ana Ruiz Gómez" sin cambios.

**CP-7.14.1 — Registro de la desvinculación en la bitácora (flujo principal)**
Verifica: CA-7.14 · RN-07, RN-37
Dado que el usuario "jperez" desvincula a "1002 - Ana Ruiz Gómez" y guarda
Cuando consulta la "Bitácora de cambios"
Entonces el registro más reciente es de tipo "Modificación", de "jperez", con el detalle "Personal: 1002 - Ana Ruiz Gómez → (vacío)".

**CP-7.15.1 — Desvinculación rechazada sin registro (error)**
Verifica: CA-7.15 · RN-09, RN-48
Dado que la bitácora de "GRUPO MALIA SA DE CV" tiene 3 registros y "Juan Pérez López" es Responsable de "CEN - Centro"
Cuando el responsable intenta desvincularlo y el sistema rechaza el guardado
Entonces la bitácora sigue con 3 registros.

| CA | Caso(s) de prueba | Escenarios cubiertos |
| --- | --- | --- |
| CA-7.1 | CP-7.1.1, CP-7.1.2 | Flujo principal, varios empleados |
| CA-7.2 | CP-7.2.1, CP-7.2.2 | Lista: en BAJA, ya asignado |
| CA-7.3 | CP-7.3.1 | Dos usuarios al mismo tiempo |
| CA-7.4 | CP-7.4.1 | Conservación de datos del empleado |
| CA-7.5 | CP-7.5.1 a CP-7.5.3 | Estatus no permitido, falta un paso previo, permisos |
| CA-7.6 | CP-7.6.1 | Bitácora: registro del enlace |
| CA-7.7 | CP-7.7.1 | Bitácora: enlace descartado |
| CA-7.8 | CP-7.8.1 | Flujo principal de desvinculación |
| CA-7.9 | CP-7.9.1, CP-7.9.2 | Sale de sucursales, volver a enlazar |
| CA-7.10 | CP-7.10.1, CP-7.10.2 | Responsable de sucursal o de empleado |
| CA-7.11 | CP-7.11.1 | Cancelar la confirmación |
| CA-7.12 | CP-7.12.1 a CP-7.12.3 | Estatus no permitido, falta un paso previo, permisos |
| CA-7.13 | CP-7.13.1 | Documentos anteriores |
| CA-7.14 | CP-7.14.1 | Bitácora: registro de desvinculación |
| CA-7.15 | CP-7.15.1 | Bitácora: desvinculación rechazada |

[↑ Regresar al índice](#cat-empresas)

---
---

## 8. Requerimientos no funcionales

### RNF-001 — Auditoría: registro de cambios
- **Descripción:** el 100% de las altas, modificaciones, bajas y reactivaciones de empresas que se guardan con éxito generan un registro en la bitácora de cambios (sección 6.3) con fecha y hora, equipo (dirección IP o nombre del equipo) y usuario. Las modificaciones incluyen además cada campo modificado con su valor anterior y el nuevo. Ningún registro de la bitácora se puede modificar ni eliminar (RN-07 a RN-10).
- **Métrica / criterio de verificación:** revisar la bitácora de una muestra de altas, ediciones, bajas y reactivaciones; cada operación debe tener su registro y ninguno debe tener estos datos vacíos.
- **Prioridad:** Indispensable (Must)

### RNF-002 — Seguridad: acceso por roles
- **Descripción:** las acciones de alta, edición, baja, reactivación, enlace y desvinculación de certificados, sucursales y personal solo están disponibles para los roles que tengan el permiso correspondiente (RN-04). Los roles concretos están pendientes de definir (PD-09).
- **Métrica / criterio de verificación:** con un usuario de cada rol, comprobar qué acciones ve; ninguna acción aparece a un rol sin permiso.
- **Prioridad:** Indispensable (Must)

### RNF-003 — Conservación de la información
- **Descripción:** ninguna empresa se borra del sistema; todas las empresas dadas de baja siguen disponibles para consulta (RN-02).
- **Métrica / criterio de verificación:** dar de baja una empresa y comprobar que aparece con el filtro "Baja".
- **Prioridad:** Indispensable (Must)

Los requerimientos de rendimiento, disponibilidad y capacidad están pendientes de definir.

---

<a id="matriz-trazabilidad"></a>
## 9. Matriz de trazabilidad

### 9.1 Matriz RF → HU → RN → CA → CP

La columna "Origen (v1.1)" indica el criterio y los casos de prueba de la versión anterior de los que proviene cada elemento.

| RF | HU | RN | CA | CP | Origen (v1.1) |
|---|---|---|---|---|---|
| RF-01 | HU-1 | RN-01, RN-11 | CA-1.1 | CP-1.1.1, CP-1.1.2 | CA-1.1.1 · CP-1.1.1, CP-1.1.2 |
| RF-01 | HU-1 | RN-01, RN-18 | CA-1.2 | CP-1.2.1 | CA-1.1.2 · CP-1.1.3 |
| RF-01 | HU-1 | — | CA-1.3 | CP-1.3.1 a CP-1.3.5 | CA-1.1.8 · CP-1.1.19 a CP-1.1.23 |
| RF-01 | HU-1 | RN-11 | CA-1.4 | CP-1.4.1 a CP-1.4.7 | CA-1.1.3, CA-1.3.2 · CP-1.1.4 a CP-1.1.9, CP-1.3.3 |
| RF-01 | HU-1 | RN-12 | CA-1.5 | CP-1.5.1 a CP-1.5.4 | CA-1.1.4 · CP-1.1.10 a CP-1.1.13 |
| RF-01 | HU-1 | RN-13 | CA-1.6 | CP-1.6.1 a CP-1.6.5 | CA-1.1.5, CA-1.3.3 · CP-1.1.14 a CP-1.1.16, CP-1.3.4, CP-1.3.5 |
| RF-01 | HU-1 | RN-15 | CA-1.7 | CP-1.7.1 a CP-1.7.3 | CA-1.2.1, CA-1.2.2 · CP-1.2.1 a CP-1.2.3 |
| RF-01 | HU-1 | RN-17, RN-11 | CA-1.8 | CP-1.8.1, CP-1.8.2 | CA-1.2.3 · CP-1.2.4, CP-1.2.5 |
| RF-01 | HU-1 | RN-16 | CA-1.9 | CP-1.9.1, CP-1.9.2 | CA-1.2.4 · CP-1.2.6, CP-1.2.7 |
| RF-01 | HU-1 | RN-17 | CA-1.10 | CP-1.10.1 | CA-1.2.5 · CP-1.2.8 |
| RF-01 | HU-1 | RN-18 | CA-1.11 | CP-1.11.1, CP-1.11.2 | CA-1.3.1 · CP-1.3.1, CP-1.3.2 |
| RF-01 | HU-1 | RN-18 | CA-1.12 | CP-1.12.1 | CA-1.3.4 · CP-1.3.6 |
| RF-01 | HU-1 | RN-19 | CA-1.13 | CP-1.13.1 | CA-1.4.1 · CP-1.4.1 |
| RF-01 | HU-1 | RN-19 | CA-1.14 | CP-1.14.1 | CA-1.4.2 · CP-1.4.2 |
| RF-01 | HU-1 | RN-19 | CA-1.15 | CP-1.15.1 | CA-1.4.3 · CP-1.4.3 |
| RF-01 | HU-1 | RN-20 | CA-1.16 | CP-1.16.1 | CA-1.4.4 · CP-1.4.4 |
| RF-01 | HU-1 | RN-20 | CA-1.17 | CP-1.17.1 | CA-1.4.5 · CP-1.4.5 |
| RF-01 | HU-1 | RN-20 | CA-1.18 | CP-1.18.1, CP-1.18.2 | CA-1.4.6 · CP-1.4.6, CP-1.4.7 |
| RF-01 | HU-1 | RN-06 | CA-1.19 | CP-1.19.1 | CA-1.1.6 · CP-1.1.17 |
| RF-01 | HU-1 | RN-07 | CA-1.20 | CP-1.20.1 | CA-1.1.9 · CP-1.1.25 |
| RF-01 | HU-1 | RN-09, RN-12 | CA-1.21 | CP-1.21.1 | CA-1.1.10 · CP-1.1.26 |
| RF-01 | HU-1 | RN-04 | CA-1.22 | CP-1.22.1 | CA-1.1.7 · CP-1.1.18 |
| RF-01 | HU-2 | RN-21, RN-06 | CA-2.1 | CP-2.1.1 | CA-2.1.1 · CP-2.1.1 |
| RF-01 | HU-2 | RN-21, RN-11, RN-12 | CA-2.2 | CP-2.2.1, CP-2.2.2 | CA-2.1.2 · CP-2.1.2, CP-2.1.3 |
| RF-01 | HU-2 | RN-11, RN-17 | CA-2.3 | CP-2.3.1 | CA-2.1.3 · CP-2.1.4 |
| RF-01 | HU-2 | RN-03, RN-21 | CA-2.4 | CP-2.4.1 | CA-2.1.4 · CP-2.1.5 |
| RF-01 | HU-2 | RN-04 | CA-2.5 | CP-2.5.1 | CA-2.1.5 · CP-2.1.6 |
| RF-01 | HU-2 | RN-07, RN-08, RN-17 | CA-2.6 | CP-2.6.1 a CP-2.6.4 | CA-2.1.6 · CP-2.1.7 a CP-2.1.10 |
| RF-01 | HU-2 | RN-08 | CA-2.7 | CP-2.7.1 | CA-2.1.7 · CP-2.1.11 |
| RF-01 | HU-2 | RN-09, RN-11 | CA-2.8 | CP-2.8.1 | CA-2.1.8 · CP-2.1.12 |
| RF-01 | HU-3 | RN-22, RN-24 | CA-3.1 | CP-3.1.1 | CA-3.1.1 · CP-3.1.1 |
| RF-01 | HU-3 | RN-03, RN-25, RN-30 | CA-3.2 | CP-3.2.1 | (CA nuevo) · CP-3.1.2 |
| RF-01 | HU-3 | RN-05 | CA-3.3 | CP-3.3.1 | CA-3.1.2 · CP-3.1.3 |
| RF-01 | HU-3 | RN-22 | CA-3.4 | CP-3.4.1, CP-3.4.2 | CA-3.1.3 · CP-3.1.4, CP-3.1.5 |
| RF-01 | HU-3 | RN-04, RN-22 | CA-3.5 | CP-3.5.1 | CA-3.1.4 · CP-3.1.6 |
| RF-01 | HU-3 | RN-02 | CA-3.6 | CP-3.6.1 | CA-3.1.5 · CP-3.1.7 |
| RF-01 | HU-3 | RN-07, RN-08 | CA-3.7 | CP-3.7.1 | CA-3.1.6 · CP-3.1.8 |
| RF-01 | HU-3 | RN-09 | CA-3.8 | CP-3.8.1 | CA-3.1.7 · CP-3.1.9 |
| RF-01 | HU-3 | RN-10 | CA-3.9 | CP-3.9.1 | CA-3.1.8 · CP-3.1.10 |
| RF-01 | HU-3 | RN-26 | CA-3.10 | CP-3.10.1 | CA-3.1.9 · CP-3.1.11 |
| RF-01 | HU-3 | RN-01, RN-23, RN-24 | CA-3.11 | CP-3.11.1 | CA-3.2.1 · CP-3.2.1 |
| RF-01 | HU-3 | RN-05 | CA-3.12 | CP-3.12.1 | CA-3.2.2 · CP-3.2.2 |
| RF-01 | HU-3 | RN-23 | CA-3.13 | CP-3.13.1, CP-3.13.2 | CA-3.2.3 · CP-3.2.3, CP-3.2.4 |
| RF-01 | HU-3 | RN-04, RN-23 | CA-3.14 | CP-3.14.1 | CA-3.2.4 · CP-3.2.5 |
| RF-01 | HU-3 | RN-23 | CA-3.15 | CP-3.15.1 | (CA nuevo) · CP-3.2.6 |
| RF-01 | HU-3 | RN-25, RN-26 | CA-3.16 | CP-3.16.1 a CP-3.16.3 | CA-3.2.5 · CP-3.2.7 a CP-3.2.9 |
| RF-01 | HU-3 | RN-27 | CA-3.17 | CP-3.17.1 | CA-3.2.6 · CP-3.2.10 |
| RF-01 | HU-3 | RN-01, RN-22 | CA-3.18 | CP-3.18.1 | CA-3.2.7 · CP-3.2.11 |
| RF-01 | HU-3 | RN-07, RN-08, RN-10 | CA-3.19 | CP-3.19.1, CP-3.19.2 | CA-3.2.8 · CP-3.2.12, CP-3.2.14 |
| RF-01 | HU-3 | RN-09 | CA-3.20 | CP-3.20.1 | CA-3.2.9 · CP-3.2.13 |
| RF-01 | HU-4 | RN-29 | CA-4.1 | CP-4.1.1 | CA-4.1.1 · CP-4.1.1 |
| RF-01 | HU-4 | RN-29 | CA-4.2 | CP-4.2.1, CP-4.2.2 | CA-4.1.2 · CP-4.1.2, CP-4.1.3 |
| RF-01 | HU-4 | RN-30 | CA-4.3 | CP-4.3.1 | CA-4.1.3 · CP-4.1.4 |
| RF-01 | HU-4 | RN-28 | CA-4.4 | CP-4.4.1 | CA-1.4.7 · CP-1.4.8 |
| RF-01 | HU-4 | RN-31 | CA-4.5 | CP-4.5.1 | CA-4.1.4 · CP-4.1.5 |
| RF-01 | HU-4 | — | CA-4.6 | CP-4.6.1 | CA-1.1.8 · CP-1.1.24 |
| RF-01 | HU-4 | RN-10 | CA-4.7 | CP-4.7.1, CP-4.7.2 | CA-1.1.11 · CP-1.1.27, CP-1.1.28 |
| RF-01 | HU-5 | RN-32, RN-39 | CA-5.1 | CP-5.1.1, CP-5.1.2 | CA-5.1.1 · CP-5.1.1, CP-5.1.2 |
| RF-01 | HU-5 | RN-39, RN-35 | CA-5.2 | CP-5.2.1 a CP-5.2.4 | CA-5.1.2 · CP-5.1.3 a CP-5.1.6 |
| RF-01 | HU-5 | RN-35 | CA-5.3 | CP-5.3.1 | CA-5.1.3 · CP-5.1.7 |
| RF-01 | HU-5 | RN-40 | CA-5.4 | CP-5.4.1 | CA-5.1.4 · CP-5.1.8 |
| RF-01 | HU-5 | RN-36 | CA-5.5 | CP-5.5.1 | CA-5.1.5 · CP-5.1.9 |
| RF-01 | HU-5 | RN-03, RN-04, RN-32 | CA-5.6 | CP-5.6.1 a CP-5.6.3 | CA-5.1.6 · CP-5.1.10 a CP-5.1.12 |
| RF-01 | HU-5 | RN-07, RN-37 | CA-5.7 | CP-5.7.1, CP-5.7.2 | CA-5.1.7 · CP-5.1.13, CP-5.1.14 |
| RF-01 | HU-5 | RN-09, RN-34 | CA-5.8 | CP-5.8.1 | CA-5.1.8 · CP-5.1.15 |
| RF-01 | HU-5 | RN-33, RN-36 | CA-5.9 | CP-5.9.1, CP-5.9.2 | CA-5.2.1 · CP-5.2.1, CP-5.2.2 |
| RF-01 | HU-5 | RN-36 | CA-5.10 | CP-5.10.1 | CA-5.2.2 · CP-5.2.3 |
| RF-01 | HU-5 | RN-36, RN-39 | CA-5.11 | CP-5.11.1 | CA-5.2.3 · CP-5.2.4 |
| RF-01 | HU-5 | RN-05 | CA-5.12 | CP-5.12.1 | CA-5.2.4 · CP-5.2.5 |
| RF-01 | HU-5 | RN-41 | CA-5.13 | CP-5.13.1, CP-5.13.2 | CA-5.2.5 · CP-5.2.6, CP-5.2.7 |
| RF-01 | HU-5 | RN-03, RN-04, RN-33 | CA-5.14 | CP-5.14.1 a CP-5.14.3 | CA-5.2.6 · CP-5.2.8 a CP-5.2.10 |
| RF-01 | HU-5 | RN-38 | CA-5.15 | CP-5.15.1 | CA-5.2.7 · CP-5.2.11 |
| RF-01 | HU-5 | RN-07, RN-37 | CA-5.16 | CP-5.16.1 | CA-5.2.8 · CP-5.2.12 |
| RF-01 | HU-5 | RN-09 | CA-5.17 | CP-5.17.1 | CA-5.2.9 · CP-5.2.13 |
| RF-01 | HU-6 | RN-32, RN-42 | CA-6.1 | CP-6.1.1, CP-6.1.2 | CA-6.1.1 · CP-6.1.1, CP-6.1.2 |
| RF-01 | HU-6 | RN-42, RN-35 | CA-6.2 | CP-6.2.1, CP-6.2.2 | CA-6.1.2 · CP-6.1.3, CP-6.1.4 |
| RF-01 | HU-6 | RN-35 | CA-6.3 | CP-6.3.1 | CA-6.1.3 · CP-6.1.5 |
| RF-01 | HU-6 | RN-36 | CA-6.4 | CP-6.4.1 | CA-6.1.4 · CP-6.1.6 |
| RF-01 | HU-6 | RN-03, RN-04, RN-32 | CA-6.5 | CP-6.5.1 a CP-6.5.3 | CA-6.1.5 · CP-6.1.7 a CP-6.1.9 |
| RF-01 | HU-6 | RN-07, RN-37 | CA-6.6 | CP-6.6.1 | CA-6.1.6 · CP-6.1.10 |
| RF-01 | HU-6 | RN-09, RN-34 | CA-6.7 | CP-6.7.1 | CA-6.1.7 · CP-6.1.11 |
| RF-01 | HU-6 | RN-33, RN-36 | CA-6.8 | CP-6.8.1 | CA-6.2.1 · CP-6.2.1 |
| RF-01 | HU-6 | RN-36, RN-42 | CA-6.9 | CP-6.9.1, CP-6.9.2 | CA-6.2.2 · CP-6.2.2, CP-6.2.3 |
| RF-01 | HU-6 | RN-43 | CA-6.10 | CP-6.10.1, CP-6.10.2 | CA-6.2.3 · CP-6.2.4, CP-6.2.5 |
| RF-01 | HU-6 | RN-05 | CA-6.11 | CP-6.11.1 | CA-6.2.4 · CP-6.2.6 |
| RF-01 | HU-6 | RN-03, RN-04, RN-33 | CA-6.12 | CP-6.12.1 a CP-6.12.3 | CA-6.2.5 · CP-6.2.7 a CP-6.2.9 |
| RF-01 | HU-6 | RN-44, RN-38 | CA-6.13 | CP-6.13.1 | CA-6.2.6 · CP-6.2.10 |
| RF-01 | HU-6 | RN-07, RN-37 | CA-6.14 | CP-6.14.1 | CA-6.2.7 · CP-6.2.11 |
| RF-01 | HU-6 | RN-09 | CA-6.15 | CP-6.15.1 | CA-6.2.8 · CP-6.2.12 |
| RF-01 | HU-7 | RN-32, RN-45 | CA-7.1 | CP-7.1.1, CP-7.1.2 | CA-7.1.1 · CP-7.1.1, CP-7.1.2 |
| RF-01 | HU-7 | RN-45, RN-35 | CA-7.2 | CP-7.2.1, CP-7.2.2 | CA-7.1.2 · CP-7.1.3, CP-7.1.4 |
| RF-01 | HU-7 | RN-35 | CA-7.3 | CP-7.3.1 | CA-7.1.3 · CP-7.1.5 |
| RF-01 | HU-7 | RN-36, RN-46 | CA-7.4 | CP-7.4.1 | CA-7.1.4 · CP-7.1.6 |
| RF-01 | HU-7 | RN-03, RN-04, RN-32 | CA-7.5 | CP-7.5.1 a CP-7.5.3 | CA-7.1.5 · CP-7.1.7 a CP-7.1.9 |
| RF-01 | HU-7 | RN-07, RN-37 | CA-7.6 | CP-7.6.1 | CA-7.1.6 · CP-7.1.10 |
| RF-01 | HU-7 | RN-09, RN-34 | CA-7.7 | CP-7.7.1 | CA-7.1.7 · CP-7.1.11 |
| RF-01 | HU-7 | RN-33, RN-36 | CA-7.8 | CP-7.8.1 | CA-7.2.1 · CP-7.2.1 |
| RF-01 | HU-7 | RN-36, RN-47, RN-45 | CA-7.9 | CP-7.9.1, CP-7.9.2 | CA-7.2.2 · CP-7.2.2, CP-7.2.3 |
| RF-01 | HU-7 | RN-48 | CA-7.10 | CP-7.10.1, CP-7.10.2 | CA-7.2.3 · CP-7.2.4, CP-7.2.5 |
| RF-01 | HU-7 | RN-05 | CA-7.11 | CP-7.11.1 | CA-7.2.4 · CP-7.2.6 |
| RF-01 | HU-7 | RN-03, RN-04, RN-33 | CA-7.12 | CP-7.12.1 a CP-7.12.3 | CA-7.2.5 · CP-7.2.7 a CP-7.2.9 |
| RF-01 | HU-7 | RN-38 | CA-7.13 | CP-7.13.1 | CA-7.2.6 · CP-7.2.10 |
| RF-01 | HU-7 | RN-07, RN-37 | CA-7.14 | CP-7.14.1 | CA-7.2.7 · CP-7.2.11 |
| RF-01 | HU-7 | RN-09, RN-48 | CA-7.15 | CP-7.15.1 | CA-7.2.8 · CP-7.2.12 |

**Totales:** 1 RF, 7 HU, 48 RN, 104 CA y 166 CP. Se conservan los 166 CP de la versión 1.1.

### 9.2 Cobertura de las reglas de negocio

| RN | CA que la validan | Reglas de la v1.1 que consolida |
|---|---|---|
| RN-01 | CA-1.1, CA-1.2, CA-3.11, CA-3.18 | RN-1.12, RN-3.9, RN-3.14, sección 6.2 |
| RN-02 | CA-3.6 | RN-3.1, RNF-003 |
| RN-03 | CA-2.4, CA-3.2, CA-5.6, CA-5.14, CA-6.5, CA-6.12, CA-7.5, CA-7.12 | RN-2.2, RN-3.4, RN-5.1, RN-5.9, RN-6.1, RN-6.8, RN-7.1, RN-7.8 |
| RN-04 | CA-1.22, CA-2.5, CA-3.5, CA-3.14, CA-5.6, CA-5.14, CA-6.5, CA-6.12, CA-7.5, CA-7.12 | Sección 5, RNF-002 |
| RN-05 | CA-3.3, CA-3.12, CA-5.12, CA-6.11, CA-7.11 | Parte de RN-3.2, RN-3.10, RN-5.10, RN-6.9, RN-7.9 |
| RN-06 | CA-1.19, CA-2.1 | RN-1.13, RN-2.3 |
| RN-07 | CA-1.20, CA-2.6, CA-3.7, CA-3.19, CA-5.7, CA-5.16, CA-6.6, CA-6.14, CA-7.6, CA-7.14 | RN-1.14, RN-2.4, RN-3.3 (bitácora), RN-3.6, RN-3.11 (bitácora), RN-3.15, RN-5.14, RN-6.13, RN-7.13 |
| RN-08 | CA-2.6, CA-2.7, CA-3.7, CA-3.19 | RN-2.5, RN-3.6, RN-3.15 |
| RN-09 | CA-1.21, CA-2.8, CA-3.8, CA-3.20, CA-5.8, CA-5.17, CA-6.7, CA-6.15, CA-7.7, CA-7.15 | RN-1.15, RN-2.6, RN-3.7, RN-3.16, RN-5.8, RN-5.15, RN-6.7, RN-6.14, RN-7.7, RN-7.14 |
| RN-10 | CA-3.9, CA-3.19, CA-4.7 | RN-1.16, RN-3.8, RN-3.17 |
| RN-11 | CA-1.4, CA-1.8, CA-2.2, CA-2.3, CA-2.8 | RN-1.1, RN-1.4, RN-1.7, RN-1.9, RN-1.10, RN-1.11 (obligatorio), RN-1.21 (obligatorio), RN-2.1 |
| RN-12 | CA-1.5, CA-1.21, CA-2.2 | RN-1.2, RN-1.5, RN-1.8 |
| RN-13 | CA-1.6 | RN-1.3, RN-1.6, RN-1.21 (formato), tabla de campos |
| RN-14 | Sin CA (ver P-10) | RN-1.11 (activos) |
| RN-15 | CA-1.7 | RN-1.17 |
| RN-16 | CA-1.9 | RN-1.19 |
| RN-17 | CA-1.8, CA-1.10, CA-2.3, CA-2.6 | RN-1.18, RN-1.20 |
| RN-18 | CA-1.2, CA-1.11, CA-1.12 | RN-1.22, CA-1.3.4 |
| RN-19 | CA-1.13, CA-1.14, CA-1.15 | RN-1.23 |
| RN-20 | CA-1.16, CA-1.17, CA-1.18 | RN-1.24 |
| RN-21 | CA-2.1, CA-2.2, CA-2.4 | RN-2.1, RN-2.2, descripción del RF-02 |
| RN-22 | CA-3.1, CA-3.4, CA-3.5, CA-3.18 | RN-3.2 |
| RN-23 | CA-3.11, CA-3.13, CA-3.14, CA-3.15 | RN-3.10, "Cómo se ve en pantalla" del RF-03 |
| RN-24 | CA-3.1, CA-3.11 | RN-3.3, RN-3.11, campos que llena el sistema |
| RN-25 | CA-3.2, CA-3.16 | RN-3.4, RN-3.12 |
| RN-26 | CA-3.10, CA-3.16 | RN-3.5, RN-3.12 (timbres) |
| RN-27 | CA-3.17 | RN-3.13, regla general del RF-03 |
| RN-28 | CA-4.4 | RN-4.3, RN-1.25, descripción del RF-04 |
| RN-29 | CA-4.1, CA-4.2 | RN-4.2, descripción del RF-04 |
| RN-30 | CA-3.2, CA-4.3 | RN-4.1 |
| RN-31 | CA-4.5 | RN-4.4 |
| RN-32 | CA-5.1, CA-5.6, CA-6.1, CA-6.5, CA-7.1, CA-7.5 | RN-5.2, RN-6.2, RN-7.2 |
| RN-33 | CA-5.9, CA-5.14, CA-6.8, CA-6.12, CA-7.8, CA-7.12 | RN-5.10, RN-6.9, RN-7.9 |
| RN-34 | CA-5.8, CA-6.7, CA-7.7 | CA-5.1.1, CA-5.1.8, CA-6.1.7, CA-7.1.7 |
| RN-35 | CA-5.2, CA-5.3, CA-6.2, CA-6.3, CA-7.2, CA-7.3 | RN-5.4, RN-6.4, RN-7.4 |
| RN-36 | CA-5.5, CA-5.9, CA-5.10, CA-5.11, CA-6.4, CA-6.8, CA-6.9, CA-7.4, CA-7.8, CA-7.9 | RN-5.6, RN-5.11, RN-6.5, RN-6.10, RN-7.5, RN-7.10 (parte) |
| RN-37 | CA-5.7, CA-5.16, CA-6.6, CA-6.14, CA-7.6, CA-7.14 | RN-5.7, RN-6.6, RN-7.6 |
| RN-38 | CA-5.15, CA-6.13, CA-7.13 | RN-5.13, RN-6.12 (parte), RN-7.12 |
| RN-39 | CA-5.1, CA-5.2, CA-5.11 | RN-5.3 |
| RN-40 | CA-5.4 | RN-5.5 |
| RN-41 | CA-5.13 | RN-5.12 |
| RN-42 | CA-6.1, CA-6.2, CA-6.9 | RN-6.3 |
| RN-43 | CA-6.10 | RN-6.11 |
| RN-44 | CA-6.13 | RN-6.12 (parte) |
| RN-45 | CA-7.1, CA-7.2, CA-7.9 | RN-7.3 |
| RN-46 | CA-7.4 | RN-7.5 (parte) |
| RN-47 | CA-7.9 | RN-7.10 (parte) |
| RN-48 | CA-7.10, CA-7.15 | RN-7.11 |

CA-1.3 y CA-4.6 describen el acomodo de la pantalla; no dependen de una regla de negocio.

### 9.3 Objetivos de negocio

| Objetivo de negocio | HU |
|---|---|
| OBJ-1 Empresa emisora válida ante el SAT | HU-1 |
| OBJ-2 Datos de contacto y pago correctos | HU-1 |
| OBJ-3 Información vigente y con historial | HU-2, HU-3, HU-4 |
| OBJ-4 Certificados correctos por empresa | HU-5 |
| OBJ-5 Estructura de la empresa al día | HU-6, HU-7 |

---

## 10. Pendientes de definir

La versión 1.1 hacía referencia a estos pendientes, pero no los describía. Su descripción se reconstruyó a partir del contexto donde se citan y **debe confirmarla el negocio** (ver P-01).

| ID | Pendiente | Dónde se cita | Descripción reconstruida |
|---|---|---|---|
| PD-02 | Obligatoriedad del Uso CFDI al editar | RN-11, campo Uso CFDI, RGO-01 | Definir si el Uso CFDI debe ser obligatorio también al editar. |
| PD-03 | Efecto de la baja sobre sucursales y personal | RN-27, RGO-02 | Definir si la baja de la empresa debe dar de baja en cascada sus sucursales y su personal, o validar antes de permitir la baja. |
| PD-05 | RFC según el Tipo de Persona | Campo RFC, RGO-03 | Definir si la longitud y el formato del RFC deben corresponder al Tipo de Persona. |
| PD-06 | Obligatoriedad del Tipo de Persona | Campo Tipo de Persona | Definir si el Tipo de Persona es obligatorio. |
| PD-07 | Sin contexto suficiente | Campo Estatus | No se puede reconstruir (ver P-01). |
| PD-08 | Empresa en el reporte de cobranza | RGO-04 | Mostrar la Razón Social de la empresa en el reporte de cobranza cuando se opera con varias empresas. |
| PD-09 | Roles con permiso | Sección 5, RN-04, RNF-002 | Definir qué roles tienen cada permiso: alta, edición, baja, reactivación, enlace y desvinculación. |
| PD-10 | Forma de pago TRANS inexistente | RN-20, SUP-03 | Confirmar que, si no existe la forma de pago TRANS, el No. Cuenta se acepta sin validar. |
| PD-13 | RFC con comas | Campo RFC, RGO-03 | Definir si la validación del RFC debe rechazar comas. |
| PD-14 | Sin contexto suficiente | Campo Reactivado por | No se puede reconstruir (ver P-01). |
| PD-17 | Bloquear la desvinculación del último certificado vigente | RN-41, RGO-05 | Definir si solo se avisa o si se bloquea desvincular el único certificado vigente. |
| PD-19 | Sucursal sin empresa en los procesos | RN-44 | Sin contexto suficiente para reconstruirlo con precisión (ver P-01). |

---

## 11. Supuestos, dependencias y riesgos

### Supuestos

| ID | Supuesto | Impacto si es falso |
|----|----------|---------------------|
| SUP-01 | La prioridad (Indispensable o Importante) se asignó según lo necesario para operar; el sistema actual no la define. | Negocio debe ajustar las prioridades. |
| SUP-02 | Los objetivos de negocio OBJ-1 a OBJ-5 se derivaron de la función de cada historia; no están declarados formalmente. | Negocio debe validarlos o reemplazarlos. |
| SUP-03 | La forma de pago TRANS existe en el sistema y tiene configurado su formato de cuenta. | Si no existe, cualquier número de cuenta se acepta (PD-10). |

### Dependencias

| ID | Dependencia | De quién / de qué |
|----|-------------|-------------------|
| DEP-01 | Catálogos del SAT actualizados (Régimen Fiscal, Uso CFDI, Forma de Pago) | Administración de catálogos del SAT |
| DEP-02 | Catálogos de Ciudad, Estado, País, Régimen Capital y Banco cargados | Administración del sistema |
| DEP-03 | Catálogo de Certificados de sello digital (registro, edición y baja de certificados y sus PAC) disponible por separado de la empresa, con el RFC de cada certificado | Requerimiento del catálogo de Certificados / Área fiscal |
| DEP-04 | Roles de seguridad configurados con los permisos de alta, edición, baja, reactivación, enlace y desvinculación | Administración de seguridad |
| DEP-05 | Catálogos de Sucursales y de Empleados disponibles por separado de la empresa | Requerimientos de los catálogos de Sucursales y Empleados |

### Riesgos

| ID | Riesgo | Probabilidad | Impacto | Cómo reducirlo |
|----|--------|-------|---------|------------|
| RGO-01 | Al editar, una empresa puede quedar sin Uso CFDI (PD-02). | Media | Medio | Definir si el Uso CFDI debe ser obligatorio siempre. |
| RGO-02 | Una empresa dada de baja deja sucursales y personal activos (PD-03). | Media | Alto | Definir la regla de baja en cascada o de validación previa. |
| RGO-03 | Se aceptan RFC que no corresponden al tipo de persona o que contienen comas (PD-05, PD-13). | Baja | Alto | Revisar la validación de formato del RFC. |
| RGO-04 | El reporte de cobranza no muestra la empresa correcta cuando se opera con varias empresas (PD-08). | Alta | Medio | Mostrar la Razón Social de la empresa en el reporte. |
| RGO-05 | Se desvincula el único certificado vigente y la empresa deja de poder timbrar (RN-41, PD-17). | Media | Alto | Aviso en la confirmación; definir si se bloquea. |
| RGO-06 | Una sucursal desvinculada deja de poder elegirse en los procesos (RN-44, PD-19). | Media | Medio | Definir el tratamiento de las sucursales sin empresa. |