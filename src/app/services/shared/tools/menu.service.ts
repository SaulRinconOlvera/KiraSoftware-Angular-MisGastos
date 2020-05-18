import { Injectable } from '@angular/core';
import { OptionType } from 'src/data/enumerators/menu/option.type';
import { MenuOptionViewModel } from 'src/data/menu/option.viewmodel';

@Injectable()
export class MenuService {

    menu: MenuOptionViewModel[] = [
        {
            titulo: 'Principal',
            icono: 'dashboard',
            tipo: OptionType.MenuOption,
            url: null,
            options: [
                {
                    titulo: 'Gráficas',
                    icono: null,
                    url: '/graficas',
                    tipo: OptionType.PageOption,
                    options: null
                },
                {
                    titulo: 'Progress',
                    icono: null,
                    url: '/progress',
                    tipo: OptionType.PageOption,
                    options: null
                }
            ]
        },
        {
            titulo: 'Cuenta',
            icono: 'build',
            tipo: OptionType.MenuOption,
            url: null,
            options: [
                {
                    titulo: 'Preferencias',
                    icono: null,
                    url: '/settings',
                    tipo: OptionType.PageOption,
                    options: null
                }
            ]
        }
    ];

    constructor() { }
}
