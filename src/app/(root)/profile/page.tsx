import { redirect } from 'next/navigation';

import { paths } from '@/shared/consts';

const ProfilePage = () => {
  return redirect(paths.profile.overview);
};

export default ProfilePage;
