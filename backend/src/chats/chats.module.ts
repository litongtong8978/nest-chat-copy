import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';

@Module({
  providers: [ChatsService, ChatsGateway]
})
export class ChatsModule {}
