import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  searchvalue: FormGroup;

  apikey = "bbb9f51998f9346d65fc3ad59b5db852";
  apiUrlBase = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  apidaily = "https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt=7"

  @ViewChild('cityElement') cityElement!: ElementRef;
  @ViewChild('tempElement') tempElement!: ElementRef;
  @ViewChild('feels_likeElement') feels_likeElement!: ElementRef;
  @ViewChild('windElement') windElement!: ElementRef;
  @ViewChild('humidityElement') humidityElement!: ElementRef;
  @ViewChild('pressureElement') pressureElement!: ElementRef;
  @ViewChild('sunsetElement') sunsetElement!: ElementRef;
  @ViewChild('sunriseElement') sunriseElement!: ElementRef;

  @ViewChild('searchForm') searchForm!: ElementRef;
  data: any;
  sunset: any;
  sunrise: any;

  async searchWeather(city: string) {
    await this.submit();
    this.searchForm.nativeElement.reset();
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.searchvalue = this.fb.group({
      searchValue: new FormControl('')
    })
  }

  ngOnInit(): void {}

  async submit() {
    console.log(this.searchvalue.value['searchValue']);
    var city = this.searchvalue.value['searchValue']

    try {
      const response = await fetch(`${this.apiUrlBase}${city}&appid=${this.apikey}`);
      this.data = await response.json();

      console.log(this.data);
      this.sunset = new Date(this.data.sys.sunset * 1000).toLocaleTimeString();
      this.sunrise = new Date(this.data.sys.sunrise * 1000).toLocaleTimeString();
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  }

}
