Foundathyon
Design System v2.1 · Suite Community
Acento
{{ themeLabel }}
{{ n.num }} {{ n.label }}
Versión
2.1.0 · agosto 2026
Suite Community
Un lenguaje, todas las herramientas
Sistema de diseño para la suite Community de Foundathyon — Vault, Dokgistry, Accounts, Cronify y Mocky. Misma identidad que la v1 —dark-first, densidad de panel, acento por producto— con la arquitectura de tokens, los estados y la accesibilidad que le faltaban, y ahora con las familias que un producto entero necesita: developer UI, tablas por dominio, visualización, seguridad, auditoría, documentación y email. Todo lo que se ve abajo es el componente real, en ambos temas y con el acento del producto seleccionado arriba.
27 hallazgos auditados
18 categorías · 5 productos
WCAG 2.2 AA
Prefijo
--fdn-*
00 · Fase 1
Auditoría del sistema v1
27 hallazgos sobre el documento y los tokens reales de
globals.css
. Cada uno indica cómo queda resuelto en v2. Lo que la v1 acierta —el modelo «acento = producto», la densidad de herramienta, los washes semánticos, el estado codificado en forma— se conserva sin tocar.
Bien resuelto
Acento como único token de marca por producto. Estado en forma (pill + dot), no sólo color. Neutrales fríos coherentes. Empty state ya existente y bien escrito.
Riesgo estructural
«Portar verbatim copiando CSS» no sobrevive al tercer producto. Dos capas paralelas (CSS artesanal + shadcn) con dos radios base garantizan divergencia.
Bloqueante
Contraste del botón primario y del focus ring por debajo de AA. Sin disabled, loading, error ni read-only: los componentes sólo existen en su estado feliz.
Critical
5 hallazgos · rompen accesibilidad o usabilidad en producción
C‑01 · Contraste del botón primario
Texto blanco sobre
#f97316
= 2.9:1 y sobre
#d9480f
= 4.0:1. AA exige 4.5:1 para 12 px.
accent-solid
se genera en oklch con la L calibrada por hue (§02): el criterio es el contraste medido, ≥5:1 con blanco, no un número de L. El naranja de marca se conserva íntegro para logo, texto de acento y washes.
C‑02 · Focus ring invisible
Los inputs sólo cambian el color del borde a 1 px, sin offset ni contraste garantizado. WCAG 2.2 (2.4.11) pide 3:1 y área mínima.
Anillo global de 2 px + 2 px de offset con
--fdn-focus
, aplicado vía
:focus-visible
a todo control. Nunca se suprime sin sustituto.
C‑03 · No existen estados no felices
Ningún componente define disabled, loading, read‑only, invalid ni selected. Cada app los improvisa y divergen.
Matriz de estados obligatoria por componente (§09–§14), con receta fija: disabled = 45 % opacidad +
cursor:not-allowed
; loading = spinner in situ + ancho estable.
C‑04 · Errores de formulario sin semántica
El hint existe pero no se asocia al input; no hay
aria-invalid
, ni
aria-describedby
, ni mensaje de error. El 409 del backend no tiene dónde aterrizar.
Componente Form Field : label + control + description + error, con ids enlazados e icono. El error nunca reemplaza a la descripción, se añade.
C‑05 · Objetivos táctiles de 28 px
Los icon buttons de 28 px quedan lejos de los 44 px recomendados; en móvil el shell es inoperable con el pulgar.
Densidad como decisión de entorno:
compact
(28 px) para puntero fino,
comfortable
(36 px) y área táctil ampliada bajo
pointer:coarse
. Ver §08.
High
9 hallazgos · el sistema no escala al tercer producto
H‑01 · Prefijo
--vault-*
fuera de Vault
«El linaje del shell» es deuda de nomenclatura: un dev nuevo en Dokgistry lee tokens de otro producto.
Prefijo único
--fdn-*
con alias temporales
--vault-* → --fdn-*
durante una versión, luego se eliminan.
H‑02 · Dos capas de tokens en paralelo
CSS artesanal (Vault, radio 0.5 rem) y shadcn con
@theme inline
(Dokgistry, radio 0.625 rem). Mismo componente, dos formas.
Una escala de radios única (§05) y un puente: las variables shadcn se derivan de
--fdn-*
, nunca al revés.
H‑03 · Distribución por copy‑paste
Portar el bloque verbatim funciona con 2 repos; con 5 hace imposible corregir un token en todos a la vez.
Paquete versionado
@foundathyon/ds
(tokens CSS + componentes) con semver. Ver §18.
H‑04 · Acentos indistinguibles
#d9480f
y
#f97316
son el mismo naranja para el ojo. Con cinco productos el modelo colapsa.
El acento es un hue , no un hex: L y C fijos, hue reservado por producto con separación mínima de 40°. La marca Foundathyon retiene el naranja. Ver §02.
H‑05 · Washes idénticos en ambos temas
«Los fills tintados no cambian entre temas» es cómodo pero falso:
rgba(245,196,81,.15)
sobre blanco es casi invisible.
Cada semántico expone la tétrada
-text / -bg / -border / -solid
y se redefine por tema.
H‑06 · Tipografía sin escala
Siete tamaños ad‑hoc descritos por su uso («botones/inputs») en vez de por su nivel. Sin caption, label, overline ni code formalizados.
Escala de 11 pasos con nombre, peso, interlineado y tracking, más roles semánticos. Ver §03.
H‑07 · Sin spacing ni sizing tokenizados
Valores sueltos (0.875 / 1.25 / 0.625 rem) repartidos por el CSS; nada impide el siguiente valor arbitrario.
Escala de 4 px con 13 pasos + escalas de control, icono, avatar y contenedor. Ver §04.
H‑08 · Elevación inexistente
Una sola sombra decorativa en el botón primario. Sin niveles, los overlays no pueden expresar jerarquía ni orden de apilado.
Seis niveles atados a un rol (sticky, dropdown, modal…) y a un
z-index
. En dark la elevación es superficie más clara + sombra, no sólo sombra.
H‑09 · Tres mecanismos de tema
prefers-color-scheme
+
data-theme
+ clase
.dark
, y el claro scoped a
.adminShell
deja login y onboarding siempre oscuros ignorando la preferencia del usuario.
Una sola fuente:
data-fdn-theme
en
<html>
(system | light | dark), aplicado a toda la app incluidos login y onboarding.
Medium
8 hallazgos · huecos de inventario y consistencia
M‑01 · Estado sólo por color y tachado
«Revoked» se distingue por line‑through y gris. → Badge gana icono opcional; el significado nunca depende sólo del color.
M‑02 · Pill y StatusBadge duplicados
Mismo objeto visual, dos implementaciones. → Un Badge con variantes tonal/outline/solid y prop
dot
.
M‑03 · Tabla con demasiadas responsabilidades
Una
.adminTable
para todo. → Se separa Table (presentación) de Data Table (selección, orden, filtros, paginación, estados).
M‑04 · Tabla sin loading ni error
Sólo hay empty. → Cuatro estados canónicos: loading (skeleton de filas), empty, error, sin resultados de filtro (distinto de empty).
M‑05 · Motion sin tokens
Un único
150ms ease
. Y
*{transition:none!important}
mata también los fades necesarios. → §06.
M‑06 ·
translateY(1px)
en :active
Desplaza el layout y molesta con lector de pantalla + zoom. → Pressed = oscurecer el fill; sin movimiento.
M‑07 · Iconografía sin regla
Stroke 2.4 en la marca, 2 en botones, 1.5 en empty state. → Un único stroke 1.5 px y escala de 4 tamaños. Ver §07.
M‑08 · Inventario de formulario incompleto
Sólo input y select pese a que el producto tiene invitaciones, roles, expiraciones y uploads. → §10.
Low
5 hallazgos · pulido y documentación
L‑01 · Breakpoints no declarados
Un
40rem
puntual en el doc. → Cinco breakpoints con nombre. §08.
L‑02 · Scroll horizontal sin affordance
Tablas con
nowrap
y overflow mudo. → Sombra de borde + columna primaria fijada.
L‑03 · Falta Avatar / usuario
Hay members, roles e invitaciones sin representación visual de persona. → Avatar + AvatarGroup.
L‑04 · Sin skeleton ni spinner
Nada que mostrar mientras el registry sincroniza. → Ambos, con regla de cuándo usar cada uno.
L‑05 · Documentación sin «cuándo NO»
El doc describe, no decide. → Cada componente lleva uso, no‑uso y anti‑patterns; §17 resuelve los dilemas recurrentes.
01 · Fase 2
Cómo decide la suite
Cinco principios. Cuando dos se contradicen, gana el de arriba.
01 Operable antes que bonito
Son paneles que se operan, no páginas que se leen. Densidad alta, teclado primero, estado legible de un vistazo. Ninguna decisión estética puede quitar un estado, un foco o un contraste.
02 El acento es el producto
Un producto = un hue. Todo lo demás —neutrales, semánticos, componentes, métricas— es de la suite y no se negocia. El acento significa «acción o marca»; jamás estado.
03 Dark-first, claro de primera clase
Se diseña en oscuro y se verifica en claro antes de mergear. El tema aplica a toda la app —login y onboarding incluidos—; forzar oscuro a quien pidió claro es un fallo de accesibilidad, no una decisión de marca.
04 Sin estados no hay componente
Un componente entra al sistema cuando tiene default, hover, focus-visible, pressed, disabled y —si carga datos— loading y error. El estado feliz no es entregable.
05 Un origen versionado
Los tokens y los componentes viven en un paquete con semver, no en un bloque que se copia. Si algo no existe como token, se añade el token — nunca un literal suelto en el componente.
02 · Tokens
Color
Tres capas: primitivas (oklch, sin significado), semánticas (lo que un componente puede consumir) y de componente (sólo cuando un componente necesita desviarse, y siempre derivadas de una semántica). Un componente nunca lee una primitiva ni un hex.
Neutrales — hue 286, compartidos por toda la suite
4 superficies · 2 bordes · 4 niveles de texto
Token
Muestra
Dark
Light
Uso obligado
bg L .155 C .006 L .983 C .002 Lienzo de la app y de la sidebar. Nunca en cards.
bg-subtle L .185 L .962 Zonas embebidas: header de tabla, code block, footer de diálogo.
surface L .208 #ffffff Cards, tablas, inputs, paneles.
surface-raised L .238 #ffffff Todo lo que flota: modal, popover, dropdown, toast. En dark la elevación se lee por luminancia, no por sombra.
surface-hover L .262 L .958 Hover de fila, ítem de menú, botón fantasma.
border L .305 L .905 Contorno por defecto y separadores.
border-strong L .42 L .775 Bordes que deben cumplir 3:1: input, checkbox, radio, switch.
text 15.8:1 14.9:1 Contenido primario, valores de dato.
text-secondary 9.1:1 8.4:1 Párrafos de apoyo y descripciones largas.
text-muted 5.6:1 4.8:1 Metadatos, headers de tabla, hints. Mínimo AA — no bajar más.
text-disabled 2.6:1 2.4:1 Sólo controles inertes. Exento de contraste por definición (1.4.3), nunca para texto informativo.
El acento es un hue con L calibrada
Cada producto reserva un ángulo. Fijar L no fija el contraste : a croma constante la luminancia sube en verdes y amarillos y baja en azules, así que la misma L da 4.6:1 en 45° y 3.8:1 en 165°. Lo que el sistema fija es el contraste medido : cada hue lleva la L que alcanza ≥5:1 con blanco. Un producto nuevo declara
--fdn-accent-hue
y su
--fdn-accent-l
calibrada; separación mínima entre productos: 40°.
Aa
Vault · hue 45 · L .56 · 5.0:1
Naranja de marca. Hereda el
#d9480f
actual.
Aa
Dokgistry · hue 62 · L .55 · 5.0:1 ⚠
A 17° de Vault: por debajo del mínimo de separación. Migrar a 125 o 210 en la próxima minor.
Aa
Accounts · hue 195 · L .55 · C .105 · 5.1:1
El teal ya en uso en Accounts. El cian tiene menos croma disponible en sRGB: se baja C, no L.
Aa
Cronify · hue 165 · L .51 · 5.0:1
Verde. Exige bajar 5 puntos de L para el mismo contraste. Riesgo: colisiona con
success
— su acento nunca aparece junto a un badge de estado.
Aa
Mocky · hue 300 · L .56 · 5.0:1
Magenta. Reservado — mocking de APIs.
Criterio de admisión de un hue nuevo: se mide el contraste de
accent-solid
con blanco y se ajusta L hasta ≥5:1 (margen sobre el 4.5 de AA); si el hue no llega sin perder identidad, se usa texto oscuro vía
--fdn-accent-on-solid
. Ningún hue entra sin la medición en el PR.
Derivados del acento
Seis tokens derivados de dos números:
--fdn-accent-hue
y
--fdn-accent-l
. Cambia el selector de arriba y observa que ninguna proporción se rompe.
accent-solid
L calibrada · ≥5:1 con blanco
…-hover
L − 0.06
…-active
L − 0.11 · pressed
accent-bg / -border
wash y contorno
Aa
accent-text
texto y enlaces
focus
anillo, ≥3:1
Regla: el acento no aparece en fondos amplios ni en estados. Ocupa como mucho un 5 % del pixel de una pantalla.
Semánticos — tétrada fija por intención
-text · -bg · -border · -solid
, redefinidos por tema
Success
Hue 150. Activo, sincronizado, protegido, operación confirmada. Nunca para «info positiva» genérica.
Warning
Hue 82. Expira pronto, cuota al 90 %, configuración degradada. Algo requiere atención pero nada ha fallado.
Danger
Hue 25. Fallo, revocación, borrado. Es el único color de las acciones irreversibles.
Info
Hue 245. Pendiente, en proceso, informativo neutro. Deliberadamente distinto del acento para no confundir marca con estado.
-text sobre bg o surface · AA
-bg relleno tonal de badges y alerts
-border contorno de esos rellenos
-solid fondo pleno con texto blanco · sólo botón destructivo y barras de progreso
03 · Tokens
Tipografía
Inter para interfaz, pila mono del sistema para lo verificable (tokens, digests, comandos, rutas, SHAs). La escala se nombra por nivel, no por uso: el uso se documenta al lado, pero el token es el nivel.
display
38 / 44 · 700 · −0.02em
Tu infraestructura, bajo control
h1
30 / 36 · 700 · −0.02em
Repositorios
h2
22 / 28 · 700 · −0.015em
Miembros de la organización
h3
18 / 24 · 600 · −0.01em
Tokens de acceso activos
h4
15 / 20 · 600
Configuración del registry
h5
13 / 18 · 600 · título de card
Últimas sincronizaciones
body
13 / 20 · 400 · base de la UI
Invita miembros, asigna roles y revoca el acceso por organización. Los cambios se aplican en la siguiente petición del cliente.
body-sm
12 / 18 · 400
Celdas densas, descripciones secundarias, contenido de tooltip.
label
12 / 16 · 500 · controles
Nombre del recurso
caption
11 / 15 · 400 · hints
Único dentro de su nivel — el backend responde 409 al duplicado.
overline
10.5 · 600 · +0.05em · caps
Resource · Project · Status · Expires
code
11.5 · mono · tabular
sha256:4a3ed8…9f21 · curl -H "Authorization: Bearer $TOKEN"
Escalado responsive
Sólo
display
,
h1
y
h2
escalan (−20 % bajo
md
). El cuerpo de UI no cambia: 13 px es 13 px en cualquier viewport, porque la densidad de dato no depende del ancho.
Reglas duras
Máximo 3 niveles por pantalla. Nunca 700 bajo 15 px (usar 600). Medida de lectura ≤ 72ch. Números de dato siempre
tabular-nums
. Sin cursivas en UI.
Mono es semántica
Mono significa «esto es literal y copiable»: rutas, digests, tokens, comandos, IDs. Si el usuario no lo va a copiar ni comparar carácter a carácter, va en Inter.
04 · Tokens
Espaciado y tamaños
Base 4 px. Un valor fuera de la escala es un bug, no una decisión. Los pasos impares (2, 6, 10) existen sólo para ópticas internas de controles pequeños.
0.5 · 2
1 · 4
1.5 · 6
2 · 8
2.5 · 10
3 · 12
4 · 16
5 · 20
6 · 24
8 · 32
10 · 40
14 · 56
Espaciado por rol
Inline (icono ↔ texto)
6 px
Entre controles de una fila
8 px
Stack dentro de un Form Field
6 px
Entre Form Fields
16 px
Padding de card / diálogo
16 px
Gap de grid de cards
12 px
Entre secciones de página
32 px
Padding de página (desktop)
24 px
Alturas de control
xs · 24
dentro de celdas
sm · 28
densidad compact — el default de la suite
md · 32
formularios, diálogos
lg · 36
CTA de onboarding, login, touch
Todos los controles de una misma fila comparten tamaño. Bajo
pointer:coarse
el sistema sube un escalón y añade área táctil invisible hasta 44 px.
Otras escalas
Icono
12 · 14 · 16 · 20
Avatar
20 · 24 · 32 · 40
Sidebar
208 px / 48 colapsada
Header del shell
48 px
Contenedor de contenido
1360 px máx
Contenedor de prosa
720 px máx
Modal sm / md / lg
400 / 560 / 760
05 · Tokens
Forma, bordes y elevación
Un único radio base para toda la suite: 6 px. Lo que envuelve a otra cosa sube un paso. La elevación no es decorativa: cada nivel corresponde a un rol y a un
z-index
.
Radios
none
sm · 4
md · 6
lg · 8
xl · 12
full
sm
checkbox e iconos pequeños ·
md
botones, inputs, ítems de menú ·
lg
code blocks, popovers ·
xl
cards, tablas, modales ·
full
badges, dots, avatares, switch.
Elevación
flat Cards y tablas: sólo borde. z 0
xs Botón sólido, chip arrastrable. z 0
sm Header sticky y toolbar al hacer scroll. z 10
md Dropdown, popover, tooltip. z 30
md+ Vista a pantalla completa (§29, §30). z 45 — tapa la app pero no los diálogos.
lg Modal, drawer, toast. z 50
xl Command menu. z 60 — el techo del sistema.
En dark, la sombra casi no se ve: la elevación se lee subiendo la superficie a
surface-raised
. Toda superficie elevada lleva también borde — la sombra sola no basta.
Bordes y foco
1 px · contorno y separador — el 95 % de los casos
2 px · indicador de selección (tab activa, ítem de nav)
dashed · zona de drop y empty state — nunca decorativo
Foco
2 px de anillo + 2 px de offset, con
--fdn-focus
. Los contenedores con scroll reservan 4 px para que nunca se recorte.
06 · Tokens
Motion
El movimiento explica de dónde viene algo y a dónde va. En un panel de administración eso significa: corto, pequeño y nunca en el camino del dato.
Duración y easing
dur-fast · 120 ms
hover, pressed, color
dur-base · 180 ms
popover, dropdown, toast
dur-slow · 260 ms
modal, drawer, expand
ease-standard
(.2,0,0,1) · cambios en sitio
ease-enter
decelera · algo aparece
ease-exit
acelera · algo se va, 2/3 de duración
Recetas por patrón
Hover / pressed — sólo color. Sin movimiento, sin escala: el
translateY(1px)
de la v1 queda retirado.
Enter — opacidad 0→1 +
translateY(4px)
y escala 0.985→1. Nunca más de 8 px de recorrido.
Exit — sólo opacidad, a 2/3 de la duración de entrada.
Expand / collapse — altura + opacidad,
dur-slow
. El contenido no se desvanece a mitad de camino.
Drawer — desplazamiento desde el borde de origen,
dur-slow
+ overlay a 180 ms.
Página — sin transición. Un cambio de ruta debe sentirse instantáneo.
prefers-reduced-motion
La v1 hacía
*{transition:none!important}
: mata también los fades que dan continuidad. La regla v2 reduce a 0.01 ms en vez de eliminar, de modo que los callbacks de fin de transición siguen disparando y nada queda a medio montar.
· Se elimina todo desplazamiento y escala .
· Se conserva el cambio de opacidad instantáneo.
· Los indeterminados (spinner, skeleton) pasan a un pulso de opacidad suave; nunca giro continuo.
· Nada auto-reproduce ni auto-avanza en ningún caso.
07 · Fundamentos
Iconografía
Un solo set de línea (Lucide), grid de 24, stroke 1.5 px sin excepción — la v1 mezclaba 1.5, 2 y 2.4. El stroke no escala con el tamaño: a 20 px se ve más fino y así debe ser.
Escala y alineación
12
14
16
20
14 px acompaña a texto de 12–13 px; 16 px a los ítems de navegación; 20 px sólo en empty states y encabezados de diálogo. Separación icono–texto: 6 px. El icono hereda
currentColor
siempre.
Iconos de estado
check · éxito, protegido, verificado
triangle-alert · atención, expira pronto
circle-x · fallo, revocado
circle-info · pendiente, informativo
Cada estado tiene un icono fijo en toda la suite. Nunca se sustituye por otro «que pega mejor» en una pantalla concreta.
Reglas
· Un icono solo, sin texto, exige
aria-label
y tooltip. Sin excepciones.
· Los decorativos llevan
aria-hidden="true"
.
· Direccionales: chevron para expandir/navegar, arrow para mover/enviar. No se intercambian.
· Nunca un icono como único portador de significado en una tabla: icono + texto, o icono + tooltip.
· Prohibido mezclar sets o usar variantes rellenas del mismo icono para «dar énfasis».
08 · Estrategia
Responsive
La suite es desktop-first porque el trabajo real —operar un registry, revocar un token— ocurre en escritorio. Móvil no es una versión reducida: es un modo de consulta y acción puntual . La estrategia decide qué se conserva, no qué se encoge.
sm · 640
Móvil grande. Fin del layout de una columna.
md · 768
Tablet. Aparece la sidebar como drawer.
lg · 1024
Escritorio. Sidebar persistente; tablas completas.
xl · 1280
Panel de detalle lado a lado en vez de drawer.
2xl · 1536
Tope: el contenido para en 1360 px y se centra.
Elemento
< md
md – lg
≥ lg
Navegación Drawer desde la izquierda + barra inferior con 4 destinos Drawer, disparado desde el header Sidebar persistente, colapsable con ⌘B
Tabla Se convierte en lista de cards: título, 2 metadatos, badge de estado, menú Columnas prioritarias + scroll horizontal con primera columna fija Todas las columnas
Formulario Una columna, controles
lg
, acciones fijas abajo Una columna, ancho 480 px Dos columnas sólo si los campos son independientes
Modal Sheet a pantalla completa desde abajo Modal centrado, 90 % de ancho Modal centrado, ancho por tamaño
Filtros Drawer «Filtrar» con contador de activos Fila de chips desplazable Barra de filtros en línea sobre la tabla
Densidad comfortable (36 px) + área táctil 44 px comfortable compact (28 px), configurable por usuario
09 · Componentes
Acción e identidad
Los diez primitivos de los que cuelga todo lo demás. Todos los especímenes son interactivos: pasa el ratón y tabula sobre ellos.
Button
5 variantes · 4 tamaños · 7 estados
Variantes
Generar enlace
Secondary
Ghost
Revocar
Eliminar definitivamente
primary una por pantalla · secondary alternativa real · ghost acciones de fila y toolbar · destructive-subtle destructiva en contexto de lista · destructive sólo como confirmación final dentro de un diálogo.
Tamaños
xs · 24
sm · 28
md · 32
lg · 36
Estados — el contrato mínimo de todo componente interactivo
Sincronizar default
Sincronizar hover
Sincronizar focus-visible
Sincronizar pressed
Sincronizar disabled
Sincronizando loading
Listo success · 2 s
El botón conserva su ancho al pasar a loading (se reserva el ancho del texto más largo) para que la fila no salte. Disabled nunca se usa para «no tienes permiso»: en ese caso el botón se muestra activo y explica el motivo al pulsarlo, o desaparece.
Cuándo usarlo
Para ejecutar una acción. Si navega a otra ruta, es un Link — aunque parezca botón.
Cuándo no
Nunca dos primarios compitiendo, ni un primario dentro de una fila de tabla: ahí las acciones son ghost o menú.
Anti-patterns
Botón sólo con icono sin
aria-label
. Texto genérico («Aceptar»): el botón dice el verbo — «Revocar enlace».
Icon Button
Siempre cuadrado y a la altura de control de su fila.
aria-label
+ Tooltip obligatorios. Bajo puntero grueso, el área táctil se extiende a 44 px sin cambiar la caja visual.
Link
Consulta la documentación de tablas o abre el registro de auditoría .
Ir a los patterns externo
Dos tipos: accent en prosa, underlined neutral dentro de datos, donde el color de acento crearía ruido. El subrayado aparece siempre en hover — el color por sí solo no puede indicar que algo es un enlace.
Badge
unifica
.pill
+
.statusBadge
Activo
Pendiente
Expira en 2 d
Fallido
Revocado
12
Variantes
tonal
(estado),
outline
(estado terminal, sin énfasis) y
counter
. El icono es opcional pero obligatorio cuando el estado es crítico: el color nunca porta el significado solo. El badge no es clicable — si lo fuera, es un Tag o un filtro.
Tag
v1.27
latest
Añadir tag
Tag = dato editable por el usuario (tags de imagen, etiquetas de proyecto, filtros aplicados). Badge = estado que decide el sistema. Nunca se intercambian.
Avatar
MR
JL
MR
JL
AP
+7
Iniciales sobre wash semántico derivado del hash del identificador — determinista, nunca aleatorio. El punto de presencia sólo aparece donde la presencia significa algo. AvatarGroup corta en 3 + contador.
Spinner, Skeleton y Divider
Spinner: acción puntual en curso, menos de 1 s esperado.
Skeleton cuando se conoce la forma del contenido que llega (listas, tablas, cards) y la espera supera 300 ms. Spinner cuando no se conoce. Nunca los dos a la vez, nunca un skeleton que no se parezca al contenido real.
Divider con etiqueta
Tooltip
Copiar digest completo
Sólo texto, una línea, sin acciones ni enlaces dentro. Aparece a los 400 ms de hover y de inmediato al foco de teclado. Nunca contiene información necesaria para completar la tarea: si hace falta leerla, va como descripción visible.
10 · Componentes
Formularios
Todo control vive dentro de un Form Field : es él quien posee la etiqueta, la descripción, el error y los
id
que los enlazan. Ningún control se coloca suelto con un
placeholder
haciendo de etiqueta.
Form Field · anatomía y estados
resuelve C‑04
Nombre del recurso *
Único dentro de su nivel.
default · required
Nombre del recurso
Único dentro de su nivel.
focus-visible
Nombre del recurso
Ya existe un recurso con ese nombre en production .
Único dentro de su nivel.
invalid · el error se añade, no sustituye al hint
Nombre del recurso
Heredado del proyecto padre.
disabled
Digest
Calculado por el registry.
read-only · sigue siendo seleccionable y copiable
Nombre del recurso
Disponible
success · sólo tras validación asíncrona
Reglas de validación
Validar al salir del campo, no al teclear. Una vez que un campo ha mostrado error, revalidar en cada tecla para poder retirarlo cuanto antes. Nunca validar al montar.
Obligatoriedad
Se marca lo obligatorio con asterisco sólo si la mayoría de los campos son opcionales; en caso contrario se marca «(opcional)». Nunca ambas convenciones en el mismo formulario.
Anti-patterns
Placeholder como etiqueta. Error que sólo aparece arriba del formulario. Deshabilitar Guardar hasta que todo sea válido: mejor permitir el envío y señalar el primer campo con error, dándole el foco.
Input · variantes
/
registry.foundathyon.dev/
Search input, Input group con prefijo y campo secreto. Los tres son el mismo Input con slots
leading
/
trailing
, no componentes distintos.
Textarea y Select
Motivo de la revocación
Token filtrado en un log de CI.
Se guarda en el audit log. 31 / 280
Rol
Administrador Operador Sólo lectura
Select para ≤ 7 opciones conocidas y estables. Por encima: Combobox con búsqueda.
Combobox
ngin x
ngin x-ingress
library/ ngin x
Coincidencia resaltada, navegación con flechas, Enter selecciona, Esc cierra sin cambiar. El valor tecleado nunca se pierde al cerrar. Autocomplete es el mismo componente con
freeSolo
: permite valores que no están en la lista.
Checkbox, Radio y Switch
Checked
Unchecked
Indeterminate
Disabled
Cifrado en reposo
Sin cifrar
Protección de borrado
Registro público
Switch aplica su efecto de inmediato y no necesita Guardar; si hay que guardar, es un Checkbox . Radio para 2–5 opciones excluyentes visibles a la vez; por encima, Select. Toda la etiqueta es zona clicable.
Slider, OTP y File Upload
Retención de tags 30 días
Siempre con el valor numérico visible y editable al lado. Un slider sin número es un control sin dato.
Código de verificación
4
8
Acepta pegado completo y autocompletado del SMS; el borrado retrocede de casilla.
Arrastra un archivo o búscalo
YAML, JSON o .env · hasta 2 MB
app-config.yaml
64 %
Date Picker
Agosto 2026
L M X J V S D
27 28 29 30 31 1 2
3 4 5 6 7 8 9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
En 24 horas
En 7 días
En 30 días
Nunca expira
Siempre acompañado de atajos relativos: en este producto casi nadie quiere «el 25 de agosto», quieren «en 7 días». El campo acepta escritura directa y muestra la fecha absoluta resuelta bajo el control.
11 · Componentes
Feedback y estados de sistema
Regla de partida: el feedback se coloca lo más cerca posible de la causa. Un error de campo va en el campo; un error de operación va donde estaba el botón; sólo lo que afecta a toda la sesión sube al Banner.
Alert
Sincronización programada
El registry se reindexará esta noche a las 03:00 UTC.
Almacenamiento al 89 %
Elimina tags sin referencias o amplía el volumen antes de que se bloqueen los push.
Ver uso por repositorio
No se pudo conectar con el registry
Se agotó el tiempo de espera tras 30 s. Comprueba que el endpoint responde en
/v2/
.
Alert es persistente y contextual: vive dentro de la página a la que se refiere y no se descarta salvo que el usuario resuelva la causa. Título en una línea, cuerpo en dos como máximo, y una sola acción.
Toast y Banner
Enlace revocado
Deshacer
Disparar toast real
Tu plan Community caduca en 5 días.
Renovar
Toast : confirma algo que el usuario acaba de hacer, se va solo a los 4 s, esquina inferior derecha, máximo 3 apilados. Nunca para errores que requieren acción. Banner : afecta a toda la cuenta o sesión, va pegado bajo el header y sólo puede haber uno.
Progress
Subiendo capas 3 de 7
Almacenamiento 89 % · 44.5 / 50 GB
68%
Circular sólo cuando el progreso acompaña a un elemento pequeño (una fila, un avatar). Toda barra determinada lleva su valor en texto: la barra sola no es accesible.
Empty state
Aún no hay repositorios
Haz push de una imagen o sincroniza el registry para empezar.
Sincronizar
Ver docs
Tres frases como máximo y siempre una salida. «Primera vez» lleva acción primaria; «sin resultados de búsqueda» lleva «limpiar filtros» y no es el mismo estado.
Error state
No se pudieron cargar los repositorios
El registry devolvió
503
. Suele resolverse solo en unos segundos.
Reintentar
Copiar detalles
Qué pasó, si es culpa del usuario y qué hacer ahora. El detalle técnico va detrás de «Copiar detalles», nunca en el titular.
Loading state
El skeleton reproduce la estructura real: mismo número de columnas, misma altura de fila. Bajo 300 ms no se muestra nada — parpadear es peor que esperar. Se anuncia con
aria-busy
.
12 · Componentes
Navegación
El shell es idéntico en toda la suite: header de 48 px, sidebar de 208 px, breadcrumb en las vistas anidadas. Lo único que cambia entre productos son los destinos.
App shell · Navbar + Sidebar
Dokgistry
Community
Buscar ⌘K
JL
Registry
Repositorios
Tags
Políticas 3
Organización
Miembros
Ajustes
Repositorios library nginx
{{ t.label }}
Contenido de la pestaña {{ tab }} . Las tabs cambian de vista dentro del mismo objeto; nunca navegan a otro recurso ni sustituyen a la sidebar.
Estados de ítem
default, hover, current (wash de acento + barra de 2 px +
aria-current="page"
), disabled con motivo en tooltip.
Colapso
⌘B alterna a 48 px de sólo iconos; cada icono conserva su tooltip y su etiqueta accesible. La preferencia se recuerda por usuario y producto.
Teclado
Skip link al contenido como primer tabulable. Tabs con flechas y
role="tablist"
. ⌘K abre el command menu desde cualquier punto.
Pagination
41–60 de 128
1
2
3
4
…
7
Paginación numerada cuando el total importa (auditoría, tags). Scroll infinito nunca en tablas de administración: rompe el «volver» y hace imposible citar una posición.
Stepper
Endpoint
2
Credenciales
3
Verificar
Sólo para procesos lineales de 3 a 5 pasos con estado guardado entre ellos (onboarding, conexión de registry). Los pasos completados son clicables hacia atrás; los futuros no.
Dropdown Menu
Copiar comando pull
Proteger
Ver tags ⌘T
Eliminar repositorio
Máximo 7 ítems antes de agrupar con separadores. Las destructivas van al final, separadas, y siempre abren confirmación. Los atajos se muestran alineados a la derecha. Navegación completa con flechas, Home/End y búsqueda por primera letra.
13 · Componentes
Overlays
Todos comparten el mismo contrato: foco atrapado dentro, Esc cierra, el foco vuelve al disparador, el fondo no hace scroll y sólo hay un overlay modal a la vez. Nunca se abre un modal desde otro modal.
Abrir Modal
Abrir Drawer
Confirmación destructiva
Command menu ⌘K
Popover
Filtrar por estado
Protegidas
Sin firmar
Huérfanas
Aplicar Limpiar
Popover admite controles y foco; Tooltip no. Se ancla a su disparador y se reposiciona si no cabe. No atrapa el foco: al tabular fuera, se cierra.
Modal vs Drawer vs Sheet
Modal — decisión corta que bloquea el flujo: confirmar, crear un recurso con 1–4 campos. Máximo 560 px.
Drawer — trabajo lateral sin perder el contexto de la lista: detalle de un tag, edición larga, filtros. 420 px desde la derecha.
Sheet — el drawer en móvil, desde abajo, con manija de arrastre.
Página — si el contenido necesita scroll propio, tabs o más de 6 campos, deja de ser overlay.
Contrato de accesibilidad
·
role="dialog"
+
aria-modal="true"
+
aria-labelledby
apuntando al título.
· El foco entra en el primer elemento interactivo, no en el botón de cerrar.
· Trampa de foco cíclica; Esc siempre cierra excepto si hay cambios sin guardar, y entonces pregunta.
· Clic en el overlay cierra sólo lo no destructivo; una confirmación exige elegir.
· El fondo recibe
inert
; el scroll de la página queda bloqueado sin saltos de layout.
14 · Componentes
Datos
El corazón de estos productos. La v1 tenía una sola
.adminTable
haciéndolo todo; v2 separa Table (presentación pura) de Data Table (selección, orden, filtros, acciones masivas y los cuatro estados de carga).
Estado 1
Columnas
1 seleccionada
Eliminar selección
Imagen
Digest
Tamaño
Estado
nginx · 1.27, latest
sha256:4a3ed8…
142 MB
Protegida
api · v2.4.1
sha256:9bc012…
88 MB
Sincronizando
legacy-worker · v0.9
sha256:1f77aa…
310 MB
Eliminada
3 de 128 imágenes
Fila terminal a 0.6 de opacidad + badge outline con icono · orden por columna ·
tabular-nums
en toda cifra comparable
Stat / Metric
Repositorios
128
+6 esta semana
Pulls / día
2 481
media de 7 días
Etiqueta arriba, cifra grande, contexto abajo. La variación siempre con signo y periodo — «+6» sin periodo no dice nada. El color de la variación es semántico sólo si «más» es objetivamente bueno.
Accordion
{{ it.q }}
{{ it.a }}
Para contenido secundario que la mayoría no necesita. Nunca esconde algo obligatorio de un formulario. Por defecto uno abierto, y se permite abrir varios sólo si son comparables entre sí.
Timeline y Tree
Token
ci-deploy
creado
hace 2 h · maría@foundathyon.dev
Enlace compartido revocado
hace 5 h · sistema · expiración alcanzada
Registry sincronizado
ayer, 03:00 · 128 repositorios
production/
api-keys/
app-config.yaml
database.env
15 · Componentes
Layout
Cinco primitivos y una plantilla de página. Nadie escribe un
margin
suelto: el espacio lo pone siempre el contenedor con
gap
.
Primitivos
Stack
— columna con gap de la escala. El 80 % de los layouts.
Inline
— fila con gap y wrap; alinea controles de distinta altura por su centro óptico.
Grid
—
auto-fit, minmax(min, 1fr)
: sin media queries para las rejillas de cards.
Container
— ancho máximo + padding lateral. Dos anchos: contenido 1360, prosa 720.
SplitView
— lista + detalle redimensionable, con posición persistida y mínimo por panel.
Page Layout
Breadcrumb
Título de página
Una línea que explica de qué va esta pantalla.
Acción primaria
Toolbar — búsqueda, filtros, vista
Contenido
Orden fijo en toda la suite. La acción primaria vive en la cabecera de página, nunca flotando ni al final del scroll.
Card
Cabecera
Cuerpo. La card no tiene sombra: en esta suite la elevación significa «flota sobre la página», y una card no flota.
Cancelar Guardar
Cabecera y pie son opcionales; el cuerpo no. Una card clicable entera lleva hover de superficie y su título es el enlace real.
16 · Patterns
Patrones de la suite
Composiciones que se repiten en todos los micro-SaaS. Documentarlas evita que cada producto resuelva el login o el CRUD a su manera. Cada patrón fija la estructura; el contenido cambia.
Autenticación
Entra en Vault
Tus configs, disponibles para cada pipeline.
Email
Contraseña ¿La olvidaste?
Entrar
o
Continuar con SSO
Un solo layout para login, registro, recuperación y verificación: card de 320 px centrada, marca del producto arriba, un único CTA. Respeta el tema del usuario — v1 lo forzaba a oscuro. El error de credenciales aparece sobre el formulario y nunca revela si el email existe.
CRUD de recursos
Listar — Data Table con búsqueda, filtros persistidos en la URL y paginación. La URL es el estado: se puede compartir una vista filtrada.
Crear — Modal si son ≤ 4 campos; página propia si hay más. El nombre se valida contra el backend al salir del campo.
Leer — Drawer de detalle en ≥ lg (la lista se mantiene visible), página en móvil.
Actualizar — Edición en el mismo drawer. Guardado explícito con barra de acciones fija; los switches se aplican al instante.
Eliminar — Confirmación con escritura del nombre si es irreversible; toast con «Deshacer» de 10 s si es reversible.
Toda operación optimista revierte visualmente y explica el fallo en el sitio: nunca deja al usuario creyendo que se guardó.
Búsqueda y filtros
Estado: protegida
Tamaño > 100 MB
Limpiar todo
Los filtros aplicados son siempre visibles como chips quitables — nunca escondidos en un panel cerrado. Estado en la URL. La búsqueda tiene debounce de 250 ms y no roba el foco al llegar los resultados. «Sin resultados» no es un empty state: ofrece limpiar filtros.
Ajustes y onboarding
Ajustes — navegación lateral secundaria, secciones con título y descripción, un Form Field por línea, guardado por sección (no un botón global al fondo). La zona peligrosa va al final, con borde
danger
y su propia confirmación.
Perfil — mismo esqueleto que Ajustes; identidad, sesiones activas y tokens personales.
Onboarding — Stepper de 3 pasos, saltable, con estado persistido. Termina en un estado útil, no en una pantalla de felicitación.
Páginas de error — 404 y 500 comparten layout con el Error state; ambas ofrecen volver e ir al inicio, y muestran un id de traza copiable.
Command menu — ⌘K en todos los productos, con las mismas categorías: Ir a, Acciones, Recientes. Cada acción nueva del producto se registra aquí además de en su pantalla.
17 · Guidelines
Decisiones de UX
Las preguntas que se repiten en cada revisión de diseño, resueltas de una vez. Si un caso no encaja en ninguna regla, se documenta aquí antes de implementarlo.
Duda
Regla
Modal o Drawer ¿El usuario necesita ver la lista mientras trabaja? Drawer. ¿Debe decidir antes de seguir? Modal. ¿Más de 6 campos o scroll propio? Página.
Toast o Alert Toast confirma lo que el usuario acaba de hacer y desaparece. Alert describe un estado que sigue siendo verdad aunque no se mire. Un error que exige acción nunca va en toast.
Tooltip o descripción Si hace falta para completar la tarea, es texto visible. El tooltip sólo nombra iconos y añade detalle prescindible. Nunca contiene enlaces ni botones.
Select o Combobox ≤ 7 opciones fijas: Select. Más, o lista que crece con los datos: Combobox con búsqueda. 2–5 opciones que conviene comparar de un vistazo: Radio.
Tabs o navegación Tabs sólo entre vistas del mismo objeto y máximo 5. Si cambia el recurso, es sidebar. Si el contenido tarda en cargar, tabs con URL propia para poder enlazarlas.
Acción destructiva Reversible → ejecutar directo + toast con Deshacer 10 s. Irreversible → diálogo que nombra el objeto y su consecuencia, con el nombre a escribir si afecta a datos de otros. El botón dice el verbo («Eliminar repositorio»), nunca «Sí». La acción segura tiene el foco inicial.
Errores Se muestran donde ocurrió el problema. Nunca códigos crudos en el titular. Siempre una salida: reintentar, editar o contactar. El detalle técnico, copiable, detrás de un despliegue.
Cargas < 300 ms nada. 300 ms–2 s skeleton. > 2 s progreso con texto de qué está pasando. Una acción en curso desactiva su botón, no la página entera.
Éxito El estado resultante ya es la confirmación: si la fila aparece en la tabla, no hace falta toast. Toast sólo cuando el resultado no es visible en pantalla.
Formularios largos Trocear en secciones con título, guardar por sección y avisar al abandonar con cambios sin guardar. Nunca un wizard para algo que cabe en una página.
Voz y copy
· Directo y técnico, sin marketing dentro del producto. El usuario es un operador.
· Botones con verbo + objeto: «Revocar enlace», no «Aceptar».
· Sin signos de exclamación ni disculpas. «No se pudo conectar», no «¡Ups! Algo salió mal».
· Términos del dominio tal cual: repository, tag, digest, manifest. No se traducen a medias.
· Fechas relativas hasta 7 días («hace 2 h»), absolutas después, con la absoluta en el tooltip.
Accesibilidad · checklist de merge
· Recorrido completo con teclado, en orden lógico, sin trampas.
· Foco visible en todo elemento interactivo, también sobre superficies elevadas.
· Contraste 4.5:1 en texto, 3:1 en bordes de control e iconos con significado.
· Todo control tiene nombre accesible; los iconos solos,
aria-label
.
· Los errores se anuncian con
role="alert"
y se enlazan al campo.
· Zoom al 200 % sin pérdida de contenido ni scroll horizontal en formularios.
· Verificado en claro y en oscuro, y con
prefers-reduced-motion
activo.
· Ninguna información depende sólo del color.
Atajos comunes a la suite
Command menu ⌘K
Buscar en la vista /
Colapsar sidebar ⌘B
Nuevo recurso C
Cerrar overlay Esc
Enviar formulario ⌘↵
Los atajos son idénticos en todos los productos. Un producto no puede reasignar uno de esta lista.
18 · Sistema
Naming, API y gobierno
Un diseñador y un desarrollador deben poder adivinar el nombre de un token o de una prop sin buscarlo. Esa es la prueba.
Tokens
--fdn-{categoría}-{rol}-{variante}
--fdn-accent-solid-hover
✓
--fdn-danger-bg
✓
--vault-orange-2
✗ producto + primitiva
--fdn-card-border
✗ token de componente sin necesidad
Nombres por rol , nunca por apariencia:
danger
, no
red
. Un token de componente sólo existe si el componente se desvía de la semántica, y siempre se define a partir de ella.
Props de componente
variant
— significado: primary · secondary · ghost · destructive.
size
— siempre xs · sm · md · lg, en todos los componentes.
tone
— semántica del contenido: info · success · warning · danger.
Booleanos en positivo y en presente:
disabled
,
loading
,
invalid
,
selected
. Nunca
isNotEnabled
.
Slots con nombre de posición:
leading
,
trailing
,
footer
.
Handlers
on{Evento}
; el valor controlado siempre
value
/
onChange
.
Límite duro: si un componente pasa de 8 props o 4 variantes , se parte en dos (fue el caso de Table y Data Table).
Distribución y versionado
@foundathyon/tokens
— CSS custom properties + JSON. Fuente única.
@foundathyon/ui
— componentes React sobre esos tokens.
Cada producto declara sólo
--fdn-accent-hue
y su logo. Nada más.
Semver: quitar un token o cambiar el nombre de una prop es major . Los alias
--vault-*
viven una minor y se retiran.
Un componente entra al paquete cuando lo necesitan dos productos. Hasta entonces vive en el suyo, marcado como candidato.
La prueba de las 5 + 10 personas
«Si mañana entran 5 diseñadores y 10 desarrolladores, ¿pueden construir funcionalidad nueva sin crear inconsistencias?» Con la v1 la respuesta era no: faltaban estados, escalas, reglas de decisión y un origen versionado. Con la v2 la respuesta es sí para el ámbito de los micro-SaaS Community, con tres deudas conocidas y priorizadas:
1 · Hue de Dokgistry
Migrar de 62 a un ángulo con separación real. Requiere coordinar marca y capturas de la documentación.
2 · Puente con shadcn
Derivar las variables de shadcn de
--fdn-*
y retirar el segundo radio base en Dokgistry.
3 · Aún no contemplado
Cuando llegue el producto de crons: visor de logs en streaming, editor de expresiones cron y gráficas de series temporales. Ninguno se diseña antes de tener el caso real.
19 · Sistema
Taxonomía de estados
La fuente de divergencia número uno entre productos: cada app inventa su vocabulario de estados. Estos dieciséis son los únicos permitidos. Un producto que necesite otro lo propone al sistema; no lo define en local. Cada estado fija color, icono, forma y copy — y ninguno depende sólo del color.
Badge
Token
Significado y dónde aparece
Active success · dot Funcionando y en uso. Usuario, API key, provider, schedule.
Healthy success · check Todos los chequeos pasan. Sólo para servicios, nunca para recursos.
Protected success · shield No se puede borrar sin desproteger antes. Repos, configs de producción.
Pending info · dot Esperando algo externo: invitación sin aceptar, job en cola.
Processing info · spinner Trabajo en curso ahora mismo, iniciado por el sistema o el usuario.
Syncing info · refresh Reconciliando con una fuente externa. El dato mostrado puede estar viejo.
Draft info · pencil Existe pero no está publicado ni surte efecto. Configs, roles.
Degraded warning · alert Funciona peor de lo esperado pero funciona. Latencia alta, reintentos.
Expiring warning · clock Caduca en menos de 7 días. Siempre acompañado del plazo concreto.
Locked warning · lock Bloqueado temporalmente por seguridad. Reversible por un admin.
Failed danger · x Terminó mal. Obligatorio ofrecer causa y reintento.
Expired outline · clock Caducó. Terminal y esperado: no es un error, por eso outline y no danger.
Revoked outline · ban Anulado por decisión humana. Terminal. Nunca con
line-through
: el tachado no lo leen los lectores de pantalla.
Disabled outline Apagado a propósito y reactivable. Provider, webhook, schedule.
Archived outline · archive Fuera de la vista por defecto pero recuperable íntegro.
Unknown outline dashed No se pudo determinar. Borde discontinuo — el único uso de dashed en un badge. Nunca se muestra un estado inventado en su lugar.
Tres tratamientos, un significado
El mismo estado se representa como badge (en tablas y cabeceras), como dot + texto (en listas densas) o como icono solo con tooltip (cuando la columna es estrecha). Nunca cambia de color entre tratamientos.
Terminal vs vivo
Los estados terminales usan
outline
gris y su fila baja a 0.6 de opacidad; los vivos usan relleno tonal. Así se distingue «pasó algo» de «está pasando» sin leer la etiqueta.
Prohibido
Usar el acento del producto para un estado, o el verde de
success
como color de marca. En Cronify —cuyo acento es verde— el badge de estado siempre lleva icono para que no se confundan.
20 · Componentes
Developer UI
Lo que distingue a esta suite de un panel genérico. Cada bloque de código de la documentación y del producto sale de estos componentes, no de HTML improvisado en cada pantalla.
Code block · con cabecera y pestañas
curl
node
go
Copiar
1
2
3
curl -H "Authorization: Bearer $TOKEN" \
-H "Accept: application/json" \
https://vault.foundathyon.dev/v1/share/config
$ docker pull registry.foundathyon.dev/library/nginx:1.27
Copiado
Un solo componente con props
tabs
,
lineNumbers
,
copy
y
variant: block | command
. El resaltado usa sólo tres colores semánticos —acento para el verbo, success para strings, texto normal para el resto—; no una paleta de sintaxis completa que competiría con la UI.
Secretos y valores sensibles
Secret key Secreto
sk_live_de96••••••••••••j87TzX_l
Se muestra completo una sola vez, al crearlo. Después sólo prefijo + sufijo.
Público visible para cualquiera con el enlace
Privado sólo miembros de la organización
Sensible requiere permiso explícito, queda en el audit log
Secreto enmascarado por defecto, nunca en logs ni en la URL
digest sha256:4a3ed8…9f21
Los cuatro niveles de sensibilidad son un token del sistema, no una decisión por pantalla. Todo valor truncado conserva su copiado completo — nunca se copia la versión con puntos suspensivos.
JSON viewer y variables de entorno
{
"users" : [
{ 4 campos }
"email" : "rafa@gmail.com" ,
"role" : "default" ,
"verified" : true ,
"logins" : 42
]
}
production/.env 3 variables · 1 secreta
DATABASE_URL postgres://…:5432/app
LOG_LEVEL info
JWT_SECRET •••••••••••• Secreto
Nodos colapsables con recuento de campos: en un objeto de 200 claves lo importante es la forma, no el volcado. Las claves usan
info
, los valores literales
success
, los primitivos el acento. Toda variable marcada secreta se enmascara aunque el JSON venga en claro.
Diff y HTTP
config.yaml · v12 → v13
− replicas: 2
+ replicas: 4
timeout: 30s
GET
/v1/users
200 OK
42 ms
POST
PATCH
PUT
DELETE
Los verbos HTTP reutilizan los semánticos por su efecto —leer es info, crear es success, destruir es danger— en vez de introducir una paleta propia. Los códigos de estado siguen la misma regla: 2xx success, 3xx info, 4xx warning, 5xx danger.
21 · Componentes
Tablas por producto
Un mismo Data Table validado contra los cuatro productos. Lo único que cambia son los tipos de celda; ni la toolbar, ni el header, ni las acciones de fila, ni la densidad. Si un producto necesita una celda nueva, se añade al catálogo — no una tabla nueva.
Accounts · usuarios
celdas: user · email · provider · role · date · relative-date · actions
Compacta
Cómoda
Consultando con
sk_live_de96••••••••••••j87TzX_l
Usuario
Provider
Rol
Creado
Última actividad
R
9424bb43‑52c7‑4c97…
osw@gmail.com
Email
default
8 ago 2026
hace 13 d
R
abd034dd‑4b45‑4572…
rafa@gmail.com
Google
admin
7 ago 2026
hace 4 min
U
b1c63757‑e14f‑4933…
pulse-signin@example.com
WebAuthn
default
13 jun 2026
Locked
Celda user : identificador técnico arriba en mono, identidad humana abajo en negrita — el orden inverso al habitual, porque en soporte se busca por ID. La columna «última actividad» acepta fecha relativa o badge de estado: es la misma celda con dos tipos.
Cronify · jobs
Job
Schedule
Duración
Estado
cleanup-orphans
próxima en 2 h 14 min
0 */6 * * *
1 m 42 s Completado
sync-registry
en ejecución desde 00:03
*/15 * * * *
— Processing
rotate-credentials
3 intentos fallidos
0 3 1 * *
14 s Failed
legacy-export
pausado por un admin
0 0 * * 0
2 m 05 s Disabled
Celdas cron y duration . La expresión cron va en mono con su traducción en lenguaje natural en el tooltip; la duración siempre en unidades legibles, nunca en milisegundos crudos.
Vault · configs
Config
Entorno
Ver.
Acceso
Expira
api-keys.yaml production v13 Secreto en 2 d
app-config.yaml staging v7 Privado nunca
seed.json draft local v1 Público —
Celdas environment , version y sensitivity . El entorno hereda el semántico por riesgo —production es danger, no una etiqueta neutra— para que un cambio en producción se vea antes de hacerlo.
Catálogo de tipos de celda
text
izquierda, 1 línea, elipsis
number
derecha, tabular
percentage
derecha + barra opcional
bytes
derecha, unidad legible
duration
derecha, m/s
date
absoluta, tabular
relative-date
< 7 d, absoluta en tooltip
status
badge de §19
user
avatar + id + email
digest
mono truncado + copiar
version
mono, derecha
tags
máx 3 + contador
boolean
check o guion, nunca vacío
cron
mono + traducción
sensitivity
4 niveles de §20
actions
menú, última, 36 px
Regla de alineación: texto a la izquierda, números y todo lo comparable a la derecha, estados a la izquierda de las acciones. Un dato vacío se escribe siempre
—
, nunca celda en blanco: en blanco no se distingue «no hay valor» de «no cargó».
22 · Componentes
Dashboard y visualización
Visualización técnica, no BI: sin leyendas decorativas, sin ejes redundantes, sin degradados. Un gráfico entra cuando responde a una pregunta operativa —«¿está subiendo el error rate?»— y no cuando adorna un hueco. Regla dura: el acento del producto nunca codifica un estado, así que las series de éxito y fallo usan semánticos y el acento queda para la serie neutra de volumen.
Vista general
Accounts · organización acme
1 h
24 h
7 d
30 d
Actualizado hace 30 s
Logins · 24 h
8 412
+12 % vs ayer
Tasa de error
1,8 %
+0,6 pp
Latencia p95
142 ms
objetivo < 200 ms
Sesiones activas
1 204
312 dispositivos únicos
Intentos de autenticación
Correctos
Fallidos
00:00 12:00 ahora
Distribución por provider
Email + contraseña 62 %
Google 24 %
WebAuthn / passkey 11 %
Magic link 3 %
Una sola serie categórica: mismo hue, opacidad descendente. Nunca cuatro colores distintos para cuatro categorías sin significado semántico.
Salud de los servicios
Accounts API 99,98 %
Vault API 99,95 %
Dokgistry storage degradado 97,10 %
Cronify worker 99,99 %
hace 90 d hoy
Estados de gráfico
Sin datos en este intervalo
Datos parciales · faltan 2 de 24 puntos
Cuatro estados obligatorios por gráfico: loading, sin datos, parcial y error. «Sin datos» nunca se dibuja como una línea plana en cero — mentiría sobre la métrica.
Rejilla
KPIs en fila de 4 (2 en tablet, 1 en móvil), gráficos en 2 columnas, altura fija de 96 px para sparkline y 200 px para gráfico de card. Los KPI van siempre arriba: son lo que se mira sin hacer scroll.
Accesibilidad
Todo gráfico lleva su tabla equivalente accesible por «Ver datos», resumen en
aria-label
con la tendencia en palabras, y no depende del color: las series se distinguen también por posición y etiqueta.
Responsive
Por debajo de
md
el dashboard pasa a stack, los gráficos de barras reducen el número de puntos en lugar de comprimirse, y el selector de rango se convierte en select.
23 · Patterns
Autenticación y seguridad
Accounts es el producto que provee estas pantallas, pero todos los productos las muestran. Por eso viven en el sistema y no en Accounts: el login de Dokgistry debe ser indistinguible del de Vault salvo por el acento y el logo.
Verificación en dos pasos
Introduce tu código
Enviado a rafa@gmail.com . Caduca en 9:42.
4
8
2
1
Reenviar código Usar una passkey
Agrupación 3 + 3 con separación óptica, no seis casillas iguales: reduce el error de lectura. Nunca se bloquea el pegado ni el autocompletado del SMS. Tras 5 intentos,
Locked
con plazo explícito, jamás un «error desconocido».
Sesiones y dispositivos
MacBook Pro · Chrome 128 · esta sesión
85.61.204.12 · Madrid, ES · hace 1 min
iPhone · Safari
92.184.99.7 · Lisboa, PT · hace 3 d
Revocar
Dispositivo nuevo · Firefox en Linux
203.0.113.44 · ubicación desconocida · hace 20 min
No he sido yo Reconocer
La sesión actual nunca es revocable desde la lista. IP y ubicación en mono porque son datos verificables. Un dispositivo sin reconocer es
warning
, no
danger
: aún no sabemos que sea un ataque.
Scopes y matriz de permisos
registry:read
registry:write
registry:delete
config:read
Permiso
Owner
Admin
Dev
Lectura
Ver recursos
Crear y editar —
Eliminar — —
Gestionar miembros — — —
Los scopes heredan el semántico por su efecto: leer es info, escribir success, borrar danger. La matriz usa check e guion, no colores de fondo: se lee igual en monocromo y con lector de pantalla (cada celda anuncia «permitido» o «no permitido»).
24 · Componentes
Actividad y auditoría
Todos los productos registran quién hizo qué. Un solo formato de evento —actor, acción, recurso, momento— evita que cada app invente su propio log. La regla de oro: el evento se lee en una línea y el detalle se expande, nunca al revés.
Audit log
Actor: rafa@gmail.com
Exportar CSV
R
rafa@gmail.com
cambió el rol de
osw@gmail.com
admin developer
hace 2 min
ip 85.61.204.12 trace 4a7f2e91 req_01J8XQ accounts.role.update
sistema
revocó el enlace compartido de
production/api-keys
expiración alcanzada
hace 5 h
5 intentos fallidos
contra
pulse-signin@example.com
cuenta bloqueada 15 min
ayer, 23:14
ip 203.0.113.44 ua Firefox/Linux accounts.auth.lockout
M
maria@foundathyon.dev
creó la API key
ci-deploy
· scopes registry:read, registry:write
7 ago 2026, 14:45
Gramática del evento
Siempre actor · verbo en pasado · recurso · detalle . El actor puede ser una persona o «sistema», y el sistema lleva icono en vez de avatar para no fingir que hay alguien detrás.
Diff antes/después
Cambio de un valor: los dos valores en línea con flecha. Cambio de un objeto: se colapsa y se abre el diff de §20. El tachado va acompañado de color y posición, nunca solo.
Metadatos técnicos
IP, trace id, request id y nombre del evento en mono, en segunda línea y en
text-muted
: presentes para soporte, invisibles para quien sólo revisa qué pasó. Todos copiables.
25 · Patterns
Detalle de recurso y ajustes
El patrón más rentable del sistema: una sola plantilla sirve para usuario, repositorio, config, API key, rol, job y organización. Quien aprenda a operar un recurso sabrá operar todos, en cualquier producto de la suite.
Resource detail · API key
breadcrumb → título → estado → acciones → metadatos → tabs → contenido → danger zone
Ajustes API keys ci-deploy
ci-deploy
Active
creada 7 ago 2026 por maria@foundathyon.dev
último uso hace 4 min
expira en 2 días
Rotar
Editar scopes
Resumen
Configuración
Actividad
Peticiones · 24 h
1 842
Errores 4xx
12
Scopes
registry:read registry:write
fdn_ci_9f2b••••••••••••Kd41
Zona peligrosa
Revocar esta clave
Los pipelines que la usen empezarán a recibir 401 en menos de 30 s.
Revocar clave
Los metadatos van en la cabecera como texto corrido, no como tabla de pares clave-valor: se leen de un vistazo y no roban altura al contenido. La zona peligrosa siempre al final de la pestaña de resumen, nunca en una pestaña propia que nadie abre.
Settings · fila de ajuste y save bar
Protección de borrado
Impide eliminar recursos marcados como protegidos.
Caducidad por defecto de los tokens
Se aplica sólo a los tokens nuevos.
90 días 30 días Sin caducidad
Requerir 2FA a toda la organización
4 miembros aún no lo tienen configurado.
2 cambios sin guardar
Descartar
Guardar
Los switches se aplican al instante salvo los que cambian la seguridad de la organización: esos entran en la save bar, que aparece pegada al final de la sección con el recuento de cambios. Nunca hay un botón «Guardar» global al fondo de una página de ajustes larga.
Errores técnicos y de permiso
No se pudo crear el repositorio
El registry rechazó la petición porque el nombre ya existe en library .
409 Conflict req_01J8XQ4M2 trace 4a7f2e91 21 ago 2026, 09:14 UTC
Reintentar Copiar detalles
Necesitas el rol admin
Tu rol actual es
developer
. Pide acceso a maria@foundathyon.dev.
Demasiadas peticiones
Límite de 100/min alcanzado. Reintenta en 24 s .
Cuatro datos técnicos obligatorios en todo error de API: código HTTP, request id, trace id y timestamp UTC. Van en mono y en segunda línea; el titular es siempre lenguaje humano. Permiso denegado es
warning
—el usuario no ha hecho nada mal— y dice a quién pedir acceso.
26 · Sistema
Documentación
La documentación es parte del producto y comparte tokens con él, pero invierte una decisión clave: la densidad de panel se cambia por densidad de lectura . Medida máxima 72ch, interlineado 1.7, cuerpo a 14 px en vez de 13. Todo lo demás —color, tipografía, radios, code blocks— es idéntico.
Buscar ⌘K
Vault v2.4
Primeros pasos
Instalación
Autenticación
Compartir configs
Referencia API
Configs
Share links
Vault Primeros pasos Autenticación
Autenticación
Todas las peticiones a la API de Vault requieren un token de acceso. Los tokens se generan por proyecto y heredan los scopes del rol que los creó.
Nota
Los tokens de la edición Community no caducan automáticamente. Configura una caducidad en Ajustes.
Peligro
Nunca incluyas un token en el repositorio ni en la URL. Usa una variable de entorno.
Pasos
1
Crea un proyecto en el panel de Vault.
2
Genera un token desde Ajustes → API keys .
3
Exporta el token y llama a la API.
bash
curl -H "Authorization: Bearer $TOKEN" \
https://vault.foundathyon.dev/v1/configs
Endpoint
GET
/v1/configs
Bearer
Parámetro
Tipo
Descripción
environment
requerido string
production
·
staging
·
local
limit
opcional integer 1–100, por defecto 20.
← Instalación
Compartir configs →
En esta página
Autenticación
Pasos
Endpoint
Errores
Bloques de aviso · un componente, cinco tonos
Nota — contexto que conviene conocer.
Consejo — recomendación opcional. Único uso del acento en docs.
Aviso — puede tener consecuencias.
Peligro — destruye datos de forma permanente.
Ejemplo — neutro, sin color: no es un aviso.
Un componente
Callout
con prop
tone
. Barra lateral de 2 px en lugar de borde completo — distingue el aviso de docs del Alert del producto. Máximo dos por página: si hay tres, el texto principal está mal escrito.
Versión y deprecación
v2.4
Nuevo en 2.4
Deprecado
Beta
Deprecado en 2.4. Se elimina en 3.0 (previsto Q1 2027). Usa
/v1/configs?environment=
en su lugar.
Una deprecación sin fecha de retirada y sin alternativa no se publica. El badge va junto al encabezado del endpoint, y el bloque explicativo inmediatamente debajo — nunca al final de la página.
27 · Sistema
Email
Los tokens web no sirven en email: no hay
oklch
, ni custom properties, ni flex fiable en Outlook. El sistema mantiene una tabla paralela de tokens email con hex literales, y una regla de fondo: el email siempre es claro , porque el modo oscuro de los clientes de correo invierte colores de formas impredecibles. Layout de tabla, un ancho de 600 px, sin imágenes de fondo.
Tokens de email
email-background
#f6f6f4
email-surface
#ffffff
email-text
#1c1c1e
email-muted
#6b6b70
email-border
#e3e3df
email-accent
por producto
email-success
#15803d
email-warning
#a16207
email-danger
#b91c1c
Equivalentes en sRGB de los semánticos del tema claro, verificados a 4.5:1 sobre
email-surface
. Se generan desde los tokens fuente en tiempo de build, no a mano.
Código de verificación
Foundathyon
Accounts
Verifica tu email
Introduce este código para terminar de crear tu cuenta.
482 193
Caduca en 10 minutos
Si no has solicitado este código, ignora el mensaje. Nadie de Foundathyon te pedirá nunca este código.
Enviado a rafa@gmail.com · 85.61.204.12
Foundathyon Community · Privacidad · Seguridad
El código es el único elemento grande del mensaje. Mono con tracking amplio y agrupación 3+3 para leerlo en voz alta. La nota de seguridad y la IP de origen son obligatorias en todo email transaccional de auth.
Alerta de seguridad
Foundathyon
Seguridad
Nuevo inicio de sesión
Se ha accedido a tu cuenta desde un dispositivo que no reconocemos.
Dispositivo Firefox · Linux
IP 203.0.113.44
Cuándo 21 ago 2026, 09:14 UTC
No he sido yo
Si has sido tú, no hace falta hacer nada.
Foundathyon Community · Este mensaje es automático
Los datos del evento van en tabla de dos columnas —el único layout de datos que sobrevive en todos los clientes— y el CTA es un enlace con fondo, nunca un
<button>
. La acción destructiva es la primaria porque es la urgente: si fue el usuario, no necesita hacer nada.
Catálogo de plantillas
Autenticación · 6
Código de verificación · Verificar email · Restablecer contraseña · Magic link · Contraseña cambiada · Cuenta bloqueada.
Seguridad · 3
Nuevo inicio de sesión · Dispositivo nuevo · Alerta de seguridad. Todas con IP, dispositivo, momento y una acción de repudio.
Organización · 3
Invitación · Invitación a organización · Bienvenida. Único grupo con tono cálido y CTA de acento.
Credenciales · 3
API key creada · API key revocada · Token a punto de caducar. Nunca incluyen el valor de la credencial.
Operaciones · 4
Recurso compartido · Recurso por caducar · Job fallido · Job completado. Job completado se envía sólo si el usuario lo pidió: el éxito rutinario no genera correo.
Las 19 comparten un solo layout base con cuatro huecos: cabecera de marca, cuerpo, CTA opcional y pie legal. El producto sólo cambia
email-accent
y el nombre junto al logo.
28 · Sistema
Matriz del inventario
Core lo usa todo producto y no se puede sustituir. Recomendado resuelve un caso frecuente. Especializado lo necesitan dos o tres productos. Nada entra al paquete compartido hasta que dos productos lo piden — hasta entonces vive en su producto marcado como candidato.
Categoría
Componentes
Nivel
Foundations Color · tipografía · spacing · sizing · radios · elevación · motion · foco · z-index · breakpoints · densidad · iconos Core
Layout Container · Stack · Inline · Grid · SplitView · PageLayout · Card Core
Navegación Navbar · Sidebar · Breadcrumb · Tabs · Pagination · Stepper · UserMenu · AppSwitcher · CommandMenu Core
Acciones Button · IconButton · ButtonGroup · SplitButton · Link · Badge · Tag · Avatar · Divider Core
Formularios FormField · Input · Textarea · Select · Combobox · Checkbox · Radio · Switch · Slider · DatePicker · FileUpload · OTPInput · FormSection · SaveBar Core
Feedback Alert · Toast · Banner · Progress · Spinner · Skeleton · EmptyState · ErrorState · LoadingState Core
Overlays Modal · ConfirmDialog · Drawer · Sheet · Popover · Tooltip · DropdownMenu · ContextMenu Core
Datos Table · DataTable · 16 tipos de celda · List · Stat · Accordion · Timeline · Tree Core
Estados 16 estados canónicos con badge, dot e icono Core
Developer UI CodeBlock · CommandBlock · JsonViewer · EnvViewer · Diff · MaskedSecret · DigestDisplay · HttpMethod Core
Visualización KpiCard · Sparkline · BarChart · StackedBar · Distribution · UptimeStrip · ChartCard · TimeRange Recomendado
Seguridad SensitivityBadge · ScopeList · PermissionMatrix · SessionItem · DeviceItem · RoleBadge Recomendado
Auditoría ActivityFeed · AuditEvent · ValueDiff · MetadataRow Recomendado
Documentación DocsShell · Toc · Callout · Steps · ParameterTable · EndpointBlock · VersionBadge · DeprecationNotice Especializado
Email EmailLayout · EmailHeader · EmailCta · EmailDataTable · EmailFooter · 19 plantillas Especializado
Auth AuthCard · ProviderButton · OtpForm · RecoveryCodes · TwoFactorSetup Especializado
Patterns ResourceList · ResourceDetail · SettingsPage · Dashboard · DocsPage · AuthFlow · DangerZone Core
¿Se puede construir un producto Community entero con esto?
Recorriendo Accounts, Vault, Dokgistry y Cronify pantalla por pantalla: sí, salvo tres huecos que sólo tienen sentido diseñar contra el caso real, no antes.
Visor de logs en streaming
Cronify lo necesita para ver la salida de un job en vivo: scroll virtualizado, autoscroll con anclaje, filtro por nivel y búsqueda. Es un componente de un mes, no de una tarde.
Editor de expresiones cron
Campo con validación en vivo, traducción a lenguaje natural y vista previa de las próximas 5 ejecuciones. Específico de Cronify hasta que un segundo producto programe tareas.
API playground
El «Try it» de la documentación: requiere gestión de credenciales reales dentro de los docs. Decisión de producto antes que de diseño.
Todo lo demás está cubierto: un producto nuevo declara su hue con la L medida, su logo y su
email-accent
, y compone pantallas con los patrones de §16 y §25. One system. Many products. One visual language.
29 · Templates
Login · plantilla única de la suite
La pantalla que más se duplica entre productos, resuelta una sola vez. Un template es más estricto que un pattern: la estructura no se toca . Un producto nuevo cambia cuatro cosas —logo, nombre, tres beneficios y el hue— y nada más. Cambia el acento en la cabecera de esta página para ver los cinco productos sobre el mismo esqueleto.
Split login · {{ product }}
≥ lg · dos columnas
4 huecos de contenido · 0 decisiones de layout
Ver a pantalla completa
Template · split login
{{ product }}
Cambia el acento y el tema en la cabecera · Esc para salir
Cerrar
{{ product }}
Bienvenido de nuevo
Inicia sesión para administrar tu organización.
Explora repositorios y tags al instante
Elimina tags individualmente o en bloque
Invita a tu equipo con roles y permisos
Powered by Foundathyon v1.0.0
Inicio de sesión seguro
Inicia sesión en {{ product }}
Introduce tu email y contraseña para acceder a tu organización.
Email
Contraseña ¿La olvidaste?
Recordar este dispositivo
Iniciar sesión
o
Continuar con una passkey
Los cuatro huecos
logo
— 26 px, radio
lg
, sobre
accent-solid
. Siempre marca de producto, nunca de Foundathyon: la casa firma abajo.
productName
— aparece dos veces: junto al logo y en el título de la card. Sin excepciones, para que el usuario sepa a qué app entra.
subtitle
— una frase, máx. 38 caracteres de ancho. Dice qué vas a administrar, no qué es el producto.
benefits[3]
— exactamente tres, en verbo imperativo, máx. 42 caracteres. Ni dos ni cuatro: tres equilibra la columna con la card.
Todo lo demás —el resplandor, el orden de los campos, la separación, el pie— es del template y no se personaliza por producto.
Responsive y estados
≥ lg — dos columnas al 50 %. El resplandor nace en la esquina superior izquierda y el círculo se recorta por el borde: es un fondo, no una ilustración centrada.
md–lg — la columna de marca se reduce a logo + título y los beneficios desaparecen. La card se centra.
< md — una columna: logo arriba, card a ancho completo sin borde ni sombra, controles a
lg
(36 px). Los beneficios no vuelven abajo — nadie hace scroll para leerlos antes de entrar.
Error de credenciales — Alert
danger
sobre el primer campo, con
role="alert"
. Nunca revela si el email existe: «Email o contraseña incorrectos».
Loading — el botón conserva su ancho y pasa a spinner + «Comprobando». El formulario queda
aria-busy
, no deshabilitado campo a campo.
Reglas del template
· Respeta el tema del usuario. Este login se ve en claro si el sistema lo pide — el dark-first es una preferencia por defecto, no una imposición de marca.
· El resplandor de acento es el único gradiente permitido en toda la suite, y sólo en pantallas de autenticación.
· El acento no llega al formulario más que en el botón primario, el check y el badge. Los campos son neutros.
· Un solo CTA primario. Los métodos alternativos van bajo el separador, en secundario.
·
autocomplete="email"
y
"current-password"
, foco inicial en el email, Enter envía.
Mismo esqueleto para registro, recuperación, verificación y 2FA: cambia el contenido de la card, nunca la composición. Es lo que hace que las cinco apps se sientan la misma casa.
Los otros trece templates de la suite
Cada uno es una pantalla completa que los cinco productos comparten cambiando sólo copy, iconos y el hue. Están aquí porque todos los productos ya los necesitan: no son plantillas especulativas. Los que dependen de un dominio concreto —el visor de logs de Cronify, el playground de la API— siguen fuera a propósito.
T02
Crear cuenta
Crea tu cuenta
Community edition · sin tarjeta.
Email de trabajo
Contraseña
12 caracteres o más
Un número o símbolo
Crear cuenta
Al continuar aceptas los términos y la política de privacidad.
Requisitos de contraseña como lista que se va cumpliendo, nunca como error tras enviar. Medidor de 4 tramos con semánticos. Sin campo «repetir contraseña»: se resuelve con el botón de revelar.
T03
Recuperar acceso
Revisa tu correo
Si existe una cuenta con rafa@empresa.com , te hemos enviado un enlace para restablecer la contraseña. Caduca en 30 minutos.
Volver al login
Reenviar
El «si existe una cuenta» es deliberado: nunca confirma qué emails están registrados. Estado de confirmación, no de éxito — no usa
success
porque aún no ha pasado nada.
T04
Aceptar invitación
M
R
+6
maria@foundathyon.dev te invita a acme
Entrarás como developer en 3 productos.
Vault · leer y escribir configs
Dokgistry · pull y push de imágenes
Cronify · sólo lectura
Aceptar invitación
Rechazar
Dice exactamente a qué se da acceso antes de aceptar, producto por producto. Único template centrado y con avatares: la invitación es social, no operativa. Si caducó, muestra Error state con «pedir una nueva».
T05
Onboarding · conectar el servicio
2
3
Paso 2 · Credenciales
Necesitamos un token con permiso de lectura sobre el registry.
https://
Conexión verificada ·
/v2/
responde en 42 ms
Hacerlo más tarde
Atrás Continuar
Máximo 3 pasos y siempre saltable: «hacerlo más tarde» a la izquierda, separado de las acciones de avance. Valida contra el servicio real antes de continuar — un onboarding que sólo guarda texto engaña.
T06
Lista de recursos
Repositorios
128 imágenes · 44,5 GB de 50 GB
Nuevo
Filtrar…
Protegidas
Ordenar: tamaño ↓
nginx 142 MB
api 88 MB
1–20 de 128 ← 1 2 3 →
Orden fijo: cabecera con recuento y acción primaria → toolbar de filtros → tabla → paginación. El recuento y la cuota van en el subtítulo porque contestan la primera pregunta del operador. Todo el estado de filtros vive en la URL.
T07
Ajustes de organización
Organización
General
Miembros
API keys
Webhooks
Zona peligrosa
General
Identidad y valores por defecto de la organización.
Nombre
Requerir 2FA
4 miembros sin configurar
1 cambio sin guardar Guardar
Navegación secundaria propia, una sección por vista y save bar por sección. «Zona peligrosa» es la última entrada y la única en
danger
: se encuentra cuando se busca, no por accidente.
T08
Primer uso · producto vacío
Conecta tu primer registry
Dos minutos. Puedes hacerlo desde la terminal o desde el panel.
terminal
$ fdn registry connect --url registry.foundathyon.dev
Esperando la primera conexión…
Usar el panel
Distinto del Empty state: aquí no falta un filtro, falta el producto entero. Da el comando copiable y espera activamente — cuando el evento llega, la pantalla avanza sola sin pedir recargar.
T09
Secreto de un solo uso
API key creada
ci-deploy · registry:read, registry:write
Cópiala ahora. Es la única vez que se muestra completa — después sólo verás el prefijo.
fdn_ci_9f2bK41xQ7mLpZ0tRvNdE8s
Copiar
La he guardado en un lugar seguro
Hecho
El único sitio del sistema donde
disabled
bloquea legítimamente el avance: cerrar sin copiar pierde el secreto para siempre. Sin botón de cerrar en la esquina, y Esc no cierra.
T10
Páginas de error
404
Ese repositorio no existe
Puede haberse eliminado o renombrado. Ver todos los repositorios
403
No tienes acceso a esta organización
Tu rol es
developer
. Solicitar acceso
500
Algo falló en nuestro lado
Ya estamos avisados.
trace 4a7f2e91 21 ago 2026, 09:14 UTC
Reintentar Copiar traza
Un layout, tres tonos: el código en mono grande a la izquierda y el titular en lenguaje humano. 404 es neutro (no es un fallo), 403 warning, 5xx danger con traza copiable. Nunca ilustraciones ni chistes.
T11
Sesión expirada · re-autenticación
Confirma que eres tú
Vas a revocar credenciales de producción. Vuelve a introducir tu contraseña para continuar.
R
rafa@gmail.com
Continuar
Cancelar la operación
Muestra la cuenta activa para que nadie se autentique en la sesión equivocada, y nunca pierde el contexto : al confirmar, la operación pendiente continúa donde estaba. Vale también para «sesión caducada» cambiando el copy.
T12
Centro de notificaciones
Notificaciones 3 Marcar leídas
rotate-credentials falló 3 veces
Cronify · hace 12 min
La clave ci-deploy caduca en 2 días
Accounts · hace 5 h
Almacenamiento al 89 %
Dokgistry · ayer
Es transversal a la suite: cada línea dice de qué producto viene. No leído = wash de acento + punto; leído = plano. Sólo entran eventos accionables ; el ruido informativo se queda en el audit log.
T13
Límites del plan Community
Uso del plan Community
Almacenamiento 44,5 / 50 GB
Miembros 8 / 10
Peticiones API · mes 128 K / 1 M
Al llegar al 100 % se bloquean los push, pero nada se borra . Libera espacio eliminando tags sin referencias.
Community es gratis, así que este template informa — no vende. Cada límite dice qué pasa al alcanzarlo y cómo liberarlo. Cero CTA de upgrade: si algún día hay edición de pago, entra como enlace secundario, nunca como banner.
T14
Estado del servicio
Rendimiento degradado
Actualizado hace 2 min
Accounts 99,98 %
Dokgistry · latencia alta 97,10 %
Vault 99,95 %
Incidencia en curso
Identificada la causa en el almacenamiento de objetos.
09:22 UTC
Investigando pulls lentos en Dokgistry.
09:14 UTC
Estado global arriba, por servicio en medio, cronología de la incidencia abajo — en orden inverso, lo último primero. Sirve como página pública y como widget del dashboard. Uptime en mono para poder comparar cifras.
T15
Búsqueda global
nginx
12 resultados
Dokgistry
library/ nginx 14 tags
nginx :1.27
Vault
nginx -ingress.yaml
Documentación
Hacer push de tu primera imagen
↑↓ navegar ↵ abrir ⇥ filtrar producto
Busca en toda la suite, agrupando por producto y con la documentación como último grupo. Coincidencia resaltada en acento. Comparte el chasis con el command menu de §13: mismo componente, distinto proveedor de resultados.
30 · Pages
Cinco páginas completas
La prueba real del sistema: pantallas enteras de producto —shell, navegación, cabecera, contenido y estados— compuestas sólo con lo definido arriba. Cambia de página y verás que el shell no se mueve : sólo cambian el acento, los destinos y el contenido. Eso es lo que hace que las cinco apps se sientan una sola.
{{ t.label }}
Ver a pantalla completa
Page · {{ pageDef.label }}
Esc para salir
Cerrar
{{ pageDef.product }}
Community
acme
Buscar ⌘K
R
{{ g.group }}
{{ it.label }}
Docs y atajos
{{ pageDef.title }}
{{ pageDef.sub }}
Exportar
Registrar usuario
Sincronizar
Nuevo repositorio
Ver versiones
Compartir
1 h 24 h 7 d
Nuevo job
Rol
Provider
Activos
Consultando con
sk_live_de96••••••••••••j87TzX_l
Usuario
Provider
Rol
Última actividad
R
abd034dd‑4b45…
rafa@gmail.com
Google
admin
hace 4 min
M
9424bb43‑52c7…
maria@foundathyon.dev
WebAuthn
developer
hace 2 h
U
b1c63757‑e14f…
pulse-signin@example.com
Email
default
Locked
1–20 de 312
← 1 2 →
Lista de recursos con la última fila en skeleton: la carga incremental no bloquea la tabla ya visible.
Almacenamiento al 89 %
Al llegar al 100 % se bloquean los push. Elimina tags sin referencias.
Ver uso
Repositorios
128
Pulls · 24 h
2 481
Sin firmar
6
Huérfanas
23
2 seleccionadas
Eliminar selección
Imagen
Digest
Tamaño
Estado
nginx · 1.27, latest sha256:4a3ed8… 142 MB Protegida
api · v2.4.1 sha256:9bc012… 88 MB Syncing
worker · v3.1 sha256:77d1ce… 201 MB Sin firmar
legacy-worker · v0.9 sha256:1f77aa… 310 MB Archived
1–20 de 128 ← 1 2 3 … 7 →
Protected
production
Secreto
actualizado hace 2 h por maria@foundathyon.dev
Contenido
Versiones
Accesos
Actividad
api-keys.yaml 4 claves · 1 secreta
STRIPE_KEY •••••••••••• Secreto
API_BASE_URL https://api.acme.dev
RATE_LIMIT 100
LOG_LEVEL warn
v12 → v13 · cambios de esta versión
− RATE_LIMIT: 50
+ RATE_LIMIT: 100
Zona peligrosa
Eliminar esta config
13 versiones y 2 share links activos. No se puede deshacer.
Eliminar
Metadatos
Versión v13
Tamaño 1,2 KB
Lecturas · 24 h 842
Expira en 2 días
Consumir
$ fdn vault get api-keys.yaml --env production
Últimos accesos
ci-deploy 4 min
worker-prod 18 min
token revocado · 403 5 h
Ejecuciones
1 284
Fallidas
3
0,2 % del total
Duración p95
1 m 42 s
En cola
7
Ejecuciones por hora
OK Fallo
00:00 ahora
Próximas ejecuciones
*/15 * * * *
sync-registry en 3 min
0 */6 * * *
cleanup-orphans en 2 h
0 3 1 * *
rotate-credentials reintento
Actividad reciente
rotate-credentials falló · exit 1 tras 14 s hace 12 min
cleanup-orphans completado · 23 tags eliminados hace 4 h
sync-registry en ejecución desde 00:03 ahora
Ajustes
General
Seguridad
API keys
Webhooks
Facturación
Zona peligrosa
General
Identidad de la organización y valores por defecto de los productos.
Nombre Aparece en la cabecera de las cinco apps.
Identificador
foundathyon.dev/
Valores por defecto
Se aplican a los recursos nuevos de todos los productos.
Protección de borrado
Impide eliminar recursos marcados como protegidos.
Caducidad de tokens
Sólo afecta a los tokens nuevos.
90 días 30 días
Requerir 2FA
4 miembros aún no lo tienen configurado.
Zona peligrosa
Transferir la organización
Pasa la propiedad a otro miembro.
Transferir
Eliminar acme
312 usuarios, 128 repositorios y 44 configs. Irreversible.
Eliminar organización
2 cambios sin guardar en General
Descartar
Guardar
Lo que no cambia entre productos
· Topbar de 44 px: logo, producto, badge de edición, selector de organización, búsqueda ⌘K, notificaciones, avatar. Ese orden.
· Sidebar de 172 px con grupos en overline. El grupo Organización es siempre el último y siempre idéntico.
· Cabecera de página: título, subtítulo con el recuento que importa, acciones a la derecha. La primaria, una sola.
· El pie de la sidebar lleva docs y atajos en todas las apps.
Lo que sí cambia
· El hue del acento y el nombre junto al logo.
· Los destinos del primer grupo de la sidebar — el dominio de cada producto.
· Los tipos de celda de las tablas y las métricas del dashboard.
Nada más. Si un producto necesita cambiar el shell, es un cambio del sistema, no del producto.
Cómo leer estas páginas
· Cada una muestra estados reales, no sólo el feliz: skeleton de carga incremental en Usuarios, banner de cuota y fila archivada en Repositorios, acceso con 403 en Vault, job fallido en Cronify.
· Los botones «Eliminar» de Vault y Ajustes abren la confirmación destructiva real de §13.
· A pantalla completa se ven a la escala en la que se van a construir. Cambia también el tema desde la cabecera de la página.
Nuevo enlace compartido
Cualquiera con el enlace y el token podrá leer esta config.
Recurso
Expira En 7 días En 24 horas Nunca Pasada la fecha, el enlace devuelve 410 y queda en el audit log.
Cancelar
Generar enlace
Eliminar
{{ cf.name }}
{{ cf.body }} No se puede deshacer.
Escribe
{{ cf.name }}
para confirmar
Cancelar
{{ cf.verb }}
Esc
Ir a
Repositorios G R
Miembros G M
Acciones
Sincronizar registry
Cambiar a tema claro
Recientes
library/nginx:1.27
library/nginx
sha256:4a3ed8…9f21
Protegida 1.27 latest
Tamaño 142 MB
Capas 7
Último push hace 2 h
Pulls (30 d) 18 402
$ docker pull registry.foundathyon.dev/library/nginx:1.27
Eliminar
Guardar cambios
Enlace revocado
Deshacer
Made with Claude Design