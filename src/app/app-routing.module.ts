import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutUsComponent } from "./about-us/about-us.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EncyclopediaComponent } from "./encyclopedia/encyclopedia.component";
import { EntryComponent } from "./encyclopedia/entry/entry.component";
import { NotfoundComponent } from "./notfound/notfound.component";

const routes: Routes = [{
    path: "",
    component: DashboardComponent,
},
{
    path: "poke",
    component: EncyclopediaComponent,
},
{
    path: "poke/not-found",
    component: NotfoundComponent,
},
{
    path: "poke/:pokemon",
    component: EntryComponent
},
{
    path: "about",
    component: AboutUsComponent,
},
{ path: "**", redirectTo: "" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
