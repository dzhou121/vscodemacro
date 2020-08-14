// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('dzhou121.nextEditor', function () {
		var largest = 0;
		vscode.window.visibleTextEditors.forEach(item => {
			if (item.viewColumn) {
				if (item.viewColumn > largest) {
					largest = item.viewColumn;
				}
			}
		});
		let viewColumn = vscode.window.activeTextEditor.viewColumn;
		if (viewColumn < largest) {
			vscode.commands.executeCommand("workbench.action.nextEditor");
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('dzhou121.previousEditor', function () {
		var smallest = 0;
		vscode.window.visibleTextEditors.forEach(item => {
			if (item.viewColumn) {
				if (item.viewColumn < smallest) {
					smallest = item.viewColumn;
				}
			}
		});
		let viewColumn = vscode.window.activeTextEditor.viewColumn;
		if (viewColumn > smallest) {
			vscode.commands.executeCommand("workbench.action.previousEditor");
		}
	}));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
