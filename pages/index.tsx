import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [state,setState] = useState(1);
  const [color,setColor] = useState(state? 'แดง' : 'ดำ');
  const [pic,setPic] = useState(state? '/red.png' : '/black.png');
  const [buyRedNum,setBuyRedNum] = useState(0);
  const [dontBuyRedNum,setDontBuyRedNum] = useState(0);
  const [buyBlackNum,setBuyBlackNum] = useState(0);
  const [dontBuyBlackNum,setDontBuyBlackNum] = useState(0);
  const buyBtnHandler = () => {
    if(state){
      setBuyRedNum(buyRedNum+1)
    }
    else{
      setBuyBlackNum(buyBlackNum+1)
    }
    setState(1-state)
    setColor(!state? 'แดง' : 'ดำ')
    setPic(!state? '/red.png' : '/black.png')
    
  }
  const dontBuyBtnHandler = () => {
    if(state){
      setDontBuyRedNum(dontBuyRedNum+1)
    }
    else{
      setDontBuyBlackNum(dontBuyBlackNum+1)
    }
    setState(1-state)
    setColor(!state? 'แดง' : 'ดำ')
    setPic(!state? '/red.png' : '/black.png')
  }

  return (
    <div className={`bg-white w-screen h-screen flex items-center justify-center ${inter.className}`}>
      <div className='flex flex-col items-center justify-center text-center w-80'>
        <p className="text-zinc-800">คุณจะซื้อเมล็ดทานตะวันแพคเกจสี{color}หรือไม่</p>
        <Image className="my-4 rounded-xl"
          src={pic}
          alt={''}
          width={250}
          height={37}></Image>
        <button className="btn btn-primary w-full my-2" onClick={buyBtnHandler}>ซื้อ</button>
        <button className="btn btn-primary w-full my-2" onClick={dontBuyBtnHandler}>ไม่ซื้อ</button>
        <p>buy red {buyRedNum}, dont buy red {dontBuyRedNum}</p>
        <p>buy black {buyBlackNum}, dont buy black {dontBuyBlackNum} </p>
        {/* {state},{color},{pic} */}
      </div>
    </div>
  )
}
