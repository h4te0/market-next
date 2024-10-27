'use client';

import { useState } from 'react';
import ReactStories from 'react-insta-stories';
import { X } from 'lucide-react';

import { cn } from '@/lib';

import { Container, Skeleton } from '@/shared/components';
import { IStory, useStories } from '@/shared/api/queries';

interface Props {
  className?: string;
}

export const Stories = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  const { data: stories, isLoading } = useStories();

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container classname={cn('flex items-center gap-8 my-6', className)}>
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-[82px] h-[82px] rounded-full" />
          ))}

        {stories?.map((story) => (
          <div className="rounded-full border-2 border-primary p-1 cursor-pointer" key={story.id}>
            <img
              onClick={() => onClickStory(story)}
              className="object-cover rounded-full aspect-square"
              height={70}
              width={70}
              src={story.previewImageUrl}
            />
          </div>
        ))}

        {open && (
          <div className="fixed overflow-hidden left-0 top-0 right-0 bottom-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
            <div className="absolute" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={10000}
                width={520}
                height={800}
              />
            </div>
            <div
              className="absolute h-full w-full top-0 left-0 cursor-pointer"
              onClick={() => setOpen(false)}></div>
          </div>
        )}
      </Container>
    </>
  );
};
