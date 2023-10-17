import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutUsComponent } from "./about-us/about-us.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EncyclopediaComponent } from "./encyclopedia/encyclopedia.component";

const routes: Routes = [{
    path: "",
    component: DashboardComponent,
},
{
    path: "poke",
    component: EncyclopediaComponent,
},
{
    path: "about",
    component: AboutUsComponent,
},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
