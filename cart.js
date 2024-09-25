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
// ฟังก์ชันสำหรับการเพิ่มสินค้าลงตะกร้า
function addToCart(event) {
    // หยุดการทำงานเริ่มต้นของปุ่ม
    event.preventDefault();

    // รับข้อมูลสินค้าจากปุ่มที่ถูกคลิก
    const productId = event.target.getAttribute('data-id');
    const productName = event.target.getAttribute('data-name');
    const productPrice = event.target.getAttribute('data-price');
    const productImage = event.target.getAttribute('data-image');
    let productStock = parseInt(event.target.getAttribute('data-stock'), 10);

    // ตรวจสอบว่ามีสินค้าเหลืออยู่หรือไม่
    if (productStock <= 0) {
        alert('This product is out of stock.');
        return;
    }

    // สร้างสินค้าเป็น Object
    const product = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        quantity: 1
    };

    // ตรวจสอบว่ามีสินค้าใน Local Storage หรือยัง
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ตรวจสอบว่าสินค้ามีอยู่ในตะกร้าแล้วหรือไม่
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // ถ้ามีอยู่แล้ว เพิ่มจำนวนสินค้า
        if (cart[existingProductIndex].quantity < productStock) {
            cart[existingProductIndex].quantity += 1;
        } else {
            alert('Cannot add more, stock limit reached.');
            return;
        }
    } else {
        // ถ้ายังไม่มี ให้เพิ่มสินค้าใหม่ลงในตะกร้า
        cart.push(product);
    }

    // อัพเดตข้อมูลใน Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // อัพเดตการแสดงผลตะกร้า
    updateCartUI();

    // ลดจำนวนสินค้าที่เหลือ
    productStock -= 1;
    event.target.setAttribute('data-stock', productStock);
    event.target.previousElementSibling.querySelector('.stock-count').textContent = productStock;

    // แสดงข้อความแจ้งเตือนเมื่อเพิ่มสินค้าลงตะกร้า
    alert(`${productName} has been added to the cart.`);
}

// เพิ่ม Event Listener ให้กับปุ่ม "Add to Cart"
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// ฟังก์ชันสำหรับการอัพเดตการแสดงผลตะกร้า
function updateCartUI() {
    // ตัวอย่างการแสดงจำนวนสินค้าในตะกร้า
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    // อัพเดตรายการสินค้าในตะกร้า
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
        `;
        cartList.appendChild(listItem);
    });
}

// เรียกฟังก์ชันนี้เมื่อเริ่มโหลดหน้าเว็บเพื่อแสดงข้อมูลตะกร้าปัจจุบัน
updateCartUI();
