import { axios } from '@/shared/lib/axios';
import type { PartnerId } from '../partner/types';
import { QuizUploadResult } from "@/shared/api/tools/types";

export const fetchUploadFileWithQuizzes = ({ partnerId, formData }: { partnerId: PartnerId; formData: FormData; }) => {
    return axios.post<QuizUploadResult[]>(`/quizzes/uploads`, formData, {
        params: { partnerId },
    })
};
