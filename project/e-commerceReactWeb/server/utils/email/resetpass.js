export function resetPassword (name, url) {
  return new Promise(async (resolve, reject) => {
    try {
      let template = `
          <html>
              <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                      body, html {
                          padding: 0;
                          margin: 0;
                          font-family: sans-serif;
                      }
                      .container {
                          padding: 20px 100px;
                      }
                      .banner {
                          background-color: #48BA81;
                          padding: 1rem;
                          color: white;
                      }
                      .btn {
                          display: inline-block;
                          padding: 10px 20px;
                          font-size: 16px;
                          color: #fff;
                          background-color: #6E6D70;
                          text-decoration: none;
                          border-radius: 5px;
                      }
                      .btn:hover {
                          background-color: #DFDEDF;
                          color: #6E6D70;
                      }
                      .warning-text {
                          font-size: 12px;
                      }
                  </style>
              </head>
              <body>
                  <div class="banner">
                      <h2>Reset Your Password</h2>
                  </div>
                  <div class="container">
                      <p>Hi ${name},</p>
                      <p>Forgot your password?</p>
                      <p>We received a request to reset the password for your account.</p>
                      <p>To reset your password, click the button below:</p>
                      <a href="${url}" class="btn">Reset Password</a>
                      <p>Or copy and paste the following URL into your browser:</p>
                      <p>${url}</p>
                      <p class="warning-text">
                          Please keep this link confidential. This message contains sensitive information intended only for the recipient. If you are not the intended recipient, please delete this message immediately.
                      </p>
      
                  </div>
              </body>
          </html>
      `;
      resolve(template);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
