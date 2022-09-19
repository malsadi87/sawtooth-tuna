// subscriber.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_SUBSCRIBER = 'IS_SUBSCRIBER';
export const EntitySubscriber = () => SetMetadata(IS_SUBSCRIBER, true);