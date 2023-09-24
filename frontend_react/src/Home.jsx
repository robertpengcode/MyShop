import styles from "./styles";
import {useState} from 'react';
import { useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import MyShopContract from './contracts/MyShop.json';

const myShopContract = {
    address: '0xC7c95673a55142E9D97D119529d2Ba983dE9B062',
    abi: MyShopContract.abi,
  }

export default function Home() {
    const  [productId, setProductId] =  useState('');
    const  [quentity, setQuentity] =  useState('');
    const  [price, setPrice] =  useState('');

    const  handleProductId = (event) => {
		setProductId(event.target.value);
	};
	const  handleQuentity = (event) => {
		setQuentity(event.target.value);
	};
    const  handlePrice = (event) => {
		setPrice(event.target.value);
	};

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0xC7c95673a55142E9D97D119529d2Ba983dE9B062',
        abi: MyShopContract.abi,
        functionName: 'sellInventory',
    })  
    return (
    <div className={styles.pageContainer}>
        <form>
	        <label>Product Id:
	            <input  type="text"  value={productId} onChange={handleProductId} />
	        </label>
            <label>Quentity:
	            <input  type="text"  value={quentity} onChange={handleQuentity} />
	        </label>
            <label>Price:
	            <input  type="text"  value={price} onChange={handlePrice} />
	        </label>
        </form>
        <button onClick={() => write()}>Sell Inventory</button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>)
}