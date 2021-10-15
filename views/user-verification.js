module.exports={
    message:(name,token)=>{
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
                IECOM 2022 firstly would like to thank you for your excitement for IECOM 2022 event series. As we know you can no longer contain your excitement, we would like to inform you of the next step you should take to confirm your account registration for the event. You can activate your account through the button below.
            </p>
            <a href="${token}"><div class="button" style="display: flex; justify-content: center; align-items: center; margin: auto; width: 279px; height: 48px; background: #B06128; box-shadow: 0px 6px 2px -4px rgba(14, 14, 44, 0.1), inset 0px -1px 0px rgba(14, 14, 44, 0.4); border-radius: 8px;">
                <p class="button-message" style="text-align: center; vertical-align: middle; font-style: normal; font-weight: bold; font-size: 16px; line-height: 22px; display: flex; align-items: center; color: #FFFFFF; flex: none; order: 1; flex-grow: 0; margin: auto;">
                    ACTIVATE ACCOUNT
                </p>
            </div></a>
            <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">
                IIf you find any difficulties activating your account, kindly contact us by sending an email to publicrelation@iecom.asia. Please do not reply to this email as it is an auto generated mail. We’ll be looking forward to seeing you soon! Thank you for your interest in creating a resilience industry!
            </p>
            <br>
            <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">Best Regards</p>
            <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;">IECOM 2022</p>
            <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;"><b>official@iecom.asia | +62 81310014646</b></p>
            <p class="message black" style="font-style: normal; font-weight: 500; font-size: 18px; line-height: 27px; color: #000000;"><b>Bandung Institute of Technology</b></p>
        </div>
    </body>
    </html>
    `)
    }
}