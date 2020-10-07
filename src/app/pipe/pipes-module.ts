import { NgModule } from '@angular/core';
import { LeadingZeroesPipe } from './leading-zeroes/leading-zeroes.pipe';

@NgModule({
    declarations: [
        LeadingZeroesPipe
    ],
    exports: [
        LeadingZeroesPipe
    ],
})
export class PipesModule {}
