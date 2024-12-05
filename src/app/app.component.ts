import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConductoresService } from './servicios/conductores.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConductoresComponent } from "./menu/conductores/conductores.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule, ConductoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'transporte-front';

  conductorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public conductoresService: ConductoresService
  ) { }

  ngOnInit(): void {
    this.conductorForm = this.fb.group({
      id: [''],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$'),
      ],],
    })
  }
  
  guardar() {
    this.conductoresService.saveConductor(this.conductorForm.value).subscribe(resp => {      
    },
      error => (console.error(error))
    )
  }
}
