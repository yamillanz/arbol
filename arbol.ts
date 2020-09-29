import db from "./database";
import { DataNode, Almacen, NodoTree } from './nodo-tree';
import { Request, Response } from "express";

const resultLimpio = (arbol : NodoTree[])=> {   
    return arbol.map((dato) =>{
        !dato.children && delete(dato.children); 
        dato.children && resultLimpio(dato.children); 
        return dato
    });
}

const childNodos = (nodo: Almacen, todos: Almacen[]) => {
    const hijos = todos.filter((dato) => dato.idPadre == nodo.idAlmacenes);

    let newNodo: NodoTree = {};
    let nodos: NodoTree[] = [];

    if (hijos.length == 0) { 
        return null;  
    }


    hijos.forEach((hijo) => {        
        newNodo.data = hijo;        
        newNodo.children = <NodoTree[]>childNodos(hijo, todos);
        nodos.push(newNodo);
        newNodo = {}; 
    });

    return nodos;
}

export const armarArbol = async (req: Request, resp: Response) => {

    let consulta = "SELECT * FROM tabla ORDER BY idPadre, idunico";
    const todosBD: Almacen[] = await db.querySelect(consulta);

    const padres: Almacen[] = todosBD.filter((nodo) => nodo.idPadre == 0);
    const ramasYhojas: Almacen[] = todosBD.filter((nodo) => nodo.idPadre != 0);
  


    let resultado: DataNode = { "data": [] };
    let newNodoTree: NodoTree = {};

    padres.forEach((raiz) => {
        newNodoTree.data = raiz;
        newNodoTree.children = (<NodoTree[]>childNodos(raiz, ramasYhojas));
        // newNodoTree.children?.push(<NodoTree>childNodos(raiz, ramasYhojas));
        resultado.data?.push(newNodoTree);
        newNodoTree = {};

    })

    return resp.status(201).json({data : resultLimpio(<NodoTree[]>resultado.data)}); 

}