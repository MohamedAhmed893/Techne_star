
export const htmlTemplete =(verificationNumber,name)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div style="background-color: aliceblue;">
            <div style="width: 80%;margin:15px auto;padding: 15px;">
        
                <div class="logo-container" style="display: flex;align-items: center;">
                    <h3 style="padding-top: 5px; margin-left: 10px;">Techne Stars</h3>
                </div>
                <div style="margin: 10px 0;">
                    <h5 style="margin: 5px 0;">Hi ${name},</h5>
                    <p style="width: 60%;word-spacing: 3px;">Thanks For Creating Techne Stars Account, To continue Please
                        Confirm Your Email Address By Clicking The Button Below</p>
                </div>
                <p>The Code : ${verificationNumber}</p>
                <p style="margin: 15px 0 5px 0">Thanks</p>
                <p>Techne Stars Team</p>
            </div>
        </div>
    </body>
    </html>`
}