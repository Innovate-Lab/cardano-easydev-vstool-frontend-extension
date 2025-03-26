// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { MessageHandlerData } from "@estruyf/vscode";
import { WebviewProvider } from "./WebviewProvider";
import { exec } from "child_process";
import { promisify } from "util";
import { generateFromTemplate } from "./template-generator";
import { EasyDevTerminal } from "./terminal";
import { selectFolder } from "./utils";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "cardano-easydev-vscode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("cardano-easydev-vscode.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from cardano-easydev-vscode!!!!");
  });
  context.subscriptions.push(disposable);

  const webviewProvider = new WebviewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("cardano-easydev-sidebar", webviewProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cardano-easydev-vscode.webView", () => {
      const panel = vscode.window.createWebviewPanel(
        "cardano-easydev",
        "Cardano EasyDev",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      panel.webview.onDidReceiveMessage((message) =>
        handleReceivedMessage(message, panel, context)
      );

      panel.webview.html = webviewProvider._getHtmlForWebview(panel.webview);
    })
  );
}

export const handleReceivedMessage = async (message: any, webView: any, context: any) => {
  const { command, requestId, payload } = message;
  let easyDevTerminal = EasyDevTerminal.getInstance();
  let selectedFolder: string | undefined;

  switch (command) {
    case 'SELECT_FOLDER':
      selectedFolder = await selectFolder();
      if (selectedFolder) {
        webView.webview.postMessage({
          command,
          requestId,
          payload: selectedFolder
        } as MessageHandlerData<string>);
      }
      break;

    case 'BUILD':
      easyDevTerminal.build(payload);
      break;

    case 'TEST':
      easyDevTerminal.test(payload);
      break;

    case 'VIEW_ON_EXPLORER':
      vscode.env.openExternal(vscode.Uri.parse(`https://preprod.cardanoscan.io/transaction/${payload}`));
      break;

    case 'CREATE_TEMPLATE':
      const result = await generateFromTemplate(payload);

      webView.webview.postMessage({
        command,
        requestId, // The requestId is used to identify the response
        payload: result
      } as MessageHandlerData<boolean>);
      break;

    default:
      vscode.window.showInformationMessage(`Unknown command: ${command}`);
  }
};

// This method is called when your extension is deactivated
export function deactivate() { }

export const execNew = promisify(exec);
