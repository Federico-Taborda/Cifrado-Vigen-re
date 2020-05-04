// Algoritmo de tipo simetrico que nesecita una misma clave para cifrar y descifrar el texto a encriptar.
/*  Lo que hace el algoritmo es repetir la clave tantas veces como el largo del texto a cifrar. Luego se comparan ambos textos y se cambian los
    caracteres del texto original una cantidad de (n)veces hacia la derecha (que seria el indice de la letra comparada en el abecedario). Para
    decifrar el texto se realiza el mismo procedimiento pero hacia la izquierda con la misma clave. */

const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let cadena = document.getElementById("campo-cifrado-decifrado");
let resultado = document.getElementById("campo-resultado");
let cifrar = document.getElementById("btn-cifrar");
let decifrar = document.getElementById("btn-decifrar");
let palabraClave = document.getElementById("keyWord");

cifrar.addEventListener("click", () => {
    cifrarTexto(cadena.value, palabraClave.value);
});

decifrar.addEventListener("click", () => {
    decifrarTexto(cadena.value, palabraClave.value);
});

function cifrarTexto(texto, clave) {
    const arrClave = generarArrayClave(texto, clave);
    const arrCifrado = [];

    for(let j = 0; j < texto.length; j++) {
        if(texto[j] == " ") {
            arrCifrado.push(" ");
        }else if(texto[j] == ".") {
            arrCifrado.push(".");
        }else if(texto[j] == ","){
            arrCifrado.push(",");
        }else if(isNaN(texto[j])) {
            let indiceLetra1 = buscarIndiceLetra("cifrar", texto[j]);
            let indiceLetra2 = buscarIndiceLetra("cifrar", arrClave[j]);
            let letraFinal = indiceLetra1 + indiceLetra2;

            if(letraFinal > abc.length - 1) {
                while(letraFinal > abc.length - 1) {
                    letraFinal -= abc.length;
                };
            };

            arrCifrado.push(abc[letraFinal]);
        }else if(!isNaN(texto[j])) {
            let indiceNumero1 = buscarIndiceNumero("cifrar", texto[j]);
            let indiceNumero2 = buscarIndiceLetra("cifrar", arrClave[j]);
            let numeroFinal = indiceNumero1 + indiceNumero2;

            if(numeroFinal > nums.length - 1) {
                while(numeroFinal > nums.length - 1) {
                    numeroFinal -= nums.length;
                };
            };

            arrCifrado.push(nums[numeroFinal]);
        };
    };
    
    return resultado.innerHTML = arrCifrado.join("");
};

function decifrarTexto(texto, clave) {
    const arrClave = generarArrayClave(texto, clave);
    const arrDecifrado = [];

    for(let k = 0; k < texto.length; k++) {
        if(texto[k] == " ") {
            arrDecifrado.push(" ");
        }else if(texto[k] == ".") {
            arrDecifrado.push(".");
        }else if(texto[k] == ","){
            arrDecifrado.push(",");
        }else if(isNaN(texto[k])) {
            let indiceLetra1 = buscarIndiceLetra("decifrar", texto[k]);
            let indiceLetra2 = buscarIndiceLetra("decifrar", arrClave[k]);
            let letraFinal = indiceLetra1 - indiceLetra2;
            
            if(letraFinal < 0) {
                while(letraFinal < 0) {
                    letraFinal = abc.length - Math.abs(letraFinal);
                };
            };
            
            arrDecifrado.push(abc[letraFinal]);
        }else if(!isNaN(texto[k])) {
            let indiceNumero1 = buscarIndiceNumero("decifrar", texto[k]);
            let indiceNumero2 = buscarIndiceLetra("decifrar", arrClave[k]);
            let numeroFinal = indiceNumero1 - indiceNumero2;
            
            if(numeroFinal < 0) {
                while(numeroFinal < 0) {
                    numeroFinal = nums.length - Math.abs(numeroFinal);
                };
            };
            
            arrDecifrado.push(nums[numeroFinal]);
        };
    };
    
    arrDecifrado[0] = arrDecifrado[0].toUpperCase();
    return resultado.innerHTML = arrDecifrado.join("");
};

// Genera un array de la misma longitud del msj pero repitiendo la palabra clave.
function generarArrayClave(string, key) {
    let contador = 0;
    let code = [];

    for(let i = 0; i < string.length; i++) {
        if(contador > key.length - 1) {
            contador = 0;
        };

        if(string[i] == " ") {
            code.push(" ");
            contador--;
        }else if(string[i] == ".") {
            code.push(".");
            contador--;
        }else if(string[i] == ","){
            code.push(",");
            contador--;
        }else if(isNaN(string[i])) {
            code.push(key[contador]);
        }else if(!isNaN(string[i])) {
            code.push(key[contador]);
        };

        contador++;
    };

    return code;
};

function buscarIndiceLetra(op, letra) {
    let i;
    
    abc.map((letraArr, indice) => {
        if(op == "cifrar") {
            if(letra.toLowerCase() == letraArr) {
                i = indice;
            };
        }else if(op == "decifrar") {
            if(letra.toLowerCase() == letraArr) {
                i = indice;
            };
        };
    });
    
    if(i > abc.length - 1) {
        i = i - abc.length
    }else if(i < 0) {
        i = abc.length - Math.abs(i);
    };
    
    return i;
};

function buscarIndiceNumero(op, numero) {
    let i;
    
    nums.map((numeroaArr, indice) => {
        if(op == "cifrar") {
            if(numero == numeroaArr) {
                i = indice;
            };
        }else if(op == "decifrar") {
            if(numero == numeroaArr) {
                i = indice;
            };
        };
    });

    if(i > nums.length - 1) {
        i = i - nums.length
    }else if(i < 0) {
        i = nums.length - Math.abs(i);
    };
    
    return i;
};