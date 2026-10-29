# Contexto de STRUCTURA AI para crear su sitio web

**Corte del análisis:** 29 de octubre de 2026.  
**Repositorio:** `construction`, rama `main`, limpio al momento de revisar.  
**Objetivo de este documento:** pasar el contexto de producto a otra terminal para diseñar e implementar una página web pública para STRUCTURA AI. Este archivo no cambia la aplicación ni define por sí solo una promesa comercial.

## 1. Qué es el proyecto

STRUCTURA AI es una herramienta web que ayuda a familias autoconstructoras —inicialmente en el estado de Colima— a convertir una descripción de su vivienda deseada en opciones de distribución y documentación preliminar para conversar con profesionales y planear el proyecto.

La idea principal para comunicar es **planear con más claridad antes de construir**: describir las necesidades, comparar alternativas y entender qué datos, reglas y costos se consideraron.

No es un despacho de arquitectura, una autoridad municipal ni un servicio de cálculo estructural certificado. La aplicación ofrece propuestas preliminares y materiales de apoyo; no sustituye la revisión de un arquitecto, un Director Responsable de Obra (DRO), un ingeniero ni la confirmación de Desarrollo Urbano.

## 2. Usuarios y necesidad

- **Usuario principal:** familia que planea autoconstruir una vivienda y necesita ordenar sus necesidades, presupuesto y datos del terreno.
- **Usuario secundario:** arquitecto o profesional que puede revisar la propuesta y usar los archivos de apoyo.
- **Contexto geográfico actual:** Colima, México. No presentar el producto como una solución disponible para todo México.
- **Necesidad de comunicación:** explicar conceptos técnicos en español mexicano sencillo; mostrar los límites de la herramienta con la misma claridad que sus funciones.

## 3. Qué hace hoy la aplicación

El producto funcional está en `frontend/` (Next.js) y consume una API FastAPI en `src/api/`.

1. La persona describe por texto o voz su vivienda, presupuesto, número de habitantes y terreno. Si falta información necesaria, el wizard pide ese dato de forma puntual.
2. El sistema revisa si las medidas del predio permiten continuar según la información normativa disponible.
3. Genera tres tipologías para comparar: **hilera, jardín lateral y dos franjas**. El plano 2D esquemático ubica los espacios dentro del terreno y aplica mínimos y restricciones disponibles en el catálogo.
4. La persona revisa lo entendido, puede indicar orientación del frente y elige una opción; también puede explorarla en 3D antes de decidir.
5. El pipeline revisa reglas disponibles, estima materiales de obra negra y muestra el avance del procesamiento.
6. Para una propuesta aceptada se pueden descargar un informe PDF y un plano DXF. El resultado también puede incluir modelo 3D GLB, texturas y un visor interactivo con puertas, ventanas, terreno, vistas y acabados configurables.
7. Hay funciones adicionales sujetas a disponibilidad del servidor: imágenes de render con Blender, IFC, realidad aumentada en Android y USDZ/Quick Look para iPhone. El cliente consulta `/api/capacidades` antes de mostrar las funciones opcionales.
8. La familia puede pedir acabados por texto o voz, comparar dos diseños y descargar una ficha de acabados. El formulario de viabilidad legal es orientativo y está pendiente de revisión del equipo.

## 4. Cobertura y límites que deben reflejarse en el sitio

- El catálogo normativo que usa la app incluye actualmente **Armería, Colima, Comala y Manzanillo**. La existencia de reglas para un municipio no significa que cada parámetro esté completo o verificado. Hay valores con estado `ORIENTATIVO`, `PENDIENTE_VERIFICAR` o referencia a otro municipio. Evitar decir “cumple toda la normativa de Colima” o “aprobado por el municipio”.
- La disponibilidad real de municipios se obtiene de `GET /api/municipios`. Si el sitio publica una lista dinámica, debe venir de esa API; si no, usar una frase general como “cobertura normativa en expansión” y no una afirmación de cobertura completa.
- El presupuesto se limita a **materiales de obra negra**. No incluye mano de obra, instalaciones, acabados presupuestados, puertas y ventanas como partidas de costo, trámites ni otros conceptos que el informe enumera como no incluidos. Los precios se alimentan de cotizaciones existentes y precios de referencia claramente identificados; no hay scrapers de proveedores activos. Describirlo como **estimación orientativa de materiales**, nunca como precio final o cotización garantizada.
- El cálculo estructural no se presenta como una memoria estructural aprobada. En la experiencia actual se ocultan sus resultados numéricos y se indica que requiere revisión de un DRO/ingeniero.
- Los planos y modelos son propuestas esquemáticas de una vivienda de una planta. Aunque se generan a escala y con geometría, no son planos ejecutivos listos para obra ni autorizaciones.
- Las cotas y reglas del modelo 3D pueden incluir supuestos orientativos. El sistema debe conservar sus avisos; el sitio público tampoco debe borrar esa distinción.
- Los renders con Blender y las exportaciones AR/IFC dependen de que el backend tenga las capacidades configuradas. No prometer que siempre estarán disponibles.
- No hay precios confirmados de acabados, mano de obra ni una oferta de marketplace/pagos implementada.
- No usar cifras de ahorro, testimonios, número de usuarios, avales profesionales o estadísticas como prueba social sin fuente verificable en el proyecto y aprobación del equipo.

## 5. Posicionamiento y tono sugeridos

### Mensaje principal

**Planea tu vivienda con más claridad, desde el terreno hasta la distribución.**

Alternativa breve para el hero: **Tu casa empieza con un buen plan.**

### Tono

- Cercano, respetuoso y práctico; nunca paternalista.
- Claro para quien no conoce términos de arquitectura.
- Honesto sobre estimaciones, cobertura y revisión profesional.
- En español mexicano; usar “vivienda”, “terreno”, “distribución”, “materiales” y “revisión profesional”. Explicar siglas como COS, CUS, DXF, IFC y DRO cuando aparezcan.
- Evitar expresiones como “casa aprobada”, “diseño garantizado”, “construye sin arquitecto”, “cálculo estructural seguro”, “presupuesto exacto” y “proyecto ejecutivo”.

## 6. Sitio web propuesto

El objetivo del sitio público es explicar el producto y llevar a la herramienta existente.

### Llamada principal a la acción

- Texto: **Empieza a planear tu vivienda** o **Probar el planeador**.
- Destino: `/wizard/analizar`.
- La página raíz actual, `frontend/app/page.tsx`, redirige inmediatamente al wizard. Si se construye el sitio público dentro de este Next.js, convertir `/` en landing y mantener el wizard intacto bajo `/wizard/...`.

### Secciones sugeridas

1. **Encabezado:** marca STRUCTURA AI, navegación por anclas (“Cómo funciona”, “Qué obtienes”, “Alcance”) y botón para iniciar.
2. **Hero:** beneficio concreto, audiencia local y CTA. Usar un recorte real del visor 3D o un plano del producto si está disponible; no ilustrar como si fuera una casa aprobada.
3. **Cómo funciona:** describe tus necesidades → compara tres distribuciones → revisa el resultado y llévalo a un profesional.
4. **Qué puedes explorar:** planos preliminares, dictamen con reglas citadas disponibles, estimación de materiales y visor 3D/acabados.
5. **Transparencia:** cobertura municipal, alcance del presupuesto y necesidad de revisión profesional. Esta sección debe estar visible y ser fácil de entender, no escondida en letra pequeña.
6. **Cierre con CTA:** volver a `/wizard/analizar`.
7. **Pie:** nombre del proyecto, Colima, México y enlaces solo a páginas realmente implementadas. No inventar aviso de privacidad, contacto, redes sociales o entidades legales: si se necesitan, solicitar los datos al equipo o no mostrarlos.

Las secciones son una recomendación para una landing informativa, no un requerimiento de crear una aplicación comercial completa.

## 7. Identidad visual existente

Tomar como base el diseño ya aplicado en `frontend/app/globals.css` y el encabezado del wizard (`frontend/app/wizard/layout.tsx`):

- Fuente: **Archivo**, con títulos condensados y pesados tipo rótulo de obra.
- Fondo verde grisáceo claro `#EDF0EC`, tarjetas color papel `#FBFCFA`, tinta azul grafito `#16262E`.
- Azul de marca `#0B4F7A`; amarillo de marcador `#F2B312` para acentos puntuales.
- Cuadrícula muy tenue de libreta/planos. Mantenerla sutil, con espacio en blanco, bordes sobrios y detalles gráficos de arquitectura.
- Marca actual: logotipo geométrico inline (círculo, cuadrado girado y marcador). No hay un paquete de marca externo en `public/`.
- Priorizar contraste, lectura móvil, botones cómodos, foco visible y `prefers-reduced-motion`.

No rediseñar el wizard como parte de la landing salvo que se solicite explícitamente: el sitio de presentación y el flujo funcional cumplen propósitos distintos.

## 8. Stack y límites técnicos del repositorio

- Frontend existente: Next.js **16.4.3**, React 19, TypeScript, Tailwind CSS 4, shadcn/ui/Base UI, Framer Motion, Lucide y Three.js/React Three Fiber para el visor.
- Backend existente: FastAPI/Python. Endpoints relevantes: `/api/municipios`, `/api/capacidades`, `/api/analisis/*`, `/api/opciones`, `/api/pipeline/ejecutar` y `/api/entregables/*`.
- No hace falta añadir otro framework para una landing estática. Reutilizar el Next app y sus dependencias cuando sea razonable.
- El entorno Next tiene cambios incompatibles con versiones anteriores. Antes de editar Next, leer `frontend/AGENTS.md` y la documentación local relevante bajo `frontend/node_modules/next/dist/docs/`.
- El frontend tiene Vitest y Playwright configurados; seguir el flujo existente si se modifica código. No tocar las rutas del wizard al convertir `/` en página pública.
- El estado actual revisado es `main` y limpio. Los últimos cambios integrados son M-18/M-19, incluyendo distribución geométrica y tres tipologías; no basar la página en textos antiguos del README sobre diagramas meramente topológicos.

## 9. Referencias internas para verificar detalles

- Estado consolidado más reciente: `CLAUDE.md` (actualizado al 2026-10-24, con bitácora de decisiones hasta 2026-10-28 en `PLAN_IMPLEMENTACION.md`).
- Flujo e interfaces reales: `frontend/app/wizard/`, `frontend/components/`, `frontend/lib/api.ts` y `src/api/`.
- Capacidades opcionales del servidor: `src/api/routes/capacidades.py`.
- Reglas, estados de fuente y cobertura: `src/utils/normativa_estado_colima.json`, `src/utils/normativa_catalogo.py`, `PDF/fuentes.json` y `docs/COBERTURA_MUNICIPIOS.md`.
- Tipologías y acomodo actuales: `src/agents/tipologias.py`, `src/agents/plano_2d.py`, `src/agents/arquitectonico.py` y `MEJORAS_STRUCTURA.md` (M-18/M-19).
- Estado operativo de renders y Blender: `docs/BLENDER_LOCAL.md` y `src/api/routes/renders.py`.
- `readme.md` describe partes útiles del producto, pero su sección “Estado actual” está fechada en 2026-10-01 y varias frases ya quedaron antiguas. Contrastar siempre con código y bitácora reciente antes de copiar texto.

## 10. Lista rápida de aceptación para la futura landing

- En menos de unos segundos se entiende para quién es STRUCTURA AI y qué permite hacer.
- El CTA principal abre el wizard existente en `/wizard/analizar`.
- Los textos distinguen estimaciones de garantías y borradores de aprobaciones.
- No promete cálculo estructural profesional, autorización oficial, precio final ni cobertura completa de todos los municipios.
- En móvil se navega y lee sin desbordamientos; funciona con teclado y lector de pantalla.
- No inventa testimonios, estadísticas, alianzas, contacto, precios ni políticas legales.
- Conserva coherencia visual con la interfaz actual y no rompe `/wizard/*`.
