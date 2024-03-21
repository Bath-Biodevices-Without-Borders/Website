import React, { useState } from 'react';

interface ImageErrorBoundaryProps {
    fallbackImage: string;
    image: string;
}

const ImageErrorBoundary: React.FC<ImageErrorBoundaryProps> = ({
    fallbackImage,
    image
}) => {
    const [hasError, setHasError] = useState(false);

    const handleImageError = () => {
        setHasError(true);
    };

    return (
        <>
            {hasError ? (
                <img
                    src={fallbackImage}
                    alt=""
                />
            ) : (
                <img
                    src={image}
                    onError={handleImageError}
                    alt=""
                />
            )}
        </>
    );
};

export default ImageErrorBoundary;