import { createEffect } from 'effector';
import { toolsApi } from '@/shared/api';

export const uploadFileWithQuizzesFx = createEffect(toolsApi.fetchUploadFileWithQuizzes);
