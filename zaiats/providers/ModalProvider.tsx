"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ModalContextInterface {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextInterface | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = (newContent: ReactNode) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsClosing(false);
    setContent(newContent);
  };

  const closeModal = () => {
    if (!content) return;
    setIsClosing(true);

    timerRef.current = setTimeout(() => {
      setContent(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {content && (
        <Modal
          isClosing={isClosing}
          closeModal={closeModal}
          content={content}
        />
      )}
    </ModalContext.Provider>
  );
}

function Modal({
  isClosing,
  closeModal,
  content,
}: {
  isClosing: boolean;
  closeModal: () => void;
  content: ReactNode;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const show = !isClosing && animate;

  return (
    <div
      className={`fixed inset-0 z-99 flex items-center justify-center [transition:var(--transition)] ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={closeModal}
      />

      <div
        className={`flex items-center rounded-2xl overflow-hidden flex-col bg-(--reverse-color) relative z-10 [transition:var(--transition)]  ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-2 self-end">
          <CloseSvg closeModal={closeModal} />
        </div>
        {content}
      </div>
    </div>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

function CloseSvg({ closeModal }: { closeModal: () => void }) {
  return (
    <span className="cursor-pointer group" onClick={closeModal}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z"
          className="fill-(--main-color) transition-colors duration-150 ease-in-out group-hover:fill-(--grey-color)"
        />
      </svg>
    </span>
  );
}
