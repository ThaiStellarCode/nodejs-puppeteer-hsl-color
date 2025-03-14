# Node.js Puppeteer HSL Color Game Bot 🎨🤖

![HSL-Color](/assets/hsl-color-game.png)

## 🖌️ เกี่ยวกับโปรเจกต์
โปรเจกต์นี้ใช้ Puppeteer สำหรับเล่นเกม Realtime Colors โดยอัตโนมัติ โดยบอทจะค้นหาสี่เหลี่ยมที่มีสีแตกต่างจากตัวอื่น แล้วคลิกเลือกอย่างแม่นยำ

![Example](/assets/example.gif)

## 🚀 วิธีติดตั้งและใช้งาน
1️⃣ ติดตั้ง Dependencies
```bash
npm install
หรือ
pnpm install
หรือ
bun install
```
2️⃣ รันบอท
```bash
npm start
หรือ
pnpm start
หรือ
bun start
```

## ⚙️ การตั้งค่า
คุณสามารถปรับค่าต่าง ๆ ได้ที่ตัวแปรในไฟล์ index.js:
```bash
const browserHeadless = false; // ตั้งค่าเป็น true หากต้องการรันแบบเบื้องหลัง (headless)
const browserWidth = 1280;     // ความกว้างของหน้าต่างเบราว์เซอร์
const browserHeight = 880;     // ความสูงของหน้าต่างเบราว์เซอร์
const urlGame = 'https://www.realtimecolors.com/game'; // URL ของเกม
const nextLoop = 0; //ระยะเวลาในการขึ้นรอบถัดไป (ใส่เป็นหน่วย ms เช่น 0 = 0 วินาที หรือ 1000 = 1 วินาที)
```

## 🛠️ เทคโนโลยีที่ใช้
- Node.js
- Puppeteer

## 📌 หลักการทำงานของบอท
1. เปิดเว็บเกมโดยใช้ Puppeteer
2. ค้นหา div.square ที่เป็นตัวเลือกของเกม
3. อ่านค่าสีพื้นหลังของแต่ละตัวเลือก
4. คำนวณหาสีที่ปรากฏเพียงครั้งเดียว (สีที่แตกต่างจากตัวอื่น)
5. คลิกเลือกสีที่ไม่ซ้ำ
6. ทำซ้ำไปเรื่อย ๆ จนกว่าผู้ใช้จะหยุดโปรแกรม

## 📝 หมายเหตุ
บอทนี้ทำงานได้ดีที่สุดในโหมด headless: false เพื่อให้สามารถสังเกตผลลัพธ์ได้

หากมีการเปลี่ยนแปลงโครงสร้างของหน้าเว็บเกม อาจต้องปรับโค้ดให้สอดคล้องกับ DOM ใหม่

## 📜 License
เผยแพร่ภายใต้ใบอนุญาต MIT

## 👨‍💻 ผู้จัดทำ
[MeteorVIIx](https://github.com/guysuvijak)