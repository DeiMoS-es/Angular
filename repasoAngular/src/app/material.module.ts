//  Este módulo se encargara de exportar todos los módulos que usemos de Angular material
import { NgModule } from "@angular/core";
import { MatToolbarModule} from '@angular/material/toolbar'

@NgModule({
    exports: [MatToolbarModule]
})

export class MaterialModule {}