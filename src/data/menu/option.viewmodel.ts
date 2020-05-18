import { Option } from '../interfaces/menu/interface.option';
import { OptionType } from '../enumerators/menu/option.type';

export class MenuOptionViewModel implements Option {
    titulo: string;    icono: string;
    tipo: OptionType;
    url: string;
    options: MenuOptionViewModel[];
}
