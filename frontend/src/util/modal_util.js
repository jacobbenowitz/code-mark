export function toggleSuccessModal() {
  const successModal = document.getElementById('success-modal');
  successModal.className = "success-in modal-on";
  setTimeout(() => successModal.className = "success-out", 4000)
  setTimeout(() => successModal.className = "modal-off", 5000)
}