/*import { Module } from '@nestjs/common';

@Module({
})
export class CommonModule {}*/

// para usar el adaptador

import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({

    providers: [AxiosAdapter],
    exports:[AxiosAdapter]
})
export class CommonModule {}
