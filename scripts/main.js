// Obtém o ano atual e insere no elemento com o ID "currentYear"
$("#currentYear").text(new Date().getFullYear());

function runToast() {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#myToast"));
  toastBootstrap.show();
}
