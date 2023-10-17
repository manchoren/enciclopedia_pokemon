import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AboutUsComponent } from "./about-us/about-us.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./common/footer/footer.component";
import { HeaderComponent } from "./common/header/header.component";
import { MenuComponent } from "./common/menu/menu.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EncyclopediaComponent } from "./encyclopedia/encyclopedia.component";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        AboutUsComponent,
        EncyclopediaComponent,
        MenuComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
