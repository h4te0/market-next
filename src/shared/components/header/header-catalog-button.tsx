'use client';

import { useState } from 'react';
import { TextSearch, X } from 'lucide-react';

import { Button, CategoriesMenu } from '@/shared/components';

export const HeaderCatalogButton = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  if (isCatalogOpen) {
    return (
      <>
        <Button variant="destructive" className="mr-5" onClick={() => setIsCatalogOpen(false)}>
          <X />
          <p className="ml-3 font-bold">Каталог</p>
        </Button>
        <CategoriesMenu onClose={() => setIsCatalogOpen(false)} />
      </>
    );
  } else {
    return (
      <Button className="mr-5" onClick={() => setIsCatalogOpen(true)}>
        <TextSearch />
        <p className="ml-3 font-bold">Каталог</p>
      </Button>
    );
  }
};
