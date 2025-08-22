import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { X,Save } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, save }) => {
    const [visible, setVisible] = useState(isOpen); // Controls mounting
    const [show, setShow] = useState(false); // Controls animation

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setTimeout(() => setShow(true), 10); // Trigger animation after mount
            document.body.style.overflow = 'hidden';
        } else {
            setShow(false);
            document.body.style.overflow = 'auto';
            // After animation delay, unmount
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!visible) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return ReactDOM.createPortal(
        <div
            onClick={handleBackdropClick}
            className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1050,
                opacity: show ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
            }}
            aria-modal="true"
            role="dialog"
        >

            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className={`relative bg-white rounded-lg shadow-sm dark:bg-gray-700 transform transition-transform duration-300 ease-in-out ${show ? 'scale-100' : 'scale-0'
                    }`}>
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>



                    {/* <hr className='my-3' /> */}
                    {/*  Modal body */}

                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>


                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-4">

                        <button onClick={onClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-lg border border-red-100 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>

                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                            {save ? (save) : (<span className="flex items-center gap-2"> <Save size={16} /> Save </span>)}
                        </button>
                    </div>
                </div>
            </div>
        </div >,
        document.body
    );
};

export default Modal;
