import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { IModalElement } from "../types/modal.types";

interface ModalProps {
  children: React.ReactNode;
  text: string;
}

const Modal = forwardRef<IModalElement, ModalProps>(function Modal(
  { children, text },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    },
  }));

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-6 rounded-md shadow-md"
    >
      {text}
      <div className="mt-8 text-right">{children}</div>
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
});

export default Modal;
