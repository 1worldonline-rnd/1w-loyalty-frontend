export type QuizUploadResult = {
    surveyId?: string;
    widgetId?: string;
    name: string;
    status: 'SUCCESS' | 'FAILED';
};
