import { Location } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
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
import { SearchComponent } from "./encyclopedia/search/search.component";
import { NotfoundComponent } from "./notfound/notfound.component";

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
        EntryComponent,
        SearchComponent,
        NotfoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        InfiniteScrollModule,
        ReactiveFormsModule
    ],
    providers: [Location],
    bootstrap: [AppComponent]
})
export class AppModule { }
