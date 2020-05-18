import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class CryptoService {

    constructor() { }

    //    para cifrar
    public Cifrar(cadena: string): string {
        return  CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cadena),
                CryptoJS.enc.Utf8.parse(environment.cryptoKeyConfiguration.CRYPTO_KEY_1),
            {
                keySize: 256 / 8,
                iv: CryptoJS.enc.Utf8.parse(environment.cryptoKeyConfiguration.CRYPTO_KEY_2),
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.ZeroPadding
            }).toString();
    }

    //    Para decifrar
    public Descifrar(cadena: string): string {
        return CryptoJS.AES.decrypt(cadena,
               CryptoJS.enc.Utf8.parse(environment.cryptoKeyConfiguration.CRYPTO_KEY_1), {
            keySize: 256 / 8,
            iv: CryptoJS.enc.Utf8.parse(environment.cryptoKeyConfiguration.CRYPTO_KEY_2),
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.ZeroPadding
        }).toString(CryptoJS.enc.Utf8);
    }
}
