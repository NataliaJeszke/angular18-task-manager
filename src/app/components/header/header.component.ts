import { Component } from "@angular/core";
import { SearchComponent } from "../search/search.component";
import { UserComponent } from "../user/user.component";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  imports: [SearchComponent, UserComponent]
})

export class HeaderComponent { }