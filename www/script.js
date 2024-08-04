document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    function showTermsOfUse(termsText) {
        navigator.notification.confirm(
            termsText,
            function (buttonIndex) {
                if (buttonIndex === 1) { // "OK" button
                    localStorage.setItem('TermsAccepted', 'yes');
                    // Allow user to access the app
                    startApp();
                } else {
                    // Exit the app or prevent further use
                    navigator.app.exitApp();
                }
            },
            "شروط الإستخدام",
            ["OK", "Cancel"]
        );
    }

    // بدء التطبيق
    function startApp() {
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    }

    const terms = `

** حقوق الطبع و النشر برمجيات sparux 2024© **

**الإصدار 2.2.0**

**ترخيص مجاني غير تجاري**:
   يتم تقديم هذا البرنامج (التطبيق) لك بموجب هذا الترخيص المجاني وغير التجاري وفقًا للشروط التالية:

1. **الاستخدام غير التجاري**:
   - هذا التطبيق مُقدم للاستخدام الشخصي وغير التجاري فقط. لا يُسمح باستخدامه لأغراض تجارية أو ربحية.

2. **عدم جمع البيانات**:
   - لا يقوم هذا التطبيق بجمع أي بيانات شخصية أو عامة من المستخدمين. يتم احترام خصوصية المستخدمين بالكامل.

3. **حقوق الاستخدام والتطوير**:
   - يُسمح لكل مطور باستخدام هذا الإصدار 2.2.0 كأساس لتطوير نسخ أكثر تطورًا وتحسينات. يجب أن يتم توضيح التعديلات والإصدارات الجديدة بإذن من المطور الأصلي. يُطلب من المطورين تقديم الشكر والاعتراف بالإصدار الأصلي عند نشر النسخ المحسنة.

4. **التوزيع**:
   - يُسمح بنسخ وتوزيع هذا التطبيق في شكله الأصلي أو بعد التعديلات وفقًا للشروط المذكورة أعلاه. يجب أن يتضمن أي توزيع إشعار حقوق الطبع والنشر وإشعار الترخيص.

5. **إخلاء المسؤولية**:
   - يتم تقديم هذا التطبيق "كما هو" دون أي ضمانات صريحة أو ضمنية. لا يتحمل المطور الأصلي أي مسؤولية عن أي أضرار ناتجة عن استخدام التطبيق.

**للاستفسارات، يرجى الاتصال بـ: sparux19@gmail.com **
`

    // التحقق مما إذا كان المستخدم قد وافق بالفعل على الشروط
    function checkTermsAcceptance() {
        const termsAccepted = localStorage.getItem('TermsAccepted');
        if (termsAccepted === 'yes') {
            startApp();
        } else {
            showTermsOfUse(terms)
        }
    }

    // التحقق من الموافقة على الشروط عند بدء التطبيق
    checkTermsAcceptance();


    cordova.plugins.notification.local.on('click', function (notification) {
        alert('Notification clicked: ' + notification.id);
    });

    // جدولة إشعار محلي
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: 'welcome',
        text: '',
        trigger: { at: new Date(new Date().getTime() + 5 * 1000) }, // سيتم عرضه بعد 5 ثوانٍ
        foreground: true
    });
}

