document.getElementById('bank-account-form').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    const bankName = document.getElementById('bank-name').value;
    const accountNumber = document.getElementById('account-number').value;
    const accountName = document.getElementById('account-name').value;

    // เก็บข้อมูลบัญชีธนาคารใน Local Storage
    const bankAccountData = {
        bankName: bankName,
        accountNumber: accountNumber,
        accountName: accountName
    };

    localStorage.setItem('bankAccount', JSON.stringify(bankAccountData));

    // แสดงข้อความให้ผู้ใช้ทราบว่าข้อมูลถูกบันทึกเรียบร้อยแล้ว
    document.getElementById('message').innerText = 'ข้อมูลบัญชีธนาคารถูกบันทึกเรียบร้อยแล้ว!';
});

window.onload = function() {
    const bankAccountData = JSON.parse(localStorage.getItem('bankAccount'));

    if (bankAccountData) {
        document.getElementById('bank-name').value = bankAccountData.bankName;
        document.getElementById('account-number').value = bankAccountData.accountNumber;
        document.getElementById('account-name').value = bankAccountData.accountName;
    }
};
