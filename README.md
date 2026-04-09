# Business-Suite

Repositorio de documentación centralizada para **Business Suite**.

## ¿Qué contiene este repositorio?

Este repositorio es **exclusivo para documentación** (sin código fuente). Agrupa los documentos BRD (Business Requirements Document) y FSD (Functional Specification Document) de múltiples módulos, organizados por área funcional.

## Estructura del repositorio

```
Business-Suite/
├── docs/
│   ├── index.md                                      ← Página de inicio del sitio
│   ├── Catalogos/
│   │   └── Gestion-TI/
│   │       └── documentacion/
│   │           ├── index.md
│   │           ├── BRD.md
│   │           └── FSD.md
│   ├── Procesos/
│   │   └── Gestion-TI/
│   │       └── documentacion/
│   │           ├── index.md
│   │           ├── BRD.md
│   │           └── FSD.md
│   └── Consultas/
│       └── Gestion-TI/
│           └── ReporteForecast/
│               └── documentacion/
│                   ├── index.md
│                   ├── BRD.md
│                   └── FSD.md
├── mkdocs.yml                                        ← Configuración de MkDocs
├── README.md
└── .github/
    └── workflows/
        └── docs.yml                                  ← Despliegue automático a GitHub Pages
```

## Cómo está organizado

Los módulos se agrupan por área funcional:

- **Catálogos** — Módulos de mantenimiento de catálogos
- **Procesos** — Módulos de procesos operativos
- **Consultas** — Módulos de reportes y consultas

Cada módulo tiene su propia carpeta `documentacion/` con tres archivos:

| Archivo | Descripción |
|---------|-------------|
| `index.md` | Resumen e introducción del módulo |
| `BRD.md` | Business Requirements Document |
| `FSD.md` | Functional Specification Document |

## Cómo contribuir

1. Clona el repositorio:
   ```bash
   git clone https://github.com/solis1408/Business-Suite.git
   cd Business-Suite
   ```

2. Crea o edita los archivos Markdown correspondientes al módulo.

3. Para previsualizar el sitio localmente:
   ```bash
   pip install mkdocs-material
   mkdocs serve
   ```

4. Abre tu navegador en `http://127.0.0.1:8000` para ver el resultado.

5. Haz commit y push a `main` — el sitio se desplegará automáticamente en GitHub Pages.

## Sitio de documentación

El sitio publicado está disponible en: [https://solis1408.github.io/Business-Suite/](https://solis1408.github.io/Business-Suite/)

### ⚙️ Activar GitHub Pages (solo una vez)

Para que el sitio sea visible, debes habilitar GitHub Pages en la configuración del repositorio:

1. Ve a **Settings** → **Pages** en este repositorio.
2. En **Source**, selecciona **Deploy from a branch**.
3. En **Branch**, selecciona `gh-pages` y carpeta `/ (root)`.
4. Haz clic en **Save**.

El sitio estará disponible en `https://solis1408.github.io/Business-Suite/` en 1–2 minutos.

> **Nota:** El workflow `.github/workflows/docs.yml` despliega automáticamente el sitio a la rama `gh-pages` en cada push a `main`. Solo necesitas activar GitHub Pages una vez.

## Convenciones de nomenclatura

- Los nombres de carpetas **no usan acentos ni espacios** para evitar problemas en URLs.
  - ✅ `Catalogos/Gestion-TI/`
  - ✅ `Procesos/Gestion-TI/`
  - ✅ `Consultas/Gestion-TI/ReporteForecast/`
