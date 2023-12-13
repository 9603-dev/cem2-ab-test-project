import { Kanit } from 'next/font/google';

const kanit = Kanit({ subsets: ['thai'], weight: ['400', '500', '600', '700'] });

const Thankyou = () => {
  return (
    <>
      <div
        className={`bg-white w-screen h-screen flex items-center justify-center ${kanit.className}`}
      >
        <div className="text-3xl md:text-4xl">ขอบคุณสำหรับคำตอบของคุณ</div>
      </div>
    </>
  );
};

export default Thankyou;
