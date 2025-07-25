
function login() {
  const username = prompt("نام کاربری خود را وارد کنید:");
  const phone = prompt("شماره تلفن خود را وارد کنید:");
  const deviceId = navigator.userAgent;

  firebase.database().ref("users/" + deviceId).set({
    name: username,
    phone: phone,
    deviceId: deviceId,
    timestamp: Date.now()
  });

  firebase.database().ref("logs").push().set({
    username: username,
    deviceId: deviceId,
    action: "ورود موفق",
    timestamp: Date.now()
  });

  if (phone === "09019118585") {
    window.location.href = "admin.html";
  } else {
    // Normal user flow
    document.body.innerHTML = `
      <div class='flex flex-col justify-center items-center h-screen text-center px-6'>
        <h1 class='text-4xl mb-4 neon-text'>سلام ${username}</h1>
        <p class='text-lg text-gray-300 mb-6'>خوش اومدی! از اینجا می‌تونی نقش‌تو ببینی یا تیکت بزنی.</p>
        <button onclick="seeRole()" class='neon-btn text-lg px-6 py-3 mb-4'>دیدن نقش (۴۰,۰۰۰ تومان)</button>
        <button onclick="openTicket()" class='neon-btn text-lg px-6 py-3 bg-black border border-red-500'>ارسال تیکت</button>
      </div>
    `;
  }
}

function seeRole() {
  alert("✅ پرداخت موفق! نقش شما: مافیا 😈");
  firebase.database().ref("logs").push().set({
    username: "کاربر",
    deviceId: navigator.userAgent,
    action: "مشاهده نقش",
    timestamp: Date.now()
  });
}

function openTicket() {
  const ticketMsg = prompt("پیام خود را وارد کنید:");
  if (!ticketMsg) return;

  firebase.database().ref("tickets").push().set({
    username: "کاربر",
    deviceId: navigator.userAgent,
    message: ticketMsg,
    seen: false,
    timestamp: Date.now()
  });

  firebase.database().ref("logs").push().set({
    username: "کاربر",
    deviceId: navigator.userAgent,
    action: "ارسال تیکت",
    timestamp: Date.now()
  });

  alert("📨 تیکت شما ثبت شد!");
}
