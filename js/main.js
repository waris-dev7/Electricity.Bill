const changeThemeBtn = document.querySelector(".change-theme");
const themeIcon = document.querySelector(".change-theme i");

const passwordMessage = document.querySelector(".password-message");

let deleteCard = null;

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

changeThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  themeIcon.classList.toggle("fa-moon", !isDark);
  themeIcon.classList.toggle("fa-sun", isDark);
});

const addBillBtn = document.querySelector(".add-bill");
const addBillForm = document.querySelector(".add-bill-form");
const closeForm = document.querySelector(".close-form");
const closeForm2 = document.querySelector(".close-form-2");
const overlay = document.querySelector(".overlay");

const passwordModal = document.querySelector(".password-modal");
const passwordBox = document.querySelector(".password-box");
const billPassword = document.querySelector(".bill-password");
const confirmPassword = document.querySelector(".confirm-password");
const cancelPassword = document.querySelector(".cancel-password");
const passwordError = document.querySelector(".password-error");
const showPassword = document.querySelector(".show-password");

const correctPassword = "waris";

addBillBtn.addEventListener("click", () => {
  // Make sure this password request is for ADDING a bill
  deleteCard = null;

  passwordMessage.textContent = "Enter the password to add a new bill.";

  passwordModal.classList.remove("opacity-0", "invisible");
  passwordModal.classList.add("opacity-100", "visible");

  passwordBox.classList.remove("scale-90");
  passwordBox.classList.add("scale-100");

  billPassword.value = "";
  passwordError.classList.add("hidden");

  billPassword.focus();
});

confirmPassword.addEventListener("click", () => {
  if (billPassword.value === correctPassword) {
    // ================= DELETE BILL =================
    if (deleteCard) {
      const cards = [...cardsContainer.querySelectorAll(".card")];
      const cardIndex = cards.indexOf(deleteCard);

      if (cardIndex !== -1) {
        bills.splice(cardIndex, 1);

        localStorage.setItem("bills", JSON.stringify(bills));

        deleteCard.remove();
      }

      if (bills.length === 0) {
        noBill.classList.remove("hidden");
      } else {
        noBill.classList.add("hidden");
      }

      deleteCard = null;
    }

    // ================= ADD BILL =================
    else {
      addBillForm.classList.remove("opacity-0", "invisible", "scale-90");

      addBillForm.classList.add("opacity-100", "visible", "scale-100");

      overlay.classList.remove("opacity-0", "invisible");
      overlay.classList.add("opacity-100", "visible");
    }

    passwordModal.classList.add("opacity-0", "invisible");
    passwordModal.classList.remove("opacity-100", "visible");

    passwordBox.classList.add("scale-90");
    passwordBox.classList.remove("scale-100");

    billPassword.value = "";
    passwordError.classList.add("hidden");

    passwordMessage.textContent = "Enter the password to add a new bill.";
  } else {
    passwordError.classList.remove("hidden");
  }
});

cancelPassword.addEventListener("click", () => {
  passwordModal.classList.add("opacity-0", "invisible");
  passwordModal.classList.remove("opacity-100", "visible");

  passwordBox.classList.add("scale-90");
  passwordBox.classList.remove("scale-100");

  billPassword.value = "";
  passwordError.classList.add("hidden");

  deleteCard = null;

  passwordMessage.textContent = "Enter the password to add a new bill.";
});

showPassword.addEventListener("click", () => {
  if (billPassword.type === "password") {
    billPassword.type = "text";

    showPassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
  } else {
    billPassword.type = "password";

    showPassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

billPassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    confirmPassword.click();
  }
});

closeForm.addEventListener("click", () => {
  addBillForm.classList.add("opacity-0", "invisible", "scale-90");
  addBillForm.classList.remove("opacity-100", "visible", "scale-100");
  overlay.classList.add("opacity-0", "invisible");
  overlay.classList.remove("opacity-100", "visible");
});

closeForm2.addEventListener("click", () => {
  addBillForm.classList.add("opacity-0", "invisible", "scale-90");
  addBillForm.classList.remove("opacity-100", "visible", "scale-100");
  overlay.classList.add("opacity-0", "invisible");
  overlay.classList.remove("opacity-100", "visible");
});

const cardsContainer = document.querySelector(".cards-container");
const addCardBtn = document.querySelector(".add-card-btn");

const inputDate = document.querySelector(".input-date");
const inputMonth = document.querySelector(".input-month");
const inputAmount = document.querySelector(".input-amount");
const inputZazai = document.querySelector(".input-zazai");
const inputKaram = document.querySelector(".input-karam");
const inputMuhib = document.querySelector(".input-muhib");
const inputJawad = document.querySelector(".input-jawad");
const noBill = document.querySelector(".no-bill");

let bills = JSON.parse(localStorage.getItem("bills")) || [];

addCardBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputDate.value.trim() === "" ||
    inputMonth.value.trim() === "" ||
    inputAmount.value.trim() === "" ||
    inputZazai.value.trim() === "" ||
    inputKaram.value.trim() === "" ||
    inputMuhib.value.trim() === "" ||
    inputJawad.value.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // All Units = what user enters
  const zazaiAllUnits = Number(inputZazai.value) || 0;
  const karamAllUnits = Number(inputKaram.value) || 0;
  const muhibAllUnits = Number(inputMuhib.value) || 0;
  const jawadAllUnits = Number(inputJawad.value) || 0;

  // Get previous card
  const previousBill = bills.length > 0 ? bills[bills.length - 1] : null;

  const previousZazai = previousBill ? previousBill.zazaiAllUnits : 0;
  const previousKaram = previousBill ? previousBill.karamAllUnits : 0;
  const previousMuhib = previousBill ? previousBill.muhibAllUnits : 0;
  const previousJawad = previousBill ? previousBill.jawadAllUnits : 0;

  const zazaiUnits = Number((zazaiAllUnits - previousZazai).toFixed(2));
  const karamUnits = Number((karamAllUnits - previousKaram).toFixed(2));
  const muhibUnits = Number((muhibAllUnits - previousMuhib).toFixed(2));
  const jawadUnits = Number((jawadAllUnits - previousJawad).toFixed(2));

  const totalAmount = Number(inputAmount.value) || 0;

  const totalUnits = zazaiUnits + karamUnits + muhibUnits + jawadUnits;

  if (totalUnits === 0) {
    alert("Please enter units.");
    return;
  }

  const pricePerUnit = totalAmount / totalUnits;

  const zazaiAmount = pricePerUnit * zazaiUnits;
  const karamAmount = pricePerUnit * karamUnits;
  const muhibAmount = pricePerUnit * muhibUnits;
  const jawadAmount = pricePerUnit * jawadUnits;

  const bill = {
    date: inputDate.value,
    month: inputMonth.value,
    amount: inputAmount.value,

    zazaiAllUnits: zazaiAllUnits,
    karamAllUnits: karamAllUnits,
    muhibAllUnits: muhibAllUnits,
    jawadAllUnits: jawadAllUnits,

    zazaiUnits: zazaiUnits,
    karamUnits: karamUnits,
    muhibUnits: muhibUnits,
    jawadUnits: jawadUnits,

    zazaiAmount: zazaiAmount.toFixed(2),
    karamAmount: karamAmount.toFixed(2),
    muhibAmount: muhibAmount.toFixed(2),
    jawadAmount: jawadAmount.toFixed(2),
  };

  bills.push(bill);

  localStorage.setItem("bills", JSON.stringify(bills));
  const card = `<div
          class="card max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 shadow-xl overflow-hidden font-sans"
        >
          <div
            class="h-1.5 w-full bg-gradient-to-r from-lime-950 via-yellow-700 to-amber-200"
          ></div>
          <div class="px-6 py-6">
            <div
              class="flex justify-between items-start text-[10px] font-semibold tracking-wider text-neutral-500 uppercase"
            >
              <div>
                <p>Bill Date</p>
                <p
                  class="text-neutral-700 dark:text-neutral-200 tracking-normal text-xs font-medium mt-0.5"
                >
                  ${inputDate.value}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <p
                class="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase"
              >
                Month
              </p>
              <h2
                class="text-xl font-bold text-neutral-800 dark:text-neutral-200 leading-tight"
              >
                ${inputMonth.value}
              </h2>
            </div>

            <div
              class="mt-5 bg-[#1C1A17] dark:bg-rose-200 text-white rounded-xl px-4 py-3 flex justify-between items-center shadow-inner"
            >
              <span
                class="text-[10px] font-bold tracking-widest dark:text-black text-neutral-400 uppercase"
                >Total</span
              >
              <div class="flex items-baseline gap-1">
                <span
                  class="text-xl font-extrabold dark:text-zinc-900 tracking-tight"
                  >${inputAmount.value}</span
                >
                <span
                  class="text-[10px] font-bold text-amber-500 dark:bg-amber-950 bg-amber-500/10 px-1.5 py-0.5 rounded"
                  >Afs</span
                >
              </div>
            </div>

            <div class="mt-6 space-y-3">
              <div class="grid grid-cols-4 text-[9px] font-bold tracking-wider text-neutral-400 uppercase pb-1 border-b border-gray-100">
  <div>Homes</div>
  <div class="text-center">All Units</div>
  <div class="text-center">Units</div>
  <div class="text-right">Amount</div>
</div>

              <div
                class="grid grid-cols-4 items-center text-xs py-0.5 border-b border-dashed border-gray-200/50 last:border-0"
              >
                <div
                  class="font-medium text-neutral-700 dark:text-neutral-300 capitalize"
                >
                  Zazai
                </div>
                <div class="text-center text-neutral-400">${zazaiAllUnits}</div>
<div class="text-center text-neutral-400">${zazaiUnits}</div>
<div class="text-right font-semibold text-amber-700">${zazaiAmount.toFixed(2)}</div>
              </div>

              <div
                class="grid grid-cols-4 items-center text-xs py-0.5 border-b border-dashed border-gray-200/50 last:border-0"
              >
                <div
                  class="font-medium text-neutral-700 dark:text-neutral-300 capitalize"
                >
                  Said Karam
                </div>
                <div class="text-center text-neutral-400">${karamAllUnits}</div>
<div class="text-center text-neutral-400">${karamUnits}</div>
<div class="text-right font-semibold text-amber-700">${karamAmount.toFixed(2)}</div>
              </div>

              <div
                class="grid grid-cols-4 items-center text-xs py-0.5 border-b border-dashed border-gray-200/50 last:border-0"
              >
                <div
                  class="font-medium text-neutral-700 dark:text-neutral-300 capitalize"
                >
                  Muhibullah
                </div>
                <div class="text-center text-neutral-400">${muhibAllUnits}</div>
<div class="text-center text-neutral-400">${muhibUnits}</div>
<div class="text-right font-semibold text-amber-700">${muhibAmount.toFixed(2)}</div>
              </div>

              <div
                class="grid grid-cols-4 items-center text-xs py-0.5 last:border-0"
              >
                <div
                  class="font-medium text-neutral-700 dark:text-neutral-300 capitalize"
                >
                  Jawad
                </div>
                <div class="text-center text-neutral-400">${jawadAllUnits}</div>
<div class="text-center text-neutral-400">${jawadUnits}</div>
<div class="text-right font-semibold text-amber-700">${jawadAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6">
<button
  class="delete-card-btn group relative w-full overflow-hidden rounded-2xl border border-red-200/70 dark:border-red-900/50 bg-red-50/70 dark:bg-red-950/20 px-4 py-3 text-red-600 dark:text-red-400 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-800 transition-all duration-300"
>
  <span
    class="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
  ></span>

  <span class="relative flex items-center justify-center gap-2">
    <span
      class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/60 group-hover:bg-red-500 group-hover:text-white transition-all duration-300"
    >
      <i class="fa-solid fa-trash-can text-sm"></i>
    </span>

    <span class="font-semibold text-sm">
      Delete Bill
    </span>
  </span>
</button>
        </div>`;
  cardsContainer.insertAdjacentHTML("beforeend", card);
  noBill.classList.add("hidden");
  addBillForm.classList.add("opacity-0", "invisible", "scale-90");
  addBillForm.classList.remove("opacity-100", "visible", "scale-100");
  overlay.classList.add("opacity-0", "invisible");
  overlay.classList.remove("opacity-100", "visible");
});

bills.forEach((bill) => {
  const zazaiAmount = bill.zazaiAmount;
  const karamAmount = bill.karamAmount;
  const muhibAmount = bill.muhibAmount;
  const jawadAmount = bill.jawadAmount;

  const card = `<div 
    class="card max-w-sm bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 shadow-xl overflow-hidden font-sans"
  >
    <div class="h-1.5 w-full bg-gradient-to-r from-lime-950 via-yellow-700 to-amber-200"></div>

    <div class="px-6 py-6">

      <div class="flex justify-between items-start text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
        <div>
          <p>Bill Date</p>
          <p class="text-neutral-700 dark:text-neutral-200 tracking-normal text-xs font-medium mt-0.5">
            ${bill.date}
          </p>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
          Month
        </p>

        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
          ${bill.month}
        </h2>
      </div>

      <div class="mt-5 bg-[#1C1A17] dark:bg-rose-200 text-white rounded-xl px-4 py-3 flex justify-between items-center shadow-inner">

        <span class="text-[10px] font-bold tracking-widest dark:text-black text-neutral-400 uppercase">
          Total
        </span>

        <div class="flex items-baseline gap-1">
          <span class="text-xl font-extrabold dark:text-zinc-900 tracking-tight">
            ${bill.amount}
          </span>

          <span class="text-[10px] font-bold text-amber-500 dark:bg-amber-950 bg-amber-500/10 px-1.5 py-0.5 rounded">
            Afs
          </span>
        </div>

      </div>

      <div class="mt-6 space-y-3">

       <div class="grid grid-cols-4 text-[9px] font-bold tracking-wider text-neutral-400 uppercase pb-1 border-b border-gray-100">
  <div>Homes</div>
  <div class="text-center">All Units</div>
  <div class="text-center">Units</div>
  <div class="text-right">Amount</div>
</div>

       <!-- Zazai -->
<div class="grid grid-cols-4 items-center text-xs py-0.5 border-b border-dashed border-gray-200/50">
  <div class="font-medium text-neutral-700 dark:text-neutral-300">
    Zazai
  </div>

  <div class="text-center text-neutral-400">
    ${bill.zazaiAllUnits}
  </div>

  <div class="text-center text-neutral-400">
    ${bill.zazaiUnits}
  </div>

  <div class="text-right font-semibold text-amber-700">
    ${zazaiAmount}
  </div>
</div>

<!-- Said Karam -->
<div class="grid grid-cols-4 items-center text-xs py-0.5 border-b border-dashed border-gray-200/50">
  <div class="font-medium text-neutral-700 dark:text-neutral-300">
    Said Karam
  </div>

  <div class="text-center text-neutral-400">
    ${bill.karamAllUnits}
  </div>

  <div class="text-center text-neutral-400">
    ${bill.karamUnits}
  </div>

  <div class="text-right font-semibold text-amber-700">
    ${karamAmount}
  </div>
</div>

<!-- Muhibullah -->
<div class="grid grid-cols-4 items-center text-xs py-0.5 border-b border-dashed border-gray-200/50">
  <div class="font-medium text-neutral-700 dark:text-neutral-300">
    Muhibullah
  </div>

  <div class="text-center text-neutral-400">
    ${bill.muhibAllUnits}
  </div>

  <div class="text-center text-neutral-400">
    ${bill.muhibUnits}
  </div>

  <div class="text-right font-semibold text-amber-700">
    ${muhibAmount}
  </div>
</div>

<!-- Jawad -->
<div class="grid grid-cols-4 items-center text-xs py-0.5">
  <div class="font-medium text-neutral-700 dark:text-neutral-300">
    Jawad
  </div>

  <div class="text-center text-neutral-400">
    ${bill.jawadAllUnits}
  </div>

  <div class="text-center text-neutral-400">
    ${bill.jawadUnits}
  </div>

  <div class="text-right font-semibold text-amber-700">
    ${jawadAmount}
  </div>
</div>
      </div>

    </div>
    <div class="px-6 pb-6">
<button
  class="delete-card-btn group relative w-full overflow-hidden rounded-2xl border border-red-200/70 dark:border-red-900/50 bg-red-50/70 dark:bg-red-950/20 px-4 py-2 text-red-600 dark:text-red-400 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-800 transition-all duration-300"
>
  <span
    class="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
  ></span>

  <span class="relative flex items-center justify-center gap-2">
    <span
      class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/60 group-hover:bg-red-500 group-hover:text-white transition-all duration-300"
    >
      <i class="fa-solid fa-trash-can text-sm"></i>
    </span>

    <span class="font-semibold text-sm">
      Delete Bill
    </span>
  </span>
</button>
  </div>`;

  cardsContainer.insertAdjacentHTML("beforeend", card);
});

if (bills.length > 0) {
  noBill.classList.add("hidden");
}

const backupBtns = document.querySelectorAll(".backup-btn");

backupBtns.forEach((backupBtn) => {
  backupBtn.addEventListener("click", () => {
    const data = JSON.stringify(bills, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "electricity-bills-backup.json";

    link.click();

    URL.revokeObjectURL(url);

    mobileMenu.classList.add("hidden");
  });
});

const restoreBtns = document.querySelectorAll(".restore-btn");
const restoreFile = document.querySelector(".restore-file");

restoreBtns.forEach((restoreBtn) => {
  restoreBtn.addEventListener("click", () => {
    restoreFile.click();
    mobileMenu.classList.add("hidden");
  });
});

restoreFile.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const restoredBills = JSON.parse(e.target.result);

      if (!Array.isArray(restoredBills)) {
        alert("Invalid backup file.");
        return;
      }

      const isValidBackup = restoredBills.every((bill) => {
        return (
          bill &&
          typeof bill === "object" &&
          "date" in bill &&
          "month" in bill &&
          "amount" in bill &&
          "zazaiUnits" in bill &&
          "karamUnits" in bill &&
          "muhibUnits" in bill &&
          "jawadUnits" in bill
        );
      });

      if (!isValidBackup) {
        alert("This is not a valid electricity bills backup.");
        return;
      }

      bills = restoredBills;

      localStorage.setItem("bills", JSON.stringify(bills));

      alert("Bills restored successfully!");

      location.reload();
    } catch (error) {
      alert("This is not a valid backup file.");
    }
  };

  reader.readAsText(file);
});

// ================= DELETE BILL =================

cardsContainer.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-card-btn");

  if (!deleteBtn) return;

  deleteCard = deleteBtn.closest(".card");

  passwordMessage.textContent = "Enter the password to delete this bill.";

  passwordModal.classList.remove("opacity-0", "invisible");
  passwordModal.classList.add("opacity-100", "visible");

  passwordBox.classList.remove("scale-90");
  passwordBox.classList.add("scale-100");

  billPassword.value = "";
  passwordError.classList.add("hidden");

  billPassword.focus();
});
