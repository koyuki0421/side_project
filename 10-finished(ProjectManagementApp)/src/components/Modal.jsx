import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button.jsx';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      // backdrop表背景濾鏡、/90：透明度為 90%
    >
      {children}
      <form method="dialog" className="mt-4 text-right">  {/* 關掉的form */}
        <Button>{buttonCaption}</Button>
        {/* 不單單寫close(硬編碼)，是因為用{buttonCaption}更有靈活性 */}
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default Modal;
