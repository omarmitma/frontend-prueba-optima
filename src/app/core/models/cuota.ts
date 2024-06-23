import { Credito } from "./credito";
import { Voucher } from "./voucher";

export class Cuota {
  id: number = 0;
  credito: Credito = new Credito();
  fechaPago: Date = new Date();
  monto: number = 0;
  montoPagado: number = 0;
  pagado: boolean = false;
  vouchers:Voucher[] = [];
}
