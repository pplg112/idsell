document.getElementById('topup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    const amount = document.getElementById('amount').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // แสดงข้อความให้ผู้ใช้ทราบว่ากำลังดำเนินการชำระเงิน
    document.getElementById('message').innerText = `กำลังดำเนินการชำระเงินจำนวน ${amount} บาท ผ่าน ${paymentMethod}...`;

    // ที่นี่คุณสามารถเพิ่มโค้ดสำหรับการชำระเงินผ่าน API ของ PayPal หรือ Stripe
    // ตัวอย่าง:
    fetch('API_URL_HERE', {
        method: 'POST',
        body: JSON.stringify({
            amount: amount,
            paymentMethod: paymentMethod
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // ตรวจสอบผลลัพธ์ของการชำระเงินและแจ้งให้ผู้ใช้ทราบ
        if (data.success) {
            // อัปเดตยอดเงินของผู้ใช้ใน Local Storage หรือฐานข้อมูล
            let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
            currentBalance += parseFloat(amount); // อัปเดตยอดเงิน
            localStorage.setItem('balance', currentBalance); // บันทึกยอดเงินใหม่

            document.getElementById('message').innerText = `เติมเงินจำนวน ${amount} บาท สำเร็จ!`;
            alert('เติมเงินสำเร็จ!'); // หรือสามารถใช้ข้อความที่ไม่ใช่ alert
        } else {
            alert('เกิดข้อผิดพลาดในการเติมเงิน!');
            document.getElementById('message').innerText = 'เกิดข้อผิดพลาดในการเติมเงิน!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการเติมเงิน!');
        document.getElementById('message').innerText = 'เกิดข้อผิดพลาดในการเติมเงิน!';
    });
});

const stripe = Stripe('pk_test_51Q2acSK8OE9M2oHfOsHkRvItPqRghohzuVVDSdqX0gRlSig7Jc9uTcsw5KlOMOoH9jAft3k4eTmXMSrEgkrbdk3100DzGscCyS');

const appearance = { /* appearance */ };
const options = { /* options */ };
const elements = stripe.elements({ clientSecret, appearance });
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');