import Image from 'next/image'
import { Kanit } from 'next/font/google'
import { useEffect, useState } from 'react';
import axios from 'axios';

const kanit = Kanit({ subsets: ["thai"], weight: ["400", "500", "600", "700"]})

export default function Home() {

  const [state,setState] = useState(1);
  const [color,setColor] = useState(state? 'แดง' : 'ดำ');
  const [pic,setPic] = useState(state? '/red.png' : '/black.png');
  const [buyRedNum,setBuyRedNum] = useState(0);
  const [dontBuyRedNum,setDontBuyRedNum] = useState(0);
  const [buyBlackNum,setBuyBlackNum] = useState(0);
  const [dontBuyBlackNum,setDontBuyBlackNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/get_state')
      if (result.status === 200) {
        setState(parseInt(result.data.message))
        setPic(parseInt(result.data.message)? '/red.png' : '/black.png')
        setColor(parseInt(result.data.message)? 'แดง' : 'ดำ')
      }
    }
    fetchData()
  }, [])

  const buyBtnHandler = async() => {
    await axios.post('/api/submit', {
        type: state==1? 'red' : 'black',
        answer: 'yes'
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message == 'Success') {
            return true
          }
        }
        return false
      });
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
  const dontBuyBtnHandler = async() => {
    await axios.post('/api/submit', {
        type: state==1? 'red' : 'black',
        answer: 'no'
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message == 'Success') {
            return true
          }
        }
        return false
      });
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
    <div className={`bg-white w-screen h-screen flex items-center justify-center ${kanit.className}`}>
      <div className='flex flex-col items-center justify-center text-center w-80'>
        <div className="text-zinc-800">คุณจะซื้อเมล็ดทานตะวันแพคเกจสี<span className={state?"text-red-600 font-bold":"font-bold"}> {color} </span>หรือไม่</div>
        <Image className="my-4 rounded-xl"
          src={pic}
          alt={''}
          width={250}
          height={37}></Image>
        <button className="btn btn-primary w-full my-2" onClick={buyBtnHandler}>ซื้อ</button>
        <button className="btn btn-primary w-full my-2" onClick={dontBuyBtnHandler}>ไม่ซื้อ</button>
        {/* <p>buy red {buyRedNum}, dont buy red {dontBuyRedNum}</p>
        <p>buy black {buyBlackNum}, dont buy black {dontBuyBlackNum} </p> */}
        {/* {state},{color},{pic} */}
      </div>
    </div>
  )
}
