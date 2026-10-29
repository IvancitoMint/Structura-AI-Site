# STRUCTURA AI — Landing page

Sitio público informativo de **STRUCTURA AI**, una herramienta en desarrollo para ayudar a familias autoconstructoras de Colima a organizar las necesidades de su vivienda, comparar distribuciones preliminares y preparar una conversación más clara con profesionales.

La landing comunica las funciones y los límites actuales del producto. No presenta las propuestas como planos ejecutivos, autorizaciones municipales, cálculos estructurales aprobados ni presupuestos finales.

## Estado actual

- Sitio estático en HTML, CSS y JavaScript.
- Diseño responsive y accesible.
- El planeador todavía no está abierto al público.
- Los botones principales conducen a la sección interna **Próximamente**; no enlazan al wizard en desarrollo.
- La publicación mediante OpenAI Sites está configurada, pero no desplegada desde este repositorio.

## Estructura

```text
.
├── .openai/
│   └── hosting.json       # Configuración de alojamiento en Sites
├── dist/
│   ├── index.html         # Contenido y estructura de la landing
│   ├── styles.css         # Diseño, responsive y accesibilidad
│   ├── script.js          # Menú, animaciones y demo de tipologías
│   └── src/
│       ├── logo.jpeg
│       └── logo_alternativo.jpeg
├── context.md             # Contexto de producto y criterios de comunicación
├── social_media.md        # URLs oficiales de redes sociales
└── README.md
```

## Ejecutar localmente

No requiere instalar dependencias ni ejecutar un proceso de compilación.

Desde la raíz del proyecto:

```bash
python3 -m http.server 4173 --directory dist
```

Después abre:

```text
http://localhost:4173
```

También es posible abrir `dist/index.html` directamente, aunque se recomienda utilizar un servidor local para reproducir mejor el comportamiento del sitio publicado.

## Secciones de la página

1. Presentación y mensaje principal.
2. Demostración interactiva de tres tipologías de distribución.
3. Proceso de planeación.
4. Entregables preliminares.
5. Alcance, límites y necesidad de revisión profesional.
6. Redes sociales oficiales.
7. Estado de apertura al público.

## Redes sociales

Las URLs oficiales se documentan en [`social_media.md`](social_media.md) y se muestran en la sección **Redes** de la landing:

- Instagram
- Facebook
- YouTube

Al modificar un perfil, actualiza tanto `social_media.md` como los enlaces correspondientes en `dist/index.html`.

## Identidad visual

La página toma como base:

- Fondo verde grisáceo: `#EDF0EC`
- Papel: `#FBFCFA`
- Tinta azul grafito: `#16262E`
- Azul de marca: `#0B4F7A`
- Amarillo de acento: `#F2B312`
- Tipografía: Archivo

El logotipo alternativo se usa como isotipo en el encabezado y el pie. El logotipo completo aparece en la sección de redes.

> Nota: el archivo `logo.jpeg` contiene la palabra “ARCHITECT”. Conviene confirmar que esta leyenda se mantendrá antes de la publicación pública, ya que STRUCTURA AI no se presenta como un despacho de arquitectura.

## Criterios de contenido

Antes de editar textos, consulta [`context.md`](context.md). En particular:

- Hablar de propuestas y planos **preliminares**.
- Describir los costos como estimaciones orientativas de materiales de obra negra.
- No prometer cobertura normativa completa.
- No afirmar que los resultados están aprobados por autoridades.
- Mantener visible la necesidad de revisión por arquitectos, ingenieros, un Director Responsable de Obra y autoridades municipales.
- No inventar testimonios, estadísticas, precios, alianzas o datos de contacto.

## Accesibilidad

La implementación incluye:

- Enlace para saltar al contenido.
- Navegación mediante teclado y foco visible.
- Menú adaptable para pantallas pequeñas.
- Texto alternativo para recursos relevantes.
- Respeto por `prefers-reduced-motion`.
- Enlaces externos con `rel="noopener noreferrer"`.

## Publicación

El archivo `.openai/hosting.json` configura `dist/` como directorio estático. Para publicar mediante Sites se requiere autorización para sincronizar el código con el repositorio externo asociado al proyecto.

No publiques una versión sin comprobar antes:

- Que no existan enlaces hacia rutas internas del planeador en desarrollo.
- Que los perfiles sociales sean correctos.
- Que la página funcione en móvil y escritorio.
- Que los avisos de alcance sigan visibles.

## Alcance técnico

La landing es independiente del frontend funcional de STRUCTURA AI. Cuando el planeador esté listo para abrirse al público, los CTA podrán sustituir sus enlaces a `#proximamente` por la ruta definitiva, prevista originalmente como `/wizard/analizar`.
