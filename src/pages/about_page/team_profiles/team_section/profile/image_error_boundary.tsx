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
        console.error(`Failed to load image: ${image}`);
        setHasError(true);
    };

    return (
        <img
            src={hasError ? fallbackImage : image}
            onError={handleImageError}
            alt=""
        />
    );
};

export default ImageErrorBoundary;