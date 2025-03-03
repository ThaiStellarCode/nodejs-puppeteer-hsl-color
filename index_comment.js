//* 1. เรียกใช้งาน package "puppeteer"
const puppeteer = require('puppeteer');

//* 2. ประกาศตัวแปรที่สำคัญ
const browserHeadless = false; //กำหนดว่าให้มีหัวเว็บไซต์ไหม (กำหนดเป็น true หรือ false)
const browserWidth = 1280; //กำหนดขนาดความกว้างของเว็บ
const browserHeight = 880; //กำหนดขนาดความสูงของเว็บ
const urlGame = 'https://www.realtimecolors.com/game'; //กำหนดเว็บไซต์ที่จะให้เปิด

//* 3. รันฟังก์ชั่น playHSLColorGame
playHSLColorGame();

const playHSLColorGame = async () => {
  //* 4. เริ่มต้นทำงาน puppeteer ให้เปิด browser ขึ้นมาใหม่
  const browser = await puppeteer.launch({ 
    headless: browserHeadless,
    defaultViewport: { width: browserWidth, height: browserHeight }
  });
  
  //* 5. เปิด Tab ใหม่และเข้าเว็บไซต์ที่กำหนด ในบรรทัดที่ 8 (urlGame)
  const page = await browser.newPage();
  await page.goto(urlGame, { waitUntil: 'networkidle2' });
  
  //try = พยายามทำงานฟังก์ชั่น และคำสั่งด้านในวงเล็บ {...} หากมีตรงไหน error จะหยุดทำงาน และย้ายไปทำงานในวงเล็บ catch แทนทันที
  try {
    while (true) { // ลูปทำงานไปเรื่อย ๆ จนกว่าจะหยุดเอง
      //* 6. รอให้มี element <div class="square"> ปรากฏขึ้นภายใน 5 วินาที (5000 ms = 5 วินาที)
      await page.waitForSelector('div.square', { timeout: 5000 });
      
      //* 7. ดึงข้อมูลสีพื้นหลังของทุก div ที่มี class "square"
      const squaresData = await page.evaluate(() => {
        //* 8. ค้นหาทุก <div class="square">
        const squares = document.querySelectorAll('div.square');
        //* 9. วนลูปผ่านแต่ละ div แล้วดึงค่าของมัน
        return Array.from(squares).map((square, index) => {
          const style = window.getComputedStyle(square); // ดึงค่า style ที่ถูกคำนวณจริง
          const backgroundColor = style.backgroundColor; // ได้ค่าสีพื้นหลังของ div นั้น
          //* 10. เก็บ index และสีของ div ไว้ใน array
          return { index, backgroundColor };
        });
      });
      
      //* 11. สร้าง object เพื่อนับจำนวนครั้งที่แต่ละสีปรากฏ
      const colorCounts = {};

      //* 12. ถ้าสีนี้ยังไม่มีใน object ให้เริ่มที่ 0 แล้วเพิ่มค่า +1 ทุกครั้งที่พบ
      squaresData.forEach(square => {colorCounts[square.backgroundColor] = (colorCounts[square.backgroundColor] || 0) + 1});
      
      //* 13. ค้นหา div ที่มีสีที่ปรากฏเพียงครั้งเดียวในกลุ่ม (เป็นสีที่ไม่ซ้ำใคร)
      const uniqueColorData = squaresData.find(square => colorCounts[square.backgroundColor] === 1);
      
      //* 14. ตรวจสอบเงื่อนไข ถ้าพบ div ที่มีสีไม่ซ้ำกับใครเลย
      if (uniqueColorData) {
        //* 15. ดึง element ทั้งหมดที่เป็น div.square
        const squares = await page.$$('div.square');
        //* คลิกที่ div ที่มีสีไม่ซ้ำ
        await squares[uniqueColorData.index].click();
        
        await new Promise(resolve => setTimeout(resolve, 0)); // หน่วงเวลาสั้น ๆ เพื่อให้ระบบประมวลผลการคลิก
      } else {
        console.log('Could not find a unique colored square'); // แจ้งเตือนถ้าไม่พบ div ที่มีสีไม่ซ้ำใคร
        await new Promise(resolve => setTimeout(resolve, 500)); // หน่วงเวลา 500ms หรือ 0.5 วินาที ก่อนวนลูปใหม่
      }
    }
  } catch (error) {
    //แสดง error ที่พบเมื่อโค้ดใน try {...} เกิดการ error
    console.error('Error:', error);
  }
};