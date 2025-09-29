const apiKey = "9c5d033a69ed1350c208349a"; // Siz bergan API kalit
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultEl = document.getElementById("result");

// 📥 Valyutalar ro'yxatini yuklash
async function loadCurrencies() {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    const data = await res.json();

    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;

      fromSelect.appendChild(option1);
      toSelect.appendChild(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "UZS";
  } catch (error) {
    alert("Valyutalar ro'yxatini yuklab bo'lmadi.");
  }
}

// 🔄 Konvertatsiya qilish
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || isNaN(amount)) {
    resultEl.textContent = "❌ Iltimos, to'g'ri miqdor kiriting.";
    return;
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
    const data = await res.json();

    const rate = data.conversion_rates[to];

    if (!rate) {
      resultEl.textContent = "❌ Valyutani o'zgartirib bo'lmadi.";
      return;
    }

    const converted = (amount * rate).toFixed(2);
    resultEl.textContent = `✅ ${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultEl.textContent = "❌ Xatolik yuz berdi!";
  }
}

// Ilova ishga tushganda valyutalarni yuklaymiz
window.addEventListener("DOMContentLoaded", loadCurrencies);
