import { Container, MainSlider } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Next.js Market pet-project.',
};

export default function Home() {
  return (
    <div className="">
      <Container>
        <MainSlider />
      </Container>
    </div>
  );
}
