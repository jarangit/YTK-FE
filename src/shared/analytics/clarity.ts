import Clarity from '@microsoft/clarity';

let initializedProjectId = '';

export function initializeClarity(projectId: string) {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId || initializedProjectId === normalizedProjectId) {
    return;
  }

  Clarity.init(normalizedProjectId);
  initializedProjectId = normalizedProjectId;
}
