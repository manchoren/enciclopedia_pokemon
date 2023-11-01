import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AboutUsComponent } from "./about-us/about-us.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BreadcrumbComponent } from "./common/breadcrumb/breadcrumb.component";
import { FooterComponent } from "./common/footer/footer.component";
import { HeaderComponent } from "./common/header/header.component";
import { MenuComponent } from "./common/menu/menu.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EncyclopediaComponent } from "./encyclopedia/encyclopedia.component";
import { EntryComponent } from "./encyclopedia/entry/entry.component";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        AboutUsComponent,
        EncyclopediaComponent,
        MenuComponent,
        FooterComponent,
        HeaderComponent,
        BreadcrumbComponent,
        EntryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        InfiniteScrollModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
