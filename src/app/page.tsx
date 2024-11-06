import NickForm from "@/components/form/NickForm";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center relative overflow-hidden text-amber-200">
      <video autoPlay loop muted src="/yasuo.1920x1080.mp4"></video>
      <div className="flex flex-col gap-10 items-center justify-center absolute z-20">
        <h1 className="text-4xl font-bold bg-black/30 rounded-xl p-2">
          Check your match history, rank, stats and more!
        </h1>
        <NickForm />
      </div>
    </main>
  );
}
