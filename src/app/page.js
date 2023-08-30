'use client';
import {BsSearch} from 'react-icons/bs'
import CurrencyAPI from '@everapi/currencyapi-js';
import { useEffect,useState } from 'react';

const currencyApi = new CurrencyAPI('api_key');


export default function Home() {


  const [isloaded,Setisloaded]=useState(false);

  const [mapdata,Setmapdata]=useState([]);

  const [term,Setterm]=useState('');


  const [searchlength,Setsearchlength]=useState(0);





  useEffect(()=>{
    const getthatdata=async()=>{
      try{
        const response=await currencyApi.latest();
        const currencies=Object.keys(response.data);
        const newData = currencies.map((currency) => ({
          id: currency,
          value: response.data[currency].value,
        }));
        Setmapdata(newData);
        Setisloaded(true);
       } catch(e)
      {
        console.log(e);
      }
    }
    getthatdata();
  },[])

  const getValueOfCurrency = (currencyId) => {
    const currency = mapdata.find((item) => item.id === currencyId);
    return currency ? currency.value : 'Currency not found';
  };





const populatesearch=(value)=>{

  const searchingfor=value.toUpperCase();

  const startsWithN =mapdata.filter((currency) => currency.id.startsWith(searchingfor));

const divs=[]
for(var i=0;i<startsWithN.length;i++)
{
  divs.push(<div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
  <span className='m-auto'>{startsWithN[i].id}</span>
    <span className='m-auto'>{getValueOfCurrency(startsWithN[i].id)}</span>
  </div>)
}
if(startsWithN.length==0)
{
  divs.push(<div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
    <span>No Such Currency found in DataBase</span>
  </div>)
}
return divs;

}




  return (
    <>
    {isloaded==true  &&
    <div className='bg-gradient-to-r from-gray-700 to-black w-screen h-screen flex flex-col gap-y-4 py-2'>
      <div className='bg-green-400 w-1/4 h-40 m-auto flex flex-3'>
        <span className='m-auto font-bold text-lg text-center'>Currency Exchange Rates</span>
        </div>
        <div className='w-2/3 h-10 m-auto bg-gray-500 rounded-xl flex flex-row items-center md:w-1/3'>
        <BsSearch className='flex-1'/>
        <input className='h-full rounded-xl flex-[7_1_0%] bg-slate-500 focus:outline-0' onChange={(e)=>{Setterm(e.target.value)}} value={term}/>
        </div>
        {term==''&&
       <div className="grid grid-cols-1 gap-4  flex-auto md:grid-cols-3 md:grid-rows-2 md:px-4"> 
  <div className="p-4 flex flex-col border-y-2 border-x-2 border-x-teal-400 border-y-teal-400">
    <span className='m-auto'>Euro</span>
    <span className='m-auto'>{getValueOfCurrency('EUR')}</span>
  </div>
  <div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
  <span className='m-auto'>Japanese Yen</span>
    <span className='m-auto'>{getValueOfCurrency('JPY')}</span>
  </div>
  <div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
  <span className='m-auto'>Australian Dollar</span>
    <span className='m-auto'>{getValueOfCurrency('AUD')}</span>
  </div>
  <div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
  <span className='m-auto'>Chinese Yuan</span>
    <span className='m-auto'>{getValueOfCurrency('CNY')}</span>
  </div>
  <div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
  <span className='m-auto'>Indian Rupee</span>
    <span className='m-auto'>{getValueOfCurrency('INR')}</span>
  </div>
  <div className="border-y-2 border-x-2 border-x-teal-400 border-y-teal-400 p-4 flex flex-col">
  <span className='m-auto'>Russian Ruble</span>
    <span className='m-auto'>{getValueOfCurrency('RUB')}</span>
  </div>
</div>}
{term!=0 && <div className='grid grid-cols-1 gap-4  flex-auto md:grid-cols-3 md:px-4'>
  {populatesearch(term)}
  </div>}
    </div>}
    {isloaded==false &&
    <div className='bg-gradient-to-r from-gray-700 to-black w-screen h-screen flex flex-col gap-y-4 py-2'>
      <span className='m-auto font-bold text-lg'>Loading</span>
    </div>
    }
   
    </>
  )
}
