// Obtém o ano atual e insere no elemento com o ID "currentYear"
$("#current-year").text(new Date().getFullYear());

const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#falone-navbar",
});

// News Toast
function runToast() {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#my-toast"));
  toastBootstrap.show();
}
