import { Checkout } from '@/shared/components';
import { getCurrentUser } from '@/shared/helpers/get-current-user';

const CheckoutPage = async () => {
  const user = await getCurrentUser();
  return <Checkout user={user} />;
};

export default CheckoutPage;
