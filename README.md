# Web Scraping de Notebooks con Playwright

Este proyecto utiliza **Playwright** para realizar web scraping de la página [Compras Paraguay - Notebooks](https://www.comprasparaguai.com.br/notebook/), extrayendo los datos de nombres, imagenes, Links y precios de los notebooks listados. Los datos obtenidos se guardan en un archivo JSON.

---

## 🚀 Características

- **Web scraping dinámico**: Soporta contenido generado por JavaScript.
- **Eficiente y moderno**: Utiliza Playwright con el navegador Chromium en modo headless.
- **Salida en JSON**: Los datos extraídos se guardan en `notebooks.json`.
- **Prevención de bloqueos**: Incluye opciones para rotar User-Agents, usar proxies y añadir retardos aleatorios.

---

## 🛠️ Requisitos Previos

1. Tener **Node.js** (versión 16 o superior) instalado en tu sistema.
2. Instalar Playwright:
   ```bash
   npx install playwright

📂 Estructura del Proyecto
📁 scraping-playwright
├── index.mjs          # Código principal para scraping
└── notebooks.json     # Archivo JSON generado con los datos extraídos
📜 Uso

    Clona el repositorio:

git clone https://github.com/tu-usuario/scraping-playwright.git
cd scraping-playwright

Instala las dependencias:

npm install

Ejecuta el scraping:

node index.mjs

Revisa los datos extraídos: El archivo notebooks.json contendrá los datos de los productos extraídos en formato JSON, como este ejemplo:

    [
      {
        "name": "Notebook Lenovo IdeaPad 3",
        "price": "R$ 3.200,00"
      },
      {
        "name": "Notebook Acer Aspire 5",
        "price": "R$ 3.800,00"
      }
    ]
Cómo funciona el código

    Librería Playwright:
        Usamos chromium para simular un navegador (puedes usar firefox o webkit).
        Configuramos el navegador en modo headless (sin ventana visible) para mayor eficiencia.
    Selección de elementos:
        La función $$eval evalúa todos los elementos que coinciden con el selector CSS (div.product-box) y extrae los datos deseados (h2 para el nombre y span.price para el precio).
        ejecuta node index.mjs para extraer los datos de los productos de la página.
    JSON:
        Los datos extraídos se escriben en un archivo notebooks.json usando fs.promises.
        
        
⚙️ Configuración Avanzada
Rotación de User-Agent

Para reducir el riesgo de ser bloqueado, puedes rotar los User-Agents en cada petición. Encuentra el siguiente bloque de código en index.mjs y descoméntalo:

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
];
const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
await page.setExtraHTTPHeaders({ 'User-Agent': randomUserAgent });

Configuración de Proxies

Para usar un proxy, modifica la configuración del navegador en index.mjs:

const browser = await chromium.launch({
  headless: true,
  proxy: { server: 'http://proxy_server:port' },
});

Retrasos Aleatorios

Agrega un retraso aleatorio entre solicitudes para parecer menos sospechoso:

const randomDelay = Math.floor(Math.random() * 5000) + 1000;
await page.waitForTimeout(randomDelay);

⚠️ Notas Legales

El scraping de datos de sitios web puede estar regulado por los términos de uso del sitio web objetivo. Asegúrate de revisar estos términos antes de realizar scraping y utiliza este código de manera ética y responsable.
🖥️ Tecnologías Utilizadas

    Node.js
    Playwright
    JavaScript (ESM)

📄 Licencia

Este proyecto está bajo la MIT License. Puedes usarlo y modificarlo libremente, pero por favor, menciona la fuente.
🌟 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes sugerencias o mejoras, siéntete libre de abrir un issue o enviar un pull request.
📞 Contacto: lookym +5493416711760

Si tienes preguntas o necesitas ayuda, contáctame a través de lookymlive@gmail.com


---


