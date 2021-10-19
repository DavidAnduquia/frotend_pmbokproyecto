import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon"; // <----- Here
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
    imports: [
        //Agnular Material
        MatFormFieldModule,
        MatIconModule,
        //MatCardModule,
        //MatTabsModule,
        MatTableModule,
        MatButtonModule,
        MatGridListModule
         
        
    ],
    exports: [
        
    ]
})
export class MaterilaModule { }