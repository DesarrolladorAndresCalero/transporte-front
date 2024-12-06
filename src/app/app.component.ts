import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ConductoresService } from './servicios/conductores.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'transporte-front';

  conductorForm!: FormGroup;
  isModalVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    public conductoresService: ConductoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conductorForm = this.fb.group({
      id: [''],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }

  guardar() {
    this.conductoresService.saveConductor(this.conductorForm.value).subscribe(
      (resp) => {
        this.conductorForm.reset();
        this.openModal();
      },
      (error) => console.error(error)
    );
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  irAListadoConductores() {
    this.router.navigate(['/visualizarConductores']);
    
  }
  
}
