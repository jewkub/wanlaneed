const express = require('express');
let app = express();
app.get('/', (req, res) => {
  console.log('testest');
});
app.listen(8080, '0.0.0.0', () => console.log('server started'));