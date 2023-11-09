import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [AppComponent],
        schemas: [NO_ERRORS_SCHEMA]
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    xit("should have as title 'enciclopedia_pokemon'", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual("enciclopedia_pokemon");
    });

    xit("should render title", () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector(".content span")?.textContent).toContain("enciclopedia_pokemon app is running!");
    });
});
