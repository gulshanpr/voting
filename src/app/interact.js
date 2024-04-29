require('dotenv').config();
import { useEffect } from 'react';
import contractABI from './../../contractABI.json';
const ethers = require('ethers');

export default function Interact(props) {
    let {
        AamAadmiParty,
        BahujanSamajParty,
        BharatiyaJanataParty,
        CommunistParty,
        IndianNationalCongress,
        NationalPeoplesParty,
        AAPclick,
        BSPclick,
        BJPclick,
        CPclick,
        INCclick,
        NPPclick
    } = props;

    if(AAPclick % 6 == 0 && AAPclick != 0){
        voteParty(0, AamAadmiParty);
    }
    if(BSPclick % 6 == 0 && BSPclick != 0){
        voteParty(1, BahujanSamajParty);
    }
    if(BJPclick % 6 == 0 && BJPclick != 0){
        voteParty(2, BharatiyaJanataParty);
    }
    if(CPclick % 6 == 0 && CPclick != 0){
        voteParty(3, CommunistParty);
    }
    if(INCclick % 6 == 0 && INCclick != 0){
        voteParty(4, IndianNationalCongress);
    }
    if(NPPclick % 6 == 0 && NPPclick != 0){
        voteParty(5, NationalPeoplesParty);
    }


    useEffect(() => {
    },[]);


    function voteParty(partyIndex, totalVotes){
        const network = "sepolia";
        const apiurl = process.env.NEXT_PUBLIC_INFURA_API_URL;
        const provider = new ethers.JsonRpcProvider(apiurl);
        const address = '0xCC2b0540A3d30c124a83eBc716056363e4cbae6D';
        const privatekey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
        const wallet = new ethers.Wallet(privatekey,provider);
        const contract = new ethers.Contract(address,contractABI,wallet);

        contract.vote(partyIndex, totalVotes).then((tx) => {
            console.log(tx.hash);
        }).catch((err) => {
            console.log(err);
        });

    }

    return(
        <div>
           <h2>hiii</h2>
        </div>
    );
}