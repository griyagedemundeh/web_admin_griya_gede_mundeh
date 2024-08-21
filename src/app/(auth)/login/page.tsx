import Images from "@/constants/images";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-row p-16 justify-between">
      <div className="p-8 bg-primary1 flex justify-center items-center rounded-3xl">
        <Image
          src={Images.authIllustration}
          alt=""
          className="w-3/4"
          width={100}
          height={100}
        />
      </div>
      <div className="p-8">
        <Image src={Images.icGriya} alt="" width={100} height={100} />
      </div>
    </main>
  );
}
