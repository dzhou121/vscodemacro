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
		if (!vscode.window.activeTextEditor) {
			vscode.commands.executeCommand("workbench.action.focusNextGroup");
		} else {
			let viewColumn = vscode.window.activeTextEditor.viewColumn;
			if (viewColumn == null || viewColumn < largest) {
				vscode.commands.executeCommand("workbench.action.focusNextGroup");
			}
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('dzhou121.previousEditor', function () {
		if (!vscode.window.activeTextEditor) {
			vscode.commands.executeCommand("workbench.action.focusPreviousGroup");
		} else {
			let viewColumn = vscode.window.activeTextEditor.viewColumn;
			if (viewColumn == null || viewColumn > 1) {
				vscode.commands.executeCommand("workbench.action.focusPreviousGroup");
			}
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('dzhou121.closeEditor', function () {
		if (vscode.window.activeTextEditor == null) {
			vscode.commands.executeCommand("workbench.action.closeActiveEditor");
			return;
		}
		let oldViewColumn = vscode.window.activeTextEditor.viewColumn;
		console.log(oldViewColumn);
		let listener = vscode.window.onDidChangeActiveTextEditor(function (editor) {
			listener.dispose();
			if (editor == null) {
				return;
			}
			let newViewColumn = editor.viewColumn;
			if (oldViewColumn == null || newViewColumn == null) {
				return;
			}
			if (oldViewColumn == newViewColumn) {
				return;
			}
			var largest = 0;
			vscode.window.visibleTextEditors.forEach(item => {
				if (item.viewColumn) {
					if (item.viewColumn > largest) {
						largest = item.viewColumn;
					}
				}
			});
			if (oldViewColumn == largest) {
				return;
			}
			if (newViewColumn < oldViewColumn) {
				vscode.commands.executeCommand("workbench.action.focusNextGroup");
			}
		});
		vscode.commands.executeCommand("workbench.action.closeActiveEditor");
	}));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
