'use client';

import { Search } from 'lucide-react';
import { Input } from '../ui';

interface Props {}

export const HeaderSearch = ({}: Props) => {
  return (
    <div className="relative flex items-center w-full mr-5">
      <Input placeholder="Поиск" className="py-3 px-4 text-base bg-background" />
      <Search width={20} color="#8E979F" className="absolute right-3 cursor-pointer" />
    </div>
  );
};
