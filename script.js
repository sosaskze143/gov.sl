// تهيئة jsPDF
const { jsPDF } = window.jspdf;

// إنشاء رقم تعريف تلقائي غير مكرر
function generateUniqueId() {
    return Math.floor(100000 + Math.random() * 900000); // رقم عشوائي مكون من 6 أرقام
}

// إنشاء تواريخ تلقائية
function generateDates() {
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(issueDate.getFullYear() + 1); // تاريخ الانتهاء بعد سنة من تاريخ الإصدار

    return {
        issueDate: issueDate.toLocaleDateString('ar-SA'), // تنسيق التاريخ بالعربية
        expiryDate: expiryDate.toLocaleDateString('ar-SA'),
    };
}

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

    // إنشاء رقم تعريف وتواريخ تلقائية
    const uniqueId = generateUniqueId();
    const { issueDate, expiryDate } = generateDates();

    // عرض البطاقة
    document.getElementById('preview-name').textContent = cardName;
    document.getElementById('unique-id').textContent = uniqueId;
    document.getElementById('issue-date').textContent = issueDate;
    document.getElementById('expiry-date').textContent = expiryDate;
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
    const cardElement = document.querySelector('.card');
    html2canvas(cardElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10, 180, 100);
        doc.save('card.pdf');
    });
});
