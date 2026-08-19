import Swal from "sweetalert2";

// Swift, non-blocking SweetAlert2 Toast positioned at the top-right corner
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  customClass: {
    popup: "rounded-2xl shadow-xl border border-slate-100 font-sans text-xs font-bold",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

/**
 * Displays a swift corner toast notification.
 */
export function showToast(
  message: string,
  icon: "success" | "error" | "warning" | "info" = "success",
  timer = 1500
) {
  Toast.fire({
    icon,
    title: message,
    timer,
  });
}

/**
 * Smoothly scrolls the window to the starting top of the page.
 */
export function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Displays a styled SweetAlert confirmation modal dialog.
 */
export async function showConfirmDialog(
  title: string,
  text: string,
  confirmButtonText = "Yes, proceed"
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#059669", // emerald-600
    cancelButtonColor: "#64748b", // slate-500
    confirmButtonText,
    cancelButtonText: "Cancel",
    customClass: {
      popup: "rounded-3xl border border-slate-200 shadow-2xl font-sans text-xs",
      confirmButton: "px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md",
      cancelButton: "px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs border border-slate-300",
    },
    buttonsStyling: false,
  });
  return result.isConfirmed;
}

/**
 * Displays a styled SweetAlert modal alert dialog.
 */
export async function showAlertModal(
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info" = "info"
) {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#059669",
    customClass: {
      popup: "rounded-3xl border border-slate-200 shadow-2xl font-sans text-xs",
      confirmButton: "px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md",
    },
    buttonsStyling: false,
  });
}
