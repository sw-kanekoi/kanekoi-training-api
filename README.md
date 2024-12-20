# kanekoi-training-api  

クライアント側起動  
cd ./client  
npm run dev  
http://localhost:5173/　にアクセス  

サーバ側起動  
cd ./server  
node server.js  
curl -X GET "http://localhost:4000/zip?zipcode=1010041" を実行（API側だけテストする場合）  
