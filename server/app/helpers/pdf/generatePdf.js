import moment from 'moment'
export default function(userData){
    const {userName, userLastName, userMasterKey, createdAt} = userData
return `
<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica';
             text-align: center;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
                }
                .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
                }
             }
             .date{
                 text-align: center;
                 font-size: 14px;
                 font-weight: lighter;
             }
             .logoContainer{
                text-align: center;
                width: 50%;
             }
             .key{
                width: 10%;
             }
             .keyPhrase{
                 font-size: 30px;
             }
             .headerKey {
                text-align: start
             }
             .parKey{
                font-size: 12px;
             }
             .keyCode{
               border-width: 3px;
               border-color: gray;
               border-style: dashed;
               width: fit-content;
             }
             .keyCodeContainer{
               text-align: center;
               width: 100%;
             }
             .keyCodeContainer > p{
               border-width: 3px;
               border-color: gray;
               border-style: dashed;
               width: auto
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
              <div class="header">
                <p class="date"> Creado para test prueba ${userName} ${userLastName} el ${moment(createdAt).format(`LL`)}  </p>
                <img class="logoContainer" src="https://s3-us-west-2.amazonaws.com/cryptolegacy-internal-use/twoColorsBT.png"/>
            </div>
            <div class="kit">
                <p class="keyPhrase"> Kit de emergencia </p>
                <img class="key" src="https://s3-us-west-2.amazonaws.com/cryptolegacy-internal-use/key-42197_960_720.png"/>
            </div>
            <div class="headerKey">
               <p class="parKey">Tu llave maestra es: </p>
               <div class="keyCodeContainer">
                  <p >${userMasterKey}</p> 
               </div>
               <p class="parKey">Recuerda guardar este documento en un lugar seguro. Este documento es de vital importancia para que puedas acceder a tu cuenta en la plataforma.</p>
            </div>
          </div>
       </body>
    </html>
    `;
}