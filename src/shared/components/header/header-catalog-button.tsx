'use client';

import { useState } from 'react';
import { TextSearch, X } from 'lucide-react';

import { Button } from '../ui';
import { CategoriesMenu } from '../categories-menu';

export const HeaderCatalogButton = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  if (isCatalogOpen)
    return (
      <>
        <Button
          variant="destructive"
          className="mr-5"
          onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
          <X />
          <p className="ml-3 font-bold">Каталог</p>
        </Button>
        <CategoriesMenu />
      </>
    );
  else
    return (
      <Button className="mr-5" onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
        <TextSearch />
        <p className="ml-3 font-bold">Каталог</p>
      </Button>
    );
};
