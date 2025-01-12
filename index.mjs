import { chromium } from 'playwright';
import fs from 'fs/promises';

// URL de la página que deseas scrapear
const url = 'https://www.comprasparaguai.com.br/notebook/';

// Función principal de scraping
const scrapeNotebooks = async () => {
  // Inicializa el navegador
  const browser = await chromium.launch({ headless: true }); // Cambia a false si quieres ver el navegador
  const page = await browser.newPage();

  // Establece headers para emular un navegador real
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  });

  // Navega a la URL
  await page.goto(url);

  // Espera a que cargue el contenido dinámico
  await page.waitForTimeout(5000);

  // Selecciona los productos en la página
  const products = await page.$$eval('div.product-box', (elements) => {
    return elements.map((element) => {
      const name = element.querySelector('h2')?.innerText.trim() || 'Sin nombre';
      const price = element.querySelector('span.price')?.innerText.trim() || 'Sin precio';
      const image = element.querySelector('img')?.src || 'Sin imagen';
      const link = element.querySelector('a')?.href || 'Sin enlace';
      return { name, price, image, link };
    });
  });
    console.log(products);
  // Cierra el navegador
  await browser.close();

  // Devuelve los datos extraídos
  return products;
};

// Ejecuta el scraping y guarda los datos en un archivo JSON
(async () => {
  try {
    const products = await scrapeNotebooks();
    console.log('Datos extraídos:', products);

    // Guarda los datos en un archivo JSON
    await fs.writeFile('notebooks.json', JSON.stringify(products, null, 2), 'utf8');
    console.log('Datos guardados en notebooks.json');
  } catch (error) {
    console.error('Error durante el scraping:', error);
  }
})();
