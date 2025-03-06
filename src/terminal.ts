import * as vscode from 'vscode';

export class EasyDevTerminal {
    private static instance: EasyDevTerminal;
    private terminal: vscode.Terminal | undefined;

    private constructor() { }

    public static getInstance(): EasyDevTerminal {
        if (!EasyDevTerminal.instance) {
            EasyDevTerminal.instance = new EasyDevTerminal();
        }
        return EasyDevTerminal.instance;
    }

    private getOrCreateTerminal(): vscode.Terminal {
        // Try to find existing Cardano EasyDev terminal
        const existingTerminal = vscode.window.terminals.find(t => t.name === "Cardano EasyDev");

        if (existingTerminal) {
            this.terminal = existingTerminal;
            return existingTerminal;
        }

        // Create new terminal if none exists
        this.terminal = vscode.window.createTerminal("Cardano EasyDev");
        return this.terminal;
    }

    build(selectedFolder: string) {
        const terminal = this.getOrCreateTerminal();
        terminal.sendText(`aiken build ${selectedFolder}`);
        terminal.show();
    }

    test(selectedFolder: string) {
        const terminal = this.getOrCreateTerminal();
        terminal.sendText(`aiken check ${selectedFolder}`);
        terminal.show();
    }
}