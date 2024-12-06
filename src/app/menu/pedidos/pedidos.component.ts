import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module'
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, MaterialModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

  pedidos : any[] = [];
  conductorId!: number;
  id!:number;
  

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del conductor:', this.id);
    if (isNaN(this.id)) {
      console.error('El ID del conductor no es válido');
    } else {
      this.cargarPedido();
    }
  }

  cargarPedido(): void {
    this.pedidosService.getVehiculoByConductorId(this.id).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.pedidos  = data;
        this.id = data[0].conductor.id;
      },
      error: (error) => {
        console.error('Error al obtener conductores:', error);
      }
    });
  }

  desasociarPedido(id: number): void {
    this.pedidosService.desasociarPedido(id).subscribe({
      next: () => {
        console.log(`Vehículo con ID ${id} desasociado exitosamente.`);
        this.cargarPedido(); 
      },
      error: (error) => {
        console.error('Error al desasociar vehículo:', error);
      }
    });
  }

  agregarNuevoPedido(): void {
    if (this.id) {
      this.router.navigate(['/crear-pedido', this.id]);
    } else {
      console.error('ID del conductor no disponible');
    }
  }
}
