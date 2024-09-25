// cart.js

// ฟังก์ชันในการเพิ่มสินค้าไปยังตะกร้า
function addToCart(itemName, itemPrice) {
    // ดึงข้อมูลสินค้าจาก Local Storage หรือสร้างอาร์เรย์ว่างหากไม่มีข้อมูล
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // เพิ่มสินค้าลงในตะกร้า
    cart.push({
        name: itemName,
        price: itemPrice
    });

    // เก็บข้อมูลตะกร้าไว้ใน Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // อัปเดตจำนวนสินค้าในตะกร้าที่แสดงในหน้าเว็บ
    updateCartCount();
    alert(`เพิ่ม "${itemName}" ลงในตะกร้าเรียบร้อยแล้ว!`);
}

// ฟังก์ชันในการอัปเดตจำนวนสินค้าในตะกร้าที่แสดงในหน้าเว็บ
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// เรียกใช้ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้าเมื่อโหลดหน้าเว็บ
window.onload = function() {
    updateCartCount();
};
