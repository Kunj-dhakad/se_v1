import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from 'pexels';
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import useEditorStore from '@/app/Store/editorStore';
const client = createClient('563492ad6f91700001000001058a23d1f89841b9ae8060ffd2b5abca');

interface PexelPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    src: {
        original: string;
        large: string;
        medium?: string;
        small?: string;
        [key: string]: string | undefined;
    };
    alt?: string | null;
}

const PexelImage: React.FC = () => {
    const [images, setImages] = useState<PexelPhoto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [orientation, setOrientation] = useState<string>('landscape');
    const [imagecolor, setImagecolor] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);
    const addElement = useEditorStore((s) => s.addElement);

    const addImage = (src: string) => {
        addElement({
            type: "image",
            src: src,

            // Transform
            x: 80,
            y: 120,
            width: 300,
            height: 200,
            rotation: 0,
            opacity: 1,
            zIndex: 1,

            // Border
            stroke: "",
            strokeWidth: 0,
            borderRadius: "0",

            // Shadow
            offsetX: 0,
            offsetY: 0,
            blur: 0,
            color: "rgba(0,0,0,0)",

            // Extra Image Properties
            fit: "cover",
            maxWidth: 300,
            maxHeight: 200,
            objectFit: "cover",

            contrast: 100,
            hueRotate: 0,
            saturate: 100,

            grayscale: 0,
            sepia: 0,
            brightness: 100,

            transform: "none",

            isDragging: false,
            animationType: "None",

            animation: {
                in: {
                    type: "None",
                    duration: 0,
                    slideDistanceX: 0,
                    slideDistanceY: 0,
                    degrees: 0,
                },
                out: {
                    type: "None",
                    duration: 0,
                    slideDistanceX: 0,
                    slideDistanceY: 0,
                    degrees: 0,
                }
            }
        });

    }



    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const response = await client.photos.search({
                    query: searchTerm || 'Nature',
                    per_page: 20,
                    orientation: orientation || '',
                    color: imagecolor || '',
                    page: page || 1,
                });
                if ('photos' in response) {
                    setImages(response.photos);
                } else {
                    console.error('Error fetching images:', response);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [searchTerm, orientation, imagecolor, page]);


    return (

        <div className="kd-editor-panel">


            {/* Search Input */}
            <div className="search-bar right-icon mb-4">
                <div className="search-icon">
                    <FaSearch />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full kd-form-input search"
                />
            </div>

            {/* orientation and sort image */}
            <div className='grid grid-cols-2 gap-2 mb-4'>
                <div className='w-full'>
                    <select className="kd-form-input" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                        {/* <option value="">All</option> */}
                        <option value="landscape">Landscape</option>
                        <option value="portrait">Portrait</option>
                        <option value="square">Square</option>

                    </select>
                </div>
                <div className='w-full'>
                    <select className="kd-form-input" onChange={(e) => setImagecolor(e.target.value)} >
                        <option value="">All</option>
                        <option value="red">red</option>
                        <option value="orange">orange</option>
                        <option value="yellow">yellow</option>
                        <option value="pink">pink</option>
                        <option value="violet">violet</option>
                        <option value="blue">blue</option>
                        <option value="black">black</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {loading ? (
                    <div className="col-span-2  text-center text-white">Loading images...</div>

                ) : (
                    images.map((image, index) => (
                        <div key={index} className="relative image-box-wrapper">
                            <Image
                                src={image.src.large}
                                width={image.width}
                                height={image.height}
                                alt={`Image ${index}`}
                                className="cursor-pointer"
                                onClick={() => addImage(image.src.original)}
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("application/element", "image");
                                    e.dataTransfer.setData("application/image-src", image.src.original);
                                }}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-wrapper flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button
                        className="kd-pagination-btn disabled:opacity-50 w-32px p-0"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        <FaArrowLeft style={{ minWidth: "fit-content" }} />
                    </button>

                    <button
                        className="kd-pagination-btn"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                        <FaArrowRight />
                    </button>
                </div>
                <span className="page-count-text theme-small-text">Page {page}</span>
            </div>


        </div>
    );
};

export default PexelImage;


