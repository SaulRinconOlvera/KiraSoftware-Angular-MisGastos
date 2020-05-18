import { NgModule } from '@angular/core';
import { CurrentUserComponent } from './current-user/current-user.component';
import { IdiomsComponent } from './idioms/idioms.component';
import { LogoComponent } from './logo/logo.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

@NgModule({
    declarations: [
        CurrentUserComponent,
        IdiomsComponent,
        LogoComponent,
        MessagesComponent,
        NotificationsComponent,
        SearchComponent,
        ChatComponent
    ],
    exports: [
        CurrentUserComponent,
        IdiomsComponent,
        LogoComponent,
        MessagesComponent,
        NotificationsComponent,
        SearchComponent,
        ChatComponent
    ],
    imports: [ RouterModule]
})

export class HeaderModule { }
