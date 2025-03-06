import * as vscode from "vscode";

export async function selectFolder(): Promise<string | undefined> {
    const options: vscode.OpenDialogOptions = {
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: 'Select Folder'
    };

    const folderUri = await vscode.window.showOpenDialog(options);
    return folderUri?.[0]?.fsPath;
}