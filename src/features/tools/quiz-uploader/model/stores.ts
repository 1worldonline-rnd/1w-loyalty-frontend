import { createStore } from 'effector';
import type { QuizUploadResult } from '@/shared/api/tools/types';
import type { Nullable } from '@/shared/utility-types';

export const $uploadedQuizzes = createStore<Nullable<QuizUploadResult[]>>(null);
