// require('dotenv').config();
// var iconv = require('iconv-lite');
// var crypto = require('crypto');
 
// //   // Секретный ключ интернет-магазина
// var key = '484e5a6468544c52504a755e7b7a6e756d667c68575971786e414a'; // KEY лежит в .env
 
// // var fields = {
// //   WMI_MERCHANT_ID: '123456789012', // Идентификатор интернет-магазина, полученный при регистрации.
// //   WMI_PAYMENT_AMOUNT: '100.00', // Сумма заказа, округленное до 2-х знаков после «запятой» Наличие 2-х знаков после «запятой» обязательно.
// //   WMI_CURRENCY_ID: '643', // Идентификатор валюты (ISO 4217): 643 — Российские рубли
// //   WMI_PAYMENT_NO: '12345-001', // Идентификатор заказа в системе учета интернет-магазина.
// //   WMI_DESCRIPTION: 'BASE64:' + new Buffer('Payment for order #12345-001 in MYSHOP.com').toString('base64'), // Описание заказа (список товаров и т.п.) 
// //   WMI_EXPIRED_DATE: '2019-12-31T23:59:59', // Срок истечения оплаты. Дата указывается в западно-европейском часовом поясе (UTC+0) и должна быть больше текущей (ISO 8601), например: 2013-10-29T11:39:26.
// //   WMI_SUCCESS_URL: 'https://myshop.com/w1/success.php', //Адреса (URL) страниц интернет-магазина, на которые будет 
// //   WMI_FAIL_URL: 'https://myshop.com/w1/fail.php', // отправлен покупатель после успешной или неуспешной оплаты.

// //   // Если требуется задать только определенные способы оплаты, раскоментируйте данную строку и перечислите требуемые способы оплаты.
// //   WMI_PTENABLED: ['OnlineBank'],
// // };
 
// var comparator = function(a, b){
//   var a = a.toLowerCase();
//   var b = b.toLowerCase();
//   return a > b ? 1 : a < b ? -1 : 0;
// };
 
// // var createInput = function(name, value){
// //   return '<input name="' + name + '" value="' + value + '">';
// // };
 
// // var inputs = '';
// // var values = '';
 
// // // Формирование сообщения, путем объединения значений формы,
// // // отсортированных по именам ключей в порядке возрастания
// // Object.keys(fields).sort(comparator).forEach(function(name){
// //   var value = fields[name];
// //   if (Array.isArray(value)) {
// //     values += value.sort(comparator).join('');
// //     inputs += value.map(function(val){ return createInput(name, val); }).join('');
// //   }
// //   else {
// //     values += value;
// //     inputs += createInput(name, value);
// //   }
// // });
 
// // // Формирование значения параметра WMI_SIGNATURE, путем
// // // вычисления отпечатка, сформированного выше сообщения,
// // // по алгоритму MD5 и представление его в Base64
// // inputs += createInput('WMI_SIGNATURE', crypto.createHash('md5').update(iconv.encode(values + key, 'win1251')).digest('base64'));
 
// // //Формирование HTML-кода платежной формы.
// // console.log('<form method="POST" action="https://wl.walletone.com/checkout/checkout/Index" accept-charset="UTF-8">' + inputs + '<input type="submit"></form>');

// // <form method="POST" action="https://wl.walletone.com/checkout/checkout/Index" accept-charset="UTF-8">
// // <input name="WMI_CURRENCY_ID" value="643"/>
// //   <input name="WMI_DESCRIPTION" value="BASE64:UGF5bWVudCBmb3Igb3JkZXIgIzEyMzQ1LTAwMSBpbiBNWVNIT1AuY29t"/>
// //     <input name="WMI_EXPIRED_DATE" value="2019-12-31T23:59:59"/>
// //       <input name="WMI_FAIL_URL" value="https://myshop.com/w1/fail.php"/>
// //         <input name="WMI_MERCHANT_ID" value="123456789012"/>
// //           <input name="WMI_PAYMENT_AMOUNT" value="100.00"/>
// //             <input name="WMI_PAYMENT_NO" value="12345-001"/>
// //               <input name="WMI_SUCCESS_URL" value="https://myshop.com/w1/success.php"/>
// //                 <input name="WMI_SIGNATURE" value="wvKulrWtvAVoLR+F4jOPGg=="/>
// //                   <input type="submit"/>
// //                 </form>

// // хардкод айдишек
// const userId = 1;
// const eventId = 1;

// // расчет времени окончания оплаты, +15 минут от времени нажатия на кнопку
// const endPaymentDate = new Date(new Date().setMinutes(new Date().getMinutes()+15)).toISOString().slice(0, -5);
// console.log(endPaymentDate);
// // кодирование описания оплаты
// const payDescription = `BASE64:${Buffer.from(`Предоплата от юзера с id${userId} за евент с id${eventId}`).toString('base64')}`
// console.log(payDescription)

// // формируем объект запроса, где ключи уже отсортированы по возрастанию
// const paymentInfo = {
//   WMI_CURRENCY_ID: '643',
//   WMI_DESCRIPTION: payDescription, // кодировано в BASE64
//   WMI_EXPIRED_DATE: endPaymentDate,
//   WMI_FAIL_URL: 'http://localhot:3000/payerror',
//   WMI_MERCHANT_ID: '174830698753',
//   WMI_PAYMENT_AMOUNT: '2000.00',
//   WMI_PAYMENT_NO: `${userId}-${eventId}`,
//   WMI_PTENABLED: 'OnlineBank',
//   WMI_SUCCESS_URL: `http://localhot:3000/event/${eventId}`,
//   // WMI_SIGNATURE: , // секретный код
// }

// // складывание всех значений полей, для альнейшего кодирования
// let secretUnicKey = '';
// for (let key in paymentInfo) {
//   secretUnicKey += paymentInfo[key];
// }
// console.log(secretUnicKey);
// const secretKey = crypto.createHash('md5').update(iconv.encode(secretUnicKey + key, 'win1251')).digest('base64');
// console.log(secretKey);


// //  fetch('https://wl.walletone.com/checkout/checkout/Index', {
// //   method: 'POST',
// //   body: JSON.stringify(paymentInfo),
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //  })

