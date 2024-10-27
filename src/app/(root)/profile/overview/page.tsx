import { getCurrentUser } from '@/shared/helpers/get-current-user';

import { Overview } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль',
};

const ProfileOverviewPage = async () => {
  const user = await getCurrentUser();

  return <Overview user={user} />;
};

export default ProfileOverviewPage;
