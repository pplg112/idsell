document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // ตรวจสอบรหัสผ่านและยืนยันรหัสผ่านว่าตรงกันหรือไม่
    if (password !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน กรุณาลองใหม่');
    } else {
        // สร้างอ็อบเจ็กต์เพื่อเก็บข้อมูลผู้ใช้
        const userData = {
            username: username,
            email: email,
            password: password
        };

        // เก็บข้อมูลผู้ใช้ใน Local Storage
        localStorage.setItem('registeredUser', JSON.stringify(userData));

        alert('สมัครสมาชิกสำเร็จ! นำท่านไปยังหน้าล็อกอิน');

        // นำผู้ใช้ไปยังหน้าล็อกอิน
        window.location.href = 'login.html';
    }
});
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;

    // ดึงข้อมูลผู้ใช้ที่สมัครสมาชิกจาก Local Storage
    const storedUserData = JSON.parse(localStorage.getItem('registeredUser'));

    // ตรวจสอบว่าชื่อผู้ใช้และรหัสผ่านตรงกับข้อมูลที่เก็บไว้หรือไม่
    if (storedUserData && storedUserData.username === loginUsername && storedUserData.password === loginPassword) {
        alert('เข้าสู่ระบบสำเร็จ!');
        // นำผู้ใช้ไปยังหน้าหลัก
        window.location.href = 'index.html';
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
});

// ฟังก์ชันป๊อปอัพติดต่อทีมงาน
const contactModal = document.getElementById('contact-modal');
const contactButton = document.getElementById('contact-support');
const closeModal = document.getElementById('close-modal');

contactButton.addEventListener('click', function() {
    contactModal.classList.add('show'); // เพิ่มคลาส show เมื่อเปิดป๊อปอัพ
});

closeModal.addEventListener('click', function() {
    contactModal.classList.remove('show'); // ลบคลาส show เมื่อปิดป๊อปอัพ
});

window.onclick = function(event) {
    if (event.target === contactModal) {
        contactModal.classList.remove('show'); // ลบคลาส show เมื่อคลิกนอกป๊อปอัพ
    }
};

// ฟังก์ชันส่งข้อความ
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const message = document.getElementById('user-message').value;

    // ที่นี่คุณสามารถเพิ่มโค้ดเพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์หรือจัดการข้อความ
    alert(`ข้อความของคุณถูกส่งเรียบร้อยแล้ว!\nชื่อ: ${name}\nอีเมล: ${email}\nข้อความ: ${message}`);

    // ปิดป๊อปอัพและเคลียร์ฟอร์ม
    contactModal.classList.remove('show'); // ลบคลาส show เมื่อปิดป๊อปอัพ
    document.getElementById('contact-form').reset();
});
