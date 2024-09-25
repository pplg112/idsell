// cart.js

// ฟังก์ชันในการแสดงสินค้าในตะกร้า
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // เคลียร์รายการสินค้าเดิมก่อนที่จะเพิ่มข้อมูลใหม่
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>ตะกร้าสินค้าว่างเปล่า</p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            // แสดงรายละเอียดสินค้า
            itemElement.innerHTML = `
                <h4>${item.name}</h4>
                <p>ราคา: ${item.price} Robux</p>
                <button onclick="removeFromCart(${index})">ลบสินค้า</button>
            `;

            cartItemsContainer.appendChild(itemElement);

            // คำนวณยอดรวมสินค้า
            totalPrice += item.price;
        });
    }

    totalPriceElement.textContent = totalPrice;
    updateCartCount(); // อัปเดตจำนวนสินค้าที่แสดงในตะกร้าใน navigation bar
}

// ฟังก์ชันในการลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ลบสินค้าที่ระบุตาม index
    cart.splice(index, 1);

    // เก็บข้อมูลใหม่กลับเข้าไปใน Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // แสดงข้อมูลสินค้าใหม่หลังจากการลบ
    displayCartItems();
}

// ฟังก์ชันในการเคลียร์ตะกร้าสินค้า
function clearCart() {
    localStorage.removeItem('cart'); // ลบข้อมูลตะกร้าออกจาก Local Storage
    displayCartItems(); // รีเฟรชการแสดงผลตะกร้าสินค้า
    alert('ลบสินค้าทั้งหมดในตะกร้าเรียบร้อยแล้ว');
}

// ฟังก์ชันในการสั่งซื้อสินค้า
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('ตะกร้าสินค้าว่างเปล่า ไม่สามารถสั่งซื้อได้');
        return;
    }

    // ส่งข้อมูลการสั่งซื้อไปยังเซิร์ฟเวอร์หรือประมวลผลการสั่งซื้อที่นี่
    // ตัวอย่าง:
    alert('สั่งซื้อสินค้าสำเร็จ!');

    // ล้างตะกร้าสินค้าหลังจากสั่งซื้อ
    clearCart();
}

// ฟังก์ชันในการอัปเดตจำนวนสินค้าในตะกร้าที่แสดงใน navigation bar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บ
window.onload = function() {
    displayCartItems();

    // กำหนดเหตุการณ์คลิกสำหรับปุ่มสั่งซื้อและปุ่มลบสินค้าทั้งหมด
    document.getElementById('checkout-button').addEventListener('click', checkout);
    document.getElementById('clear-cart-button').addEventListener('click', clearCart);
};
