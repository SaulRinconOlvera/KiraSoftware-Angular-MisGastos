import { OptionType } from '../../enumerators/menu/option.type';

export interface Option {
    titulo: string;
    icono: string;
    tipo: OptionType;
    url: string;
    options: Option[];
}
