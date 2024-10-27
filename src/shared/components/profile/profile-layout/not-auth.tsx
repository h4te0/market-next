import Image from 'next/image';

export const NotAuth = () => {
  return (
    <div className="bg-white rounded-2xl px-40 flex gap-4 justify-center items-center w-full h-full">
      <Image src="/not-auth.webp" alt="lock" width={150} height={150} />
      <div className="">
        <p className="font-bold text-xl">Вы не авторизированы.</p>
        <p className="text-gray-400">
          Пожалуйста авторизируйтесь чтобы просматривать эту страницу.
        </p>
      </div>
    </div>
  );
};
