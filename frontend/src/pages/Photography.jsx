import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import '../css/Photography.css'


function Photography() {
    /* Decided against using useEffect/async functions to automate the width/height finding process.

       Having to create a useEffect hook for every single array would be way more time consuming
       than just entering in the dimensions manually 

       The way I structured the gallery was a little weird to begin with, because there was a certain style that I wanted to achieve.
       I mapped out an individual array for each column because:
       
       1. I wanted varying sizes in the gallery dimensions
       2. I would not be able to 'map' it to my liking if I had put everything in one array - everything would have to have been the same size
         - Two seperate divs allowed me to use css grids and grid-template-columns to distribute the space each column took up
         - I wanted every color-themed gallery to have their own space distribution (eg. dark gallery has 35/65, orange has 60/40)
       3. The gallery itself is not that big, so individual arrays for each column did not seem like a bad idea
    */

    const smallDarkImg = [
        {
            thumb: '/gallery/img1.webp',
            full:'/gallery/img1.PNG',
            width: "2060",
            height: "3840"
        },
        {
            thumb: '/gallery/img3.webp',
            full: '/gallery/img3.JPG',
            width: "3926",
            height: "5889"
        },
        {
            thumb: '/gallery/img5.webp',
            full: '/gallery/img5.JPG',
            width: "2185",
            height: "2913"
        }
    ]

    const bigDarkImg = [
        {
            thumb: '/gallery/img2.webp',
            full:'/gallery/img2.JPG',
            width: "3926",
            height: "5889"

        },
        {
            thumb: '/gallery/img4.webp',
            full: '/gallery/img4.JPG',
            width: "3351",
            height: "5957"
        }
    ]

    const smallOrangeImg = [
       {
            thumb: '/gallery/img8.webp',
            full:'/gallery/img8.JPG',
            width: "1706",
            height: "2559"

        },
        {
            thumb: '/gallery/img9.webp',
            full: '/gallery/img9.JPG',
            width: "3901",
            height: "5852"
        }
    ]

    const smallGreenImg = [
        {
            thumb: '/gallery/img10.webp',
            full:'/gallery/img10.JPG',
            width: "3138",
            height: "4707"

        },
        {
            thumb: '/gallery/img12.webp',
            full: '/gallery/img12.JPG',
            width: "1767",
            height: "2651"
        },
        {
            thumb: '/gallery/img14.webp',
            full: '/gallery/img14.JPG',
            width: "3777",
            height: "5666"
        }
    ]

    const largeGreenImg = [
        {
            thumb: '/gallery/img11.webp',
            full:'/gallery/img11.JPG',
            width: "1706",
            height: "2559"

        },
        {
            thumb: '/gallery/img13.webp',
            full: '/gallery/img13.JPG',
            width: "3901",
            height: "5852"
        }
    ]

    const options = {
        arrowPrev: false,
        arrowNext: false,
        counter: false,
        zoom: false,
        bgOpacity: 0.75,
    }

    return (<>
    <Gallery options={options}>
        <div className="photography-container">
            <div className="dark-gallery fade-from-top">
                <div className="column small-dark" 
                style={{ gridTemplateRows: `repeat(${smallDarkImg.length}, 1fr)` }}>
                    {smallDarkImg.map((img, i) => (
                        <Item key = {i} original={img.full} thumbnail={img.thumb} width={img.width} height={img.height}>
                            {({ref, open}) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    src={img.thumb}
                                    className="gallery-item"
                                />
                            )}
                        </Item>    
                    ))}
                </div>

                <div className="column big-dark" 
                style={{ gridTemplateRows: `repeat(${bigDarkImg.length}, 1fr)` }}>
                    {bigDarkImg.map((img, i) => (
                        <Item key = {i} original={img.full} thumbnail={img.thumb} width={img.width} height={img.height}>
                            {({ref, open}) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    src={img.thumb}
                                    className="gallery-item"
                                />
                            )}
                        </Item>  
                    ))}
                </div>

                <Item original='/gallery/img6.JPG' thumbnail='/gallery/img6.webp' width="4079" height="6118">
                    {({ref, open}) => (
                        <img
                            ref={ref}
                            onClick={open}
                            src='/gallery/img6.webp'
                            className="large-span gallery-item"
                        />
                    )}
                </Item>
            </div>

            <div className="orange-gallery">
                <div className="column big-orange">
                    <Item original='/gallery/img7.JPG' thumbnail='/gallery/img7.webp' width="3723" height="5585">
                    {({ref, open}) => (
                        <img
                            ref={ref}
                            onClick={open}
                            src='/gallery/img7.webp'
                            className="gallery-item"
                        />
                    )}
                    </Item>
                </div>

                <div className="column small-orange" 
                style={{ gridTemplateRows: `repeat(${smallOrangeImg.length}, 1fr)` }}>
                    {smallOrangeImg.map((img, i) => (
                        <Item key = {i} original={img.full} thumbnail={img.thumb} width={img.width} height={img.height}>
                            {({ref, open}) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    src={img.thumb}
                                    className="gallery-item"
                                />
                            )}
                        </Item> 
                    ))}
                </div>
            </div>

            <div className="green-gallery">
                <div className="column small-green"
                style={{ gridTemplateRows: `repeat(${smallGreenImg.length}, 1fr)` }}>
                    {smallGreenImg.map((img, i) => (
                        <Item key = {i} original={img.full} thumbnail={img.thumb} width={img.width} height={img.height}>
                            {({ref, open}) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    src={img.thumb}
                                    className="gallery-item"
                                />
                            )}
                        </Item>   
                    ))}
                </div>

                <div className="column large-green"
                style={{ gridTemplateRows: `repeat(${largeGreenImg.length}, 1fr)` }}>
                    {largeGreenImg.map((img, i) => (
                        <Item key = {i} original={img.full} thumbnail={img.thumb} width={img.width} height={img.height}>
                            {({ref, open}) => (
                                <img
                                    ref={ref}
                                    onClick={open}
                                    src={img.thumb}
                                    className="gallery-item"
                                />
                            )}
                        </Item> 
                    ))}

                </div>
            </div>
        </div>
    </Gallery>
    </>)
}

export default Photography