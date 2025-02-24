// تسجيل الدخول وإنشاء الحساب
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // حفظ بيانات المستخدم في localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    showCardSection();
});

document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    // حفظ بيانات المستخدم في localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    showCardSection();
});

// عرض قسم إنشاء البطاقة
function showCardSection() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('card-section').classList.remove('hidden');
}

// إنشاء البطاقة
document.getElementById('card-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const cardName = document.getElementById('card-name').value;
    const cardId = document.getElementById('card-id').value;
    const issueDate = document.getElementById('card-issue-date').value;
    const expiryDate = document.getElementById('card-expiry-date').value;

    // عرض البطاقة
    document.getElementById('preview-name').textContent = cardName;
    document.getElementById('preview-id').textContent = `رقم الهوية: ${cardId}`;
    document.getElementById('preview-issue-date').textContent = `تاريخ الإصدار: ${issueDate}`;
    document.getElementById('preview-expiry-date').textContent = `تاريخ الانتهاء: ${expiryDate}`;
    document.getElementById('card-preview').classList.remove('hidden');
});

// تحميل البطاقة كصورة
document.getElementById('download-png').addEventListener('click', function () {
    html2canvas(document.querySelector('.card')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// تحميل البطاقة كPDF
document.getElementById('download-pdf').addEventListener('click', function () {
    const element = document.querySelector('.card');
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
        pdf.save('card.pdf');
    });
});
