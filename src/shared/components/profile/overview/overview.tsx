'use client';

import { useState } from 'react';

import { MyOrdersBlock, ProfileEditForm, UserInfoBlock, Wishlist } from '@/shared/components';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
}

export const Overview = ({ user }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (isEdit) return <ProfileEditForm data={user} onEditClose={() => setIsEdit(false)} />;

  return (
    <div className="grid grid-cols-2 gap-4">
      <UserInfoBlock user={user} onEditOpen={() => setIsEdit(true)} />
      <MyOrdersBlock />
      <div className="col-span-full">
        <Wishlist isOverview={true} />
      </div>
    </div>
  );
};
