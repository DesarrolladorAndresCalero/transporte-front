import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module'
import { ConductoresService } from '../../servicios/conductores.service';

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
    private conductorService: ConductoresService
  ) {}

  ngOnInit(): void {
    this.cargarConductores();
  }

  cargarConductores(): void {
    this.conductorService.getConductor().subscribe({
      next: (data) => {
        console.log('Conductores:', data);
        this.conductores = data.results;
      },
      error: (error) => {
        console.error('Error al obtener personajes:', error);
      }
    });
  }

}
