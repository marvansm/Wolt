import { t, type Dictionary } from "intlayer";

const authContent = {
  key: "auth",
  content: {
    titles: {
      confirmEmail: t({
        en: "Confirm your email",
        tr: "E-postanızı onaylayın",
      }),
      resetPassword: t({
        en: "Reset your password",
        tr: "Şifrenizi sıfırlayın",
      }),
      loginWolt: t({
        en: "Log in to Wolt",
        tr: "Wolt'a giriş yapın",
      }),
      enterPassword: t({
        en: "Enter password",
        tr: "Şifrenizi girin",
      }),
      createAccount: t({
        en: "Create a Wolt account",
        tr: "Bir Wolt hesabı oluşturun",
      }),
      completeProfile: t({
        en: "Complete your profile",
        tr: "Profilinizi tamamlayın",
      }),
    },
    buttons: {
      login: t({
        en: "Log in",
        tr: "Giriş yap",
      }),
      forgotPassword: t({
        en: "Forgot password?",
        tr: "Şifrenizi mi unuttunuz?",
      }),
      backToEmail: t({
        en: "Back to email",
        tr: "E-postaya dön",
      }),
      resetPassword: t({
        en: "Reset password",
        tr: "Şifreyi sıfırla",
      }),
      backToLogin: t({
        en: "Back to login",
        tr: "Girişe dön",
      }),
      createAccount: t({
        en: "Create account",
        tr: "Hesap oluştur",
      }),
      back: t({
        en: "Back",
        tr: "Geri",
      }),
      verifyContinue: t({
        en: "Verify and continue",
        tr: "Doğrula ve devam et",
      }),
      resendCode: t({
        en: "Resend code",
        tr: "Kodu tekrar gönder",
      }),
      resendIn: t({
        en: "Resend in",
        tr: "Tekrar gönder:",
      }),
      save: t({
        en: "Save",
        tr: "Kaydet",
      }),
      cancel: t({
        en: "Cancel",
        tr: "İptal",
      }),
      next: t({
        en: "Next",
        tr: "Sonraki",
      }),
    },
    social: {
      google: t({
        en: "Continue with Google",
        tr: "Google ile devam et",
      }),
      github: t({
        en: "Continue with GitHub",
        tr: "GitHub ile devam et",
      }),
      connectingGoogle: t({
        en: "Connecting to Google...",
        tr: "Google'a bağlanılıyor...",
      }),
      connectingGithub: t({
        en: "Connecting to GitHub...",
        tr: "GitHub'a bağlanılıyor...",
      }),
      orEmail: t({
        en: "or continue with email",
        tr: "veya e-posta ile devam et",
      }),
    },
    labels: {
      email: t({
        en: "Email",
        tr: "E-posta",
      }),
      enterEmail: t({
        en: "Enter your email",
        tr: "E-postanızı girin",
      }),
      password: t({
        en: "Password",
        tr: "Şifre",
      }),
      enterPassword: t({
        en: "Enter your password",
        tr: "Şifrenizi girin",
      }),
      firstName: t({
        en: "First name",
        tr: "Ad",
      }),
      lastName: t({
        en: "Last name",
        tr: "Soyad",
      }),
      createPassword: t({
        en: "Create a password",
        tr: "Bir şifre oluşturun",
      }),
      prefix: t({
        en: "Prefix",
        tr: "Ön numara",
      }),
      phoneNumber: t({
        en: "Phone number",
        tr: "Telefon numarası",
      }),
      verificationCode: t({
        en: "Verification code",
        tr: "Doğrulama kodu",
      }),
      resetCode: t({
        en: "Reset code",
        tr: "Sıfırlama kodu",
      }),
      newPassword: t({
        en: "New password",
        tr: "Yeni şifre",
      }),
    },
    validation: {
      invalidEmail: t({
        en: "Invalid email format",
        tr: "Geçersiz e-posta formatı",
      }),
      emailRequired: t({
        en: "Email is required",
        tr: "E-posta gereklidir",
      }),
      passwordRequired: t({
        en: "Password is required",
        tr: "Şifre gereklidir",
      }),
      minChar: t({
        en: "At least {count} characters",
        tr: "En az {count} karakter",
      }),
      firstNameRequired: t({
        en: "First name is required",
        tr: "Ad gereklidir",
      }),
      lastNameRequired: t({
        en: "Last name is required",
        tr: "Soyad gereklidir",
      }),
      phoneRequired: t({
        en: "Phone number is required",
        tr: "Telefon numarası gereklidir",
      }),
      invalidPhone: t({
        en: "Invalid phone number",
        tr: "Geçersiz telefon numarası",
      }),
      enter6Digit: t({
        en: "Please enter the 6-digit code",
        tr: "Lütfen 6 haneli kodu girin",
      }),
      passwordMin6: t({
        en: "Password must be at least 6 characters",
        tr: "Şifre en az 6 karakter olmalıdır",
      }),
    },
    messages: {
      sentCodeTo: t({
        en: "We've sent a 6-digit verification code to",
        tr: "Şu adrese 6 haneli bir doğrulama kodu gönderdik:",
      }),
      sentResetCodeTo: t({
        en: "We've sent a reset code to",
        tr: "Şu adrese bir sıfırlama kodu gönderdik:",
      }),
      didntReceive: t({
        en: "Didn't receive a code?",
        tr: "Kod gelmedi mi?",
      }),
      agreeTo: t({
        en: "I agree to the",
        tr: "Şunları kabul ediyorum:",
      }),
      userTerms: t({
        en: "User Terms",
        tr: "Kullanım Koşulları",
      }),
      privacyStatement: t({
        en: "Privacy Statement",
        tr: "Gizlilik Bildirimi",
      }),
      processedData: t({
        en: "Please visit Wolt Privacy Statement to learn about personal data processing.",
        tr: "Kişisel verilerin işlenmesi hakkında bilgi edinmek için lütfen Wolt Gizlilik Bildirimi'ni ziyaret edin.",
      }),
      passwordUpdated: t({
        en: "Password successfully updated. Please login.",
        tr: "Şifre başarıyla güncellendi. Lütfen giriş yapın.",
      }),
      emailExists: t({
        en: "An account with this email already exists",
        tr: "Bu e-posta adresiyle bir hesap zaten mevcut",
      }),
      userNotFound: t({
        en: "This email is not registered",
        tr: "Bu e-posta adresi kayıtlı değil",
      }),
      incorrectPassword: t({
        en: "The password you entered is incorrect",
        tr: "Girdiğiniz şifre yanlış",
      }),
      incorrectCode: t({
        en: "The code you entered is incorrect. Please try again.",
        tr: "Girdiğiniz kod yanlış. Lütfen tekrar deneyin.",
      }),
      generalError: t({
        en: "Something went wrong. Please try again later.",
        tr: "Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.",
      }),
    },
  },
} satisfies Dictionary;

export default authContent;
