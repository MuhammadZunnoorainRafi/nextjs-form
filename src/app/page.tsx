export default function Home() {
  return (
    <div className="flex items-center justify-center relative">
      <div className="flex items-center justify-center size-[400px] rounded-full border border-white border-x-transparent animate-spin "></div>
      <h1 className="absolute font-bold text-4xl text-center animate-bounce">
        Hello Forms <span className="animate-ping">👋</span>{' '}
      </h1>
    </div>
  );
}
