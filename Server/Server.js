const express = require('express');
//console.log("Server Start");
const app = express();
    //app.use(cors(corsOptions));
    const cors = require('cors')

    const bodyParser = require('body-parser');//phần thêm vào

	var corsOptions = {
	  origin: 'http://localhost:4200',
	  //domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
	  //giả sử node server là http://localhost:8000
	  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
	};
	
	
	app.listen(8000, () => {
		console.log('Server Started!');
      });
      app.use(cors(corsOptions)); 

      app.use(bodyParser.json());//phần thêm vào

      app.route('/api/item').get((req, res) => {
        console.log('item');
          res.send([{ id:'05', name: 'Da Nang', start:'01/07/2020',end:'04/07/2020', price:'10.000.000 vnđ',status:'yes'}, 
          { id:'06', name: 'Ha Noi', start:'14/06/2020',end:'17/06/2020', price:'8.000.000 vnđ',status:'no'},
          { id:'07', name: 'Hue', start:'15/06/2020',end:'20/06/2020', price:'12.000.000 vnđ',status:'yes'},
          { id:'08', name: 'Da Lat', start:'15/06/2020',end:'20/06/2020', price:'10.000.000 vnđ',status:'no'},

        ]
          );
      });

      // dung cho phan insert
		app.route('/api/insert').post((req, res) => {
		 
		  console.log('insert account');
		  console.log('account info:'+req.body);
			res.send(201, req.body);
      });
      
      // app.route('/api/insertitem').post((req, res) => {
		 
      //   console.log('insert item');
      //   console.log('item info:'+req.body);
      //   res.send(201, req.body);
      //   });