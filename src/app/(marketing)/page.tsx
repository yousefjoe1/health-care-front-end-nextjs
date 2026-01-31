import Image from "next/image";
import { HeroWave } from "../../../public/assets/svgs/svgs";
import RegisterationForm from "../components/Forms/RegisterationForm";

export default function Home() {
  return (
    <main className="flex flex-col gap-10" dir="rtl">


      {/* Hero Section */}
      <section className="relative px-6 bg-primary text-white pt-20 overflow-hidden h-screen flex lg:flex-row flex-col justify-between items-center">

        <div className="pb-20 space-y-5 ">
          <h1 className="text-4xl font-bold">العيادة</h1>
          <h1 className="text-4xl font-bold">ألف سلامة عليك</h1>
          <h2 className="text-4xl font-bold">احجز ميعادك بكل سهوله , بالوقت اللي يناسبك</h2>
        </div>

        <div>
          <Image width={700} height={700} src="/assets/images/docot-hero.jpg" alt="Hero" />
        </div>

        <div className="absolute bottom-0 left-0 w-full leading-0">
          <HeroWave color="#ffffff" />
        </div>
      </section>

      {/* Section */}
      <section className="">
        <h2 className="text-4xl font-bold mb-6 text-primary text-center"> حجز موعد جديد بكل سهولة</h2>

        <RegisterationForm />
        <HeroWave color="#56b9ac" />
      </section>
    </main>
  );
}
