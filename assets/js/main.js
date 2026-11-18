document.getElementById("anoAtual").textContent = new Date().getFullYear();


const shareButton = document.getElementById("shareButton");
const shareStatus = document.getElementById("shareStatus");

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "Conheça meu portfólio, projetos e soluções digitais.",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      shareStatus.textContent = "Link copiado para compartilhar.";
    } else {
      shareStatus.textContent = "Seu navegador não oferece compartilhamento neste dispositivo.";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      shareStatus.textContent = "Não foi possível compartilhar o link.";
    }
  }
});

if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((error) => {
      console.error("Falha ao registrar o service worker:", error);
    });
  });
}
