import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'visualizarConductores',
    loadComponent: () =>
      import('./menu/conductores/conductores.component').then(
        (m) => m.ConductoresComponent
      ),
  },
  {
    path: 'visualizarVehiculos/:id',
    loadComponent: () =>
      import('./menu/vehiculos/vehiculos.component').then(
        (m) => m.VehiculosComponent
      ),
  },
  {
    path: 'visualizarPedidos/:id',
    loadComponent: () =>
      import('./menu/pedidos/pedidos.component').then(
        (m) => m.PedidosComponent
      ),
  },
  {
    path: 'crear-pedido/:id',
    loadComponent: () =>
      import('./registro/pedidos/pedidos.component').then(
        (m) => m.PedidosComponent
      ),
  },
  {
    path: 'crear-vehiculo/:id',
    loadComponent: () =>
      import('./registro/vehiculos/vehiculos.component').then(
        (m) => m.VehiculosComponent
      ),
  },
];
