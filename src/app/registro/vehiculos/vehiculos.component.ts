import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material/material.module';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit{

  vehiculoForm!: FormGroup;
  idConductor!: number;
  isModalVisible: boolean = false;

  constructor(private route: ActivatedRoute,
  public vehiculosService: VehiculosService,
  private fb: FormBuilder,
  private router: Router,
  ) {}


  ngOnInit(): void {    
    this.idConductor = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del conductor:', this.idConductor);  
    this.vehiculoForm = this.fb.group({
      id: [''],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      capacidad: ['', Validators.required],
      idConductor: [this.idConductor, Validators.required]
    });
  }

  guardarVehiculo() {
    console.log
    this.vehiculosService.saveVehiculo(this.vehiculoForm.value).subscribe(
      (resp) => {
        this.vehiculoForm.reset();
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
