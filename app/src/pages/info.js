import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { popups as pp } from '../store/atoms'
import provider from '../store/web3Provider'
import '../static/css/info.scss';

export default function ProductInfo() {

    const [productInfo, setProductInfo] = useState('');
    const [sellerInfo, setSellerInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const setPopup = useSetRecoilState(pp);
    const productId = window.location.pathname.split('/')[2];
 
    useEffect(() => {

        async function fetchProductInfo() {
            try {
                const response = await provider.callTransaction('productDetails', [productId])
                setProductInfo(response);
                console.log(response);
            }
            catch (e) {
                setPopup("Failed to fetch product info")
                console.error(e);
            }
        }

        async function fetchSellerInfo() {
            try {
                const response = await provider.callTransaction('productSeller', [productId])

                setSellerInfo(response);

            }
            catch (e) {
                // setPopup("Product Already Sold")
                console.error(e);
            }
            finally {
                setLoading(false)
            }
        }
        fetchProductInfo();
        fetchSellerInfo();
    }, [])


    if (loading) {
        return <Loader />;
    }

    // Check if productInfo.name is equal to "dummyProduct"
    if (productInfo.name === 'dummyProduct') {
        return (
            <div className="container CI my-4">
                <div className="d-flex small">
                    <div className="center">
                        
                            <div className="product-details">
                                <h2>This product is fake or does not exist.</h2>
                            </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container CI my-4">
                <div className="d-flex small">
                    <div className="center">
                        <div>
                            <div className="product-details">
                                <h2>Product Info</h2>
                                <div>
                                    <p>Name : <span>{productInfo.name}</span></p>
                                    <p>Price : <span>{productInfo.price}</span></p>
                                    <p>ID : <span>{productId}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Additional code for seller info */}
                </div>
                <div className="fullWidth">
                    {/* Additional code for buttons */}
                </div>
            </div>
        );
    }

   
}
