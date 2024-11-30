const express = require('express');
const app = require('app');


app.get('/', (req,res)=>{
    res.send('Hello world');
})