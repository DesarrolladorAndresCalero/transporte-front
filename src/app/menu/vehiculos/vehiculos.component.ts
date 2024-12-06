import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module'
import { Router, ActivatedRoute  } from '@angular/router';
import { VehiculosService } from '../../servicios/vehiculos.service';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, MaterialModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {

  vehiculos : any[] = [];
  conductorId!: number;
  id!: number
  

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.conductorId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del conductor:', this.conductorId);
    this.cargarVehiculo();
  }

  cargarVehiculo(): void {
    this.vehiculosService.getVehiculoByConductorId(this.conductorId).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.vehiculos  = data;
        this.id = data[0].conductor.id;
      },
      error: (error) => {
        console.error('Error al obtener conductores:', error);
      }
    });
  }

  desasociarVehiculo(id: number): void {
    this.vehiculosService.desasociarVehiculo(id).subscribe({
      next: () => {
        console.log(`Vehículo con ID ${id} desasociado exitosamente.`);
        this.cargarVehiculo(); 
      },
      error: (error) => {
        console.error('Error al desasociar vehículo:', error);
      }
    });
  }

  agregarNuevoVehiculo(): void {
    this.router.navigate(['/crear-vehiculo', this.id]);
  }

}
