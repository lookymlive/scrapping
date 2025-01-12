import { chromium } from 'playwright';
import fs from 'fs/promises';

// URL de la página
const url = 'https://www.comprasparaguai.com.br/notebook/';

// Función principal
const scrapeNotebooks = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Configura un User-Agent para evitar bloqueos
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  });

  // Navega a la URL
  await page.goto(url);

  // Espera a que los elementos relevantes estén presentes en el DOM
  await page.waitForSelector('a.truncate');

  // Extrae los datos de los productos
  const products = await page.$$eval('a.truncate', (elements) => {
    return elements.map((element) => {
      const name = element.innerText.trim();
      const link = element.getAttribute('href');
      return { name, link: `https://www.comprasparaguai.com.br${link}` };
    });
  });

  // Cierra el navegador
  await browser.close();

  // Devuelve los datos extraídos
  return products;
};

// Ejecuta el scraping
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
