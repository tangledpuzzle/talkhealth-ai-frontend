import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const ImageView = ({ src, title }: { src: string, title: string }) => {
    const [open, setOpen] = useState(false);

    const handleOpenZoom = () => {
        setOpen(true);
    };

    const handleCloseZoom = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* Image Card */}
            <div className="max-w-xs cursor-zoom-in" onClick={handleOpenZoom}>
                {/* Adjust max width as needed */}
                <img src={src} alt={title} className="w-auto h-72 object-cover" />
                {/* Adjust height (h-72) and object-fit as needed */}
            </div>

            {/* Dialog (Modal) */}
            <Transition show={open} enter="transition duration-150 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <div className="flex items-center justify-center max-w-3xl max-h-full p-4 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        {/* Full Image */}
                        <img src={src} alt={title} className="max-w-full h-auto" onClick={handleCloseZoom} />
                        {/* Click on the image to close the dialog */}
                    </div>
                </div>
            </Transition>
        </React.Fragment>
    );
};

export default ImageView;