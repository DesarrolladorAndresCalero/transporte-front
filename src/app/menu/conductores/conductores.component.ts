import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module'
import { ConductoresService } from '../../servicios/conductores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent implements OnInit{


  conductores: any[] = [];

  constructor(
    private conductorService: ConductoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarConductores();
  }

  cargarConductores(): void {
    this.conductorService.getConductor().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.conductores = data;
      },
      error: (error) => {
        console.error('Error al obtener conductores:', error);
      }
    });
  }

  visualizarVehiculos(id: number): void {
    this.router.navigate(['/visualizarVehiculos', id]);
  }

  visualizarPedidos(id: number): void {
    this.router.navigate(['/visualizarPedidos', id]);
  }
}
