"use client"
import React, { useState } from 'react';
import { Connection, PublicKey, Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

type Model = {
    name: string;
    description: string;
    price: number;
    owner: PublicKey;
};

const ListModal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const wallet = useWallet();

    const
        handleList = async () => {
            if (!wallet.connected) {
                alert('Please connect your wallet first.');
                return;
            }

            

            const connection = new Connection('https://api.devnet.solana.com');
            const programId = new PublicKey('your_program_id'); // Replace with your program ID

            const transaction = new Transaction();
            transaction.add(
                new TransactionInstruction({
                    keys: [
                        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
                        { pubkey: new PublicKey('model_account_pubkey'), isSigner: false, isWritable: true },
                    ],
                    programId,
                    data: Buffer.from([name, description, price].map(Buffer.from).join('')),
                })
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            console.log('Transaction signature:', signature);
        };

    return (
        <div>
            {/* Input fields for name, description,///////////// and price */}
            <button onClick={handleList} className='bg-blue-700 rounded-lg p-2 font-bold text-white m-4'>List Model</button>
        </div>
    );
};

export default ListModal;