import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material/material.module';
import { PedidosService } from '../../servicios/pedidos.service';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{

  pedidoForm!: FormGroup;
  idConductor!: number;
  isModalVisible: boolean = false;

  constructor(private route: ActivatedRoute,
  public pedidosService: PedidosService,
  private fb: FormBuilder,
  private router: Router,
  ) {}


  ngOnInit(): void {    
    this.idConductor = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del conductor:', this.idConductor);  
    this.pedidoForm = this.fb.group({
      id: [''],
      direccion: ['', Validators.required],
      tipoPedido: ['', Validators.required],
      idConductor: [this.idConductor, Validators.required]
    });
  }

  guardarVehiculo() {
    this.pedidosService.savePedidos(this.pedidoForm.value).subscribe(
      (resp) => {
        this.pedidoForm.reset();
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
