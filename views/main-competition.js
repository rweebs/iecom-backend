module.exports={
    pending:(name)=>{
        return(
    `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css?family=Poppins|Lato" rel="stylesheet"> 
    
</head>

<body>
    <img id="header-image" src="https://bowo-testing.sgp1.cdn.digitaloceanspaces.com/IECOM/Head.png" alt="header-email" srcset="" style="width: 100%;">
    <div class="container" style="margin: 33px;">
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">Hello,${name}</p>
        <br>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">
            IECOM 2022 firstly would like to thank you for your excitement in joining IECOM 2022 Competition. We would like to inform you that <b>our team currently is reviewing your application for the competition.</b> The competition details can be accessed through the guidebook than can be accessed from our website.
        </p>

        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">
            IIf you find any difficulties activating your account, kindly contact us by sending an email to publicrelation@iecom.asia. Please do not reply to this email as it is an auto generated mail. We’ll be looking forward to seeing you soon! Thank you for your interest in creating a resilience industry!
        </p>
        <br>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">Best Regards</p>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">IECOM 2022</p>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;"><b>Email | Mobile</b></p>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;"><b>Bandung Institute of Technology</b></p>
    </div>
</body>
</html>
    `)
    },
    success:(name)=>{
        return(
    `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css?family=Poppins|Lato" rel="stylesheet"> 
    
</head>

<body>
    <img id="header-image" src="https://bowo-testing.sgp1.cdn.digitaloceanspaces.com/IECOM/Head.png" alt="header-email" srcset="" style="width: 100%;">
    <div class="container" style="margin: 33px;">
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">Hello,${name}</p>
        <br>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">
            IECOM 2022 firstly would like to thank you for your excitement in joining IECOM 2022 Competition. We would like to inform you that <b>our team currently is reviewing your application for the competition.</b> The competition details can be accessed through the guidebook than can be accessed from our website.
        </p>

        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">
            IIf you find any difficulties activating your account, kindly contact us by sending an email to publicrelation@iecom.asia. Please do not reply to this email as it is an auto generated mail. We’ll be looking forward to seeing you soon! Thank you for your interest in creating a resilience industry!
        </p>
        <br>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">Best Regards</p>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">IECOM 2022</p>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;"><b>Email | Mobile</b></p>
        <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;"><b>Bandung Institute of Technology</b></p>
    </div>
</body>
</html>
    `)
    }
}