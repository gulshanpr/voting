'use client'
require('dotenv').config();
import Image from "next/image";
import contractABI from './../../contractABI.json';
import Interact from "./interact";
import { useEffect, useState } from "react";
const ethers = require('ethers');


export default function Home() {
  const [AamAadmiParty, setVoteAAP] = useState(0);
  const [BahujanSamajParty, setVoteBSP] = useState(0);
  const [BharatiyaJanataParty, setVoteBJP] = useState(0);
  const [CommunistParty, setVoteCP] = useState(0);
  const [IndianNationalCongress, setVoteINC] = useState(0);
  const [NationalPeoplesParty, setVoteNPP] = useState(0);

  const [intmedAAP, setIntMedAAP] = useState(0);
  const [intmedBSP, setIntMedBSP] = useState(0);
  const [intmedBJP, setIntMedBJP] = useState(0);
  const [intmedCP, setIntMedCP] = useState(0);
  const [intmedINC, setIntMedINC] = useState(0);
  const [intmedNPP, setIntMedNPP] = useState(0);


  const valueToUpdateForAAP = AamAadmiParty > intmedAAP ? AamAadmiParty - intmedAAP : intmedAAP - AamAadmiParty;
  const valueToUpdateForBSP = BahujanSamajParty > intmedBSP ? BahujanSamajParty - intmedBSP : intmedBSP - BahujanSamajParty;
  const valueToUpdateForBJP = BharatiyaJanataParty > intmedBJP ? BharatiyaJanataParty - intmedBJP : intmedBJP - BharatiyaJanataParty;
  const valueToUpdateForCP = CommunistParty > intmedCP ? CommunistParty - intmedCP : intmedCP - CommunistParty;
  const valueToUpdateForINC = IndianNationalCongress > intmedINC ? IndianNationalCongress - intmedINC : intmedINC - IndianNationalCongress;
  const valueToUpdateForNPP = NationalPeoplesParty > intmedNPP ? NationalPeoplesParty - intmedNPP : intmedNPP - NationalPeoplesParty;


  function votingIncrease(partyIndex, increase){
    if(partyIndex == 0){
      setVoteAAP(increase);
      const audio = new Audio('/audio/AAP.mp3');
      audio.play();
    }
    if(partyIndex == 1){
      setVoteBSP(increase);
      const audio = new Audio('/audio/BSP.mp3');
      audio.play();
    }
    if(partyIndex == 2){
      setVoteBJP(increase);
      const audio = new Audio('/audio/BJP.mp3');
      audio.play();
    }
    if(partyIndex == 3){
      setVoteCP(increase);
      const audio = new Audio('/audio/CP.mp3');
      audio.play();
    }
    if(partyIndex == 4){
      setVoteINC(increase);
      const audio = new Audio('/audio/INC.mp3');
      audio.play();
    }
    if(partyIndex == 5){
      setVoteNPP(increase);
      const audio = new Audio('/audio/NPP.mp3');
      audio.play();
    }
  }
  useEffect(() => {
    setTimeout(() => {
      getYourPartysVote(0);
      getYourPartysVote(1);
      getYourPartysVote(2);
      getYourPartysVote(3);
      getYourPartysVote(4);
      getYourPartysVote(5);
    }, 1000)
  },[]);

  function getYourPartysVote(partyIndex){
    const network = "sepolia";
    const apiurl = process.env.NEXT_PUBLIC_INFURA_API_URL;
    const provider = new ethers.JsonRpcProvider(apiurl);
    const address = '0xCC2b0540A3d30c124a83eBc716056363e4cbae6D';
    const privatekey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privatekey,provider);
    const contract = new ethers.Contract(address,contractABI,wallet);

    contract.totalVotesToYourParty(partyIndex).then((res) => {
        if(partyIndex == 0){
          setVoteAAP(parseInt(res));
          setIntMedAAP(parseInt(res));
        }
        if(partyIndex == 1){
          setVoteBSP(parseInt(res));
          setIntMedBSP(parseInt(res));
        }
        if(partyIndex == 2){
          setVoteBJP(parseInt(res));
          setIntMedBJP(parseInt(res));
        }
        if(partyIndex == 3){
          setVoteCP(parseInt(res));
          setIntMedCP(parseInt(res));
        }
        if(partyIndex == 4){
          setVoteINC(parseInt(res));
          setIntMedINC(parseInt(res));
        }
        if(partyIndex == 5){
          setVoteNPP(parseInt(res));        
          setIntMedNPP(parseInt(res));
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  return (
    <div className="my-16">
      <div className="flex justify-center">
        <div className="flex flex-col ml-2">
          <Image className="mb-4" src="/images/AAP.png"  width={80} height={80}/>
          <Image className="my-4" src="/images/BSP.png" width={80} height={80}/>
          <Image className="my-4" src="/images/BJP.png" width={80} height={80}/>
          <Image className="my-4" src="/images/CP.png" width={80} height={80}/>
          <Image className="my-4" src="/images/INC.png" width={80} height={80}/>
          <Image className="mt-4" src="/images/NPP.png" width={80} height={80}/>
        </div>

        <div className=" ml-4">
          <h2 className="text-lg font-custom -mt-2">Aam Aadmi Party: {AamAadmiParty}</h2>
          <button className="bg-red-500 rounded-lg text-sm px-3 py-2 text-center text-white mb-1" onClick={() => {votingIncrease(0, AamAadmiParty + 1)}}>Vote</button>

          <h2 className="text-lg font-custom mt-12">Bahujan Samaj Party: {BahujanSamajParty}</h2>
          <button className="bg-red-500 rounded-lg text-sm px-3 py-2 text-center text-white" onClick={() => {votingIncrease(1, BahujanSamajParty + 1)}}>Vote</button>

          <h2 className="text-lg font-custom mt-12">Bharatiya Janata Party: {BharatiyaJanataParty}</h2>
          <button className="bg-red-500 rounded-lg text-sm px-3 py-2 text-center text-white mb-1" onClick={() => {votingIncrease(2, BharatiyaJanataParty + 1)}}>Vote</button>

          <h2 className="text-lg font-custom mt-11">Communist Party: {CommunistParty}</h2>
          <button className="bg-red-500 rounded-lg text-sm px-3 py-2 text-center text-white" onClick={() => {votingIncrease(3, CommunistParty + 1)}}>Vote</button>

          <h2 className="text-lg font-custom mt-16">Indian National Congress: {IndianNationalCongress}</h2>
          <button className="bg-red-500 rounded-lg text-sm px-3 py-2 text-center text-white" onClick={() => {votingIncrease(4, IndianNationalCongress + 1)}}>Vote</button>

          <h2 className="text-lg font-custom mt-12">National Peoples Party: {NationalPeoplesParty}</h2>
          <button className="bg-red-500 rounded-lg text-sm px-3 py-2 text-center text-white" onClick={() => {votingIncrease(5, NationalPeoplesParty + 1)}}>Vote</button>
        </div>
      </div>

      <Interact 
        AamAadmiParty={AamAadmiParty}
        BahujanSamajParty={BahujanSamajParty}
        BharatiyaJanataParty={BharatiyaJanataParty}
        CommunistParty={CommunistParty}
        IndianNationalCongress={IndianNationalCongress}
        NationalPeoplesParty={NationalPeoplesParty}
        AAPclick={valueToUpdateForAAP}
        BSPclick={valueToUpdateForBSP}
        BJPclick={valueToUpdateForBJP}
        CPclick={valueToUpdateForCP}
        INCclick={valueToUpdateForINC}
        NPPclick={valueToUpdateForNPP}
      />
    </div>
  );
}
