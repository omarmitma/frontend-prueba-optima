import { Persona } from "./persona";
import { Proyecto } from "./proyecto";


export class Credito {
  id: number = 0;
  persona: Persona = new Persona();
  proyecto: Proyecto = new Proyecto();
  fechaDesembolso: Date = new Date();
  montoTotal: number = 0;
}
