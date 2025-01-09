// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { MessageHandlerData } from "@estruyf/vscode";
import { WebviewProvider } from "./WebviewProvider";
import { exec } from "child_process";
import { promisify } from "util";

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
  

  switch (command) {
    case "GET_DATA_ERROR":
      webView.webview.postMessage({
        command,
        requestId, // The requestId is used to identify the response
        error: `Oops, something went wrong!`,
      } as MessageHandlerData<string>);
      break;

    case "POST_DATA":
      vscode.window.showInformationMessage(`Received data from the webview: ${payload.data}`);
      test(payload.data);
      break;

    default:
      vscode.window.showInformationMessage(`Unknown command: ${command}`);
  }
};

// This method is called when your extension is deactivated
export function deactivate() {}

export const execNew = promisify(exec);
