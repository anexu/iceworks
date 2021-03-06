import * as vscode from 'vscode';
import { checkIsNotTarget } from '@iceworks/project-service';
import { didShowWelcomePageStateKey } from '@iceworks/common-service';

export const didShowWelcomePageBySidebarStateKey = 'iceworks.didShowWelcomePageBySidebar';

export default async function (context: vscode.ExtensionContext) {
  const { globalState } = context;
  const isNotTargetProject = await checkIsNotTarget();
  if (isNotTargetProject) {
    vscode.commands.executeCommand('iceworks-project-creator.start');
  } else if (!globalState.get(didShowWelcomePageStateKey) && !globalState.get(didShowWelcomePageBySidebarStateKey)) {
    vscode.commands.executeCommand('iceworksApp.welcome.start');
    globalState.update(didShowWelcomePageBySidebarStateKey, true);
  }
}
