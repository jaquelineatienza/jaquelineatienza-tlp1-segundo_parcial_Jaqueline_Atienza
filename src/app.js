const express = require('express');
const productos = require('./db/db')

const app =express();

app.use(express.json());
app.use(express.text());


//obtener todos los productos
app.get('/productos/',(req,res)=>{
    res.json(productos)
});
//obtener todos los usuarios
app.get('/productos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const obetener = productos.find((producto)=>producto.id === id);
    res.json(obetener) 
})
//crear productos
let id=1;
app.post('/productos',(req,res)=>{
    
    const {nombre,cantidad,precio}= req.body;
    const newProduct = productos.push({id:id++,nombre:nombre,precio:precio,cantidad:cantidad});
    console.log(newProduct);
    console.log(id)
    res.json({msg:'nuevo producto añadido correctamente'});
})
app.put('/productos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const {nombre}= req.body;

    const obtenerProducto = productos.find((p)=>p.id === id);

    obtenerProducto.nombre=nombre ;

    console.log(obtenerProducto);
    res.json({msg:'el producto fue actualizado correctamente'});

})

app.delete('/productos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const obtenerProducto = productos.find((producto)=>producto.id===id);
    const indice = productos.indexOf(obtenerProducto);
    const deletProduct = productos.splice(indice,1);

    res.json({msg:'producto eliminado correctamente',deletProduct})
})


const PORT = process.env.PORT || 3400;
app.listen(PORT,()=> console.log(`el servidor esta funcionando en el puerto ${PORT}`));

