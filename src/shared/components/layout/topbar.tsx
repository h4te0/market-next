import { MapPin, Phone } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button, Container } from '@/shared/components';

interface Props {
  className?: string;
}

export const Topbar = ({ className }: Props) => {
  return (
    <div className={cn('relative box-border bg-white border-b border-[#f4f4f4] py-2', className)}>
      <Container classname="flex items-center justify-between">
        <button className="flex items-center gap-1 text-secondary">
          <MapPin width={20} />
          <p className="font-bold text-sm">Астана</p>
        </button>
        <div className="flex items-center justify-between">
          <div className="flex mx-8 items-center">
            <Phone width={20} height={20} />
            <span className="text-secondary px-2 font-bold text-lg">1717</span>{' '}
            <p className="text-sm">с 9:00 до 22:00 ежедневно</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full border-secondary text-secondary font-bold text-base py-1 hover:text-secondary">
              Рус
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-secondary text-secondary font-bold text-base py-1 hover:text-secondary">
              Қаз
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
