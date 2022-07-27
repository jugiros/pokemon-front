import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class FunctionServicesService {

  constructor() { }

  validateIdentificationCard(identificación: string) {
    let cedula = identificación;
    if (cedula.length === 10) {
      const digito_region = cedula.substring(0, 2);
      if (parseInt(digito_region, 10) >= 1 && parseInt(digito_region, 10) <= 24) {
        const ultimo_digito = cedula.substring(9, 10);
        const par1 = parseInt(cedula.substring(1, 2), 10);
        const par2 = parseInt(cedula.substring(3, 4), 10);
        const par3 = parseInt(cedula.substring(5, 6), 10);
        const par4 = parseInt(cedula.substring(7, 8), 10);
        const pares = par1 + par2 + par3 + par4;
        let numero1 = parseInt(cedula.substring(0, 1), 10);
        numero1 = (numero1 * 2);
        if (numero1 > 9) {
          numero1 = (numero1 - 9);
        }
        let numero3 = parseInt(cedula.substring(2, 3), 10);
        numero3 = (numero3 * 2);
        if (numero3 > 9) {
          numero3 = (numero3 - 9);
        }
        let numero5 = parseInt(cedula.substring(4, 5), 10);
        numero5 = (numero5 * 2);
        if (numero5 > 9) {
          numero5 = (numero5 - 9);
        }
        let numero7 = parseInt(cedula.substring(6, 7), 10);
        numero7 = (numero7 * 2);
        if (numero7 > 9) {
          numero7 = (numero7 - 9);
        }
        let numero9 = parseInt(cedula.substring(8, 9), 10);
        numero9 = (numero9 * 2);
        if (numero9 > 9) {
          numero9 = (numero9 - 9);
        }
        const impares = numero1 + numero3 + numero5 + numero7 + numero9;
        const suma_total = (pares + impares);
        const primer_digito_suma = String(suma_total).substring(0, 1);
        const decena = (parseInt(primer_digito_suma, 10) + 1) * 10;
        let digito_validador = decena - suma_total;
        if (digito_validador === 10) {
          digito_validador = 0;
        }
        if (digito_validador.toString() === ultimo_digito.toString()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getAge (dateString: string) {
    let today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  setLocalStorageData (item: string, data: any) {
    localStorage.setItem(item, JSON.stringify(data));
  }

  getLocalStorageData (item: string) {
    return new Promise(resolve => {
      resolve(localStorage.getItem(item));
    });
  }

  clearLocalStorageData () {
    window.localStorage.clear();
  }

  getBase64 (file:any) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        resolve(Globals.imgUserB64);
      };
    });
  }

}
