
# Invoice Alert Watchdog - Electron App

An invoice tracking application with payment alerts, reports, and financial summaries.

## Running in Electron Fiddle

To run this application in Electron Fiddle, follow these steps:

1. **Open Electron Fiddle**

2. **Load the Electron Files:**
   - Open the 'electron' folder in this project
   - Copy the contents of `main.js` into the Fiddle's main process panel
   - Copy the contents of `preload.js` into the Fiddle's preload process panel

3. **Configure HTML:**
   - In the Fiddle's renderer process panel, use a script tag to load your application:
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8">
       <title>Invoice Alert Watchdog</title>
       <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
     </head>
     <body>
       <div id="root"></div>
       <script src="./build/main.js"></script>
     </body>
   </html>
   ```

4. **Build Your React App:**
   - Run `npm run build` in your React project directory
   - Copy the build folder to the Electron project directory

5. **Run the Application:**
   - Click "Run" in Electron Fiddle to launch the application

## Development

This application combines React for the frontend UI with Electron for the desktop application wrapper.
