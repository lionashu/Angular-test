import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllServiceService } from '../all-service.service';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  form!: FormGroup;
  countries: any[] = [];
  states: any;
  dealers: any[] = [];
  selectedCountry!: string;
  message!: string;
  filteredStates:any
  constructor(private fb: FormBuilder, private service: AllServiceService) {
    this.form = this.fb.group({
      manufacturer: ['', Validators.required],
      country: [''],
      state: [''],
      dealer: ['']
    });
  }
  ngOnInit(): void {
    this.loadCountries();
    this.loadDealers();
  }

  loadCountries() {
    this.service.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  loadDealers() {
    this.service.getDealers().subscribe(data => {
      this.dealers = data;
    });
  }
  onCountryChange() {
    const countryId = this.form.get('country')?.value;
    this.service.getStates().subscribe((data:any[]) => {
      this.states = data.filter(item => item.CountryMaster_Code == countryId);
      this.filteredStates = this.states;
    });
  }


  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.form.value));
    } else {
      this.message = 'Manufacturer is a mandatory field.';
    }
  }

  searchDropdown(value: string, list: any[]) {
    return list.filter(item => item.toLowerCase().includes(value.toLowerCase()));
  }
}
