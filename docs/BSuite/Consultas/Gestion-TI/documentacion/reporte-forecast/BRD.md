# 📘 BRD — Procesos / Gestión TI / Licencias Servicios / Programaciones de Pago

**Business Requirements Document**

| Campo   | Valor                                           |
| ------- | ----------------------------------------------- |
| Área    | Procesos                                        |
| Módulo  | Gestión Financiera - Programaciones de Pago     |
| Versión | 1.0                                             |
| Fecha   | 08-04-2026                                      |
| Autor   | José Antonio Solis                              |
| Estado  | Inicial                                         |

---

## 1. 🎯 Objetivo

Definir la funcionalidad para la generación, distribución y control de programaciones de pago con base en configuraciones de prorrateo en contratos, garantizando consistencia, trazabilidad e integridad de la información, manteniendo flexibilidad operativa.

---

## 2. 🧩 Definiciones Clave

- **Total del contrato**: Monto correspondiente al importe del periodo de pago definido en el contrato. Es la base para el cálculo del prorrateo.
- **Registro de prorrateo activo**: Registro con estatus "Activo" y con centro de trabajo asignado.
- **Programación de pago**: Registro financiero proyectado asociado a un contrato.
- **Centro de trabajo**: Unidad organizacional a la que se asigna el gasto.
- **Fecha Aniversario**: Fecha calculada en función de la configuración del contrato (según lógica definida en la entidad Contrato), utilizada como base para la generación de programaciones periódicas.
- **Reactivación de prorrateo:** Acción de devolver a estatus "Activo" un registro de prorrateo previamente cancelado, permitiendo que su centro de trabajo vuelva a participar en la distribución del gasto.

---

## 3. ⚙️ Reglas de Negocio

### RN-01 — Validación de prorrateo

- La suma de porcentajes de los registros activos debe ser igual a 100%.
- Todos los registros activos deben tener centro de trabajo asignado.
- El centro de trabajo debe ser único entre los registros activos del mismo contrato.
- La validación se ejecuta al guardar cada registro de prorrateo.
- En caso de incumplimiento, el sistema bloquea el guardado y muestra mensaje de error.
- Un registro cancelado puede ser reactivado (volver a estatus Activo) siempre que al reactivarlo la suma de porcentajes de los registros activos siga siendo igual a 100%.

---

### RN-02 — Cálculo de importes

- El importe de cada programación se calcula como:
  - Importe = Total del contrato × % prorrateo
- Si el contrato no tiene prorrateos activos sigue el flujo actual.

---

### RN-03 — Control de duplicidad en background service

- El servicio automático no genera una nueva programación si ya existe una para la misma combinación de Contrato + Fecha Aniversario + Centro de Trabajo.
- Para generación manual no aplica restricción de duplicidad.

---

### RN-04 — Trazabilidad

Cada programación debe almacenar su origen:

- ID de registro de prorrateo origen
- EsAutomatico
  - True - Generado por el background service
  - False - Generado Manualmente
- Fecha de generación
- Porcentaje de prorrateo aplicado

---

### RN-05 — Bitácora de prorrateo

El sistema debe registrar en bitácora cualquier cambio en la configuración de prorrateo:

- Modificación (porcentaje, centro de trabajo, Cancelación, Reactivación)

Cada registro de bitácora debe incluir:

- Valores anteriores y nuevos
- Usuario
- Fecha y hora

---

### RN-06 — Redondeo de importes

- Los importes se calcularán con precisión de 2 decimales.
- No se realizará ajuste automático por diferencias de redondeo.
- La suma de los importes puede presentar variaciones mínimas respecto al total del contrato derivado del redondeo.

---

### RN-07 — Fecha Aniversario

- La fecha aniversario se determina conforme a la lógica definida en la entidad Contrato.
- Es utilizada como base para la generación de programaciones periódicas.

---

### RN-08 — Estados de Programación

•	El ciclo de vida de las programaciones generadas por prorrateo reutiliza el flujo de estados existente sin modificaciones.

| Estado       | Descripción                                      |
| ------------ | ------------------------------------------------ |
| Pendiente    | Programación generada pendiente de ejecución     |
| Programación | Programación calendarizada para ejecución futura |
| Revisión     | En proceso de validación                         |
| Comprobado   | Validado contra evidencia o documento            |
| Finalizado   | Pago completado                                  |
| Cancelado    | Programación anulada                             |

------

### RN-09 — Reactivación de registros de prorrateo

- Solo es posible reactivar un registro de prorrateo que se encuentre en estatus Cancelado.
- Al reactivar, el sistema valida que el centro de trabajo del registro no esté ya asignado en otro registro activo del mismo contrato.
- Al reactivar, el sistema valida que la suma de porcentajes de los registros activos (incluyendo el reactivado) sea igual a 100%.
- Si alguna validación falla, el sistema bloquea la reactivación y muestra mensaje de error.
- La reactivación queda registrada en bitácora con el valor anterior del estatus.
