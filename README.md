# Food & Cocktail Explorer 🍲🍹
แอปพลิเคชันเว็บที่สวยงามและใช้งานง่าย ช่วยให้คุณค้นหาสูตรอาหารและค็อกเทลจากทั่วโลก

## 📄 ภาพรวม
Food & Cocktail Explorer เป็นเว็บแอปพลิเคชันที่ตอบสนองทุกขนาดหน้าจอ สร้างด้วย Vue.js และ Tailwind CSS เชื่อมต่อกับ API ของ MealDB และ CocktailDB เพื่อให้ข้อมูลสูตรอาหารที่หลากหลาย แอปพลิเคชันมีหน้าตาที่ทันสมัย มีแอนิเมชันที่ราบรื่น และการออกแบบแบบ glass-effect

## ✨ คุณสมบัติ
### คุณสมบัติทั่วไป
- อินเตอร์เฟซแบบ glass-effect ที่สวยงาม พร้อมด้วยแอนิเมชันเมื่อโฮเวอร์ที่นุ่มนวล
- ดีไซน์ที่ตอบสนองทุกขนาดหน้าจอ ทั้งมือถือ แท็บเล็ต และเดสก์ท็อป
- อินเตอร์เฟซภาษาไทย
- บริการหลักสองประเภท: สูตรอาหารและค็อกเทล

### คุณสมบัติการค้นหาอาหาร
- ค้นหาอาหารด้วยชื่อ
- กรองอาหารตามหมวดหมู่หรือประเทศต้นกำเนิด
- รับคำแนะนำอาหารแบบสุ่ม
- ดูข้อมูลอาหารโดยละเอียด ซึ่งประกอบด้วย:
  - รูปภาพคุณภาพสูง
  - รายการส่วนผสมพร้อมปริมาณ
  - ขั้นตอนการทำอาหารแบบละเอียด
  - วิดีโอสอนทำอาหารจาก YouTube (หากมี)
  - ประเทศต้นกำเนิดและหมวดหมู่

### คุณสมบัติการค้นหาค็อกเทล
- ค้นหาค็อกเทลด้วยชื่อ
- กรองค็อกเทลตามหมวดหมู่
- รับคำแนะนำค็อกเทลแบบสุ่ม
- ดูข้อมูลค็อกเทลโดยละเอียด ซึ่งประกอบด้วย:
  - รูปภาพคุณภาพสูง
  - รายการส่วนผสมพร้อมปริมาณ
  - คำแนะนำในการเตรียม
  - ประเภทของแก้วที่แนะนำ
  - ข้อมูลว่ามีแอลกอฮอล์หรือไม่

## 🛠️ เทคโนโลยีที่ใช้
- **Vue.js 3** - เฟรมเวิร์ก JavaScript ที่มีความก้าวหน้า
- **Tailwind CSS** - เฟรมเวิร์ก CSS ประเภท utility-first
- **Font Awesome** - ไลบรารีไอคอน
- **TheMealDB API** - ฐานข้อมูลสำหรับสูตรอาหาร
- **TheCocktailDB API** - ฐานข้อมูลสำหรับสูตรค็อกเทล
---
## 📝 การใช้งาน API ใน Food & Cocktail Explorer

Food & Cocktail Explorer ใช้ API จาก TheMealDB และ TheCocktailDB เพื่อดึงข้อมูลสูตรอาหารและค็อกเทล



## 🔗 API ที่ใช้

### 🍽️ TheMealDB API
- **URL หลัก:** [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)
- **ตัวอย่าง API Endpoint:**
  - รายการหมวดหมู่อาหาร: `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  - รายการประเทศต้นกำเนิด: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  - ค้นหาอาหารตามชื่อ: `https://www.themealdb.com/api/json/v1/1/search.php?s={ชื่ออาหาร}`
  - ค้นหาอาหารแบบสุ่ม: `https://www.themealdb.com/api/json/v1/1/random.php`

### 🍹 TheCocktailDB API
- **URL หลัก:** [https://www.thecocktaildb.com/api.php](https://www.thecocktaildb.com/api.php)
- **ตัวอย่าง API Endpoint:**
  - รายการหมวดหมู่ค็อกเทล: `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
  - ค้นหาค็อกเทลตามชื่อ: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s={ชื่อค็อกเทล}`
  - ค้นหาค็อกเทลแบบสุ่ม: `https://www.thecocktaildb.com/api/json/v1/1/random.php`

---

## ⚙️ การดึงข้อมูล API

### 1️⃣ โหลดหมวดหมู่ของอาหาร
```javascript
async function loadMealCategories() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        this.mealCategories = data.meals.map(category => category.strCategory);
    } catch (error) {
        console.error('Error loading meal categories:', error);
    }
}
```

### 2️⃣ ค้นหาอาหาร
```javascript
async function searchMeals(query) {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        this.meals = data.meals || [];
    } catch (error) {
        console.error('Error searching meals:', error);
    }
}
```

### 3️⃣ โหลดหมวดหมู่ของค็อกเทล
```javascript
async function loadCocktailCategories() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        this.cocktailCategories = data.drinks.map(category => category.strCategory);
    } catch (error) {
        console.error('Error loading cocktail categories:', error);
    }
}
```

### 4️⃣ ค้นหาค็อกเทล
```javascript
async function searchCocktails(query) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        this.cocktails = data.drinks || [];
    } catch (error) {
        console.error('Error searching cocktails:', error);
    }
}
```

---

## 🛠 การเพิ่ม API ลงในโปรเจกต์

1. เปิดไฟล์ `app.js`
2. เพิ่มฟังก์ชันสำหรับเรียก API ตามตัวอย่างข้างต้น
3. เรียกใช้ฟังก์ชันใน `mounted()` เพื่อโหลดข้อมูลทันทีที่แอปเริ่มทำงาน

---

## ✅ สรุป
- ใช้ API จาก TheMealDB และ TheCocktailDB เพื่อดึงข้อมูลสูตรอาหารและค็อกเทล
- โหลดหมวดหมู่ รายการประเทศ และข้อมูลอาหาร/ค็อกเทลตามที่ผู้ใช้ค้นหา
- ใช้ JavaScript `fetch()` เพื่อดึงข้อมูลจาก API
- แสดงผลข้อมูลที่ได้รับบน UI ด้วย Vue.js

---

## 🚀 เริ่มต้นใช้งาน
แอปพลิเคชันนี้ประกอบด้วยไฟล์หลายไฟล์ที่ทำงานร่วมกัน ได้แก่ HTML, JavaScript และ CSS แยกกัน เพื่อให้สามารถจัดการและบำรุงรักษาได้ง่าย

### สิ่งที่ต้องมี
- เว็บเบราว์เซอร์ที่ทันสมัย
- การเชื่อมต่ออินเทอร์เน็ต (เพื่อเข้าถึง API)

### การติดตั้งและการเรียกใช้
1. ดาวน์โหลดหรือโคลนโปรเจกต์นี้
2. เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์ที่ทันสมัย
3. เริ่มค้นหาสูตรอาหารอร่อยๆ!

### โครงสร้างไฟล์
- `index.html` - โครงสร้าง HTML หลักของแอปพลิเคชัน
- `styles.css` - สไตล์ชีทสำหรับการออกแบบ UI
- `app.js` - โค้ด JavaScript ที่ควบคุมฟังก์ชันการทำงานของแอปพลิเคชัน
- `README.md` - เอกสารแนะนำโปรเจกต์

## 📱 วิธีใช้งาน
1. เลือกระหว่าง "สูตรอาหาร" หรือ "ค็อกเทล" บนหน้าจอหลัก
2. ใช้แถบค้นหาเพื่อค้นหาอาหาร/ค็อกเทลเฉพาะ
3. ใช้ตัวกรองเพื่อจำกัดผลลัพธ์ตามหมวดหมู่หรือประเทศ
4. คลิกปุ่ม "สุ่ม" เพื่อรับคำแนะนำที่น่าประหลาดใจ
5. คลิก "ดูรายละเอียด" บนรายการใดๆ เพื่อดูข้อมูลสูตรโดยละเอียด
6. คลิก "กลับหน้าหลัก" เพื่อกลับไปยังหน้าเลือกบริการ

## 🎨 คอมโพเนนต์ UI
- แถบนำทางแบบ glass-effect
- แอนิเมชันเมื่อโฮเวอร์การ์ด
- พื้นหลังแบบไล่ระดับสี
- เลย์เอาต์กริดที่ตอบสนองทุกขนาดหน้าจอ
- หน้าต่างโมดัลสำหรับข้อมูลโดยละเอียด
- ตัวกรองแบบโต้ตอบที่มีฟังก์ชันการสลับ

## 🔄 การรวม API
แอปนี้รวมเข้ากับ:
- TheMealDB API - https://www.themealdb.com/api.php
- TheCocktailDB API - https://www.thecocktaildb.com/api.php

## 🌟 การปรับปรุงในอนาคต
- บัญชีผู้ใช้สำหรับบันทึกสูตรโปรด
- ฟังก์ชันรายการซื้อของ
- รองรับหลายภาษา
- โหมดมืด
- ฟังก์ชันออฟไลน์ด้วย local storage

## 🤝 เครดิต
- TheMealDB และ TheCocktailDB สำหรับการให้ API สูตรฟรี
- ชุมชน Vue.js และ Tailwind CSS สำหรับเฟรมเวิร์กที่ทรงพลัง
- Font Awesome สำหรับไอคอนที่สวยงาม

## 👥 ผู้พัฒนา

- [Porpathom](https://github.com/Porpathom)
---
⭐ สนุกกับการค้นหาสูตรอาหารและค็อกเทลใหม่ๆ จากทั่วโลก! ⭐