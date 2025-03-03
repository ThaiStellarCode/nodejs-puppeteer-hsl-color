const puppeteer = require('puppeteer');

const browserHeadless = false;
const browserWidth = 1280;
const browserHeight = 880;
const urlGame = 'https://www.realtimecolors.com/game';
const nextLoop = 0;

const playHSLColorGame = async () => {
  const browser = await puppeteer.launch({ 
    headless: browserHeadless,
    defaultViewport: { width: browserWidth, height: browserHeight }
  });
  
  const page = await browser.newPage();
  await page.goto(urlGame, { waitUntil: 'networkidle2' });
  
  try {
    while (true) {
      await page.waitForSelector('div.square', { timeout: 5000 });

      const squaresData = await page.evaluate(() => {
        const squares = document.querySelectorAll('div.square');
        return Array.from(squares).map((square, index) => {
          const style = window.getComputedStyle(square);
          const backgroundColor = style.backgroundColor;
          return { index, backgroundColor };
        });
      });
      
      const colorCounts = {};
      squaresData.forEach(square => {colorCounts[square.backgroundColor] = (colorCounts[square.backgroundColor] || 0) + 1});
      const uniqueColorData = squaresData.find(square => colorCounts[square.backgroundColor] === 1);
      
      if (uniqueColorData) {
        const squares = await page.$$('div.square');
        await squares[uniqueColorData.index].click();
        
        await new Promise(resolve => setTimeout(resolve, nextLoop));
      } else {
        console.log('Could not find a unique colored square');
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

playHSLColorGame();