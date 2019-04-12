Infor Document Management Outlook Add-in

## User Installation
**Desktop**

1. Expand Home tab in the ribbon
2. In Add-Ins section, click on Store
3. Popup window should appear, select My add-ins
4. Under Custom add-ins section, click Add a custom add-in dropdown
5. Select Add from file
6. Select idm-dev-manifest.xml from install folder
7. In the warning window, click Install
After installation is complete, you should see the new entry under the Custom add-ins section

**Office365**

1. Open Settings menu from the top right corner
2. Click Manage add-ins
3. Repeat steps 4, 5, 6, 7, 8 from the Desktop installation guide

If above steps were successful, you should have IDM-Outlook icon in ribbon. To use:

Open an email containing attachment
Click on Home -> Select IDM-Outlook. In Office 365 version the icon should appear directly in the email
Panel on the right side should open
Authenticate and start using!

**Development Setup**
1. Checkout to a directory
2. Run npm install to download dependencies
3. Run npm start
You should have development server running on localhost:3000 (configurable in config/webpack.dev.js). Go through User Installation guide using idm-dev-manifest.xml manifest. Agree on any warnings related to SSL communication.

**How to debug plugin running inside outlook (windows)**
1. Navigate to `C:\Windows\System32\F12`
2. Open F12Chooser.exe
3. Select process of add-in in outlook
4. You should see IE debug tools
