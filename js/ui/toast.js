const toast = document.getElementById("toast");

export function toastMessage(message, time = 3000) {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, time);
}