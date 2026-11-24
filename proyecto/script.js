// ===== Elementos de la página =====
const txt  = document.getElementById('txt'),
      send = document.getElementById('send'),
      msgs = document.getElementById('msgs'),
      hero = document.getElementById('hero'),
      chat = document.getElementById('chat'),
      side = document.getElementById('side');

// ===== Respuestas de ejemplo según palabras clave =====
const respuestas = [
  [/qu[eé] es la ciberseguridad|ciberseguridad.{0,40}objetivo|objetivo.{0,40}ciberseguridad/i, 'La ciberseguridad es el conjunto de prácticas, tecnologías y procesos diseñados para proteger sistemas, redes, programas y datos frente a ataques digitales, accesos no autorizados o daños. Su objetivo principal es garantizar la confidencialidad, integridad y disponibilidad de la información (la tríada CIA), permitiendo que las organizaciones y usuarios operen con confianza en entornos conectados.'],
  [/tr[ií]ada\s+cia|confidencialidad.{0,40}integridad.{0,40}disponibilidad/i, 'La tríada CIA representa tres pilares fundamentales: Confidencialidad (que solo personas autorizadas accedan a los datos), Integridad (que la información no sea alterada de forma indebida) y Disponibilidad (que los sistemas y datos estén accesibles cuando se necesiten). Casi cualquier control de seguridad o evaluación de riesgos busca proteger uno o más de estos aspectos.'],
  [/diferencia.{0,60}(?:vulnerabilidad|amenaza|riesgo)|vulnerabilidad.{0,40}amenaza.{0,40}riesgo/i, 'Una vulnerabilidad es una debilidad o fallo en un sistema, software o proceso que podría ser explotado. Una amenaza es cualquier evento o actor con potencial para aprovechar esa debilidad y causar daño. El riesgo es la probabilidad de que una amenaza explote una vulnerabilidad y el impacto que eso generaría en el negocio o en los activos.'],
  [/m[ií]nimo privilegio|least privilege/i, 'El principio de mínimo privilegio consiste en otorgar a usuarios, aplicaciones o procesos únicamente los permisos y accesos estrictamente necesarios para cumplir su función, y nada más. De este modo, si una cuenta o servicio se ve comprometido, el atacante tiene un margen mucho menor para moverse lateralmente o escalar privilegios dentro del sistema.'],
  [/defensa en profundidad|defense in depth/i, 'Es una estrategia de seguridad que aplica múltiples capas de controles defensivos a lo largo de distintos niveles (físico, de red, de host, de aplicación y de datos, además de políticas y capacitación). Si una capa falla o es superada por un atacante, las siguientes barreras ralentizan, detectan o bloquean el avance de la intrusión.'],
  [/autenticaci[oó]n multifactor|\bmfa\b/i, 'La autenticación multifactor exige al menos dos pruebas de identidad pertenecientes a distintas categorías: algo que sabes (contraseña o PIN), algo que tienes (token, llave física o código en el móvil) o algo que eres (biometría como huella o reconocimiento facial). Reduce drásticamente el impacto del robo de contraseñas, ya que conocer la clave no basta para iniciar sesión.'],
  [/\brbac\b|acceso basado en roles/i, 'RBAC es un modelo de permisos en el que los accesos no se asignan individualmente a cada usuario por separado, sino a roles definidos según las funciones del puesto (por ejemplo, analista, administrador o contabilidad). Cuando un empleado cambia de área o sale de la empresa, basta con ajustar o revocar su rol, lo que simplifica la administración y reduce errores.'],
  [/zero trust|confianza cero/i, 'Zero Trust es un enfoque de seguridad basado en la premisa de no confiar automáticamente en ningún usuario, dispositivo o red, ni siquiera si ya están dentro del perímetro corporativo. Cada solicitud de acceso se verifica continuamente considerando identidad, estado del dispositivo, ubicación y contexto, aplicando segmentación estricta y acceso limitado.'],
  [/superficie de ataque/i, 'La superficie de ataque es la suma de todos los puntos de entrada o exposición (puertos abiertos, APIs, servicios web, cuentas de usuario, dispositivos IoT) que un atacante podría intentar explotar. Se reduce deshabilitando servicios innecesarios, cerrando puertos no usados, actualizando software, retirando aplicaciones obsoletas y limitando accesos expuestos a internet.'],
  [/ingenier[ií]a social/i, 'La ingeniería social es la manipulación psicológica de personas para lograr que revelen información confidencial, transfieran dinero o ejecuten acciones inseguras, como abrir un enlace malicioso. En lugar de explotar un fallo técnico del sistema, se aprovecha de emociones como la urgencia, el miedo, la confianza o la autoridad.'],
  [/deepfake|clonaci[oó]n de voz/i, 'Es una evolución de la ingeniería social que emplea audio o video sintético para imitar la voz o el rostro de un directivo, compañero o familiar. Suele combinarse con llamadas o videollamadas urgentes para autorizar transferencias o cambios sensibles, por lo que exige verificar por un canal independiente antes de actuar.'],
  [/spear phishing|phishing/i, 'El phishing es un ataque de ingeniería social masivo, generalmente por correo o mensajería, que suplanta a entidades legítimas para robar credenciales o instalar malware. El spear phishing, en cambio, es una variante dirigida y personalizada hacia una persona u organización específica, utilizando información previa para aumentar su credibilidad.'],
  [/ransomware/i, 'El ransomware es un tipo de malware que cifra los archivos o bloquea los sistemas de la víctima y exige un rescate económico, habitualmente en criptomonedas, a cambio de la clave de descifrado. Suele propagarse mediante correos de phishing, escritorios remotos expuestos con credenciales débiles, vulnerabilidades sin parchar o cadenas de suministro comprometidas.'],
  [/\bddos\b|denegaci[oó]n de servicio distribuido/i, 'Un ataque de denegación de servicio distribuido (DDoS) busca saturar un servidor, servicio o red enviando tráfico masivo desde múltiples dispositivos comprometidos (una botnet). Su objetivo es agotar los recursos disponibles o el ancho de banda para que los usuarios legítimos no puedan acceder al servicio.'],
  [/man.in.the.middle|\bmitm\b/i, 'Un ataque Man-in-the-Middle ocurre cuando un atacante se interpone entre dos partes que creen estar comunicándose directamente, pudiendo interceptar, leer o modificar los mensajes intercambiados. Hoy en día se mitiga en gran medida mediante cifrado robusto como TLS y validación estricta de certificados digitales.'],
  [/zero.?day|d[ií]a cero/i, 'Una vulnerabilidad Zero-Day es un fallo de seguridad en un software o hardware que es desconocido para el fabricante o para quienes deben defenderlo, por lo que aún no existe un parche oficial. Un exploit Zero-Day es el código o técnica diseñado para aprovechar esa falla antes de que se publique una solución.'],
  [/troyano|gusano|diferencia.{0,40}virus/i, 'Un troyano es un programa malicioso disfrazado de software legítimo o útil para engañar al usuario y lograr que lo ejecute. A diferencia de un virus tradicional, no suele depender de infectar otros archivos para replicarse, y a diferencia de un gusano, no se propaga automáticamente por la red sin intervención o explotación directa.'],
  [/spyware/i, 'El spyware es un software malicioso diseñado para operar de forma encubierta y recopilar información del dispositivo o de la actividad del usuario, como pulsaciones de teclas, historial, credenciales o datos financieros. Representa un alto riesgo de robo de identidad, espionaje corporativo y fuga de información sensible.'],
  [/\bapt\b|amenaza persistente avanzada/i, 'Una APT es una campaña de ataque prolongada, sigilosa y altamente organizada, frecuentemente respaldada por grupos sofisticados o actores estatales. En lugar de buscar un golpe rápido, el atacante establece acceso persistente en la red, estudia el entorno y extrae información valiosa durante semanas, meses o incluso años.'],
  [/credential stuffing/i, 'El credential stuffing es un ataque automatizado que utiliza listas de pares de usuario y contraseña filtrados en brechas anteriores para probarlos masivamente en otros servicios. Funciona porque muchas personas reutilizan la misma contraseña en múltiples plataformas.'],
  [/cryptojacking/i, 'El cryptojacking es el uso no autorizado de la capacidad de cómputo de equipos, servidores o navegadores de terceros para minar criptomonedas. Aunque no suele robar datos directamente, degrada el rendimiento de los sistemas, aumenta el consumo eléctrico y puede indicar que existe una puerta abierta en la infraestructura.'],
  [/\bsqli\b|sql injection|inyecci[oó]n sql/i, 'La inyección SQL ocurre cuando una aplicación toma datos ingresados por el usuario y los concatena directamente en una consulta a la base de datos sin validarlos ni separarlos adecuadamente, permitiendo manipular la consulta. Se previene principalmente usando consultas parametrizadas o sentencias preparadas, además de validar entradas y aplicar mínimos privilegios en la base de datos.'],
  [/cross.site scripting|\bxss\b/i, 'XSS es una vulnerabilidad en aplicaciones web que permite a un atacante inyectar scripts maliciosos (normalmente JavaScript) en páginas vistas por otros usuarios. Al ejecutarse en el navegador de la víctima, el script puede robar cookies de sesión, capturar datos o realizar acciones en nombre del usuario.'],
  [/cross.site request forgery|\bcsrf\b/i, 'CSRF es un ataque en el que una web maliciosa induce al navegador de una víctima autenticada a enviar una petición no deseada a otra aplicación web donde el usuario tiene sesión activa. Se previene mediante tokens anti-CSRF impredecibles, cookies con atributo SameSite y verificaciones adecuadas en acciones sensibles.'],
  [/\bssrf\b|server.side request forgery/i, 'SSRF ocurre cuando una aplicación del lado del servidor es manipulada para realizar peticiones HTTP o de red hacia destinos arbitrarios, incluyendo servicios internos no expuestos a internet. Puede permitir leer metadatos en la nube, escanear puertos internos o acceder a paneles administrativos locales.'],
  [/broken access control|control de acceso roto/i, 'El control de acceso roto sucede cuando una aplicación no comprueba correctamente si el usuario autenticado tiene permiso para ver o modificar un recurso específico. Un ejemplo clásico es cambiar un ID en la URL para acceder a datos o funciones de otra cuenta o de un administrador.'],
  [/deserializaci[oó]n insegura/i, 'Ocurre cuando una aplicación toma datos serializados provenientes de una fuente no confiable y los reconstruye en objetos sin validar su integridad o tipo. Si el proceso permite instanciar clases peligrosas o ejecutar lógica durante la carga, puede derivar en ejecución remota de código o escalada de privilegios.'],
  [/\bwaf\b|web application firewall/i, 'Un WAF es un firewall especializado en tráfico web (HTTP/HTTPS) que analiza peticiones para detectar y bloquear patrones de ataques comunes, como SQLi, XSS o bots abusivos. Es un complemento muy útil para ganar tiempo y filtrar tráfico malicioso, pero no reemplaza la corrección del código vulnerable.'],
  [/\bowasp\b|top 10.{0,30}aplicaciones web/i, 'OWASP Top 10 es una lista de referencia elaborada por la comunidad Open Worldwide Application Security Project que reúne las categorías de riesgos de seguridad más críticas en aplicaciones web. Sirve como guía práctica para desarrolladores, auditores y equipos de seguridad al priorizar revisiones y remediaciones.'],
  [/\bsast\b|\bdast\b|an[aá]lisis est[aá]tico|an[aá]lisis din[aá]mico/i, 'SAST revisa el código fuente o binario sin ejecutarlo para encontrar fallos de programación o malas prácticas de seguridad en etapas tempranas del desarrollo. DAST prueba la aplicación en ejecución desde el exterior para simular ataques reales y detectar problemas de configuración o exposición que solo aparecen en runtime.'],
  [/dependencia vulnerable|cadena de suministro/i, 'Las aplicaciones modernas incorporan decenas o cientos de librerías y paquetes de terceros; si una tiene una vulnerabilidad conocida o fue comprometida por un atacante, toda la aplicación hereda ese riesgo. Gestionar el inventario de dependencias (SBOM), actualizar paquetes y verificar la integridad de los repositorios es clave para reducir este peligro.'],
  [/\bfirewall\b|\bids\b|\bips\b/i, 'Un firewall controla y filtra el tráfico de red entre zonas según reglas basadas en direcciones IP, puertos, protocolos o aplicación. Un IDS (Intrusion Detection System) monitorea el tráfico para alertar sobre actividades sospechosas, mientras que un IPS (Intrusion Prevention System) puede bloquear o descartar activamente ese tráfico malicioso en tiempo real.'],
  [/\bvpn\b|virtual private network/i, 'Una VPN (Virtual Private Network) crea un túnel cifrado entre un dispositivo y una red privada a través de una red pública como internet. Protege la confidencialidad e integridad de los datos en tránsito y permite el acceso remoto seguro a recursos internos, aunque debe acompañarse de autenticación fuerte y control de accesos.'],
  [/segmentaci[oó]n de red/i, 'La segmentación de red divide una red grande en subredes o zonas aisladas con políticas de comunicación controladas entre ellas (por ejemplo, separar usuarios, servidores, bases de datos e IoT). Evita que una red sea plana, dificultando que un atacante se mueva libremente tras comprometer un único equipo.'],
  [/cifrado sim[eé]trico|cifrado asim[eé]trico/i, 'El cifrado simétrico utiliza una misma clave secreta para cifrar y descifrar datos; es muy rápido y se usa para grandes volúmenes de información (como AES). El cifrado asimétrico usa un par de claves vinculadas —una pública y otra privada—; es más lento, pero permite intercambio seguro de claves y firmas digitales (como RSA o curvas elípticas).'],
  [/funci[oó]n hash|hash criptogr[aá]fica/i, 'Una función hash transforma un bloque de datos de cualquier tamaño en una cadena de longitud fija llamada digest o resumen, de forma unidireccional y con alta resistencia a colisiones. Se utiliza para verificar la integridad de archivos, almacenar contraseñas de forma segura (idealmente con algoritmos lentos y salt) y construir firmas digitales.'],
  [/firma digital/i, 'Una firma digital combina hash y criptografía asimétrica para que el firmante rubrique un mensaje o documento usando su clave privada. Garantiza autenticidad (quién lo firmó), integridad (que no fue alterado tras firmarse) y no repudio (que el firmante difícilmente pueda negar haberlo emitido).'],
  [/\btls\b|\bssl\b|\bpki\b/i, 'Un certificado TLS/SSL asocia una clave pública con una identidad (como un dominio) y está respaldado por una autoridad certificadora confiable para habilitar conexiones cifradas HTTPS. La PKI (Public Key Infrastructure) es el conjunto de políticas, roles, hardware y software que gestiona la emisión, renovación y revocación de esos certificados.'],
  [/\bdns\b/i, 'DNS es el sistema que traduce nombres de dominio legibles a direcciones IP para localizar servicios en internet. Entre sus amenazas destacan el DNS spoofing o cache poisoning (envenenar respuestas para redirigir tráfico), el DNS tunneling (exfiltrar datos o mantener canales encubiertos usando consultas DNS) y el secuestro de dominios.'],
  [/seguridad perimetral/i, 'La seguridad perimetral busca proteger los bordes de la red corporativa mediante firewalls, gateways y proxies. Ya no basta por sí sola porque los datos y usuarios están distribuidos en la nube, el trabajo remoto es habitual y los atacantes pueden entrar por correos, dispositivos móviles o aplicaciones SaaS sin cruzar un perímetro tradicional.'],
  [/\bhttps\b/i, 'HTTPS es el protocolo HTTP encapsulado sobre TLS para cifrar y autenticar la comunicación entre el navegador y el servidor web. Es indispensable no solo para proteger contraseñas y pagos, sino también para evitar alteraciones de contenido, proteger la privacidad y permitir funciones modernas del navegador.'],
  [/\bsoc\b|security operations center/i, 'Un SOC es el equipo centralizado —apoyado por procesos y herramientas— encargado de monitorear, detectar, analizar y responder a incidentes de seguridad de forma continua. Su labor combina vigilancia de alertas, investigación de amenazas, gestión de vulnerabilidades y mejora constante de las defensas.'],
  [/\bsiem\b|\bsoar\b/i, 'Un SIEM (Security Information and Event Management) recolecta, correlaciona y analiza logs y eventos de seguridad de múltiples fuentes para detectar anomalías y generar alertas. Un SOAR (Security Orchestration, Automation and Response) automatiza tareas repetitivas, orquesta acciones entre herramientas y estandariza flujos de respuesta a incidentes.'],
  [/fases.{0,40}respuesta a incidentes|respuesta a incidentes/i, 'Aunque existen marcos como el de NIST, las fases clásicas incluyen: preparación, detección y análisis, contención, erradicación, recuperación y lecciones aprendidas (post-mortem). Seguir este orden evita decisiones apresuradas que destruyan evidencia o empeoren el impacto operativo.'],
  [/contenci[oó]n.{0,40}incidente|erradicaci[oó]n/i, 'La contención busca frenar o limitar el daño inmediato —por ejemplo, aislando un host, bloqueando una IP o deshabilitando una cuenta— sin perder visibilidad ni evidencia clave. La erradicación consiste en eliminar por completo la causa raíz (como malware persistente o accesos creados por el atacante) antes de restaurar la operación normal.'],
  [/an[aá]lisis forense digital/i, 'Es la investigación metódica de dispositivos, redes, registros y sistemas para identificar qué ocurrió durante un incidente, cómo entró el atacante, qué acciones realizó y qué datos fueron afectados. Debe preservar la cadena de custodia y la integridad de la evidencia para que los hallazgos sean fiables y auditables.'],
  [/gesti[oó]n de vulnerabilidades/i, 'La gestión de vulnerabilidades es un ciclo continuo de descubrimiento, priorización, remediación (parches o mitigaciones) y verificación de fallos en los activos. Escanear solo muestra una fotografía de posibles problemas; el verdadero valor está en priorizar según criticidad, exposición y explotación activa, y aplicar los cambios a tiempo.'],
  [/regla.{0,20}3.?2.?1|copias de seguridad.{0,20}3.?2.?1/i, 'La regla clásica 3-2-1 recomienda mantener 3 copias de los datos importantes, en 2 tipos de soportes o medios distintos, con al menos 1 copia guardada fuera del sitio principal. Además, hoy se enfatiza que al menos una copia sea inmutable o desconectada (aislada) para resistir ataques de ransomware.'],
  [/\brto\b|\brpo\b|continuidad de negocio/i, 'El RPO (Recovery Point Objective) define la máxima cantidad de datos, medida en tiempo, que una organización puede permitirse perder tras un incidente (por ejemplo, hasta 1 hora de cambios). El RTO (Recovery Time Objective) define el tiempo máximo aceptable que un sistema puede estar fuera de servicio antes de restablecerse.'],
  [/threat hunting|caza de amenazas/i, 'El Threat Hunting es la búsqueda proactiva e iterativa de amenazas o intrusiones que ya lograron evadir las alertas automáticas tradicionales. Parte de hipótesis basadas en inteligencia de amenazas, comportamientos anómalos o contexto del negocio para descubrir actividad maliciosa de forma temprana.'],
  [/threat intelligence|inteligencia de amenazas/i, 'Es la información contextualizada sobre adversarios, tácticas, técnicas, procedimientos (TTPs), indicadores de compromiso (IoCs) y campañas activas. Ayuda a los equipos defensivos a anticipar ataques, afinar reglas de detección y priorizar defensas frente a lo que realmente amenaza a su sector.'],
  [/responsabilidad compartida.{0,30}nube|modelo.{0,30}responsabilidad compartida/i, 'Es el marco que delimita qué controles de seguridad corresponden al proveedor de servicios en la nube y cuáles al cliente, según el modelo usado (IaaS, PaaS o SaaS). Por lo general, el proveedor protege la infraestructura física y base de la nube, mientras el cliente es responsable de sus datos, identidades, accesos y configuraciones.'],
  [/configuraci[oó]n insegura.{0,30}nube|riesgos.{0,30}configuraci[oó]n.{0,30}nube/i, 'Entre los errores más frecuentes están dejar buckets de almacenamiento o bases de datos expuestos públicamente, asignar permisos excesivos en IAM, no activar registros de auditoría o descuidar secretos y claves API. Una mala configuración puede exponer información sensible sin necesidad de explotar un bug complejo.'],
  [/\biam\b|identity and access management/i, 'IAM es el conjunto de políticas, directorios y mecanismos que gestionan identidades digitales (personas, servicios o cargas de trabajo) y controlan qué recursos pueden usar. Es el eje central de la seguridad moderna en entornos híbridos y en la nube.'],
  [/gesti[oó]n de secretos|claves api|contrase[nñ]as de servicio/i, 'Las claves API, tokens y credenciales de servicio suelen tener altos privilegios y acceso programático a bases de datos o sistemas críticos. Si se filtran en repositorios de código, logs o archivos de configuración, un atacante puede operar de forma automatizada y silenciosa; deben guardarse en gestores de secretos y rotarse periódicamente.'],
  [/seguridad en contenedores|kubernetes/i, 'La seguridad en contenedores abarca proteger las imágenes base (evitando vulnerabilidades o secretos embebidos), firmar y verificar imágenes antes de desplegarlas, y aislar los contenedores en ejecución. En Kubernetes, implica además asegurar el plano de control, aplicar políticas de red, limitar privilegios de pods y controlar accesos RBAC.'],
  [/impacta.{0,40}(?:inteligencia artificial|\bia\b)|inteligencia artificial.{0,40}ciberseguridad/i, 'La IA ayuda a los defensores a acelerar el análisis de alertas, resumir incidentes, detectar anomalías y automatizar tareas repetitivas en el SOC. Al mismo tiempo, los atacantes la usan para redactar campañas de phishing más convincentes, analizar código en busca de fallos o agilizar la automatización de ataques.'],
  [/cumplimiento normativo|compliance/i, 'El cumplimiento normativo consiste en adherirse a leyes, regulaciones o estándares aplicables (como normativas de protección de datos o marcos como ISO/IEC 27001 o NIST). Aunque cumplir una norma ayuda a ordenar controles y demostrar diligencia, la ciberseguridad real requiere ir más allá del papel y adaptar las defensas a los riesgos actuales.'],
  [/concienciaci[oó]n|capacitaci[oó]n continua/i, 'Los controles técnicos son esenciales, pero los empleados y usuarios interactúan a diario con correos, mensajes, archivos y aplicaciones donde ocurren muchos intentos de engaño. Una capacitación periódica, práctica y libre de culpa fomenta hábitos seguros y logra que las personas reporten incidentes a tiempo.'],
  [/higiene digital/i, 'Implica usar un gestor de contraseñas con claves únicas y robustas, activar MFA en cuentas importantes, mantener sistemas y aplicaciones actualizados y desconfiar de enlaces o solicitudes urgentes inesperadas. Pequeñas rutinas constantes reducen de forma notable la probabilidad de sufrir un incidente común.'],
  [/ram|memoria/i, 'La memoria RAM es la memoria de trabajo del computador. Guarda temporalmente los programas y datos que estás usando para que el procesador acceda a ellos muy rápido. Cuando apagas el equipo, se borra.'],
  [/html/i, 'HTML es el lenguaje que da estructura a las páginas web. Con etiquetas como <h1>, <p> o <img> le dices al navegador qué es un título, un párrafo o una imagen.'],
  [/virus/i, 'Un virus informático es un programa malicioso que se copia y se propaga sin que el usuario lo sepa, y puede dañar archivos o robar información. Un antivirus actualizado y no abrir archivos desconocidos ayudan a evitarlo.'],
  [/contrase/i, 'Una contraseña segura tiene al menos 12 caracteres, mezcla letras, números y símbolos, y no usa datos personales. Lo mejor es usar una distinta para cada cuenta y activar la verificación en dos pasos.'],
  [/hardware|software/i, 'El hardware es la parte física del computador (pantalla, teclado, procesador). El software es la parte lógica: los programas y sistemas que le dicen al hardware qué hacer.'],
  [/inteligencia|ia\b/i, 'La inteligencia artificial es la tecnología que permite a las computadoras realizar tareas que normalmente requieren inteligencia humana, como entender el lenguaje, reconocer imágenes o tomar decisiones.']
];

// ===== Eventos =====

// Caja de texto: crece sola y activa/desactiva el botón de enviar
txt.addEventListener('input', () => {
  txt.style.height = 'auto';
  txt.style.height = txt.scrollHeight + 'px';
  send.disabled = !txt.value.trim();
});

// Enter envía, Shift+Enter hace salto de línea
txt.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); }
});

send.onclick = enviar;

// Botones de sugerencias
document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
  txt.value = c.textContent;
  enviar();
});

// Menú lateral en móvil
document.getElementById('menu').onclick = () => side.classList.toggle('open');

// Nuevo chat: limpia los mensajes y vuelve a la bienvenida
document.getElementById('nuevo').onclick = () => {
  msgs.innerHTML = '';
  msgs.hidden = true;
  hero.style.display = 'flex';
  side.classList.remove('open');
};

// ===== Funciones =====

// Agrega un mensaje al chat y devuelve el elemento .body para poder editarlo
function agregar(clase, html) {
  const d = document.createElement('div');
  d.className = 'msg ' + clase;
  d.innerHTML = clase === 'ai'
    ? '<div class="badge">K</div><div class="body">' + html + '</div>'
    : '<div class="body"></div>';
  if (clase !== 'ai') d.firstChild.textContent = html;
  msgs.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
  return d.querySelector('.body');
}

// Envía el mensaje del usuario y muestra la respuesta
function enviar() {
  const t = txt.value.trim();
  if (!t) return;

  hero.style.display = 'none';
  msgs.hidden = false;
  agregar('user-msg', t);

  txt.value = '';
  txt.style.height = 'auto';
  send.disabled = true;

  const r = agregar('ai', '<span class="dots"><span></span><span></span><span></span></span>');
  const hallada = respuestas.find(([re]) => re.test(t));

  setTimeout(() => {
    r.textContent = hallada
      ? hallada[1]
      : 'Soy Krisha. Esta es una respuesta de ejemplo: aquí aparecería mi respuesta real cuando esta página se conecte a un modelo de IA.';
    chat.scrollTop = chat.scrollHeight;
  }, 1000);
}
