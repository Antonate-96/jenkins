import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Natthaphon';
  example = {
    "systemId": "test",
    "password": "Mypas12345566",
    "userName": "test001",
    "requestData": {
      "OFFCODE": "100400",
      "INC_CODE": "410070",
      "BEGIN_DATE": ""
    }
  }
}

